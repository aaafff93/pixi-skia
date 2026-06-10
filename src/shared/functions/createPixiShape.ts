import * as PIXI from 'pixi.js-legacy'
import type {
    CreatePixiEllipse,
    CreatePixiLine,
    CreatePixiPolygon,
    CreatePixiRect,
    CreatePixiSprite
} from '../types/types.ts';
import {minCanvasSize} from '../constants/constants.ts';
import {
    createLineHitArea,
    randomAngle,
    randomBetween,
    randomColor,
    randomPosition,
    randomStrokeWidth,
    randomVisibility
} from './utils.ts';

export const createPixiRect = ({
                                   width,
                                   height,
                                   fillVisible = true,
                                   fillColor = 0xff0000,
                                   fillAlpha = 1,
                                   strokeVisible = true,
                                   strokeColor = 0x00ffff,
                                   strokeAlpha = 1,
                                   strokeWidth = 4,
                                   positionX = 0,
                                   positionY = 0,
                                   angle = 0
                               }: CreatePixiRect) => {
    const rect = new PIXI.Graphics()

    if (strokeVisible) {
        rect.lineStyle(
            strokeWidth,
            strokeColor,
            strokeAlpha
        )
    }

    if (fillVisible) {
        rect.beginFill(
            fillColor,
            fillAlpha
        )
    }

    rect.drawRect(
        0,
        0,
        width,
        height
    )

    if (fillVisible) {
        rect.endFill()
    }

    rect.position.set(
        positionX,
        positionY
    )

    rect.angle = angle

    rect.eventMode = 'static'

    return rect
}

export const createPixiEllipse = ({
                                      radiusX,
                                      radiusY,
                                      fillVisible = true,
                                      fillColor = 0x00ff00,
                                      fillAlpha = 1,
                                      strokeVisible = true,
                                      strokeColor = 0xff00ff,
                                      strokeAlpha = 1,
                                      strokeWidth = 4,
                                      positionX = 0,
                                      positionY = 0,
                                      angle = 0
                                  }: CreatePixiEllipse) => {
    const ellipse = new PIXI.Graphics()

    if (strokeVisible) {
        ellipse.lineStyle(
            strokeWidth,
            strokeColor,
            strokeAlpha
        )
    }

    if (fillVisible) {
        ellipse.beginFill(
            fillColor,
            fillAlpha
        )
    }

    ellipse.drawEllipse(
        0,
        0,
        radiusX,
        radiusY
    )

    if (fillVisible) {
        ellipse.endFill()
    }

    ellipse.position.set(
        positionX,
        positionY
    )

    ellipse.angle = angle

    ellipse.eventMode = 'static'

    return ellipse
}

export const createPixiPolygon = ({
                                      points,
                                      fillVisible = true,
                                      fillColor = 0x00ffff,
                                      fillAlpha = 1,
                                      strokeVisible = true,
                                      strokeColor = 0xffffff,
                                      strokeAlpha = 1,
                                      strokeWidth = 4,
                                      positionX = 0,
                                      positionY = 0,
                                      angle = 0
                                  }: CreatePixiPolygon) => {

    const polygon = new PIXI.Graphics()

    if (strokeVisible) {
        polygon.lineStyle(
            strokeWidth,
            strokeColor,
            strokeAlpha
        )
    }

    if (fillVisible) {
        polygon.beginFill(
            fillColor,
            fillAlpha
        )
    }

    polygon.drawPolygon(
        points
    )

    if (fillVisible) {
        polygon.endFill()
    }

    polygon.position.set(
        positionX,
        positionY
    )

    polygon.angle = angle

    polygon.eventMode = 'static'

    return polygon
}

export const createPixiLine = ({
                                   x1,
                                   y1,
                                   x2,
                                   y2,
                                   color = 0xffff00,
                                   width = 8,
                                   positionX = 0,
                                   positionY = 0,
                                   angle = 0
                               }: CreatePixiLine) => {
    const line = new PIXI.Graphics()

    line
        .lineStyle(
            width,
            color
        )
        .moveTo(
            x1,
            y1
        )
        .lineTo(
            x2,
            y2
        )

    line.hitArea = createLineHitArea(
        x1,
        y1,
        x2,
        y2,
        width
    )

    line.position.set(
        positionX,
        positionY
    )

    line.angle = angle

    line.eventMode = 'static'

    return line
}

