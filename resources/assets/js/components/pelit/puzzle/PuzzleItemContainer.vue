<template>
  <div class="puzzle-container" @drop.prevent="placeItem" @dragover.prevent>
    <slot></slot>
  </div>
  
</template>
<script>
export default {
  name: 'PuzzleItemContainer',
  props: {
    index: Number
  },
  methods: {

    placeItem(event){
      const source = event.dataTransfer.getData("source");
      console.log( 'source ,index', source, this.index);
      if (+source === +this.index){
        this.$store.dispatch('cancelDrag', this.index);
        return;
      }
      this.$store.dispatch('insertItem', {source, target: this.index});

    }
  }
}

</script>
<style scoped>
  .puzzle-container {
    border: .4px solid gray;
    background-color: #eee
  }

</style>



