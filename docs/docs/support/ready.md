<!-- Generated from package/src/docs/support/ready.mdx. Edit the source guide. -->

# ready

Wait for DOM readiness or run a callback once the document is ready.

**Runtime:** Browser.

## Example

```ts
import { ready } from '@rat.md/miru/support';
await ready();
// DOM work can begin here.
```

ready(callback) returns void; ready() returns a promise resolving with null.
