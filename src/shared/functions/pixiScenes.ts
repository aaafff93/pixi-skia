import type {DemoScene} from '../types/types.ts';
import * as PIXI from 'pixi.js-legacy';
import {
    createPixiEllipse,
    createPixiLine,
    createPixiPolygon,
    createPixiRect,
    createPixiSprite
} from './createPixiShape.ts';
import starImage from '../../assets/star.png';
import catImage from '../../assets/cat.png';
import duckImage from '../../assets/duck.png';

const textureStar: PIXI.Texture = await PIXI.Assets.load(starImage)
const textureCat: PIXI.Texture = await PIXI.Assets.load(catImage)
const textureDuck: PIXI.Texture = await PIXI.Assets.load(duckImage)

const scene1 = async () => {
    const root = new PIXI.Container()

    const parent = new PIXI.Container()

    parent.position.set(10, 10)

    const rect = createPixiRect({
        width: 120,
        height: 80
    })

    rect.on(
        'pointerdown',
        () => {
            console.log('rect down')
        }
    )

    const sprite = createPixiSprite({
        texture: textureStar,
        positionX: 80,
        positionY: 180,
        scaleX: 2,
        scaleY: 2,
        angle: -50
    })

    sprite.on('pointerdown', () => {
            console.log('star down')
        }
    )

    const ellipse = createPixiEllipse({
        radiusX: 70,
        radiusY: 40,
        positionX: 320,
        positionY: 50,
        angle: -15
    })

    ellipse.on(
        'pointerdown',
        () => {
            console.log('ellipse down')
        }
    )

    ellipse.on(
        'pointerup',
        () => {
            console.log('ellipse up')
        }
    )

    const line = createPixiLine({
        x1: 0,
        y1: 0,
        x2: 120,
        y2: 80,
        width: 18,
        positionX: 0,
        positionY: 130
    })

    line.on('pointerdown', () => {
            console.log('line down')
        }
    )

    const polygon =
        createPixiPolygon({
            points: [
                0, 0,
                120, 0,
                150, 70,
                60, 120
            ],
            positionX: 180,
            positionY: 140,
            angle: 20
        })

    polygon.on(
        'pointerup',
        () => {
            console.log('polygon up')
        }
    )

    parent.addChild(
        rect,
        sprite,
        ellipse,
        line,
        polygon
    )

    root.addChild(parent)

    return root
}

const scene2 = async () => {
    const root = new PIXI.Container()

    const mainContainer = new PIXI.Container()

    const subContainer = new PIXI.Container()

    const ellipse =
        createPixiEllipse({
            radiusX: 200,
            radiusY: 100,
            fillColor: 0xff0000,
            positionX: 200,
            positionY: 100,
            angle: 30
        })

    ellipse.on(
        'pointerdown',
        () => {
            console.log('ellipse down')
        }
    )

    const rect =
        createPixiRect({
            width: 100,
            height: 150,
            fillColor: 0x00ffff,
            positionX: 100,
            positionY: -10,
            angle: 30
        })

    rect.scale.set(
        1.5,
        1.7
    )

    rect.on(
        'pointerup',
        () => {
            console.log('rect up')
        }
    )

    const line1 =
        createPixiLine({
            x1: 50,
            y1: 100,
            x2: 400,
            y2: 100,
            width: 10,
            color: 0xffffff,
            angle: -20
        })

    line1.on(
        'pointerup',
        () => {
            console.log('line1 up')
        }
    )

    const line2 = createPixiLine({
        x1: 0,
        y1: 170,
        x2: 1500,
        y2: -30,
        width: 10,
        color: 0xffff00,
        angle: 20
    })

    subContainer.position.set(
        75,
        50
    )

    subContainer.addChild(
        line1,
        line2
    )

    mainContainer.addChild(
        subContainer,
        ellipse,
        rect
    )

    root.addChild(
        mainContainer
    )

    return root
}

