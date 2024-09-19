<template>
  <div class="flex flex-col gap-2 w-full">
    <form @submit="submitCreateLayBuyItem">
      <div class="text-xl font-bold">Create Lay Buy</div>
      <div class="flex w-full flex-col gap-1">
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Item name</span>
          </div>
          <input
            type="text"
            v-model="laybuyItem.item_name"
            placeholder="Type here"
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
            v-model="laybuyItem.store_name"
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
            v-model="laybuyItem.duration"
            placeholder="Type here"
            class="input input-bordered w-full"
          />
        </label>
        <label class="form-control w-full">
          <div class="label">
            <span class="label-text">Receipt </span>
          </div>
          <input
            type="file"
            @change="handleFileChange"
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
              v-model="laybuyItem.prize"
              placeholder="Type here"
              class="input input-bordered w-full"
            />
          </label>
          <label class="form-control w-full">
            <div class="label">
              <span class="label-text">Deposit</span>
            </div>
            <input
              type="number"
              v-model="laybuyItem.deposit_amount"
              placeholder="In Emalangeni"
              class="input input-bordered w-full"
            />
          </label>
        </div>
        <button
          class="w-full p-2 bg-teal-600 text-white font-semibold rounded-md flex items-center justify-center gap-1"
        >
          Submit<span v-if="!creationStatus" class="loading loading-spinner loading-sm"></span>
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import type { Store } from '~/models/Store.model';
import { getStores } from '@/requesHandlers/stores';
import { createLayBuyItem } from '@/requesHandlers/laybuys';
import type { LayBuyItem, LayBuyItemCreate } from '~/models/LayBuyItem.model';

const retailStores: Ref<Store[] | null> = ref(null);

const laybuyItem: Ref<LayBuyItemCreate> = ref({} as LayBuyItemCreate);

const emits = defineEmits(['createLayBuyItemSuccess']);

const creationStatus:Ref<boolean|null> = ref(true);

const submitCreateLayBuyItem = (evt: Event) => {
  evt.preventDefault();
  creationStatus.value = false;
  createLayBuyItem(laybuyItem.value).then(() => {
    creationStatus.value = true;
    emits('createLayBuyItemSuccess');
  });
  // console.log('Submit form',evt.target);
};

const handleFileChange = (evt: Event) => {
  laybuyItem.value.receipt = (evt.target as any).files[0] as any;
  // const reader = new FileReader();
  // reader.readAsDataURL( (evt.target as any).files[0]);
  // reader.onload = ()=>{
  //   laybuyItem.value.receipt =  reader.result as string;
  // }
};
const handleCreateLayBuyItem = () => {};
onMounted(() => {
  getStores().then((stores) => {
    retailStores.value = stores;
  });
});
</script>
