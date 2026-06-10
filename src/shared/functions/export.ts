import type {Scene, SceneNode} from '../types/types.ts';
import {pixiColorToSkia} from './utils.ts';
import {SCENE_BG, SKIA_CANVAS_HEIGHT, SKIA_CANVAS_WIDTH} from '../constants/constants.ts';
import {renderSceneNodes} from './sceneNodes.ts';
import type {Surface, CanvasKit} from 'skia';

export const renderToScreen = (
    CanvasKit: CanvasKit,
    surface: Surface,
    sceneNodes: SceneNode[]
) => {
    const canvas = surface.getCanvas()

    canvas.clear(
        pixiColorToSkia(
            CanvasKit,
            SCENE_BG,
            1,
        ),
    )

    renderSceneNodes(
        CanvasKit,
        canvas,
        sceneNodes
    )

    surface.flush()
}

const renderToPdf = (
    CanvasKit: CanvasKit,
    scene: Scene,
) => {

    const pdfBytes =
        CanvasKit._renderPDF(
            scene
        )

    if (!pdfBytes || pdfBytes.length === 0) {
        return
    }

    const blob = new Blob(
        [pdfBytes],
        {
            type: 'application/pdf'
        }
    )

    const url = URL.createObjectURL(blob)

    const link = document.createElement('a')

    link.href = url

    link.download = 'scene.pdf'

    link.click()

    setTimeout(
        () => URL.revokeObjectURL(url),
        1000
    )
}

export const exportPdf = (
    CanvasKit: CanvasKit,
    sceneNodes: SceneNode[]
) => {
    const scene: Scene = {
        width: SKIA_CANVAS_WIDTH,
        height: SKIA_CANVAS_HEIGHT,
        backgroundColor: SCENE_BG,
        nodes: sceneNodes
    }
    renderToPdf(
        CanvasKit,
        scene
    )
}