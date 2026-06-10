import CanvasKitInit from 'skia'
import CanvasKitWasm from '../../modules/skia/canvaskit.wasm?url'
import {SKIA_CANVAS_HEIGHT, SKIA_CANVAS_WIDTH} from '../constants/constants.ts';

export const initSkia = async (rootSelector: string) => {
    const root = document.querySelector<HTMLElement>(rootSelector)

    if (!root) {
        throw new Error(`Root '${rootSelector}' not found`)
    }

    const canvas = document.createElement('canvas')

    canvas.width = SKIA_CANVAS_WIDTH
    canvas.height = SKIA_CANVAS_HEIGHT

    root.appendChild(canvas)

    const CanvasKit = await CanvasKitInit({
        locateFile: () => CanvasKitWasm,
    })

    const surface = CanvasKit.MakeWebGLCanvasSurface(canvas)

    if (!surface) {
        throw new Error(`Surface not found`)
    }

    return {
        CanvasKit,
        surface,
        canvas
    }
}