<template>
  <div class="flex flex-col h-full w-full items-center justify-center">
    <img src="../assets/tsengaLogo/logo.png" width="150" />
    <div class="flex flex-col gap-2 w-2/3">
      <label class="form-control w-full ">
        <div class="label">
          <span class="label-text text-xs font-bold">Full Name</span>
        </div>
        <input
          type="text"
          placeholder="Your full name"
          class="input input-bordered w-full max-w-xs"
        />
      </label>
      <label class="form-control w-full ">
        <div class="label">
          <span class="label-text text-xs font-bold">Phone number</span>
        </div>
        <input
          type="number"
          placeholder="Your phone number"
          class="input input-bordered w-full max-w-xs"
        />
      </label>
      <label class="form-control w-full ">
        <div class="label">
          <span class="label-text text-xs font-bold">Password</span>
        </div>
        <input
          type="password"
          placeholder="Your password"
          class="input input-bordered w-full max-w-xs"
        />
      </label>
      <button class="btn w-full btn-wide bg-teal-700 text-white">Submit</button>
    </div>
  </div>
</template>

<script setup lang="ts"></script>
