import * as PIXI from 'pixi.js-legacy';
import type {SceneNode} from '../types/types.ts';
import {createInteractionData} from './eventManager.ts';
import {createSkiaMatrix, imageBitmapToBytes} from './utils.ts';
import {renderEllipseNode, renderPolygonNode, renderRectNode, renderSpriteNode} from './renderNodes.ts';
import type {Canvas, CanvasKit} from 'skia'

export const collectSceneNodes = async (
    container: PIXI.Container,
    sceneNodes: SceneNode[] = [],
) => {
    for (const child of container.children) {
        if (child instanceof PIXI.Graphics) {
            for (const {shape, fillStyle, lineStyle} of child.geometry.graphicsData) {
                if (shape instanceof PIXI.Rectangle) {
                    const {events, inverseMatrix} = createInteractionData(child)
                    sceneNodes.push({
                        type: 'rect',
                        matrix: createSkiaMatrix(
                            child.worldTransform,
                        ),
                        events,
                        inverseMatrix,
                        x: shape.x,
                        y: shape.y,
                        width: shape.width,
                        height: shape.height,
                        fillVisible: fillStyle.visible,
                        fillColor: fillStyle.color,
                        fillAlpha: fillStyle.alpha,
                        strokeVisible: lineStyle.visible,
                        strokeColor: lineStyle.color,
                        strokeAlpha: lineStyle.alpha,
                        strokeWidth: lineStyle.width
                    })
                } else if (shape instanceof PIXI.Ellipse) {
                    const {events, inverseMatrix} = createInteractionData(child)
                    sceneNodes.push({
                        type: 'ellipse',
                        matrix: createSkiaMatrix(
                            child.worldTransform,
                        ),
                        events,
                        inverseMatrix,
                        x: shape.x,
                        y: shape.y,
                        radiusX: shape.width,
                        radiusY: shape.height,
                        fillVisible: fillStyle.visible,
                        fillColor: fillStyle.color,
                        fillAlpha: fillStyle.alpha,
                        strokeVisible: lineStyle.visible,
                        strokeColor: lineStyle.color,
                        strokeAlpha: lineStyle.alpha,
                        strokeWidth: lineStyle.width
                    })
                } else if (shape instanceof PIXI.Polygon) {
                    const {events, inverseMatrix} = createInteractionData(child)
                    sceneNodes.push({
                        type: 'polygon',
                        matrix: createSkiaMatrix(
                            child.worldTransform,
                        ),
                        events,
                        inverseMatrix,
                        points: [...shape.points],
                        fillVisible: fillStyle.visible,
                        fillColor: fillStyle.color,
                        fillAlpha: fillStyle.alpha,
                        strokeVisible: lineStyle.visible,
                        strokeColor: lineStyle.color,
                        strokeAlpha: lineStyle.alpha,
                        strokeWidth: lineStyle.width,
                        closeStroke: shape.closeStroke
                    })
                }
            }
        } else if (child instanceof PIXI.Sprite) {
            const resource =
                child.texture.baseTexture.resource as unknown as {
                    source: ImageBitmap
                }
            const {events, inverseMatrix} = createInteractionData(child)

            sceneNodes.push({
                type: 'sprite',
                matrix: createSkiaMatrix(
                    child.worldTransform,
                ),
                events,
                inverseMatrix,
                width: child.texture.width,
                height: child.texture.height,
                anchorX: child.anchor.x,
                anchorY: child.anchor.y,
                imageBytes:
                    await imageBitmapToBytes(
                        resource.source,
                    )
            })
        } else if (child instanceof PIXI.Container) {
            await collectSceneNodes(
                child,
                sceneNodes,
            )
        }
    }

    return sceneNodes
}

export const renderSceneNodes = (
    CanvasKit: CanvasKit,
    canvas: Canvas,
    sceneNodes: SceneNode[]
) => {
    for (const node of sceneNodes) {
        switch (node.type) {

            case 'rect':
                renderRectNode(
                    CanvasKit,
                    canvas,
                    node
                )
                break

            case 'ellipse':
                renderEllipseNode(
                    CanvasKit,
                    canvas,
                    node
                )
                break

            case 'polygon':
                renderPolygonNode(
                    CanvasKit,
                    canvas,
                    node
                )
                break

            case 'sprite':
                renderSpriteNode(
                    CanvasKit,
                    canvas,
                    node
                )
                break
        }
    }
}