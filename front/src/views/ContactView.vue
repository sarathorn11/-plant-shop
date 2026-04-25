<template>
  <div class="h-full] w-full">
    <div class="m-auto sm:w-[90%] lg:w-[70%]">
      <div class="my-[20px] lg:px-[33px]">
        <h1 class="text-center text-[32px] font-bold text-black">Contact Us</h1>
        <div class="m-auto w-[80px] border-b-[3px] border-green-600"></div>
      </div>
      <div class="my-[50px] w-full">
        It is very easy to order products from our shop. You just check our
        product page and send us the plants you want to know the price or you
        want to buy through social media as below.
      </div>
      <div class="my-[50px] flex w-full flex-wrap">
        <div class="m-auto w-[50%]">
          <div class="contact-item mb-8 flex items-center">
            <span class="icon mr-4 text-2xl">📍</span>
            <div class="details text-left">
              <h4 class="text-lg text-green-600">Visit Us</h4>
              <p>412 Street 530, Krong Phnom Penh</p>
              <p>Phnom Penh, Cambodia</p>
            </div>
          </div>
          <div class="contact-item mb-8 flex items-center">
            <span class="icon mr-4 text-2xl">📧</span>
            <div class="details text-left">
              <h4 class="text-lg text-green-600">Mail Us</h4>
              <p>info@plantshopcambodia.com</p>
            </div>
          </div>
          <div class="contact-item flex items-center">
            <span class="icon mr-4 text-2xl">📞</span>
            <div class="details text-left">
              <h4 class="text-lg text-green-600">Call Us</h4>
              <p>+85516888488</p>
              <p>+85512801820</p>
            </div>
          </div>
        </div>
        <div class="m-auto flex w-[50%] flex-col">
          <img
            src="@/assets/logo.svg"
            alt="Logo"
            class="m-auto mb-4 h-[250px]"
          />
          <p class="m-auto text-xl font-semibold text-black">Plant Shop</p>
        </div>
      </div>
      <div class="my-[50px] text-center">
        <h1 class="my-[20px] text-center text-[26px] text-green-500">
          Our shop hour:
        </h1>
        <p>=&gt; 7:00AM - 6:00PM&nbsp;(Every weekday)</p>
        <p>=&gt; 7:30AM - 6:00PM&nbsp;(Every weekend)</p>
      </div>
      <div class="flex flex-col items-center">
        <img src="@/assets/images/about/contact.jpg" alt="" />
      </div>
      <div class="m-auto my-[50px] sm:w-[90%] lg:w-[70%]">
        <div class="my-[20px]">
          <h1 class="text-center text-[26px]">
            Connect Us Through Social Media or Visit Our Shop
          </h1>
        </div>
        <div class="m-auto w-[80px] border-b-[3px] border-green-600"></div>
        <div class="m-auto my-[20px] flex w-[20%] items-center justify-between">
          <img src="@/assets/images/icons/facebook.svg" width="35" alt="" />
          <img src="@/assets/images/icons/linkedin.svg" width="30" alt="" />
          <img src="@/assets/images/icons/instagram.svg" width="30" alt="" />
          <img src="@/assets/images/icons/telegram.svg" width="30" alt="" />
        </div>
      </div>
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
import Footer from "../components/Footer.vue";
</script>

<style scoped></style>
