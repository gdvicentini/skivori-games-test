<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="toggleLeftDrawer"
        />

        <q-toolbar-title>
          <q-img
            width="150px"
            src="https://skivori.com/wp-content/uploads/2020/06/cropped-design_skivori_v2.png"
          />
          Games
        </q-toolbar-title>

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="leftDrawerOpen" show-if-above bordered>
      <q-list>
        <q-item-label header> Essential Links </q-item-label>

        <menu-itens-component v-for="item in itens" :key="item" v-bind="item" />
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import MenuItensComponent from 'src/components/MenuItensComponent.vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    MenuItensComponent,
  },

  setup() {
    const leftDrawerOpen = ref(false);
    const itens = ref([
      {
        title: 'Games',
        caption: 'List of all games',
        icon: 'videogame_asset',
        link: '/games',
      },
      {
        title: 'Slot Machine',
        caption: 'Spin the slot machine and win coins',
        icon: 'casino',
        link: '/slot-machine',
      },
    ]);

    return {
      itens,
      leftDrawerOpen,
      toggleLeftDrawer() {
        leftDrawerOpen.value = !leftDrawerOpen.value;
      },
    };
  },
});
</script>
