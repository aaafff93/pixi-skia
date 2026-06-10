import type {CanvasKit} from 'skia'
import * as PIXI from 'pixi.js-legacy';
import {minCanvasSize, PIXI_CANVAS_HEIGHT, PIXI_CANVAS_WIDTH} from '../constants/constants.ts';

export const distanceToSegmentSquared = (
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
) => {

    const dx = x2 - x1
    const dy = y2 - y1

    const lengthSquared = dx * dx + dy * dy

    if (lengthSquared === 0) {
        return Infinity
    }

    const t =
        Math.max(
            0,
            Math.min(
                1,
                (
                    (px - x1) * dx +
                    (py - y1) * dy
                ) / lengthSquared
            )
        )

    const nearestX = x1 + dx * t

    const nearestY = y1 + dy * t

    const distX = px - nearestX

    const distY = py - nearestY

    return (
        distX * distX +
        distY * distY
    )
}

export const createLineHitArea = (
    x1: number,
    y1: number,
    x2: number,
    y2: number,
    width: number,
) => ({
    contains(x: number, y: number) {
        return (
            distanceToSegmentSquared(
                x,
                y,
                x1,
                y1,
                x2,
                y2,
            ) <=
            (width / 2) ** 2
        )
    },
})

export const pixiColorToSkia = (
    CanvasKit: CanvasKit,
    color: number,
    alpha: number,
) => {

    return CanvasKit.Color(
        (color >> 16) & 255,
        (color >> 8) & 255,
        color & 255,
        alpha,
    )
}

export const createSkiaMatrix = (
    pixiMatrix: PIXI.Matrix,
) => {
    return [
        pixiMatrix.a,
        pixiMatrix.c,
        pixiMatrix.tx,
        pixiMatrix.b,
        pixiMatrix.d,
        pixiMatrix.ty,
        0,
        0,
        1,
    ]
}

export const imageBitmapToBytes = async (
    bitmap: ImageBitmap
): Promise<number[]> => {
    const canvas = document.createElement('canvas')

    canvas.width = bitmap.width

    canvas.height = bitmap.height

    const ctx =
        canvas.getContext('2d')!

    ctx.drawImage(
        bitmap,
        0,
        0
    )

    const blob =
        await new Promise<Blob>((resolve) =>
            canvas.toBlob(
                (blob) => resolve(blob!),
                'image/png',
            )
        )

    const buffer =
        await blob.arrayBuffer()

    return Array.from(
        new Uint8Array(buffer),
    )
}

export const randomBetween = (
    min: number,
    max: number,
) =>
    Math.random() * (max - min) + min

export const randomPosition = (
    width: number,
    height: number,
) => {
    const overflow = 0.15

    return {
        x: randomBetween(
            -width * overflow,
            PIXI_CANVAS_WIDTH + width * overflow
        ),

        y: randomBetween(
            -height * overflow,
            PIXI_CANVAS_HEIGHT + height * overflow
        )
    }
}

export const randomColor = () =>
    Math.floor(Math.random() * 0xffffff)

export const randomAngle = () =>
    randomBetween(
        -180,
        180
    )

export const randomVisibility = () => {
    let fillVisible = Math.random() > 0.2

    let strokeVisible = Math.random() > 0.8

    if (!fillVisible && !strokeVisible) {
        fillVisible = true
    }

    return {
        fillVisible,
        strokeVisible
    }
}

export const randomStrokeWidth = () =>
    randomBetween(
        1,
        minCanvasSize * 0.03
    )