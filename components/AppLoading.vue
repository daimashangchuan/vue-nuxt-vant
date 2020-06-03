<template>
  <div class="default-loading" v-if="loadingShow" click.stop @touchmove.prevent @mousewheel.prevent>
    <div class="spinner"></div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: 'AppLoading',
  computed: {
    ...mapState("AppStore", ["loadingShow"])
  }
};
</script>

<style lang="less" scoped>
.default-loading {
  position: fixed;
  z-index: 500;
  height: 100vh;
  width: 100%;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  .spinner {
    width: 60px;
    height: 60px;
    background-color: @back198;
    border-radius: 100%;
    animation: sk-scaleout 1s infinite ease-in-out;
  }
}
@-webkit-keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    opacity: 0;
  }
}

@keyframes sk-scaleout {
  0% {
    -webkit-transform: scale(0);
    transform: scale(0);
  }
  100% {
    -webkit-transform: scale(1);
    transform: scale(1);
    opacity: 0;
  }
}
</style>
