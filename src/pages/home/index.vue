<template>
    <div class="contentDiv">
        <router-view></router-view>
        <MapDemo/>
    </div>
</template>

<script>
import MapDemo from './component/map-demo'

export default {
    data() {
        return {}
    },
    mounted() {

    },
    components: {
        MapDemo
    }
}
</script>
<style lang="scss">
.contentDiv{
    position: absolute;
    height: 100%;
}
</style>
