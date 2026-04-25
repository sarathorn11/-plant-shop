<template>
  <div
    class="top-nav bg-write flex w-full flex-wrap items-center justify-between py-4 xs:px-3 sm:px-[20px] lg:px-[30px]"
  >
    <div class="mr-6 flex flex-shrink-0 items-center" to="/">
      <img class="mr-4 h-8 w-8 fill-current" src="@/assets/logo.svg" alt="" />
      <span class="text-xl font-semibold tracking-tight text-black">
        {{ "Plant Shop" }}
      </span>
    </div>
    <div class="block lg:hidden">
      <button
        @click="toggleMenu"
        class="flex items-center rounded border px-3 py-2"
      >
        <svg
          class="h-3 w-3 fill-current"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </button>
    </div>
    <div
      :class="{ block: isMenuOpen, hidden: !isMenuOpen, 'lg:flex': true }"
      class="w-full xs:mt-4 sm:mt-4 lg:mt-0 lg:w-auto lg:items-center"
    >
      <div class="relative lg:mb-0">
        <input
          type="text"
          id="search-navbar"
          class="m-auto rounded-2xl border-none bg-[#ececec] px-4 py-2 text-sm text-[#676767] outline-none xs:w-full sm:w-full lg:w-[500px]"
          placeholder="Search..."
        />
        <div
          class="pointer-events-none absolute right-4 top-3 flex items-center"
        >
          <svg
            class="h-4 w-4 text-[#676767] dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
      </div>
    </div>
    <div
      class="flex-end mb-0 flex w-full items-center xs:mt-4 sm:mt-4 lg:mt-0 lg:w-auto"
    >
      <router-link to="/">
        <img
          src="@/assets/images/icons/heart.svg"
          class="mx-1"
          width="25"
          height="25"
          alt=""
        />
      </router-link>
      <router-link to="/shopping-cart" class="relative">
        <img
          src="@/assets/images/icons/bag.svg"
          class="mx-1"
          width="25"
          height="25"
          alt=""
        />
        <div
          v-if="cartItems"
          class="absolute right-[-6px] top-[-8px] flex h-[20px] w-[20px] items-center justify-center rounded-full bg-red-500 p-1 text-[12px] text-white"
        >
          {{ cartItems?.length }}
        </div>
      </router-link>
      <router-link to="/login">
        <img
          src="@/assets/images/icons/user.svg"
          class="mx-1"
          width="25"
          height="25"
          alt=""
        />
      </router-link>
      <button to="/login" class="ml-1 text-[18px]">
        {{ "Log In" }}
      </button>
    </div>
  </div>
  <nav
    :class="{
      block: isMenuOpen,
      hidden: !isMenuOpen,
      'lg:flex': true,
    }"
    class="sticky top-0 z-[1] w-full flex-wrap items-center bg-[#004524] xs:px-3 sm:h-auto sm:px-[20px] lg:h-[54px] lg:px-[13px]"
  >
    <div class="h-full w-full flex-grow lg:flex lg:w-auto lg:items-center">
      <div
        class="flex h-full w-full items-center text-sm xs:mb-4 sm:mb-4 lg:mb-0 lg:flex-grow"
      >
        <router-link
          to="/"
          :class="{
            'text-white': $route.path === '/' || $route.path === '/all-plants',
          }"
          @click.native="scrollToTop()"
          class="block h-full pt-[15px] font-semibold text-gray-400 hover:text-white sm:px-0 lg:mt-0 lg:inline-block lg:px-5"
        >
          {{ "Home" }}
        </router-link>
        <div class="dropdown h-full pt-[15px]">
          <div
            :class="{
              'text-white':
                $route.path.startsWith('/plant/') &&
                plantTypes.some((item) => item.type === $route.params.type),
            }"
            class="block h-full cursor-pointer font-semibold text-gray-400 hover:text-white sm:px-0 lg:mt-0 lg:inline-block lg:px-5"
          >
            {{ "Plant Type" }}
            <div class="dropdown-content">
              <div class="flex w-[500px] flex-wrap">
                <div
                  class="w-[33%]"
                  v-for="item in plantTypes"
                  :key="item.type"
                >
                  <router-link
                    :to="{ name: 'Plant', params: { type: item.type } }"
                    :class="{
                      'bg-[#ddd] text-black': $route.params.type === item.type,
                    }"
                    @click.native="scrollToTop()"
                    class="text-black hover:bg-[#f0f0f0]"
                  >
                    {{ item.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown h-full pt-[15px]">
          <div
            :class="{
              'text-white':
                $route.path.startsWith('/plant/') &&
                plantByLifeStyle.some(
                  (item) => item.type === $route.params.type,
                ),
            }"
            class="block h-full cursor-pointer font-semibold text-gray-400 hover:text-white sm:px-0 lg:mt-0 lg:inline-block lg:px-5"
          >
            {{ "Plant By Life Style" }}
            <div class="dropdown-content">
              <div class="flex w-[500px] flex-wrap">
                <div
                  class="w-[50%]"
                  v-for="item in plantByLifeStyle"
                  :key="item.type"
                >
                  <router-link
                    :to="{ name: 'Plant', params: { type: item.type } }"
                    :class="{
                      'bg-[#ddd] text-black': $route.params.type === item.type,
                    }"
                    @click.native="scrollToTop()"
                    class="text-black hover:bg-[#f0f0f0]"
                  >
                    {{ item.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="dropdown h-full pt-[15px]">
          <div
            :class="{
              'text-white':
                $route.path.startsWith('/plant/') &&
                plantGifts.some((item) => item.type === $route.params.type),
            }"
            class="block h-full cursor-pointer font-semibold text-gray-400 hover:text-white sm:px-0 lg:mt-0 lg:inline-block lg:px-5"
          >
            {{ "Plant Gifts" }}
            <div class="dropdown-content">
              <div class="flex w-[500px] flex-wrap">
                <div
                  class="w-[50%]"
                  v-for="item in plantGifts"
                  :key="item.type"
                >
                  <router-link
                    :to="{ name: 'Plant', params: { type: item.type } }"
                    :class="{
                      'bg-[#ddd] text-black': $route.params.type === item.type,
                    }"
                    @click.native="scrollToTop()"
                    class="text-black hover:bg-[#f0f0f0]"
                  >
                    {{ item.name }}
                  </router-link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <router-link
          to="/about"
          :class="{ 'text-white': $route.path === '/about' }"
          @click.native="scrollToTop()"
          class="block h-full pt-[15px] font-semibold text-gray-400 hover:text-white sm:px-0 lg:mt-0 lg:inline-block lg:px-5"
        >
          {{ "About" }}
        </router-link>
        <router-link
          to="/contact"
          :class="{ 'text-white': $route.path === '/contact' }"
          @click.native="scrollToTop()"
          class="block h-full pt-[15px] font-semibold text-gray-400 hover:text-white sm:px-0 lg:mt-0 lg:inline-block lg:px-5"
        >
          {{ " Contact" }}
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { ref, computed } from "vue";
import { data } from "../data/data";
import store from "../store/index";

const isMenuOpen = ref(false);
const plantTypes = data?.plantType;
const plantByLifeStyle = data?.plantByLifeStyle;
const plantGifts = data?.plantGifts;
const cartItems = computed(() => store?.state?.cartItems);

const toggleMenu = () => {
  isMenuOpen.value = !isMenuOpen.value;
};

const scrollToTop = () => {
  window.scrollTo(0, 0);
};
</script>
<style scoped>
.top-nav {
  box-shadow:
    0 10px 13px -6px rgba(0, 0, 0, 0.2),
    0 20px 31px 3px rgba(0, 0, 0, 0.14),
    0 8px 38px 7px rgba(0, 0, 0, 0.12) !important;
}

.dropdown {
  overflow: hidden;
}

.dropdown-content {
  display: none;
  position: absolute;
  margin-top: 19px;
  background-color: #f9f9f9;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 1;
}

.dropdown-content a {
  float: none;
  padding: 12px 16px;
  display: block;
  text-align: left;
}

.dropdown:hover .dropdown-content {
  display: block;
}
</style>
