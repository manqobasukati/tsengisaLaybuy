<template>
  <div class="flex  flex-col gap-2">
    <div class="flex  bg-white w-full flex-col gap-2 ">
      <div class="text-2xl font-semibold">Lay Buys</div>
      <div class="text-sm font-thin">All your laybuys</div>
      <div class="flex w-full gap-2">
        <div
          v-for="(tab, key) in tabs"
          class="text-sm font-bold border border-purple-600 rounded-md text-center p-2 text-purple-600"
          :class="{ 'text-gray-50 bg-purple-500': tab.name === activeTab.name }"
          @click="setActiveTab(tab)"
        >
          {{ tab.name }}
        </div>
      </div>
    </div>
    <div class="flex flex-col gap-2 h-full overflow-auto">
      <LayBuyItem v-for="(item,key) in  allLayBuys" :laybuy_item="item" :key="key" @openLayBuyItem="handleDialogEvents" />
    </div>
   
    <div class="fixed bottom-4 right-4">
      <div
        @click="handleDialogEvents('Create')"
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
        <ViewLayBuyItem v-if="activeDialogView == 'View'" />
        <CreateLayBuyItem v-if="activeDialogView == 'Create'" />
        <LayBuyPayment v-if="activeDialogView === 'Pay'" />
      </div>
    </dialog>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

import type { Ref } from 'vue';
import { useRouter } from 'vue-router';
import LayBuyPayment from '../components/LayBuyPayment.vue';
import type { LayBuyItem } from '~/models/LayBuyItem.model';
import { getAllUserBuys } from '~/requesHandlers/laybuys';

type LayBuyPageTab = {
  name: string;
};

const tabs: LayBuyPageTab[] = [
  { name: 'New' },
  { name: 'Outstanding' },
  { name: 'Fully Paid' },
];

type DialogViews = 'Create' | 'View' | 'Pay';

const activeTab: Ref<LayBuyPageTab> = ref(tabs[0]);

const activeDialogView: Ref<DialogViews | null> = ref(null);

const my_modal_5: Ref<any> = ref(null);

function setActiveTab(tab: typeof activeTab.value) {
  activeTab.value = tab;
}

const allLayBuys:Ref<LayBuyItem[]|null> = ref(null);

const loggedInUserId:Ref<string> = ref('804aca98-021d-483e-8ad5-3974a4189471')

const router = useRouter();

onMounted(async()=>{
  getAllUserBuys(loggedInUserId.value).then((val)=>{
    allLayBuys.value = val;
  })
})
const handleDialogEvents = (view: DialogViews) => {
  activeDialogView.value = view;
  console.log('open dialog', my_modal_5.value?.showModal());
};
onMounted(() => {
  setActiveTab({ name: router.currentRoute.value.query.tab as string });
});
</script>
