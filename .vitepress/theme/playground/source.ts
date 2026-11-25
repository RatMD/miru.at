import {
    exampleSource as rawExampleSource,
    workspaceSource as rawWorkspaceSource,
} from './examples.ts';
import { formattedExamples } from './formatted-examples.ts';

export function exampleSource(name: string, fallbackName?: string) {
    return (
        formattedExamples[name] ||
        (fallbackName && formattedExamples[fallbackName]) ||
        rawExampleSource(name, fallbackName)
    );
}
export const workspaceSource = formattedExamples.Workspace || rawWorkspaceSource;
