<template>
  <div class="flex flex-col gap-2 w-full">
    <div class="text-xl font-bold">View Lay Buy</div>
    <div class="flex w-full flex-col gap-1">
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Item name </span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          v-model="localLaybuyItem.item_name"
          class="input input-bordered w-full"
        />
      </label>
      <label for="store" class="form-control w-full">
        <div class="label">
          <span class="label-text">Store</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          class="input input-bordered w-full"
          list="stores"
          name="store"
          v-model="localLaybuyItem.store_id"
        />
        <datalist id="stores">
          <option
            v-for="(store, key) in retailStores"
            :key="key"
            :value="store.store_name"
          >
            {{ store.store_name }}
          </option>
        </datalist>
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Months (Duration)</span>
        </div>
        <input
          type="text"
          placeholder="Type here"
          v-model="localLaybuyItem.duration"
          class="input input-bordered w-full"
        />
      </label>
      <label class="form-control w-full">
        <div class="label">
          <span class="label-text">Receipt </span>
        </div>
        <input
          type="file"
          class="file-input file-input-bordered w-full file-input-teal"
        />
      </label>
      <div class="flex gap-2">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Prize</span>
          </div>
          <input
            type="number"
            placeholder="Type here"
            v-model="localLaybuyItem.prize"
            class="input input-bordered w-full"
          />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Deposit</span>
          </div>
          <input
            type="number"
            placeholder="In Emalangeni"
            v-model="localLaybuyItem.deposit_amount"
            class="input input-bordered w-full"
          />
        </label>
      </div>
      <div class="flex gap-2">
        <button
          @click="actionLayBuyItem('deleteLayBuyItem')"
          class="w-full p-2 bg-red-600 text-white font-semibold rounded-md"
        >
          Delete
        </button>
        <button
        @click="actionLayBuyItem('editLayBuyItem')"
          class="w-full p-2 bg-teal-600 text-white font-semibold rounded-md"
        >
          Edit
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LayBuyItem } from '~/models/LayBuyItem.model';
import type { Store } from '~/models/Store.model';
import { getStores } from '~/requesHandlers/stores';

type Props = {
  laybuyItem: LayBuyItem | null;
};

const props = defineProps<Props>();

const emits = defineEmits(['deleteLayBuyItem', 'editLayBuyItem']);

const retailStores: Ref<Store[] | null> = ref(null);
const localLaybuyItem: Ref<LayBuyItem> = ref(
  JSON.parse(JSON.stringify(props.laybuyItem || ({} as LayBuyItem)))
);

onMounted(() => {
  getStores().then((stores) => {
    retailStores.value = stores;
  });
});

const actionLayBuyItem = (action:"deleteLayBuyItem" | "editLayBuyItem")=>{
   emits(action)
}



watch(
  () => props.laybuyItem,
  (n, o) => {
    localLaybuyItem.value = JSON.parse(
      JSON.stringify(props.laybuyItem || ({} as LayBuyItem))
    );
  }
);
</script>
