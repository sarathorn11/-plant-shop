<template>
  <form class="my-[50px]" @submit.prevent="onSubmit">
    <div class="flex w-full flex-wrap items-center">
      <div class="my-2 px-3 xs:w-full sm:w-full md:w-[50%] lg:w-[33%]">
        <label for="short-by">Sort By</label>
        <select
          v-model="filters.sortBy"
          class="my-2 w-full rounded-lg bg-[#ececec] p-3 text-[#676767]"
          id="short-by"
        >
          <option value="">All</option>
          <option value="a-z">Name A-Z</option>
          <option value="z-a">Name Z-A</option>
          <option value="low-high">Price Low to High</option>
          <option value="high-low">Price High to Low</option>
        </select>
      </div>
      <div class="my-2 px-3 xs:w-full sm:w-full md:w-[50%] lg:w-[33%]">
        <label for="price ">Price</label>
        <select
          v-model="filters.price"
          @change="FilterChanged"
          class="my-2 w-full rounded-lg bg-[#ececec] p-3 text-[#676767]"
          id="price"
        >
          <option value="">All</option>
          <option value="0-30">$0 - $30</option>
          <option value="30-60">$30 - $60</option>
          <option value="60-100">$60 - $100</option>
          <option value="100-up">$100 - up</option>
        </select>
      </div>
      <div class="my-2 px-3 xs:w-full sm:w-full md:w-[50%] lg:w-[33%]">
        <label for="care-level">Care Level</label>
        <select
          v-model="filters.careLevel"
          @change="FilterChanged"
          class="my-2 w-full rounded-lg bg-[#ececec] p-3 text-[#676767]"
          id="care-level"
        >
          <option value="">All</option>
          <option value="advance">Advance</option>
          <option value="moderate">Moderate</option>
          <option value="easy">Easy</option>
        </select>
      </div>
      <div class="my-2 px-3 xs:w-full sm:w-full md:w-[50%] lg:w-[33%]">
        <label for="light">Light</label>
        <select
          v-model="filters.light"
          class="my-2 w-full rounded-lg bg-[#ececec] p-3 text-[#676767]"
          id="light"
        >
          <option value="">All</option>
          <option value="low">Low Light</option>
          <option value="indirect">Indirect Light</option>
          <option value="direct">Direct Light</option>
        </select>
      </div>
      <div class="my-2 px-3 xs:w-full sm:w-full md:w-[50%] lg:w-[33%]">
        <label for="size">Size</label>
        <select
          v-model="filters.size"
          class="my-2 w-full rounded-lg bg-[#ececec] p-3 text-[#676767]"
          id="size"
        >
          <option value="">All</option>
          <option value="small">Small</option>
          <option value="medium">Medium</option>
          <option value="large">Large</option>
        </select>
      </div>
      <div
        class="flex justify-between px-3 xs:w-full sm:w-full md:w-[50%] lg:w-[33%]"
      >
        <button
          type="button"
          @click="onResetForm()"
          class="my-2 mt-8 w-[48%] rounded-lg border border-gray-500 p-2 text-gray-500 hover:bg-gray-200"
        >
          Clear
        </button>
        <!-- <button
          type="submit"
          @click="onSubmit()"
          class="my-2 mt-8 w-[48%] rounded-lg bg-green-500 p-[10px] text-white hover:bg-green-600"
        >
          Filter
        </button> -->
      </div>
    </div>
  </form>
</template>

<script>
export default {
  data() {
    return {
      filters: {
        sortBy: "",
        price: "",
        careLevel: "",
        light: "",
        size: "",
      },
    };
  },
  watch: {
    filters: {
      deep: true,
      handler() {
        this.onSubmit();
      },
    },
  },
  methods: {
    onSubmit() {
      console.log("Applying filters:", this.filters);
    },
    onResetForm() {
      this.filters = {
        sortBy: "",
        price: "",
        careLevel: "",
        light: "",
        size: "",
      };
    },
    FilterChanged(val) {
      this.$emit("change", this.filters);
    },
  },
};
</script>

<style scoped></style>
