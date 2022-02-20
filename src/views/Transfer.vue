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
      <button id="payButton" @click="pay()">Pay</button>
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
  <div id="messageBox" v-if="displayMessage">
    <div id="errorMessage">{{ message }}</div>
    <button @click="this.displayMessage=false">OK</button>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '@/components/NavBar?vue'
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
      displayMessage: false,
      message: ''
    }
  },
  methods: {
    pay() {
      if(this.amountToPay <= 0.0) {
        this.message = '! Veuillez rentrer un somme au-dessus de zéro !';
        this.displayMessage = true;
      }
      else {
        axios
          .post('http://localhost:8080/money/transaction', {'giverEmail': this.userEmail, "receiverEmail": this.selectedConnection, 'amount': this.amountToPay, 'description': this.description})
          .catch(error => {
            console.log(error);
            this.message = '! Erreur de transaction, veuillez réessayez plus tard :( !';
            this.displayMessage = true;
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
  height: 15vh;
  width: 25vw;
  background-color: white;
  top: 37.5vh;
  left: 37.5vw;
  border: 2px black solid;
  border-radius: 5px;
  padding: 5vh 0 5vh 0;
  #errorMessage {
    font-weight: bold;
    color: rgb(190, 0, 0);
  }
  button {
    width: 15%;
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
