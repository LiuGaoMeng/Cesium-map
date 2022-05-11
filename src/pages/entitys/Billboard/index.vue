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
            const billboard = this.viewer.entities.add({
                id: 'billboard', // 对象的唯一标识符。如果未提供，则将生成GUID。
                name: 'billboard', // 要显示给用户的可读名称。它不必是唯一的。
                position: Cesium.Cartesian3.fromDegrees(-107.0, 40, 150),
                point: {
                    color: Cesium.Color.RED,
                    pixelSize: 10
                },
                billboard: {
                    image: '/image/billboard.jpg',
                    width: 474, // 指定广告牌的宽度（以像素为单位），并覆盖原始尺寸。
                    height: 300, // 指定广告牌的高度（以像素为单位），并覆盖原始尺寸。
                    scale: 1, // 指定要应用于图像尺寸的比例
                    sizeInMeters: true // 是否应以米为单位测量此广告牌的大小,随比例尺缩放
                    // eyeOffset: new Cesium.Cartesian3(0.0, 1000.0, 0.0), // Cartesian3 属性，指定了眼睛偏移。三维世界坐标
                    // horizontalOrigin: Cesium.HorizontalOrigin.RIGHT, // 相对于对象原点的水平位置。RIGHT 原点在对象的右侧, LEFT: 原点在对象的左侧 CENTER 原点在对象的水平中心
                    // verticalOrigin: Cesium.VerticalOrigin.CENTER, // 相对于对象的原点的垂直位置 CENTER 原点位于 BASELINE 和 TOP 之间的垂直中心。 BOTTOM 原点在对象的底部。BASELINE 如果对象包含文本，则原点位于文本的基线，否则原点位于对象的底部。 TOP 原点在对象的顶部。
                    // heightReference: Cesium.HeightReference.NONE, // 指定相对于高度的高度。NONE 位置绝对。CLAMP_TO_GROUND 位置固定在地形上。RELATIVE_TO_GROUND 位置高度是指地形上方的高度。
                    // color: Cesium.Color.RED.withAlpha(0.5), // 指定图像的色调 颜色
                    // rotation: Cesium.Math.PI_OVER_FOUR, // 指定关于alignedAxis的旋转角度。
                    // alignedAxis: Cesium.Cartesian3.UNIT_X, // UNIT_X X轴 UNIT_Y Y 轴  UNIT_Z Z 轴
                    // pixelOffset: new Cesium.Cartesian2(0.0, 100.0), // Cartesian2 属性，用于指定像素偏移,二维屏幕坐标。随缩放一直保存偏移
                    // pixelOffsetScaleByDistance: new Cesium.NearFarScalar(1.0, 1.0, 20000, 10) // 根据距相机的距离来设置pixelOffset(像素偏移)。 必须设置 pixelOffset
                    // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(0.0, 10000.0)
                    // scaleByDistance: new Cesium.NearFarScalar(1.5e2, 2.0, 1.5e7, 0.1) // 根据该点到相机的距离，获取或设置该点的近和远缩放属性。
                    // translucencyByDistance: new Cesium.NearFarScalar(1.5e2, 1.0, 1.5e7, 0.2) // 根据该点到相机的距离来获取或设置该点的近和远半透明属性。
                    // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10, 1.5e7), // 获取或设置条件，该条件指定将在距相机的距离显示此点
                    // imageSubRegion: new Cesium.BoundingRectangle(50, 50, 50, 50) // 定义了要用于广告牌的图像的子区域，而不是整个图像，而是从左下角开始以像素为单位。
                    // disableDepthTestDistance: Number.POSITIVE_INFINITY// 要禁用深度测试的距离相机的距离。POSITIVE_INFINITY无穷大，不会应用深度测试，0始终应用深度测试。应用深度测试避免地形的遮挡。

                }
            })
            this.viewer.trackedEntity = billboard
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
