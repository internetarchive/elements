import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';
import './ia-snow';
describe('IA Snow', () => {
    test('renders a basic snow', async () => {
        const el = await fixture(html `<ia-snow></ia-snow>`);
        const button = el.shadowRoot?.querySelector('ia-button');
        expect(button).toBeDefined();
    });
});
//# sourceMappingURL=ia-snow.test.js.map