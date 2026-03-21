# 🎨 Кастомизация ЗвукЛист

Подробное руководство по персонализации музыкальной платформы.

## 🌈 Цвета и оформление

### Основная цветовая схема

Все цвета храняются в переменных CSS. Откройте **style_spotify.css** и найдите:

```css
:root {
  /* Основные цвета */
  --primary-color: #1a1a40;           /* Темный фон */
  --secondary-color: #3a0ca3;         /* Вторичный */
  --accent-color: #ff4d6d;            /* Ярко розовый */
  --success-color: #06d6a0;           /* Зеленый */
  --text-color: #ffffff;              /* Белый текст */
  --text-light: #b0b0b0;              /* Серый текст */
  --border-color: rgba(255, 255, 255, 0.1); /* Граница */
  
  /* Размеры */
  --sidebar-width: 280px;             /* Ширина меню */
  --border-radius: 12px;              /* Скругление углов */
  --transition-speed: 0.3s;           /* Скорость анимации */
}
```

### Как менять цвета

#### Светлая тема
Найдите раздел `/* Светлая тема */` в конце файла и измените:

```css
body.light-theme {
  --primary-color: #f5f5f7;           /* Белый фон */
  --secondary-color: #f0f0f2;         /* Серый фон */
  --accent-color: #ff4d6d;            /* Сохранить розовый */
  --text-color: #000000;              /* Черный текст */
  --text-light: #666666;              /* Темносерый */
  --border-color: rgba(0, 0, 0, 0.1); /* Серая граница */
}
```

#### Примеры изменения цветов

**Поменять основной розовый на синий:**
```css
--accent-color: #0066ff;  /* Вместо #ff4d6d */
```

**Поменять фон на фиолетовый:**
```css
--primary-color: #2d1b4e;  /* Вместо #1a1a40 */
```

**Сделать более яркие цвета:**
```css
--secondary-color: #5a0fbf;  /* Было #3a0ca3 */
```

## 🎵 Добавление музыки

### Структура папок

```
zvuklist/
├── assets/
│   ├── music/
│   │   ├── track1.mp3
│   │   ├── track2.mp3
│   │   └── ...
│   └── covers/
│       ├── cover1.jpg
│       ├── cover2.jpg
│       └── ...
├── music.json
└── index.html
```

### Шаг 1: Загрузить MP3 файлы

1. Создайте папку `assets/music/` если её нет
2. Скопируйте MP3 файлы в эту папку
3. Переименуйте их по порядку: `track1.mp3`, `track2.mp3` и т.д.

### Шаг 2: Загрузить обложки

1. Создайте папку `assets/covers/` если её нет
2. Скопируйте JPG/PNG изображения (300x300px рекомендуется)
3. Переименуйте: `cover1.jpg`, `cover2.jpg` и т.д.

### Шаг 3: Обновить music.json

Откройте `music.json` и добавьте треки в массив `"tracks"`:

```json
{
  "tracks": [
    {
      "id": 1,
      "title": "Название песни",
      "artist": "Имя артиста",
      "src": "assets/music/track1.mp3",
      "cover": "assets/covers/cover1.jpg",
      "duration": 245,
      "genre": "Электроника",
      "year": 2024
    },
    {
      "id": 2,
      "title": "Вторая песня",
      "artist": "Артист 2",
      "src": "assets/music/track2.mp3",
      "cover": "assets/covers/cover2.jpg",
      "duration": 312,
      "genre": "Поп",
      "year": 2023
    }
  ],
  "genres": [
    {
      "name": "Электроника",
      "icon": "⚡",
      "color": "#00d4ff"
    },
    {
      "name": "Поп",
      "icon": "🎤",
      "color": "#ff4d6d"
    }
  ],
  "playlists": []
}
```

#### Как получить длительность песни

**Способ 1: Через браузер**
1. Откройте `index.html` в браузере
2. Добавьте трек с любой длительностью (например 200)
3. Откройте консоль: F12 → Console
4. Введите: `console.log(player.audioPlayer.duration)`
5. Скопируйте число и округлите его

**Способ 2: Через командную строку (Windows)**
```bash
ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1:novalue=1 track1.mp3
```

