<template>
  <div
    class="button"
    @mousedown="press"
    @mouseup="pressRelease"
    :style="extraStyle"
    :class="{'light' : light && !pressing, pressing: pressing && !light, pressinglight: pressing && light}"
  ></div>
</template>

<script>

import { mapActions } from 'vuex';
export default {
  name: "NopeustestiButton",
  props: ["color", "light", "index", "readonly"],
  data() {
    return {
      pressing: false
    };
  },
  computed: {
    extraStyle() {
      return {
        background: this.color
      };
    }
  },
  methods: {
    press() {
      if (this.readonly){
        return;
      }
      this.pressing = true;
      this.onPress(this.index);
    },

    pressRelease() {
      this.pressing = false;
    },

    ...mapActions({
      onPress: 'nopeustesti/onPress'
    })
  }
};
</script>

<style scoped>
.button {
  height: auto;
  border-radius: 50%;
  width: 25%;
  border: 2px solid black;

  padding-top: 20%;
  position: relative;
  background: red;
  box-shadow: 0 9px #999;
  outline: none;
}

.button.pressing {
  box-shadow: 0 5px #999;
  transform: translateY(4px);
}

.button.pressinglight {
  opacity: 0.3;
  border: 2px solid black;

  transform: translateY(4px);
  box-shadow: 0 5px 40px #ff0000;
  -webkit-box-shadow: 0 5px 40px #ff0000;
}

.light {
  animation: glowing 50ms linear forwards;
}

@keyframes glowing {
  0% {
    -webkit-box-shadow: 0 9px 3px #b20000;
    opacity: 1;
  }
  100% {
    opacity: 0.3;

    -webkit-box-shadow: 0 9px 40px #ff0000;
  }
}
</style>
