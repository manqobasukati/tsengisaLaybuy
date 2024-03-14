<template>
  <div class="bg-teal-600 w-full p-2 rounded-md flex flex-col">
    <div class="text-md text-white flex justify-between">
      <div class="flex flex-col">
        <div class="text-lg">Khakhi chino pants</div>
        <div class="text-md text-gray-300 font-thin">Edgars Stores</div>
      </div>
      <div class="text-xl font-thin">R300 / R600.00</div>
    </div>
    <div class="divider"></div> 
    <div class="flex justify-between text-white">
      <div class="text-md text-gray-200 font-thin">3 days left</div>

      <div class="flex gap-1">
        <span @click="onSelectOpenLayBuyItem('Pay')" class="material-icons">
          wallet
        </span>
        <span @click="onSelectOpenLayBuyItem('View')" class="material-icons">
          open_in_new
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const emits = defineEmits(['openLayBuyItem']);

const onSelectOpenLayBuyItem = (action:string) => {
  emits('openLayBuyItem',action);
};
</script>
