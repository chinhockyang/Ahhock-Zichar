<template>
<div>    
    <call-api></call-api>
    <bar-chart></bar-chart>    
</div>
</template>


<script>
import BarChart from "./charts/BarChart.vue"
import CallAPI from "./charts/CallAPI.vue"

export default {
    name: 'Dashboard',
    data() {
        return {            
        }
    },
    methods: {        
    },
    components: {
        'bar-chart': BarChart, 
        'call-api': CallAPI
    },    
}
</script>


<style>
</style>