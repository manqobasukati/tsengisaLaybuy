<template>
  <div class="flex flex-col h-full w-full items-center justify-center">
    <img src="../assets/tsengaLogo/logo.png" width="150" />
    <div class="flex flex-col gap-2 w-2/3">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text text-xs font-bold">Email</span>
        </div>
        <input
          type="text"
          v-model="authDetails.email"
          placeholder="Your email"
          class="input input-bordered w-full max-w-xs"
        />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text text-xs font-bold">Password</span>
        </div>
        <input
          type="password"
          v-model="authDetails.password"
          placeholder="Your password"
          class="input input-bordered w-full max-w-xs"
        />
      </label>
      <button
        @click="login()"
        class="btn btn-wide w-full bg-teal-700 text-white"
      >
        Submit
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signInUser } from '~/requesHandlers/users';

const authDetails = ref({ email: '', password: '' });

definePageMeta({
  middleware: ['auth'],
});

const login = () => {
  signInUser(authDetails.value).then((user) => {
    localStorage.setItem('userDetails', JSON.stringify(user?.user || ''));
    navigateTo('/laybuys?tab=New');
  });
};
</script>
