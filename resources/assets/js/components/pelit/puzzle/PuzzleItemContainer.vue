<template>
  <div class="puzzle-container" :id="'puzzle-container-'+this.index" :style="style" >
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



