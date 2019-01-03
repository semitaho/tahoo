<template>
  <div class="puzzle-container" @drop.prevent="placeItem" :style="style" >
    <slot></slot>
  </div>
  
</template>
<script>
export default {
  name: 'PuzzleItemContainer',
  props: {
    index: Number,
    readonly: Boolean,
    item: Object,
  },

  computed: {
    style(){
      const {row, col, rows, cols}  = this.item;
      console.log('item', this.item);
      const left =( col / cols * 100) + '%';
      const top = (row / rows * 100) + '%';

      const width = (100 / cols) + '%';
      const height = (100 / rows) + '%';

    return {
        width,
        height,
        left,
        top
      };
    }
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
    position: absolute;    
  }

</style>



