<template>
<div>
    <h1>Line Chart</h1>
    <chart style="background-color: white; margin: 2%;"></chart>
</div>
</template>


<script>
//import database from "../firebase.js"
import Chart from "./CallAPI.js"

export default {
    name: 'CallAPI',    
    components: {
        Chart
    }
};

</script>



<style>

</style>