import * as PIXI from 'pixi.js-legacy';

type SceneNodeEvents = {
    pointerDown?: (event: PointerEvent) => void
    pointerUp?: (event: PointerEvent) => void
}

type SceneNodeBase = {
    events?: SceneNodeEvents
}

type ShapeStyle = {
    fillVisible: boolean
    fillColor: number
    fillAlpha: number
    strokeVisible: boolean
    strokeColor: number
    strokeAlpha: number
    strokeWidth: number
}

export type RectSceneNode =
    ShapeStyle &
    SceneNodeBase &
    TransformableNode & {
    type: 'rect'
    x: number
    y: number
    width: number
    height: number
}

export type EllipseSceneNode =
    ShapeStyle &
    SceneNodeBase &
    TransformableNode & {
    type: 'ellipse'
    x: number
    y: number
    radiusX: number
    radiusY: number
}

export type PolygonSceneNode =
    ShapeStyle &
    SceneNodeBase &
    TransformableNode & {
    type: 'polygon'
    points: number[]
    closeStroke: boolean
}

type TransformableNode = {
    matrix: number[]
    inverseMatrix?: number[]
}

export type SpriteSceneNode =
    SceneNodeBase &
    TransformableNode & {
    type: 'sprite'
    width: number
    height: number
    anchorX: number
    anchorY: number
    imageBytes: number[]
}

export type SceneNode =
    | RectSceneNode
    | EllipseSceneNode
    | PolygonSceneNode
    | SpriteSceneNode

export type Scene = {
    width: number
    height: number
    backgroundColor: number
    nodes: SceneNode[]
}

export type PixiTransformProps = {
    positionX?: number
    positionY?: number
    angle?: number
}

export type PixiFillProps = {
    fillColor?: number
    fillAlpha?: number
}

export type PixiStrokeProps = {
    strokeColor?: number
    strokeAlpha?: number
    strokeWidth?: number
}

type ShapeVisibility = {
    fillVisible?: boolean
    strokeVisible?: boolean
}

export type CreatePixiLine =
    PixiTransformProps & {
    x1: number
    y1: number
    x2: number
    y2: number
    color?: number
    width?: number
}

export type CreatePixiRect =
    ShapeVisibility &
    PixiTransformProps &
    PixiFillProps &
    PixiStrokeProps & {
    width: number
    height: number
}

export type CreatePixiEllipse =
    ShapeVisibility &
    PixiTransformProps &
    PixiFillProps &
    PixiStrokeProps & {
    radiusX: number
    radiusY: number
}

export type CreatePixiPolygon =
    ShapeVisibility &
    PixiTransformProps &
    PixiFillProps &
    PixiStrokeProps & {
    points: number[]
}

export type CreatePixiSprite =
    PixiTransformProps & {
    texture: PIXI.Texture
    scaleX?: number
    scaleY?: number
    anchorX?: number
    anchorY?: number
}

export type DemoScene = {
    description: string
    create: () => Promise<PIXI.Container>
}
