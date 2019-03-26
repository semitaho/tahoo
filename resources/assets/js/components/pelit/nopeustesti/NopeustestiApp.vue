<template>
  <div class="game-container">
    <start-screen
      title="Nopeustesti"
      v-if="user.id && STATE.start === gamestate"
      @start="startGame"
    >
      <p>
        Ole nopea
        <b v-if="user.nick">{{user.nick}}</b>! Paina nappeja samassa tahdissa, mitä valot syttyvät.
        Mitä kauemmin pystyt painelemaan nappeja oikeassa järjestyksessä, sen nopeammaksi peli muuttuu!
      </p>
      <p v-if="!user.nick">
        <input
          type="text"
          :value="user.nickInput"
          placeholder="Anna nimimerkkisi"
          @input="updateNick"
        >
      </p>
    </start-screen>
    <nopeustesti-board  v-else-if="gamestate === STATE.playing"/>
    <div class="level-finished" v-else-if="gamestate === STATE.finished">
      <taho-modal title="Pelisi päättyi" v-if="showModal" :hasNext="false" @onrestart="startGame">
        <p>Sait tuloksen:
          <b>{{points}}</b>
        </p>
        <p>
          Aikaa kului:
          <b>{{time}} s.</b>
        </p>
         <p v-if="position">
          Pääsit sijalle
          <b>{{position}}.</b>
        </p>
      </taho-modal>
      <nopeustesti-board :readonly="true" :blink-all="true"/>
    </div>
  </div>
</template>


<script>
import { StartScreen, TahoModal } from "./../../common";
import NopeustestiBoard from "./NopeustestiBoard";
import { mapGetters, mapActions } from "vuex";
import { STATE } from "./../../../constaints";

export default {
  name: "NopeustestiApp",
  components: {
    TahoModal,
    NopeustestiBoard,
    StartScreen
  },

  data() {
    return {
      STATE
    };
  },

  computed: mapGetters({
    user: "user/user",
    points: "nopeustesti/points",
    showModal: "nopeustesti/showModal",
    gamestate: "common/gamestate",
    time: "common/time",
    position: "nopeustesti/position"
  }),

  methods: mapActions({
    updateNick: "user/updateNick",
    startGame: "nopeustesti/startGame"
  }),

  created() {
    this.$store.dispatch("user/retrieveUser");
  }
};
</script>
<style scoped>
.level-finished {
  width: 100%;
}
</style>
