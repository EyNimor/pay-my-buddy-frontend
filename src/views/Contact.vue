<template>
  <div class="navbar">
    <NavBar/>
  </div>
  <div class="contact">
    <div id="profileLabel">
      <label>Informations relatives à Pay My Buddy</label>
    </div>
    <div id="profileBox">
      <table>
        <tr>
          <th>Adresse :</th>
          <td>48 Rue de la Boustifrie <br/>
          35300 Fougères</td>
        </tr>
        <tr>
          <th>Téléphone :</th>
          <td>+33 7 95 68 42 31</td>
        </tr>
        <tr>
          <th>Email de contact :</th>
          <td><a href="mailto:contact@paymybuddy.fr">contact@paymybuddy.fr</a></td>
        </tr>
      </table>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import NavBar from '../components/NavBar.vue'

export default {
  name: 'Contact',
  components: {
    NavBar
  }
}
</script>

<style lang="scss" scoped>
.contact {
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
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  width: 60%;
  height: 15vh;
  background-color: rgb(245, 245, 245);
}
</style>