**Способ 3: Вручную по файлу**
- Откройте файл в медиаплеере (Windows Media Player, VLC)
- Посмотрите длительность

## 📝 Добавление жанров

В файле `music.json` добавьте новый жанр:

```json
"genres": [
  {
    "name": "Металл",
    "icon": "🎸",
    "color": "#ff0000"
  },
  {
    "name": "Джаз",
    "icon": "🎷",
    "color": "#ffaa00"
  }
]
```

**Полезные иконки для жанров:**
- Рок: 🎸
- Металл: 🤘
- Джаз: 🎷
- Классика: 🎻
- Хип-хоп: 🎤
- Танцевальная: 💃
- Фолк: 🎶
- Кантри: 🤠
- Блюз: 🎷
- Электроника: ⚡

## 🎮 Изменение интерфейса

### Размер бокового меню

В `style_spotify.css` найдите:

```css
:root {
  --sidebar-width: 280px;  /* Измените это число */
}
```

Варианты:
- `220px` - узкое меню
- `280px` - стандартное (текущее)
- `350px` - широкое меню

### Размер иконок плеера

Найдите в `style_spotify.css`:

```css
.player-cover {
  width: 250px;      /* Измените размер */
  height: 250px;     /* Измените размер */
}
```

Варианты:
- `150px` - маленькая обложка
- `250px` - стандартная
- `400px` - большая обложка

### Размер шрифта

Найдите в `style_spotify.css`:

```css
:root {
  font-size: 16px;  /* Базовый размер */
}
```

Варианты:
- `14px` - меньший шрифт
- `16px` - стандартный
- `18px` - больший шрифт

### Скорость анимаций

Найдите в `style_spotify.css`:

```css
:root {
  --transition-speed: 0.3s;  /* Измените время */
}
```

Варианты:
- `0.1s` - очень быстро
- `0.3s` - нормально (текущее)
- `0.8s` - медленно

## 🔤 Текст и язык

### Свой текст вместо стандартного

Откройте `index.html` и найдите элементы:

```html
<div class="app-title">🎵 ЗвукЛист</div>
```

Замените на свой текст:

```html
<div class="app-title">🎵 MyMusic</div>
```

#### Остальные основные тексты

```html
<!-- Название в боковом меню -->
<div class="app-title">Ваше название</div>

<!-- Заголовки разделов -->
<h2>Главная</h2>
<h2>Поиск</h2>

<!-- Кнопки -->
<button>Создать плейлист</button>
```

## 📱 Адаптивный дизайн

Изменение для мобильных устройств находится в конце `style_spotify.css`:

```css
/* Планшеты */
@media (max-width: 1024px) {
  :root {
    --sidebar-width: 200px;
  }
}

/* Малые планшеты */
@media (max-width: 768px) {
  :root {
    --sidebar-width: 0px;  /* Скрывает меню */
  }
}

/* Мобильные */
@media (max-width: 480px) {
  .player-cover {
    width: 150px;
    height: 150px;
  }
}
```

Откройте эти разделы если нужно изменить мобильный вид.

## 🎨 Пользовательские темы

### Создание своей темы

Откройте `style_spotify.css` и добавьте в конец:

```css
/* Новая тема - Киберпанк */
body.cyberpunk-theme {
  --primary-color: #0a0e27;
  --secondary-color: #16213e;
  --accent-color: #00ff88;
  --text-color: #ffffff;
  --text-light: #888888;
  --border-color: rgba(0, 255, 136, 0.1);
}
```

Затем в `script_spotify.js` найдите функцию `toggleTheme()` и добавьте:

```javascript
toggleTheme() {
  const themes = ['light-theme', 'dark-theme', 'cyberpunk-theme'];
  const currentTheme = document.body.className.split(' ').find(c => themes.includes(c));
  const currentIndex = themes.indexOf(currentTheme);
  const nextIndex = (currentIndex + 1) % themes.length;
  
  document.body.className = themes[nextIndex];
  localStorage.setItem('theme', themes[nextIndex]);
}
```

## 🔧 Продвинутые параметры

### Максимум треков в истории

