

<template>
  <div>
    <span>{{time}} s</span>
    <div>{{nearest}}</div>
  </div>
</template>

<script>
export default {
  props: ["time", "scores", "points"],
  computed: {
    nearest() {
      if (!this.scores.length) {
        return "";
      }
      const index = this.scores.findIndex(score => score.points <= this.points);
      if (index === -1) {
        let nextPositionIndex = this.scores.length - 1;
        return (nextPositionIndex + 1) + ". " + this.scores[nextPositionIndex].nick+ ' '+ this.scores[nextPositionIndex].points;
      }
      if (index === 0){
          return '';
      }
      let nextPositionIndex = index - 1;
      return (nextPositionIndex + 1) + ". " + this.scores[nextPositionIndex].nick+ ' '+ this.scores[nextPositionIndex].points;

      return '';
    }
  }
};
</script>

<style scoped>
</style>
