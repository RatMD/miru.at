<template>
    <div class="customer-page" :style="{ '--customer-color': values.color }">
        <FormLayout
            v-model="active"
            :tabs="tabs"
            :loading="loading"
            :additional-actions="actions"
            navigation-label="Customer sections"
            actions-label="Customer actions"
            primary-label="Save customer"
            secondary-label="Discard changes"
            primary-variant="success"
            @submit="save"
            @secondary="discard"
            @action="runAction">
            <template #header>
                <header class="customer-header">
                    <Breadcrumb class="customer-breadcrumb">
                        <BreadcrumbList>
                            <BreadcrumbItem>
                                <BreadcrumbLink as="span">Online store</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbLink as="span">Customers</BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator />
                            <BreadcrumbItem>
                                <BreadcrumbPage>{{ values.number }}</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div class="customer-heading">
                        <div class="customer-identity">
                            <Avatar
                                size="lg"
                                shape="squircle"
                                tone="outline"
                                class="customer-avatar"
                                aria-hidden="true">
                                <AvatarFallback>{{ initials }}</AvatarFallback>
                            </Avatar>
                            <div>
                                <div class="customer-title">
                                    <h1>
                                        {{ values.firstName || 'New' }}
                                        {{ values.lastName || 'customer' }}
                                    </h1>
                                    <Badge
                                        :variant="
                                            values.blocked
                                                ? 'danger'
                                                : values.status === 'active'
                                                  ? 'success'
                                                  : 'outline'
                                        ">
                                        {{
                                            values.blocked
                                                ? 'Blocked'
                                                : values.status === 'active'
                                                  ? 'Active customer'
                                                  : values.status === 'invited'
                                                    ? 'Invitation pending'
                                                    : 'Inactive customer'
                                        }}
                                    </Badge>
                                </div>
                                <p>Thoughtful details. A more personal customer experience.</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" type="button" @click="discard">
                            Discard changes
                        </Button>
                    </div>
                    <section class="customer-summary" aria-label="Customer overview">
                        <Card>
                            <CardHeader>
                                <CardDescription>Customer since</CardDescription>
                                <CardTitle class="text-base">March 2024</CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardDescription>Lifetime value</CardDescription>
                                <CardTitle class="text-base">
                                    €2,840.00
                                    <span class="text-xs font-normal text-muted-foreground">
                                        · 12 orders
                                    </span>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                        <Card>
                            <CardHeader>
                                <CardDescription>Relationship</CardDescription>
                                <CardTitle class="text-base">
                                    {{
                                        values.group === 'vip'
                                            ? 'VIP customer'
                                            : values.group === 'wholesale'
                                              ? 'Wholesale partner'
                                              : 'Standard customer'
                                    }}
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    </section>
                    <Alert
                        v-if="values.blocked"
                        variant="danger"
                        appearance="soft"
                        role="status"
                        class="customer-notice">
                        <AlertTitle>This customer is blocked.</AlertTitle>
                        <AlertDescription>
                            Account access is paused. Use “Unblock customer” to restore it.
                        </AlertDescription>
                    </Alert>
                    <Alert
                        v-if="feedback"
                        :variant="feedbackVariant"
                        appearance="soft"
                        role="status"
                        dismissable
                        class="customer-notice"
                        @dismiss="feedback = ''">
                        <AlertDescription>{{ feedback }}</AlertDescription>
                    </Alert>
                    <Alert
                        v-if="formError"
                        variant="danger"
                        appearance="soft"
                        class="customer-notice">
                        <AlertTitle>Could not save customer</AlertTitle>
                        <AlertDescription>{{ formError }}</AlertDescription>
                    </Alert>
                </header>
            </template>
            <template #default="{ tab }">
                <FormSectionRenderer :form="form" :section="sectionFor(tab?.value)">
                    <template v-if="tab?.value === 'addresses'" #actions>
                        <Button type="button" variant="outline" size="sm" @click="addAddress">
                            <PlusIcon class="size-4" />
                            Add address
                        </Button>
                    </template>
                    <template #custom="{ definition, field }">
                        <Field v-if="definition.slot === 'color'">
                            <FieldLabel for="customer-color">Customer colour</FieldLabel>
                            <ColorPicker
                                id="customer-color"
                                :model-value="field.state.value"
                                ariaLabel="Customer colour"
                                :swatches="['#6757df', '#14b8a6', '#e879a5', '#e9a23b', '#488cda']"
                                @update:model-value="field.handleChange($event || '#6757df')"
                                @blur="field.handleBlur()" />
                            <FieldDescription>
                                A personal accent for their customer profile.
                            </FieldDescription>
                        </Field>
                        <div v-else-if="definition.slot === 'addresses'" class="customer-addresses">
                            <FormRepeater
                                :items="field.state.value"
                                :item-key="addressKey"
                                hide-add
                                :remove-label="literal('Remove address')"
                                :empty-label="
                                    literal(
                                        'No addresses yet. Add their first delivery destination.',
                                    )
                                "
                                accordion
                                @add="addAddress"
                                @remove="removeAddress">
                                <template #title="{ item, index }">
                                    <div class="customer-address-title">
                                        <span>
                                            <strong>
                                                {{ item.recipient || `Address ${index + 1}` }}
                                            </strong>
                                            <small>
                                                {{
                                                    [item.street, item.houseNumber, item.city]
                                                        .filter(Boolean)
                                                        .join(' · ') || 'Add the details below'
                                                }}
                                            </small>
                                        </span>
                                        <Badge v-if="item.primary" variant="ghostly">Primary</Badge>
                                        <Badge v-if="item.type === 'billing'" variant="outline">
                                            Billing
                                        </Badge>
                                    </div>
                                </template>
                                <template #item="{ index }">
                                    <FormSectionRenderer
                                        :key="values.addresses[index]!.id"
                                        :form="form"
                                        :section="addressSection(index)">
                                        <template #custom="{ field: addressField }">
                                            <Field orientation="horizontal">
                                                <Switch
                                                    :id="`primary-${index}`"
                                                    :model-value="Boolean(addressField.state.value)"
                                                    @update:model-value="
                                                        setPrimary(index, Boolean($event))
                                                    " />
                                                <div>
                                                    <FieldLabel :for="`primary-${index}`">
                                                        Use as primary address
                                                    </FieldLabel>
                                                    <FieldDescription>
                                                        The default destination for this customer.
                                                    </FieldDescription>
                                                </div>
                                            </Field>
                                        </template>
                                    </FormSectionRenderer>
                                </template>
                            </FormRepeater>
                        </div>
                    </template>
                    <template v-if="tab?.value === 'settings'" #after>
                        <Alert variant="info" appearance="soft">
                            <AlertTitle>A little care goes a long way.</AlertTitle>
                            <AlertDescription>
                                Use the check-in calendar to plan a personal follow-up. Their
                                preferences help you make every interaction feel familiar.
                            </AlertDescription>
                        </Alert>
                    </template>
                </FormSectionRenderer>
            </template>
            <template #additional-actions>
                <div class="customer-action-note">
                    <span class="customer-note-dot"></span>
                    <p>
                        Demo customer
                        <br />
                        <small>Changes stay in this preview.</small>
                    </p>
                </div>
            </template>
        </FormLayout>
    </div>
