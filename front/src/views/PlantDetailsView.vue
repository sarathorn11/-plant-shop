<template>
  <div class="h-auto w-full">
    <div class="m-auto my-[50px] h-auto xs:px-3 sm:w-[90%] lg:w-[70%]">
      <div
        class="my-[50px] flex h-auto w-full flex-wrap justify-between xs:px-3 md:px-3 lg:px-0"
      >
        <div class="xs:w-full sm:w-full md:w-full xl:w-[49%]">
          <div class="relative">
            <img
              v-if="mainImage"
              :src="mainImage"
              alt=""
              class="h-[506.5px] w-full rounded-xl"
            />
            <button
              v-if="mainImage"
              @click="prevImage"
              :disabled="currentIndex === 0"
              :class="{
                'hover:bg-[rgba(17,17,17,0.5)]': currentIndex === 0,
              }"
              class="absolute left-[10px] top-1/2 h-[30px] w-[30px] -translate-y-1/2 transform rounded-full bg-[rgba(17,17,17,0.5)] p-2 text-white shadow-md hover:bg-[rgba(17,17,17)] hover:shadow-lg"
            >
              <img src="@/assets/images/icons/previous.svg" width="20" alt="" />
            </button>
            <button
              v-if="mainImage"
              @click="nextImage"
              :disabled="currentIndex === plant.ProductImages.length - 1"
              :class="{
                'hover:bg-[rgba(17,17,17,0.5)]':
                  currentIndex === plant.ProductImages.length - 1,
              }"
              class="absolute right-[10px] top-1/2 h-[30px] w-[30px] -translate-y-1/2 transform rounded-full bg-[rgba(17,17,17,0.5)] p-2 text-white shadow-md hover:bg-[rgba(17,17,17)] hover:shadow-lg"
            >
              <img src="@/assets/images/icons/next.svg" width="20" alt="" />
            </button>
          </div>
          <div
            class="my-[30px] flex w-full flex-wrap items-center justify-center"
          >
            <div
              v-for="(image, index) in plant?.ProductImages"
              :key="image?.name"
              @click="changeMainImage(index)"
              class="cursor-pointer p-[0.5em] sm:h-[25%] sm:w-[25%] md:h-[20%] md:w-[20%] lg:h-[16.66%] lg:w-[16.66%]"
            >
              <img
                :src="`http://localhost:3000/uploads/${image?.name}`"
                :class="{ 'border-2 border-blue-500': currentIndex === index }"
                class="h-[65px] w-[65px] rounded-full bg-cover bg-center object-cover duration-300 hover:scale-110"
                alt=""
              />
            </div>
          </div>
        </div>
        <div
          class="h-fit flex-col rounded-xl bg-[#e9e9e9b5] p-6 xs:w-full sm:w-full md:w-full xl:w-[49%]"
        >
          <h1
            class="text-[32px] font-bold xs:text-[20px] sm:text-[24px] md:text-[28px]"
          >
            {{ plant?.name }}
          </h1>
          <div class="my-[18px] border-b border-[#c3c3c3]"></div>
          <div class="my-[18px] w-full">
            <div class="flex items-center">
              <div class="mr-2 text-[16px]">{{ "Code:" }}</div>
              <div class="text-[16px] text-green-500">{{ plant?.code }}</div>
            </div>
            <div class="my-[18px] flex items-center">
              <div class="mr-2 text-[16px]">{{ "Price:" }}</div>
              <div class="text-[16px] text-green-500">
                {{
                  "$" +
                  plant?.ProductSizes[0].price +
                  " - " +
                  "$" +
                  plant?.ProductSizes[plant?.ProductSizes?.length - 1].price
                }}
              </div>
            </div>
          </div>
          <div class="my-[18px] border-b border-[#c3c3c3]"></div>
          <div class="my-[18px] w-full">
            <div class="flex w-full flex-wrap items-center">
              <div class="mr-2 text-[16px]">{{ "Care:" }}</div>
              <div
                class="flex flex-wrap"
                v-for="care in [plant?.Care]"
                :key="care?.name"
              >
                <div
                  class="m-1 rounded-full bg-green-500 px-3 py-1 text-[15px] text-white"
                >
                  {{ care?.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="my-[18px] w-full">
            <div class="flex w-full flex-wrap items-center">
              <div class="mr-2 text-[16px]">{{ "Size:" }}</div>
              <div
                class="flex flex-wrap"
                v-for="size in plant?.ProductSizes"
                :key="size?.size?.name"
              >
                <div
                  class="m-1 rounded-full bg-[#2196f3] px-3 py-1 text-[15px] text-white"
                >
                  {{ size?.size?.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="my-[18px] w-full">
            <div class="flex w-full flex-wrap items-center">
              <div class="mr-2 text-[16px]">{{ "Light:" }}</div>
              <div
                class="flex flex-wrap"
                v-for="light in [plant?.Light]"
                :key="light?.name"
              >
                <div
                  class="m-1 rounded-full bg-[#009688] px-3 py-1 text-[15px] text-white"
                >
                  {{ light?.name }}
                </div>
              </div>
            </div>
          </div>
          <div class="my-[18px] border-b border-[#c3c3c3]"></div>
          <div class="my-[18px] text-[16px]">{{ "Shopping Cart" }}</div>
          <div class="flex w-full items-center justify-between">
            <button
              class="w-[49%] rounded-full bg-green-500 py-2 text-white hover:bg-green-600"
              @click="startOrder"
            >
              {{ "Start Order" }}
            </button>
            <button
              @click="addToCart(plant)"
              class="w-[49%] rounded-full bg-[#2196f3] py-2 text-white hover:bg-[#4485ba]"
            >
              {{ "Add to cart" }}
            </button>
          </div>
        </div>
      </div>
      <div class="mb-[50px] mt-[50px] xs:px-3 md:px-3 lg:px-0">
        {{ plant?.name }} {{ description }}
      </div>
      <div class="my-[50px]">
        <h1 class="xs:px-3 md:px-3 lg:px-0">{{ "Benefits:" }}</h1>
        <div class="flex-col" v-for="(item, index) in benefits" :key="item">
          <div class="my-[20px] flex-col xs:px-3 md:px-3 lg:px-0">
            <h1 class="mb-[20px]">
              {{ index + 1 + "." }} {{ item?.title + ":" }}
            </h1>
            <span class="">
              {{ item?.description }}
            </span>
          </div>
        </div>
      </div>
      <div class="my-[50px] xs:px-3 md:px-3 lg:px-0">
        <h1>{{ "Grow and Care:" }}</h1>
        <div v-for="item of growAndCare" :key="item">
          <div class="my-[10px]">
            {{ item?.title + ":" }} {{ item?.description }}
          </div>
        </div>
      </div>
    </div>
    <div class="my-[20px] flex flex-col items-center justify-center">
      <h1 class="mt-1 text-center text-[26px]">{{ "Relevant Plant" }}</h1>
      <div class="m-auto mt-5 w-[80px] border-b-[3px] border-green-600"></div>
    </div>
    <PlantCard :plants="plants" @plant-click="handlePlantClick" />
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
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import Footer from "../components/Footer.vue";
import PlantCard from "../components/PlantCard.vue";
import { useStore } from "vuex";
import { getProductById } from "@/api/products.js";

const route = useRoute();
const store = useStore();
const plants = store?.state?.products;
const plant = ref(null);
const description = ref(
  "is an industrial crop whose stems and fruits are about the size of an elongated apple, whose fruit can be processed into chocolate. As for planting, it does not select the soil like durian or other crops. For planting, easy to care for, resistant to the surrounding environment. And the growing season is up to 60 years after the first day of planting, and after three months the harvest will begin to grow the next crop.",
);
const benefits = ref([
  {
    title: "Antioxidant properties",
    description:
      "Cocoa contains flavonoids, which are natural ingredients in plant products. These flavonoids help fight the formation of 'free radicals that are harmful to health. High levels of free radicals can lead to cell damage and subsequent inflammation. Sources of free radicals include normal metabolic processes in the body as well as external stressors such as pollution, poor diet and smoking. ",
  },
  {
    title: "Anti-inflammatory properties",
    description:
      "Flavonoids can be used to help reduce the formation of free radicals. However, as we are constantly facing free radicals, it is also important to fight the pre-existing damage caused by them. Cocoa plays a role in fighting inflammation caused by free radical damage. The flavonoids in cocoa stimulate parts of the immune system that help capture and destroy cells that are harmful to health. ",
  },
]);
const growAndCare = ref([
  {
    title: "Sunlight",
    description:
      "The cacao tree needs a little sunlight and shade. They need direct sunlight at least 3 hours a day.",
  },
  {
    title: "Soil",
    description:
      "Cocoa tree grows in soils rich in organic matter and well-drained soil.",
  },
  {
    title: "Water",
    description:
      "Cocoa trees need regular watering but are not resistant to waterlogged soil. They need about 1 water a week depending on the rainfall.",
  },
  {
    title: "Temperature and humidity",
    description:
      "Cocoa trees grow in hot and humid climates and need a lot of rain. To grow cocoa trees, you need to choose a well-drained, well-lit place and a good soil pH for growing cocoa is between 6.0 and 7.0. ",
  },
]);

const currentIndex = ref(0);
const mainImage = ref(null);

const updateMainImage = () => {
  if (
    plant.value &&
    plant.value.ProductImages &&
    plant.value.ProductImages?.length > 0
  ) {
    mainImage.value = `http://localhost:3000/uploads/${plant.value.ProductImages[currentIndex.value].name}`;
  }
};

const changeMainImage = (index) => {
  currentIndex.value = index;
  updateMainImage();
};

const nextImage = () => {
  if (currentIndex.value < plant.value.ProductImages?.length - 1) {
    currentIndex.value++;
  } else {
    currentIndex.value = 0;
  }
  updateMainImage();
};

const prevImage = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--;
  } else {
    currentIndex.value = plant.value.ProductImages?.length - 1;
  }
  updateMainImage();
};

const handlePlantClick = (clickedPlant) => {
  plant.value = clickedPlant;
  currentIndex.value = 0;
  updateMainImage();
};

const addToCart = (item) => {
  console.log(item);
  store.dispatch("addItemToCart", item);
};

onMounted(async () => {
  const id = route.params.id - 1;
  const data = await getProductById(route.params.id);
  plant.value = data;
  updateMainImage();
});
</script>

<style scoped></style>
