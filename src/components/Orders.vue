<template>
<div>
    <ul>        
        <li v-for="order in orders" v-bind:key="order" id="order">                                                    
            <button class="order-button" :id="order[0]" v-on:click="deleteItem($event)">Delete</button>
            <button class="order-button" :id="order[0]" v-on:click="route($event)">Modify</button>        
            <p v-for="(key, value) in order[1]" v-bind:key="key">{{value}}: {{key}}</p>
        </li>
    </ul>    
</div>
</template>


<script>
import database from "../firebase.js"

export default {
    name: 'Orders',
    data() {
        return {
            orders: []
        }
    },
    methods: {
        fetchItems: function() {
            database.collection('orders').get().then((querySnapShot)=>{            
                querySnapShot.forEach(doc=>{
                this.orders.push([doc.id, doc.data()])
            }) })
        },

        deleteItem: function(event) {            
            let doc_id = event.target.getAttribute("id");            
            database.collection('orders').doc(doc_id)
                .delete()
                .then(()=>{location.reload()});                
        },

        route: function(event) {
            let doc_id = event.target.getAttribute("id");            
            this.$router.push({path: `modify/${doc_id}/`, params: {id: doc_id}});
        }
    },

    created: function() {        
        this.fetchItems();
    }
}
</script>



<style>
ul {
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;  
  padding: 0;
}

li {
  flex-grow: 1;
  flex-basis: 300px;
  text-align: center;
  padding: 10px;
  border: 1px solid #222;
  margin: 10px;

  font-family:Georgia, 'Times New Roman', Times, serif;  
  background-color: #fefbd8;
  box-shadow:3px 3px #c4b7a6;   
}

.order-button {
    background-color: #618685;
    color: white;
    font-family:Georgia, 'Times New Roman', Times, serif; 
    margin-left: 5px;       
    width: 65px;
    height: 30px;
    border-radius: 10px;
    border-width: 1px;
    display: inline;
}

.order-button:hover {
    background-color: #8fb3b1;
}

.order-button:active {
    background-color: black;    
}

</style>