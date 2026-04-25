<template>
  <div class="mt-1 w-full">
    <div class="footer-content box-content w-full md:h-auto lg:h-[350px]">
      <div
        class="dark-2 flex h-full w-full flex-wrap justify-between py-8 xs:px-3 sm:px-[5%] md:w-full lg:px-[10%]"
      >
        <div class="sm:mb-[20px] md:w-[100%] lg:mb-0 lg:w-[25%]">
          <div class="h-full w-full">
            <h1 class="mb-3 text-xl font-semibold tracking-tight text-white">
              Follow Us On Facebook
            </h1>
            <div class="w-[100%] lg:h-[88%]"></div>
          </div>
        </div>
        <div class="md:w-[100%] lg:mb-0 lg:w-[50%]">
          <div class="h-full">
            <h1 class="mb-3 text-xl font-semibold tracking-tight text-white">
              Contact Us
            </h1>
            <div>
              <div class="flex items-center">
                <img
                  src="@/assets/images/icons/address.svg"
                  width="30"
                  height="30"
                  alt=""
                />
                <div class="ml-4 text-[14px] text-white">
                  # 36B, Street 371, Group 5,
                </div>
              </div>
              <div class="flex items-center">
                <div></div>
                <div class="ml-11 text-[14px] text-white">
                  Orchide Village, Sangkat Ou Baek K'am, Khan Sen Sok, Phnom
                  Penh.
                </div>
              </div>
              <div class="my-2 flex items-center">
                <img
                  src="@/assets/images/icons/phone.svg"
                  width="30"
                  height="30"
                  alt=""
                />
                <div class="ml-4 text-[14px] text-white">+855 12 345 678</div>
              </div>
              <div class="my-2 flex items-center">
                <img
                  src="@/assets/images/icons/mail.svg"
                  width="30"
                  height="30"
                  alt=""
                />
                <div class="ml-4 text-[14px] text-white">
                  info@plantshopcambodia.com
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="xs:w-[100%] md:w-[100%] lg:mb-0 lg:w-[25%]">
          <div class="h-full w-full">
            <h1
              class="mb-3 text-center text-xl font-semibold tracking-tight text-white"
            >
              Site Map
            </h1>
            <div class="flex h-full w-full flex-col">
              <router-link
                to="/"
                @click.native="scrollToTop()"
                :class="{
                  'bg-[rgba(255,255,255,0.313)]': $route.path === '/',
                }"
                class="flex h-[45px] items-center justify-center rounded text-[14px] font-semibold text-white hover:bg-[rgba(255,255,255,0.187)]"
              >
                Home
              </router-link>
              <router-link
                to="/all-plants"
                @click.native="scrollToTop()"
                :class="{
                  'bg-[rgba(255,255,255,0.313)]': $route.path === '/all-plants',
                }"
                class="flex h-[45px] items-center justify-center rounded text-[14px] font-semibold text-white hover:bg-[rgba(255,255,255,0.187)]"
              >
                All Plant
              </router-link>
              <router-link
                to="/about"
                @click.native="scrollToTop()"
                :class="{
                  'bg-[rgba(255,255,255,0.313)]': $route.path === '/about',
                }"
                class="flex h-[45px] items-center justify-center rounded text-[14px] font-semibold text-white hover:bg-[rgba(255,255,255,0.187)]"
              >
                About
              </router-link>
              <router-link
                to="/contact"
                @click.native="scrollToTop()"
                :class="{
                  'bg-[rgba(255,255,255,0.313)]': $route.path === '/contact',
                }"
                class="hover:bg-[rgba(255, 255, 255, 0.187)] flex h-[45px] items-center justify-center rounded text-[14px] font-semibold text-white hover:bg-[rgba(255,255,255,0.187)]"
              >
                Contact
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex h-[56px] items-center justify-center bg-[#808080] text-[.875rem] text-white"
    >
      2024 -
      <strong class="flex items-center">
        <div class="mx-1 text-[24px]">©</div>
        Plant Shop
      </strong>
    </div>
  </div>
</template>

<script setup>
const scrollToTop = () => {
  window.scrollTo(0, 0);
};
</script>

<style scoped lang="scss">
.footer-content {
  background-image: url("https://gradinabotanica.ubbcluj.ro/wp-content/uploads/2020/09/complexul-de-sere-scaled.jpg");
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  .dark-2 {
    background-color: rgba(0, 128, 0, 0.7);
    border-color: rgba(0, 128, 0, 0.7);
  }
}
</style>
