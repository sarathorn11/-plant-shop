<template>
  <div class="h-full w-full">
    <div class="my-[20px] lg:px-[33px]">
      <h1 class="text-center text-[32px] font-bold text-black">
        {{ plantType }}
      </h1>
      <div class="m-auto w-[80px] border-b-[3px] border-green-600"></div>
    </div>
    <div class="m-auto sm:w-[90%] lg:w-[70%]">
      <Filter @change="onFilter" />
    </div>
    <PlantCard v-if="plants.length > 0" :plants="products" />
    <div
      class="m-auto flex items-center justify-center font-bold sm:w-[90%] lg:w-[70%]"
      v-if="products.length === 0"
    >
      <div class="text-center">
        <img
          class="w-[300px]"
          src="https://cdn.dribbble.com/users/363634/screenshots/4200296/attachments/960005/cactus-lendit.jpg"
          alt=""
        />
        {{ "Empty list" }}
      </div>
    </div>
    <iframe
      class="mt-[100px] h-[350px] w-full"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.691465513618!2d144.96175371525688!3d-37.811466079756175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d7e62f05a5f%3A0x69f14f0e253266!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1589274753731!5m2!1sen!2sin"
      frameborder="0"
      allowfullscreen
    ></iframe>
    <Footer />
  </div>
</template>

<script>
import Filter from "../components/Filter.vue";
import PlantCard from "../components/PlantCard.vue";
import Footer from "../components/Footer.vue";
import { data } from "../data/data";

export default {
  mounted() {},
  computed: {
    plantType() {
      this.type = this.$route?.params.type;
      return this.$route?.params.type;
    },
  },
  components: {
    Filter,
    PlantCard,
    Footer,
  },
  data() {
    return {
      data,
      plants: data?.plants,
      products: [],
      type: "",
      filterItems: {},
    };
  },
  methods: {
    async onFilter(val) {
      this.filterItems = val;
      this.loadData(this.$route?.params.type);
    },
    async loadData(val) {
      const filter = {
        ...(this.filterItems.careLevel && { care: this.filterItems.careLevel }),
        ...(this.filterItems.light && { light: this.filterItems.light }),
      };
      await this.$store.dispatch("setListProducts", {
        category: val,
        ...filter,
      });
      this.products = this.$store.state.products;
    },
  },

  async created() {},
  watch: {
    async type(val) {
      this.loadData(val);
    },
  },
};
</script>

<style scoped></style>
