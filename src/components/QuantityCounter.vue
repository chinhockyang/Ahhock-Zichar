<template>
    <div id="quantity-counter">        
        <button id="subCounter" class="button" v-on:click="decrement">-</button>  
        <span id="counter">{{ counter }}</span> 
        <button id="addCounter" class="button" v-on:click="increment">+</button>               
        <p v-html="alert" v-show="alert" id="alert">You cannot buy more than 10 items!</p>               
    </div>
</template>

<script>

export default {
    name: 'QuantityCounter',
    data() {
        return {
            counter: 0,
            alert: ""    
        }
    },
    methods: {
        increment() {            
            if (this.counter == 10) {              
                this.alert = "You cannot buy more than 10 items.";
            } else {
                this.counter++;                
                this.$emit('counter', this.item, this.counter);
            }            
        },
        decrement() {
            if (!this.counter == 0) {                    
                this.alert = "";
                this.counter--;                                    
                this.$emit('counter', this.item, this.counter);
            }            
        }
    },
    props: ['item']         
}
</script>

<style>
  #quantity-counter {        
    font-family: verdana, serif;
    font-size: 20px;
    background-color: transparent;   
  }  
  
  .button {
    width: 50px;
    height: 50px;
    margin: 15px;
    border-style:outset;
    border-width:5px;
    font-size: 25px;
  }

  #addCounter {    
    background-color: aquamarine;
    border-color: darkgreen;
  }
  
  #addCounter:hover {
    background-color: lightgreen;    
  }

  #addCounter:active {
    background-color: yellow;    
  }
  
  #subCounter {
    background-color: lightpink;
    border-color: firebrick;    
  }
  
  #subCounter:hover {
    background-color: rgb(255, 152, 233);    
  }

  #subCounter:active {
    background-color: red;
  }

  #alert {
    background-color: #f7c1c5;
    border: 2px ridge grey;
    padding: 5px 2px 5px;
    font-size: 80%;
  }

</style> 