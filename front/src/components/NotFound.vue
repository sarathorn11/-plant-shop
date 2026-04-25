<template>
  <div class="sub-content">
    <div class="card">
      <div class="nav">
        <div class="dot" @click="goBack"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </div>
      <div class="message">
        <div class="text">404</div>
        <p>Page Not Found</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";

const router = useRouter();
const goBack = () => {
  router.go(-1);
};
</script>

<style scoped lang="scss">
.sub-content {
  width: 100%;
  height: 100%;
  background-color: #c2deef;

  .card {
    width: 500px;
    height: 300px;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    border-radius: 15px;
    background-color: #fff;
    box-shadow: 0 10px 10px rgba(131, 131, 131, 0.429);

    .nav {
      width: 100%;
      height: 40px;
      padding: 15px 20px;
      border-top-left-radius: 15px;
      border-top-right-radius: 15px;
      background-color: #0059fc;
      display: flex;

      .dot {
        width: 13px;
        height: 13px;
        margin-right: 10px;
        border-radius: 50%;
        cursor: pointer;
      }

      .dot:nth-child(1) {
        background-color: #f83333;
      }

      .dot:nth-child(2) {
        background-color: #fcbd00;
      }

      .dot:nth-child(3) {
        background-color: #27d60c;
      }
    }

    .message {
      display: grid;
      place-items: center;

      .text {
        height: 190px;
        font-size: 150px;
      }
    }
  }
}
</style>
