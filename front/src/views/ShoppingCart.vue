<template>
  <div class="m-auto xs:px-5 sm:w-[90%] md:px-5 lg:w-[70%] lg:px-0">
    <div class="my-[50px] flex w-full flex-col justify-between lg:flex-row">
      <div class="w-full lg:w-[68%]">
        <h1 class="text-[22px] text-black">
          {{ "Shopping cart" }}
        </h1>
        <div
          class="my-[15px] w-full"
          v-for="(item, index) in cartItems"
          :key="index"
        >
          <div class="flex items-center justify-between">
            <div class="flex">
              <img
                class="w-[100px]"
                :src="`http://localhost:3000/uploads/${item?.imageUrl}`"
                alt="Product Image"
              />
              <div class="mx-3 flex flex-col">
                <span class="text-[16px] font-bold">
                  {{ item.name }}
                </span>
                <span>{{
                  "$" +
                  item?.ProductSizes[0].price +
                  " - " +
                  "$" +
                  item?.ProductSizes[item?.ProductSizes?.length - 1].price
                }}</span>
              </div>
            </div>
            <div class="flex items-center">
              <button
                class="mx-1 rounded-md border border-gray-200 bg-gray-200 p-2 text-black hover:border-gray-300 hover:bg-gray-300"
                @click="decreaseQuantity(index)"
              >
                <img
                  src="@/assets/images/icons/minus.svg"
                  width="15"
                  alt="Decrease"
                />
              </button>
              <span class="mx-1 w-auto text-center">1</span>
              <button
                class="mx-1 rounded-md border border-black p-2 text-black hover:border-black"
                @click="increaseQuantity(index)"
              >
                <img
                  src="@/assets/images/icons/plus.svg"
                  width="15"
                  alt="Increase"
                />
              </button>
              <button
                class="mx-1 rounded-md border border-red-500 bg-red-500 p-2 text-white hover:bg-red-600"
                @click="removeItem(index)"
              >
                <img
                  src="@/assets/images/icons/multiply.svg"
                  width="15"
                  alt="Remove"
                />
              </button>
            </div>
          </div>
        </div>
        <div v-if="!cartItems?.length">{{ "Empty Cart" }}</div>
      </div>
      <div class="mt-10 w-full lg:mt-0 lg:w-[28%]">
        <h1 class="text-[22px] text-black">
          {{ "Order summary" }}
        </h1>
        <div class="my-[15px] flex w-full items-center justify-between">
          <div>{{ "Subtotal" }}</div>
          <div>{{ "$" + subtotal }}</div>
        </div>
        <div class="my-[15px] flex w-full items-center justify-between">
          <div>{{ "Shipping" }}</div>
          <div>--</div>
        </div>
        <div class="my-[15px] flex w-full items-center justify-between">
          <div>{{ "Tax (10%)" }}</div>
          <div>{{ "$" + tax }}</div>
        </div>
        <div class="w-full border border-gray-200"></div>
        <div class="my-[15px] flex w-full items-center justify-between">
          <div class="font-bold">{{ "Total" }}</div>
          <div>{{ "$" + total }}</div>
        </div>
        <div class="my-[15px] flex w-full items-center justify-between">
          <router-link
            to="/login"
            class="w-[49%] rounded-md bg-green-500 py-2 text-center text-white hover:bg-green-600"
          >
            Login
          </router-link>
          <button
            class="w-[49%] rounded-md bg-green-500 py-2 text-white hover:bg-green-600"
          >
            Buy As Guest
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const cartItems = computed(() => store.getters["cartItems"]);
const subtotal = 10;
const subtotal = computed(() => store.getters.subtotal);
const tax = computed(() => store.getters.tax);
const total = computed(() => store.getters.total);

const increaseQuantity = (index) => {
  store.dispatch("increaseQuantity", index);
};

const decreaseQuantity = (index) => {
  store.dispatch("decreaseQuantity", index);
};

const removeItem = (index) => {
  store.dispatch("removeItemFromCart", index);
};
</script>

<style scoped></style>
