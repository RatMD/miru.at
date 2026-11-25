<!-- Generated from package/src/docs/support/emailAddress.mdx. Edit the source guide. -->

# emailAddress

Validate email addresses with internationalized domains without changing the original value.

**Runtime:** Universal.

## Example

```ts
import { isValidMailAddress } from '@rat.md/miru/support';
isValidMailAddress('name@example.com'); // true
```

Dependency: Zod. The domain is normalized through URL before validation.
