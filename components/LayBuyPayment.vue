<template>
  <div class="flex flex-col gap-2">
    <div class="font-bold text-xl">Make Payment</div>
    <input
      type="number"
      placeholder="Type amount here"
      v-model="transaction.amount"
      class="input input-bordered w-full"
    />
    <ValidateInput path="amount" :errors="errors" />
    <button
      @click="submitPayment()"
      class="w-full p-2 bg-teal-600 text-white font-semibold rounded-md"
    >
      Submit
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { ZodError } from 'zod';

import {
  CreateTransactionZod,
  type CreateTransaction,
} from '@/models/Transaction.model';

import { createTransaction } from '@/requesHandlers/transactions';

type Props = {
  laybuy_id: string;
};

const emits = defineEmits(['paymentSuccess']);
const props = defineProps<Props>();

const errors: Ref<ZodError | null> = ref(null);

const transaction: Ref<CreateTransaction> = ref({} as CreateTransaction);

const submitPayment = async () => {
  errors.value = null;
  transaction.value.laybuy_id = props.laybuy_id;

  try {
    CreateTransactionZod.parse(transaction.value);
    createTransaction(props.laybuy_id, transaction.value.amount);
    emits('paymentSuccess');
  } catch (err) {
    const error = err as ZodError;
    errors.value = error;

    console.log('Again', err);
  }
};
</script>
