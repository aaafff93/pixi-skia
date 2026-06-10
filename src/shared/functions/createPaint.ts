import type {CanvasKit, Paint} from 'skia'
import {pixiColorToSkia} from './utils.ts';

export const createFillPaint = (
    CanvasKit: CanvasKit,
    color: number,
    alpha: number,
) => {

    const paint = new CanvasKit.Paint()

    paint.setAntiAlias(true)

    paint.setStyle(
        CanvasKit.PaintStyle.Fill,
    )

    paint.setColor(
        pixiColorToSkia(
            CanvasKit,
            color,
            alpha,
        ),
    )

    return paint
}

export const createStrokePaint = (
    CanvasKit: CanvasKit,
    color: number,
    alpha: number,
    width: number,
) => {

    const paint = new CanvasKit.Paint()

    paint.setAntiAlias(true)

    paint.setStyle(
        CanvasKit.PaintStyle.Stroke,
    )

    paint.setStrokeWidth(width)

    paint.setColor(
        pixiColorToSkia(
            CanvasKit,
            color,
            alpha,
        ),
    )

    return paint
}

export const renderFillAndStroke = (
    CanvasKit: CanvasKit,
    draw: (paint: Paint) => void,
    node: {
        fillVisible: boolean
        fillColor: number
        fillAlpha: number
        strokeVisible: boolean
        strokeColor: number
        strokeAlpha: number
        strokeWidth: number
    },
) => {

    if (node.fillVisible) {
        const paint =
            createFillPaint(
                CanvasKit,
                node.fillColor,
                node.fillAlpha,
            )
        draw(paint)
        paint.delete()
    }
    if (
        node.strokeVisible &&
        node.strokeWidth > 0
    ) {
        const paint =
            createStrokePaint(
                CanvasKit,
                node.strokeColor,
                node.strokeAlpha,
                node.strokeWidth,
            )
        draw(paint)
        paint.delete()
    }
}