import type {EllipseSceneNode, PolygonSceneNode, RectSceneNode, SceneNode, SpriteSceneNode} from '../types/types.ts';
import {createSkiaMatrix, distanceToSegmentSquared} from './utils.ts';
import * as PIXI from 'pixi.js-legacy';

const applyMatrix = (
    matrix: number[],
    x: number,
    y: number,
) => ({
    x:
        matrix[0] * x +
        matrix[1] * y +
        matrix[2],

    y:
        matrix[3] * x +
        matrix[4] * y +
        matrix[5],
})

const hitTestRect = (
    node: RectSceneNode,
    x: number,
    y: number,
) => {

    const local = applyMatrix(
        node.inverseMatrix!,
        x,
        y,
    )

    return (
        local.x >= node.x &&
        local.x <= node.x + node.width &&
        local.y >= node.y &&
        local.y <= node.y + node.height
    )
}

const hitTestEllipse = (
    node: EllipseSceneNode,
    x: number,
    y: number
) => {
    const local = applyMatrix(
        node.inverseMatrix!,
        x,
        y,
    )

    const dx = (local.x - node.x) / node.radiusX

    const dy = (local.y - node.y) / node.radiusY

    return (
        dx * dx +
        dy * dy <= 1
    )
}

const hitTestLine = (
    node: PolygonSceneNode,
    x: number,
    y: number,
) => {

    const local = applyMatrix(
        node.inverseMatrix!,
        x,
        y,
    )

    const [x1, y1, x2, y2] =
        node.points

    return (
        distanceToSegmentSquared(
            local.x,
            local.y,

            x1,
            y1,

            x2,
            y2,
        ) <=
        (node.strokeWidth / 2) ** 2
    )
}

const hitTestPolygon = (
    node: PolygonSceneNode,
    x: number,
    y: number
) => {
    if (node.points.length === 4 && !node.fillVisible) {
        return hitTestLine(
            node,
            x,
            y,
        )
    }

    const local = applyMatrix(
        node.inverseMatrix!,
        x,
        y,
    )

    const px = local.x
    const py = local.y

    let inside = false

    const points = node.points

    for (
        let i = 0,
            j = points.length - 2;
        i < points.length;
        j = i,
            i += 2
    ) {

        const xi = points[i]
        const yi = points[i + 1]

        const xj = points[j]
        const yj = points[j + 1]

        const intersect =
            yi > py !== yj > py &&
            px <
            (
                (xj - xi) *
                (py - yi)
            ) /
            (yj - yi) +
            xi

        if (intersect) {
            inside = !inside
        }
    }

    return inside
}

const hitTestSprite = (
    node: SpriteSceneNode,
    x: number,
    y: number
) => {
    const local = applyMatrix(
        node.inverseMatrix!,
        x,
        y,
    )

    const left = -node.anchorX * node.width

    const top = -node.anchorY * node.height

    return (
        local.x >= left &&
        local.x <= left + node.width &&
        local.y >= top &&
        local.y <= top + node.height
    )
}

const hitTestNode = (
    node: SceneNode,
    x: number,
    y: number,
): boolean => {
    if (!node.inverseMatrix) {
        return false
    }

    switch (node.type) {

        case 'rect':
            return hitTestRect(
                node,
                x,
                y,
            )
        case 'ellipse':
            return hitTestEllipse(
                node,
                x,
                y,
            )

        case 'polygon':
            return hitTestPolygon(
                node,
                x,
                y,
            )

        case 'sprite':
            return hitTestSprite(
                node,
                x,
                y,
            )
    }
}

export const processPointerEvent = (
    type: 'pointerDown' | 'pointerUp',
    event: PointerEvent,
    sceneNodes: SceneNode[],
) => {
    const x = event.offsetX
    const y = event.offsetY
    for (let i = sceneNodes.length - 1; i >= 0; i--) {
        const node = sceneNodes[i]
        if (!node.events) {
            continue
        }

        if (!hitTestNode(node, x, y)) {
            continue
        }

        node.events?.[type]?.(event)

        return
    }
}

export const bindPointerEvents = (
    canvas: HTMLCanvasElement,
    getSceneNodes: () => SceneNode[]
) => {
    const handle =
        (type: 'pointerDown' | 'pointerUp',) =>
            (event: PointerEvent) => {
                processPointerEvent(
                    type,
                    event,
                    getSceneNodes()
                )
            }

    canvas.addEventListener(
        'pointerdown',
        handle(
            'pointerDown'
        )
    )

    canvas.addEventListener(
        'pointerup',
        handle(
            'pointerUp'
        )
    )
}

export const createNodeEvents = (
    child: PIXI.DisplayObject
) => {

    const pointerDownListeners =
        child.listeners(
            'pointerdown'
        )

    const pointerUpListeners =
        child.listeners(
            'pointerup'
        )

    return {
        pointerDown:
            pointerDownListeners.length
                ? (event: PointerEvent) => {
                    pointerDownListeners.forEach(
                        (listener) =>
                            listener(event as unknown as PIXI.FederatedPointerEvent)
                    )
                }
                : undefined,
        pointerUp:
            pointerUpListeners.length
                ? (event: PointerEvent) => {
                    pointerUpListeners.forEach(
                        (listener) =>
                            listener(event as unknown as PIXI.FederatedPointerEvent)
                    )
                }
                : undefined,
    }
}

export const createInteractionData = (
    child: PIXI.DisplayObject,
) => {

    const events = createNodeEvents(child)

    const hasEvents =
        !!events.pointerDown ||
        !!events.pointerUp

    if (!hasEvents) {
        return {}
    }

    return {
        events,

        inverseMatrix:
            createSkiaMatrix(
                child.worldTransform
                    .clone()
                    .invert(),
            ),
    }
}
