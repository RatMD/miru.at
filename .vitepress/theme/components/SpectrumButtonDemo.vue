<template>
    <OverlayNotice
        v-if="variant === 'default'"
        v-model:open="open"
        title="Hello, I'm an OverlayNotice."
        :icon="IconInfoCircle"
        description="A little space for an important message. On desktop I'm a dialog; on mobile I become a bottom drawer."
        :close-button="{ label: 'Nice to meet you', variant: 'default' }">
        <template #description>
            A little space for an important message. On desktop I'm a dialog; on mobile I become a
            bottom drawer.
            <span class="spectrum-demo-more">
                There is much more you can do with Miru modals.
                <a href="/components/overlay">Browse the documentation ↗</a>
            </span>
        </template>
        <template #trigger>
            <span class="spectrum-demo-anchor" @click="open = true"><slot /></span>
        </template>
    </OverlayNotice>
    <OverlayChoice
        v-else-if="variant === 'primary'"
        v-model:open="open"
        title="A little choice. A clear next step."
        :icon="IconListCheck"
        description="I'm an OverlayChoice: a dialog for decisions, with confirm and cancel actions. On mobile I open as a bottom drawer."
        :primary="{ label: 'Keep exploring', variant: 'primary' }"
        :secondary="{ label: 'Maybe later' }"
        close-on-confirm>
        <template #description>
            I'm an OverlayChoice: a dialog for decisions, with confirm and cancel actions. On mobile
            I open as a bottom drawer.
            <span class="spectrum-demo-more">
                Custom content, actions and more are yours to explore.
                <a href="/components/overlay">Browse the documentation ↗</a>
            </span>
        </template>
        <template #trigger>
            <span class="spectrum-demo-anchor" @click="open = true"><slot /></span>
        </template>
    </OverlayChoice>
    <Sheet v-else-if="variant === 'secondary'" v-model:open="open">
        <SheetTrigger as-child><slot /></SheetTrigger>
        <SheetContent side="right">
            <SheetHeader>
                <SheetTitle class="flex items-center gap-2">
                    <IconLayoutSidebarRight :size="20" aria-hidden="true" />
                    A little room on the side.
                </SheetTitle>
                <SheetDescription>
                    I'm a Sheet. This demo slides in from the right, keeping extra details close
                    without taking you to another page. You can also open me from the left, top or
                    bottom.
                </SheetDescription>
            </SheetHeader>
            <div class="spectrum-demo-copy">
                <Badge variant="secondary">Sheet / right</Badge>
                <p>Great for settings, filters and the details behind the big picture.</p>
                <p>Close me with Escape, the close button, or a click outside.</p>
            </div>
            <SheetFooter>
                <SheetClose as-child>
                    <Button variant="secondary">Back to the buttons</Button>
                </SheetClose>
            </SheetFooter>
        </SheetContent>
    </Sheet>
    <Popover v-else-if="variant === 'accent'" v-model:open="open">
        <PopoverTrigger as-child><slot /></PopoverTrigger>
        <PopoverContent side="left" align="center" :side-offset="12" class="spectrum-demo-popover">
            <Badge variant="accent">Popover</Badge>
            <h3>Right here. A little to the left.</h3>
            <p>
                A handy home for small settings and extra context. This demo opens to the left,
                centred on its button. You can choose any side and alignment.
            </p>
            <PopoverArrow />
        </PopoverContent>
    </Popover>
    <DropdownMenu v-else-if="variant === 'outline'" v-model:open="open">
        <DropdownMenuTrigger as-child><slot /></DropdownMenuTrigger>
        <DropdownMenuContent class="w-64" align="center">
            <DropdownMenuLabel>A menu of possibilities</DropdownMenuLabel>
            <DropdownMenuItem
                @select="
                    feedback(
                        'You found the menu.',
                        'DropdownMenu keeps related actions one click away.',
                    )
                ">
                <Icon name="grid" />
                Explore an action
            </DropdownMenuItem>
            <DropdownMenuCheckboxItem v-model="shortcuts" @select.prevent>
                Show keyboard shortcuts
            </DropdownMenuCheckboxItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
                @select="
                    feedback(
                        'Keyboard? Welcome.',
                        'Use the arrow keys to move, Enter to choose and Escape to close.',
                    )
                ">
                <Icon name="command" />
                Keyboard friendly
                <DropdownMenuShortcut v-if="shortcuts">↵</DropdownMenuShortcut>
            </DropdownMenuItem>
            <DropdownMenuItem disabled>Unavailable, but still considered</DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
    <TooltipProvider
        v-else-if="variant === 'ghost'"
        disable-closing-trigger
        ignore-non-keyboard-focus>
        <Tooltip :open="tourOpen">
            <span class="spectrum-demo-anchor" @click="startTour">
                <TooltipTrigger as-child><slot /></TooltipTrigger>
            </span>
            <TooltipContent
                :key="tourSide"
                :side="tourSide"
                align="center"
                :side-offset="10"
                @escape-key-down="stopTour">
                {{ tourCopy[tourIndex] }}
            </TooltipContent>
        </Tooltip>
    </TooltipProvider>
    <span
        v-else-if="variant === 'ghostly'"
        ref="contextAnchor"
        class="spectrum-demo-anchor"
        @click="openContext">
        <ContextMenu @update:open="emit('busy', $event)">
            <ContextMenuTrigger as-child><slot /></ContextMenuTrigger>
            <ContextMenuContent
                class="w-64"
                aria-label="Meet ContextMenu"
                side="bottom"
                align="center"
                :side-offset="8"
                :reference="contextAnchor ?? undefined">
                <ContextMenuLabel>A little context goes a long way</ContextMenuLabel>
                <ContextMenuItem
                    @select="
                        feedback(
                            'A menu, right where you need it.',
                            'ContextMenu usually opens on right-click, a long press, or Shift+F10. This demo also welcomes a regular click.',
                        )
                    ">
                    <Icon name="spark" />
                    Meet ContextMenu
                </ContextMenuItem>
                <ContextMenuSeparator />
                <ContextMenuCheckboxItem v-model="details" @select.prevent>
                    Keep the little details
                </ContextMenuCheckboxItem>
                <ContextMenuItem
                    @select="
                        feedback(
                            'No mouse required.',
                            'Move through items with the arrow keys. Press Enter to choose, or Escape to leave.',
                        )
                    ">
                    <Icon name="command" />
                    Take the keyboard route
                    <ContextMenuShortcut>↵</ContextMenuShortcut>
                </ContextMenuItem>
                <ContextMenuItem disabled>Nothing to delete here. Relax.</ContextMenuItem>
            </ContextMenuContent>
        </ContextMenu>
    </span>
    <slot v-else />
