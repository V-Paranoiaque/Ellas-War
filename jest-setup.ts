import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone';
import { toHaveNoViolations } from 'jest-axe';

setupZoneTestEnv();
expect.extend(toHaveNoViolations);
