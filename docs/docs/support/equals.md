<!-- Generated from package/src/docs/support/equals.mdx. Edit the source guide. -->

# equals

Compare values structurally, including cyclic records, enumerable symbols, dates, typed-array views and ordered Map/Set entries.

**Runtime:** Universal.

## Example

```ts
import { equals } from '@rat.md/miru/support';
equals({ tags: ['a'] }, { tags: ['a'] }); // true
equals({ name: 'A' }, { name: 'B' }); // false
```

Map and Set iteration order is significant. Functions, WeakMap and WeakSet compare by identity.
