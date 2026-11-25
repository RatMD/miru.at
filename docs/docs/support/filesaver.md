<!-- Generated from package/src/docs/support/filesaver.mdx. Edit the source guide. -->

# filesaver

Download a Blob with UTF-8 BOM support, delayed object-URL cleanup and Safari/iOS fallbacks.

**Runtime:** Browser.

## Example

```ts
import { saveAs } from '@rat.md/miru/support';
// Call from a user interaction.
saveAs(new Blob(['name\nExample'], { type: 'text/csv;charset=utf-8' }), 'report.csv');
```

Options: autoBom, revokeMs and forceLocationHref. Importing the module does not start a download.
