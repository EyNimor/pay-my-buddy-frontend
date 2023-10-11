<template>
<div class="login" id="loginPage">
    <div id="login">
        <div id="logo">Pay My Buddy</div>
        <div id="errorMessage" v-if="!idsCorrect">! {{ message }} !</div>
        <input v-model="email" id="textBox" type="text" placeholder="Email" @keypress.enter="nextInput"/>
        <input v-model="password" id="textBox" type="password" placeholder="Password" @keypress.enter="logIn()"/>
        <div id="rememberMe">
            <input type="checkbox"/>
            <label>Remember me</label>
        </div>
        <button @click="logIn()">Login</button>
        <label>Pas de compte ? <router-link to="/register">Créer un compte</router-link></label>
    </div>
</div>
</template>

<script lang="js">
import axios from 'axios'

export default {
    name: 'LogIn',
    data () {
        return {
            email: '',
            password: '',
            idsCorrect: true,
            message: ''
        }
    },
    methods: {
        logIn() {
            this.idsCorrect = true;
            axios
                .post('http://localhost:8080/connection/goodIdentifiers', {'emailToTest': this.email, 'passwordToTest': this.password})
                .then(response => {
                    if (response.status == '200' && response.data) {
                        this.$router.push('home');
                        document.cookie="tokenEmail=" + this.email + "; SameSite=None; Secure";
                    }
                    else {
                        this.idsCorrect = false;
                        this.message = 'Identifiants incorrects';
                    }
                })
                .catch(error => {
                    console.log(error);
                    this.idsCorrect = false;
                    this.message = 'Erreur de connexion, réesayez plus tard :(';
                })
        },
        nextInput(e) {
            const next = e.currentTarget.nextElementSibling;
            if (next) {
                next.focus();
            }
        }
    }
}
</script>

<style lang="scss" scoped>
#loginPage {
    display: flex;
    width: 100%;
    height: 100vh;
    align-items: center;
    justify-content: center;
}

#login {
    display: flex;
    flex-direction: column;
    width: 20%;
    height: 50%;
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