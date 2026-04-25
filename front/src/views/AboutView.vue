<template>
  <div class="h-full w-full">
    <div class="m-auto text-center sm:w-[90%] lg:w-[70%]">
      <div class="my-[20px] lg:px-[33px]">
        <h1 class="text-center text-[32px] font-bold text-black">About Us</h1>
        <div class="m-auto w-[80px] border-b-[3px] border-green-600"></div>
      </div>
      <h2>Our Vision</h2>
      <div class="my-[50px]">
        <span class="title">Green House</span> envisions everywhere in Cambodia
        is green beautifully, productively, and healthily.
      </div>
      <div class="my-[50px]">
        <img src="@/assets/images/about/banner2.jpg" alt="Descriptive Text" />
      </div>
      <div class="my-[50px]">
        <span class="title">Green House - ផ្ទះបៃតង</span> supplies various plant
        products such as fruit plants, indoor plants, flowers, vegetable seeds,
        pots, soils, fertilizers, planting and garden supplies, etc. The
        products are collected locally from farmers for resell. In addition,
        there are some products which are rare or innovatively interbreed for
        high productivity and resiliency are imported from neighboring
        countries.
      </div>
      <div class="my-[50px]">
        Though we have big ambition, we start our mission from small activities.
        One of our impactful activity is to educate people in both rural and
        urban, especially kids about plants and their benefits to their daily
        lives and environment. We also documents all related information related
        plants. A long side with education, our main and active role is to
        supply varieties of plants and planting materials. We have been working
        hard to ensure that all local plant, imported, and rare plants can be
        found in our shop. Our customers can just visit our shop and pick what
        they want.
      </div>
      <div class="my-[50px]">
        The third and forth services of our shop are providing consultation
        about plantation in small and big scale and providing garden and
        landscaping services. These two services are still in progress of
        development and will be ready to serve our customers soon.
      </div>
      <div class="w-full">
        <img
          src="@/assets/images/about/banner3.jpg"
          class="w-full"
          alt="Descriptive Text"
        />
      </div>
      <h1 class="my-[20px] text-center text-[32px] text-black">Our Mission</h1>
      <div class="my-[50px]">
        Local plant shop based in city that promotes green living and
        environment through enhancing culture of plantation and supplying all
        relevant products and services.
      </div>
      <div class="my-[50px]">
        <img src="@/assets/images/about/img1.jpg" alt="Descriptive Text" />
      </div>
      <h1 class="my-[20px] text-center text-[32px] text-black">Video</h1>
      <div class="w-full">
        <iframe
          class="h-[350px] w-full"
          src="https://www.youtube.com/embed/wZMIDnCbecc"
          frameborder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        >
        </iframe>
      </div>
      <div class="m-auto">
        <div class="my-[50px]">
          <div class="text-center text-[26px]">What our customers say</div>
        </div>
      </div>
      <CustomerReview :customers="customers" />
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
import CustomerReview from "../components/CustomerReview.vue";
import Footer from "../components/Footer.vue";
import { data } from "../data/data";

const customers = data?.customers;
</script>

<style scoped></style>
