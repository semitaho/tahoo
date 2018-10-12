<template>
<div class="input-container">
  <label>{{label}}</label>
  <slot>
  </slot>
</div>
  
</template>
<script>
export default {
  name: 'InputContainer',
  props: {
    label: String
  }
  
}
</script>
<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin: 2rem;
}
.input-container label {
  text-align: left;
}
.input-container > * {
  width: 100%;
}

</style>

