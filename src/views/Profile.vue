<template>
  <div class="navbar">
    <NavBar/>
  </div>
  <div class="profile">
    <div id="profileLabel">
      <label>Profile</label>
    </div>
    <div id="profileBox">
      <table>
        <tr>
          <th>Nom :</th>
          <td>{{profileInfo.lastName}}</td>
        </tr>
        <tr>
          <th>Prénom :</th>
          <td>{{profileInfo.firstName}}</td>
        </tr>
        <tr>
          <th>IBAN :</th>
          <td>{{profileInfo.iban ?profileInfo.iban: "Rien"}}</td>
        </tr>
      </table>
      <button @click="this.displayAddIbanBox = !this.displayAddIbanBox">Ajouter / Modifier un IBAN</button>
    </div>
    <div id="addIbanBox" v-if="displayAddIbanBox">
      <div id="message" v-if="displayMessage">{{ message }}</div>
      <input v-model="ibanToAdd" id="ibanInput" type="text" placeholder="IBAN">
      <button id="addButton" @click="addIban()">Ajouter</button>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar?vue'
import axios from 'axios'

export default {
  name: 'Profile',
  components: {
    NavBar
  },
  data () {
    return {
      userEmail: '',
      profileInfo: {iban: ''},
      displayAddIbanBox: false,
      ibanToAdd: '',
      message: '',
      displayMessage: false
    }
  },
  methods: {
    addIban() {
      if(this.ibanToAdd == '') {
        this.message = '! IBAN vide !';
        this.displayMessage = true;
      }
      else {
        axios
          .post('http://localhost:8080/money/userIban', {userEmail: this.userEmail, ibanToUpdate: this.ibanToAdd})
          .then(response => {
            if(response.status == '201') {
              this.message = 'IBAN mis à jour !';
              this.displayMessage = true;
              this.profileInfo.iban = this.ibanToAdd;
            }
          })
          .catch(error => {
            console.log(error);
            this.message = '! Erreur de mise à jour, réesayez plus tard :( !';
            this.displayMessage = true;
          })
      }
    }
  },
  mounted () {
    this.userEmail = document.cookie
    .split('; ')
    .find(row => row.startsWith('tokenEmail='))
    .split('=')[1];
    axios
      .get('http://localhost:8080/user?email=' + this.userEmail)
      .then(response => (this.profileInfo = response.data))
  }
}
</script>

<style lang="scss" scoped>
.profile {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
}

#profileLabel {
  width: 60%;
  text-align: left;
  label {
    padding: 0.4em 0.4em 0em 0.4em;
    font-size: 20px;
  }
}

#profileBox {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 60%;
  height: 15vh;
  background-color: rgb(245, 245, 245);
}

button {
    height: 2em;
    border: 0px;
    border-radius: 5px;
    background-color: rgb(65, 125, 255);
    font-weight: bold;
    color: white;
    font-size: 18px;
}

button:hover {
    background-color: rgb(100, 149, 255);
}

#addIbanBox {
  margin-top: 2vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  width: 40%;
  height: 15vh;
  background-color: rgb(245, 245, 245);
}

#message {
  font-weight: bold;
  color: rgb(65, 125, 255);
}

#ibanInput {
  width: 40%;
}
</style>