В файле `script_spotify.js` найдите:

```javascript
"playHistory": [
  // ...
],
```

И измените это число (по умолчанию максимум 50):

```javascript
// Если история больше 50, удаляем старые
if (this.playHistory.length > 50) {
  this.playHistory = this.playHistory.slice(-50);
}
```

Замените `50` на нужное вам число.

### Количество рекомендаций

В `script_spotify.js` найдите `renderRecommendations()`:

```javascript
renderRecommendations() {
  const maxRecommendations = 8;  // Количество предложений
  // ...
}
```

### Количество результатов поиска

В `script_spotify.js` найдите `handleSearch()`:

```javascript
handleSearch() {
  const maxResults = 5;  // Максимум результатов
  // ...
}
```

## 📊 Сложные кастомизации

### Добавление новой секции

1. Откройте `index.html` и добавьте новую секцию:

```html
<section id="mynew-section" class="section">
  <div class="section-container">
    <h2>Новая секция</h2>
    <div id="mynew-content"></div>
  </div>
</section>
```

2. Добавьте кнопку в сидбар:

```html
<button class="nav-btn" data-section="mynew">📌 Новая</button>
```

3. В `script_spotify.js` добавьте метод:

```javascript
renderMyNew() {
  const container = document.getElementById('mynew-content');
  container.innerHTML = '<p>Контент новой секции</p>';
}
```

4. В `script_spotify.js` найдите `switchSection()` и добавьте обработку.

## 💾 Экспорт и импорт

### Сохранить все данные пользователя

```javascript
// Откройте консоль (F12 → Console) и выполните:
const userData = {
  favorites: localStorage.getItem('favorites'),
  playlists: localStorage.getItem('playlists'),
  history: localStorage.getItem('playHistory'),
  theme: localStorage.getItem('theme')
};

const json = JSON.stringify(userData);
console.log(json);
// Скопируйте результат
```

### Восстановить данные пользователя

```javascript
// Вставьте сохраненные данные:
const userData = { /* вставьте скопированный JSON */ };

localStorage.setItem('favorites', userData.favorites);
localStorage.setItem('playlists', userData.playlists);
localStorage.setItem('playHistory', userData.history);
localStorage.setItem('theme', userData.theme);

// Перезагрузите страницу (F5)
```

## 🎯 Быстрые настройки

### Все элементы управления CSS

| Параметр | Строка | По умолчанию |
|----------|--------|------------|
| Основной цвет | `--primary-color` | `#1a1a40` |
| Ширина меню | `--sidebar-width` | `280px` |
| Скагление углов | `--border-radius` | `12px` |
| Скорость анимации | `--transition-speed` | `0.3s` |
| Розовый акцент | `--accent-color` | `#ff4d6d` |
| Зеленый успех | `--success-color` | `#06d6a0` |

### Все управляющие функции JavaScript

| Функция | Назначение |
|---------|-----------|
| `player.play()` | Начать проигрывание |
| `player.pause()` | Пауза |
| `player.toggleFavorite()` | Добавить в избранное |
| `player.renderHistory()` | Показать историю |
| `player.toggleTheme()` | Переключить тему |
| `player.createPlaylist()` | Новый плейлист |

## ❓ Часто задаваемые вопросы

### Как убрать сидбар на мобильных?

В `style_spotify.css` найдите:
```css
@media (max-width: 768px) {
  .sidebar {
    display: none;  /* Добавьте эту строку */
  }
}
```

### Как сделать темнее/светлее?

В `:root` измените `--primary-color` на более темный/светлый цвет:
```css
--primary-color: #0d0d1f;  /* Еще темнее */
```

### Как убрать анимации?

측установите все анимации на 0:
```css
--transition-speed: 0s;
```

Или найдите все `animation: ...` и замените на `animation: none;`

### Как добавить свой шрифт?

В начало `style_spotify.css` добавьте:
```css
@import url('https://fonts.googleapis.com/css2?family=YOUR_FONT&display=swap');

body {
  font-family: 'YOUR_FONT', sans-serif;
}
```

---

**Наслаждайтесь кастомизацией! 🎨**
