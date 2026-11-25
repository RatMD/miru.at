<!-- Generated from package/src/docs/support/sound.mdx. Edit the source guide. -->

# sound

Prepare Web Audio and play the existing success/error tones on demand.

**Runtime:** Browser / Web Audio.

## Example

```ts
import { sound } from '@rat.md/miru/support';
// Invoke from a user interaction; there is no automatic playback.
await sound.prepare();
await sound.playSuccess();
```

playError is also available. Importing the module does not construct an AudioContext or play a sound.
