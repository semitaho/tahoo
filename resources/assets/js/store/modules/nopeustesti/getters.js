export default {
  speed: state => state.speed,
  buttons: state => state.buttons,
  lights: state => state.lights,
  blinkingTimer: state => state.blinkingTimer,
  currentLight: state => state.currentLight,
  presses: state => state.presses,
  points: state => state.presses.length,
  showModal: state => state.showModal,
  scores: state => state.scores,
  position: state => state.position
};