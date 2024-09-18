<template>
  <div class="bg-gradient-to-r from-cyan-500 to-blue-500 w-full p-2 rounded-md flex flex-col">
    <div class="text-md text-white flex justify-between">
      <div class="flex flex-col">
        <div class="text-lg">{{ laybuy_item.item_name }}</div>
        <div v-if="
          laybuy_item.store &&
          laybuy_item.store.StoreZod &&
          laybuy_item.store.StoreZod.store_name
        " class="text-md text-white font-bold">
          {{ laybuy_item.store.StoreZod.store_name }}
        </div>
      </div>
      <div class="text-xl font-bold">
        {{ total_transactions }} /{{ laybuy_item.prize }}
      </div>
    </div>
    <div class="divider"></div>
    <div class="flex justify-between text-white">
      <div :class="{ ...evaluateColor(evaluateDueDate(laybuy_item).days) }"
        class="text-xs  text-white p-1 font-bold rounded-md">
        {{ Math.abs(evaluateDueDate(laybuy_item).days) }} {{ evaluateText(evaluateDueDate(laybuy_item).days) }}
      </div>

      <div class="flex gap-1">
        <span @click="onSelectOpenLayBuyItem('ViewReceipt')" class="material-icons">
          description
        </span>
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
import type { LayBuyItem } from '@/models/LayBuyItem.model';
import { supabase } from '~/superBaseClient';

import { evaluateDueDate } from '~/helpers/laybuys';

const emits = defineEmits(['openLayBuyItem']);

type Props = {
  laybuy_item: LayBuyItem;
};

const props = defineProps<Props>();

const total_transactions = computed(() => {
  return props.laybuy_item.transactions?.reduce((a: any, b: any) => {
    console.log(a, b);
    if (b?.amount) {
      return a + b?.amount;
    }
  }, props.laybuy_item.deposit_amount)  ;
});

const evaluateText = (days: number) => {
  if (days < 0) {
    return 'Days Passed'
  }

  return 'Days Left'
}

const evaluateColor = (days: number) => {
  if (days < 0) {
    return { 'bg-red-500': true }
  } else if (days > 0 && days < 20) {
    return { 'bg-red-300': true }
  } else if (days > 19 && days < 30) {
    return { 'bg-red-200': true }
  } else if (days > 30) {
    return { 'bg-green-400': true }
  }
}

const onSelectOpenLayBuyItem = (action: string) => {
  emits('openLayBuyItem', { action: action, item: props.laybuy_item });
};
</script>
