# 🔧 Решение проблем - Troubleshooting Guide

Полное руководство по диагностике и решению проблем в ЗвукЛист.

## 🆘 Первые шаги при проблеме

### 1. Проверьте консоль браузера

```
Windows: F12 → Console вкладка
Mac: Cmd + Option + J → Console вкладка
```

Там будут видны точные ошибки.

### 2. Очистите кэш и перезагрузитесь

```
Windows: Ctrl + Shift + Delete
Mac: Cmd + Shift + Delete
Потом: Ctrl + F5 (или Cmd + Shift + R на Mac)
```

### 3. Полная очистка данных

```
F12 → Application (или Storage) → 
  → Local Storage → (выберите сайт) → Clear All
```

## 🎵 Музыка и аудио

### Проблема: Треки не загружаются

**Причины:**
- Неправильные пути в music.json
- MP3 файлы не в папке assets/music/
- Сервер не запущен (нужен Live Server)
- CORS ошибки при локальном открытии

**Решение:**

1. **Проверьте пути в music.json:**
```json
"src": "assets/music/track1.mp3",  // Путь должен быть ТОЧНО такой
"cover": "assets/covers/cover1.jpg"
```

2. **Используйте Live Server:**
   - Откройте index.html с расширением Live Server (VS Code)
   - Или запустите Python сервер:
   ```bash
   python -m http.server 8000
   # Откройте http://localhost:8000
   ```

3. **Проверьте структуру папок:**
```
zvuklist/
├── assets/
│   ├── music/
│   │   └── track1.mp3  ← Файлы должны быть ТУТ
│   └── covers/
│       └── cover1.jpg  ← И тут
├── index.html
├── music.json
└── ...
```

4. **Проверьте консоль:** F12 → Network → видны ли запросы к track1.mp3?

### Проблема: Звук не воспроизводится

**Причины:**
- Браузер заблокировал автопроизведение
- Volume установлен на 0
- Audio элемент имеет проблемы

**Решение:**

1. **Проверьте громкость:**
   - Откройте ползунок громкости в интерфейсе
   - Убедитесь что не в 0
   
2. **Проверьте системную громкость:**
   - Windows: Значок динамика внизу справа
   - Mac: Значок динамика вверху справа

3. **Разрешения браузера:**
   - В адресной строке может быть иконка блокировки
   - Нажимите и позвольте браузеру воспроизводить аудио

4. **Попробуйте другой браузер:**
   - Chrome, Firefox, Edge, Safari
   - Может быть проблема конкретного браузера

### Проблема: Музыка зависает или прерывается

**Причины:**
- Медленный интернет
- Большой файл
- Проблема плеера

**Решение:**

1. **Переконвертируйте MP3:**
```bash
# Используйте ffmpeg для переконвертации
ffmpeg -i input.mp3 -b:a 192k output.mp3
```

2. **Уменьшите размер файла:**
   - Оригинальный размер больше 5MB?
   - Сжимайте файлы MP3

3. **Проверьте bitrate:**
```bash
ffprobe -v error -select_streams a:0 -show_entries stream=bit_rate -of default=noprint_wrappers=1:nokey=1:novalue=1 track.mp3
```

Должно быть 128-320 kbps.

## 📁 JSON и данные

### Проблема: JSON не загружается

**Ошибка в консоли:** `Unexpected token < in JSON`

**Решение:**

1. **Проверьте синтаксис JSON:**
```bash
# Windows PowerShell
python -m json.tool music.json

# Или используйте онлайн валидатор: https://jsonlint.com/
```

2. **Типичные ошибки:**
```json
// ❌ НЕПРАВИЛЬНО - запятая после последнего элемента
{
  "tracks": [
    {"id": 1, "title": "Song"},  ← Лишняя запятая!
  ]
}

// ✅ ПРАВИЛЬНО - нет запятой после последнего
{
  "tracks": [
    {"id": 1, "title": "Song"}  ← Нет запятой!
  ]
}
```

3. **Проверьте структуру:**
```json
// ✅ Обязательная структура
{
  "tracks": [],    // Массив
  "genres": [],    // Массив
  "playlists": []  // Массив
}
```

### Проблема: Треки видны но их нету в JSON

**Решение:**

1. **Убедитесь что трек добавлен в массив:**
```json
"tracks": [
  {
    "id": 1,
    "title": "Название",
    "artist": "Артист",
    "src": "assets/music/track1.mp3",
    "cover": "assets/covers/cover1.jpg",
    "duration": 245,
    "genre": "Электроника",
    "year": 2024
  }  ← Закрывающая скобка обязательна
]
```

2. **Проверьте ID треков:**
   - Все ID должны быть уникальные
   - Начинайте с ID: 1

### Проблема: Плейлисты не сохраняются

**Причина:** localStorage переполнен или отключен

**Решение:**

