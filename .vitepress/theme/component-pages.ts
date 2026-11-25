/** Manually reviewed component pages; overview and guide prose is authored in docs/components. */
export interface ComponentPage {
    base: string;
    module: string;
    parts: string[];
    guide?: string;
    documentation?: string;
}
export const componentPages: Record<string, ComponentPage> = {
    ContextProvider: {
        base: '/components/context-provider',
        module: 'provider',
        parts: ['ContextProvider'],
    },
    PageRoot: { base: '/layouts/page-root', module: 'layouts', parts: ['PageRoot'] },
    FloatingAppBar: { base: '/layouts/app-bar', module: 'app-bar', parts: ['FloatingAppBar'] },
    AuthPage: { base: '/layouts/auth-page', module: 'layouts', parts: ['AuthPage'] },
    DashboardPage: { base: '/layouts/dashboard-page', module: 'layouts', parts: ['DashboardPage'] },
    FormLayout: {
        base: '/components/form-layout',
        module: 'form',
        parts: ['FormLayout'],
        documentation: '/docs/forms/introduction',
    },
    Accordion: {
        base: '/components/accordion',
        module: 'accordion',
        parts: [
            'Accordion',
            'AccordionItem',
            'AccordionHeader',
            'AccordionTrigger',
            'AccordionContent',
        ],
    },
    Alert: {
        base: '/components/alert',
        module: 'alert',
        parts: ['Alert', 'AlertDescription', 'AlertTitle'],
    },
    Anchor: {
        base: '/components/anchor',
        module: 'anchor',
        parts: ['Anchor'],
    },
    Attachment: {
        base: '/components/attachment',
        module: 'attachment',
        parts: ['Attachment'],
        guide: '/components/attachment/guide',
    },
    AttachmentList: {
        base: '/components/attachment-list',
        module: 'attachment',
        parts: ['AttachmentList'],
        guide: '/components/attachment/guide',
    },
    Avatar: {
        base: '/components/avatar',
        module: 'avatar',
        parts: ['Avatar', 'AvatarFallback', 'AvatarImage'],
    },
    AvatarStack: {
        base: '/components/avatar-stack',
        module: 'avatar',
        parts: ['AvatarStack'],
    },
    Badge: {
        base: '/components/badge',
        module: 'badge',
        parts: ['Badge', 'BadgePart', 'BadgeSeparator'],
    },
    BadgeCopy: {
        base: '/components/badge-copy',
        module: 'badge-copy',
        parts: ['BadgeCopy'],
    },
    Breadcrumb: {
        base: '/components/breadcrumb',
        module: 'breadcrumb',
        parts: [
            'Breadcrumb',
            'BreadcrumbEllipsis',
            'BreadcrumbItem',
            'BreadcrumbLink',
            'BreadcrumbList',
            'BreadcrumbPage',
            'BreadcrumbSeparator',
            'BreadcrumbMenu',
        ],
    },
    Button: {
        base: '/components/button',
        module: 'button',
        parts: ['Button'],
    },
    ButtonAction: {
        base: '/components/button-action',
        module: 'button-action',
        parts: ['ButtonAction'],
    },
    ButtonGroup: {
        base: '/components/button-group',
        module: 'button-group',
        parts: ['ButtonGroup'],
    },
    ButtonShadow: {
        base: '/components/button-shadow',
        module: 'button-shadow',
        parts: ['ButtonShadow'],
    },
    Card: {
        base: '/components/card',
        module: 'card',
        parts: [
            'Card',
            'CardAction',
            'CardContent',
            'CardDescription',
            'CardFooter',
            'CardHeader',
            'CardTitle',
        ],
    },
    CardChart: {
        base: '/components/card-chart',
        module: 'card-chart',
        parts: ['CardChart'],
    },
    Carousel: {
        base: '/components/carousel',
        module: 'carousel',
        parts: ['Carousel'],
        guide: '/components/carousel/guide',
    },
    Code: {
        base: '/components/code',
        module: 'code',
        parts: ['Code'],
    },
    CodePanel: {
        base: '/components/code-panel',
        module: 'code-panel',
        parts: ['CodePanel'],
    },
    Item: {
        base: '/components/item',
        module: 'item',
        parts: [
            'Item',
            'ItemActions',
            'ItemContent',
            'ItemDescription',
            'ItemFooter',
            'ItemGroup',
            'ItemHeader',
            'ItemMedia',
            'ItemSeparator',
            'ItemTitle',
        ],
    },
    Kbd: {
        base: '/components/kbd',
        module: 'kbd',
        parts: ['Kbd', 'KbdGroup'],
    },
    Marker: {
        base: '/components/marker',
        module: 'marker',
        parts: ['Marker', 'MarkerIcon', 'MarkerContent', 'MarkerMeta'],
    },
    Pagination: {
        base: '/components/pagination',
        module: 'pagination',
        parts: [
            'Pagination',
            'PaginationContent',
            'PaginationEllipsis',
            'PaginationFirst',
            'PaginationItem',
            'PaginationLast',
            'PaginationNext',
            'PaginationPrevious',
        ],
    },
    Progress: {
        base: '/components/progress',
        module: 'progress',
        parts: ['Progress'],
    },
    Separator: {
        base: '/components/separator',
        module: 'separator',
        parts: ['Separator'],
    },
    Skeleton: {
        base: '/components/skeleton',
        module: 'skeleton',
        parts: ['Skeleton'],
    },
    Spinner: {
        base: '/components/spinner',
        module: 'spinner',
        parts: ['Spinner'],
    },
    Table: {
        base: '/components/table',
        module: 'table',
        parts: [
            'Table',
            'TableHeader',
            'TableBody',
            'TableFooter',
            'TableRow',
            'TableHead',
            'TableCell',
            'TableCaption',
            'TableCellMoney',
            'TableCellDateTime',
            'TableCellCount',
            'TableCellBadge',
            'TableCellStatus',
            'TableCellAddress',
            'TableCellMultiCounts',
            'TableCellBoolean',
            'TableMoneyValue',
            'TableDateTimeValue',
            'TableCountValue',
            'TableBadgeValue',
            'TableStatusValue',
            'TableAddressValue',
            'TableMultiCountsValue',
            'TableMultiCountsHeader',
            'TableBooleanToggle',
        ],
        guide: '/components/table/guide',
    },
    Tabs: {
        base: '/components/tabs',
        module: 'tabs',
        parts: ['Tabs'],
    },
    Field: {
        base: '/components/field',
        module: 'field',
        parts: [
            'Field',
            'FieldLabel',
            'FieldContent',
            'FieldDescription',
            'FieldError',
            'FieldGroup',
            'FieldLegend',
            'FieldSeparator',
            'FieldSet',
            'FieldTitle',
        ],
        documentation: '/docs/forms/introduction',
    },
    Form: {
        base: '/components/form',
        module: 'form',
        parts: [
            'Form',
            'FormLocaleSwitcher',
            'FormRelationSummary',
            'FormRelationshipPicker',
            'FormRepeater',
            'FormText',
        ],
        documentation: '/docs/forms/introduction',
    },
    FormSectionRenderer: {
        base: '/components/generator',
        module: 'form',
        parts: [
            'FormSectionRenderer',
            'FormFieldRenderer',
            'FormDateTimeRangeField',
            'FormHeader',
            'FormSpacer',
        ],
        documentation: '/docs/forms/introduction',
    },
    InputGroup: {
        base: '/components/input-group',
        module: 'input-group',
        parts: [
            'InputGroup',
            'InputGroupAddon',
            'InputGroupButton',
            'InputGroupInput',
            'InputGroupText',
            'InputGroupTextarea',
        ],
        documentation: '/docs/forms/introduction',
    },
    Label: {
        base: '/components/label',
        module: 'label',
        parts: ['Label'],
        documentation: '/docs/forms/introduction',
    },
    Stepper: {
        base: '/components/stepper',
        module: 'stepper',
        parts: [
            'Stepper',
            'StepperList',
            'StepperItem',
            'StepperTrigger',
            'StepperIndicator',
            'StepperLabel',
            'StepperTitle',
            'StepperDescription',
            'StepperSeparator',
            'StepperContent',
            'StepperActions',
        ],
        documentation: '/docs/forms/introduction',
    },
    AutoComplete: {
        base: '/components/auto-complete',
        module: 'auto-complete',
        parts: [
            'AutoComplete',
            'AutoCompleteAnchor',
            'AutoCompleteInput',
            'AutoCompleteList',
            'AutoCompleteViewport',
            'AutoCompleteItem',
            'AutoCompleteEmpty',
            'AutoCompleteGroup',
            'AutoCompleteSeparator',
        ],
        documentation: '/docs/forms/introduction',
    },
    Checkbox: {
        base: '/components/checkbox',
        module: 'checkbox',
        parts: ['Checkbox'],
        documentation: '/docs/forms/introduction',
    },
    CheckboxGroup: {
        base: '/components/checkbox-group',
        module: 'checkbox-group',
        parts: ['CheckboxGroup'],
        documentation: '/docs/forms/introduction',
    },
    ColorPicker: {
        base: '/components/color-picker',
        module: 'color-picker',
        parts: ['ColorPicker'],
        documentation: '/docs/forms/introduction',
    },
    ComboboxField: {
        base: '/components/combobox',
        module: 'combobox',
        parts: [
            'ComboboxField',
            'Combobox',
            'ComboboxAnchor',
            'ComboboxEmpty',
            'ComboboxGroup',
            'ComboboxInput',
            'ComboboxItem',
            'ComboboxItemIndicator',
            'ComboboxList',
            'ComboboxSeparator',
            'ComboboxViewport',
        ],
        documentation: '/docs/forms/introduction',
    },
    Editable: {
        base: '/components/editable',
        module: 'editable',
        parts: ['Editable'],
        documentation: '/docs/forms/introduction',
    },
    EditorJson: {
        base: '/components/editor-json',
        module: 'editor-json',
        parts: ['EditorJson'],
        documentation: '/docs/forms/introduction',
    },
    EditorMarkdown: {
        base: '/components/editor-markdown',
        module: 'editor-markdown',
        parts: ['EditorMarkdown'],
        documentation: '/docs/forms/introduction',
    },
    Editor: {
        base: '/components/editor-tinymce',
        guide: '/components/editor-tinymce/guide',
        module: 'editor',
        parts: ['Editor'],
        documentation: '/docs/forms/introduction',
    },
    Input: {
        base: '/components/input',
        module: 'input',
        parts: ['Input'],
        documentation: '/docs/forms/introduction',
    },
    InputDateTime: {
        base: '/components/input-date-time',
        module: 'input-date-time',
        parts: ['InputDateTime'],
        documentation: '/docs/forms/introduction',
    },
    InputFile: {
        base: '/components/input-file',
        module: 'input-file',
        parts: ['InputFile'],
        documentation: '/docs/forms/introduction',
    },
    InputNumber: {
        base: '/components/input-number',
        module: 'input-number',
        parts: [
            'InputNumber',
            'InputNumberContent',
            'InputNumberDecrement',
            'InputNumberIncrement',
            'InputNumberInput',
        ],
        documentation: '/docs/forms/introduction',
    },
    InputPassword: {
        base: '/components/input-password',
        module: 'input-password',
        parts: ['InputPassword'],
        documentation: '/docs/forms/introduction',
    },
    InputPhone: {
        base: '/components/input-phone',
        module: 'input-phone',
        parts: ['InputPhone'],
        documentation: '/docs/forms/introduction',
    },
    InputPin: {
        base: '/components/input-pin',
        module: 'input-pin',
        parts: ['InputPin', 'InputPinGroup', 'InputPinSlot', 'InputPinSeparator'],
        documentation: '/docs/forms/introduction',
    },
    InputSearch: {
        base: '/components/input-search',
        module: 'input-search',
        parts: ['InputSearch'],
        documentation: '/docs/forms/introduction',
    },
    InputTags: {
        base: '/components/input-tags',
        module: 'input-tags',
        parts: [
            'InputTags',
            'InputTagsInput',
            'InputTagsItem',
            'InputTagsItemDelete',
            'InputTagsItemText',
        ],
        documentation: '/docs/forms/introduction',
    },
    RadioBox: {
        base: '/components/radiobox',
        module: 'radiobox',
        parts: ['RadioBox'],
        documentation: '/docs/forms/introduction',
    },
    RadioGroup: {
        base: '/components/radio-group',
        module: 'radio-group',
        parts: ['RadioGroup', 'RadioGroupItem'],
        documentation: '/docs/forms/introduction',
    },
    Rating: {
        base: '/components/rating',
        module: 'rating',
        parts: ['Rating'],
        documentation: '/docs/forms/introduction',
    },
    Select: {
        base: '/components/select',
        module: 'select',
        parts: [
            'Select',
            'SelectContent',
            'SelectGroup',
            'SelectItem',
            'SelectItemText',
            'SelectLabel',
            'SelectScrollDownButton',
            'SelectScrollUpButton',
            'SelectSeparator',
            'SelectTrigger',
            'SelectValue',
            'SelectClear',
            'SelectSearch',
        ],
        documentation: '/docs/forms/introduction',
    },
    Slider: {
        base: '/components/slider',
        module: 'slider',
        parts: ['Slider'],
        documentation: '/docs/forms/introduction',
    },
    Switch: {
        base: '/components/switch',
        module: 'switch',
        parts: ['Switch'],
        documentation: '/docs/forms/introduction',
    },
    Textarea: {
        base: '/components/textarea',
        module: 'textarea',
        parts: ['Textarea'],
        documentation: '/docs/forms/introduction',
    },
    Toggle: {
        base: '/components/toggle',
        module: 'toggle',
        parts: ['Toggle'],
        documentation: '/docs/forms/introduction',
    },
    ToggleGroup: {
        base: '/components/toggle-group',
        module: 'toggle-group',
        parts: ['ToggleGroup', 'ToggleGroupItem'],
        documentation: '/docs/forms/introduction',
    },
    UploadZone: {
        base: '/components/upload-zone',
        module: 'upload-zone',
        parts: ['UploadZone'],
        documentation: '/docs/forms/introduction',
    },
    Command: {
        base: '/components/command',
        module: 'command',
        parts: ['Command', 'CommandDialog'],
    },
    ContextMenu: {
        base: '/components/context-menu',
        module: 'context-menu',
        parts: [
            'ContextMenu',
            'ContextMenuCheckboxItem',
            'ContextMenuContent',
            'ContextMenuGroup',
            'ContextMenuItem',
            'ContextMenuLabel',
            'ContextMenuRadioGroup',
            'ContextMenuRadioItem',
            'ContextMenuSeparator',
            'ContextMenuShortcut',
            'ContextMenuSub',
            'ContextMenuSubContent',
            'ContextMenuSubTrigger',
            'ContextMenuTrigger',
            'ContextMenuPortal',
        ],
    },
    Description: {
        base: '/components/description',
        module: 'description',
        parts: ['Description'],
    },
    Dialog: {
        base: '/components/dialog',
        module: 'dialog',
        parts: ['Dialog', 'DialogContent', 'DialogDescription', 'DialogTitle', 'DialogFooter'],
    },
    Drawer: {
        base: '/components/drawer',
        module: 'drawer',
        parts: [
            'Drawer',
            'DrawerContent',
            'DrawerHeader',
            'DrawerFooter',
            'DrawerTitle',
            'DrawerDescription',
        ],
    },
    Overlay: {
        base: '/components/overlay',
        module: 'overlay',
        parts: ['Overlay', 'OverlayTrigger'],
    },
    OverlayChoice: {
        base: '/components/overlay-choice',
        module: 'overlay-choice',
        parts: ['OverlayChoice'],
    },
    OverlayDetails: {
        base: '/components/overlay-detail',
        module: 'overlay-details',
        parts: ['OverlayDetails'],
    },
    OverlayNotice: {
        base: '/components/overlay-notice',
        module: 'overlay-notice',
        parts: ['OverlayNotice'],
    },
    Popover: {
        base: '/components/popover',
        module: 'popover',
        parts: ['Popover', 'PopoverAnchor', 'PopoverArrow', 'PopoverContent', 'PopoverTrigger'],
    },
    Sheet: {
        base: '/components/sheet',
        module: 'sheet',
        parts: [
            'Sheet',
            'SheetClose',
            'SheetContent',
            'SheetDescription',
            'SheetFooter',
            'SheetHeader',
            'SheetTitle',
            'SheetTrigger',
        ],
    },
    Toast: {
        base: '/components/toast',
        module: 'toast',
        parts: ['Toast', 'Toaster'],
    },
    Tooltip: {
        base: '/components/tooltip',
        module: 'tooltip',
        parts: ['Tooltip', 'TooltipContent', 'TooltipProvider', 'TooltipTrigger'],
    },
    AspectRatio: {
        base: '/components/aspect-ratio',
        module: 'aspect-ratio',
        parts: ['AspectRatio'],
    },
    Backdrop: {
        base: '/components/backdrop',
        module: 'backdrop',
        parts: ['Backdrop'],
    },
    Breakpoint: {
        base: '/components/breakpoint',
        module: 'breakpoint',
        parts: ['Breakpoint'],
    },
    Calendar: {
        base: '/components/calendar',
        module: 'calendar',
        parts: ['Calendar'],
    },
    Collapsible: {
        base: '/components/collapsible',
        module: 'collapsible',
        parts: ['Collapsible', 'CollapsibleContent', 'CollapsibleTrigger'],
    },
    Copy: {
        base: '/components/copy',
        module: 'copy',
        parts: ['Copy'],
    },
    Deferred: {
        base: '/components/deferred',
        module: 'deferred',
        parts: ['Deferred'],
    },
    DropdownMenu: {
        base: '/components/dropdown-menu',
        module: 'dropdown-menu',
        parts: [
            'DropdownMenu',
            'DropdownMenuCheckboxItem',
            'DropdownMenuContent',
            'DropdownMenuGroup',
            'DropdownMenuItem',
            'DropdownMenuLabel',
            'DropdownMenuRadioGroup',
            'DropdownMenuRadioItem',
            'DropdownMenuSeparator',
            'DropdownMenuShortcut',
            'DropdownMenuSub',
            'DropdownMenuSubContent',
            'DropdownMenuSubTrigger',
            'DropdownMenuTrigger',
            'DropdownMenuArrow',
        ],
    },
    EditorFrame: {
        base: '/components/editor-frame',
        module: 'editor-frame',
        parts: ['EditorFrame'],
        guide: '/components/editor-frame/guide',
    },
    Resizable: {
        base: '/components/resizable',
        module: 'resizable',
        parts: ['Resizable', 'ResizablePanel', 'ResizableHandle'],
    },
    ScrollArea: {
        base: '/components/scroll-area',
        module: 'scroll-area',
        parts: ['ScrollArea', 'ScrollBar'],
    },
    Indicator: {
        base: '/components/indicator',
        module: 'indicator',
        parts: ['Indicator'],
    },
    ApexChart: {
        base: '/components/apexcharts',
        module: 'apexcharts',
        parts: ['ApexChart'],
        guide: '/components/apexcharts/guide',
    },
    CalendarBooking: {
        base: '/components/time-slots',
        module: 'calendar-booking',
        parts: ['CalendarBooking'],
    },
    DataTable: {
        base: '/components/data-table',
        module: 'data-table',
        parts: [
            'DataTable',
            'DataTableActionsCell',
            'DataTableAddressCell',
            'DataTableBadgeCell',
            'DataTableBooleanToggle',
            'DataTableBulkActions',
            'DataTableCellRenderer',
            'DataTableCountCell',
            'DataTableDateTimeCell',
            'DataTableDateTimeValue',
            'DataTableExpandCell',
            'DataTableFilterSheet',
            'DataTableMoneyCell',
            'DataTableMultiCountsCell',
            'DataTableMultiCountsHeader',
            'DataTableMultiCountsValue',
            'DataTablePageStepper',
            'DataTableStatusCell',
            'DataTableSortOrderCell',
            'DataTableStatusIndicator',
            'DataTablePagination',
        ],
        guide: '/components/data-table/guide',
        documentation: '/docs/data-table/introduction',
    },
    FilterBar: {
        base: '/components/filter-bar',
        module: 'filter-bar',
        parts: ['FilterBar', 'FilterBadge'],
    },
    Schedule: {
        base: '/components/schedule',
        module: 'schedule',
        parts: ['Schedule', 'ScheduleEventDetails'],
        guide: '/components/schedule/guide',
    },
};

export function componentSlug(name: string): string {
    return name
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
        .toLowerCase();
}
export function componentPageOwner(name: string): string | undefined {
    return componentPages[name]
        ? name
        : Object.keys(componentPages).find((root) => componentPages[root].parts.includes(name));
}
export function componentReferenceLink(name: string): string {
    const owner = componentPageOwner(name);
    return owner
        ? componentPages[owner].base + '/reference#' + componentSlug(name)
        : '/components/api/' + componentSlug(name);
}
export function componentLegacyPage(name: string): string {
    const owner = componentPageOwner(name);
    const target = owner === name ? componentPages[name].base : componentReferenceLink(name);
    return (
        '---\nsearch: false\nredirectTo: ' +
        JSON.stringify(target) +
        '\nredirectPart: ' +
        name +
        '\n---\n\n# ' +
        name +
        '\n\n[Open the current documentation](' +
        target +
        ').\n'
    );
}
