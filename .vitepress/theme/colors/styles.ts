import type { Profile } from './engine';
import goldenHour from '../../../../package/src/themes/golden-hour.css?raw';
import lagoon from '../../../../package/src/themes/lagoon.css?raw';
import modern from '../../../../package/src/themes/modern.css?raw';
import northernLights from '../../../../package/src/themes/northern-lights.css?raw';
import original from '../../../../package/src/themes/original.css?raw';
import rosewood from '../../../../package/src/themes/rosewood.css?raw';
import { themeCss } from './engine';
import { miruDefaults } from './miru-defaults';

// Presets always use the same authored files as the published library.
export const schemeStyles: Record<string, string> = {
    original,
    miru: modern,
    aurora: northernLights,
    lagoon,
    rose: rosewood,
    citrus: goldenHour,
};

/**
 * Resolve the stylesheet for the currently selected profile.
 * @param profile
 * @returns
 */
export function selectedThemeCss(profile: Profile): string {
    return themeCss(profile, miruDefaults, schemeStyles);
}
