import { LitElement, TemplateResult, type CSSResultGroup } from 'lit';
import './syntax-highlighter';
export type StyleInputSettings = {
    label: string;
    cssVariable: string;
    defaultValue?: string;
    inputType?: 'color' | 'text';
};
export type StyleInputData = {
    settings: StyleInputSettings[];
};
/**
 * A template for demoing the use of a custom element.
 */
export declare class StoryTemplate extends LitElement {
    elementTag: string;
    exampleUsage: string;
    styleInputData?: StyleInputData;
    labs: boolean;
    private visible;
    private appliedStyles?;
    private shouldShowPropertySettings;
    private styleInputs?;
    render(): TemplateResult<1>;
    private get elementDemoTemplate();
    private get styleSettingsTemplate();
    private get importCode();
    private get cssCode();
    private get elementClassName();
    private get modulePath();
    private handleSettingsSlotChange;
    private applyStyles;
    private labelToId;
    static get styles(): CSSResultGroup;
}
//# sourceMappingURL=story-template.d.ts.map