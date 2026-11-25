---
title: "UploadZone"
component: UploadZone
componentPage: overview
---

## Preview

<ComponentExample name="UploadZone" :show-playground="false" />

## Features

<ul class="component-features">
    <li>File selection and dropping with validation and processing feedback.</li>
    <li>Optional sortable image gallery with application-controlled uploads.</li>
</ul>

## Selection, processing and uploads

The files event reports accepted File objects; the application sends upload requests. transformFiles can process the selection asynchronously before validation and preview creation. A rejected processing step emits processing-error. Gallery mode manages image preview URLs and an UploadImage array, with reorder/remove events and an attachments slot for custom rendering. Busy state prevents new gallery edits; simple file mode can still accept files when appropriate. File type, size, count and image-dimension checks do not replace server validation.

## Dependencies

- **UI:** [Badge](/components/badge), [SortableImageGallery](/components/api/sortable-image-gallery)
- **Packages:** [@tabler/icons-vue](https://www.npmjs.com/package/@tabler/icons-vue), [vue](https://www.npmjs.com/package/vue)

See the [reference](/components/upload-zone/reference) for the complete component contract.
