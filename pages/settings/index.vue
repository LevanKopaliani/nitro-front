<script setup lang="ts">
import type { FetchResponse } from "~/types/Responses";
import type { Settings } from "~/types/Settings";

const userStore = useUserStore();

// const Authtoken =  useCookie("Authtoken");

const settingsData = ref<Partial<Settings>>({});

await $fetch("/api/settings", {
  method: "GET",
  headers: {
    "Content-Type": "application/json",
    authorization: `Token ${userStore.token}`,
  },
}).then((response: any) => {
  settingsData.value = response?.data;
});

async function handleSaveAction() {
  console.log(settingsData.value);
  const settings = await $fetch("/api/settings", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      authorization: `Token ${userStore.token}`,
    },
    body: {
      ...settingsData.value,
    },
  }).then((response: any) => {
    settingsData.value = response?.data;
  });
}
</script>

<template>
  <div>
    <div>
      <PrimeFieldset legend="Main">
        <div class="flex flex-col gap-2 pb-2">
          <label for="website_title">Website Title</label>
          <PrimeInputText
            id="website_title"
            v-model="settingsData.website_title"
            autocomplete="off"
            size="small"
          />
        </div>
        <div class="flex flex-col gap-2 pb-2">
          <label for="website_description">Website Description</label>
          <PrimeInputText
            id="website_description"
            v-model="settingsData.website_description"
            autocomplete="off"
            size="small"
          />
        </div>
        <div class="flex flex-col gap-2 pb-2">
          <label for="website_slogan">Website Slogan</label>
          <PrimeInputText
            id="website_slogan"
            v-model="settingsData.website_slogan"
            autocomplete="off"
            size="small"
          />
        </div>
      </PrimeFieldset>
      <PrimeFieldset legend="Seo">
        <div class="flex flex-col gap-2 pb-2">
          <label for="website_meta_title">Website Seo Title</label>
          <PrimeInputText
            id="website_meta_title"
            v-model="settingsData.website_meta_title"
            autocomplete="off"
            size="small"
          />
        </div>
        <div class="flex flex-col gap-2 pb-2">
          <label for="website_meta_description">Website Seo Description</label>
          <PrimeInputText
            id="website_meta_description"
            v-model="settingsData.website_meta_description"
            autocomplete="off"
            size="small"
          />
        </div>
        <div class="flex flex-col gap-2 pb-2">
          <label for="website_meta_keywords">Website Seo Keywords</label>
          <PrimeInputText
            id="website_meta_keywords"
            v-model="settingsData.website_meta_keywords"
            autocomplete="off"
            size="small"
          />
        </div>
      </PrimeFieldset>
      <PrimeFieldset legend="Keys">
        <div class="flex flex-col gap-2 pb-2">
          <label for="website_recaptcha">Rekaptcha</label>
          <PrimeInputText
            id="website_recaptcha"
            v-model="settingsData.website_rekaptcha_key"
            autocomplete="off"
            size="small"
          />
        </div>
        <div class="flex flex-col gap-2 pb-2">
          <label for="website_google_maps">Google Maps</label>
          <PrimeInputText
            id="website_google_maps"
            v-model="settingsData.website_google_maps_key"
            autocomplete="off"
            size="small"
          />
        </div>
      </PrimeFieldset>
    </div>
    <div class="pt-4 flex justify-end">
      <PrimeButton
        label="Save"
        icon="pi pi-save"
        class="flex-auto flex-grow-0"
        outlined
        @click="handleSaveAction"
      ></PrimeButton>
    </div>
  </div>
</template>

<style lang=""></style>
