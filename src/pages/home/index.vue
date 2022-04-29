<template>
    <div>
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
