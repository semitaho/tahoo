<template>
<div class="sui-container">
  <h2>Ota yhteyttä</h2>
  <p>Kiinnostaisiko kumppanuus tai yhteistyö 
    kanssani.  Ota rohkeasti yhteyttä, niin 
    neuvotellaan asiasta!</p>
    <div class="contact_form">
      <form method="post" novalidate="true">
        <input-container :label="'Yritys'">
          <input type="text" placeholder="Yrityksen nimi" maxlength="500" >
        </input-container>
        <input-container :label="'Aihe'">
          <select v-model="aihe">
            <option value="">Valitse aihe</option>
            <option value="toimeksianto">Projektitoimeksianto</option>
            <option value="kumppanuus">Kumppanuus</option>
            <option value="tyonhaku">Työnhaku</option>
          </select>
        </input-container>
      </form>
    </div>


</div>
</template>
<script>
import InputContainer from './InputContainer';
export default {


  name: 'ContactForm',
  components: {
    InputContainer
  },

  data(){
    return {
      aihe: null

    };
  },

  created() {
    console.log('kokkola');
  }

  
}
</script>
<style scoped>
  input, select {
    height: 2em;
  }

</style>
