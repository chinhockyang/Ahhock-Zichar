<template>
<div>    
    <ul id="itemsList">
        <li v-for="item in items" v-bind:key="item">
            <p id="itemName">{{item.name}}</p>
            <img :src="item.imageURL">
            <p id="price">${{item.price}}</p> 
            <p><Counter v-bind:item="item" v-on:counter="onCounter"></Counter></p>
        </li>
    </ul>        
    <Basket v-bind:itemsSelected="itemsSelected" id="shoppingBasket"></Basket>
</div>
</template>

<script>
import QuantityCounter from './QuantityCounter.vue'
import Basket from './Basket.vue'
import Vue from 'vue'
import database from "../firebase.js"

export default {
    name: 'PageContent',
    data() {
        return {
            itemsSelected: [],
            items: []
        }
    },
    methods: {
        onCounter: function (item, count) {            
            if (this.itemsSelected.length === 0 && count > 0) {    
                //If there is nothing in items selected, push the ORDER in                
                this.itemsSelected.push([item.name, count, item.price]);                                
            } else {                  
                // Loop through everything to check what is not in the basket
                for (let i = 0; i < this.itemsSelected.length; i++) {
                    const curr_item = this.itemsSelected[i];
                    const item_name = curr_item[0];

                    // if item_name is the same as item.name and the count is more than 0, update this.itemsSelected
                    if (item_name == item.name && count > 0) {                        
                        Vue.set(this.itemsSelected[i], 1, count);              
                        return;
                    } else if (item_name == item.name && count == 0) {                         
                        // Next, item_name is the same as item.name and the count is 0, remove it from itemsSelected.
                        this.itemsSelected.splice(i, 1);                                                
                        return;
                    }            
                }                
                this.itemsSelected.push([item.name, count, item.price]);                          
            }            
        },
        fetchItems() {                
            database.collection('menu').get().then((querySnapShot)=>{
            let item={}
                querySnapShot.forEach(doc=>{
                item=doc.data()
                item.show=false
                item.id=doc.id
                this.items.push(item) 
            }) })
        }
    },
    
    components: {
        Counter: QuantityCounter,
        Basket: Basket
    },

    created: function() {
        this.fetchItems();
    }
}
</script>



<style scoped>
#itemsList {
  width: 100%;
  max-width: 70%;
  margin: 0px;
  padding: 0 5px;
  box-sizing: border-box;
}

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
img {
  width: 135px;
  height: 135px;
  border-style:ridge;  
  border-width: 5px;
  border-color: white;
}

#price {
  font-size: 30px;
  background-color: #f0eab6;  
  height:50px;
  width:80%;
  margin-left: auto;
  margin-right: auto;
  padding: 5px 10px 0px;  
}

#itemName {
  font-size: 30px;
}

#shoppingBasket {
  position: absolute;
  top: 45%;
  left: 75%;
  font-family:Georgia, 'Times New Roman', Times, serif;  
  background-color: #fffdeb;
  width: 20%;
  border: 5px groove #b9936c;  
}
</style>
