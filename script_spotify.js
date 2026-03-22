// 🎧 ЗвукЛист - Полный функционал Spotify на русском языке

// ===== COOKIE UTILITIES =====
function setCookie(name, value, days = 365) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + ";" + expires + ";path=/";
}

function getCookie(name) {
    const nameEQ = name + "=";
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        cookie = cookie.trim();
        if (cookie.indexOf(nameEQ) === 0) {
            return decodeURIComponent(cookie.substring(nameEQ.length));
        }
    }
    return null;
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}
// ===== END COOKIE UTILITIES =====

class SpotifyMusicPlayer {
    constructor() {
        // DOM элементы
        this.audioPlayer = document.getElementById('audioPlayer');
        this.playBtn = document.getElementById('playBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.repeatBtn = document.getElementById('repeatBtn');
        this.shuffleBtn = document.getElementById('shuffleBtn');
        this.favoriteBtn = document.getElementById('favoriteBtn');
        this.themeBtn = document.getElementById('themeBtn');
        this.addToPlaylistBtn = document.getElementById('addToPlaylistBtn');
        
        this.trackTitle = document.getElementById('trackTitle');
        this.trackArtist = document.getElementById('trackArtist');
        this.trackCover = document.getElementById('trackCover');
        this.progressSlider = document.getElementById('progressSlider');
        this.progressFill = document.getElementById('progressFill');
        this.currentTimeEl = document.getElementById('currentTime');
        this.durationEl = document.getElementById('duration');
        this.volumeSlider = document.getElementById('volumeSlider');
        this.player = document.querySelector('.player');
        this.equalizer = document.querySelector('.equalizer');
        
        // Меню
        this.menuBtn = document.getElementById('menuBtn');
        this.sidebar = document.querySelector('.sidebar');
        
        // Поиск
        this.searchInput = document.getElementById('searchInput');
        this.searchResults = document.getElementById('searchResults');
        
        // Плейлисты
        this.createPlaylistBtn = document.getElementById('createPlaylistBtn');
        this.createPlaylistForm = document.getElementById('createPlaylistForm');
        this.confirmPlaylistBtn = document.getElementById('confirmPlaylist');
        this.cancelPlaylistBtn = document.getElementById('cancelPlaylist');
        this.playlistNameInput = document.getElementById('playlistName');
        this.playlistDescInput = document.getElementById('playlistDesc');
        this.playlistsContainer = document.getElementById('playlistsContainer');
        
        // История
        this.clearHistoryBtn = document.getElementById('clearHistoryBtn');
        this.clearFavoritesBtn = document.getElementById('clearFavoritesBtn');
        
        // Навигация
        this.navBtns = document.querySelectorAll('.nav-btn');
        this.sections = document.querySelectorAll('.section');
        
        // Данные
        this.allTracks = [];
        this.genres = [];
        this.userPlaylists = [];
        this.currentTrackIndex = 0;
        this.isPlaying = false;
        this.repeatMode = 'none';
        this.isShuffle = false;
        this.favorites = [];
        this.playHistory = [];
        this.playOrder = [];
        this.currentGenre = null;
        
        // Инициализация
        this.loadAllData();
        this.setupEventListeners();
        this.loadFavorites();
        this.loadHistory();
        this.loadPlaylists();
        this.loadTheme();
        this.setVolume();
        this.renderRecommendations();
        window.player = this; // Сделать плеер доступным глобально
    }

    async loadAllData() {
        try {
            // Встроенные данные вместо загрузки из файла (для локальной работы)
            const data = {
                "tracks": [
                    {
                        "id": 1,
                        "title": "PURE / UTOPIA",
                        "artist": "UdieNnx",
                        "src": "assets/music/track1.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 117,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 7,
                        "title": "Спокойная ночь",
                        "artist": "КИНО",
                        "src": "assets/music/track2.mp3",
                        "cover": "assets/covers/cover2.jpg",
                        "duration": 375,
                        "genre": "Электроника",
                        "year": 1986
                    },
                    {
                        "id": 3,
                        "title": "CONSUME",
                        "artist": "UdieNnx",
                        "src": "assets/music/track3.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 117,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 4,
                        "title": "NAIVE",
                        "artist": "UdieNnx",
                        "src": "assets/music/track4.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 109,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 5,
                        "title": "VIBRACO",
                        "artist": "UdieNnx",
                        "src": "assets/music/track5.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 93,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 6,
                        "title": "PULSE",
                        "artist": "UdieNnx",
                        "src": "assets/music/track6.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 138,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 7,
                        "title": "DICE",
                        "artist": "UdieNnx",
                        "src": "assets/music/track7.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 145,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 8,
                        "title": "CONSUME (Slowed)",
                        "artist": "UdieNnx",
                        "src": "assets/music/track8.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 135,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 9,
                        "title": "NAIVE (Slowed)",
                        "artist": "UdieNnx",
                        "src": "assets/music/track9.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 120,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 10,
                        "title": "VIBRACO (Slowed)",
                        "artist": "UdieNnx",
                        "src": "assets/music/track10.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 103,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 11,
                        "title": "PULSE (Slowed)",
                        "artist": "UdieNnx",
                        "src": "assets/music/track11.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 160,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 12,
                        "title": "DICE (Slowed)",
                        "artist": "UdieNnx",
                        "src": "assets/music/track12.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 161,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 13,
                        "title": "PURE / UTOPIA (Slowed)",
                        "artist": "UdieNnx",
                        "src": "assets/music/track13.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 138,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 14,
                        "title": "ECLIPSE",
                        "artist": "UdieNnx",
                        "src": "assets/music/track14.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 123,
                        "genre": "Чилаут",
                        "year": 2026
                    },
                    {
                        "id": 15,
                        "title": "ECLIPSE (Slowed)",
                        "artist": "UdieNnx",
                        "src": "assets/music/track15.mp3",
                        "cover": "assets/covers/cover1.jpg",
                        "duration": 142,
                        "genre": "Чилаут",
                        "year": 2026
                    }
                ],
                "genres": [
                    { "name": "Электроника", "icon": "⚡", "color": "#00d4ff" },
                    { "name": "Поп", "icon": "🎤", "color": "#ff4d6d" },
                    { "name": "Релакс", "icon": "🧘", "color": "#00ff7f" },
                    { "name": "Синтезаторная музыка", "icon": "🎹", "color": "#d46bff" },
                    { "name": "Чилаут", "icon": "😎", "color": "#ffb700" },
                    { "name": "Деньбыва", "icon": "🌅", "color": "#ff7a3d" }
                ],
                "playlists": [
                    {
                        "id": 1,
                        "name": "Мои личные треки",
                        "description": "Личный плейлист любимой музыки",
                        "tracks": [1, 2],
                        "cover": "assets/covers/cover1.jpg",
                        "created": "2024-01-15"
                    }
                ]
            };

            this.allTracks = data.tracks;
            this.genres = data.genres;
            this.userPlaylists = data.playlists || [];
            
            this.setupPlayOrder();
            this.renderAllTracks();
            this.renderGenres();
            this.renderPlaylists();
            this.renderFavorites();
            this.renderHistory();
            
            if (this.allTracks.length > 0) {
                this.audioPlayer.src = this.allTracks[this.currentTrackIndex].src;
            }
            
            this.loadCurrentTrack(); // Вызвать после загрузки данных
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            // Показать сообщение об ошибке
            const container = document.getElementById('allTracksContainer');
            if (container) {
                container.innerHTML = '<div class="empty-message">Ошибка загрузки данных</div>';
            }
        }
    }

    setupPlayOrder() {
        this.playOrder = Array.from({ length: this.allTracks.length }, (_, i) => i);
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
        // Плеер
        this.playBtn.addEventListener('click', () => this.togglePlay());
        this.nextBtn.addEventListener('click', () => this.nextTrack());
        this.prevBtn.addEventListener('click', () => this.prevTrack());
        this.repeatBtn.addEventListener('click', () => this.toggleRepeat());
        this.shuffleBtn.addEventListener('click', () => this.toggleShuffle());
        this.favoriteBtn.addEventListener('click', () => this.toggleFavorite());
        this.themeBtn.addEventListener('click', () => this.toggleTheme());
        this.addToPlaylistBtn.addEventListener('click', () => this.showAddToPlaylist());

        // Прогресс
        this.progressSlider.addEventListener('change', (e) => this.seek(e));
        this.audioPlayer.addEventListener('timeupdate', () => this.updateProgress());
        this.audioPlayer.addEventListener('loadedmetadata', () => this.updateDuration());
        this.audioPlayer.addEventListener('ended', () => this.handleTrackEnd());

        // Громкость
        this.volumeSlider.addEventListener('input', () => this.setVolume());

        // Поиск
        this.searchInput.addEventListener('input', (e) => this.handleSearch(e));

        // Плейлисты
        this.createPlaylistBtn.addEventListener('click', () => this.showCreatePlaylistForm());
        this.confirmPlaylistBtn.addEventListener('click', () => this.createPlaylist());
        this.cancelPlaylistBtn.addEventListener('click', () => this.hideCreatePlaylistForm());

        // История
        this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());
        this.clearFavoritesBtn.addEventListener('click', () => this.clearFavorites());

        // Навигация
        this.navBtns.forEach(btn => {
            btn.addEventListener('click', (e) => this.switchSection(e.target.closest('.nav-btn')));
        });

        // Меню для мобильной версии
        if (this.menuBtn) {
            this.menuBtn.addEventListener('click', () => this.toggleMenu());
        }

        // Закрытие меню при клике на элемент навигации
        this.navBtns.forEach(btn => {
            btn.addEventListener('click', () => this.closeMenu());
        });

        // Закрытие меню при клике вне его
        document.addEventListener('click', (e) => {
            if (this.sidebar && this.menuBtn) {
                if (!this.sidebar.contains(e.target) && !this.menuBtn.contains(e.target)) {
                    this.closeMenu();
                }
            }
        });

        // Закрытие модального окна при клике вне его
        this.createPlaylistForm.addEventListener('click', (e) => {
            if (e.target === this.createPlaylistForm) this.hideCreatePlaylistForm();
        });
    }

