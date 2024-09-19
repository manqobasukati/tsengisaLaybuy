<template>
  <div class="drawer">
    <input id="my-drawer" ref="my_drawer" type="checkbox" class="drawer-toggle" />
    <div class="drawer-content flex flex-col h-full p-2">
      <div class="flex justify-end">
        <label v-if="showDrawer" for="my-drawer">
          <span class="material-icons drawer-button" style="font-size: 2.5rem;">menu</span>
        </label>
      </div>
      <slot></slot>

      <!-- Page content here -->
    </div>
    <div class="drawer-side">
      <label for="my-drawer" aria-label="close sidebar" class="drawer-overlay"></label>

      <ul class="menu w-2/3 min-h-full bg-base-200 text-base-content justify-center items-center">
        <!-- Sidebar content here -->
        <img width="100" class="rounded-full"
          src="https://bxvkcyophelgvxlaolrp.supabase.co/storage/v1/object/public/tsenga/profile_pics/Manqoba.jpeg?t=2024-09-13T10%3A00%3A44.013Z" />
        <li v-for="(item, key) in menuItems" class="w-full" :key="key">
          <NuxtLink @click="goToRoute(item.itemLink)" >
            <div class="flex justify-left w-full items-center gap-1">
              <span class="material-icons-outlined">{{ item.itemIcon }}</span>
              <div>{{ item.itemName }}</div>
            </div>
          </NuxtLink>

          <div class="divider"></div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { Ref } from 'vue';
import { RouterLink } from 'vue-router';
type MenuItem = {
  itemName: string;
  itemIcon: string;
  itemLink?: string
};
const router = useRouter();
const my_drawer: Ref<HTMLInputElement | undefined> = ref()
const menuItems: Ref<MenuItem[]> = ref([
  {
    itemName: 'LayBuys',
    itemLink: "/laybuys?tab=New",
    itemIcon: 'shopping_bag',
  },
  {
    itemName: 'Profile',
    itemLink: "/laybuys?tab=New",
    itemIcon: 'person',
  },
  {
    itemName: 'FAQ',
    itemLink: "/laybuys?tab=New",
    itemIcon: 'help',
  },
  {
    itemName: 'Settings',
    itemLink: "/settings",
    itemIcon: 'settings',
  },
  {
    itemName: 'Privacy Policy',
    itemLink: "/laybuys?tab=New",
    itemIcon: 'policy',
  },
  {
    itemName: 'Log out',
    itemLink: "/sign-in?action=logout",
    itemIcon: 'power_settings_new',
  },
]);

const goToRoute = (link: string | undefined) => {

  if (link) {
    router.push(link).then(() => {
      (my_drawer.value as HTMLInputElement).checked = false;
    })

  }

}
const showDrawer = computed(() => {

  return !['/sign-in', '/sign-up'].includes(useRouter().currentRoute.value.path);
})



</script>
