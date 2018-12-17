<template>
  <div id="start-screen">
    <h2>{{title}}</h2>
    <slot />

    <div class="button-container">
      <taho-button type="secondary"  @click="$emit('resumeGame')" v-if="resume" text="Jatka" ></taho-button>
      <taho-button text="Aloita uusi peli" @click="$emit('start')" ></taho-button>
      </div>
    </div>
</template>
<script>
import TahoButton from './Button';
export default {
  name: "StartScreen",
  components: {
    TahoButton
  },
  props: {
    title: String,
    description: String,
    resume: Boolean
  }
};
</script>

<style scoped>

  #start-screen {
    width: 50%;
  }
 
  .button-container {
    display: flex;
    justify-content: center;
  }
  .button-container button:first-child {
    margin-right: 2rem;
  }
</style>


