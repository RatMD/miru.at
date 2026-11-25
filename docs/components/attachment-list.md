---
title: "AttachmentList"
component: AttachmentList
componentPage: overview
---

## Preview

<ComponentExample name="AttachmentList" :show-playground="false" />

## Features

<ul class="component-features">
    <li>List, responsive grid and horizontal row layouts.</li>
    <li>Controlled reordering, removal and metadata edits.</li>
    <li>Primary-item indicators, drag handles and movement buttons.</li>
</ul>

## Attachment data and upload state

Give every AttachmentItem a stable `id`. Supply `name`, `mimeType` and `size`, or a browser `File` as a fallback; `thumbnailUrl` takes precedence over an image `url`. The application owns upload requests, saved files and object-URL creation and cleanup. Set `status` to `idle`, `uploading`, `processing`, `success` or `error`, and provide `progress` from 0 to 100 for uploading or processing feedback.

## Metadata and translated fields

Use `editable` for the built-in title and description editor, or provide the `fields` slot and call its `update` callback with a metadata patch. Without `locales`, edits update the item directly; with locales, edits update `item.translations[activeLocale]`. Bind `v-model:item` on Attachment or `v-model` on AttachmentList to retain edits, and optionally bind `v-model:activeLocale` to control the editing language.

## Collection layout and movement

AttachmentList uses horizontal cards in `layout="list"` and vertical cards in `grid` and `row`; `orientation` overrides this choice. Enable `sortable` for drag handles and previous/next actions. Drag sorting uses dynamically imported SortableJS; arrow keys on a handle also move items. Reordering, removal and metadata edits emit a new collection array. `showPrimary` only displays a badge: it marks `primaryId`, or the first item when no ID is supplied.

## Dependencies

- **UI:** [Attachment](/components/attachment)
- **Packages:** [clsx](https://www.npmjs.com/package/clsx), [sortablejs](https://www.npmjs.com/package/sortablejs), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/attachment-list/reference) for the complete component contract.
