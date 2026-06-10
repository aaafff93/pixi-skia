import * as PIXI from 'pixi.js-legacy';
import type {CanvasKit, Surface} from 'skia';
import {collectSceneNodes} from './sceneNodes.ts';
import {renderToScreen} from './export.ts';
import {demoScenes} from './pixiScenes.ts';

export const loadPixiScene = async (
    app: PIXI.Application,
    CanvasKit: CanvasKit,
    surface: Surface,
    sceneIndex: number,
    currentContainer: PIXI.Container | null
) => {

    const sceneTitle =
        document.querySelector<HTMLElement>('#scene-description')

    if (sceneTitle) {
        sceneTitle.textContent = demoScenes[sceneIndex]?.description ?? ''
    }

    if (currentContainer) {
        app.stage.removeChild(currentContainer)

        currentContainer.destroy({children: true})
    }

    const pixiContainer = await demoScenes[sceneIndex].create()

    app.stage.addChild(pixiContainer)

    app.renderer.render(app.stage)

    const sceneNodes = await collectSceneNodes(pixiContainer)

    renderToScreen(
        CanvasKit,
        surface,
        sceneNodes
    )

    return {
        pixiContainer,
        sceneNodes
    }
}