import { parse } from '@vue/compiler-sfc';
import { examples, importsFor, exampleStyles } from './examples.ts';
import { exampleSource } from './source.ts';

export function insertExample(source: string, name: string, serial: number) {
    const example = examples[name];
    if (!example)
        throw new Error(
            'This primitive needs its parent composition. Choose a complete component example.',
        );
    const parsed = parse(source);
    if (parsed.errors.length || !parsed.descriptor.template)
        throw new Error(
            'Fix the Vue template before inserting a component. Your code has been kept.',
        );
    if (parsed.descriptor.script && !parsed.descriptor.scriptSetup)
        throw new Error(
            'Use <script setup> to insert components automatically. You can still edit and run Options API examples.',
        );
    let markup = parse(exampleSource(name)).descriptor.template?.content.trim() || example.template;
    let setup = example.setup || '';
    const elementIds = new Set(Array.from(markup.matchAll(/\bid="([^"]+)"/g), (match) => match[1]));
    for (const id of elementIds)
        markup = markup
            .replaceAll(`id="${id}"`, `id="${id}-${serial}"`)
            .replaceAll(`for="${id}"`, `for="${id}-${serial}"`);
    for (const [, identifier] of setup.matchAll(/(?:const|let)\s+(\w+)/g)) {
        const unique = identifier + serial;
        markup = markup.replace(new RegExp(`\\b${identifier}\\b`, 'g'), unique);
        setup = setup.replace(new RegExp(`\\b${identifier}\\b`, 'g'), unique);
    }
    const templateEnd = parsed.descriptor.template.loc.end.offset;
    let next =
        source.slice(0, templateEnd) +
        '\n  <!-- ' +
        name +
        ' -->\n  ' +
        markup +
        '\n' +
        source.slice(templateEnd);
    let script = parsed.descriptor.scriptSetup?.content || '';
    function addImports(module: string, names: string[]) {
        const pattern = new RegExp(
            `import\\s*\\{([^}]+)\\}\\s*from\\s*['"]${module.replaceAll('/', '\\/').replaceAll('.', '\\.')}['"];?`,
        );
        const existing = script.match(pattern);
        if (existing) {
            const imports = new Set(
                existing[1]
                    .split(',')
                    .map((name) => name.trim())
                    .filter(Boolean),
            );
            for (const name of names) if (!imports.has(name)) imports.add(name);
            script = script.replace(
                pattern,
                `import { ${[...imports].join(', ')} } from '${module}'`,
            );
        } else script = `import { ${names.join(', ')} } from '${module}'\n` + script;
    }
    addImports('@rat.md/miru', importsFor(example));
    const vueHelpers = ['ref', 'computed', 'h', 'defineComponent'].filter((name) =>
        new RegExp(`\\b${name}\\(`).test(setup),
    );
    if (vueHelpers.length) addImports('vue', vueHelpers);
    if (setup.includes('useForm(')) {
        addImports('@rat.md/miru/composables', ['useForm']);
        addImports('zod', ['z']);
    }
    if (setup) script += '\n' + setup + '\n';
    const block = parse(next).descriptor.scriptSetup;
    if (block)
        next = next.slice(0, block.loc.start.offset) + script + next.slice(block.loc.end.offset);
    else {
        const template = parse(next).descriptor.template!;
        const end = next.indexOf('>', template.loc.end.offset) + 1;
        next =
            next.slice(0, end) +
            `\n\n<script setup lang="ts">\n${script}</script>` +
            next.slice(end);
    }
    if (!next.includes('Miru composition helpers') && !next.includes('.demo-tile'))
        next += `\n<style scoped>\n/* Miru composition helpers */\n${exampleStyles}\n</style>\n`;
    return next;
}
