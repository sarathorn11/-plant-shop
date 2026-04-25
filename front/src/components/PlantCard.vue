<template>
  <div class="flex w-full flex-wrap px-2">
    <div
      class="my-[15px] p-[0.5em] xs:w-[50%] sm:w-[25%] md:w-[20%] lg:w-[16.66%]"
      v-for="plant in plants"
      :key="plant.id"
      @click="handleClick(plant)"
    >
      <div
        class="relative my-[10px] flex h-full w-full flex-col items-center justify-center"
      >
        <router-link
          :to="'/plant-detail/' + plant?.id"
          @click.native="scrollToTop()"
          class="h-[90%]"
        >
          <img
            class="h-full w-full transform transition duration-300 ease-in-out hover:scale-[1.12]"
            :src="`http://localhost:3000/uploads/${plant?.imageUrl}`"
            alt=""
          />
        </router-link>
        <div
          class="absolute bottom-[25px] flex items-center justify-center rounded-2xl bg-green-500 px-3 py-1 text-[16px] text-white sm:px-[10px]"
        >
          {{
            "$" +
            plant?.ProductSizes[0].price +
            " - " +
            "$" +
            plant?.ProductSizes[plant?.ProductSizes?.length - 1].price
          }}
        </div>
        <router-link
          :to="'/plant-detail/' + plant?.id"
          @click.native="scrollToTop()"
          class="mt-4 block overflow-hidden text-ellipsis whitespace-nowrap text-center text-[16px] hover:text-[#ffc249] xs:w-[150px] sm:w-[150px] md:w-[150px] lg:w-[80%]"
        >
          {{ plant?.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    plants: {
      type: Array,
      required: true,
    },
  },
  components: {},
  data() {
    return {
      products: [],
    };
  },
  methods: {
    handleClick(plant) {
      this.$emit("plant-click", plant);
    },
    scrollToTop() {
      window.scrollTo(0, 0);
    },
  },
};
</script>

<style scoped lang="scss">
// .text-ellipsis {
//   display: block;
//   overflow: hidden;
//   text-overflow: ellipsis;
//   white-space: nowrap;
// }
</style>
