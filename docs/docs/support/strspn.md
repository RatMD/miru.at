<!-- Generated from package/src/docs/support/strspn.mdx. Edit the source guide. -->

# strspn

Count consecutive accepted characters within a substring range, including negative offsets and lengths.

**Runtime:** Universal.

## Example

```ts
import { strspn } from '@rat.md/miru/support';
strspn('123abc', '0123456789'); // 3
strspn('abc123', '0123456789', -3); // 3
```

A null length scans to the end. A negative length stops that many characters before the string's end.
