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
        },
        initObject() {
            const ellipsoid = this.viewer.entities.add({
                id: 'ellipsoid', // 对象的唯一标识符。如果未提供，则将生成GUID。
                name: 'ellipsoid', // 要显示给用户的可读名称。它不必是唯一的。
                position: Cesium.Cartesian3.fromDegrees(-107.0, 40, 300000),
                ellipsoid: {
                    radii: new Cesium.Cartesian3(300000.0, 300000.0, 300000.0),
                    innerRadii: new Cesium.Cartesian3(100000.0, 100000.0, 100000.0),
                    material: Cesium.Color.RED.withAlpha(0.3),
                    outline: true,
                    outlineColor: Cesium.Color.BLACK
                }
            })
            this.viewer.entities.add({
                name: 'ellipsoid', // 要显示给用户的可读名称。它不必是唯一的。
                position: Cesium.Cartesian3.fromDegrees(-100.0, 40, 300000),
                ellipsoid: {
                    radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
                    material: Cesium.Color.BLUE
                }
            })
            this.viewer.entities.add({
                name: 'ellipsoid', // 要显示给用户的可读名称。它不必是唯一的。
                position: Cesium.Cartesian3.fromDegrees(-95.0, 40, 300000),
                ellipsoid: {
                    radii: new Cesium.Cartesian3(200000.0, 200000.0, 300000.0),
                    fill: false,
                    outline: true,
                    outlineColor: Cesium.Color.YELLOW,
                    slicePartitions: 24, // 指定径向切片数量，类似于经度，越大越密集，圆越光滑
                    stackPartitions: 36, // 指定堆栈数，类似于纬度，越大越密集
                    subdivisions: 128 // 指定每个轮廓环的样本数，确定曲率的粒度。即单个轮廓环上有几个点连接组成的
                }
            })

            this.viewer.trackedEntity = ellipsoid
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