export const createPixiSprite = ({
                                     texture,
                                     positionX = 0,
                                     positionY = 0,
                                     scaleX = 1,
                                     scaleY = 1,
                                     anchorX = 0.5,
                                     anchorY = 0.5,
                                     angle = 0
                                 }: CreatePixiSprite) => {
    const sprite = new PIXI.Sprite(texture)

    sprite.anchor.set(anchorX, anchorY)

    sprite.position.set(positionX, positionY)

    sprite.scale.set(scaleX, scaleY)

    sprite.angle = angle

    sprite.eventMode = 'static'

    return sprite
}

export const createRandomRect = () => {
    const width = randomBetween(
        minCanvasSize * 0.05,
        minCanvasSize * 0.4
    )

    const height = randomBetween(
        minCanvasSize * 0.05,
        minCanvasSize * 0.4
    )

    const {x, y} = randomPosition(width, height)

    const {fillVisible, strokeVisible} = randomVisibility()

    return createPixiRect({
        width,
        height,
        positionX: x,
        positionY: y,
        angle: randomAngle(),
        fillVisible,
        strokeVisible,
        fillColor: randomColor(),
        strokeColor: randomColor(),
        strokeWidth: randomStrokeWidth()
    })
}

export const createRandomEllipse = () => {

    const radiusX =
        randomBetween(minCanvasSize * 0.03, minCanvasSize * 0.2)

    const radiusY = randomBetween(minCanvasSize * 0.03, minCanvasSize * 0.2)

    const {x, y} = randomPosition(radiusX * 2, radiusY * 2)

    const {fillVisible, strokeVisible} = randomVisibility()

    return createPixiEllipse({
        radiusX,
        radiusY,
        positionX: x,
        positionY: y,
        angle: randomAngle(),
        fillVisible,
        strokeVisible,
        fillColor: randomColor(),
        strokeColor: randomColor(),
        strokeWidth: randomStrokeWidth()
    })
}

export const createRandomPolygon = () => {

    const pointsCount =
        Math.floor(randomBetween(3, 9))

    const radius = randomBetween(minCanvasSize * 0.05, minCanvasSize * 0.25)

    const points: number[] = []

    for (let i = 0; i < pointsCount; i++) {
        const angle =
            (i / pointsCount) *
            Math.PI *
            2

        const currentRadius = randomBetween(radius * 0.5, radius)

        points.push(
            Math.cos(angle) *
            currentRadius,
            Math.sin(angle) *
            currentRadius
        )
    }

    const {x, y} = randomPosition(radius * 2, radius * 2)

    const {fillVisible, strokeVisible} = randomVisibility()

    return createPixiPolygon({
        points,
        positionX: x,
        positionY: y,
        angle: randomAngle(),
        fillVisible,
        strokeVisible,
        fillColor: randomColor(),
        strokeColor: randomColor(),
        strokeWidth: randomStrokeWidth()
    })
}

export const createRandomLine = () => {
    const length = randomBetween(
        minCanvasSize * 0.1,
        minCanvasSize * 0.6
    )

    const direction = randomBetween(
        0,
        Math.PI * 2
    )

    const x2 = Math.cos(direction) * length

    const y2 = Math.sin(direction) * length

    const {x, y} = randomPosition(Math.abs(x2), Math.abs(y2))

    return createPixiLine({
        x1: 0,
        y1: 0,
        x2,
        y2,
        width: randomBetween(2, minCanvasSize * 0.06),
        positionX: x,
        positionY: y,
        angle: randomAngle(),
        color: randomColor()
    })
}

export const createRandomSprite = (
    texture: PIXI.Texture
) => {
    const targetSize = randomBetween(minCanvasSize * 0.05, minCanvasSize * 0.3)

    const scale =
        targetSize /
        Math.max(
            texture.width,
            texture.height
        )

    const {x, y} = randomPosition(texture.width * scale, texture.height * scale)

    return createPixiSprite({
        texture,
        positionX: x,
        positionY: y,
        scaleX: scale,
        scaleY: scale,
        angle: randomAngle()
    })
}

export const createRandomObject = (
    textures: PIXI.Texture[]
) => {
    const randomTexture =
        textures[Math.floor(Math.random() * textures.length)]

    const creators = [
        createRandomRect,
        createRandomEllipse,
        createRandomLine,
        createRandomPolygon,
        () =>
            createRandomSprite(
                randomTexture
            )
    ]

    return creators[
        Math.floor(
            Math.random() *
            creators.length
        )
        ]()
}