<template>
<div class="register" id="registerPage">
    <div id="register">
        <div id="logo">Pay My Buddy</div>
        <div id="errorMessage" v-if="!idsCorrect">! {{ message }} !</div>
        <input v-model="firstName" id="textBox" type="text" placeholder="First Name"/>
        <input v-model="lastName" id="textBox" type="text" placeholder="Last Name"/>
        <input v-model="email" id="textBox" type="text" placeholder="Email"/>
        <input v-model="password" id="textBox" type="password" placeholder="Password"/>
        <input v-model="passwordConfirmation" id="textBox" type="password" placeholder="Confirm Password"/>
        <button @click="registerNewAccount()">Register</button>
        <label>Déjà un compte ? <router-link to="/login">Se connecter</router-link></label>
    </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
    name: 'Register',
    data () {
        return {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            passwordConfirmation: '',
            idsCorrect: true,
            message: ''
        }
    },
    methods: {
        registerNewAccount() {
            this.idsCorrect = true;
            if(this.password == this.passwordConfirmation) {
                axios
                .post('http://localhost:8080/connection/createAccount', {'firstName': this.firstName, 'lastName': this.lastName, 'email': this.email, 'password': this.password})
                .then(response => {
                    if (response.status == '201') {
                        this.$router.push('home');
                        document.cookie="tokenEmail=" + this.email + "; SameSite=None; Secure";
                    }
                    else {
                        this.idsCorrect = false;
                        this.message = 'Au moins une des informations est vide';
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.idsCorrect = false;
                    this.message = 'Erreur de création de compte, réesayez plus tard :('
                })
            }
            else {
                this.idsCorrect = false;
                this.message = 'Les Mots de passe ne correspondent pas';
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#registerPage {
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
}

#register {
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 65%;
    margin: 20% 0% 20% 0%;
    padding: 1em;
    border: 2px lightgrey solid;
    border-radius: 5px;
    background-color: white;
    justify-content: space-between;
    align-items: center;
}

#logo {
  width: 35%;
  height: 20px;
  text-align: center;
  font-weight: bold;
  background-color: rgb(0, 175, 0);
  color: white;
  border-radius: 5px;
  padding: 10px;
  margin: 10px;
}

#errorMessage {
    font-weight: bold;
    color: rgb(190, 0, 0);
}

#textBox {
    padding: 1em;
    border-radius: 5px;
    width: 90%;
}

label {
    margin-left: 10px;
}

button {
    width: 30%;
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
</style>