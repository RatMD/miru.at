import { parse, compileScript, compileTemplate, compileStyle } from '@vue/compiler-sfc';
import { transform } from 'sucrase';

export type ModuleResolver = (name: string) => unknown;

/**
 * Compile a Vue example and resolve its supported imports.
 * @param source
 * @param resolve
 * @param scopeId
 * @returns
 */
export function compileExample(
    source: string,
    resolve: ModuleResolver,
    scopeId = 'miru-playground',
) {
    const filename = 'MiruPlayground.vue';
    const id = `data-v-${scopeId}`;
    const { descriptor, errors } = parse(source, { filename });
    if (errors.length) {
        throw errors[0];
    }
    if (!descriptor.template) {
        throw new Error('Add a <template> block to render your components.');
    }
    if (descriptor.script?.src || descriptor.template.src || descriptor.scriptSetup?.src) {
        throw new Error('Use inline blocks in this single-file playground.');
    }
    const script =
        descriptor.script || descriptor.scriptSetup
            ? compileScript(descriptor, {
                  id,
                  inlineTemplate: !!descriptor.scriptSetup,
              })
            : { content: 'export default {}', bindings: {} };

    /**
     * Evaluate compiled preview code with the explicit module resolver.
     * @param code
     * @returns
     */
    function evaluate(code: string) {
        const output = transform(code, {
            transforms: ['typescript', 'imports'],
            filePath: filename,
            production: true,
        }).code;
        const module = { exports: {} as Record<string, any> };
        new Function('require', 'module', 'exports', output + '\n//# sourceURL=MiruPlayground.vue')(
            resolve,
            module,
            module.exports,
        );

        return module.exports;
    }

    const component = evaluate(script.content).default;
    if (!component) {
        throw new Error('The Vue file must export a component.');
    }
    if (!descriptor.scriptSetup) {
        const template = compileTemplate({
            source: descriptor.template.content,
            filename,
            id,
            compilerOptions: { bindingMetadata: script.bindings },
        });
        if (template.errors.length) {
            throw template.errors[0];
        }
        component.render = evaluate(template.code).render;
    }
    const styles = descriptor.styles
        .map((style) => {
            if (style.lang && style.lang !== 'css') {
                throw new Error(
                    'Use plain CSS in the playground. CSS preprocessors are not loaded.',
                );
            }
            const result = compileStyle({
                source: style.content,
                filename,
                id,
                scoped: style.scoped,
            });
            if (result.errors.length) {
                throw result.errors[0];
            }

            return result.code;
        })
        .join('\n');
    if (descriptor.styles.some((style) => style.scoped)) {
        component.__scopeId = id;
    }

    return { component, styles };
}
