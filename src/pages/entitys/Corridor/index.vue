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
            this.viewer._cesiumWidget._creditContainer.style.display = 'none'
        },
        initObject() {
            const corridor = this.viewer.entities.add({
                id: 'corridor', // 对象的唯一标识符。如果未提供，则将生成GUID。
                name: 'corridor', // 要显示给用户的可读名称。它不必是唯一的。
                corridor: {
                    positions: Cesium.Cartesian3.fromDegreesArray([ // 走廊走向数据
                        -100, 40,
                        -105, 40,
                        -105, 35,
                        -110, 35,
                        -110, 40,
                        -100, 45
                    ]),
                    width: 100000, // 宽度必须设置
                    height: 40000, // 走廊相对于椭球表面的高度。
                    fill: true, // 布尔属性，指定是否用提供的材料填充该框。
                    material: Cesium.Color.RED, // 边框大小
                    extrudedHeight: 80000.0, // 走廊的凸出面相对于椭球面的高度。拉伸高度=extrudedHeight-height
                    cornerType: Cesium.CornerType.ROUNDED,
                    classificationType: Cesium.ClassificationType.BOTH, // 用来描述是否只贴地形（ClassificationType.TERRAIN）,只贴3dtiles(ClassificationType.CESIUM_3D_TILE), 俩者都贴ClassificationType.BOTH
                    granularity: Cesium.Math.RADIANS_PER_DEGREE, // 指定每个经纬度之间的距离
                    zIndex: 0 // 层级，当未定义height和extrudedHeight且道路为静态时有效
                    // show: true, // 是否展示
                    // outline: true, // 布尔型属性，用于指定该框是否已概述。
                    // outlineColor: Cesium.Color.YELLOW, // 指定轮廓的 颜色 。
                    // outlineWidth: 5, // 指定轮廓的宽度。
                    // shadows: Cesium.ShadowMode.ENABLED, // 指定框是投射还是接收光源的阴影。 DISABLED ENBALE
                    // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 200000.0)

                }
            })
            this.viewer.trackedEntity = corridor
        }
    }
}

</script>

<style lang="scss">
.map{
  height: 100%;
  width: 100%;
}
</style>
