<template>
<div>
    <h3 style="text-align:center;">My Order:</h3>
    <ul>        
        <li v-for="item in itemsSelected" v-bind:key="item" id="order">                            
            <span class="order-name">{{item[0]}}</span>
            <span class="order-quantity">x {{item[1]}}</span>
        </li>
    </ul>
    <button v-on:click="findTotal" class="basket-button">Calculate Total</button>
    <div id="total-display">
        <p v-show="subTotal">Subtotal: ${{ subTotal }}</p>
        <p v-show="subTotal"><strong>Grand Total: ${{ grandTotal }}</strong></p>
    </div>
    <button v-on:click="sendOrder" class="basket-button">Send Order</button>
</div>
</template>


<script>
import database from "../firebase.js"

export default {
    name: 'Basket',
    data() {
        return {
            subTotal: 0.00,
            grandTotal: 0.00,  
            order: {}
        }
    },
    methods: {
        findTotal: function() {
            var newSubTotal = 0;
            for (let i = 0; i < this.itemsSelected.length; i++) {
                newSubTotal += this.itemsSelected[i][1] * this.itemsSelected[i][2];                
            }
            this.subTotal = newSubTotal;
        },
        prepareOrder: function() {
            database.collection('menu').get().then((querySnapShot)=>{   
                let item = {};
                querySnapShot.forEach(doc=>{                
                    item=doc.data()
                    item.show=false
                    item.id=doc.id
                    this.order[item.name] = 0;                                        
            }) });
        },

        sendOrder: function() {                                                                       
            for (let i = 0; i < this.itemsSelected.length; i++) {
                this.order[this.itemsSelected[i][0]] = this.itemsSelected[i][1];
            }

            database.collection('orders').add(this.order).then(()=>{location.reload()});
        }        
    },
    watch: {
        subTotal:function() {
            this.grandTotal = 1.07 * this.subTotal;
            this.grandTotal = this.grandTotal.toFixed(2);
        }
    },
    props: ['itemsSelected'],

    created: function() {
        this.prepareOrder();
    }
}
</script>



<style>
#order {
    font-size: 20px;
}

.order-quantity {
    position: absolute;
    right: 30px;
}

.basket-button {
    width: 50%;
    margin-left: 25%;    
    margin-right: 25%;
    margin-bottom: 10px;
    height: 30px;
    background-color: #618685;
    color: white;
    font-family:Georgia, 'Times New Roman', Times, serif; 
}

.basket-button:hover {
    background-color: #8fb3b1;
}

.basket-button:active {
    background-color: black;    
}

#total-display {
    background-color: white;
    text-align: center;
    font-size: 20px;
    font-family:Georgia, 'Times New Roman', Times, serif; 
}

li {
    margin-top: 10px;
}
</style>