<template>
  <div class="flex h-full w-full flex-col">
    <Navigation />
    <div>
      <router-view class="relative"></router-view>
      <button
        v-show="showGoUpButton"
        @click.native="scrollToTop()"
        class="go-up fixed bottom-[15px] left-[15px] rounded-full md:p-[12px] lg:p-[12px]"
      >
        <img src="./assets/images/icons/go-up.svg" width="30" alt="" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import Navigation from "./components/Navigation.vue";

const showGoUpButton = ref(false);

const handleScroll = () => {
  showGoUpButton.value = window.scrollY > window.innerHeight;
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.go-up {
  background-color: #22c55e;
  fill: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px 0px;
  transition: opacity 0.3s ease-in-out;
}

.go-up:hover {
  background-color: #0eb54b;
  fill: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 12px 0px;
}
</style>
