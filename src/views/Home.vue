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
      <button id="addToBalance" @click="this.displayAddMoneyBox=true">Recharger le compte</button>
    </div>
    <div id="addMoneyBox" v-if="displayAddMoneyBox">
      <p>Ajouter de l'argent : </p>
      <p id="errorMessage" v-if="displayErrorMessage">! Erreur de recharge de compte, veuillez réessayez plus tard :( !</p>
      <input v-model="moneyToAdd" id="moneyInput" type="number" name="quantity">
      <button @click="addMoney()">Ajouter</button>
    </div>
  </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import axios from 'axios'

export default {
  name: 'Home',
  components: {
    NavBar
  },
  data () {
    return {
      userEmail: '',
      info: {},
      displayAddMoneyBox: false,
      displayErrorMessage: false,
      moneyToAdd: 0.00
    }
  },
  methods: {
    accountInformation() {
      this.userEmail = document.cookie
        .split('; ')
        .find(row => row.startsWith('tokenEmail='))
        .split('=')[1];
      axios
        .get('http://localhost:8080/user?email=' + this.userEmail)
        .then(response => (this.info = response.data))
    },
    addMoney() {
      axios
        .post('http://localhost:8080/user?moneyToAdd=' + this.moneyToAdd +'&email=' + this.userEmail)
        .then(response => {
          if(response.status == '200' && response.data) {
            this.displayErrorMessage = false;
            this.displayAddMoneyBox = false;
            this.accountInformation();
          }
          else {
            this.displayErrorMessage = true;
          }
        })
        .catch(error => {
          console.log(error);
          this.displayErrorMessage = true;
        })
    }
  },
  mounted () {
    this.accountInformation()
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

#addMoneyBox {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  width: 25vw;
  background-color: white;
  top: 37.5vh;
  left: 37.5vw;
  border: 2px black solid;
  border-radius: 5px;
  padding: 3vh 0 3vh 0;
  #errorMessage {
    font-weight: bold;
    color: rgb(190, 0, 0);
  }
  button {
    height: 2em;
    border: 0px;
    border-radius: 5px;
    background-color: rgb(92, 184, 92);
    font-weight: bold;
    color: white;
    font-size: 18px;
  }
  button:hover {
    background-color: rgb(92, 200, 92)
  }
}

input[type="number"] {
  -webkit-appearance: textfield;
  -moz-appearance: textfield;
  appearance: textfield;
}

input[type=number]::-webkit-inner-spin-button,
input[type=number]::-webkit-outer-spin-button {
  -webkit-appearance: none;
}
</style>
