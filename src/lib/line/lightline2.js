import * as Cesium from 'cesium/Cesium'

export class PolylineTrailMaterialProperty {
    constructor(options) {
        debugger
        options = Cesium.defaultValue(options, Cesium.defaultValue.EMPTY_OBJECT)

        this._definitionChanged = new Cesium.Event()

        this._color = undefined

        this._colorSubscription = undefined

        this.color = options.color

        this.duration = options.duration

        this.trailImage = options.trailImage
        this._time = performance.now()
        this.length = options.length
    }
}

Object.defineProperties(PolylineTrailMaterialProperty.prototype, {

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

PolylineTrailMaterialProperty.prototype.getType = function (time) {
    return 'PolylineTrail'
}

PolylineTrailMaterialProperty.prototype.getValue = function (time, result) {
    if (!Cesium.defined(result)) {
        result = {}
    }

    result.color = Cesium.Property.getValueOrClonedDefault(this._color, time, Cesium.Color.WHITE, result.color)

    // result.image = Cesium.Material.PolylineTrailImage

    result.image = this.trailImage

    result.time = ((performance.now() - this._time) % this.duration) / this.duration
    result.length = this.length

    return result
}

PolylineTrailMaterialProperty.prototype.equals = function (other) {
    return this === other ||

        (other instanceof PolylineTrailMaterialProperty &&

            Cesium.Property.equals(this._color, other._color))
}

Cesium.Material.PolylineTrailType = 'PolylineTrail'
// console.log(Cesium.Material.PolylineTrailImage)
Cesium.Material.PolylineTrailImage = ''

Cesium.Material.PolylineTrailSource = `czm_material czm_getMaterial(czm_materialInput materialInput)
        {
        czm_material material = czm_getDefaultMaterial(materialInput);

        vec2 st = materialInput.st;

        vec4 colorImage = texture2D(image, vec2(fract(st.s - time)*length, st.t*length));

            material.alpha = colorImage.a * color.a;

            material.diffuse = (colorImage.rgb + color.rgb) / 2.0;

            return material;

        } `
Cesium.Material._materialCache.addMaterial(Cesium.Material.PolylineTrailType, {

    fabric: {

        type: Cesium.Material.PolylineTrailType,

        uniforms: {

            color: new Cesium.Color(1.0, 0.0, 0.0, 1),

            image: Cesium.Material.PolylineTrailImage,

            time: 0,
            length: 0.0

        },

        source: Cesium.Material.PolylineTrailSource

    },

    translucent: function (material) {
        return true
    }

})

Cesium.PolylineTrailMaterialProperty = PolylineTrailMaterialProperty
