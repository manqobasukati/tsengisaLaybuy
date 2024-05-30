<template>
  <div class="bg-teal-600 w-full p-2 rounded-md flex flex-col">
    <div class="text-md text-white flex justify-between">
      <div class="flex flex-col">
        <div class="text-lg">{{ laybuy_item.item_name }}</div>
        <div class="text-md text-gray-300 font-thin">{{ laybuy_item.store?.StoreZod.store_name }}</div>
      </div>
      <div class="text-xl font-thin">R300 /{{ laybuy_item.prize }}</div>
    </div>
    <div class="divider"></div> 
    <div class="flex justify-between text-white">
      <div class="text-md text-gray-200 font-thin">{{laybuy_item.duration}}months</div>

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

import type {LayBuyItem} from "@/models/LayBuyItem.model"
import { supabase } from "~/superBaseClient";

const emits = defineEmits(['openLayBuyItem']);

type Props = {
  laybuy_item:LayBuyItem
}

const props = defineProps<Props>();




const onSelectOpenLayBuyItem = (action:string) => {
  emits('openLayBuyItem',action);
};
</script>