const scene3 = async () => {

    const root = new PIXI.Container()

    const cat =
        createPixiSprite({
            texture: textureCat,
            positionX: 80,
            positionY: 80,
            scaleX: 2,
            scaleY: 2,
            angle: -15
        })

    cat.on(
        'pointerdown',
        () => {
            console.log('cat down')
        }
    )

    const duck =
        createPixiSprite({
            texture: textureDuck,
            positionX: 300,
            positionY: 220,
            scaleX: 0.5,
            scaleY: 0.5,
            angle: 20
        })

    duck.on(
        'pointerdown',
        () => {
            console.log('duck down')
        }
    )

    const rect =
        createPixiRect({
            width: 140,
            height: 80,
            positionX: 180,
            positionY: 40,
            fillColor: 0x3366ff,
            angle: 10
        })

    const ellipse =
        createPixiEllipse({
            radiusX: 60,
            radiusY: 40,
            positionX: 260,
            positionY: 120,
            fillColor: 0xff6600,
            angle: -25
        })

    const polygon =
        createPixiPolygon({
            points: [
                0, 0,
                80, 0,
                120, 60,
                40, 120,
                -20, 60
            ],
            positionX: 100,
            positionY: 220,
            fillColor: 0x00cc88
        })

    const group = new PIXI.Container()

    group.position.set(
        250,
        150
    )

    const line1 =
        createPixiLine({
            x1: -80,
            y1: 0,
            x2: 80,
            y2: 0,
            angle: -70,
            width: 8,
            color: 0xffffff
        })

    const line2 =
        createPixiLine({
            x1: 0,
            y1: -80,
            x2: 0,
            y2: 80,
            width: 8,
            color: 0xff0000
        })

    group.angle = 30

    group.addChild(
        line1,
        line2
    )

    root.addChild(
        rect,
        ellipse,
        polygon,
        cat,
        duck,
        group
    )

    return root
}

const scene4 = async () => {

    const root = new PIXI.Container()

    const group1 =
        new PIXI.Container()

    group1.position.set(
        120,
        100
    )

    group1.angle = 20

    const rect1 =
        createPixiRect({
            width: 140,
            height: 80,
            fillColor: 0xff4444,
            strokeColor: 0xffffff,
            positionX: 0,
            positionY: 0
        })

    const ellipse1 =
        createPixiEllipse({
            radiusX: 50,
            radiusY: 30,
            fillColor: 0x44ff44,
            strokeColor: 0xffffff,
            positionX: 100,
            positionY: 60
        })

    group1.addChild(
        rect1,
        ellipse1
    )

    const group2 =
        new PIXI.Container()

    group2.position.set(
        280,
        180
    )

    group2.scale.set(
        1.2,
        1.2
    )

    const polygon1 =
        createPixiPolygon({
            points: [
                0, -60,
                60, 0,
                30, 70,
                -30, 70,
                -60, 0
            ],
            fillColor: 0x4488ff,
            strokeColor: 0xffffff
        })

    const polygon2 =
        createPixiPolygon({
            points: [
                0, -40,
                40, 40,
                -40, 40
            ],
            fillColor: 0xffff00,
            strokeColor: 0x000000,
            positionX: 140,
            positionY: 20,
            angle: -30
        })

    group2.addChild(
        polygon1,
        polygon2
    )

    const line1 =
        createPixiLine({
            x1: 20,
            y1: 260,
            x2: 380,
            y2: 260,
            width: 8,
            color: 0xffffff
        })

    const line2 =
        createPixiLine({
            x1: 200,
            y1: 40,
            x2: 200,
            y2: 280,
            width: 8,
            color: 0xffaa00
        })

    const ellipse2 =
        createPixiEllipse({
            radiusX: 70,
            radiusY: 70,
            fillVisible: false,
            strokeVisible: true,
            strokeWidth: 10,
            strokeColor: 0xff00ff,
            positionX: 200,
            positionY: 150
        })

    root.addChild(
        line1,
        line2,
        ellipse2,
        group1,
        group2
    )

    return root
}

