<template>
  <q-page padding class="q-pa-md">
    <div
      class="q-mb-md"
      style="display: flex; justify-content: center; align-items: center"
    >
      <q-select
        outlined
        v-model="filterType"
        :options="filterOptions"
        label="Filter by"
        style="width: 300px; margin-right: 10px"
      />
      <q-input
        outlined
        v-model="searchTerm"
        placeholder="Search games..."
        style="max-width: 400px; width: 100%"
        @keyup.enter="fetchGames"
      />
      <q-btn
        color="primary"
        label="Search"
        @click="fetchGames"
        style="margin-left: 10px"
      />
    </div>

    <div class="q-gutter-sm row" v-if="games.length">
      <div
        v-for="game in games"
        :key="game.id"
        class="col-12 col-sm-6 col-md-4 col-lg-3"
      >
        <q-card>
          <q-card-section>
            <q-img :src="getAbsoluteUrl(game.thumbUrl)" />
          </q-card-section>
          <q-card-section>
            <div>
              <div class="">{{ game.title }}</div>
              <div class="">{{ game.providerName }}</div>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>

    <div v-else>
      <p>No games found.</p>
    </div>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import {
  fetchGames as fetchGamesFromApi,
  fetchAllGames as fetchAllGamesFromApi,
} from 'src/services/apiService';
export default defineComponent({
  name: 'GamesPage',
  setup() {
    const games = ref<
      {
        id: string;
        slug: string;
        title: string;
        providerName: string;
        thumbUrl: string;
      }[]
    >([]);
    const searchTerm = ref('');
    const loading = ref(true);
    const filterType = ref({ label: 'ID', value: 'id' });
    const filterOptions = [
      { label: 'ID', value: 'id' },
      { label: 'Slug', value: 'slug' },
      { label: 'Provider Name', value: 'providerName' },
      { label: 'Query', value: 'query' },
    ];

    const fetchGames = async () => {
      let fetchedGames;
      loading.value = true;
      if (searchTerm.value) {
        fetchedGames = await fetchGamesFromApi(
          filterType.value.value,
          searchTerm.value
        );
      } else {
        fetchedGames = await fetchAllGamesFromApi();
      }

      games.value = fetchedGames;
      loading.value = false;
    };

    const getAbsoluteUrl = (url: string) => {
      if (!url) return '';
      if (url.startsWith('//')) {
        console.log('url-montada:', `https:${url}`);
        return `https:${url}`;
      }
      return url;
    };

    onMounted(fetchGames);

    return {
      games,
      searchTerm,
      filterType,
      filterOptions,
      fetchGames,
      getAbsoluteUrl,
    };
  },
});
</script>

<style scoped>
.q-page {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
}
</style>
