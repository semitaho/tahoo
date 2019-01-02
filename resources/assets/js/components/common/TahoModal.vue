<template>
  <sweet-modal overlay-theme="dark" title="Läpäisit tason!" :blocking="true" ref="modal" icon="success">
    <slot />
    <taho-button slot="button" type="secondary" @click="$emit('onrestart')"   text="Pelaa uudelleen" />
    <taho-button slot="button" text="Jatka"  @click="$emit('oncontinue')" />
  </sweet-modal>
</template>
<script>
import { SweetModal } from 'sweet-modal-vue';
import TahoButton from './Button';

export default {
  name: 'TahoModal',
  components: {
    TahoButton,
    SweetModal
  },
  mounted(){
    this.$refs.modal.open();

  }
}
</script>
<style scoped>
.sweet-buttons button {
    margin-left: 2rem;
  }
</style>

