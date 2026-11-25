import { palette, ink } from '../colors/engine.ts';
export interface Example {
    template: string;
    setup?: string;
    imports?: string[];
    note?: string;
}
const ex = (template: string, setup = '', imports: string[] = []): Example => ({
    template,
    setup,
    imports,
});
const formSetup = `const formController = useForm({ schema: z.object({ name: z.string().min(1, 'Enter a studio name.') }), initialValues: { name: 'Miru studio' }, submit: '/api/studio', mode: 'json' })
const formSections = defineFormSections([{ id: 'profile', label: literal('Profile'), fields: [{ type: 'input', name: 'name', label: literal('Studio name'), required: true, showValidation: true }] }])
const formFeedback = ref('Local validation demo. No request is sent.')
async function validateForm() {
  await formController.form.validate('submit')
  formController.form.setFieldMeta('name', meta => ({ ...meta, isTouched: true }))
  formFeedback.value = formController.form.state.isValid ? 'Ready to save.' : 'Check the highlighted field.'
}`;
const formImports = ['defineFormSections', 'literal'];
const formTemplate = `<Form title="Your studio" :form="formController.form" :sections="formSections" cancel-href="#" :actions-label="literal('Actions')" :section-selector-label="literal('Sections')" @submit="validateForm"><template #secondary-action><Button type="button" variant="outline" @click="formController.form.reset()">Reset</Button></template></Form><p role="status">{{ formFeedback }}</p>`;
export const examples: Record<string, Example> = {
    Stepper: ex(`<Stepper v-model="step" variant="bordered" mobile-layout="vertical"><StepperList><StepperItem :step="1"><StepperTrigger><StepperIndicator /><StepperLabel><StepperTitle>Details</StepperTitle><StepperDescription>Enter recipient details</StepperDescription></StepperLabel></StepperTrigger><StepperSeparator /></StepperItem><StepperItem :step="2"><StepperTrigger><StepperIndicator /><StepperLabel><StepperTitle>Delivery</StepperTitle><StepperDescription>Choose delivery method</StepperDescription></StepperLabel></StepperTrigger></StepperItem></StepperList><StepperContent :step="1" force-mount><Field><Label for="recipient">Recipient</Label><Input id="recipient" placeholder="Recipient name" /></Field></StepperContent><StepperContent :step="2">Choose your preferred delivery method.</StepperContent><StepperActions /></Stepper>`, `const step = ref(1);`),
    Resizable: ex(`<div style="height: 280px"><Resizable direction="horizontal"><ResizablePanel :default-size="35" :min-size="20" collapsible :collapsed-size="0"><div style="padding: 24px">Navigation</div></ResizablePanel><ResizableHandle show-grip show-toggle /><ResizablePanel :min-size="20"><div style="padding: 24px">Content</div></ResizablePanel></Resizable></div>`),

    AutoComplete: ex(
        `<AutoComplete v-model="jobTitle" :options="['Frontend Developer', 'Backend Developer', 'Product Designer']" placeholder="Type any job title…" clearable aria-label="Job title" /><p>{{ jobTitle }}</p>`,
        `const jobTitle = ref('')`,
    ),
    Editable: ex(
        `<Editable v-model="projectTitle" :save="saveTitle" aria-label="Project title" /><p>Saved value: {{ projectTitle }}</p>`,
        `const projectTitle = ref('My project')
async function saveTitle(value) { await new Promise(resolve => setTimeout(resolve, 400)); return value.trim() }`,
    ),
    Rating: ex(
        `<Rating v-model="score" :length="5" :step="0.5" variant="warning" show-value aria-label="Your rating" /><Rating v-model="vote" mode="like-dislike" aria-label="Feedback" />`,
        `const score = ref(3.5)
const vote = ref(0)`,
    ),

    Indicator: ex(
        `<div class="row" style="gap: 32px; padding: 16px"><Indicator overlay :value="5" color="danger" aria-label="5 unread notifications"><ButtonAction label="Notifications"><IconBell /></ButtonAction></Indicator><Indicator overlay value="New" color="warning" position="top-left"><ButtonAction label="Messages"><IconMail /></ButtonAction></Indicator><Indicator overlay color="success" position="bottom-right"><Avatar><AvatarFallback>AM</AvatarFallback></Avatar></Indicator><Badge variant="outline"><Indicator color="#a855f7" pulse />Live</Badge></div>`,
    ),
    Backdrop: ex(
        `<div style="position: relative; isolation: isolate; min-height: 180px; padding: 32px; overflow: hidden; border-radius: 12px"><h2>A softer background.</h2><p>The layer stays inside this preview.</p><Backdrop position="absolute" blur="sm" faded /><Badge style="position: relative; z-index: 50">Soft focus</Badge></div>`,
    ),
    Breakpoint: ex(
        `<Breakpoint min="md"><template #default="{ width }"><p>Wide layout · {{ width }} px</p></template><template #else><p>Compact layout. Resize the preview to change it.</p></template></Breakpoint>`,
    ),
    Deferred: ex(
        `<Deferred :loader="loadPanel" :delay="0"><template #loading><Spinner label="Loading preview" /></template><template #error="{ retry }"><Button @click="retry">Try again</Button></template></Deferred>`,
        `const loadPanel = async () => { await new Promise(resolve => setTimeout(resolve, 500)); return { render: () => h('p', 'Your deferred content is ready.') } }`,
    ),
    ContextMenu: ex(
        `<ContextMenu><ContextMenuTrigger as-child><Button variant="outline">Right-click this button</Button></ContextMenuTrigger><ContextMenuContent><ContextMenuItem @select="contextStatus = 'Opened project'">Open project</ContextMenuItem><ContextMenuSeparator /><ContextMenuItem @select="contextStatus = 'Copied link'">Copy link</ContextMenuItem></ContextMenuContent></ContextMenu><p role="status">{{ contextStatus }}</p>`,
        `const contextStatus = ref('Choose an action from the context menu.')`,
    ),
    Item: ex(
        `<Item variant="outline"><ItemContent><ItemTitle>Project workspace</ItemTitle><ItemDescription>One place for your next idea.</ItemDescription></ItemContent><ItemActions><Button variant="outline" size="sm" @click="itemOpened = !itemOpened">{{ itemOpened ? 'Opened' : 'Open' }}</Button></ItemActions></Item>`,
        `const itemOpened = ref(false)`,
    ),
    Button: ex(
        `<Button variant="primary" @click="buttonClicks++">Make it happen · {{ buttonClicks }}</Button>`,
        `const buttonClicks = ref(0)`,
    ),
    Anchor: ex(
        `<Anchor href="#example" variant="accent" animation="slide" @click.prevent>Open your workspace</Anchor>`,
    ),
    Code: ex(`<Code prefix="$" prefix-variant="accent" copyable>npm install @rat.md/miru</Code>`),
    Kbd: ex(`<KbdGroup><Kbd>Ctrl</Kbd><span>+</span><Kbd>K</Kbd></KbdGroup>`, '', ['KbdGroup']),
    ButtonAction: ex(`<ButtonAction variant="outline" aria-label="Add an item">+</ButtonAction>`),
    ButtonGroup: ex(
        `<ButtonGroup><Button variant="outline">Save draft</Button><Button variant="primary">Publish</Button></ButtonGroup>`,
    ),
    ButtonShadow: ex(
        `<ButtonShadow variant="primary" label="Create project" title="Create project">+</ButtonShadow>`,
    ),
    Accordion: ex(
        `<Accordion type="single" collapsible><AccordionItem value="details"><AccordionHeader><AccordionTrigger>What makes Miru different?</AccordionTrigger></AccordionHeader><AccordionContent>Reusable Vue components, expressive forms and application layouts. One consistent system.</AccordionContent></AccordionItem><AccordionItem value="themes"><AccordionHeader><AccordionTrigger>Can I make it my own?</AccordionTrigger></AccordionHeader><AccordionContent>Yes. Override the --ui-* CSS tokens to customize the whole system.</AccordionContent></AccordionItem></Accordion>`,
    ),
    Alert: ex(
        `<Alert variant="success"><AlertTitle>Good things are happening.</AlertTitle><AlertDescription>Your workspace is ready to make your own.</AlertDescription></Alert>`,
    ),
    Attachment: ex(
        `<Attachment :item="{ id: 'brief', name: 'Design brief.pdf', mimeType: 'application/pdf', size: 248000, status: 'success' }" show-mime />`,
    ),
    AttachmentList: ex(
        `<AttachmentList v-model="attachmentFiles" removable sortable />`,
        `const attachmentFiles = ref([{id:'brief',name:'Design brief.pdf',size:248000,status:'success' as const},{id:'notes',name:'Workshop notes.txt',size:1200,status:'success' as const}])`,
    ),
    Avatar: ex(
        `<div class="row"><Avatar size="lg"><AvatarFallback>MR</AvatarFallback></Avatar><Avatar><AvatarFallback>JL</AvatarFallback></Avatar><Avatar><AvatarFallback>SK</AvatarFallback></Avatar></div>`,
    ),
    AvatarStack: ex(
        `<AvatarStack size="lg" :max="3" label="Project team"><Avatar v-for="name in ['AL', 'GH', 'AT', 'MH', 'LT']" :key="name"><AvatarFallback>{{ name }}</AvatarFallback></Avatar></AvatarStack>`,
    ),
    Spinner: ex(`<Spinner variant="primary" label="Loading projects" />`),
    Badge: ex(
        `<div class="row"><Badge variant="primary">Automatic</Badge><Badge variant="success" appearance="solid">Solid</Badge><Badge variant="danger" appearance="soft"><BadgePart>Alpha</BadgePart><BadgeSeparator /><BadgePart>Early preview</BadgePart></Badge></div>`,
    ),
    BadgeCopy: ex(`<BadgeCopy content="hello@miru.at" variant="outline" />`),
    Table: ex(
        `<Table class="w-full">
    <TableCaption class="sr-only">Monthly services, amounts in EUR</TableCaption>
    <TableHeader>
        <TableRow :hover="false">
            <TableHead>Service</TableHead>
            <TableHead>Status</TableHead>
            <TableHead align="center">Quantity</TableHead>
            <TableHead align="right">Date</TableHead>
            <TableHead align="right">Amount</TableHead>
        </TableRow>
    </TableHeader>
    <TableBody>
        <TableRow v-for="item in tableItems" :key="item.name">
            <TableCell class="font-medium">{{ item.name }}</TableCell>
            <TableCellBadge :value="item.status" :statuses="tableStatuses" />
            <TableCellCount :value="item.quantity" />
            <TableCellDateTime :value="item.date" display="date" />
            <TableCellMoney :value="item.amount" currency="EUR" />
        </TableRow>
    </TableBody>
    <TableFooter>
        <TableRow :hover="false">
            <TableCell :colspan="4">Total</TableCell>
            <TableCellMoney :value="158" currency="EUR" />
        </TableRow>
    </TableFooter>
</Table>`,
        `const tableStatuses = { paid: { label: 'Paid' }, open: { label: 'Open' } };
const tableItems = [
    { name: 'Hosting', status: 'paid', quantity: 1, date: '2026-11-24T12:00:00Z', amount: 29 },
    { name: 'Design', status: 'open', quantity: 3, date: '2026-11-25T12:00:00Z', amount: 120 },
    { name: 'Support', status: 'paid', quantity: 2, date: '2026-11-26T12:00:00Z', amount: 9 },
];`,
    ),
    Breadcrumb: ex(
        `<Breadcrumb><BreadcrumbList><BreadcrumbItem><BreadcrumbLink href="#">Workspace</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbLink href="#">Projects</BreadcrumbLink></BreadcrumbItem><BreadcrumbSeparator/><BreadcrumbItem><BreadcrumbPage>Miru</BreadcrumbPage></BreadcrumbItem></BreadcrumbList></Breadcrumb>`,
    ),
    Card: ex(
        `<Card><CardHeader><CardTitle>A space for your next idea.</CardTitle><CardDescription>Good things start with a little space.</CardDescription></CardHeader><CardContent><Input aria-label="Project name" placeholder="Give your idea a name" /></CardContent><CardFooter><Button variant="primary">Create project</Button></CardFooter></Card>`,
    ),
    CardChart: ex(
        `<CardChart title="A little momentum" description="Illustrative weekly activity" :empty="false" empty-label="No activity yet"><div class="demo-bars"><i v-for="height in [25, 48, 39, 68, 57, 86, 100]" :key="height" :style="{height: height + '%'}"/></div></CardChart>`,
    ),
    Carousel: ex(
        `<Carousel :items="['Ideas', 'Primitives', 'Something wonderful']" :height="180" :loop="true"><template #slide="{ item }"><div class="demo-tile">{{ item }}</div></template></Carousel>`,
    ),
    FilterBar: ex(
        `<FilterBar :items="[{key:'status',label:'Active',selected:true,removable:true},{key:'team',label:'Design',selected:true,removable:true}]" />`,
    ),
    Marker: ex(
        `<Marker><Badge variant="success">Ready</Badge><span>One small detail. A clearer interface.</span></Marker>`,
    ),
    Pagination: ex(`<Pagination :total="120" :items-per-page="10" :sibling-count="1" />`),
    Progress: ex(
        `<div class="stack"><Progress :model-value="progressValue" variant="primary" aria-label="Project completion"/><Button variant="outline" @click="progressValue = (progressValue + 10) % 110">Progress: {{ progressValue }}%</Button></div>`,
        `const progressValue = ref(60)`,
    ),
    Field: ex(
        `<Field><FieldLabel for="studio-name">Studio name</FieldLabel><Input id="studio-name" placeholder="Something wonderful"/><FieldDescription>A little name for your next big thing.</FieldDescription></Field>`,
    ),
    Form: ex(formTemplate, formSetup, formImports),
    FormSectionRenderer: ex(
        `<FormSectionRenderer :form="formController.form" :section="formSections[0]"/>`,
        formSetup,
        formImports,
    ),
    InputGroup: ex(
        `<InputGroup><InputGroupAddon><InputGroupText>https://</InputGroupText></InputGroupAddon><InputGroupInput aria-label="Website domain" placeholder="your-studio.design"/></InputGroup>`,
    ),
    Label: ex(
        `<div class="stack"><Label for="label-demo">Your next idea</Label><Input id="label-demo" placeholder="Make something wonderful"/></div>`,
    ),
    Calendar: ex(`<Calendar v-model="calendarValue"/>`, `const calendarValue = ref()`),
    Checkbox: ex(
        `<Checkbox v-model="checkboxValue" label="Make it unmistakably yours"/>`,
        `const checkboxValue = ref(true)`,
    ),
    CheckboxGroup: ex(
        `<CheckboxGroup v-model="checkboxChoices" :options="[{value:'vue',label:'Vue components'},{value:'forms',label:'Expressive forms'},{value:'layouts',label:'Application layouts'}]"/>`,
        `const checkboxChoices = ref(['vue'])`,
    ),
    ColorPicker: ex(
        `<div class="stack"><Label>Find your signature</Label><ColorPicker v-model="pickerColor" ariaLabel="Accent color"/><code>{{ pickerColor }}</code></div>`,
        `const pickerColor = ref('#df5d49')`,
    ),
    Combobox: ex(
        `<ComboboxField v-model="comboboxChoice" label="Choose a workspace" :options="[{value:'studio',label:'Design studio'},{value:'product',label:'Product team'},{value:'personal',label:'Personal projects'}]"/>`,
        `const comboboxChoice = ref('studio')`,
    ),
    EditorJson: ex(
        `<EditorJson v-model="jsonDocument" label="Project configuration"/>`,
        `const jsonDocument = ref(JSON.stringify({name: 'Miru', ready: true}, null, 2))`,
    ),
    EditorMarkdown: ex(
        `<EditorMarkdown v-model="markdownDocument" label="Project notes"/>`,
        `const markdownDocument = ref(['# Something wonderful', '', 'It starts with a **good idea**.'].join(String.fromCharCode(10)))`,
    ),
    Editor: ex(
        `<Editor v-model="richDocument"/>`,
        `const richDocument = ref('<h2>A good place to start.</h2><p>Your next idea belongs here.</p>')`,
    ),
    Input: ex(
        `<Input v-model="inputIdea" aria-label="Your idea" placeholder="Give your idea a name"/><p class="muted">{{ inputIdea }}</p>`,
        `const inputIdea = ref('Something wonderful')`,
    ),
    InputDateTime: ex(
        `<div style="display:grid;gap:1rem"><InputDateTime v-model="dateTimeValue"/><InputDateTime v-model="dateValue" mode="date"/><InputDateTime v-model="timeValue" mode="time"/><InputDateTime v-model="timeframeValue" mode="timeframe"/></div>`,
        `const dateTimeValue = ref('2026-11-17T12:30'); const dateValue = ref('2026-11-17'); const timeValue = ref('12:30'); const timeframeValue = ref({ start: '09:00', end: '17:00' })`,
    ),
    Slider: ex(
        `<Slider v-model="sliderValue" :step="5" :min-steps-between-thumbs="1" :thumb-labels="['Minimum', 'Maximum']" show-steps/><p>{{ sliderValue }}</p>`,
        `const sliderValue = ref([20, 80])`,
    ),
    EditorFrame: ex(
        `<EditorFrame v-model="frameText" label="Notes" counter/>`,
        `const frameText = ref('A shared place for your next idea.')`,
    ),
    InputFile: ex(`<InputFile aria-label="Choose a project file"/>`),
    InputNumber: ex(
        `<InputNumber v-model="numberValue" :min="1" :max="50"><InputNumberContent><InputNumberDecrement/><InputNumberInput aria-label="Team size"/><InputNumberIncrement/></InputNumberContent></InputNumber>`,
        `const numberValue = ref(5)`,
    ),
    InputPin: ex(
        `<InputPin v-model="pinValue" :maxlength="6"><InputPinGroup><InputPinSlot v-for="index in 6" :key="index" :index="index - 1"/></InputPinGroup></InputPin>`,
        `const pinValue = ref('')`,
    ),
    InputPassword: ex(
        `<InputPassword v-model="passwordValue" aria-label="Password" placeholder="A little secret"/>`,
        `const passwordValue = ref('something-secret')`,
    ),
    InputPhone: ex(
        `<InputPhone v-model="phoneValue" :countries="[]" country-code-label="Calling code" placeholder="Your phone number"/>`,
        `const phoneValue = ref('')`,
    ),
    InputSearch: ex(
        `<InputSearch v-model="searchValue" aria-label="Search projects" placeholder="Find your next idea…"/><p class="muted">{{ searchValue || 'Start typing to explore.' }}</p>`,
        `const searchValue = ref('')`,
    ),
    InputTags: ex(
        `<InputTags v-model="tagValues"><InputTagsItem v-for="tag in tagValues" :key="tag" :value="tag"><InputTagsItemText/><InputTagsItemDelete/></InputTagsItem><InputTagsInput placeholder="Add a tag"/></InputTags>`,
        `const tagValues = ref(['Vue', 'Design'])`,
    ),
    RadioBox: ex(
        `<RadioGroup v-model="radioChoice"><RadioBox value="studio" label="Design studio"/><RadioBox value="product" label="Product team"/></RadioGroup>`,
        `const radioChoice = ref('studio')`,
    ),
    RadioGroup: ex(
        `<RadioGroup v-model="radioGroupChoice"><div class="row"><RadioGroupItem id="radio-idea" value="idea"/><Label for="radio-idea">A good idea</Label></div><div class="row"><RadioGroupItem id="radio-interface" value="interface"/><Label for="radio-interface">A great interface</Label></div></RadioGroup>`,
        `const radioGroupChoice = ref('idea')`,
    ),
    Select: ex(
        `<Select v-model="selectChoice"><SelectTrigger aria-label="Workspace type"><SelectValue placeholder="Choose a workspace"/></SelectTrigger><SelectContent><SelectItem value="studio">Design studio</SelectItem><SelectItem value="product">Product team</SelectItem><SelectItem value="personal">Personal projects</SelectItem></SelectContent></Select>`,
        `const selectChoice = ref('studio')`,
    ),
    Switch: ex(
        `<div class="row"><Switch id="inspiration" v-model="switchValue" variant="success"/><Label for="inspiration">A little inspiration</Label></div>`,
        `const switchValue = ref(true)`,
    ),
    Textarea: ex(
        `<Textarea v-model="notesValue" aria-label="Project notes" placeholder="Every good idea starts somewhere."/>`,
        `const notesValue = ref('Small details. Better interfaces.')`,
    ),
    Toggle: ex(
        `<Toggle v-model="toggleValue" aria-label="Bold text">Bold</Toggle>`,
        `const toggleValue = ref(false)`,
    ),
    ToggleGroup: ex(
        `<ToggleGroup v-model="toggleChoices" type="multiple"><ToggleGroupItem value="bold" aria-label="Bold">B</ToggleGroupItem><ToggleGroupItem value="italic" aria-label="Italic">I</ToggleGroupItem><ToggleGroupItem value="underline" aria-label="Underline">U</ToggleGroupItem></ToggleGroup>`,
        `const toggleChoices = ref(['bold'])`,
    ),
    UploadZone: ex(
        `<UploadZone title="Drop your next big idea here" description="Or choose a file to get started."/>`,
    ),
    CalendarBooking: ex(
        `<CalendarBooking v-model:date="bookingDate" :show-slots="false"/><p class="muted">{{ bookingDate || 'Pick a day to make something good.' }}</p>`,
        `const bookingDate = ref(null)`,
    ),
    Command: ex(
        `<Command :items="[{value:'create',label:'Create a workspace',description:'A fresh canvas for your next idea',group:'Workspace'},{value:'themes',label:'Explore themes',description:'Find your signature',group:'Design'}]" label="Find a command" @select="commandSelection = $event.label"/><p class="muted">{{ commandSelection }}</p>`,
        `const commandSelection = ref('Choose a command above.')`,
    ),
    DataTable: ex(
        `<DataTable table-key="playground-projects" :list="tableList" :columns="tableColumns" :searchable="false" pagination-position="none"/>`,
        `const tableColumns = [{accessorKey:'name',header:'Project'},{accessorKey:'status',header:'Status'}]
const tableList = {results:{data:[{id:1,name:'Miru website',status:'In progress'},{id:2,name:'Design system',status:'Ready'},{id:3,name:'Your next idea',status:'Up next'}],current_page:1,first_page:1,last_page:1,per_page:10,total:3,from:1,to:3,path:'#',links:[],first_page_url:null,last_page_url:null,prev_page_url:null,next_page_url:null},state:{page:1,per_page:10,order_by:'name',order:'ASC' as const,search:null},filters:{},config:{filters:{},actions:[],searchable:[],sortable:[]}}`,
    ),
    Description: ex(
        `<Description title="A little context" description="Small details help people make confident choices."/>`,
    ),
    Dialog: ex(
        `<Dialog><DialogTrigger as-child><Button variant="primary">Open a dialog</Button></DialogTrigger><DialogContent close-label="Close"><DialogTitle>A space for your next idea.</DialogTitle><DialogDescription>Compose real Miru components into a focused interaction.</DialogDescription><Input aria-label="Project name" placeholder="Give it a name"/><DialogFooter><DialogClose as-child><Button variant="primary">Looks good</Button></DialogClose></DialogFooter></DialogContent></Dialog>`,
    ),
    Drawer: ex(
        `<Drawer><DrawerTrigger as-child><Button variant="outline">Open a drawer</Button></DrawerTrigger><DrawerContent><DrawerHeader><DrawerTitle>A little more room.</DrawerTitle><DrawerDescription>Your ideas, within reach.</DrawerDescription></DrawerHeader><DrawerFooter><DrawerClose as-child><Button variant="primary">Done</Button></DrawerClose></DrawerFooter></DrawerContent></Drawer>`,
    ),
    Overlay: ex(
        `<Button variant="primary" @click="overlayVisible = true">Open an overlay</Button><Overlay v-model:open="overlayVisible" title="Your next great interface" description="A responsive surface for focused work."><p>Compose your content here.</p></Overlay>`,
        `const overlayVisible = ref(false)`,
    ),
    OverlayChoice: ex(
        `<OverlayChoice title="Ready to begin?" description="Create a little space for your next big idea." trigger-label="Make a choice" :close-on-confirm="true"/>`,
    ),
    OverlayDetails: ex(
        `<Button variant="outline" @click="detailsVisible = true">View details</Button><OverlayDetails v-model:open="detailsVisible" title="Project configuration" :sections="[{id:'project',label:'Project',language:'json',value:{name:'Miru',ready:true}}]"/>`,
        `const detailsVisible = ref(false)`,
    ),
    OverlayNotice: ex(
        `<Button variant="primary" @click="noticeVisible = true">Show a notice</Button><OverlayNotice v-model:open="noticeVisible" title="All set." description="Your workspace is ready to make your own."/>`,
        `const noticeVisible = ref(false)`,
    ),
    Popover: ex(
        `<Popover><PopoverTrigger as-child><Button variant="outline">A little more detail</Button></PopoverTrigger><PopoverContent><h3>Your signature.</h3><p class="muted">The small choices that make an interface yours.</p></PopoverContent></Popover>`,
    ),
    Schedule: ex(`<Schedule :events="[]" readonly/>`),
    Sheet: ex(
        `<Sheet><SheetTrigger as-child><Button variant="outline">Open settings</Button></SheetTrigger><SheetContent><SheetHeader><SheetTitle>Make it yours.</SheetTitle><SheetDescription>A little space for your preferences.</SheetDescription></SheetHeader><div class="stack"><Label for="sheet-studio">Studio name</Label><Input id="sheet-studio" placeholder="Your studio"/></div></SheetContent></Sheet>`,
    ),
    Tabs: ex(
        `<Tabs v-model="tabValue" :tabs="[{value:'overview',label:'Overview'},{value:'details',label:'Details'},{value:'activity',label:'Activity'}]"><template #overview><p>A clear starting point.</p></template><template #details><p>The little things that matter.</p></template><template #activity><p>A little momentum goes a long way.</p></template></Tabs>`,
        `const tabValue = ref('overview')`,
    ),
    Toast: ex(
        `<Toast/><Button variant="primary" @click="toast.success('Something wonderful is ready.')">Show a toast</Button>`,
        '',
        ['toast'],
    ),
    Tooltip: ex(
        `<TooltipProvider><Tooltip><TooltipTrigger as-child><Button variant="outline">A little hint</Button></TooltipTrigger><TooltipContent>Good details make a difference.</TooltipContent></Tooltip></TooltipProvider>`,
    ),
    FloatingAppBar: ex(
        `<FloatingAppBar label="Project actions"><template #primary><ButtonShadow label="Create project">+</ButtonShadow></template><template #left><Button variant="ghost">Save</Button></template><template #right><Button variant="ghost">Preview</Button></template></FloatingAppBar>`,
    ),
    ApexChart: ex(
        `<ApexChart type="area" :height="240" :series="[{name:'Ideas',data:[12,24,18,38,30,52,68]}]" :options="{chart:{toolbar:{show:false},background:'transparent'},colors:['#df5d49'],xaxis:{categories:['Mon','Tue','Wed','Thu','Fri','Sat','Sun']},dataLabels:{enabled:false},stroke:{curve:'smooth'}}"/>`,
    ),
    AspectRatio: ex(
        `<AspectRatio :ratio="16/9"><div class="demo-tile">A little perspective. 16 : 9</div></AspectRatio>`,
    ),
    CodePanel: ex(
        `<CodePanel :value="{name:'Miru',framework:'Vue 3',ready:true}" language="json"/>`,
    ),
    Collapsible: ex(
        `<Collapsible><CollapsibleTrigger as-child><Button variant="outline">Show the little details</Button></CollapsibleTrigger><CollapsibleContent><Card><CardContent>A good interface has room for the details.</CardContent></Card></CollapsibleContent></Collapsible>`,
    ),
    Copy: ex(
        `<Copy content="npm install @rat.md/miru"><Button as="span" variant="outline">Copy the install command</Button></Copy>`,
    ),
    DropdownMenu: ex(
        `<DropdownMenu><DropdownMenuTrigger as-child><Button variant="outline">Project actions</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuLabel>Your workspace</DropdownMenuLabel><DropdownMenuSeparator/><DropdownMenuItem>New project</DropdownMenuItem><DropdownMenuItem>Workspace settings</DropdownMenuItem><DropdownMenuItem>Invite your team</DropdownMenuItem></DropdownMenuContent></DropdownMenu>`,
    ),
    ScrollArea: ex(
        `<ScrollArea style="height:220px"><div class="stack"><Card v-for="index in 12" :key="index"><CardContent>Idea {{ index }} · Something wonderful</CardContent></Card></div></ScrollArea>`,
    ),
    Separator: ex(
        `<div class="stack"><h3>Small details.</h3><Separator/><p class="muted">Better interfaces.</p></div>`,
    ),
    Skeleton: ex(
        `<div class="stack"><Skeleton style="width:60px;height:60px;border-radius:50%"/><Skeleton style="width:70%;height:18px"/><Skeleton style="width:100%;height:14px"/><Skeleton style="width:85%;height:14px"/></div>`,
    ),
    FormLayout: ex(
        `<FormLayout :tabs="[{value:'profile',label:'Profile'},{value:'preferences',label:'Preferences'}]" primary-label="Save changes" secondary-label="Reset" actions-label="Workspace actions"><template #header><div><h2>Your studio.</h2><p class="muted">A home for your next idea.</p></div></template><template #default="{ tab }"><Card><CardHeader><CardTitle>{{ tab?.label || 'Profile' }}</CardTitle><CardDescription>Make this workspace feel like you.</CardDescription></CardHeader><CardContent><div class="stack"><Field><FieldLabel for="layout-name">Studio name</FieldLabel><Input id="layout-name" placeholder="Something wonderful"/></Field><div class="row"><Switch id="layout-updates"/><Label for="layout-updates">A little inspiration</Label></div></div></CardContent></Card></template></FormLayout>`,
    ),
    AuthPage: ex(
        `<AuthPage title="Welcome back" description="Sign in to your workspace." :full-height="false"><form class="stack" @submit.prevent="signedIn = true"><Field><FieldLabel for="auth-email">Email</FieldLabel><Input id="auth-email" v-model="authEmail" type="email" required /></Field><Field><FieldLabel for="auth-password">Password</FieldLabel><InputPassword id="auth-password" v-model="authPassword" required /></Field><Button type="submit" variant="primary">Sign in</Button><p v-if="signedIn" role="status">Local preview. Connect your authentication endpoint.</p></form></AuthPage>`,
        `const authEmail = ref('')\nconst authPassword = ref('')\nconst signedIn = ref(false)`,
    ),
    DashboardPage: ex(
        `<DashboardPage title="Your workspace" description="A place for your next idea." :navigation="[{ id: 'workspace', label: 'Workspace', items: [{ id: 'projects', label: 'Projects', href: '#projects', active: true }, { id: 'team', label: 'Team', href: '#team' }] }]" style="height: 480px"><Card><CardHeader><CardTitle>Projects</CardTitle><CardDescription>Your content belongs here.</CardDescription></CardHeader><CardContent><Button variant="primary" @click="projectCount++">Create project</Button><p role="status">{{ projectCount }} projects in this local demo.</p></CardContent></Card></DashboardPage>`,
        `const projectCount = ref(0)`,
    ),
    PageRoot: ex(
        `<Card><CardHeader><CardTitle>A shared foundation.</CardTitle><CardDescription>The playground already mounts one PageRoot around your preview.</CardDescription></CardHeader><CardContent><Button variant="primary">Ready to build</Button></CardContent></Card>`,
    ),
    ContextProvider: ex(`<ContextProvider locale="de"><Calendar/></ContextProvider>`),
    SortableImageGallery: ex(
        `<SortableImageGallery v-model="galleryImages"/>`,
        `const galleryImages = ref([])`,
    ),
};
examples.ComboboxField = examples.Combobox;

