<template>
<div>        
    <div v-for="(count, data) in datapacket" v-bind:key="data">
            <p>{{data}}: {{count}}</p>
            <input type="number" :id="data" placeholder=0 min=0 value=0>
    </div><br>
    <button @click="updateOrder" id="update-order-button">Update Order</button>              
</div>
</template>


<script>
import database from "../firebase.js"

export default {
    name: 'Modify',

    data() {
        return {
            datapacket: {}
        }
    },

    methods: {
        fetchItems: function() {                     
            database.collection('orders').doc(this.$route.params.id).get().then((snapShot)=>{  
                const orderItems = snapShot.data();
                this.datapacket = orderItems;   
            })
        },
        
        updateOrder: function() {            
            let dataCopy = {};            
            
            for (let i in this.datapacket) {                                                
                let value = document.getElementById(i).value;                
                dataCopy[i] = value;
            }

            database.collection('orders').doc(this.$route.params.id)
                .set(dataCopy)
                .then(()=>{this.$router.push('/orders')})
        }
    },

    created: function() {          
        this.fetchItems();
    }
        
}
</script>



<style>

div {
    text-align: center;
    font-family:Georgia, 'Times New Roman', Times, serif;  
}

#update-order-button {
    width: 50%;
    margin-left: 25%;    
    margin-right: 25%;
    margin-bottom: 10px;
    height: 30px;
    background-color: #618685;
    color: white;
    font-family:Georgia, 'Times New Roman', Times, serif; 
}

#update-order-button:hover {
    background-color: #8fb3b1;
}

#update-order-button:active {
    background-color: black;    
}
</style>