1. **Проверьте localStorage:**
```javascript
// В консоли браузера
console.log(localStorage);
console.log(localStorage.length);
```

2. **Очистите старые данные:**
```javascript
// Удалите ненужные
localStorage.removeItem('playHistory');

// Или все
localStorage.clear();
```

3. **Проверьте разрешения браузера:**
   - Settings → Privacy → Cookies and site data → Manage site data
   - Включить для вашего сайта

4. **Приватный режим:**
   - Приватный/Incognito режим не сохраняет localStorage
   - Откройте в обычном режиме

## 🔍 Поиск

### Проблема: Поиск не работает

**Проверочный список:**

1. **Убедитесь что треки загружены:**
```javascript
// В консоли
console.log(player.allTracks);
// Должен быть массив с треками
```

2. **Проверьте русские буквы:**
   - Поиск русского текста может быть проблемой
   - Попробуйте английское имя трека

3. **Попробуйте вручную:**
```javascript
// В консоли браузера
player.handleSearch();
player.renderAllTracks();
```

### Проблема: Поиск показывает только 1 результат

**Решение:**

Найдите в `script_spotify.js`:
```javascript
const maxResults = 5;  // Увеличьте это число
```

Измените на:
```javascript
const maxResults = 10;  // Больше результатов
```

## 🎨 Интерфейс и стили

### Проблема: CSS не применяется

**Решение:**

1. **Проверьте ссылку на CSS:**
```html
<!-- Должно быть в index.html -->
<link rel="stylesheet" href="style_spotify.css">
<!-- Не style.css! -->
```

2. **Очистите кэш браузера:**
```
Ctrl + Shift + Delete → очистить кэш
```

3. **Проверьте файл style_spotify.css:**
   - Существует в той же папке что и index.html?
   - Имя ТОЧНО style_spotify.css?

### Проблема: Сидбар не видно на мобильном

**Решение:**

Это нормально! На мобильных сидбар скрыт.

Если хотите показать сидбар также на мобильных:

В `style_spotify.css` найдите:
```css
@media (max-width: 768px) {
  .sidebar {
    display: none;  ← Удалите эту часть или измените на display: flex;
  }
}
```

### Проблема: Кнопки не работают

**Решение:**

1. **Проверьте JavaScript загружен:**
```javascript
// В консоли
console.log(player);
// Должен вывести объект SpotifyMusicPlayer
```

2. **Проверьте ссылку на JS:**
```html
<!-- В конце index.html должно быть -->
<script src="script_spotify.js"></script>
<!-- Не script.js! -->
```

3. **Если кнопка не работает:**
   - Откройте консоль (F12)
   - Нажмите кнопку
   - Смотрите что показалось в консоли

### Проблема: Обложка не видна

**Решение:**

1. **Проверьте пути:**
```json
"cover": "assets/covers/cover1.jpg"  // Путь должен быть правильный
```

2. **Проверьте что файл существует:**
```
zvuklist/
├── assets/
│   └── covers/
│       └── cover1.jpg  ← Файл находится тут?
```

3. **Расширение файла:**
   - Поддерживаются: .jpg, .jpeg, .png, .webp
   - Не поддерживаются: .bmp, .tiff

4. **Размер обложки:**
   - Слишком большая? Сожмите
   - Рекомендуемый размер: 300x300px

## 🎼 Рекомендации и похожие

### Проблема: Рекомендации пусты

**Причина:** История прослушивания пуста

**Решение:**

1. **Слушайте треки:**
   - Проиграйте хотя бы 3 трека
   - Каждый хотя бы на 10 секунд
   - Рекомендации обновятся

2. **Проверьте историю:**
```javascript
// В консоли
console.log(player.playHistory);
// Должны быть недавно проигранные треки
```

3. **Вручную обновите рекомендации:**
```javascript
// В консоли
player.renderRecommendations();
```

### Проблема: Рекомендации всегда одни и те же

**Решение:**

Это нормальное поведение алгоритма.

Для изменения:
- Слушайте треки из разных жанров
- Добавляйте в избранное разные треки
- История влияет на рекомендации

## 📋 Плейлисты

### Проблема: Не могу создать плейлист

**Решение:**

1. **Проверьте консоль на ошибки:**
```
F12 → Console → есть красные ошибки?
```

2. **Попробуйте вручную:**
```javascript
// В консоли браузера
player.showCreatePlaylistForm();
// Должна появиться форма
```

3. **Если форма не появляется:**
   - Откройте консоль
   - Введите выше код
   - Смотрите ошибку

### Проблема: Плейлист не сохраняется

**Решение:**

1. **Проверьте localStorage:**
```javascript
// В консоли
console.log(localStorage.getItem('playlists'));
// Должен быть JSON
```

2. **Попытайтесь сохранить вручную:**
```javascript
// В консоли
player.savePlaylists();
// Должно сохраниться
```

