import './style.css'
import {initPixi} from './shared/functions/initPixi.ts';
import {initSkia} from './shared/functions/initSkia.ts';
import {bindPointerEvents} from './shared/functions/eventManager.ts';
import {collectSceneNodes} from './shared/functions/sceneNodes.ts';
import {exportPdf, renderToScreen} from './shared/functions/export.ts';
import {createRandomObject} from './shared/functions/createPixiShape.ts';
import * as PIXI from 'pixi.js-legacy';
import starImage from './assets/star.png';
import duckImage from './assets/duck.png';
import catImage from './assets/cat.png';
import {demoScenes} from './shared/functions/pixiScenes.ts';
import type {SceneNode} from './shared/types/types.ts';
import {loadPixiScene} from './shared/functions/loadPixiScene.ts';

export const textures = await Promise.all<PIXI.Texture>([
    PIXI.Assets.load(starImage),
    PIXI.Assets.load(duckImage),
    PIXI.Assets.load(catImage)
])

const app = initPixi('#pixi-root')

const {CanvasKit, surface, canvas} = await initSkia('#skia-root')

let currentScene = 0

let pixiContainer: PIXI.Container | null = null

let sceneNodes: SceneNode[] = []

// инициализация сцены, собирает массив узлов для разделения описания сцены от рендера,
// чтобы была возможность подключать различные варианты для рендера
const initialScene =
    await loadPixiScene(
        app,
        CanvasKit,
        surface,
        currentScene,
        pixiContainer
    )

pixiContainer = initialScene.pixiContainer

sceneNodes = initialScene.sceneNodes

bindPointerEvents(
    canvas,
    () => sceneNodes
)

const exportButton =
    document.querySelector<HTMLButtonElement>(
        '#export-pdf'
    )

exportButton?.addEventListener(
    'click',
    () =>
        exportPdf(
            CanvasKit,
            sceneNodes
        )
)

const randomButton =
    document.querySelector<HTMLButtonElement>(
        '#add-random'
    )

randomButton?.addEventListener(
    'click',
    async () => {

        if (!pixiContainer) {
            return
        }

        const object = createRandomObject(textures)

        pixiContainer.addChild(
            object
        )

        app.renderer.render(app.stage)

        sceneNodes = await collectSceneNodes(pixiContainer)

        renderToScreen(CanvasKit, surface, sceneNodes)
    }
)

const prevButton =
    document.querySelector<HTMLButtonElement>(
        '#prev'
    )

const nextButton =
    document.querySelector<HTMLButtonElement>(
        '#next'
    )

prevButton?.addEventListener(
    'click',
    async () => {

        currentScene--

        if (currentScene < 0) {
            currentScene =
                demoScenes.length - 1
        }

        const result = await loadPixiScene(
            app,
            CanvasKit,
            surface,
            currentScene,
            pixiContainer
        )

        pixiContainer = result.pixiContainer

        sceneNodes = result.sceneNodes
    }
)

nextButton?.addEventListener(
    'click',
    async () => {

        currentScene++

        if (currentScene >= demoScenes.length) {
            currentScene = 0
        }

        const result =
            await loadPixiScene(
                app,
                CanvasKit,
                surface,
                currentScene,
                pixiContainer
            )

        pixiContainer = result.pixiContainer

        sceneNodes = result.sceneNodes
    }
)
