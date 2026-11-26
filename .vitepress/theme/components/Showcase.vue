<template>
    <PageRoot>
        <div class="component-gallery">
            <Card class="gallery-card stories-card">
                <div class="gallery-overline">
                    <span>A LITTLE CHANGE OF SCENE</span>
                    <Badge variant="accent">Carousel</Badge>
                </div>
                <Carousel
                    :items="slides"
                    :get-key="(slide) => slide.id"
                    loop
                    effect="fade"
                    pagination="dots"
                    label="A few ways to make it yours">
                    <template #slide="{ item, index }">
                        <div
                            class="scene"
                            :style="{ '--scene-colour': `var(--ui-${item.colour})` }">
                            <div class="scene-art" aria-hidden="true">
                                <div class="scene-ring" />
                                <component :is="item.icon" class="scene-symbol" :stroke-width="1" />
                                <span class="scene-spark">✦</span>
                                <span class="scene-index">0{{ index + 1 }}</span>
                            </div>
                            <div class="scene-copy">
                                <Badge :variant="item.colour">{{ item.tag }}</Badge>
                                <h3>
                                    {{ item.title }}
                                    <br />
                                    <em>{{ item.subtitle }}</em>
                                </h3>
                                <p>{{ item.description }}</p>
                            </div>
                        </div>
                    </template>
                </Carousel>
                <div class="gallery-footer">
                    <span>
                        Powered by
                        <Anchor
                            href="https://www.embla-carousel.com/"
                            target="_blank"
                            rel="noopener noreferrer"
                            animation="slide">
                            EmblaCarousel
                        </Anchor>
                        and a lot of
                        <IconHeartFilled class="powered-heart" aria-label="love" role="img" />
                        by miru.
                    </span>
                    <Anchor href="/components/carousel" animation="slide">
                        Discover Carousel ↗
                    </Anchor>
                </div>
            </Card>
            <Card class="gallery-card login-card">
                <div class="login-glow" aria-hidden="true" />
                <div class="gallery-overline">
                    <span>YOUR NEXT CHAPTER STARTS HERE</span>
                    <IconLock :size="17" />
                </div>
                <div class="login-emblem">
                    <IconFingerprint :size="34" :stroke-width="1.4" />
                </div>
                <Badge variant="success" class="login-badge">A familiar face. A fresh start.</Badge>
                <h3>
                    Good to see you.
                    <br />
                    <em>Come on in.</em>
                </h3>
                <p class="gallery-description">
                    A thoughtful first impression, down to the very last digit.
                </p>
                <form class="login-form" @submit.prevent="signIn">
                    <Field>
                        <FieldLabel for="showcase-login-email">Your email</FieldLabel>
                        <Input
                            id="showcase-login-email"
                            v-model="email"
                            type="email"
                            autocomplete="email"
                            placeholder="you@yourstudio.design"
                            required />
                    </Field>
                    <Field>
                        <FieldLabel for="showcase-login-password">Password</FieldLabel>
                        <InputPassword
                            id="showcase-login-password"
                            v-model="password"
                            autocomplete="current-password"
                            placeholder="Your little secret"
                            required
                            :minlength="6" />
                    </Field>
                    <div class="login-options">
                        <Checkbox v-model="remember" label="Remember me" variant="accent" />
                        <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            @click="
                                loginFeedback = 'No password panic here. This is a local preview.'
                            ">
                            Forgot password?
                        </Button>
                    </div>
                    <div class="otp-section">
                        <div class="otp-label">
                            <FieldLabel for="showcase-login-code">One-time code</FieldLabel>
                            <Badge variant="outline">An extra layer</Badge>
                        </div>
                        <InputPin
                            id="showcase-login-code"
                            v-model="otp"
                            :maxlength="6"
                            aria-label="Six-digit verification code"
                            type="number" />
                        <p>Six little digits. A little more peace of mind.</p>
                    </div>
                    <Button
                        type="submit"
                        variant="accent"
                        size="lg"
                        :loading="signingIn"
                        loading-position="end"
                        class="login-submit">
                        <IconArrowRight :size="18" />
                        {{
                            signedIn
                                ? "You're in. Make yourself at home."
                                : 'Step into your workspace'
                        }}
                    </Button>
                    <p class="login-feedback" role="status">{{ loginFeedback }}</p>
                </form>
                <div class="login-assurance">
                    <IconShieldCheck :size="19" />
                    <span>
                        Native fields. Keyboard-friendly.
                        <br />
                        A warm welcome on every screen.
                    </span>
                </div>
                <div class="gallery-footer">
                    <span aria-hidden="true" />
                    <Anchor href="/components/#formfields" animation="slide">
                        Discover form fields ↗
                    </Anchor>
                </div>
            </Card>
            <Card class="gallery-card team-card">
                <div class="gallery-overline">
                    <span>GOOD THINGS HAPPEN TOGETHER</span>
                    <Badge variant="secondary">Accordion & avatars</Badge>
                </div>
                <div class="team-intro">
                    <div>
                        <h3>
                            A little better,
                            <br />
                            <em>together.</em>
                        </h3>
                        <p class="gallery-description">The people behind your next big thing.</p>
                    </div>
                    <AvatarStack :max="3" size="default" label="Your creative team">
                        <Avatar v-for="person in team" :key="person.name" :tone="person.tone">
                            <AvatarFallback>{{ person.initials }}</AvatarFallback>
                        </Avatar>
                    </AvatarStack>
                </div>
                <Accordion type="single" collapsible default-value="people" class="team-accordion">
                    <AccordionItem value="people">
                        <AccordionHeader>
                            <AccordionTrigger>Small team. Rather big ideas.</AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                            <div class="team-people">
                                <div
                                    v-for="person in team.slice(0, 3)"
                                    :key="person.name"
                                    class="team-person">
                                    <Avatar size="sm" :tone="person.tone">
                                        <AvatarFallback>{{ person.initials }}</AvatarFallback>
                                    </Avatar>
                                    <span>
                                        <strong>{{ person.name }}</strong>
                                        <small>{{ person.role }}</small>
                                    </span>
                                    <span class="person-online" aria-label="Available" />
                                </div>
                            </div>
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="details">
                        <AccordionHeader>
                            <AccordionTrigger>Room for the little details.</AccordionTrigger>
                        </AccordionHeader>
                        <AccordionContent>
                            <p class="accordion-copy">
                                Keyboard navigation, considered spacing and the freedom to compose.
                                Start with the pieces, then make them unmistakably yours.
                            </p>
                            <Anchor href="/components/accordion" variant="accent" animation="slide">
                                Take a closer look ↗
                            </Anchor>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
                <div class="gallery-footer">
                    <span aria-hidden="true" />
                    <Anchor href="/components/accordion" animation="slide">
                        Discover Accordion ↗
                    </Anchor>
                </div>
            </Card>
            <Card class="gallery-card dates-card">
                <div class="gallery-overline">
                    <span>MAKE A LITTLE TIME</span>
                    <Badge variant="info">Two months. More possibility.</Badge>
                </div>
                <h3>
                    Good days
                    <em>ahead.</em>
                </h3>
                <p class="gallery-description">
                    A little room for plans, launches and well-earned days off.
                </p>
                <div class="calendar-fit">
                    <Calendar
                        v-model="selectedRange"
                        range
                        :number-of-months="2"
                        :fixed-weeks="true"
                        :is-date-unavailable="isCalendarDayUnavailable"
                        allow-non-contiguous-ranges
                        :holidays="calendarHolidays"
                        :availability="calendarAvailability"
                        size="sm"
                        locale="en-GB">
                        <template #day="{ date, holiday, available, disabled, unavailable }">
                            <span
                                class="gallery-calendar-day"
                                :title="
                                    holiday ||
                                    (available ? `${available} spaces available` : undefined)
                                ">
                                {{ date.day }}
                                <i v-if="holiday" class="calendar-holiday-dot" />
                                <i
                                    v-else-if="available && !disabled && !unavailable"
                                    class="calendar-available-dot" />
                            </span>
                        </template>
                    </Calendar>
                </div>
                <div class="calendar-legend">
                    <Badge variant="success">Available dates</Badge>
                    <Badge variant="outline">Sundays off</Badge>
                    <Badge variant="warning">Team days off</Badge>
                </div>
                <div class="dates-caption">
                    <IconCalendarEvent :size="16" />
                    <span role="status">{{ rangeLabel }}</span>
                </div>
                <div class="gallery-footer">
                    <span aria-hidden="true" />
                    <Anchor href="/components/calendar" animation="slide">
                        Discover Calendar ↗
                    </Anchor>
                </div>
            </Card>
            <Card class="gallery-card details-card">
                <div class="gallery-overline">
                    <span>THE LITTLE THINGS, CONSIDERED</span>
                    <IconPaperclip :size="17" />
                </div>
                <h3>
                    Everything
                    <em>in its place.</em>
                </h3>
                <p class="gallery-description">Useful little pieces. Ready for the real work.</p>
                <Item variant="outline" class="review-item">
                    <ItemMedia variant="icon"><IconFolder :size="20" /></ItemMedia>
                    <ItemContent>
                        <ItemTitle>Studio / next</ItemTitle>
                        <ItemDescription>
                            {{
                                reviewed
                                    ? 'Reviewed. Looking rather good.'
                                    : 'Your shared space for something wonderful.'
                            }}
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <ButtonAction
                            :variant="reviewed ? 'success' : 'accent'"
                            :aria-label="
                                reviewed ? 'Mark project as unread' : 'Mark project as reviewed'
                            "
                            @click="reviewed = !reviewed">
                            <IconCheck :size="17" />
                        </ButtonAction>
                    </ItemActions>
                </Item>
                <Attachment :item="attachment" size="sm" />
                <div class="loading-preview">
                    <div class="loading-preview-label">
                        <span>EVEN THE WAIT FEELS CONSIDERED</span>
                        <Button variant="ghost" size="sm" @click="showSkeleton = !showSkeleton">
                            {{ showSkeleton ? 'Reveal item' : 'Show skeleton' }}
                            <IconArrowRight :size="13" />
                        </Button>
                    </div>
                    <div
                        v-if="showSkeleton"
                        class="skeleton-item"
                        aria-label="Loading item preview">
                        <Skeleton class="skeleton-avatar" />
                        <div>
                            <Skeleton class="skeleton-title" />
                            <Skeleton class="skeleton-description" />
                        </div>
                        <Skeleton class="skeleton-action" />
                    </div>
                    <Item v-else variant="muted">
                        <ItemMedia variant="icon"><IconSparkles :size="19" /></ItemMedia>
                        <ItemContent>
                            <ItemTitle>Worth the little wait.</ItemTitle>
                            <ItemDescription>
                                From a placeholder to a little possibility.
                            </ItemDescription>
                        </ItemContent>
                    </Item>
                </div>
                <div class="gallery-footer">
                    <span aria-hidden="true" />
                    <Anchor href="/components/attachment" animation="slide">
                        Discover Attachments ↗
                    </Anchor>
                </div>
            </Card>
        </div>
    </PageRoot>
