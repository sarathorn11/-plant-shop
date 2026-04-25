<template>
  <div
    class="carousel-container mb-[50px] w-full px-[70px] xs:px-[30px] sm:px-[50px]"
  >
    <div class="cards h-auto" :style="carouselStyle">
      <div
        class="card rounded-1 h-auto w-[200px] flex-col bg-slate-100 xs:m-[10px] lg:m-[15px]"
        v-for="item in products"
        :key="item.id"
      >
        <router-link
          :to="'/plant-detail/' + item.id"
          @click.native="scrollToTop()"
        >
          <!-- <img class="h-[70%] w-full" :src="item?.images[0]?.image" alt="" /> -->
          <img
            class="h-[70%] w-full"
            :src="`http://localhost:3000/uploads/${item?.imageUrl}`"
            alt=""
          />
          <div class="my-3 flex-col text-center text-[16px]">
            <div class="text-green-500">
              {{
                "$" +
                item?.ProductSizes[0].price +
                " - " +
                "$" +
                item?.ProductSizes[item?.ProductSizes?.length - 1].price
              }}
            </div>
            <div class="w-full text-wrap">{{ item?.name }}</div>
          </div>
        </router-link>
      </div>
    </div>
    <button
      @click="prev"
      :disabled="currentSlide === 0"
      class="prev-btn flex h-full w-[70px] items-center justify-center bg-white xs:w-[50px] sm:w-[60px]"
    >
      <img
        :src="currentSlide === 0 ? previousDisabled : previous"
        width="18"
        alt=""
      />
    </button>
    <button
      @click="next"
      :disabled="currentSlide === products?.length - 1"
      class="next-btn flex h-full w-[70px] items-center justify-center bg-white xs:w-[50px] sm:w-[60px]"
    >
      <img
        :src="currentSlide === products?.length - 1 ? nextDisabled : nextBlack"
        width="18"
        alt=""
      />
    </button>
  </div>
</template>

<script>
import previous from "@/assets/images/icons/previous-black.svg";
import previousDisabled from "@/assets/images/icons/previous-disabled.svg";
import nextBlack from "@/assets/images/icons/next-black.svg";
import nextDisabled from "@/assets/images/icons/next-disabled.svg";

export default {
  props: {
    plants: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      expandedComments: [],
      colorMap: {},
      currentSlide: 0,
      previous,
      nextBlack,
      previousDisabled,
      nextDisabled,
      products: [],
    };
  },
  computed: {
    carouselStyle() {
      return {
        transform: `translateX(-${this.currentSlide * 200}px)`,
      };
    },
  },
  methods: {
    scrollToTop() {
      window.scrollTo(0, 0);
    },

    next() {
      if (this.currentSlide < this.products?.length - 1) {
        this.currentSlide++;
      }
    },

    prev() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
  },
  async created() {
    await this.$store.dispatch("setListProducts", {});
    this.products = this.$store.state.products;
  },
};
</script>

<style scoped>
.carousel-container {
  position: relative;
  width: 100%;
  height: 278px !important;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.cards {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.card {
  display: inline-block;
  background: #f2f2f2;
  vertical-align: top;
  box-shadow:
    0 3px 1px -2px rgba(0, 0, 0, 0.2),
    0 2px 2px 0 rgba(0, 0, 0, 0.14),
    0 1px 5px 0 rgba(0, 0, 0, 0.12);
}

.reviewer-name {
  font-size: 1.1em;
  text-align: left;
  font-weight: bold;
}

.review-rating {
  color: #ffc107;
  font-size: 1.2em;
  text-align: left;
}

.review-text {
  font-size: 1em;
  color: #555;
  line-height: 1.4;
  text-align: left;
}

.prev-btn,
.next-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

.prev-btn {
  left: 0px;
}

.next-btn {
  right: 0px;
}

button:disabled {
  cursor: not-allowed;
}
</style>
