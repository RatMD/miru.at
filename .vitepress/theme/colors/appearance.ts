import { useData } from 'vitepress';
let transitionTimer: ReturnType<typeof setTimeout> | undefined;

export function useAppearance() {
    const { isDark } = useData();
    function toggleAppearance() {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
            document.documentElement.classList.add('miru-appearance-transition');
            clearTimeout(transitionTimer);
            transitionTimer = setTimeout(
                () => document.documentElement.classList.remove('miru-appearance-transition'),
                320,
            );
        }
        isDark.value = !isDark.value;
    }
    return { isDark, toggleAppearance };
}