</template>

<script lang="ts" setup>
import type {
    AttachmentItem,
    CalendarValue,
    CalendarDayAvailability,
    CalendarRulesProps,
} from '@rat.md/miru';
import {
    PageRoot,
    Card,
    Badge,
    Button,
    ButtonAction,
    Field,
    FieldLabel,
    Input,
    InputPassword,
    InputPin,
    Checkbox,
    Carousel,
    Calendar,
    Accordion,
    AccordionItem,
    AccordionHeader,
    AccordionTrigger,
    AccordionContent,
    Avatar,
    AvatarFallback,
    AvatarStack,
    Anchor,
    Item,
    ItemMedia,
    ItemContent,
    ItemTitle,
    ItemDescription,
    ItemActions,
    Attachment,
    Skeleton,
} from '@rat.md/miru';
import {
    IconLock,
    IconFingerprint,
    IconArrowRight,
    IconShieldCheck,
    IconCalendarEvent,
    IconPaperclip,
    IconFolder,
    IconCheck,
    IconSparkles,
    IconPalette,
    IconDevices,
    IconBolt,
    IconHeartFilled,
} from '@tabler/icons-vue';
import { computed, ref, shallowRef, onUnmounted } from 'vue';

const email = ref('');
const password = ref('');
const otp = ref('');
const remember = ref(true);
const signingIn = ref(false);
const signedIn = ref(false);
const loginFeedback = ref('An interactive preview. Nothing is sent. Try any six-digit code.');
const selectedRange = shallowRef<CalendarValue<true>>({
    start: undefined,
    end: undefined,
});
const calendarHolidays: Record<string, string> = {};
const calendarAvailability: Record<string, CalendarDayAvailability> = {};
const calendarToday = new Date();

