// 🎧 ЗвукЛист - Музыкальная платформа на русском языке

class MusicPlayer {
    constructor() {
        // Элементы DOM
        this.audioPlayer = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.repeatBtn = document.getElementById('repeatBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.favoriteBtn = document.getElementById('favoriteBtn');
        this.themeBtn = document.getElementById('themeBtn');
        
        this.trackTitle = document.getElementById('trackTitle');
        this.trackArtist = document.getElementById('trackArtist');
        this.trackCover = document.getElementById('trackCover');
        this.progressSlider = document.getElementById('progressSlider');
        this.progressFill = document.getElementById('progressFill');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.trackList = document.getElementById('trackList');
        this.favoritesList = document.getElementById('favoritesList');
        this.player = document.querySelector('.player');
        this.equalizer = document.querySelector('.equalizer');

        // Переменные состояния
        this.tracks = [];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.repeatMode = 'none'; // 'none', 'one', 'all'
        this.isShuffle = false;
        this.favorites = [];
        this.playOrder = [];

        // Инициализация
        this.loadTracks();
        this.setupEventListeners();
        this.loadFavorites();
        this.loadTheme();
        this.setVolume();
        
        // Заполнить очередь
        this.setupPlayOrder();
    }

    async loadTracks() {
        try {
            const response = await fetch('music.json');
            this.tracks = await response.json();
            this.setupPlayOrder();
            this.renderTrackList();
            this.loadCurrentTrack();
            
            // Установить разрешение максимума слайдера прогресса
            if (this.tracks.length > 0) {
                this.audioPlayer.src = this.tracks[this.currentTrackIndex].src;
            }
        } catch (error) {
            console.error('Ошибка при загрузке треков:', error);
            this.trackList.innerHTML = '<div class="empty-message">Не удалось загрузить список треков</div>';
        }
    }

    setupPlayOrder() {
        this.playOrder = Array.from({ length: this.tracks.length }, (_, i) => i);
        if (this.isShuffle) {
            this.shuffleArray(this.playOrder);
        }
    }

    shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    setupEventListeners() {
        // Контролы плеера
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.prevBtn.addEventListener('click', () => this.prevTrack());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.favoriteBtn.addEventListener('click', () => this.toggleFavorite());
        this.themeBtn.addEventListener('click', () => this.toggleTheme());

        // Прогресс
        this.progressSlider.addEventListener('change', (e) => this.seek(e));
        this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
        this.audioPlayer.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audioPlayer.addEventListener('ended', () => this.handleTrackEnd());

        // Громкость
        this.volumeSlider.addEventListener('input', () => this.setVolume());

        // Нажатие на трек в списке
        this.trackList.addEventListener('click', (e) => {
            const trackItem = e.target.closest('.track-item');
            if (trackItem) {
                const index = parseInt(trackItem.dataset.index);
                this.currentTrackIndex = index;
                this.loadCurrentTrack();
                this.play();
            }
        });
    }

    /**
     * Переключить воспроизведение
     */
    togglePlay() {
        if (this.isPlaying) {
            this.pause();
        } else {
            this.play();
        }
    }

    play() {
        this.audioPlayer.play();
        this.isPlaying = true;
        this.updatePlayButton();
        this.player.classList.add('playing');
        this.equalizer.classList.add('active');
        this.saveCurrentTrack();
    }

    pause() {
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.updatePlayButton();
        this.player.classList.remove('playing');
        this.equalizer.classList.remove('active');
    }

    /**
     * Обновить кнопку play/pause
     */
    updatePlayButton() {
        const icon = this.isPlaying ? '⏸️' : '▶️';
        const text = this.isPlaying ? 'Пауза' : 'Проиграть';
        this.playBtn.innerHTML = `${icon} <span class="btn-text">${text}</span>`;
    }

    /**
     * Программное переключение на следующий трек
     */
    nextTrack() {
        if (this.tracks.length === 0) return;

        if (this.isShuffle) {
            // Найти текущий индекс в playOrder и перейти к следующему
            const currentPos = this.playOrder.indexOf(this.currentTrackIndex);
            const nextPos = (currentPos + 1) % this.playOrder.length;
            this.currentTrackIndex = this.playOrder[nextPos];
        } else {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.tracks.length;
        }

        this.loadCurrentTrack();
        this.play();
    }

    /**
     * Программное переключение на предыдущий трек
     */
    prevTrack() {
        if (this.tracks.length === 0) return;

        // Если прошло более 3 секунд, начать с начала, иначе предыдущий трек
        if (this.audioPlayer.currentTime > 3) {
            this.audioPlayer.currentTime = 0;
            return;
        }

        if (this.isShuffle) {
            const currentPos = this.playOrder.indexOf(this.currentTrackIndex);
            const prevPos = (currentPos - 1 + this.playOrder.length) % this.playOrder.length;
            this.currentTrackIndex = this.playOrder[prevPos];
        } else {
            this.currentTrackIndex = (this.currentTrackIndex - 1 + this.tracks.length) % this.tracks.length;
        }

        this.loadCurrentTrack();
        this.play();
    }

    /**
     * Загрузить текущий трек
     */
    loadCurrentTrack() {
        if (this.tracks.length === 0) return;

        const track = this.tracks[this.currentTrackIndex];
        this.trackTitle.textContent = track.title;
        this.trackArtist.textContent = track.artist;
        this.trackCover.src = track.cover || 'assets/covers/default.jpg';
        this.audioPlayer.src = track.src;

        // Обновить активный трек в списке
        document.querySelectorAll('.track-item').forEach((item, idx) => {
            item.classList.toggle('active', idx === this.currentTrackIndex);
        });

        // Обновить кнопку избранного
        this.updateFavoriteButton();

        this.saveCurrentTrack();
    }

    /**
     * Обновить прогресс-бар
     */
    updateProgress() {
        if (!this.audioPlayer.duration) return;

        const percent = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
        this.progressFill.style.width = percent + '%';
        this.progressSlider.value = percent;

        this.currentTimeEl.textContent = this.formatTime(this.audioPlayer.currentTime);
    }

    /**
     * Обновить длительность трека
     */
    updateDuration() {
        this.durationEl.textContent = this.formatTime(this.audioPlayer.duration);
        this.progressSlider.max = 100;
    }

    /**
     * Поиск по прогресс-бару
     */
    seek(e) {
        const percent = (e.target.value / 100) * this.audioPlayer.duration;
        this.audioPlayer.currentTime = percent;
    }

    /**
     * Обработка завершения трека
     */
    handleTrackEnd() {
        if (this.repeatMode === 'one') {
            this.audioPlayer.currentTime = 0;
            this.play();
        } else if (this.repeatMode === 'all' || this.isShuffle) {
            this.nextTrack();
        } else {
            this.nextTrack();
        }
    }

    /**
     * Переключение режима повтора
     */
    toggleRepeat() {
        const modes = ['none', 'one', 'all'];
        const currentIndex = modes.indexOf(this.repeatMode);
        this.repeatMode = modes[(currentIndex + 1) % modes.length];

        const icons = { 'none': '🔁', 'one': '🔂', 'all': '🔁' };
        const texts = { 'none': 'Повтор', 'one': 'Повтор (1)', 'all': 'Повтор (все)' };

        this.repeatBtn.innerHTML = `${icons[this.repeatMode]} <span class="btn-text">${texts[this.repeatMode]}</span>`;
        
        if (this.repeatMode !== 'none') {
            this.repeatBtn.classList.add('active');
        } else {
            this.repeatBtn.classList.remove('active');
        }

        localStorage.setItem('repeatMode', this.repeatMode);
    }

    /**
     * Переключение перемешивания
     */
    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        this.setupPlayOrder();

        if (this.isShuffle) {
            this.shuffleBtn.classList.add('active');
        } else {
            this.shuffleBtn.classList.remove('active');
        }

        localStorage.setItem('shuffle', this.isShuffle);
    }

