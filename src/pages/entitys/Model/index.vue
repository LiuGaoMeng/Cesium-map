<template>
    <div id="cesiumContainer" class="map"></div>
</template>

<script>
var selectedPlane = null
export default {
    data() {
        return {
            viewer: null,
            scene: null,
            targetY: 0.0,
            planeEntities: []
        }
    },
    mounted() {
        this.initMap()
        this.initObject()
        this.initEvent()
    },
    methods: {
        initMap() {
            this.viewer = new Cesium.Viewer('cesiumContainer', {
                animation: false, // 是否创建动画小器件，左下角仪表
                baseLayerPicker: false, // 是否显示图层选择器
                selectedImageryProviderViewModel: undefined, // 当前图像图层显示的模型，仅baseLayerPocker设为true有意义
                imageryProviderViewModels:
                    Cesium.createDefaultImageryProviderViewModels(), // 可供baseLayerPicker选择的图像图层ProviderViewModel数组
                selectedTerrainProviderViewModel: undefined, // 当前地形图层的显示模型，仅baseLayerPicker设为true才有意义
                terrainProviderViewModels:
                    Cesium.createDefaultTerrainProviderViewModels(), // 可供baseLayerPicker选择的地形图层ProviderViewModel数组
                imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                    // 图像图层提供者，仅baseLayerPicker设为false有意义
                    url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer?f=jsapi'
                }),
                terrainProvider: new Cesium.EllipsoidTerrainProvider(), // 地形图层提供者，仅baseLayerPicker设为false有意义
                fullscreenButton: false, // 是否显示全屏按钮，右下角全屏选择按钮
                geocoder: false, // 是否显示geocoder小器件，右上角查询按钮
                sceneModePicker: false, // 是否显示3D/2D选择器，右上角按钮
                navigationHelpButton: false, // 是否显示右上角的帮助按钮
                selectionIndicator: true, // 是否显示选取指示器组件
                infoBox: true, // 是否显示信息框
                clock: new Cesium.Clock(), // 用于控制当前时间的时钟对象
                timeline: false, // 是否显示时间轴
                scene3DOnly: false, // 如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
                shouldAnimate: true, // 自动播放动画控件
                shadows: true, // 是否显示光照投射的阴影
                terrainShadows: Cesium.ShadowMode.RECEIVE_ONLY, // 地质接收阴影
                sceneMode: Cesium.SceneMode.SCENE3D, // COLUMBUS_VIEW//哥伦布视图 COLUMBUS_VIEW//哥伦布视图 SCENE2D//2维模式 MORPHING//模式之间变换，例如二维到三维
                homeButton: true, // 是否显示Home按钮，右上角home按钮
                fullsccreennElement: document.body, // 全屏渲染的HTML元素
                showRenderLoopErrors: false // 如果设置为true，将在一个HTML面板显示错误信息)
            })
            this.scene = this.viewer.scene
            this.viewer._cesiumWidget._creditContainer.style.display = 'none'
        },
        initObject() {
            const position = Cesium.Cartesian3.fromDegrees(-107.0, 40, 100000)
            const heading = Cesium.Math.toRadians(135)
            const pitch = 0
            const roll = 0
            const hpr = new Cesium.HeadingPitchRoll(heading, pitch, roll)
            const orientation = Cesium.Transforms.headingPitchRollQuaternion(
                position,
                hpr
            )
            const clippingPlanes = new Cesium.ClippingPlaneCollection({
                planes: [
                    new Cesium.ClippingPlane(
                        new Cesium.Cartesian3(0, 0, -1),
                        0.0
                    )
                ],
                edgeWidth: 2.0,
                edgeColor: Cesium.Color.WHITE
            })
            const model = this.viewer.entities.add({
                id: 'model', // 对象的唯一标识符。如果未提供，则将生成GUID。
                name: 'model', // 要显示给用户的可读名称。它不必是唯一的。
                position: position,
                orientation: orientation,
                model: {
                    uri: '/model/Cesium_Air.glb',
                    scale: 1.0,
                    minimumPixelSize: 128, // 指定模型的最小最小像素大小，而不考虑缩放。
                    maximumScale: 20000, // 模型的最大比例尺大小。 minimumPixelSize的上限。
                    incrementallyLoadTextures: true, // 确定在加载模型后纹理是否可以继续流入。
                    runAnimations: true, // 指定是否应启动模型中指定的glTF动画。
                    clampAnimations: true, // 指定glTF动画是否应在没有关键帧的持续时间内保持最后一个姿势。
                    shadows: Cesium.ShadowMode.ENABLED, // 用于指定模型是否投射或接收来自光源的阴影。
                    heightReference: Cesium.HeightReference.NONE, // 指定相对于高度的高度。
                    // silhouetteColor: Cesium.Color.RED, // 指定轮廓的颜色
                    // silhouetteSize: 5, // 以像素为单位指定轮廓的大小。
                    // color: Cesium.Color.RED,
                    // colorBlendMode: Cesium.ColorBlendMode.HIGHLIGHT, // 于在目标颜色和图元的源颜色之间混合的不同模式。HIGHLIGHT将源颜色乘以目标颜色。REPLACE将源颜色替换为目标颜色。MIX将源颜色和目标颜色混合在一起
                    // colorBlendAmount: 0.1 // 用于指定 colorBlendMode 为 MIX 时的颜色强度。值0.0会产生模型的着色，而值1.0会导致纯色，介于两者之间的任何值都会导致两者混合。
                    imageBasedLightingFactor: new Cesium.Cartesian2(1.0, 1.0), // 定基于漫反射和镜面反射的图像照明的贡献。
                    // lightColor: Cesium.Color.BLUE, // 为模型着色时指定浅色的属性。如果 undefined ，则使用场景的浅色。
                    // distanceDisplayCondition:
                    //     new Cesium.DistanceDisplayCondition(10, 20000),
                    clippingPlanes: clippingPlanes
                }
            })

            for (let i = 0; i < clippingPlanes.length; ++i) {
                let plane = clippingPlanes.get(i)
                const planeEntity = this.viewer.entities.add({
                    position: position,
                    orientation: orientation,
                    plane: {
                        dimensions: new Cesium.Cartesian2(100.0, 100.0),
                        material: Cesium.Color.WHITE.withAlpha(0.1),
                        plane: new Cesium.CallbackProperty(
                            this.createPlaneUpdateFunction(plane),
                            false
                        ),
                        // plane: new Cesium.Plane(Cesium.Cartesian3.UNIT_Z, 0.0),
                        fill: true,
                        outline: true,
                        outlineColor: Cesium.Color.WHITE
                    }
                })
                this.planeEntities.push(planeEntity)
            }
            this.viewer.trackedEntity = this.planeEntities[0]
        },

        initEvent() {
            const downHandler = new Cesium.ScreenSpaceEventHandler(
                this.viewer.scene.canvas
            )
            downHandler.setInputAction((movement) => {
                const pickedObject = this.scene.pick(movement.position)
                if (
                    Cesium.defined(pickedObject) &&
                    Cesium.defined(pickedObject.id) &&
                    Cesium.defined(pickedObject.id.plane)
                ) {
                    selectedPlane = pickedObject.id.plane
                    selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.05)
                    selectedPlane.outlineColor = Cesium.Color.WHITE
                    this.scene.screenSpaceCameraController.enableInputs = false
                }
            }, Cesium.ScreenSpaceEventType.LEFT_DOWN)

            const upHandler = new Cesium.ScreenSpaceEventHandler(
                this.viewer.scene.canvas
            )
            upHandler.setInputAction((movement) => {
                if (Cesium.defined(selectedPlane)) {
                    selectedPlane.material = Cesium.Color.WHITE.withAlpha(0.1)
                    selectedPlane.outlineColor = Cesium.Color.WHITE
                    selectedPlane = undefined
                }

                this.scene.screenSpaceCameraController.enableInputs = true
            }, Cesium.ScreenSpaceEventType.LEFT_UP)
            const moveHandler = new Cesium.ScreenSpaceEventHandler(
                this.viewer.scene.canvas
            )
            moveHandler.setInputAction((movement) => {
                if (Cesium.defined(selectedPlane)) {
                    const deltaY =
                        movement.startPosition.y - movement.endPosition.y
                    this.targetY += deltaY
                }
            }, Cesium.ScreenSpaceEventType.MOUSE_MOVE)
        },
        createPlaneUpdateFunction(plane) {
            return () => {
                plane.distance = this.targetY
                return plane
            }
        }
    },
    beforeDestroy() {
        this.viewer.entities.removeAll()
    }
}
</script>

<style lang="scss">
.map {
    height: 100%;
    width: 100%;
}
</style>
