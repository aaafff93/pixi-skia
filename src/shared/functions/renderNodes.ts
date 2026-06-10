import type {
    EllipseSceneNode,
    PolygonSceneNode,
    RectSceneNode,
    SpriteSceneNode
} from '../types/types.ts';
import type {Canvas, CanvasKit} from 'skia'
import {renderFillAndStroke} from './createPaint.ts';

export const renderRectNode = (
    CanvasKit: CanvasKit,
    canvas: Canvas,
    node: RectSceneNode,
) => {
    canvas.save()

    canvas.concat(
        node.matrix,
    )

    renderFillAndStroke(
        CanvasKit,
        (paint) => {
            canvas.drawRect(
                CanvasKit.XYWHRect(
                    node.x,
                    node.y,
                    node.width,
                    node.height,
                ),
                paint,
            )
        },
        node,
    )

    canvas.restore()
}

export const renderEllipseNode = (
    CanvasKit: CanvasKit,
    canvas: Canvas,
    node: EllipseSceneNode,
) => {
    canvas.save()

    canvas.concat(
        node.matrix,
    )

    const rect =
        CanvasKit.LTRBRect(
            node.x - node.radiusX,
            node.y - node.radiusY,
            node.x + node.radiusX,
            node.y + node.radiusY,
        )

    renderFillAndStroke(
        CanvasKit,
        (paint) => {
            canvas.drawOval(
                rect,
                paint,
            )
        },
        node,
    )

    canvas.restore()
}

export const renderPolygonNode = (
    CanvasKit: CanvasKit,
    canvas: Canvas,
    node: PolygonSceneNode,
) => {
    canvas.save()

    canvas.concat(
        node.matrix,
    )

    const path =
        new CanvasKit.PathBuilder()
            .addPolygon(
                node.points,
                node.closeStroke,
            )
            .detach()

    renderFillAndStroke(
        CanvasKit,
        (paint) => {
            canvas.drawPath(
                path,
                paint,
            )
        },
        node,
    )

    path.delete()

    canvas.restore()
}

export const renderSpriteNode = (
    CanvasKit: CanvasKit,
    canvas: Canvas,
    node: SpriteSceneNode,
) => {
    const bytes = new Uint8Array(
        node.imageBytes,
    )

    const image =
        CanvasKit.MakeImageFromEncoded(
            bytes,
        )

    if (!image) {
        return
    }

    canvas.save()

    canvas.concat(
        node.matrix,
    )

    const offsetX = -node.anchorX * image.width()

    const offsetY = -node.anchorY * image.height()

    canvas.drawImageOptions(
        image,
        offsetX,
        offsetY,
        CanvasKit.FilterMode.Linear,
        CanvasKit.MipmapMode.Linear,
    )

    canvas.restore()

    image.delete()
}