export const exampleStyles = `.stack { display: flex; flex-direction: column; gap: 16px; }
.row { display: flex; align-items: center; flex-wrap: wrap; gap: 12px; }
.muted { color: var(--ui-muted-foreground); font-size: 14px; }
.demo-tile { display: grid; place-items: center; min-height: 180px; height: 100%; padding: 24px; border-radius: var(--ui-radius); background: var(--ui-muted); font-size: 24px; }
.demo-bars { height: 160px; display: flex; gap: 12px; align-items: end; }
.demo-bars i { flex: 1; background: var(--ui-primary); border-radius: 6px 6px 0 0; }
h2, h3 { margin: 0; }`;

export function importsFor(example: Example) {
    return [
        ...new Set([
            ...Array.from(example.template.matchAll(/<\/?([A-Z]\w*)/g), (match) => match[1]),
            ...(example.imports || []),
        ]),
    ];
}
export function exampleSource(name: string, fallbackName?: string) {
    const example = examples[name] || (fallbackName ? examples[fallbackName] : undefined);
    if (!example)
        return `<template>\n  <p>This primitive is designed to be composed with its parent. Choose a related component to start a complete example.</p>\n</template>`;
    const helpers = ['ref', 'computed', 'h', 'defineComponent'].filter((name) =>
        new RegExp(`\\b${name}\\(`).test(example.setup || ''),
    );
    const vueImports = helpers.length ? `import { ${helpers.join(', ')} } from 'vue'\n` : '';
    const formImport = example.setup?.includes('useForm(')
        ? `import { useForm } from '@rat.md/miru/composables'\nimport { z } from 'zod'\n`
        : '';
    const styles = exampleStyles
        .split(/(?<=\})\s*/)
        .filter((rule) => {
            const className = rule.match(/^\.(\w[\w-]*)/)?.[1];
            return className
                ? new RegExp(`class=["'][^"']*\\b${className}\\b`).test(example.template)
                : /<h[23]\b/.test(example.template);
        })
        .join('\n');
    return `<template>\n${example.template}\n</template>\n\n<script setup lang="ts">\n${vueImports}import { ${importsFor(example).join(', ')} } from '@rat.md/miru'\n${formImport}${example.setup ? '\n' + example.setup + '\n' : ''}</script>\n${styles ? `\n<style scoped>\n${styles}\n</style>\n` : ''}`;
}

