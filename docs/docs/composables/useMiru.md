<!-- Generated from package/src/docs/composables/useMiru.mdx. Edit the source guide. -->

# useMiru

Read this Vue app's configuration and nearest provider translations.

```ts
import { computed } from 'vue';
import { useMiru } from '@rat.md/miru/composables';

const miru = useMiru();
const currency = computed(() => miru.currency);
const closeLabel = computed(() => miru.t('common.actions.close'));
```

Install `createMiru` or `createMiruConfig` before calling it in setup. Configuration is app-local; there is no global `$miru` property. `miru.options` holds the shared reactive settings.
