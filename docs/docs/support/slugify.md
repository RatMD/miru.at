<!-- Generated from package/src/docs/support/slugify.mdx. Edit the source guide. -->

# slugify

Build an ASCII slug with configurable separators and character replacements.

**Runtime:** Universal.

## Example

```ts
import { slugify } from '@rat.md/miru/support';
slugify('Grüße aus Köln'); // 'gruesse-aus-koeln'
slugify('Two words', '_'); // 'two_words'
```

Default German transliterations are applied before diacritic removal. Custom separators are escaped before use in regular expressions.