export const workspaceSource = `<script setup lang="ts">
import { ref } from 'vue'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter, Field, FieldLabel, Input, Switch, Label, Button, Badge } from '@rat.md/miru'
const studioName = ref('Something wonderful')
const inspiration = ref(true)
const created = ref(false)
</script>

<template>
  <Card>
    <CardHeader>
      <Badge variant="outline">YOUR NEXT BIG THING</Badge>
      <CardTitle>A space for your next idea.</CardTitle>
      <CardDescription>Real Miru components. A little room to play.</CardDescription>
    </CardHeader>
    <CardContent>
      <div class="stack">
        <Field>
          <FieldLabel for="studio">Studio name</FieldLabel>
          <Input id="studio" v-model="studioName" />
        </Field>
        <div class="row">
          <Switch id="inspiration" v-model="inspiration" variant="success" />
          <Label for="inspiration">A little inspiration</Label>
        </div>
      </div>
    </CardContent>
    <CardFooter>
      <Button variant="primary" @click="created = !created">
        {{ created ? 'You made it happen.' : 'Create workspace' }}
      </Button>
    </CardFooter>
  </Card>
</template>

<style scoped>
${exampleStyles}
</style>`;

export function tokenStyles(accent?: string, radius = 10) {
    const colors = accent
        ? Object.entries(palette(accent))
              .map(
                  ([step, color]) =>
                      `  --ui-primary-${step}: ${color};\n  --miru-ink-primary-${step}: ${ink(color)};`,
              )
              .join('\n')
        : '';
    return `/* Inherits the website palette. Override Miru tokens here to experiment. */\n:root, :root.dark {\n${colors}\n  --ui-radius: ${radius}px;\n}`;
}


