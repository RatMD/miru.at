<!-- Generated from package/src/docs/support/select.mdx. Edit the source guide. -->

# select

Select a single DOM element from document or a supplied context.

**Runtime:** Browser.

## Example

```ts
import { select } from '@rat.md/miru/support';
const email = select<HTMLInputElement>('input[type=email]');
```

Returns null if there is no match.
