# Qwixy Landing v2

Одностраничный лендинг для Telegram-бота Qwixy.

## Как открыть локально

Самый простой способ:

1. Распакуй архив.
2. Открой `index.html` двойным кликом в браузере.

Лучше через локальный сервер:

```bash
npm install
npm run dev
```

После этого сайт будет доступен на:

```text
http://localhost:4173
```

## Как деплоить на Railway

Рекомендуемый вариант: отдельный service, не смешивать с Telegram-ботом.

1. Создай новый GitHub-репозиторий.
2. Загрузи туда все файлы из этой папки.
3. В Railway нажми `New Project`.
4. Выбери `Deploy from GitHub repo`.
5. Выбери репозиторий с лендингом.
6. Railway сам поднимет сайт через Dockerfile.

## Как деплоить на Vercel

1. Создай GitHub-репозиторий.
2. Загрузи файлы.
3. На Vercel нажми `Add New Project`.
4. Выбери репозиторий.
5. Framework preset: `Other`.
6. Build command можно оставить пустым.
7. Output directory: `./`.

## Что менять

- Текст: `script.js`
- Цвета/дизайн: `styles.css`
- Картинки/видео: папка `assets`
- Ссылка на бота: `https://t.me/QwixyMatchBot` в `index.html` и `script.js`


## Update

Steam video replaced. Current video dimensions: 512×832.


## Mobile fix

Добавлена адаптация под телефоны: hero, карточка профиля, header, кнопки, блоки, видео Steam и футер.


## Real mobile-first fix v9

Сделана жёсткая мобильная адаптация: первый экран, карточка профиля, блоки, кнопки и видео рассчитаны в первую очередь на телефон.
