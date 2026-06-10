# Pixi.js + Skia Renderer

Проект демонстрирует интеграцию Pixi.js и Skia (CanvasKit) с возможностью экспорта сцены в векторный PDF

## Возможности:

- Рендер PIXI.Container через Skia
- Поддержка вложенных контейнеров
- Поддержка трансформаций (position, rotation, scale)
- Поддержка PIXI.Graphics и PIXI.Sprite
- Поддержка событий pointerdown и pointerup
- Экспорт сцены в PDF через Skia PDF backend
- Генерация случайных фигур
- Переключение между заранее подготовленными сценами

## Технологии
- Pixi.js-legacy 7.2.4
- Skia (CanvasKit) с кастомной wasm-сборкой (PDF-бэкенд)
- TypeScript
- Vite

## Репозиторий

https://github.com/aaafff93/pixi-skia

## Демо

https://pixi-skia-ruby.vercel.app/

## Установка и запуск

```bash
git clone https://github.com/aaafff93/pixi-skia.git
cd pixi-skia
npm install
npm run dev
```
