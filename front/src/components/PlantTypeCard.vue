<template>
  <div
    class="p-[0.8em] xs:w-[50%] sm:w-[33%] md:w-[33%] lg:w-[25%]"
    v-for="plant in plantType"
    :key="plant"
  >
    <div class="my-[10px] flex w-full flex-col items-center justify-center">
      <router-link
        :to="{ name: 'Plant', params: { type: plant.type } }"
        @click.native="scrollToTop()"
      >
        <img
          class="sm:h-[150px] sm:w-[150px] lg:h-[180px] lg:w-[180px]"
          :src="plant.image"
          alt=""
        />
      </router-link>
      <router-link
        :to="{ name: 'Plant', params: { type: plant.type } }"
        @click.native="scrollToTop()"
        class="mt-4 block overflow-hidden text-ellipsis whitespace-nowrap text-center text-[16px] hover:text-[#ffc249] xs:w-[150px] sm:w-[150px] md:w-[150px] lg:w-[80%]"
      >
        {{ plant?.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { data } from "../data/data";

const plantType = ref(data?.plantType || []);

const scrollToTop = () => {
  window.scrollTo(0, 0);
};
</script>

<style scoped></style>
