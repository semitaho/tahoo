<template>
  <div id="start-screen">
    <h1>{{title}}</h1>
    <slot />

    <div class="button-container">
      <taho-button type="secondary"  @click="$emit('resumeGame')" v-if="resume" text="Jatka" ></taho-button>
      <taho-button :disabled="disabled" text="Aloita uusi peli" @click="$emit('start')" ></taho-button>
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
    resume: Boolean,
    disabled: Boolean
  }
};
</script>

<style scoped>

  .button-container {
    display: flex;
    justify-content: center;
  }

   .button-container button {
    margin-right: 2rem;
  }
  .button-container button:last-child {
    margin-right: 0;
  }
</style>


