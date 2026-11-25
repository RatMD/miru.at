export interface ComponentGuide {
    title: string;
    link: string;
}

export const componentGuides: ComponentGuide[] = [
    { title: 'ApexCharts', link: '/components/apexcharts/guide' },
    { title: 'DataTable', link: '/components/data-table/guide' },
    { title: 'Schedule', link: '/components/schedule/guide' },
    { title: 'Attachment', link: '/components/attachment/guide' },
    { title: 'Carousel', link: '/components/carousel/guide' },
    { title: 'Table', link: '/components/table/guide' },
    { title: 'EditorFrame', link: '/components/editor-frame/guide' },
    { title: 'EditorTinyMCE', link: '/components/editor-tinymce/guide' },
];

export function componentGuideFor(name: string, module?: string): ComponentGuide | undefined {
    const title =
        name === 'ApexChart'
            ? 'ApexCharts'
            : module === 'data-table' || name === 'DataTable'
              ? 'DataTable'
              : module === 'schedule' || name === 'Schedule'
                ? 'Schedule'
                : name === 'EditorFrame'
                  ? 'EditorFrame'
                  : name === 'Editor'
                    ? 'EditorTinyMCE'
                    : name === 'Attachment' || name === 'AttachmentList'
                      ? 'Attachment'
                      : name === 'Carousel'
                        ? 'Carousel'
                        : name === 'Table' || module === 'table'
                          ? 'Table'
                          : undefined;
    return componentGuides.find((guide) => guide.title === title);
}
