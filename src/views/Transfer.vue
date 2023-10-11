<template>
  <div class="navbar">
    <NavBar/>
  </div>
  <div class="transfer">
    <div id="sendMoneyLabel">
      <label>Send Money</label>
      <button @click="$router.push('connection')">Add Connection</button>
    </div>
    <div id="sendMoney">
      <select v-model="selectedConnection">
        <option value="">-Selectionnez un Ami-</option>
        <option v-for="item in friends" :key="item">{{ item }}</option>
      </select>
      <div id="moneyInputGroup">
        <input v-model="amountToPay" id="moneyInput" type="number" name="quantity">
        <div id="spinnerButtons">
          <button onclick="document.querySelector('#moneyInput').stepUp()">▲</button>
          <button onclick="document.querySelector('#moneyInput').stepDown()">▼</button>
        </div>
      </div>
      <input v-model="description" id="descriptionInput" type="text" placeholder="Description">
      <button id="payButton" @click="this.displayConfirmationMessage=true">Pay</button>
    </div>
    <div id="historicLabel">
      <label id="label">My Transactions</label>
    </div>
    <div id="historic">
      <table>
        <tr id="greenRow">
          <th>Giver</th>
          <th>Receiver</th>
          <th>Description</th>
          <th>Amount</th>
        </tr>
        <tr v-for="item in data" :key="item.key" id="greyRow">
          <td>{{ item.key.giverEmail.firstName }}</td>
          <td>{{ item.key.receiverEmail.firstName }}</td>
          <td>{{ item.description ?item.description: "?" }}</td>
          <td>{{ item.amount }} €</td>
        </tr>
      </table>
    </div>
  </div>
  <div id="messageBox" v-if="displayConfirmationMessage">
    <p>Montant de la transaction :</p>
    <ul>
      <li>Montant envoyé à {{ selectedConnection }} : {{ amountToPay }}</li>
      <li>Monétisation de l'application (à hauteur de 0.5%) : {{ amountToPay / 200 }}</li>
    </ul>
    <p>Total : {{ amountToPay + (amountToPay / 200) }}</p>
    <button @click="pay()">Confirmer</button>
  </div>
  <div id="messageBox" v-if="displayErrorMessage">
    <p id="errorMessage">{{ message }}</p>
    <button @click="this.displayErrorMessage=false">OK</button>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '../components/NavBar.vue'
import axios from 'axios'

export default {
  name: 'Transfer',
  components: {
    NavBar
  },
  data () {
    return {
      userEmail: '',
      data: [{
        key: {
          giverEmail: {
            email: ''
          },
          receiverEmail: {
            email: ''
          }
        },
        amount: 0.0,
        description: ''
      }],
      friends: [''],
      selectedConnection: '',
      amountToPay: 0.0,
      description: '',
      displayConfirmationMessage: false,
      displayErrorMessage: false,
      message: ''
    }
  },
  methods: {
    pay() {
      this.displayConfirmationMessage = false;
      if(this.amountToPay <= 0.0) {
        this.message = '! Veuillez rentrer un somme au-dessus de zéro !';
        this.displayErrorMessage = true;
      }
      else {
        axios
          .post('http://localhost:8080/money/transaction', {'giverEmail': this.userEmail, "receiverEmail": this.selectedConnection, 'amount': this.amountToPay, 'description': this.description})
          .then(response => {
            if(response.status == 200) {
              this.message = '! Balance du compte insuffisante !';
              this.displayErrorMessage = true;
            }
          })
          .catch(error => {
            console.log(error);
            this.message = '! Erreur de transaction, veuillez réessayez plus tard :( !';
            this.displayErrorMessage = true;
          });
      }
    }
  },
  mounted () {
    this.userEmail = document.cookie
    .split('; ')
    .find(row => row.startsWith('tokenEmail='))
    .split('=')[1];
    axios
      .get('http://localhost:8080/money/getTransactionHistoric?email=' + this.userEmail)
      .then(response => (this.data = response.data));
    axios
      .get('http://localhost:8080/friend?email=' + this.userEmail)
      .then(response => (this.friends = response.data));
  }
}
</script>

<style lang="scss" scoped>
.transfer {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2vh;
}

#sendMoneyLabel {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  width: 60%;
  text-align: left;
  label {
    padding: 0.4em 0.4em 0em 0.4em;
    font-size: 20px;
  }
  button {
    width: 15%;
    height: 2em;
    border: 0px;
    border-radius: 5px;
    background-color: rgb(2, 117, 216);
    font-weight: bold;
    color: white;
    font-size: 18px;
  }
  button:hover {
    background-color: rgb(2, 117, 255);
  }
}

#sendMoney {
  width: 60%;
  height: 15vh;
  background-color: rgb(245, 245, 245);
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  select {
    width: 15%;
    height: 30%;
    background-color: white;
    border: 2px black solid;
    border-radius: 2px;
  }
  #payButton {
    width: 15%;
    height: 2em;
    border: 0px;
    border-radius: 5px;
    background-color: rgb(92, 184, 92);
    font-weight: bold;
    color: white;
    font-size: 18px;
  }
  #payButton:hover {
    background-color: rgb(92, 200, 92)
  }
}

#moneyInputGroup {
  display: flex;
  flex-direction: row;
  width: 15%;
  height: 30%;
  border: 2px black solid;
  border-radius: 2px;
  input {
    box-sizing: border-box;
    width: 80%;
    height: 100%;
    border: 0px;
    border-radius: 0px;
    padding: 0.5em;
    text-align: right;
  }
  #spinnerButtons {
  display: flex;
  flex-direction: column;
  width: 20%;
  height: 100%;
  button {
    height: 50%;
    border-top: 0px;
    border-left: 2px black solid;
    border-bottom: 0px;
    border-right: 0px;
  }
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

#descriptionInput {
  width: 15%;
  height: 30%;
  border: 2px black solid;
  border-radius: 2px;
}

#historicLabel {
  width: 60%;
  text-align: left;
  margin-top: 2vh;
  label {
    padding: 0.4em 0.4em 0em 0.4em;
    font-size: 20px;
  }
}

#historic {
  height: 60vh;
  width: 60%;
  border: 2px black solid;
  overflow: scroll;
  table {
    width: 100%;
    td {
      text-align: center;
      vertical-align: center;
      width: 25%;
    }
    #greenRow, #greyRow {
      height: 15vh;
    }
    #greenRow {
      background-color: rgb(92, 184, 92);
      color: white;
    }
    #greyRow {
      background-color: rgb(245, 245, 245);
    }
  }
}

#messageBox {
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
</style>
