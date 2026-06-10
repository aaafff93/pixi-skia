import * as PIXI from 'pixi.js-legacy'
import {PIXI_CANVAS_HEIGHT, PIXI_CANVAS_WIDTH, SCENE_BG} from '../constants/constants.ts';

export const initPixi = (rootSelector: string) => {
    const root = document.querySelector<HTMLElement>(rootSelector)

    if (!root) {
        throw new Error(`Root '${rootSelector}' not found`)
    }

    const app = new PIXI.Application({
        width: PIXI_CANVAS_WIDTH,
        height: PIXI_CANVAS_HEIGHT,
        background: SCENE_BG,
        forceCanvas: true,
    })

    root.appendChild(app.view as HTMLCanvasElement)

    return app
}