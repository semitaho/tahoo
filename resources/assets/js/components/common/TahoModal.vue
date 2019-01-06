<template>
  <sweet-modal :enable-mobile-fullscreen="true"  overlay-theme="dark" title="Läpäisit tason!" :blocking="true" ref="modal" icon="success">
    <slot />
    <taho-button slot="button" type="secondary" @click="$emit('onrestart')"   text="Pelaa uudelleen" />
    <taho-button v-if="hasNext" slot="button" text="Jatka"  @click="$emit('oncontinue')" />
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
  props: {
    hasNext: {
      type: Boolean
    }
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

