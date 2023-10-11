<template>
    <div class="navbar">
        <NavBar/>
    </div>
    <div class="connections">
        <div id="research">
            <input v-model="emailToResearch" @keypress.enter="search()" id="researchBar" type="text" placeholder="Email To Search">
            <button id="searchButton" @click="search()">Search...</button>
        </div>
        <div id="connectionLabel">
            <label id="label">Add Connection</label>
        </div>
        <div id="connectionsList">
            <table>
                <tr id="greenRow">
                    <th>Name</th>
                    <th>Email</th>
                    <th>Add ?</th>
                </tr>
                <tr id="greyRow">
                    <td>{{ info.firstName }} {{ info.lastName }}</td>
                    <td>{{ info.email }}</td>
                    <td>
                        <button id="addButton" v-if="!alreadyFriend" @click="addConnection()">Add Connection</button>
                        <div id="errorMessage" v-if="alreadyFriend">{{ errorMessage }}</div>
                    </td>
                </tr>
            </table>
        </div>
    </div>
</template>

<script>
import NavBar from '../components/NavBar.vue'
import axios from 'axios'

export default {
    name: 'AddConnection',
    components: {
        NavBar
    },
    data() {
        return {
            userEmail: '',
            emailToResearch: '',
            friends: [''],
            info: {},
            alreadyFriend: true,
            errorMessage: ''
        }
    },
    methods: {
        addConnection: function() {
            axios
                .post('http://localhost:8080/friend', {'userEmail': this.userEmail, 'friendEmail': this.info.email})
                .then(() => {
                    this.friends.push(this.info.email);
                    this.alreadyFriend = true;
                    this.errorMessage = '! Cet utilisateur est maintenant en ami !';
                })
        },
        search: function() {
            axios
                .get('http://localhost:8080/user?email=' + this.emailToResearch)
                .then(response => (this.info = response.data))
        }
    },
    watch: {
        info: function() {
            this.friends.forEach(item => {
                if(item == this.emailToResearch) {
                    this.alreadyFriend = true;
                    this.errorMessage = '! Cet utilisateur est déjà en ami !';
                }
                else {
                    this.alreadyFriend = false;
                }
            });
            if(this.friends.length == 0) {
                this.alreadyFriend = false;
            }
            if(this.info.email == null) {
                this.alreadyFriend = true;
                this.errorMessage = '! Aucun utilisateur trouvé !'
            }
        }
    },
    mounted() {
        this.userEmail = document.cookie
        .split('; ')
        .find(row => row.startsWith('tokenEmail='))
        .split('=')[1];
        axios
            .get('http://localhost:8080/friend?email=' + this.userEmail)
            .then(response => (this.friends = response.data));
    }
}
</script>

<style lang="scss" scoped>
.connections {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 2vh;
}

#research {
    width: 60%;
    display: flex;
    align-items: center;
    flex-direction: row;
    justify-content: space-around;
}

#connectionLabel {
  width: 60%;
  text-align: left;
  label {
    padding: 0.4em 0.4em 0em 0.4em;
    font-size: 20px;
  }
}

#connectionsList {
  height: 21vh;
  width: 60%;
  border: 2px black solid;
  table {
    width: 100%;
    td {
      text-align: center;
      vertical-align: center;
      width: 33%;
    }
    #greenRow, #greyRow {
      height: 10vh;
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

#addButton {
    width: 50%;
    height: 2em;
    border: 0px;
    border-radius: 5px;
    background-color: rgb(2, 117, 216);
    font-weight: bold;
    color: white;
    font-size: 18px;
}

#searchButton {
    width: 25%;
    height: 2em;
    border: 0px;
    border-radius: 5px;
    background-color: rgb(2, 117, 216);
    font-weight: bold;
    color: white;
    font-size: 18px;
}

#addButton:hover, #searchButton:hover {
    background-color: rgb(2, 117, 255);
}

#researchBar {
    width: 25%;
}

#errorMessage {
    font-weight: bold;
    color: rgb(190, 0, 0);
}
</style>