</template>
<script setup lang="ts">
import type { FormSectionDefinition } from '@rat.md/miru';
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Avatar,
    AvatarFallback,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
    Card,
    CardHeader,
    CardTitle,
    CardDescription,
    Badge,
    Button,
    ColorPicker,
    Field,
    FieldDescription,
    FieldLabel,
    FormLayout,
    FormRepeater,
    FormSectionRenderer,
    Switch,
    defineFormSections,
    literal,
} from '@rat.md/miru';
import { useForm } from '@rat.md/miru/composables';
import { computed, defineComponent, h, ref } from 'vue';
import { z } from 'zod';

// Icons are inline so this self-contained example needs only Vue, miru. and Zod.
const icon = (path: string) =>
    defineComponent({
        setup: () => () =>
            h(
                'svg',
                {
                    viewBox: '0 0 24 24',
                    fill: 'none',
                    stroke: 'currentColor',
                    'stroke-width': 1.6,
                    'aria-hidden': true,
                },
                [h('path', { d: path })],
            ),
    });
const PlusIcon = icon('M12 5v14M5 12h14');
const UserIcon = icon('M20 21v-2a7 7 0 0 0-14 0v2M17 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0');
const DetailsIcon = icon('M4 4h16v16H4zM8 9h3m-3 6h8m-3-6h3');
const SettingsIcon = icon('M4 7h16M4 17h16M9 4v6m6 4v6');
const AddressIcon = icon(
    'M20 10c0 6-8 11-8 11S4 16 4 10a8 8 0 1 1 16 0ZM15 10a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
);
const LockIcon = icon('M5 10h14v11H5zM8 10V6a4 4 0 0 1 8 0v4');
const active = ref('general');
const feedback = ref('');
const feedbackVariant = ref<'success' | 'info' | 'warning'>('info');
const addressSchema = z.object({
    id: z.string(),
    primary: z.boolean(),
    type: z.enum(['contact', 'billing', 'shipping']),
    label: z.string(),
    recipient: z.string().trim().min(1, 'Enter a recipient name.'),
    company: z.string(),
    street: z.string().trim().min(1, 'Enter a street.'),
    houseNumber: z.string().trim().min(1, 'Enter a house number.'),
    addition: z.string(),
    postalCode: z.string().trim().min(1, 'Enter a postal code.'),
    city: z.string().trim().min(1, 'Enter a city.'),
    country: z.string().min(1),
    state: z.string(),
    phone: z.string(),
});
const schema = z
    .object({
        status: z.enum(['active', 'invited', 'inactive']),
        number: z.string(),
        group: z.enum(['standard', 'vip', 'wholesale']),
        language: z.string().min(1),
        username: z.string().trim().min(3, 'Use at least three characters.'),
        email: z.email('Enter a valid email address.'),
        password: z
            .string()
            .refine((value) => !value || value.length >= 10, 'Use at least 10 characters.'),
        confirmPassword: z.string(),
        company: z.string(),
        salutation: z.string(),
        title: z.string(),
        firstName: z.string().trim().min(1, 'Enter a first name.'),
        lastName: z.string().trim().min(1, 'Enter a last name.'),
        birthday: z.string(),
        phone: z.string(),
        mobile: z.string(),
        website: z.union([z.literal(''), z.url('Enter a complete website URL.')]),
        taxNumber: z.string(),
        registrationNumber: z.string(),
        vatId: z.string(),
        color: z.string().regex(/^#[\da-f]{6}$/i, 'Choose a valid hex colour.'),
        currency: z.string().min(1),
        newsletterEmail: z.union([z.literal(''), z.email('Enter a valid newsletter email.')]),
        chargeVat: z.boolean(),
        newsletter: z.boolean(),
        smsUpdates: z.boolean(),
        preferredContact: z.enum(['email', 'phone', 'none']),
        nextCheckIn: z.string(),
        notes: z.string().max(500, 'Keep notes under 500 characters.'),
        blocked: z.boolean(),
        addresses: z.array(addressSchema),
    })
    .refine((value) => value.password === value.confirmPassword, {
        message: 'The passwords do not match.',
        path: ['confirmPassword'],
    });
type Customer = z.infer<typeof schema>;
const initial: Customer = {
    status: 'active',
    number: 'CUS-10025',
    group: 'vip',
    language: 'en',
    username: 'alex.morgan',
    email: 'alex@example.com',
    password: '',
    confirmPassword: '',
    company: 'North & Meadow Studio',
    salutation: 'none',
    title: '',
    firstName: 'Alex',
    lastName: 'Morgan',
    birthday: '1992-06-18',
    phone: '+31 20 555 0142',
    mobile: '+31 6 1234 5678',
    website: 'https://example.com',
    taxNumber: '',
    registrationNumber: '12345678',
    vatId: 'NL123456789B01',
    color: '#6757df',
    currency: 'EUR',
    newsletterEmail: 'alex@example.com',
    chargeVat: true,
    newsletter: true,
    smsUpdates: false,
    preferredContact: 'email',
    nextCheckIn: '',
    notes: 'Prefers considered, minimal packaging. A handwritten note is always appreciated.',
    blocked: false,
    addresses: [
        {
            id: 'address-1',
            primary: true,
            type: 'billing',
            label: 'Studio',
            recipient: 'Alex Morgan',
            company: 'North & Meadow Studio',
            street: 'Prinsengracht',
            houseNumber: '142',
            addition: 'Studio 2',
            postalCode: '1015 EB',
            city: 'Amsterdam',
            country: 'NL',
            state: 'North Holland',
            phone: '+31 20 555 0142',
        },
    ],
};
let savedCustomer = structuredClone(initial);
let addressSequence = 1;
const { form, loading, formError, submitForm } = useForm({
    schema,
    initialValues: structuredClone(initial),
    submit: '/demo/customer',
    // Local adapter: validate and save a snapshot without making a request.
    adapter: {
        submit: async ({ values: submitted }) => ({ status: 'success', result: submitted }),
    },
    onSuccess: ({ values: submitted }) => {
        feedbackVariant.value = 'success';
        savedCustomer = structuredClone({ ...submitted, password: '', confirmPassword: '' });
        form.reset(structuredClone(savedCustomer));
        feedback.value =
            'Customer saved. You’re all up to date — changes are kept in this preview.';
    },
});
const values = form.useStore((state) => state.values);
const initials = computed(
    () =>
        `${values.value.firstName.charAt(0)}${values.value.lastName.charAt(0)}`.toUpperCase() ||
        'CU',
);
const options = (items: [string, string][]) =>
    items.map(([value, label]) => ({ value, label: literal(label) }));
const input = (name: string, label: string, span = 6, extra = {}) => ({
    type: 'input' as const,
    name,
    label: literal(label),
    span: span as 4 | 6 | 8 | 12,
    showValidation: true,
    ...extra,
});
const select = (name: string, label: string, items: [string, string][], span = 6) => ({
    type: 'select' as const,
    name,
    label: literal(label),
    span: span as 4 | 6,
    options: options(items),
});
const sections = defineFormSections([
    {
        id: 'general',
        label: literal('General'),
        title: literal('General data'),
        description: literal('Account access, customer assignment and a few essentials.'),
        icon: UserIcon,
        fields: [
            select(
                'status',
                'Account status',
                [
                    ['active', 'Active'],
                    ['invited', 'Invited'],
                    ['inactive', 'Inactive'],
                ],
                4,
            ),
            input('number', 'Customer number', 4, { disabled: true }),
            select(
                'group',
                'Customer group',
                [
                    ['standard', 'Standard'],
                    ['vip', 'VIP'],
                    ['wholesale', 'Wholesale'],
                ],
                4,
            ),
            select(
                'language',
                'Language',
                [
                    ['en', 'English'],
                    ['de', 'German'],
                    ['nl', 'Dutch'],
                    ['fr', 'French'],
                ],
                4,
            ),
            { type: 'spacer', span: 8 },
            input('username', 'Username', 6, { required: true, autocomplete: 'username' }),
            input('email', 'Email address', 6, {
                inputType: 'email',
                required: true,
                autocomplete: 'email',
            }),
            {
                type: 'header',
                id: 'security',
                title: literal('A little extra security'),
                description: literal('Leave both fields empty to keep the current password.'),
            },
            {
                type: 'password',
                name: 'password',
                label: literal('New password'),
                span: 6,
                autocomplete: 'new-password',
                showValidation: true,
            },
            {
                type: 'password',
                name: 'confirmPassword',
                label: literal('Confirm password'),
                span: 6,
                autocomplete: 'new-password',
                showValidation: true,
            },
        ],
    },
    {
        id: 'details',
        label: literal('Customer details'),
        title: literal('Customer details'),
        description: literal(
            'The person behind the order. Personal, business and contact information.',
        ),
        icon: DetailsIcon,
        fields: [
            input('company', 'Company name', 12),
            select(
                'salutation',
                'Salutation',
                [
                    ['none', 'No preference'],
                    ['ms', 'Ms'],
                    ['mr', 'Mr'],
                    ['mx', 'Mx'],
                ],
                4,
            ),
            input('title', 'Title', 4),
            { type: 'custom', name: 'color', slot: 'color', span: 4 },
            input('firstName', 'First name', 6, { required: true, autocomplete: 'given-name' }),
            input('lastName', 'Last name', 6, { required: true, autocomplete: 'family-name' }),
            {
                type: 'date',
                name: 'birthday',
                label: literal('Date of birth'),
                span: 4,
                placeholder: literal('Choose a birthday'),
                allowFuture: false,
            },
            input('phone', 'Phone', 4, { inputType: 'tel' }),
            input('mobile', 'Mobile phone', 4, { inputType: 'tel' }),
            input('website', 'Website', 12, { inputType: 'url', placeholder: literal('https://') }),
            {
                type: 'header',
                id: 'business',
                title: literal('Business details'),
                description: literal('Keep their billing and tax information in one place.'),
            },
            input('taxNumber', 'Tax number', 4),
            input('registrationNumber', 'Registration number', 4),
            input('vatId', 'VAT ID', 4),
        ],
    },
    {
        id: 'settings',
        label: literal('Settings'),
        title: literal('Preferences & care'),
        description: literal('Little preferences that make a big difference.'),
        icon: SettingsIcon,
        fields: [
            select(
                'currency',
                'Currency',
                [
                    ['EUR', 'EUR · Euro'],
                    ['USD', 'USD · US Dollar'],
                    ['GBP', 'GBP · British Pound'],
                ],
                4,
            ),
            input('newsletterEmail', 'Newsletter email', 8, { inputType: 'email' }),
            {
                type: 'switch',
                name: 'chargeVat',
                label: literal('Charge VAT'),
                description: literal('Apply VAT to this customer’s orders.'),
                span: 12,
            },
            {
                type: 'switch',
                name: 'newsletter',
                label: literal('Newsletter subscription'),
                description: literal('Keep them in the loop with news and thoughtful updates.'),
                span: 12,
            },
            {
                type: 'switch',
                name: 'smsUpdates',
                label: literal('SMS delivery updates'),
                description: literal('Send a short message when their order is on its way.'),
                span: 12,
            },
            {
                type: 'header',
                id: 'care',
                title: literal('Make it personal'),
                description: literal('Plan the next conversation and remember what matters.'),
            },
            select('preferredContact', 'Preferred contact', [
                ['email', 'Email'],
                ['phone', 'Phone call'],
                ['none', 'No marketing contact'],
            ]),
            {
                type: 'date',
                name: 'nextCheckIn',
                label: literal('Next personal check-in'),
                span: 6,
                allowFuture: true,
                placeholder: literal('Choose a date'),
            },
            {
                type: 'textarea',
                name: 'notes',
                label: literal('Internal notes'),
                placeholder: literal('Something worth remembering…'),
                rows: 4,
                maxLength: 500,
                counter: true,
                showValidation: true,
                span: 12,
            },
        ],
    },
    {
        id: 'addresses',
        label: literal('Addresses'),
        title: literal('Their places, all in one place.'),
        description: literal('Manage contact, billing and delivery addresses.'),
        icon: AddressIcon,
        fields: [{ type: 'custom', name: 'addresses', slot: 'addresses', span: 12 }],
    },
]);
const tabs = computed(() =>
    sections.map((section) => ({
        value: section.id,
        label: 'value' in section.label ? section.label.value : section.id,
        icon: section.icon,
        badge: section.id === 'addresses' ? values.value.addresses.length : undefined,
    })),
);
const actions = computed(() => [
    {
        id: 'block',
        label: values.value.blocked ? 'Unblock customer' : 'Block customer',
        variant: 'outline' as const,
        icon: LockIcon,
    },
]);
function sectionFor(id?: string) {
    return sections.find((section) => section.id === id) || sections[0]!;
}
function addressKey(address: Customer['addresses'][number]) {
    return address.id;
}
function addressSection(index: number): FormSectionDefinition {
    const name = (key: string) => `addresses[${index}].${key}`;
    return {
        id: `address-${index}`,
        label: literal('Address'),
        hideHeader: true,
        fields: [
            { type: 'custom', name: name('primary'), slot: 'primary', span: 12 },
            select(
                name('type'),
                'Address type',
                [
                    ['contact', 'Contact address'],
                    ['billing', 'Billing address'],
                    ['shipping', 'Shipping address'],
                ],
                6,
            ),
            input(name('label'), 'Address label', 6, {
                placeholder: literal('Home, office, studio…'),
            }),
            input(name('recipient'), 'Recipient name', 6, { required: true }),
            input(name('company'), 'Company name'),
            input(name('street'), 'Street', 8, { required: true }),
            input(name('houseNumber'), 'House number', 4, { required: true }),
            input(name('addition'), 'Address addition', 12),
            input(name('postalCode'), 'Postal code', 4, { required: true }),
            input(name('city'), 'City', 8, { required: true }),
            select(name('country'), 'Country', [
                ['NL', 'Netherlands'],
                ['DE', 'Germany'],
                ['BE', 'Belgium'],
                ['FR', 'France'],
                ['GB', 'United Kingdom'],
                ['US', 'United States'],
            ]),
            input(name('state'), 'State / province'),
            input(name('phone'), 'Contact phone', 12, { inputType: 'tel' }),
        ],
    };
}
function addAddress() {
    form.setFieldValue('addresses', [
        ...values.value.addresses,
        {
            id: `address-${++addressSequence}`,
            primary: values.value.addresses.length === 0,
            type: 'shipping',
            label: '',
            recipient: `${values.value.firstName} ${values.value.lastName}`.trim(),
            company: '',
            street: '',
            houseNumber: '',
            addition: '',
            postalCode: '',
            city: '',
            country: 'NL',
            state: '',
            phone: '',
        },
    ]);
    feedback.value = '';
}
function removeAddress(index: number) {
    const next = values.value.addresses.filter((_, itemIndex) => itemIndex !== index);
    if (next.length && !next.some((item) => item.primary)) next[0] = { ...next[0]!, primary: true };
    form.setFieldValue('addresses', next);
    feedbackVariant.value = 'info';
    feedback.value = 'Address removed. Save the customer to keep this change.';
}
function setPrimary(index: number, enabled: boolean) {
    form.setFieldValue(
        'addresses',
        values.value.addresses.map((address, itemIndex) => ({
            ...address,
            primary: enabled ? itemIndex === index : itemIndex === index ? false : address.primary,
        })),
    );
}
function runAction(id: string) {
    if (id !== 'block') return;
    form.setFieldValue('blocked', !values.value.blocked);
    feedbackVariant.value = 'success';
    feedback.value = values.value.blocked
        ? ''
        : 'Customer unblocked. Account access is restored in this demo.';
}
function discard() {
    form.reset(structuredClone(savedCustomer));
    formError.value = undefined;
    feedbackVariant.value = 'info';
    feedback.value = 'Unsaved changes discarded. Back to the last saved customer.';
}
async function save() {
    feedback.value = '';
    await submitForm();
    const result = schema.safeParse(form.state.values);
    if (!result.success) {
        const field = String(result.error.issues[0]?.path[0] || '');
        const section = sections.find((item) =>
            item.fields.some((definition) => 'name' in definition && definition.name === field),
        );
        if (section) active.value = section.id;
        feedbackVariant.value = 'warning';
        feedback.value =
            'A few details need your attention. Check the highlighted fields before saving.';
    }
}
</script>
<style scoped>
.customer-page {
    width: 100%;
    min-width: 0;
    padding: 8px;
    max-width: 1720px;
    margin: auto;
}
.customer-header {
    margin-bottom: 36px;
}
.customer-breadcrumb {
    margin-bottom: 28px;
}
.customer-heading,
.customer-identity,
.customer-title {
    display: flex;
    align-items: center;
    gap: 16px;
}
.customer-heading {
    justify-content: space-between;
    gap: 24px;
}
.customer-identity {
    min-width: 0;
}
.customer-avatar {
    background: color-mix(in srgb, var(--customer-color) 18%, var(--ui-background));
    color: var(--customer-color);
    border-color: color-mix(in srgb, var(--customer-color) 30%, transparent);
    font-weight: 600;
    transition:
        color 0.2s,
        background 0.2s;
}
.customer-title {
    flex-wrap: wrap;
    gap: 10px;
}
.customer-title h1 {
    margin: 0;
    font-size: clamp(23px, 3vw, 32px);
    font-weight: 600;
    letter-spacing: -0.045em;
    line-height: 1.2;
}
.customer-identity p {
    margin: 7px 0 0;
    color: var(--ui-muted-foreground);
    font-size: 12px;
}
.customer-summary {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-top: 26px;
}
.customer-notice {
    margin-top: 16px;
}
.customer-addresses {
    min-width: 0;
}
.customer-address-title {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    text-align: left;
}
.customer-address-title strong {
    display: block;
    font-size: 13px;
    font-weight: 550;
}
.customer-address-title small {
    display: block;
    color: var(--ui-muted-foreground);
    font-size: 11px;
    font-weight: 400;
    margin-top: 4px;
}
.customer-action-note {
    display: flex;
    align-items: flex-start;
    gap: 8px;
    padding-top: 4px;
}
.customer-action-note p {
    margin: 0;
    font-size: 11px;
    line-height: 1.8;
    color: var(--ui-muted-foreground);
}
.customer-action-note small {
    font-size: 10px;
}
.customer-note-dot {
    width: 5px;
    height: 5px;
    margin-top: 7px;
    border-radius: 50%;
    background: var(--ui-accent-500);
}
@media (max-width: 650px) {
    .customer-summary {
        grid-template-columns: 1fr;
    }
    .customer-page {
        padding: 0;
    }
    .customer-heading {
        align-items: flex-start;
        flex-direction: column;
        gap: 18px;
    }
    .customer-identity {
        align-items: flex-start;
        gap: 12px;
    }
}
</style>
