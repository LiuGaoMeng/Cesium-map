<template>
  <div id="cesiumContainer" class="map">
  </div>
</template>

<script>
export default {
    data() {
        return {
        }
    },
    mounted() {
        this.initMap()
    },
    methods: {
        initMap() {
            const viewer = new Cesium.Viewer('cesiumContainer')
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
