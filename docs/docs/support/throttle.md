<!-- Generated from package/src/docs/support/throttle.mdx. Edit the source guide. -->

# throttle

Run a leading-edge callback at a limited rate, preserving arguments, this and return values.

**Runtime:** Universal.

## Example

```ts
import { throttle } from '@rat.md/miru/support';
const update = throttle((value: number) => value * 2, 200);
update(2); // 4
update(3); // undefined while paused
```

For asynchronous callbacks the cooldown begins after settlement, including rejection. Promise failures are returned to the caller.
