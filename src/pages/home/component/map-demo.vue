<template>
    <div id="cesiumContainer" class="map">
        <div class="toolDiv">
            <el-button @click="addDataSources()">PolygonDataSources</el-button>
            <el-button @click="addCustomData()">CustomDataSources</el-button>
        </div>
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
                // skyBox: new Cesium.SkyBox({
                //     sources: {
                //         positiveX: '/Skybox/px.jpg',
                //         negativeX: '/Skybox/mx.jpg',
                //         positiveY: '/Skybox/px.jpg',
                //         negativeY: '/Skybox/mx.jpg',
                //         positiveZ: '/Skybox/px.jpg',
                //         negativeZ: '/Skybox/mx.jpg'
                //     }
                // }) // 用于渲染星空SkyBox对象
                fullsccreennElement: document.body, // 全屏渲染的HTML元素
                showRenderLoopErrors: false, // 如果设置为true，将在一个HTML面板显示错误信息
                dataSources: new Cesium.DataSourceCollection() // 需要进行可视化的数据源集合，要加载的网址，GeoJSON对象或TopoJSON对象。
            })
            this.viewer._cesiumWidget._creditContainer.style.display = 'none'
        },
        addDataSources() {
            this.viewer.dataSources.removeAll()
            this.viewer.dataSources.add(Cesium.GeoJsonDataSource.load('/data/polygonData.topojson'),
                {
                    stroke: Cesium.Color.HOTPINK,
                    fill: Cesium.Color.PINK.withAlpha(0.5),
                    strokeWidth: 3
                })

            this.initCamera()
        },
        addCustomData() {
            this.viewer.dataSources.removeAll()
            Cesium.GeoJsonDataSource.load('/data/polygonData.topojson').then(dataSource => {
                this.viewer.dataSources.add(dataSource)
                const colorHash = {}
                dataSource.entities.values.forEach(data => {
                    const name = data.name
                    let color = colorHash[name]
                    if (!color) {
                        color = Cesium.Color.fromRandom({
                            alpha: 1.0
                        })
                        colorHash[name] = color
                    }
                    data.polygon.material = color
                    data.polygon.outline = false
                    data.polygon.extrudedHeight =
                    data.properties.Population / 50.0
                })
                this.initCamera()
            })
        },
        initCamera() {
            this.viewer.camera.lookAt(
                Cesium.Cartesian3.fromDegrees(-98.0, 40.0),
                new Cesium.Cartesian3(0.0, -4790000.0, 3930000.0)
            )
            this.viewer.camera.lookAtTransform(Cesium.Matrix4.IDENTITY)
        }
    }
}
</script>

<style lang="scss">
.map {
    height: 100%;
    width: 100%;
}
.toolDiv {
    z-index: 10;
    position: absolute;
    margin-left: 10px;
}
</style>
