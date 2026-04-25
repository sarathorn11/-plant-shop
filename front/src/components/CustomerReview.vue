<template>
  <div class="carousel-container my-[50px] w-full">
    <div class="carousel cards" :style="carouselStyle">
      <div
        class="card-item rounded-3xl"
        v-for="customer in customers"
        :key="customer?.id"
      >
        <div class="w-[300px] p-5">
          <div class="flex">
            <div
              class="mr-3 flex h-[50px] w-[50px] items-center justify-center rounded-full text-[20px] font-bold text-white"
              :style="{ backgroundColor: getRandomColor(customer?.id) }"
            >
              {{ customer?.first_name[0] }}
            </div>
            <div class="name">
              <p class="reviewer-name">{{ customer?.name }}</p>
              <p class="text-left text-[12px] text-gray-300">
                {{ customer?.date }}
              </p>
            </div>
          </div>
          <div class="review-rating">
            <span v-for="star in customer?.rate" :key="star" class="star">
              &#9733;
            </span>
          </div>
          <p class="review-text text-wrap">
            <span v-if="isTextExpanded(customer?.id)">
              {{ customer?.comment }}
            </span>
            <span v-else>{{ truncatedComment(customer?.comment) }}</span>
            <template v-if="isLongComment(customer?.comment)">
              <span
                class="cursor-pointer text-blue-500"
                @click="toggleTextExpansion(customer?.id)"
              >
                {{ isTextExpanded(customer?.id) ? "See less" : "See more" }}
              </span>
            </template>
          </p>
          <div class="mt-2 w-[30%]">
            <img
              src="@/assets/images/about/google.png"
              alt="Descriptive Text"
            />
          </div>
        </div>
      </div>
    </div>
    <button
      v-if="currentSlide > 0"
      @click="prev"
      class="prev-btn h-[30px] w-[30px] rounded-full bg-slate-600 p-2"
    >
      <img src="@/assets/images/icons/previous.svg" width="100" alt="" />
    </button>
    <button
      v-if="currentSlide != customers?.length - 1"
      @click="next"
      class="next-btn h-[30px] w-[30px] rounded-full bg-slate-600 p-2"
    >
      <img src="@/assets/images/icons/next.svg" width="100" alt="" />
    </button>
  </div>
</template>

<script>
export default {
  props: {
    customers: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      expandedComments: [],
      colorMap: {},
      currentSlide: 0,
    };
  },
  computed: {
    carouselStyle() {
      return {
        transform: `translateX(-${this.currentSlide * 300}px)`,
      };
    },
  },
  methods: {
    isLongComment(comment) {
      return comment.split(" ")?.length > 100;
    },

    truncatedComment(comment) {
      const words = comment.split(" ");
      return words.slice(0, 100).join(" ") + (words?.length > 100 ? "..." : "");
    },

    toggleTextExpansion(customerId) {
      const index = this.expandedComments.indexOf(customerId);
      if (index > -1) {
        this.expandedComments.splice(index, 1);
      } else {
        this.expandedComments.push(customerId);
      }
    },

    isTextExpanded(customerId) {
      return this.expandedComments.includes(customerId);
    },

    getRandomColor(customerId) {
      if (!this.colorMap[customerId]) {
        let randomColor;
        do {
          randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        } while (this.isColorTooLight(randomColor));
        this.colorMap[customerId] = randomColor;
      }
      return this.colorMap[customerId];
    },

    isColorTooLight(color) {
      const rgb = parseInt(color.substring(1), 16);
      const r = (rgb >> 16) & 0xff;
      const g = (rgb >> 8) & 0xff;
      const b = (rgb >> 0) & 0xff;
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;
      return brightness > 200;
    },

    next() {
      if (this.currentSlide < this.customers?.length - 1) {
        this.currentSlide++;
      }
    },

    prev() {
      if (this.currentSlide > 0) {
        this.currentSlide--;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.carousel-container {
  position: relative;
  width: 100%;
  overflow: hidden;
  display: flex;
  align-items: center;
}

.carousel {
  display: flex;
  transition: transform 0.5s ease-in-out;
}

.card-item {
  height: fit-content !important;
  margin: 10px;
  display: inline-block;
  background: #f2f2f2;
  vertical-align: top;
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
  background-color: rgba(17, 17, 17, 0.5);
  fill: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.3) 0px 4px 12px 0px;
}

.prev-btn:hover,
.next-btn:hover {
  background-color: rgba(17, 17, 17);
  fill: rgb(255, 255, 255);
  box-shadow: rgba(0, 0, 0, 0.5) 0px 4px 12px 0px;
}
</style>
