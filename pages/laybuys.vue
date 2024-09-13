<template>
  <div class="flex flex-col gap-2">
    <div class="flex bg-white w-full flex-col gap-2 sticky top-0">
      <div class="text-2xl font-semibold">Lay Buys</div>
      <div class="text-sm font-thin">All your laybuys</div>
      <div class="flex w-full gap-2">
        <!-- <div
          v-for="(tab, key) in tabs"
          class="text-sm font-bold rounded-md text-center p-2 bg-gradient-to-r from-green-400 to-blue-500"
          :class="{ 'text-gray-50 bg-purple-500': tab.name === activeTab.name }"
          @click="setActiveTab(tab)"
        >
          {{ tab.name }}
        </div> -->
        <div role="tablist" class="tabs tabs-boxed w-full">
          <a
            v-for="(tab, key) in tabs"
            :key
            role="tab"
            class="tab"
            :class="{ 'tab-active bg-teal-600': tab.name === activeTab.name }"
            @click="setActiveTab(tab)"
            >{{ tab.name }}</a
          >
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2 h-full overflow-auto">
      <div v-if="allLayBuys" v-for="(item, key) in allLayBuys">
        <LayBuyItem
          :laybuy_item="item"
          :key="key"
          v-if="LayBuyPageShower(activeTab.name, item)"
          @openLayBuyItem="handleDialogEvents"
        />
      </div>
    </div>

    <div class="fixed bottom-4 right-4">
      <div
        @click="handleDialogEvents({ action: 'Create', item: null })"
        class="bg-white shadow-md p-4 flex justify-center items-center rounded-full"
      >
        <span class="material-icons font-bold" style="font-size: 2rem"
          >add</span
        >
      </div>
    </div>
    <dialog ref="my_modal_5" class="modal modal-bottom sm:modal-middle">
      <div class="modal-box">
        <div class="font-bold text-lg flex justify-end">
          <form method="dialog">
            <button class="">
              <div class="material-icons text-gray-500" style="font-size: 2rem">
                cancel
              </div>
            </button>
          </form>
        </div>
        <ViewLayBuyItem
          :laybuyItem="activeLayBuyItem"
          v-if="activeDialogView == 'View'"
          @delete-lay-buy-item="handleDeleteLayBuyItem"
          @edit-lay-buy-item="handleEditLayBuyItem"
        />
        <CreateLayBuyItem
          @create-lay-buy-item-success="handleCreateLayBuyItem"
          v-if="activeDialogView == 'Create'"
        />
        <LayBuyPayment
          v-if="activeDialogView === 'Pay'"
          :laybuy_id="asString(activeLayBuyItem?.id)"
          @payment-success="handlePaymentSuccess()"
        />
        <ViewReceipt
          v-if="activeDialogView === 'ViewReceipt'"
          :receiptUrl="asString(activeLayBuyItem?.receipt)"
        />
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth'],
});

import { onMounted, ref } from 'vue';

import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import LayBuyPayment from '../components/LayBuyPayment.vue';
import type { LayBuyItem as LayBuyItemType } from '~/models/LayBuyItem.model';
import { getAllUserBuys } from '~/requesHandlers/laybuys';
import LayBuyItem from '~/components/LayBuyItem.vue';

import { LayBuyPageShower } from '@/helpers/laybuys';
import { getLoggedInUser } from '~/requesHandlers/users';

type LayBuyPageTab = {
  name: string;
};

const tabs: LayBuyPageTab[] = [
  { name: 'New' },
  { name: 'Outstanding' },
  { name: 'Fully Paid' },
];

type DialogViews = 'Create' | 'View' | 'Pay' | 'ViewReceipt' | null;

const activeTab: Ref<LayBuyPageTab> = ref(tabs[0]);

const activeDialogView: Ref<DialogViews | null> = ref(null);

const my_modal_5: Ref<any> = ref(null);

function setActiveTab(tab: typeof activeTab.value) {
  activeTab.value = tab;
}

const activeLayBuyItem: Ref<LayBuyItemType | null> = ref(null);

const allLayBuys: Ref<LayBuyItemType[] | null> = ref(null);

const loogedInUserId: Ref<string> = ref(getLoggedInUser().id);

console.log(getLoggedInUser());

const router = useRouter();

getAllUserBuys(loogedInUserId.value).then((val) => {
  allLayBuys.value = val;
});

const selectLayBuyItem = (laybuyItem: LayBuyItemType) => {};
const handleDialogEvents = (val: {
  action: DialogViews;
  item: LayBuyItemType | null;
}) => {
  activeDialogView.value = val.action;
  activeLayBuyItem.value = val.item;

  my_modal_5.value?.showModal();
};

const handlePaymentSuccess = () => {
  my_modal_5.value?.close();
};

const handleDeleteLayBuyItem = () => {
  my_modal_5.value?.close();
};

const handleEditLayBuyItem = () => {
  my_modal_5.value?.close();
};

const handleCreateLayBuyItem = () => {
  my_modal_5.value?.close();
};

const asString = (value: any) => {
  return value as string;
};
onMounted(() => {
  setActiveTab({ name: router.currentRoute.value.query.tab as string });
});
</script>
