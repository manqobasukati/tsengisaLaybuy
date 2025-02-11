<template>
  <div class="flex flex-col h-full w-full items-center justify-center">
    <img src="../assets/tsengaLogo/logo.png" width="150" />
    <div class="flex flex-col gap-2 w-2/3">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text text-xs font-bold">Emails</span>
        </div>
        <input type="text" v-model="authDetails.email" placeholder="Your email"
          class="input input-bordered w-full max-w-xs" />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text text-xs font-bold">Password</span>
        </div>
        <input type="password" v-model="authDetails.password" placeholder="Your password"
          class="input input-bordered w-full max-w-xs" />
      </label>
      <button @click="login()" class="btn  w-full bg-teal-700 text-white">
        <span v-if="showSpinner">
          <div class="w-6 h-6 border-2 border-white
                        border-t-transparent rounded-full 
                        animate-spin"></div>
        </span>
        <span v-else>login</span>
      </button>
      <div class="text-sm text-gray-300 text-center">Do not have an account? <RouterLink class="text-blue-500"
          to="/sign-up">Sign Up</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { signInUser } from '~/requesHandlers/users';

const authDetails = ref({ email: '', password: '' });

definePageMeta({
  middleware: ['auth'],
});




const showSpinner: Ref<boolean> = ref(false)



const login = () => {
  showSpinner.value = true;
  signInUser(authDetails.value).then((user) => {
    showSpinner.value = false;

    localStorage.setItem('userDetails', JSON.stringify(user?.user || ''));
    navigateTo('/laybuys?tab=New');
  });
};
</script>