/**
 * Check whether a demonstration calendar day is unavailable.
 * @param date
 * @returns
 */
const isCalendarDayUnavailable: NonNullable<CalendarRulesProps['isDateUnavailable']> = (date) =>
    new Date(`${date.toString()}T12:00:00`).getDay() === 0;
for (let month = 0; month < 2; month++) {
    for (const [day, label] of [[10, 'A little team day off']] as const) {
        const date = new Date(calendarToday.getFullYear(), calendarToday.getMonth() + month, day);
        while (date.getDay() === 0 || date.getDay() === 6) {
            date.setDate(date.getDate() + 1);
        }
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
        calendarHolidays[key] = label;
    }
    for (const day of [5, 16, 26]) {
        const date = new Date(calendarToday.getFullYear(), calendarToday.getMonth() + month, day);
        const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
        calendarAvailability[key] = { available: 3 };
    }
}
const rangeLabel = computed(() => {
    const { start, end } = selectedRange.value;

    /**
     * Format a demonstration date for display.
     * @param date
     * @returns
     */
    const format = (date: NonNullable<typeof start>) =>
        new Date(`${date.toString()}T12:00:00`).toLocaleDateString('en-GB', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    if (start && end) {
        return `${format(start)} – ${format(end)}. A little room for good things.`;
    }
    if (start) {
        return `${format(start)}. Now pick an end date.`;
    }

    return 'Pick a start and an end date. Make a little room for good things.';
});
const reviewed = ref(false);
const showSkeleton = ref(true);
let signInTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * Show local sign-in feedback without sending a request.
 */
function signIn() {
    if (signingIn.value) {
        return;
    }
    if (!/^\d{6}$/.test(otp.value)) {
        loginFeedback.value = 'Add all six digits of your one-time code first.';

        return;
    }
    signingIn.value = true;
    signInTimer = setTimeout(() => {
        signingIn.value = false;
        signedIn.value = true;
        loginFeedback.value = 'A lovely entrance. This demo keeps you right here.';
    }, 750);
}

onUnmounted(() => clearTimeout(signInTimer));
const slides = [
    {
        id: 'character',
        colour: 'accent' as const,
        tag: 'A LITTLE MORE YOU',
        title: 'Less ordinary.',
        subtitle: 'More character.',
        description: 'Thoughtful pieces for interfaces that feel like yours.',
        icon: IconSparkles,
    },
    {
        id: 'palette',
        colour: 'secondary' as const,
        tag: 'YOUR COLOURS. YOUR CALL.',
        title: 'One system.',
        subtitle: 'Endless moods.',
        description: 'Change the palette. Keep every little detail in harmony.',
        icon: IconPalette,
    },
    {
        id: 'screens',
        colour: 'primary' as const,
        tag: 'BIG IDEAS. ANY SCREEN.',
        title: 'Made for work.',
        subtitle: 'Ready to move.',
        description: 'From a generous desktop to the palm of your hand.',
        icon: IconDevices,
    },
    {
        id: 'start',
        colour: 'info' as const,
        tag: 'LESS STARTING FROM SCRATCH',
        title: 'Good foundations.',
        subtitle: 'Great beginnings.',
        description: 'The primitives are ready. Bring your next good idea.',
        icon: IconBolt,
    },
];
const team = ref([
    {
        name: 'Alex Morgan',
        initials: 'AM',
        role: 'Making the big picture clearer',
        tone: 'accent' as const,
    },
    {
        name: 'Jules Rivera',
        initials: 'JR',
        role: 'Giving the details a little soul',
        tone: 'secondary' as const,
    },
    {
        name: 'Sam Lee',
        initials: 'SL',
        role: 'Turning the ideas into something real',
        tone: 'primary' as const,
    },
    {
        name: 'Robin Ellis',
        initials: 'RE',
        role: 'Keeping good things moving',
        tone: 'info' as const,
    },
    {
        name: 'Charlie Park',
        initials: 'CP',
        role: 'Finding the next possibility',
        tone: 'success' as const,
    },
]);
const attachment: AttachmentItem = {
    id: 'showcase-brief',
    name: 'the-little-details.pdf',
    title: 'A shared direction',
    description: 'Brand notes for your next big thing.',
    kind: 'document',
    mimeType: 'application/pdf',
    size: 248000,
    status: 'success',
};
</script>

<style scoped>
.gallery-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin: 24px calc(-1 * var(--gallery-pad-x)) calc(-1 * var(--gallery-pad-y));
    padding: 14px var(--gallery-pad-x);
    border-top: 1px solid var(--ui-border);
    font-size: 10px;
    line-height: 1.7;
    color: var(--ui-muted-foreground);
}
.gallery-footer > a {
    flex-shrink: 0;
}
.gallery-footer :deep(a) {
    font-size: inherit;
}
.gallery-footer :deep([data-slot='anchor-external-icon']) {
    display: inline;
}
.powered-heart {
    display: inline;
    width: 12px;
    height: 12px;
    vertical-align: -2px;
    color: var(--ui-accent-text);
    margin-inline: 2px;
}
.component-gallery {
    display: grid;
    grid-template-columns: minmax(0, 1.25fr) minmax(0, 1fr);
    gap: 22px;
    align-items: start;
}
.gallery-card {
    --gallery-pad-x: 26px;
    --gallery-pad-y: 26px;
    min-width: 0;
    padding: var(--gallery-pad-y) var(--gallery-pad-x);
    gap: 0;
    overflow: hidden;
    border-color: var(--ui-border);
}
.gallery-overline {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 22px;
    color: var(--ui-muted-foreground);
    font-size: 8px;
    font-weight: 550;
    letter-spacing: 1.4px;
}
.gallery-overline :deep([data-slot='badge']) {
    letter-spacing: 0;
    flex-shrink: 0;
}
.gallery-card h3 {
    margin: 0;
    font-size: 25px;
    font-weight: 550;
    line-height: 1.15;
    letter-spacing: -0.9px;
}
.gallery-card h3 em {
    color: var(--ui-accent-text);
    font-family: Georgia, serif;
    font-weight: 400;
}
.gallery-description {
    color: var(--ui-muted-foreground);
    font-size: 12px;
    line-height: 1.8;
    margin: 10px 0 0;
}
.stories-card {
    grid-column: 1;
    grid-row: 1;
}
.scene {
    min-height: 300px;
    position: relative;
    display: flex;
    align-items: end;
    overflow: hidden;
    border: 1px solid color-mix(in srgb, var(--scene-colour) 20%, var(--ui-border));
    border-radius: 12px;
    background:
        radial-gradient(
            ellipse at 85% 15%,
            color-mix(in srgb, var(--scene-colour) 15%, transparent),
            transparent 65%
        ),
        var(--ui-background);
}
.scene-copy {
    position: relative;
    z-index: 1;
    padding: 30px;
    max-width: 80%;
}
.scene-copy h3 {
    font-size: clamp(30px, 3vw, 43px);
    margin: 18px 0 14px;
    letter-spacing: -1.5px;
}
.scene-copy h3 em {
    color: var(--scene-colour);
}
.scene-copy p {
    max-width: 300px;
    font-size: 12px;
    color: var(--ui-muted-foreground);
    line-height: 1.8;
}
.scene-art {
    position: absolute;
    inset: 0;
    pointer-events: none;
}
.scene-symbol {
    position: absolute;
    right: 28px;
    top: 22px;
    width: 130px;
    height: 130px;
    color: var(--scene-colour);
    transform: rotate(-12deg);
    opacity: 0.6;
    animation: scene-float 7s ease-in-out infinite;
}
.scene-ring {
    position: absolute;
    width: 300px;
    height: 300px;
    right: -90px;
    top: -75px;
    border: 1px solid color-mix(in srgb, var(--scene-colour) 15%, transparent);
    border-radius: 50%;
    box-shadow:
        0 0 0 40px color-mix(in srgb, var(--scene-colour) 3%, transparent),
        0 0 0 80px color-mix(in srgb, var(--scene-colour) 2%, transparent);
}
.scene-spark {
    position: absolute;
    right: 185px;
    top: 40px;
    color: var(--scene-colour);
    opacity: 0.5;
}
.scene-index {
    position: absolute;
    right: 24px;
    bottom: 20px;
    color: var(--scene-colour);
    opacity: 0.45;
    font-size: 50px;
    font-family: Georgia, serif;
    font-style: italic;
}
.login-card {
    grid-column: 2;
    grid-row: 1 / span 2;
    align-self: stretch;
    position: relative;
    --gallery-pad-x: 32px;
    --gallery-pad-y: 32px;
    display: flex;
    flex-direction: column;
}
.login-card > :not(.login-glow) {
    position: relative;
}
.login-glow {
    position: absolute;
    top: -120px;
    right: -100px;
    width: 330px;
    height: 330px;
    border-radius: 50%;
    background: radial-gradient(
        circle,
        color-mix(in srgb, var(--ui-accent) 9%, transparent),
        transparent 70%
    );
    pointer-events: none;
}
.login-emblem {
    display: grid;
    place-items: center;
    width: 64px;
    height: 64px;
    border: 1px solid color-mix(in srgb, var(--ui-accent) 30%, var(--ui-border));
    border-radius: 19px;
    color: var(--ui-accent-text);
    background: color-mix(in srgb, var(--ui-accent) 7%, var(--ui-background));
    margin: 8px 0 22px;
    box-shadow: 0 12px 45px -20px var(--ui-accent);
}
.login-badge {
    align-self: start;
    margin-bottom: 14px;
}
.login-card h3 {
    font-size: clamp(32px, 3vw, 44px);
    letter-spacing: -1.4px;
}
.login-form {
    margin-top: 28px;
    display: flex;
    flex-direction: column;
    gap: 18px;
}
.login-options {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
}
.login-options :deep(label),
.login-options :deep(button) {
    font-size: 11px;
}
.otp-section {
    border-block: 1px solid var(--ui-border);
    padding-block: 20px;
    display: grid;
    gap: 13px;
}
.otp-label {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
}
.otp-section p {
    font-size: 10px;
    color: var(--ui-muted-foreground);
    margin: 0;
}
.login-submit {
    width: 100%;
}
.login-feedback {
    font-size: 10px;
    color: var(--ui-muted-foreground);
    line-height: 1.7;
    min-height: 34px;
    margin: -4px 0 0;
}
.login-assurance {
    display: flex;
    align-items: center;
    gap: 12px;
    padding-top: 25px;
    margin-top: auto;
    color: var(--ui-muted-foreground);
    font-size: 10px;
    line-height: 1.8;
}
.login-assurance > svg {
    color: var(--ui-accent-text);
    flex-shrink: 0;
}
.team-card {
    grid-column: 1;
    grid-row: 2;
}
.team-intro {
    display: flex;
    justify-content: space-between;
    gap: 20px;
    align-items: center;
    margin-bottom: 22px;
}
.team-accordion :deep([data-slot='accordion-trigger']) {
    font-size: 12px;
}
.team-person {
    display: flex;
    align-items: center;
    gap: 10px;
}
.team-person strong {
    display: block;
    font-size: 11px;
    font-weight: 550;
}
.team-person small {
    display: block;
    font-size: 10px;
    color: var(--ui-muted-foreground);
    margin-top: 2px;
}
.team-people {
    display: grid;
    gap: 14px;
    padding-block: 4px;
}
.person-online {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: var(--ui-success);
    margin-left: auto;
}
.accordion-copy {
    color: var(--ui-muted-foreground);
    font-size: 12px;
    line-height: 1.8;
    margin: 0 0 12px;
}
.team-accordion :deep(a) {
    font-size: 11px;
}
.dates-card {
    grid-column: 1;
    grid-row: 3;
    width: 100%;
    max-width: 100%;
    justify-self: stretch;
}
.calendar-fit {
    width: fit-content;
    max-width: 100%;
    margin: 22px auto 0;
}
.calendar-fit :deep([data-slot='calendar']) {
    border-color: var(--ui-border);
    max-width: 100%;
}
.gallery-calendar-day {
    position: relative;
    display: grid;
    place-items: center;
    width: 100%;
    height: 100%;
}
.gallery-calendar-day i {
    position: absolute;
    bottom: 1px;
    width: 3px;
    height: 3px;
    border-radius: 50%;
}
.calendar-holiday-dot {
    background: var(--ui-warning);
}
.calendar-available-dot {
    background: var(--ui-success);
}
.calendar-legend {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 7px;
    margin-top: 16px;
}
.calendar-legend :deep([data-slot='badge']) {
    font-size: 9px;
}
.dates-caption {
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 10px;
    color: var(--ui-muted-foreground);
    margin-top: 18px;
}
.dates-caption svg {
    color: var(--ui-accent-text);
    flex-shrink: 0;
}
.details-card {
    grid-column: 2;
    grid-row: 3;
}
.review-item {
    margin-top: 22px;
    margin-bottom: 14px;
}
.review-item :deep([data-slot='item-title']) {
    font-size: 12px;
}
.review-item :deep([data-slot='item-description']) {
    font-size: 11px;
}
.loading-preview {
    margin-top: 22px;
    padding-top: 16px;
    border-top: 1px solid var(--ui-border);
}
.loading-preview-label {
    display: flex;
    justify-content: space-between;
    gap: 10px;
    align-items: center;
    margin-bottom: 12px;
}
.loading-preview-label > span {
    font-size: 7px;
    letter-spacing: 1px;
    color: var(--ui-muted-foreground);
}
.loading-preview-label :deep(button) {
    font-size: 10px;
}
.skeleton-item {
    display: flex;
    gap: 12px;
    align-items: center;
    min-height: 78px;
    padding: 14px;
    border: 1px solid var(--ui-border);
    border-radius: 9px;
}
.skeleton-item > div:nth-child(2) {
    flex: 1;
}
.skeleton-avatar {
    width: 36px;
    height: 36px;
    border-radius: 9px;
}
.skeleton-title {
    width: 65%;
    height: 11px;
    margin-bottom: 9px;
}
.skeleton-description {
    width: 90%;
    height: 8px;
}
.skeleton-action {
    width: 23px;
    height: 23px;
    border-radius: 50%;
}
@keyframes scene-float {
    0%,
    100% {
        transform: translateY(0) rotate(-12deg);
    }
    50% {
        transform: translateY(-8px) rotate(-7deg);
    }
}
@media (min-width: 1500px) {
    .dates-card,
    .details-card {
        align-self: stretch;
    }
    .dates-card .dates-caption,
    .details-card .loading-preview {
        margin-bottom: 24px;
    }
    .dates-card > .gallery-footer,
    .details-card > .gallery-footer {
        margin-top: auto;
    }
}
@media (max-width: 1499px) {
    .component-gallery {
        grid-template-columns: minmax(0, 1fr);
    }
    .gallery-card {
        grid-column: 1;
        grid-row: auto;
    }
    .login-card {
        max-width: none;
    }
    .dates-card {
        justify-self: center;
    }
    .login-emblem {
        margin-top: 0;
    }
    .login-assurance {
        margin-top: 4px;
    }
    .login-form {
        max-width: 560px;
        width: 100%;
    }
    .login-card {
        align-items: stretch;
    }
    .login-feedback {
        min-height: 0;
    }
}
@media (max-width: 650px) {
    .calendar-fit :deep([data-slot='calendar'] > div:has([data-slot='calendar-grid'])) {
        flex-direction: column;
        align-items: center;
    }
    .gallery-card {
        --gallery-pad-x: 18px;
        --gallery-pad-y: 20px;
    }
    .gallery-overline {
        font-size: 7px;
        letter-spacing: 1px;
        gap: 8px;
    }
    .gallery-overline :deep([data-slot='badge']) {
        font-size: 8px;
    }
    .login-card {
        --gallery-pad-x: 20px;
        --gallery-pad-y: 24px;
    }
    .scene {
        min-height: 290px;
    }
    .scene-copy {
        padding: 24px 20px;
        max-width: 95%;
    }
    .scene-copy h3 {
        font-size: 32px;
    }
    .scene-symbol {
        width: 100px;
        height: 100px;
        right: 12px;
        top: 12px;
        opacity: 0.3;
    }
    .scene-spark {
        right: 135px;
    }
    .team-intro {
        gap: 12px;
    }
    .team-intro h3 {
        font-size: 23px;
    }
    .team-intro .gallery-description {
        font-size: 11px;
    }
    .dates-card {
        width: 100%;
    }
    .calendar-fit {
        margin-inline: auto;
    }
    .loading-preview-label {
        align-items: start;
    }
    .login-options {
        flex-wrap: wrap;
    }
    .otp-section :deep([data-slot='input-pin-group']) {
        max-width: 100%;
    }
}
@media (prefers-reduced-motion: reduce) {
    .scene-symbol {
        animation: none;
    }
}
</style>
