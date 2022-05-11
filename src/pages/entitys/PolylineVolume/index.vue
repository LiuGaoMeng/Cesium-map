<template>
  <div id="cesiumContainer" class="map">
  </div>
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
                imageryProviderViewModels:
                    Cesium.createDefaultImageryProviderViewModels(), // 可供baseLayerPicker选择的图像图层ProviderViewModel数组
                selectedTerrainProviderViewModel: undefined, // 当前地形图层的显示模型，仅baseLayerPicker设为true才有意义
                terrainProviderViewModels:
                    Cesium.createDefaultTerrainProviderViewModels(), // 可供baseLayerPicker选择的地形图层ProviderViewModel数组
                imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
                    // 图像图层提供者，仅baseLayerPicker设为false有意义
                    url: 'https://server.arcgisonline.com/arcgis/rest/services/World_Imagery/MapServer?f=jsapi'
                }),
                terrainProvider: Cesium.createWorldTerrain(), // 地形图层提供者，仅baseLayerPicker设为false有意义, // 地形图层提供者，仅baseLayerPicker设为false有意义
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
        },
        initObject() {
            const polylineVolume = this.viewer.entities.add({
                id: 'polylineVolume', // 对象的唯一标识符。如果未提供，则将生成GUID。
                name: 'polylineVolume', // 要显示给用户的可读名称。它不必是唯一的。
                polylineVolume: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                        -90.0,
                        32.0,
                        0.0,
                        -90.0,
                        36.0,
                        100000.0,
                        -94.0,
                        36.0,
                        0.0
                    ]),
                    shape: [
                        new Cesium.Cartesian2(-50000, -50000),
                        new Cesium.Cartesian2(50000, -50000),
                        new Cesium.Cartesian2(50000, 50000),
                        new Cesium.Cartesian2(-50000, 50000)
                    ],
                    material: Cesium.Color.RED, // 填充颜色
                    show: true, // 是否展示
                    width: 5,
                    cornerType: Cesium.CornerType.ROUNDED, // 指定拐角的样式。 ROUNDED  角有光滑的边缘。 MITERED 拐角点是相邻边的交点。BEVELED 角被修剪。
                    granularity: Cesium.Math.RADIANS_PER_DEGREE, // 指定每个纬度和经度点之间的角距离。
                    outline: true, // 布尔型属性，用于指定该框是否已概述。
                    outlineColor: Cesium.Color.YELLOW, // 指定轮廓的 颜色 。
                    outlineWidth: 5, // 指定轮廓的宽度。
                    // shadows: Cesium.ShadowMode.ENABLED, // 指定框是投射还是接收光源的阴影。 DISABLED ENBALE
                    // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 20000000.0)
                    // heightReference: Cesium.HeightReference.CCLAMP_TO_GROUND
                    arcType: Cesium.ArcType.GEODESIC // 划线方式不一样，圆弧样式不同。 NONE 与椭圆表面不符的直线。GEODESIC 遵循测地路径。 RHUMB 遵循大黄蜂或恶魔般的道路。

                }
            })
            this.viewer.entities.add({
                polylineVolume: {
                    positions: Cesium.Cartesian3.fromDegreesArray([
                        -85.0,
                        32.0,
                        -85.0,
                        36.0,
                        -89.0,
                        36.0
                    ]),
                    shape: this.computeCircle(10000.0),
                    material: Cesium.Color.RED
                }
            })
            this.viewer.entities.add({
                name: 'Blue star with mitered corners and outline',
                polylineVolume: {
                    positions: Cesium.Cartesian3.fromDegreesArrayHeights([
                        -95.0,
                        32.0,
                        0.0,
                        -95.0,
                        36.0,
                        100000.0,
                        -99.0,
                        36.0,
                        200000.0
                    ]),
                    shape: this.computeStar(7, 70000, 50000),
                    cornerType: Cesium.CornerType.MITERED,
                    material: Cesium.Color.BLUE
                }
            })
            this.viewer.trackedEntity = polylineVolume
        },
        computeCircle(radius) {
            const positions = []
            for (let i = 0; i < 360; i++) {
                const radians = Cesium.Math.toRadians(i)
                positions.push(
                    new Cesium.Cartesian2(
                        radius * Math.cos(radians),
                        radius * Math.sin(radians)
                    )
                )
            }
            return positions
        },
        computeStar(arms, rOuter, rInner) {
            const angle = Math.PI / arms
            const length = 2 * arms
            const positions = new Array(length)
            for (let i = 0; i < length; i++) {
                const r = i % 2 === 0 ? rOuter : rInner
                positions[i] = new Cesium.Cartesian2(
                    Math.cos(i * angle) * r,
                    Math.sin(i * angle) * r
                )
            }
            return positions
        }
    },
    beforeDestroy() {
        this.viewer.entities.removeAll()
    }
}

</script>

<style lang="scss">
.map{
  height: 100%;
  width: 100%;
}
</style>
