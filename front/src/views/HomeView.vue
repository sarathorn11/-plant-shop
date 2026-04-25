<template>
  <div class="mt-5 h-full w-full">
    <div class="m-auto sm:w-[90%] lg:w-[70%]">
      <div
        class="green-house-image m-auto flex h-[500px] w-full flex-col items-center justify-center"
      >
        <div
          class="rounded-md bg-[rgba(189,189,189,0.49)] px-8 py-4 text-center"
        >
          <h1
            class="font-bold text-white xs:text-[24px] sm:text-[24px] md:text-[36px] lg:text-[40px]"
            style="font-family: Khmer OS Muol Light"
          >
            {{ "ហាងលក់រុក្ខជាតិ" }}
          </h1>
          <br />
          <h1
            class="tex font-bold text-white sm:text-[24px] md:text-[36px] lg:text-[40px]"
          >
            {{ "Plant Shop" }}
          </h1>
        </div>
      </div>
      <p class="my-[50px] text-center xs:px-5 md:px-5">
        Trees have been with us throughout our whole lives. They look beautiful,
        and we've probably all enjoyed a lovely walk through a forest. They're
        the background of a favorite memory and that welcome patch of green our
        eyes seek as we gaze out our windows—an activity we're doing a lot these
        days. But their benefits go far beyond that. Trees are like best friends
        or model employees - they give so much and ask little in return.
      </p>
      <p class="my-[50px] text-center xs:px-5 md:px-5">
        According to nature.org, there are six major benefits of tree; (1) Trees
        eat the greenhouse gases that cause climate change—for breakfast, (2)
        trees boost our mental health while raising our physical health, (3)
        trees clean the air so we can breathe more easily, (4) trees give a home
        to the wildlife we love, (5) trees cool down our life, and could even
        save it, (6) trees filter our water, making our drinking supply cleaner
        and more reliable.
      </p>
      <div class="my-[50px]">
        <h1 class="text-center text-[26px]">
          {{ "Fine Plant You Will Love" }}
        </h1>
        <div class="m-auto mt-5 w-[80px] border-b-[3px] border-green-600"></div>
      </div>
      <div class="flex w-full flex-wrap xs:px-5 md:px-5">
        <PlantTypeCard />
      </div>
    </div>
    <div class="my-[50px] flex flex-col items-center justify-center">
      <router-link
        to="/all-plants"
        @click.native="scrollToTop()"
        class="rounded border border-green-500 px-[100px] py-1 text-center text-[26px] text-green-600 hover:bg-green-100 xs:px-[50px] xs:text-[18px] sm:px-[80px] sm:text-[22px]"
      >
        {{ "SEE ALL PLANT" }}
      </router-link>
      <h1 class="mt-2 text-center text-[26px]">{{ "Top Trending Plants" }}</h1>
      <div class="m-auto mt-3 w-[80px] border-b-[3px] border-green-600"></div>
    </div>
    <TopTrendingPlant :plants="products" />
    <div class="m-auto sm:w-[90%] lg:w-[70%]">
      <div class="shop-by-care-box w-full px-5 py-[10px] xs:px-0">
        <div class="mb-5 flex flex-col items-center justify-center">
          <h1 class="text-center text-[22px]">{{ "Shop By Care" }}</h1>
          <div class="m-auto w-[80px] border-b-[3px] border-green-600"></div>
        </div>
        <div class="flex w-full flex-wrap xs:px-5 md:px-5">
          <div
            class="m-auto p-[0.8em] xs:w-[50%] sm:w-[50%] lg:w-[33%]"
            v-for="item in data?.shopByCare"
            :key="item"
          >
            <router-link
              to="/all-plants"
              @click.native="scrollToTop()"
              class="box flex h-[196px] w-full flex-col items-center justify-center hover:bg-[#90ee90] hover:text-white"
            >
              <img class="h-[102px] w-[108px]" :src="item?.image" alt="" />
              <span class="mt-3 text-center text-[18px]">
                {{ item?.name }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="shop-by-care-box w-full px-5 py-[10px] xs:px-0">
        <div class="mb-5 flex flex-col items-center justify-center">
          <h1 class="text-center text-[22px]">{{ "Shop By Size" }}</h1>
          <div class="m-auto w-[80px] border-b-[3px] border-green-600"></div>
        </div>
        <div class="flex w-full flex-wrap xs:px-5 md:px-5">
          <div
            class="m-auto p-[0.8em] xs:w-[50%] sm:w-[50%] lg:w-[33%]"
            v-for="item in data?.shopBySize"
            :key="item"
          >
            <router-link
              to="/all-plants"
              @click.native="scrollToTop()"
              class="box flex h-[196px] w-full flex-col items-center justify-center hover:bg-[#90ee90] hover:text-white"
            >
              <img class="h-[102px] w-[108px]" :src="item?.image" alt="" />
              <span class="mt-3 text-center text-[18px]">
                {{ item?.name }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
      <div class="shop-by-care-box w-full px-5 py-[10px] xs:px-0">
        <div class="mb-5 flex flex-col items-center justify-center">
          <h1 class="text-center text-[22px]">{{ "Shop By Light" }}</h1>
          <div class="m-auto w-[80px] border-b-[3px] border-green-600"></div>
        </div>
        <div class="flex w-full flex-wrap xs:px-5 md:px-5">
          <div
            class="m-auto p-[0.8em] xs:w-[50%] sm:w-[50%] lg:w-[33%]"
            v-for="item in data?.shopByLight"
            :key="item"
          >
            <router-link
              to="/all-plants"
              @click.native="scrollToTop()"
              class="box flex h-[196px] w-full flex-col items-center justify-center hover:bg-[#90ee90]"
            >
              <img class="h-[102px] w-[108px]" :src="item?.image" alt="" />
              <span class="mt-3 text-center text-[18px]">
                {{ item?.name }}
              </span>
            </router-link>
          </div>
        </div>
      </div>
    </div>
    <div class="my-[20px]">
      <h1 class="text-center text-[32px] font-bold">{{ "Latest Plant" }}</h1>
      <div class="m-auto w-[80px] border-b-[3px] border-green-600"></div>
    </div>
    <PlantCard :plants="products" />
    <div class="my-[20px]">
      <h1 class="text-center text-[32px] font-bold">{{ "Gallery" }}</h1>
    </div>
    <div class="m-auto xs:px-3 sm:w-[90%] lg:w-[70%]">
      <div class="flex w-full flex-wrap xs:px-1 md:px-1">
        <div
          class="p-[0.8em] xs:w-[50%] sm:w-[33%] lg:w-[25%]"
          style="padding: 0 !important"
          v-for="(item, index) in gallery"
          :key="index"
        >
          <div
            class="flex w-full flex-col items-center justify-center xs:h-[200px] sm:h-[250px] lg:h-[300px]"
          >
            <img
              class="gallery h-full w-full cursor-pointer"
              :src="item?.image"
              @click="openPopup(index)"
              alt=""
            />
          </div>
        </div>
      </div>
      <ImagePreview
        :isVisible="isPopupVisible"
        :imageSrc="selectedImage"
        :currentIndex="selectedIndex"
        :totalImages="gallery?.length"
        @close="closePopup"
      >
        <template v-slot:buttons>
          <button
            v-if="selectedIndex !== 0"
            @click="prevImage"
            class="prev-btn h-[30px] w-[30px] rounded-full bg-slate-600 p-2"
          >
            <img src="@/assets/images/icons/previous.svg" width="100" alt="" />
          </button>
          <button
            v-if="selectedIndex !== gallery?.length - 1"
            @click="nextImage"
            class="next-btn h-[30px] w-[30px] rounded-full bg-slate-600 p-2"
          >
            <img src="@/assets/images/icons/next.svg" width="100" alt="" />
          </button>
        </template>
      </ImagePreview>
    </div>
    <div class="m-auto sm:w-[90%] lg:w-[70%]">
      <div class="my-[50px]">
        <h1 class="text-center text-[26px]">{{ "What our customers say" }}</h1>
      </div>
      <CustomerReview :customers="data?.customers" />
    </div>
    <iframe
      class="h-[350px] w-full"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3152.691465513618!2d144.96175371525688!3d-37.811466079756175!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad65d7e62f05a5f%3A0x69f14f0e253266!2sMelbourne%20VIC%2C%20Australia!5e0!3m2!1sen!2sin!4v1589274753731!5m2!1sen!2sin"
      frameborder="0"
      allowfullscreen
    >
    </iframe>
    <Footer />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import CustomerReview from "../components/CustomerReview.vue";
import Footer from "../components/Footer.vue";
import ImagePreview from "../components/ImagePreview.vue";
import PlantCard from "../components/PlantCard.vue";
import PlantTypeCard from "../components/PlantTypeCard.vue";
import TopTrendingPlant from "../components/TopTrendingPlant.vue";
import { data } from "../data/data";
import store from "../store/index";

const selectedIndex = ref(0);
const selectedImage = ref("");
const isPopupVisible = ref(false);

const gallery = ref(data?.gallery || []);
const products = computed(() => store?.state?.products);

const openPopup = (index) => {
  selectedIndex.value = index;
  selectedImage.value = gallery.value[selectedIndex.value]?.image || "";
  isPopupVisible.value = true;
};

const closePopup = () => {
  isPopupVisible.value = false;
  selectedImage.value = "";
};

const nextImage = () => {
  selectedIndex.value = (selectedIndex.value + 1) % gallery.value.length;
  selectedImage.value = gallery.value[selectedIndex.value]?.image || "";
};

const prevImage = () => {
  selectedIndex.value =
    (selectedIndex.value - 1 + gallery.value.length) % gallery.value.length;
  selectedImage.value = gallery.value[selectedIndex.value]?.image || "";
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
};
onMounted(() => {
  store.dispatch("setListProducts", {});
});
</script>

<style scoped lang="scss">
.green-house-image {
  background-image: url("https://storage.googleapis.com/production-globat-v1-0-7/957/201957/9CVAqww6/01a7320b59974592b65e311c3cb2c44d");
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.shop-by-care-box {
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.box {
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.gallery {
  transition:
    transform 0.2s,
    margin-top 0.2s;
  transform-origin: bottom;
}

.gallery:hover {
  transform: scaleY(1.1);
  margin-top: 20px;
}
</style>
