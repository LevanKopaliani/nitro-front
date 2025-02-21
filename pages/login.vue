<script setup lang="ts">
import { ref } from "vue";

const userStore = useUserStore();

definePageMeta({
  layout: "auth",
});

const checked1 = ref(true);
const email = ref();
const password = ref();

async function logIn() {
  try {
    const response = await $fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: {
        email: email.value,
        password: password.value,
      },
    });

    if (response.statusCode === 200) {
      localStorage.setItem("token", response.token);
      userStore.user = response?.user;
      userStore.token = response?.token;
      alert("Login is successful");
      await navigateTo("/");
    } else {
      console.log("Login failed:", response.message);
      alert("Username or password is invalid");
    }
  } catch (error) {
    console.error("Error during login:", error);
  }
}

function handleLogin() {
  logIn();
}
</script>
<template>
  <div class="bg-surface-50 dark:bg-surface-950 px-6 py-20 md:px-12 lg:px-20">
    <div
      class="bg-surface-0 dark:bg-surface-900 p-6 shadow rounded-border w-full lg:w-6/12 mx-auto"
    >
      <div class="text-center mb-8">
        <div
          class="text-surface-900 dark:text-surface-0 text-3xl font-medium mb-4"
        >
          Welcome Back
        </div>
        <span
          class="text-surface-600 dark:text-surface-200 font-medium leading-normal"
          >Don't have an account?</span
        >
        <a class="font-medium no-underline ml-2 text-primary cursor-pointer"
          >Create today!</a
        >
      </div>

      <div>
        <label
          for="email1"
          class="text-surface-900 dark:text-surface-0 font-medium mb-2 block"
          >Email</label
        >
        <PrimeInputText
          v-model="email"
          id="email1"
          type="text"
          placeholder="Email address"
          class="w-full mb-4"
        />

        <label
          for="password1"
          class="text-surface-900 dark:text-surface-0 font-medium mb-2 block"
          >Password</label
        >
        <PrimeInputText
          v-model="password"
          id="password1"
          type="password"
          placehoder="Password"
          class="w-full mb-4"
        />

        <div class="flex items-center justify-between mb-12">
          <div class="flex items-center">
            <PrimeCheckbox
              id="rememberme1"
              v-model="checked1"
              :binary="true"
              class="mr-2"
            />
            <label for="rememberme1">Remember me</label>
          </div>
          <a
            class="font-medium no-underline ml-2 text-primary text-right cursor-pointer"
            >Forgot password?</a
          >
        </div>

        <PrimeButton
          label="Sign In"
          icon="pi pi-user !text-xl !leading-none"
          class="w-full"
          @click="handleLogin"
        />
      </div>
    </div>
  </div>
</template>
