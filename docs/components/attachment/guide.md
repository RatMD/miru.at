---
title: Attachment guide
component: Attachment
componentPage: guide
---


Use Attachment for a file preview and AttachmentList for a controlled collection of files. They display metadata, upload feedback and editing controls; your application owns uploading, object URLs and persistence.

## A controlled collection

```vue
<script setup lang="ts">
import { ref } from 'vue';
import type { AttachmentItem } from '@rat.md/miru';
import { AttachmentList } from '@rat.md/miru';

const attachments = ref<AttachmentItem[]>([
    {
        id: 'plan',
        name: 'Project plan.pdf',
        mimeType: 'application/pdf',
        size: 184320,
        status: 'success',
    },
    { id: 'notes', name: 'Meeting notes.txt', mimeType: 'text/plain', size: 2048, status: 'idle' },
]);
</script>

<template>
    <AttachmentList v-model="attachments" layout="list" sortable removable show-primary />
</template>
```

Keep each `id` stable and unique. Reordering, removal and metadata edits emit an updated array. `reorder` also reports the ordered ids, `remove` reports an id, and `update:item` reports an edited record. Use these events to persist changes or manage uploads in your application.

## File data and previews

| Data                           | Purpose                                                                                                                        |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------ |
| `id`                           | Stable identity for rendering, updates and sorting.                                                                            |
| `name`, `title`, `description` | Filename and optional display metadata. The name falls back to `File.name`; an explicit title takes precedence in the heading. |
| `url`, `thumbnailUrl`          | Image preview URL and optional thumbnail for other media, such as video or documents.                                          |
| `kind`, `mimeType`             | Explicit file kind or information used to detect its type.                                                                     |
| `size`, `file`                 | Size in bytes and the original File reference for application uploads.                                                         |
| `status`, `progress`, `error`  | Application-supplied upload state and feedback.                                                                                |
| `disabled`, `translations`     | Per-item interaction state and translated title/description values.                                                            |

Kinds include image, video, audio, document, archive, code and file. Failed or unavailable previews fall back to a type icon. Video and audio are not played automatically. Previews use the URLs you provide. Create and revoke temporary object URLs in the application that owns them.

## Layout, primary items and sorting

Attachment supports horizontal and vertical orientation. AttachmentList provides `list`, responsive `grid` and horizontally scrolling `row` layouts. A list normally uses horizontal cards; grid and row use vertical cards. `orientation` overrides that choice. Use `size`, `aspectRatio`, `maxWidth` and `maxPreviewHeight` to adjust the presentation.

`showPrimary` displays an indicator. Without `primaryId`, the first item is marked primary and reordering can change it. With `primaryId`, the indicator follows that id. This is display state, not a separate selection model.

Enable `sortable` for collection reordering. Drag handles and move buttons can be controlled separately; handles also support arrow keys and move buttons stop at the boundaries. SortableJS loads on the client when needed. A standalone Attachment emits move requests for the application to handle. Disabled items reject their edit, remove and move actions; disabling the list disables its interactions.

## Upload feedback and metadata

Statuses are `idle`, `uploading`, `processing`, `success` and `error`. Busy states show a spinner; a finite progress value adds a progress bar and localised percentage, clamped to 0–100. `showStatus` and `showProgress` control this feedback. Error text replaces the generic error line when supplied.

Use `showType`, `showMime` and `showSize` to choose the visible metadata. `mimeMaxLength` shortens long MIME labels while retaining the full value in a tooltip. `sizeDigits` controls size precision; `sizeMetric` switches from binary IEC to metric SI units. Built-in labels follow ContextProvider, while application titles, descriptions and errors should already be localised.

## Editable and translated metadata

Set `editable` to show title and description controls. Standalone Attachment uses `v-model:item`; AttachmentList updates its collection model. Edits retain the original File reference and other metadata.

Supply `locales` and `baseLocale` to edit `translations[locale].title` and `translations[locale].description`. The locale options use the same literal/translated labels as the [form system](/docs/forms/generator#labels-and-translated-values). Use `v-model:activeLocale` when the language selector is controlled externally.

For validated metadata, replace the `fields` slot. It receives `item`, `locale`, `update(patch)` and `disabled`; AttachmentList also supplies `index`. Connect the fields to an existing form controller, call its change and blur handlers and render FieldError. `namePrefix` creates optional native input names; it does not register TanStack fields. See [Field composition](/docs/forms/fields) for the binding pattern.

## UploadZone and custom actions

UploadZone owns file validation and temporary preview URLs. Its `attachments` slot exposes `items`, `update` and `disabled`; render AttachmentList there and pass model updates to `update`. SortableImageGallery remains a compatibility wrapper for an UploadImage collection. For general documents, use AttachmentList with your own AttachmentItem array and upload handler.

Use the `actions` slot for preview, download or retry actions and `media` to replace the preview. Removing or reordering a card does not cancel a request, delete a server file or save the new order automatically.

Reference: [Attachment](/components/attachment), [AttachmentList](/components/attachment-list) and [UploadZone](/components/api/upload-zone).
