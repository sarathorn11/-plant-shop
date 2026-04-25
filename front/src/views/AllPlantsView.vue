<template>
  <div class="h-full w-full">
    <div class="my-[20px] lg:px-[33px]">
      <h1 class="text-center text-[32px] font-bold text-black">
        {{ "All Plant" }}
      </h1>
      <div class="m-auto w-[80px] border-b-[3px] border-green-600"></div>
    </div>
    <div class="m-auto sm:w-[90%] lg:w-[70%]">
      <Filter />
    </div>
    <PlantCard :plants="plants" />
    <iframe
      class="mt-[100px] h-[350px] w-full"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.691465513618!2d144.96175371525688!3d-37.811466079756175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d7e62f05a5f%3A0x69f14f0e253266!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1589274753731!5m2!1sen!2sin"
      frameborder="0"
      allowfullscreen
    ></iframe>
    <Footer />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue";
import Filter from "../components/Filter.vue";
import Footer from "../components/Footer.vue";
import store from "../store/index";

const plants = computed(() => store?.state?.products);

onMounted(() => {
  store.dispatch("setListProducts", {});
});
</script>

<style scoped></style>
