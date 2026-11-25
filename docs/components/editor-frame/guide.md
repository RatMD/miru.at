---
title: EditorFrame guide
component: EditorFrame
componentPage: guide
---

EditorFrame supplies the shared shell used by [EditorJSON](/components/editor-json) and [EditorMarkdown](/components/editor-markdown): a labelled editing surface, toolbar, counter and guarded command API. [EditorTinyMCE](/components/editor-tinymce/guide) manages its own rich-text instance.

## Start with a value

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { EditorFrame } from '@rat.md/miru';

const text = ref('A few notes.');
</script>

<template>
    <EditorFrame v-model="text" label="Notes" :rows="8" :maxlength="500" counter />
</template>
```

The default surface is a textarea. Native editing attributes are forwarded to it; `label`, `required`, `invalid`, `disabled` and `readonly` configure the surrounding field treatment. Counter lengths use the same UTF-16 units as native `maxlength`. Use `counterMode="count"`, `"limit"` or `"remaining"` to choose the display.

## Attach commands

Extensions are local objects passed to `extensions`; they need no registry or installation step. A command receives the API for the current frame.

```vue
<script setup lang="ts">
import { ref } from 'vue';
import { EditorFrame } from '@rat.md/miru';
import type { EditorFrameExtension } from '@rat.md/miru';

const text = ref('Select some text.');
const extensions: EditorFrameExtension[] = [
    {
        id: 'text-tools',
        commands: [
            {
                id: 'uppercase',
                label: 'Uppercase selection',
                run: async (api) => {
                    const { value, start, end } = api.getSelection();
                    await api.replaceSelection(value.slice(start, end).toUpperCase());
                },
            },
        ],
    },
];
</script>

<template>
    <EditorFrame v-model="text" label="Notes" :extensions="extensions" />
</template>
```

| Command member | Purpose |
| --- | --- |
| `id` | A unique key used by `execute(id)` and the `command` event. |
| `label` | The toolbar label and accessible name. |
| `icon` | An optional Vue icon component. |
| `disabled` | Disable this command. |
| `active` | Show the command’s pressed state. |
| `mutates` | Defaults to mutation behaviour; set `false` for actions such as preview. |
| `run(api)` | A synchronous or asynchronous handler for this frame. |

Disabled frames block every command; read-only frames block mutation commands. These guards also apply to calls through the exposed API. Keep ids unique: when extensions repeat a command id, the last command wins. The `command` event reports invocation; it does not await an asynchronous handler. Manage pending state and errors inside your handler when needed.

## Use the instance API

The component ref, toolbar slots and command handlers expose the same EditorFrameApi. The [reference](/components/editor-frame/reference#editor-frame-template-ref) lists each member.

`getSelection()` returns the source value and start/end offsets. `setValue()` requests an update to the bound model. `setSelection()` and `replaceSelection()` wait for Vue’s next update before restoring focus and the caret. `getTextarea()` returns the first textarea inside the frame, or `null`; selection helpers therefore work with the default surface or a custom textarea.

Updates that exceed `maxlength` are rejected as a whole, preserving complete JSON or Markdown fragments. The controlled model remains owned by the application; direct external changes to it are not validated by these mutation helpers.

## Replace the editing surface

The default slot receives `api` and `inputId`. A replacement surface must bind its value, emit changes through `api.setValue()`, supply its own blur handling and apply the relevant disabled, read-only and accessibility attributes.

```vue
<EditorFrame v-model="text" label="Notes">
    <template #default="{ api, inputId }">
        <textarea
            :id="inputId"
            :value="api.value"
            :disabled="api.disabled"
            :readonly="api.readonly"
            @input="api.setValue(($event.target as HTMLTextAreaElement).value)" />
    </template>
</EditorFrame>
```

The `toolbar` slot replaces automatic command buttons. `toolbar-end` appends controls, `counter` replaces counter text, and `footer` adds content below the frame. Toolbar and footer slots receive `api`; custom controls should call `api.execute(id)` to retain command guards. Supply `toolbarLabel` when the translated default does not describe your toolbar.
