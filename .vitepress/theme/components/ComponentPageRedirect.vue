<template>
    <p>
        Opening the current documentation.
        <a :href="target">Continue to the page</a>
        .
    </p>
</template>
<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { componentPageOwner, componentReferenceLink } from '../component-pages';
const props = defineProps<{ to: string; part?: string }>();
const target = computed(() => props.to);
onMounted(() => {
    const hash = window.location.hash.slice(1);
    let next = props.to;
    if (hash && props.part) {
        if (['props', 'emitted-events', 'slots', 'models', 'template-ref', 'api'].includes(hash)) {
            next = componentReferenceLink(props.part) + (hash === 'api' ? '' : '-' + hash);
        } else if (componentPageOwner(props.part) === props.part) next += '#' + hash;
        else if (componentPageOwner(props.part))
            next = componentReferenceLink(props.part) + '-' + hash;
    } else if (hash && !next.includes('#')) {
        next += '#' + hash;
    }
    window.location.replace(next);
});
</script>
