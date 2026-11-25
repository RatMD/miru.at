---
title: "Attachment"
component: Attachment
componentPage: overview
---

## Preview

<ComponentExample name="Attachment" :show-playground="false" />

## Features

<ul class="component-features">
    <li>Previews for images and other file types.</li>
    <li>Metadata, upload status and progress feedback.</li>
    <li>Editable titles and descriptions with optional translations.</li>
</ul>

## Attachment data and upload state

Give every AttachmentItem a stable `id`. Supply `name`, `mimeType` and `size`, or a browser `File` as a fallback; `thumbnailUrl` takes precedence over an image `url`. The application owns upload requests, saved files and object-URL creation and cleanup. Set `status` to `idle`, `uploading`, `processing`, `success` or `error`, and provide `progress` from 0 to 100 for uploading or processing feedback.

## Metadata and translated fields

Use `editable` for the built-in title and description editor, or provide the `fields` slot and call its `update` callback with a metadata patch. Without `locales`, edits update the item directly; with locales, edits update `item.translations[activeLocale]`. Bind `v-model:item` on Attachment or `v-model` on AttachmentList to retain edits, and optionally bind `v-model:activeLocale` to control the editing language.

## Collection layout and movement

AttachmentList uses horizontal cards in `layout="list"` and vertical cards in `grid` and `row`; `orientation` overrides this choice. Enable `sortable` for drag handles and previous/next actions. Drag sorting uses dynamically imported SortableJS; arrow keys on a handle also move items. Reordering, removal and metadata edits emit a new collection array. `showPrimary` only displays a badge: it marks `primaryId`, or the first item when no ID is supplied.

## Dependencies

- **UI:** [Badge](/components/badge), [ButtonAction](/components/button-action), [Field](/components/api/field), [FieldError](/components/api/field-error), [FieldLabel](/components/api/field-label), [FormLocaleSwitcher](/components/api/form-locale-switcher), [Input](/components/api/input), [Progress](/components/progress), [Textarea](/components/api/textarea), [Tooltip](/components/api/tooltip), [TooltipContent](/components/api/tooltip-content), [TooltipProvider](/components/api/tooltip-provider), [TooltipTrigger](/components/api/tooltip-trigger)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [clsx](https://www.npmjs.com/package/clsx), [tailwind-merge](https://www.npmjs.com/package/tailwind-merge), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/attachment/reference) for the complete component contract.
