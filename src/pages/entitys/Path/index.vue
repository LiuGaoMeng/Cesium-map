<template>
  <div id="cesiumContainer" class="map">
  </div>
</template>

<script>
export default {
    data() {
        return {
            viewer: null,
            startTime: null,
            stopTime: null

        }
    },
    mounted() {
        this.initMap()
        this.initObject()
    },
    methods: {
        initMap() {
            this.viewer = new Cesium.Viewer('cesiumContainer', {
                animation: true, // 是否创建动画小器件，左下角仪表
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
                timeline: true, // 是否显示时间轴
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

            this.viewer.scene.globe.enableLighting = true

            this.viewer.scene.globe.depthTestAgainstTerrain = true
            this.viewer.scene.logarithmicDepthBuffer = false
        },
        initObject() {
            this.startTime = Cesium.JulianDate.now()
            this.stopTime = Cesium.JulianDate.addSeconds(this.startTime, 360, new Cesium.JulianDate())
            this.viewer.clock.startTime = this.startTime.clone() // 设置时钟开始时间
            this.viewer.clock.stopTime = this.stopTime.clone() // 设置时钟停止时间
            this.viewer.clock.currentTime = this.startTime.clone() // 设置时钟当前时间
            this.viewer.clock.clockRange = Cesium.ClockRange.LOOP_STOP// 循环执行，到达终止时间，重新从起点开始
            this.viewer.clock.multiplier = 5 // 时间速率，数字越大时间过的越快
            this.viewer.timeline.zoomTo(this.startTime, this.stopTime)
            let position = this.computePath(-107.0, 40)
            const path = this.viewer.entities.add({
                id: 'path', // 对象的唯一标识符。如果未提供，则将生成GUID。
                name: 'path', // 要显示给用户的可读名称。它不必是唯一的。
                position: position,
                orientation: new Cesium.VelocityOrientationProperty(position),
                availability: new Cesium.TimeIntervalCollection([new Cesium.TimeInterval({ // 和时间轴关联
                    start: this.startTime,
                    stop: this.stopTime
                })]),
                model: {
                    uri: '/model/Cesium_Air.glb'
                },
                path: {
                    leadTime: 0, // 指定要显示的对象前面的秒数。
                    trailTime: 1, // 指定要显示的对象后面的秒数。
                    material: new Cesium.PolylineGlowMaterialProperty({ // 发光线
                        glowPower: 1,
                        color: Cesium.Color.ORANGE
                    }),
                    show: true, // 是否展示
                    width: 5, // 宽度。像素
                    resolution: 10 // 指定在对该位置进行采样时要移动的最大秒数。
                    // distanceDisplayCondition: new Cesium.DistanceDisplayCondition(10.0, 200000.0)

                }
            })
            this.viewer.trackedEntity = path
        },
        computePath(lon, lat) {
            let property = new Cesium.SampledPositionProperty()
            for (let i = 0; i < 10; i++) {
                let time = Cesium.JulianDate.addSeconds(this.startTime, i * 60, new Cesium.JulianDate())
                let position = Cesium.Cartesian3.fromDegrees(lon, lat + i * 0.1, 1750)
                property.addSample(time, position)
            }
            return property
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