    /**
     * Форматирование времени (MM:SS)
     */
    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    /**
     * Установка громкости
     */
    setVolume() {
        const volume = this.volumeSlider.value / 100;
        this.audioPlayer.volume = volume;
        localStorage.setItem('volume', this.volumeSlider.value);
    }

    /**
     * Отрендерить список треков
     */
    renderTrackList() {
        if (this.tracks.length === 0) {
            this.trackList.innerHTML = '<div class="empty-message">Нет доступных треков</div>';
            return;
        }

        this.trackList.innerHTML = this.tracks.map((track, index) => `
            <div class="track-item" data-index="${index}" ${index === this.currentTrackIndex ? 'class="track-item active"' : ''}>
                <span class="track-item-number">${index + 1}</span>
                <div class="track-item-info">
                    <div class="track-item-title">${track.title}</div>
                    <div class="track-item-artist">${track.artist}</div>
                </div>
                <span class="track-item-duration">${this.formatTime(track.duration || 0)}</span>
            </div>
        `).join('');
    }

    /**
     * Добавление/Удаление из избранного
     */
    toggleFavorite() {
        const track = this.tracks[this.currentTrackIndex];
        const index = this.favorites.findIndex(t => t.src === track.src);

        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(track);
        }

        this.saveFavorites();
        this.updateFavoriteButton();
        this.renderFavorites();
    }

    /**
     * Обновить кнопку избранного
     */
    updateFavoriteButton() {
        const track = this.tracks[this.currentTrackIndex];
        const isFavorite = this.favorites.some(t => t.src === track.src);

        if (isFavorite) {
            this.favoriteBtn.classList.add('active');
            this.favoriteBtn.innerHTML = '❤️ Избранное';
        } else {
            this.favoriteBtn.classList.remove('active');
            this.favoriteBtn.innerHTML = '♡ Избранное';
        }
    }

    /**
     * Отрендерить избранные треки
     */
    renderFavorites() {
        if (this.favorites.length === 0) {
            this.favoritesList.innerHTML = '<div class="empty-message">Нет избранных треков</div>';
            return;
        }

        this.favoritesList.innerHTML = this.favorites.map((track, index) => `
            <div class="track-item" style="cursor: pointer;" onclick="musicPlayer.playFavorite(${index})">
                <span class="track-item-number">❤️</span>
                <div class="track-item-info">
                    <div class="track-item-title">${track.title}</div>
                    <div class="track-item-artist">${track.artist}</div>
                </div>
                <span class="track-item-duration">${this.formatTime(track.duration || 0)}</span>
            </div>
        `).join('');
    }

    /**
     * Воспроизвести трек из избранного
     */
    playFavorite(index) {
        const track = this.favorites[index];
        const mainIndex = this.tracks.findIndex(t => t.src === track.src);

        if (mainIndex > -1) {
            this.currentTrackIndex = mainIndex;
            this.loadCurrentTrack();
            this.play();
        }
    }

    /**
     * Сохранить избранные треки
     */
    saveFavorites() {
        localStorage.setItem('favorites', JSON.stringify(this.favorites));
    }

    /**
     * Загрузить избранные треки
     */
    loadFavorites() {
        const saved = localStorage.getItem('favorites');
        if (saved) {
            this.favorites = JSON.parse(saved);
            this.renderFavorites();
        } else {
            this.renderFavorites();
        }
    }

    /**
     * Переключение темы
     */
    toggleTheme() {
        document.documentElement.classList.toggle('light-theme');
        const isLight = document.documentElement.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
    }

    /**
     * Загрузить сохранённую тему
     */
    loadTheme() {
        const theme = localStorage.getItem('theme');
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
        }
    }

    /**
     * Сохранить текущий трек
     */
    saveCurrentTrack() {
        localStorage.setItem('currentTrack', this.currentTrackIndex);
        localStorage.setItem('currentTime', this.audioPlayer.currentTime);
    }

    /**
     * Загрузить сохранённый трек
     */
    loadCurrentTrack() {
        const saved = localStorage.getItem('currentTrack');
        if (saved && !isNaN(saved)) {
            this.currentTrackIndex = parseInt(saved);
        }
    }
}

// Инициализировать плеер
let musicPlayer;
document.addEventListener('DOMContentLoaded', () => {
    musicPlayer = new MusicPlayer();
});