    // ===== УПРАВЛЕНИЕ ПЛЕЕРОМ =====

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
        this.addToHistory();
    }

    pause() {
        this.audioPlayer.pause();
        this.isPlaying = false;
        this.updatePlayButton();
        this.player.classList.remove('playing');
        this.equalizer.classList.remove('active');
    }

    updatePlayButton() {
        const icon = this.isPlaying ? '⏸️' : '▶️';
        const text = this.isPlaying ? 'Пауза' : 'Проиграть';
        this.playBtn.innerHTML = `${icon} <span class="btn-text">${text}</span>`;
    }

    nextTrack() {
        if (this.allTracks.length === 0) return;

        if (this.isShuffle) {
            const currentPos = this.playOrder.indexOf(this.currentTrackIndex);
            const nextPos = (currentPos + 1) % this.playOrder.length;
            this.currentTrackIndex = this.playOrder[nextPos];
        } else {
            this.currentTrackIndex = (this.currentTrackIndex + 1) % this.allTracks.length;
        }

        this.loadCurrentTrack();
        this.play();
    }

    prevTrack() {
        if (this.allTracks.length === 0) return;

        if (this.audioPlayer.currentTime > 3) {
            this.audioPlayer.currentTime = 0;
            return;
        }

        if (this.isShuffle) {
            const currentPos = this.playOrder.indexOf(this.currentTrackIndex);
            const prevPos = (currentPos - 1 + this.playOrder.length) % this.playOrder.length;
            this.currentTrackIndex = this.playOrder[prevPos];
        } else {
            this.currentTrackIndex = (this.currentTrackIndex - 1 + this.allTracks.length) % this.allTracks.length;
        }

        this.loadCurrentTrack();
        this.play();
    }

    loadCurrentTrack() {
        if (this.allTracks.length === 0) return;

        const track = this.allTracks[this.currentTrackIndex];
        this.trackTitle.textContent = track.title;
        this.trackArtist.textContent = track.artist;
        this.trackCover.src = track.cover;
        this.audioPlayer.src = track.src;

        this.updateFavoriteButton();
        this.renderSimilarTracks(track.genre);
        this.highlightCurrentTrackCard();
        this.renderAllTracks(); // обновление списка с подсветкой
        this.saveCurrentTrack();
    }

    updateProgress() {
        if (!this.audioPlayer.duration) return;

        const percent = (this.audioPlayer.currentTime / this.audioPlayer.duration) * 100;
        this.progressFill.style.width = percent + '%';
        this.progressSlider.value = percent;

        this.currentTimeEl.textContent = this.formatTime(this.audioPlayer.currentTime);
    }

    updateDuration() {
        this.durationEl.textContent = this.formatTime(this.audioPlayer.duration);
        this.progressSlider.max = 100;
    }

    seek(e) {
        const percent = (e.target.value / 100) * this.audioPlayer.duration;
        this.audioPlayer.currentTime = percent;
    }

    handleTrackEnd() {
        if (this.repeatMode === 'one') {
            this.audioPlayer.currentTime = 0;
            this.play();
        } else {
            this.nextTrack();
        }
    }

    // ===== РЕЖИМЫ =====

    toggleRepeat() {
        const modes = ['none', 'one', 'all'];
        const currentIndex = modes.indexOf(this.repeatMode);
        this.repeatMode = modes[(currentIndex + 1) % modes.length];

        const icons = { 'none': '🔁', 'one': '🔂', 'all': '🔁' };
        const texts = { 'none': 'Повтор', 'one': 'Повтор (трек)', 'all': 'Повтор (все)' };

        this.repeatBtn.innerHTML = `${icons[this.repeatMode]} <span class="btn-text">${texts[this.repeatMode]}</span>`;
        
        if (this.repeatMode !== 'none') {
            this.repeatBtn.classList.add('active');
        } else {
            this.repeatBtn.classList.remove('active');
        }

        setCookie('repeatMode', this.repeatMode);
    }

    toggleShuffle() {
        this.isShuffle = !this.isShuffle;
        this.setupPlayOrder();

        if (this.isShuffle) {
            this.shuffleBtn.classList.add('active');
        } else {
            this.shuffleBtn.classList.remove('active');
        }

        setCookie('shuffle', this.isShuffle);
    }

    // ===== ИЗБРАННОЕ И ИСТОРИЯ =====

    toggleFavorite() {
        const track = this.allTracks[this.currentTrackIndex];
        const index = this.favorites.findIndex(t => t.id === track.id);

        if (index > -1) {
            this.favorites.splice(index, 1);
        } else {
            this.favorites.push(track);
        }

        this.saveFavorites();
        this.updateFavoriteButton();
        this.renderFavorites();
    }

    updateFavoriteButton() {
        const track = this.allTracks[this.currentTrackIndex];
        const isFavorite = this.favorites.some(t => t.id === track.id);

        if (isFavorite) {
            this.favoriteBtn.classList.add('active');
            this.favoriteBtn.innerHTML = '❤️ В избранном';
        } else {
            this.favoriteBtn.classList.remove('active');
            this.favoriteBtn.innerHTML = '♡ Избранное';
        }
    }

    addToHistory() {
        const track = this.allTracks[this.currentTrackIndex];
        
        // Удаляем дубликат, если есть
        const index = this.playHistory.findIndex(t => t.id === track.id);
        if (index > -1) this.playHistory.splice(index, 1);
        
        // Добавляем в начало
        this.playHistory.unshift({
            ...track,
            playedAt: new Date().toLocaleString('ru-RU')
        });
        
        // Сохраняем только последние 50 треков
        this.playHistory = this.playHistory.slice(0, 50);
        this.saveHistory();
    }

    saveFavorites() {
        setCookie('favorites', JSON.stringify(this.favorites));
    }

    loadFavorites() {
        const saved = getCookie('favorites');
        if (saved) {
            this.favorites = JSON.parse(saved);
        }
    }

    saveHistory() {
        setCookie('playHistory', JSON.stringify(this.playHistory));
    }

    loadHistory() {
        const saved = getCookie('playHistory');
        if (saved) {
            this.playHistory = JSON.parse(saved);
        }
    }

    savePlaylists() {
        setCookie('playlists', JSON.stringify(this.userPlaylists));
    }

    loadPlaylists() {
        const saved = getCookie('playlists');
        if (saved) {
            this.userPlaylists = JSON.parse(saved);
        }
    }

    clearHistory() {
        if (confirm('Вы уверены, что хотите очистить историю?')) {
            this.playHistory = [];
            this.saveHistory();
            this.renderHistory();
        }
    }

    clearFavorites() {
        if (confirm('Вы уверены, что хотите очистить избранное?')) {
            this.favorites = [];
            this.saveFavorites();
            this.renderFavorites();
            this.updateFavoriteButton();
        }
    }

    // ===== ПЛЕЙЛИСТЫ =====

    showCreatePlaylistForm() {
        this.createPlaylistForm.classList.remove('hidden');
        this.playlistNameInput.focus();
    }

    hideCreatePlaylistForm() {
        this.createPlaylistForm.classList.add('hidden');
        this.playlistNameInput.value = '';
        this.playlistDescInput.value = '';
    }

    createPlaylist() {
        const name = this.playlistNameInput.value.trim();
        const desc = this.playlistDescInput.value.trim();

        if (!name) {
            alert('Пожалуйста, введите название плейлиста');
            return;
        }

        const newPlaylist = {
            id: Math.max(...this.userPlaylists.map(p => p.id), 0) + 1,
            name: name,
            description: desc,
            tracks: [],
            cover: 'assets/covers/cover1.jpg',
            created: new Date().toLocaleString('ru-RU')
        };

        this.userPlaylists.push(newPlaylist);
        this.savePlaylists();
        this.renderPlaylists();
        this.hideCreatePlaylistForm();
    }

    showAddToPlaylist() {
        const playlists = this.userPlaylists.map(p => p.name).join('\n');
        const selected = prompt(`Выберите плейлист (каждый на новой строке):\n${playlists}`);
        
        if (selected) {
            const playlist = this.userPlaylists.find(p => p.name === selected);
            if (playlist) {
                const track = this.allTracks[this.currentTrackIndex];
                if (!playlist.tracks.includes(track.id)) {
                    playlist.tracks.push(track.id);
                    this.savePlaylists();
                    alert(`'${track.title}' добавлена в плейлист '${playlist.name}'`);
                } else {
                    alert('Этот трек уже в плейлисте');
                }
            }
        }
    }

    // ===== ПОИСК =====

    handleSearch(e) {
        const query = e.target.value.toLowerCase();

        if (query.length === 0) {
            this.searchResults.classList.add('hidden');
            return;
        }

        const results = this.allTracks.filter(track =>
            track.title.toLowerCase().includes(query) ||
            track.artist.toLowerCase().includes(query)
        ).slice(0, 5);

        if (results.length === 0) {
            this.searchResults.innerHTML = '<div class="empty-message">Не найдено</div>';
        } else {
            this.searchResults.innerHTML = results.map(track => `
                <div class="search-result-item" onclick="player.selectTrackFromSearch(${track.id})">
                    <div class="search-result-title">${track.title}</div>
                    <div class="search-result-artist">${track.artist}</div>
                </div>
            `).join('');
        }

        this.searchResults.classList.remove('hidden');
    }

    selectTrackFromSearch(trackId) {
        this.currentTrackIndex = this.allTracks.findIndex(t => t.id === trackId);
        this.loadCurrentTrack();
        this.play();
        this.searchInput.value = '';
        this.searchResults.classList.add('hidden');
    }

    // ===== РЕКОМЕНДАЦИИ И ПОХОЖИЕ =====

    renderRecommendations() {
        // Рекомендации на основе слушанных треков
        const recentGenres = this.playHistory
            .slice(0, 10)
            .map(t => this.allTracks.find(a => a.id === t.id)?.genre)
            .filter(Boolean);

        const recommended = this.allTracks
            .filter(t => recentGenres.includes(t.genre) && !this.playHistory.find(h => h.id === t.id))
            .slice(0, 6);

        const container = document.getElementById('recommendedTracks');
        if (container) {
            container.innerHTML = recommended.length > 0 
                ? recommended.map(t => this.createTrackCard(t)).join('')
                : '<div class="empty-message">Слушайте музыку, чтобы получить рекомендации</div>';
        }

        // Все рекомендации
        const allRecContainer = document.getElementById('allRecommendations');
        if (allRecContainer) {
            allRecContainer.innerHTML = recommended.length > 0
                ? recommended.map(t => this.createTrackCard(t)).join('')
                : '<div class="empty-message">Рекомендаций пока нет</div>';
        }
    }

    renderSimilarTracks(genre) {
        const similar = this.allTracks
            .filter(t => t.genre === genre && t.id !== this.allTracks[this.currentTrackIndex].id)
            .slice(0, 6);

        const container = document.getElementById('similarTracks');
        if (container && similar.length > 0) {
            container.innerHTML = similar.map(t => this.createTrackCard(t)).join('');
        }
    }

    // ===== РЕНДЕРИНГ =====

    createTrackCard(track) {
        const isActive = this.allTracks[this.currentTrackIndex] && this.allTracks[this.currentTrackIndex].id === track.id;

        return `
            <div class="track-card ${isActive ? 'active' : ''}" data-track-id="${track.id}" onclick="window.player.selectTrack(${track.id})">
                <img src="${track.cover}" alt="${track.title}" class="track-card-cover">
                <div class="track-card-title" title="${track.title}">${track.title}</div>
                <div class="track-card-artist" title="${track.artist}">${track.artist}</div>
            </div>
        `;
    }

    selectTrack(trackId) {
        const index = this.allTracks.findIndex(t => t.id === trackId);
        if (index === -1) {
            console.warn(`Трек с id=${trackId} не найден.`);
            return;
        }

        this.currentTrackIndex = index;
        this.loadCurrentTrack();
        this.play();
    }

    highlightCurrentTrackCard() {
        const allTrackCards = document.querySelectorAll('.track-card');
        allTrackCards.forEach(card => card.classList.remove('active'));

        const currentId = this.allTracks[this.currentTrackIndex] ? this.allTracks[this.currentTrackIndex].id : null;
        if (currentId === null) return;

        const activeCard = document.querySelector(`.track-card[data-track-id="${currentId}"]`);
        if (activeCard) {
            activeCard.classList.add('active');
            activeCard.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }
    }

    renderAllTracks() {
        console.log('renderAllTracks called, tracks:', this.allTracks.length);
        const container = document.getElementById('allTracksContainer');
        if (!container) {
            console.error('allTracksContainer not found');
            return;
        }

        if (this.allTracks.length === 0) {
            container.innerHTML = '<div class="empty-message">Нет треков для отображения</div>';
            return;
        }

        container.innerHTML = this.allTracks.map(track => this.createTrackCard(track)).join('');
        this.highlightCurrentTrackCard();
        console.log('Tracks rendered:', this.allTracks.length);
    }

    renderGenres() {
        const container = document.getElementById('genresContainer');
        if (!container) return;

        container.innerHTML = this.genres.map(genre => `
            <div class="genre-card" onclick="player.filterByGenre('${genre.name}')">
                <div class="genre-icon">${genre.icon}</div>
                <div class="genre-name">${genre.name}</div>
            </div>
        `).join('');
    }

    filterByGenre(genreName) {
        this.currentGenre = genreName;
        const tracks = this.allTracks.filter(t => t.genre === genreName);

        const container = document.getElementById('genreTracksContainer');
        if (container) {
            container.classList.remove('hidden');
            container.innerHTML = tracks.map(t => this.createTrackCard(t)).join('');
        }
    }

    renderPlaylists() {
        const container = document.getElementById('playlistsContainer');
        if (!container) return;

        if (this.userPlaylists.length === 0) {
            container.innerHTML = '<div class="empty-message">Нет плейлистов. Создайте первый плейлист!</div>';
            return;
        }

        container.innerHTML = this.userPlaylists.map(p => `
            <div class="playlist-card" onclick="player.viewPlaylist(${p.id})">
                <img src="${p.cover}" alt="${p.name}" class="playlist-cover">
                <div class="playlist-name">${p.name}</div>
                <div class="playlist-desc">${p.description || 'Нет описания'}</div>
                <div class="playlist-count">${p.tracks.length} треков</div>
            </div>
        `).join('');
    }

    viewPlaylist(playlistId) {
        const playlist = this.userPlaylists.find(p => p.id === playlistId);
        if (!playlist) return;

        const tracks = playlist.tracks.map(id => this.allTracks.find(t => t.id === id)).filter(Boolean);

        const container = document.getElementById('playlistTracksContainer');
        if (container) {
            container.classList.remove('hidden');
            container.innerHTML = tracks.length > 0
                ? tracks.map(t => `
                    <div class="track-card" onclick="player.selectTrack(${t.id})">
                        <img src="${t.cover}" alt="${t.title}" class="track-card-cover">
                        <div class="track-card-title">${t.title}</div>
                        <div class="track-card-artist">${t.artist}</div>
                    </div>
                `).join('')
                : '<div class="empty-message">Плейлист пуст</div>';
        }
    }

    renderFavorites() {
        const container = document.getElementById('favoritesList');
        if (!container) return;

        if (this.favorites.length === 0) {
            container.innerHTML = '<div class="empty-message">Нет избранных треков</div>';
            return;
        }

        container.innerHTML = this.favorites.map(t => this.createTrackCard(t)).join('');
    }

    renderHistory() {
        const container = document.getElementById('historyList');
        if (!container) return;

        if (this.playHistory.length === 0) {
            container.innerHTML = '<div class="empty-message">История пуста</div>';
            return;
        }

        container.innerHTML = this.playHistory.map((track, idx) => `
            <div class="track-item" onclick="player.selectTrack(${track.id})">
                <span class="track-item-number">${idx + 1}</span>
                <img src="${track.cover}" class="track-item-cover">
                <div class="track-item-info">
                    <div class="track-item-title">${track.title}</div>
                    <div class="track-item-artist">${track.artist}</div>
                </div>
                <div class="track-item-duration">${track.playedAt}</div>
            </div>
        `).join('');
    }

    // ===== УТИЛИТЫ =====

    formatTime(seconds) {
        if (!seconds || isNaN(seconds)) return '0:00';

        const mins = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);

        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    }

    setVolume() {
        const volume = this.volumeSlider.value / 100;
        this.audioPlayer.volume = volume;
        setCookie('volume', this.volumeSlider.value);
    }

    toggleTheme() {
        document.documentElement.classList.toggle('light-theme');
        const isLight = document.documentElement.classList.contains('light-theme');
        setCookie('theme', isLight ? 'light' : 'dark');
    }

    loadTheme() {
        const theme = getCookie('theme');
        if (theme === 'light') {
            document.documentElement.classList.add('light-theme');
        }
    }

    saveCurrentTrack() {
        setCookie('currentTrack', this.currentTrackIndex);
        setCookie('currentTime', this.audioPlayer.currentTime);
    }

    switchSection(btn) {
        // Обновить активную кнопку
        this.navBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Получить секцию
        const sectionId = btn.dataset.section + '-section';
        
        // Скрыть все секции
        this.sections.forEach(s => s.classList.remove('active'));
        
        // Показать выбранную секцию
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            targetSection.classList.add('active');
            
            // Обновить содержимое если нужно
            if (btn.dataset.section === 'home') {
                this.renderAllTracks();
            } else if (btn.dataset.section === 'recommendations') {
                this.renderRecommendations();
            } else if (btn.dataset.section === 'history') {
                this.renderHistory();
            } else if (btn.dataset.section === 'favorites') {
                this.renderFavorites();
            }
        }
    }

    // ===== МОБИЛЬНОЕ МЕНЮ =====
    toggleMenu() {
        if (!this.sidebar || !this.menuBtn) return;
        
        this.sidebar.classList.toggle('active');
        this.menuBtn.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    }

    closeMenu() {
        if (!this.sidebar || !this.menuBtn) return;
        
        this.sidebar.classList.remove('active');
        this.menuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
    }
}

// Инициализация
let player;
document.addEventListener('DOMContentLoaded', () => {
    player = new SpotifyMusicPlayer();
    // Дополнительный вызов рендеринга на случай, если асинхронная загрузка не сработала
    setTimeout(() => {
        if (player && player.allTracks && player.allTracks.length > 0) {
            player.renderAllTracks();
        }
    }, 500);
});