3. **Частая причина - переполнение localStorage:**
```javascript
// В консоли
localStorage.clear();  // Очистить все
location.reload();     // Перезагрузить
```

### Проблема: Не вижу плейлист что создал

**Решение:**

1. **Обновите страницу:**
```
F5 или Ctrl + R
```

2. **Загрузите плейлист вручную:**
```javascript
// В консоли
player.loadPlaylists();
player.renderPlaylists();
```

3. **Проверьте что плейлист создан:**
```javascript
// В консоли
console.log(player.userPlaylists);
// Должен быть в массиве
```

## ⭐ Избранное

### Проблема: Избранное не сохраняется

**Решение:**

```javascript
// В консоли браузера
player.saveFavorites();
player.loadFavorites();
player.renderFavorites();
```

### Проблема: Сердечко не меняется

**Решение:**

1. **Попробуйте вручную:**
```javascript
player.updateFavoriteButton();
```

2. **Проверьте что трек выбран:**
```javascript
// Должен быть номер трека
console.log(player.currentTrackIndex);
```

## ⏱️ История

### Проблема: История пуста

**Решение:**

1. **Слушайте треки:**
   - История добавляется только при проигрывании
   - Сдвиньте плеер вперед чтобы добавить

2. **Проверьте историю:**
```javascript
// В консоли
console.log(player.playHistory);
```

3. **Загрузите вручную:**
```javascript
player.loadHistory();
player.renderHistory();
```

### Проблема: История заполняется неправильно

**Решение:**

Очистите и начните заново:
```javascript
// В консоли
localStorage.removeItem('playHistory');
location.reload();
```

## 🌙 Тема

### Проблема: Тема не переключается

**Решение:**

1. **Попробуйте вручную:**
```javascript
// В консоли
player.toggleTheme();
```

2. **Сброс темы:**
```javascript
localStorage.removeItem('theme');
location.reload();
```

3. **Установите определенную тему:**
```javascript
document.body.className = 'light-theme';
localStorage.setItem('theme', 'light-theme');
```

### Проблема: Темная тема слишком темная/светлая

**Решение:**

Отредактируйте `style_spotify.css`:

```css
:root {
  --primary-color: #0a0a1a;  /* Измените это число */
}
```

## 🔊 Громкость

### Проблема: Громкость не работает

**Решение:**

1. **Проверьте системную громкость:**
   - Windows: Значок динамика внизу справа
   - Mac: Menu → Sound → Volume Up

2. **Установите громкость вручную:**
```javascript
// В консоли браузера (200% это очень громко!)
player.audioPlayer.volume = 0.8;  // 80%
```

3. **Проверьте браузер:**
   - Некоторые браузеры громче/тише других
   - Попробуйте другой браузер

## 💡 Общие ошибки

| Ошибка | Причина | Решение |
|--------|---------|---------|
| `Cannot read property 'play' of undefined` | Плеер не инициализирован | Перезагрузите страницу |
| `Unexpected end of JSON input` | Синтаксис JSON неправильный | Проверьте music.json в jsonlint.com |
| `404 Not Found` | Файл не найден | Проверьте пути в JSON |
| `CORS error` | Открыли файл как file:// | Используйте Live Server |
| `localStorage is not defined` | Браузер не поддерживает | Используйте другой браузер |

## 🔧 Резервные решения

### Если ничего не помогает:

1. **Полная очистка:**
```powershell
# Windows PowerShell
Remove-Item -Recurse -Force "$env:APPDATA\Google\Chrome\User Data\Cache"
Remove-Item -Recurse -Force "$env:APPDATA\Google\Chrome\User Data\Code Cache"
```

2. **Удалите все данные:**
```javascript
// В консоли браузера
localStorage.clear();
sessionStorage.clear();
// F5 для перезагрузки
```

3. **Переустановите браузер:**
   - Скачайте заново Chrome/Firefox
   - Переустановите

4. **Используйте другой браузер:**
   - Chrome (рекомендуется)
   - Firefox
   - Edge
   - Safari

## 🆘 Если все равно не работает

**Сбор информации для отладки:**

1. **Откройте F12 → Console**
2. **Выполните эту команду:**
```javascript
{
  player: player ? 'loaded' : 'not loaded',
  tracks: player ? player.allTracks.length : 0,
  html: document.title,
  storage: localStorage.length,
  version: 'Spotify v2.0'
}
```

3. **Скопируйте результат**
4. **Используйте для отладки**

## 📚 Полезные ссылки

- [MDN: HTML Audio](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/audio)
- [MDN: localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)
- [JSON Validator](https://jsonlint.com/)
- [Browser DevTools](https://developer.chrome.com/docs/devtools/)
- [CSS Grid Guide](https://css-tricks.com/snippets/css/complete-guide-grid/)

---

**Не отчаивайтесь! Большинство проблем решаются перезагрузкой и очисткой кэша! 🚀**
