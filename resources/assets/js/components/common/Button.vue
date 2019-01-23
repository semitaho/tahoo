<template>
  <button :disabled="disabled" class="taho-button" :class="clazz" @click="$emit('click')">{{text}}</button>
</template>

<script>
export default {
  name: "TahoButton",
  props: {
    text: String,
    disabled: Boolean,
    type: {
      type: String,
      default: "primary"
    },
    size: {
      type: String
    }
  },

  computed: {
    clazz() {
      let current = this.type;
      current += ' '+this.size;
      return current;
    }
  }
};
</script>
<style scoped>
.taho-button {
  display: inline-block;
  color: white;
  padding: 1rem 2rem;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  border-color: none;
  border-radius: 8px;
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
}

.taho-button.small {
    padding: .5rem 1rem;
}
.taho-button:hover {
  box-shadow: 0 12px 16px 0 rgba(0, 0, 0, 0.24),
    0 17px 50px 0 rgba(0, 0, 0, 0.19);
}

.taho-button:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.primary {
  background-color: blue;
  border: blue;
}

.secondary {
  background-color: #e7e7e7;
  color: black;
}

.primary:hover {
  background-color: rgba(0, 0, 255, 0.7);
}
</style>

