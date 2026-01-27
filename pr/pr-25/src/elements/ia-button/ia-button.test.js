import { fixture } from '@open-wc/testing-helpers';
import { describe, expect, test } from 'vitest';
import { html } from 'lit';
import './ia-button';
describe('IA button', () => {
    test('renders a basic button', async () => {
        const el = await fixture(html `<ia-button>Click me</ia-button>`);
        const button = el.shadowRoot?.querySelector('button');
        expect(button).toBeDefined();
    });
});
//# sourceMappingURL=ia-button.test.js.map