<!-- Generated from package/src/docs/support/levenshtein.mdx. Edit the source guide. -->

# levenshtein

Calculate the insertion, deletion and substitution distance between two strings.

**Runtime:** Universal.

## Example

```ts
import { levenshtein } from '@rat.md/miru/support';
levenshtein('kitten', 'sitting'); // 3
```

Uses JavaScript UTF-16 code units rather than grapheme clusters.
