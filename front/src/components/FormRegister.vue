<template>
  <section class="fixed left-0 top-0 z-[100] h-full w-full bg-white">
    <div class="flex h-full items-center">
      <div class="h-100 w-[50%]">
        <img src="../assets/plant.jpg" alt="logo" class="width-[80%] m-auto" />
      </div>
      <div class="m-auto w-[50%] rounded">
        <div class="m-auto w-[70%] rounded bg-[#F5F5F5] p-5">
          <img src="../assets/user.png" alt="logo" class="m-auto w-[50px]" />

          <div class="relative mt-4">
            <div class="relative mt-4">
              <label class="mb-1 block text-lg text-gray-700" for="password">
                Email <span class="ml-2 text-red-600">*</span>
              </label>
              <input
                v-model="email"
                @change="is_not_fill_email = false"
                :class="{ 'border-red-400 bg-red-100': is_not_fill_email }"
                class="focus:outline-primary focus:shadow-outline w-full appearance-none rounded border border-gray-400 px-3 py-2 leading-tight text-gray-700 focus:outline-[#22bbea]"
                id="email"
                type="email"
                placeholder="Email..."
              />
            </div>

            <div class="relative mt-4">
              <label class="mb-1 block text-lg text-gray-700" for="password">
                Password <span class="ml-2 text-red-600">*</span>
              </label>
              <input
                v-model="password"
                :type="showpassword"
                @change="is_not_fill_password = false"
                @input="isInValid = false"
                :class="{ 'border-red-400 bg-red-100': is_not_fill_password }"
                class="focus:outline-primary focus:shadow-outline w-full appearance-none rounded border border-gray-400 px-3 py-2 leading-tight text-gray-700 focus:outline-[#22bbea]"
                id="password"
                placeholder="Password..."
              />
              <svg
                v-if="isInValid"
                xmlns="http://www.w3.org/2000/svg"
                class="absolute right-3 top-[40px] h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else-if="showpassword == 'password'"
                @click="showPW"
                xmlns="http://www.w3.org/2000/svg"
                class="absolute right-3 top-[40px] h-5 w-5 text-gray-400 hover:cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                @click="showPW"
                xmlns="http://www.w3.org/2000/svg"
                class="absolute right-3 top-[40px] h-5 w-5 text-gray-400 hover:cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clip-rule="evenodd"
                />
                <path
                  d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                />
              </svg>
              <p class="text-[14px] text-red-500"></p>
            </div>
            <div class="relative mt-4">
              <label
                class="mb-1 block text-nowrap text-lg text-gray-700"
                for="password"
              >
                Confirm Password <span class="ml-2 text-red-600">*</span>
              </label>
              <input
                :type="showpassword"
                @change="is_not_fill_password = false"
                @input="isInValid = false"
                :class="{ 'border-red-400 bg-red-100': is_not_fill_password }"
                class="focus:outline-primary focus:shadow-outline w-full appearance-none rounded border border-gray-400 px-3 py-2 leading-tight text-gray-700 focus:outline-[#22bbea]"
                id="password"
                placeholder="Password..."
              />
              <svg
                v-if="isInValid"
                xmlns="http://www.w3.org/2000/svg"
                class="absolute right-3 top-[40px] h-5 w-5 text-red-500"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else-if="showpassword == 'password'"
                @click="showPW"
                xmlns="http://www.w3.org/2000/svg"
                class="absolute right-3 top-[40px] h-5 w-5 text-gray-400 hover:cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path
                  fill-rule="evenodd"
                  d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                  clip-rule="evenodd"
                />
              </svg>
              <svg
                v-else
                @click="showPW"
                xmlns="http://www.w3.org/2000/svg"
                class="absolute right-3 top-[40px] h-5 w-5 text-gray-400 hover:cursor-pointer"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fill-rule="evenodd"
                  d="M3.707 2.293a1 1 0 00-1.414 1.414l14 14a1 1 0 001.414-1.414l-1.473-1.473A10.014 10.014 0 0019.542 10C18.268 5.943 14.478 3 10 3a9.958 9.958 0 00-4.512 1.074l-1.78-1.781zm4.261 4.26l1.514 1.515a2.003 2.003 0 012.45 2.45l1.514 1.514a4 4 0 00-5.478-5.478z"
                  clip-rule="evenodd"
                />
                <path
                  d="M12.454 16.697L9.75 13.992a4 4 0 01-3.742-3.741L2.335 6.578A9.98 9.98 0 00.458 10c1.274 4.057 5.065 7 9.542 7 .847 0 1.669-.105 2.454-.303z"
                />
              </svg>
              <p class="text-[14px] text-red-500"></p>
            </div>
          </div>
          <button
            value="Login"
            class="focus:outline-primary focus:shadow-outline mt-4 w-full rounded bg-[#4CC552] py-2 text-[1.2rem] text-white"
            @click="userLogin"
          >
            Sign Up
          </button>
          <p class="mt-6 text-center text-gray-800">
            Already have account?
            <router-link
              to="/login"
              class="text-blue-600 transition duration-200 ease-in-out hover:text-blue-700 focus:text-blue-700"
              >Login</router-link
            >
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      email: "",
      password: "",
      showpassword: "password",
      isLoggingIn: false,
      isInValid: false,
      loginError: "",
      is_not_fill_email: false,
      is_not_fill_password: false,
    };
  },
  methods: {
    userLogin() {
      this.$router.push("/");
    },
    showPW() {
      if (this.showpassword == "password") {
        this.showpassword = "text";
      } else {
        this.showpassword = "password";
      }
    },
    checkFormValidation() {
      this.is_not_fill_email = false;
      if (this.email.trim() == "") {
        this.is_not_fill_email = true;
      }
      this.is_not_fill_password = false;
      if (this.password.trim() == "") {
        this.is_not_fill_password = true;
      }

      let sms = true;
      if (this.is_not_fill_email || this.is_not_fill_password) {
        sms = false;
      }
      return sms;
    },
  },
};
</script>
<style scoped></style>
