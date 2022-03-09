<template>
<div>
  <nav>
    <div id="logo">Pay My Buddy</div>
    <div id="buttons">
      <router-link to="/home" id="navButton">Home</router-link>
      <router-link to="/transfer" id="navButton">Transfer</router-link>
      <router-link to="/profile" id="navButton">Profile</router-link>
      <router-link to="/contact" id="navButton">Contact</router-link>
      <a id="navButton" @click="$router.push('login')">Log off</a>
    </div>
  </nav>
</div>
<!--TODO : coder l'emplacement de l'utilisateur sur le site-->
<div id="pageName"></div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>

<style lang="scss" scoped>
#logo {
  position: fixed;
  top: 0%;
  left: 0%;
  width: 10%;
  height: 20px;
  text-align: center;
  font-weight: bold;
  background-color: rgb(0, 175, 0);
  color: white;
  border-radius: 5px;

  padding: 10px;
  margin: 10px;
}

#buttons {
  position: fixed;
  top: 0%;
  right: 0%;
  width: 90%;
  height: 40px;

  margin: 10px;
}

nav {
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 60px;
  text-align: right;
  background-color: white;
  #navButton {
    display: inline-block;
    text-decoration: unset;
    text-align: center;
    font-weight: bold;
    color: black;

    height: 20px;
    padding: 10px 0.8em 10px 0.8em;

     &.router-link-exact-active {
      color: rgb(65, 125, 255);
    }
  }

  #navButton:hover {
    color: rgb(150, 150, 150);
  }
}

#pageName {
  top: 60px;
  left: 0%;
  right: 0%;
  height: 20px;
  padding: 10px 20px 10px 20px;
  background-color: rgb(241, 241, 241);
  color: rgb(65, 170, 255);
  text-align: left;
}
</style>