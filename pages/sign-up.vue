<template>
  <div class="flex flex-col h-full w-full items-center justify-center">
    <img src="../assets/tsengaLogo/logo.png" width="150" />
    <div class="flex flex-col gap-2 w-2/3">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text text-xs font-bold">Full Name</span>
        </div>
        <input type="text" placeholder="Your full name" v-model="user.fullName"
          class="input input-bordered w-full max-w-xs" />
        <ValidateInput path="fullName" :errors="errors" />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text text-xs font-bold">Phone number</span>
        </div>
        <input type="text" placeholder="Your phone number" v-model="user.phoneNumber"
          class="input input-bordered w-full max-w-xs" />
        <ValidateInput path="phoneNumber" :errors="errors" />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text text-xs font-bold">Email</span>
        </div>
        <input type="email" placeholder="Your Email" v-model="user.email"
          class="input input-bordered w-full max-w-xs" />
        <ValidateInput path="email" :errors="errors" />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text text-xs font-bold">Password</span>
        </div>
        <input type="password" placeholder="Your password" v-model="user.password"
          class="input input-bordered w-full max-w-xs" />
        <ValidateInput path="password" :errors="errors" />
      </label>

      <button @click="submitSignUp" class="btn w-full btn-wide bg-teal-700 text-white">
        Submit
      </button>
      <div class="text-sm text-gray-300 text-center">Already have an account? <RouterLink class="text-blue-500"
          to="/sign-in">Sign In</RouterLink>
      </div>
    </div>

  </div>
</template>

<script setup lang="ts">
import { ZodError } from 'zod';
import { UserSignUpZod, type UserSignUp } from '~/models/User.model';
import { createUser } from '../requesHandlers/users';

const user: Ref<UserSignUp> = ref({
  phoneNumber: '',
  email: '',
  fullName: '',
  password: '',
});

const errors: Ref<ZodError | null> = ref(null);

const submitSignUp = () => {
  errors.value = null;
  try {
    UserSignUpZod.parse(user.value);
  } catch (err) {
    const error = err as ZodError;
    errors.value = error;
    console.log('Again');
  }

  createUser(user.value).then((val) => {
    console.log(val);
  }).catch((e) => {
    console.log('Error', e)
  })
};
</script>
