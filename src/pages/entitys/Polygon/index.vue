<template>
    <div id="cesiumContainer" class="map"></div>
</template>

<script>
export default {
    data() {
        return {
            viewer: null
        }
    },
    mounted() {
        this.initMap()
        this.initObject()
    },
    methods: {
        initMap() {
            this.viewer = new Cesium.Viewer('cesiumContainer', {
                animation: false, // 是否创建动画小器件，左下角仪表
                baseLayerPicker: false, // 是否显示图层选择器
                selectedImageryProviderViewModel: undefined, // 当前图像图层显示的模型，仅baseLayerPocker设为true有意义
                imageryProviderViewModels: Cesium.createDefaultImageryProviderViewModels(), // 可供baseLayerPicker选择的图像图层ProviderViewModel数组
                selectedTerrainProviderViewModel: undefined, // 当前地形图层的显示模型，仅baseLayerPicker设为true才有意义
                terrainProviderViewModels: Cesium.createDefaultTerrainProviderViewModels(), // 可供baseLayerPicker选择的地形图层ProviderViewModel数组
                imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                    // 图像图层提供者，仅baseLayerPicker设为false有意义
                    url:
                        'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer?f=jsapi'
                }),
                terrainProvider: Cesium.createWorldTerrain(), // 地形图层提供者，仅baseLayerPicker设为false有意义
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
            this.viewer._cesiumWidget._creditContainer.style.display = 'none'
            this.viewer.scene.screenSpaceCameraController.enableCollisionDetection = false // true 禁止 false 允许
        },
        initObject() {
            const polygon = this.viewer.entities.add({
                id: 'polygon', // 对象的唯一标识符。如果未提供，则将生成GUID。
                name: 'polygon', // 要显示给用户的可读名称。它不必是唯一的。
                position: Cesium.Cartesian3.fromDegrees(-107.0, 40, 10000),
                polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArray([
                        -115.0,
                        37.0,
                        -115.0,
                        32.0,
                        -107.0,
                        33.0,
                        -102.0,
                        31.0,
                        -102.0,
                        35.0
                    ]), // 指定 PolygonHierarchy 。 new Cesium.PolygonHierarchy ( positions , holes )。positions定义多边形或孔的外部边界的线性环。holes 定义多边形中孔的多边形层次结构数组。
                    height: 1000,
                    extrudedHeight: 50000, // 凸出面相对于椭球面的高度。拉伸高度=extrudedHeight-height
                    extrudedHeightReference:
                        Cesium.HeightReference.CCLAMP_TO_GROUND, // 指定extrudedHeight相对于什么。 类比heightReference

                    fill: true, // 布尔属性，指定是否用提供的材料填充该框。
                    stRotation: 0, // 指定多边形纹理从北方逆时针旋转。
                    // material: Cesium.Color.RED, // 填充颜色
                    // material: '/image/billboard.jpg',
                    material: new Cesium.ImageMaterialProperty({
                        image: '/image/billboard.jpg'
                    }),
                    arcType: Cesium.ArcType.RHUMB,
                    granularity: Cesium.Math.RADIANS_PER_DEGREE, // 指定每个纬度和经度点之间的角距离。
                    show: true, // 是否展示
                    outline: true, // 布尔型属性，用于指定该框是否已概述。
                    outlineColor: Cesium.Color.YELLOW, // 指定轮廓的 颜色 。
                    outlineWidth: 5, // 指定轮廓的宽度。
                    shadows: Cesium.ShadowMode.ENABLED, // 指定框是投射还是接收光源的阴影。 DISABLED ENBALE
                    perPositionHeight: false, // 是否使用每个位置的高度。
                    zIndex: 0, // 仅在多边形为常数且未指定高度或拉伸高度的情况下才有效。 索引 类似于走廊
                    classificationType: Cesium.ClassificationType.BOTH, // 指定此多边形在地面上时是对地形，3D瓷砖还是对两者进行分类。
                    // distanceDisplayCondition:
                    //     new Cesium.DistanceDisplayCondition(10.0, 200000.0),
                    heightReference: Cesium.HeightReference.CCLAMP_TO_GROUND
                }
            })
            this.viewer.entities.add({
                polygon: {
                    hierarchy: {
                        positions: Cesium.Cartesian3.fromDegreesArray([
                            -99.0,
                            30.0,
                            -85.0,
                            30.0,
                            -85.0,
                            40.0,
                            -99.0,
                            40.0
                        ]),
                        holes: [
                            {
                                positions: Cesium.Cartesian3.fromDegreesArray([
                                    -97.0,
                                    31.0,
                                    -97.0,
                                    39.0,
                                    -87.0,
                                    39.0,
                                    -87.0,
                                    31.0
                                ]),
                                holes: [
                                    {
                                        positions: Cesium.Cartesian3.fromDegreesArray(
                                            [
                                                -95.0,
                                                33.0,
                                                -89.0,
                                                33.0,
                                                -89.0,
                                                37.0,
                                                -95.0,
                                                37.0
                                            ]
                                        ),
                                        holes: [
                                            {
                                                positions: Cesium.Cartesian3.fromDegreesArray(
                                                    [
                                                        -93.0,
                                                        34.0,
                                                        -91.0,
                                                        34.0,
                                                        -91.0,
                                                        36.0,
                                                        -93.0,
                                                        36.0
                                                    ]
                                                )
                                            }
                                        ]
                                    }
                                ]
                            }
                        ]
                    },
                    extrudedHeight: 50000, // 凸出面相对于椭球面的高度。拉伸高度=extrudedHeight-height
                    closeTop: true, // 拉伸图形关闭顶部 false，则将挤出的多边形顶部留空。
                    closeBottom: true, // 拉伸图形关闭底部 false，则将挤出的多边形底部留空。
                    material: Cesium.Color.BLUE.withAlpha(0.5),
                    height: 10000,
                    outline: true
                }
            })
            this.viewer.entities.add({
                name: 'Orange polygon with per-position heights and outline',
                polygon: {
                    hierarchy: Cesium.Cartesian3.fromDegreesArrayHeights([
                        -108.0,
                        25.0,
                        100000,
                        -100.0,
                        25.0,
                        100000,
                        -100.0,
                        30.0,
                        100000,
                        -108.0,
                        30.0,
                        300000
                    ]),
                    extrudedHeight: 0,
                    perPositionHeight: true, // 是否使用每个位置的高度。

                    material: Cesium.Color.ORANGE.withAlpha(0.5),
                    outline: true,
                    outlineColor: Cesium.Color.BLACK
                }
            })
            this.viewer.trackedEntity = polygon
        }
    }
}
</script>

<style lang="scss">
.map {
    height: 100%;
    width: 100%;
}
</style>
