<template>
  <div v-if="isVisible" class="popup-overlay" @click="closePopup">
    <div
      class="popup-content flex items-center justify-center overflow-hidden xs:h-[50%] xs:w-full sm:h-[50%] md:h-[50%] lg:h-[68.5%] lg:w-[68.5%]"
      @click.stop
    >
      <button
        class="close-btn h-[46px] w-[46px] rounded-full p-2"
        @click="$emit('close')"
      >
        <img src="@/assets/images/icons/close.svg" alt="" />
      </button>
      <img
        class="h-full w-full object-cover"
        :src="imageSrc"
        alt="Popup Image"
      />
      <slot name="buttons"></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    isVisible: {
      type: Boolean,
      required: true,
    },
    imageSrc: {
      type: String,
      required: true,
    },
    currentIndex: {
      type: Number,
      required: true,
    },
    totalImages: {
      type: Number,
      required: true,
    },
  },
  methods: {
    closePopup() {
      this.$emit("close");
    },
  },
};
</script>

<style>
.popup-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #030303d0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 5px;
}

.prev-btn {
  position: absolute;
  left: 15px;
  bottom: 50%;
  transform: translateY(50%);
}

.next-btn {
  position: absolute;
  right: 15px;
  bottom: 50%;
  transform: translateY(50%);
}
</style>
