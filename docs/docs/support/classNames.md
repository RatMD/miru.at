<!-- Generated from package/src/docs/support/classNames.mdx. Edit the source guide. -->

# classNames

Merge conditional classes and resolve conflicting Tailwind utilities.

**Runtime:** Universal.

## Example

```ts
import { cn } from '@rat.md/miru/support/classNames';
cn('px-2', false && 'hidden', 'px-4'); // 'px-4'
```

Dependencies: clsx and tailwind-merge. The cn root export remains available from @rat.md/miru.
