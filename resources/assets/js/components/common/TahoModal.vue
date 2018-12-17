<template>
  <sweet-modal overlay-theme="dark" title="Läpäisit tason!" :blocking="true" ref="modal" icon="success">
    <slot />
    </sweet-modal>
</template>
<script>
import { SweetModal } from 'sweet-modal-vue';

export default {
  name: 'TahoModal',
  components: {
    SweetModal
  },
  mounted(){
    this.$refs.modal.open();

  }
}
</script>
