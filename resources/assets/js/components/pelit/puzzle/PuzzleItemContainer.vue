<template>
  <div class="puzzle-container" @drop.prevent="placeItem">
    <slot></slot>
  </div>
  
</template>
<script>
export default {
  name: 'PuzzleItemContainer',
  props: {
    index: Number,
    readonly: Boolean
  },
  methods: {

    placeItem(event){
      if (this.readonly){
        return false;
      }
      console.log('placing item', event.dataTransfer.dropEffect);

      const source = event.dataTransfer.getData("source");
      console.log( 'source ,index', source, this.index);
      this.$store.commit('setPlaced', true);
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
    border-radius: 10px;
    border:1px groove #999;
    background-color: #eee;
    box-sizing: border-box;
  }

</style>



