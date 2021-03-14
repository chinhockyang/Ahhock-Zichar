<template>
  <div>
    <h1 style="text-align:center" id="storeName">Ah Hock's Zichar</h1>
    <h2 style="text-align:center" id="storeDesc">Today Eat What? Zichar!</h2>    
    <div class="navbar">
      <nav>
        <ul>
          <li><router-link to="/" exact>Home</router-link></li>
          <li><router-link to="/orders" exact>Orders</router-link></li>
          <li><router-link to="/dashboard" exact>Dashboard</router-link></li>
        </ul>
      </nav>        
    </div>
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  data() {
    return {   
    }  
  }  
}
</script>

<style>
div {
  background-color: #d5f4e6;
}

#storeName {
  padding-top: 30px;
  padding-bottom: 20px;
  font-family:Georgia, 'Times New Roman', Times, serif;  
  font-size: 300%;
  color:  #618685;
  text-shadow:4px 3px 0px #fff, 6px 5px 0px rgba(0,0,0,0.15);
  background-color: #fefbd8;
}

#storeDesc {
  width: 30%;
  margin-left: 35%;
  margin-right: 35%;
  margin-top: 5px;
  padding-top: 10px;
  padding-bottom: 10px;
  color: white;
  text-shadow: 2px 4px 3px rgba(0,0,0,0.3);
  background-color:  #ada397;
  opacity: 0.8;
  font-family:Georgia, 'Times New Roman', Times, serif;  
}

</style>