<template>
  <div class="navbar">
    <NavBar/>
  </div>
  <div class="home">
    <div id="connectedAs">
      <h2>Connecté en tant que :</h2>
      <h1>{{info.firstName}} {{info.lastName}}</h1>
    </div>
    <div id="separator"></div>
    <div>
      <h2>Solde restant :</h2>
      <h2 id="balance">{{info.wallet}} €</h2>
      <button id="addToBalance">Recharger le compte</button>
    </div>
  </div>
</template>

<script>
import NavBar from '@/components/NavBar?vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    NavBar
  },
  data () {
    return {
      info: {}
    }
  },
  mounted () {
    let userEmail = document.cookie
    .split('; ')
    .find(row => row.startsWith('tokenEmail='))
    .split('=')[1];
    axios
      .get('http://localhost:8080/user?email=' + userEmail)
      .then(response => (this.info = response.data))
  }
}
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
}

#connectedAs {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 40%;
  height: 15vh;
  background-color: rgb(92, 184, 92);
}

#separator {
  width: 45%;
  margin: 2vh;
  border: 1px black solid;
}

#balance {
  font-weight: bold;
  background-color: rgb(92, 184, 92);
  padding: 1em;
  border-radius: 5px;
}

#addToBalance {
  padding: 0 1em 0 1em;
  height: 2em;
  border: 0px;
  border-radius: 5px;
  background-color: rgb(2, 117, 216);
  font-weight: bold;
  color: white;
  font-size: 18px;
}

#addToBalance:hover {
  background-color: rgb(2, 117, 255);
}
</style>
