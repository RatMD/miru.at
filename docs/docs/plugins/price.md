<!-- Generated from package/src/docs/plugins/price.mdx. Edit the source guide. -->

# price

Display a currency amount with Intl.NumberFormat.

```vue
<template>
    <span v-price="amount" />
    <span v-price.cents="cents" />
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { vPrice } from '@rat.md/miru/plugins';
const amount = ref(1234.5);
const cents = ref(123450);
</script>
```

`.cents` divides the value by 100. Invalid/empty amounts display an em dash. Global registration follows Miru's locale/currency; the standalone directive defaults to de-DE/EUR. Use `createPriceDirective(() => locale.value, 'EUR')` for a local formatter, or the pure `formatPrice` helper.
