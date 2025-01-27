<template>
  <!-- Slot Machine page content with the convert currency logic applied-->
  <q-page padding>
    <q-toolbar>
      <q-toolbar-title class="flex justify-center"
        >Slot Machine</q-toolbar-title
      >
    </q-toolbar>
    <!-- Used to simulate a slot machine on page -->
    <q-card class="slot-machine-card">
      <q-card-section>
        <div class="slot-machine-reels">
          <q-img
            v-for="(reel, index) in reels"
            :key="index"
            :src="getImage(reel)"
            class="reel"
          />
        </div>
      </q-card-section>

      <q-card-section class="actions">
        <q-btn
          color="primary"
          label="Spin"
          @click="spinSlotMachine"
          :disable="balance <= 0"
          class="spin-button"
        />

        <!-- Display the result of the spin. Visible only when the user spins the slot machine -->
        <div class="results">
          <p v-if="resultMessage">Result: {{ resultMessage }}</p>
          <p v-if="reward > 0">Reward: {{ reward }} coins</p>
          <p v-if="balance >= 0">Updated balance: {{ balance }} coins</p>
        </div>
      </q-card-section>

      <!-- Conver currency logic -->
      <q-card-section class="convert-balance">
        <div class="q-gutter-sm q-flex items-center row">
          <q-input
            v-model.number="convertAmount"
            label="Amount to Convert (in USD)"
            outlined
            dense
            type="number"
            class="q-mr-sm"
          />
          <q-select
            v-model="targetCurrency"
            :options="currencyOptions"
            label="Target Currency"
            outlined
            dense
            class="q-mr-sm"
          />
          <q-btn
            color="secondary"
            label="Convert Balance"
            @click="convertCurrency"
            :disable="!convertAmount || !targetCurrency"
            class="q-mr-sm"
          />
        </div>
        <div v-if="convertedBalance > 0">
          <p>
            <strong>
              Converted balance:
              {{ formattedConvertedBalance }} {{ targetCurrency }}
            </strong>
          </p>
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue';
import {
  spinSlotMachine as spinSlotMachineFromApi,
  convertBalance as convertBalanceFromApi,
} from 'src/services/apiService';

export default defineComponent({
  name: 'SlotMachinePage',
  setup() {
    const balance = ref(20);
    const convertedBalance = ref(0);
    const currency = ref('USD');
    const reels = ref<string[]>(['lemon', 'lemon', 'lemon']); // Inicialization of the reels
    const resultMessage = ref('');
    const reward = ref(0);
    const targetCurrency = ref('BRL');
    const convertAmount = ref(0);
    const currencyOptions = ref([
      { label: 'USD', value: 'USD' },
      { label: 'EUR', value: 'EUR' },
      { label: 'GBP', value: 'GBP' },
      { label: 'BRL', value: 'BRL' },
    ]);

    const images = import.meta.globEager('/src/assets/img/*.jpg');
    const getImage = (reel: string) => {
      const imagePath = `/src/assets/img/${reel}.jpg`;
      return images[imagePath]?.default || '';
    };

    const spinSlotMachineLocal = async () => {
      try {
        const {
          reels: newReels,
          balance: newBalance,
          reward: newReward,
        } = await spinSlotMachineFromApi(balance.value);

        reels.value = newReels;
        balance.value = newBalance;
        reward.value = newReward;
        resultMessage.value = `You won ${newReward} coins!`;
      } catch (error) {
        console.error('Error to spin slot machine:', error);
      }
    };

    const convertCurrency = async () => {
      try {
        const newConvertedBalance = await convertBalanceFromApi(
          convertAmount.value,
          currency.value,
          targetCurrency.value
        );

        if (newConvertedBalance) {
          convertedBalance.value = newConvertedBalance;
          console.log('Converted Balance:', convertedBalance.value);
        } else {
          console.error('Invalid conversion data:', newConvertedBalance);
          convertedBalance.value = 0;
        }
      } catch (error) {
        console.error('Error to convert balance:', error);
      }
    };

    const formattedConvertedBalance = computed(() => {
      return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: targetCurrency.value,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
      }).format(convertedBalance.value);
    });

    return {
      reels,
      balance,
      spinSlotMachine: spinSlotMachineLocal,
      convertedBalance,
      getImage,
      resultMessage,
      reward,
      targetCurrency,
      convertCurrency,
      convertAmount,
      currencyOptions,
      formattedConvertedBalance,
    };
  },
});
</script>

<style scoped>
.slot-machine-card {
  max-width: 525px;
  margin: auto;
  text-align: center;
  padding: 16px;
}

.slot-machine-reels {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
}

.reel {
  width: 80px;
  height: 80px;
  border: 2px solid #ccc;
  border-radius: 8px;
}

.actions {
  margin-top: 16px;
}

.results {
  margin-top: 16px;
  font-size: 16px;
  color: #333;
}

.spin-button {
  margin-bottom: 16px;
}

.convert-balance {
  margin-top: 16px;
}
</style>
