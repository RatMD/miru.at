/**
 * Expose the library-owned component summaries to website generators.
 *
 * Re-exports shared text instead of maintaining a second copy of the component descriptions.
 *
 * Imported by the inventory and documentation synchronization helpers.
 */

export {
    componentCopy,
    componentSummary,
} from '../../package/src/stories/component-documentation.ts';
