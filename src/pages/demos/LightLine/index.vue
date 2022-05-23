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
            this.addDataSources()
            // 大批量操作时，临时禁用事件可以提高性能

            this.viewer.entities.suspendEvents()
        },
        addDataSources() {
            // this.viewer.dataSources.add(Cesium.GeoJsonDataSource.load('/data/yj_riverLine.geojson', {
            //     stroke: Cesium.Color.HOTPINK,
            //     fill: Cesium.Color.PINK.withAlpha(0.5),
            //     strokeWidth: 3
            // }))
            Cesium.GeoJsonDataSource.load('/data/yj_riverLine.geojson', {
                strokeWidth: 3.0,
                color: Cesium.Color.White
            }).then(dataSource => {
                // polyline
                this.viewer.dataSources.add(dataSource)
                this.viewer.flyTo(dataSource)
                dataSource.entities.values.forEach(data => {
                    data.polyline.width = 1.0
                    data.polyline.material = new Cesium.LaserPolylineTrailLinkMaterialProperty(
                        4000,
                        Cesium.Color.White
                    )
                })
            })
        },

        initMaterial() {
            // 激光材质类
            function LaserPolylineTrailLinkMaterialProperty(duration, color) {
                this._definitionChanged = new Cesium.Event()
                this._color = undefined
                this._colorSubscription = undefined
                this.color = color
                this.duration = duration
                this._time = new Date().getTime()
            }

            Object.defineProperties(LaserPolylineTrailLinkMaterialProperty.prototype, {
                isConstant: {
                    get: function () {
                        return false
                    }
                },
                definitionChanged: {
                    get: function () {
                        return this._definitionChanged
                    }
                },
                color: Cesium.createPropertyDescriptor('color')
            })

            LaserPolylineTrailLinkMaterialProperty.prototype.getType = function (time) {
                return 'PolylineTrailLink'
            }

            LaserPolylineTrailLinkMaterialProperty.prototype.getValue = function (
                time,
                result
            ) {
                if (!Cesium.defined(result)) {
                    result = {}
                }
                result.color = Cesium.Property.getValueOrClonedDefault(
                    this._color,
                    time,
                    Cesium.Color.WHITE,
                    result.color
                )
                result.image = Cesium.Material.PolylineTrailLinkImage
                result.time =
        ((new Date().getTime() - this._time) % this.duration) / this.duration
                return result
            }

            LaserPolylineTrailLinkMaterialProperty.prototype.equals = function (other) {
                return (
                    this === other ||
        (other instanceof LaserPolylineTrailLinkMaterialProperty &&
            Cesium.Property.equals(this._color, other._color))
                )
            }

            Cesium.LaserPolylineTrailLinkMaterialProperty = LaserPolylineTrailLinkMaterialProperty
            Cesium.Material.PolylineTrailLinkType = 'PolylineTrailLink'
            Cesium.Material.PolylineTrailLinkImage = '/image/light3.png'
            Cesium.Material.PolylineTrailLinkSource =
                `czm_material czm_getMaterial(czm_materialInput materialInput)
                {
                czm_material material = czm_getDefaultMaterial(materialInput);
                vec2 st = materialInput.st;
                vec4 colorImage = texture2D(image, vec2(fract(st.s - time)*10., st.t*10.));
                    material.alpha = colorImage.a * color.a;
                    material.diffuse = (colorImage.rgb + color.rgb) / 2.0;
                    return material;
                } `
            Cesium.Material._materialCache.addMaterial(
                Cesium.Material.PolylineTrailLinkType,
                {
                    fabric: {
                        type: Cesium.Material.PolylineTrailLinkType,
                        uniforms: {
                            color: new Cesium.Color(1.0, 0.0, 0.0, 0.5),
                            image: Cesium.Material.PolylineTrailLinkImage,
                            time: 20
                        },
                        source: Cesium.Material.PolylineTrailLinkSource
                    },
                    translucent: function (material) {
                        return true
                    }
                }
            )
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