</template>

<script lang="ts" setup>
import {
    Button,
    Badge,
    OverlayNotice,
    OverlayChoice,
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetDescription,
    SheetFooter,
    SheetClose,
    Popover,
    PopoverTrigger,
    PopoverContent,
    PopoverArrow,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuItem,
    DropdownMenuCheckboxItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    TooltipProvider,
    Tooltip,
    TooltipTrigger,
    TooltipContent,
    ContextMenu,
    ContextMenuTrigger,
    ContextMenuContent,
    ContextMenuLabel,
    ContextMenuItem,
    ContextMenuCheckboxItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
} from '@rat.md/miru';
import { IconInfoCircle, IconListCheck, IconLayoutSidebarRight } from '@tabler/icons-vue';
import { ref, computed, watch, onUnmounted } from 'vue';
import Icon from './Icon.vue';

defineProps<{ variant: string }>();
const emit = defineEmits<{
    busy: [value: boolean];
    feedback: [title: string, description: string];
}>();
const open = ref(false);
watch(open, (value) => emit('busy', value));
const shortcuts = ref(true);
const details = ref(true);
const contextAnchor = ref<HTMLElement | null>(null);
const tourOpen = ref(false);
const tourIndex = ref(0);
const sides = ['top', 'right', 'bottom', 'left'] as const;
const tourSide = computed(() => sides[tourIndex.value]);
const tourCopy = [
    'Up here. Hello!',
    'A little to your right.',
    'Down here. Still a tooltip.',
    'And left. That’s the grand tour.',
];
let tourTimer: ReturnType<typeof setTimeout> | undefined;

/**
 * Stop the automated button color tour.
 */
function stopTour() {
    clearTimeout(tourTimer);
    tourOpen.value = false;
    emit('busy', false);
}

/**
 * Start the automated button color tour.
 */
function startTour() {
    stopTour();
    tourIndex.value = 0;
    tourOpen.value = true;
    emit('busy', true);

    /**
     * Advance the demonstration to its next step.
     * @returns
     */
    function step() {
        if (tourIndex.value === sides.length - 1) {
            return stopTour();
        }
        tourIndex.value++;
        tourTimer = setTimeout(step, 1250);
    }

    tourTimer = setTimeout(step, 1250);
}

/**
 * Open the contextual actions for the demonstration.
 * @param event
 */
function openContext(event: MouseEvent) {
    const trigger = (event.target as Element).closest('button');
    if (!trigger) {
        return;
    }
    const rect = trigger.getBoundingClientRect();
    trigger.dispatchEvent(
        new MouseEvent('contextmenu', {
            bubbles: true,
            cancelable: true,
            clientX: rect.left + rect.width / 2,
            clientY: rect.bottom + 6,
        }),
    );
}

/**
 * Show feedback for a demonstration action.
 * @param title
 * @param description
 */
function feedback(title: string, description: string) {
    emit('feedback', title, description);
}

onUnmounted(() => {
    clearTimeout(tourTimer);
    emit('busy', false);
});
</script>

<style scoped>
.spectrum-demo-anchor {
    display: inline-flex;
}
.spectrum-demo-copy {
    padding: 0 24px;
    display: grid;
    gap: 18px;
    font-size: 14px;
    line-height: 1.8;
    color: var(--ui-muted-foreground);
}
.spectrum-demo-more {
    display: block;
    margin-top: 12px;
}
.spectrum-demo-more a {
    color: var(--ui-accent-text, var(--ui-accent));
    text-decoration: underline;
    text-underline-offset: 3px;
}
.spectrum-demo-popover h3 {
    margin: 14px 0 8px;
    font-size: 15px;
    font-weight: 600;
}
.spectrum-demo-popover p {
    font-size: 13px;
    line-height: 1.75;
    color: var(--ui-muted-foreground);
}
</style>