const scene5 = async () => {

    const root = new PIXI.Container()

    const solarSystem =
        new PIXI.Container()

    solarSystem.position.set(
        200,
        150
    )

    const orbit1 =
        createPixiEllipse({
            radiusX: 60,
            radiusY: 60,
            fillVisible: false,
            strokeVisible: true,
            strokeColor: 0x666666,
            strokeWidth: 2
        })

    const orbit2 =
        createPixiEllipse({
            radiusX: 95,
            radiusY: 95,
            fillVisible: false,
            strokeVisible: true,
            strokeColor: 0x444444,
            strokeWidth: 2
        })

    const sun =
        createPixiEllipse({
            radiusX: 25,
            radiusY: 25,
            fillColor: 0xffcc00,
            strokeColor: 0xff8800
        })

    const planet1 =
        createPixiEllipse({
            radiusX: 10,
            radiusY: 10,
            fillColor: 0x00aaff,
            positionX: 60,
            positionY: 0
        })

    const planet2 =
        createPixiEllipse({
            radiusX: 14,
            radiusY: 14,
            fillColor: 0xff4444,
            positionX: 0,
            positionY: -95
        })

    solarSystem.addChild(
        orbit2,
        orbit1,
        sun,
        planet1,
        planet2
    )

    const star1 =
        createPixiPolygon({
            points: [
                0, -10,
                3, -3,
                10, 0,
                3, 3,
                0, 10,
                -3, 3,
                -10, 0,
                -3, -3
            ],
            fillColor: 0xffffff,
            positionX: 35,
            positionY: 35
        })

    const star2 =
        createPixiPolygon({
            points: [
                0, -8,
                3, -3,
                8, 0,
                3, 3,
                0, 8,
                -3, 3,
                -8, 0,
                -3, -3
            ],
            fillColor: 0xffffaa,
            positionX: 360,
            positionY: 50
        })

    const star3 =
        createPixiPolygon({
            points: [
                0, -12,
                4, -4,
                12, 0,
                4, 4,
                0, 12,
                -4, 4,
                -12, 0,
                -4, -4
            ],
            fillColor: 0xffffff,
            positionX: 340,
            positionY: 260
        })

    const cross =
        new PIXI.Container()

    cross.position.set(
        90,
        240
    )

    cross.angle = 35

    const horizontal =
        createPixiLine({
            x1: -40,
            y1: 0,
            x2: 40,
            y2: 0,
            width: 8,
            color: 0xff00ff
        })

    const vertical =
        createPixiLine({
            x1: -70,
            y1: -40,
            x2: 0,
            y2: 40,
            width: 8,
            color: 0x00ffff
        })

    cross.addChild(
        horizontal,
        vertical
    )

    root.addChild(
        solarSystem,
        cross,
        star1,
        star2,
        star3
    )

    return root
}

export const emptyScene = async () => {
    return new PIXI.Container()
}

export const demoScenes: DemoScene[] = [
    {
        description:
            'rect(pointerdown), starSprite(pointerdown), ellipse(pointerdown+pointerup), line(pointerdown), polygon(pointerup)',
        create: scene1
    },
    {
        description:
            'ellipse(pointerdown), rect(pointerup), line1(pointerup), line2(нет событий), вложенные контейнеры, rotation и scaling',
        create: scene2
    },
    {
        description:
            'catSprite(pointerdown), duckSprite(pointerdown), rect(нет событий), ellipse(нет событий), polygon(нет событий), crossLines(нет событий)',
        create: scene3
    },
    {
        description:
            'group1(rect+ellipse), group2(polygon+polygon), line1, line2, strokedEllipse, нет событий',
        create: scene4
    },
    {
        description:
            'solarSystem(container), sun, planet1, planet2, orbit1, orbit2, stars, crossLines, нет событий',
        create: scene5
    },
    {
        description:
            'Пустая сцена для удобства генерации случайных фигур',
        create: emptyScene
    }
]
