import { LitElement, TemplateResult } from 'lit';
import './ia-status-indicator';
import '../../../demo/story-template';
export type PropInputSettings<T> = {
    label: string;
    propertyName: keyof T;
    defaultValue?: string;
    inputType?: 'text' | 'radio';
    radioOptions?: string[];
};
export declare class IAStatusIndicatorStory extends LitElement {
    private stringifiedProps;
    private component;
    private propInputs?;
    render(): TemplateResult<1>;
    private get exampleUsage();
    private createPropInput;
    private defaultPropInputTemplate;
    private radioPropInputTemplate;
    private apply;
}
//# sourceMappingURL=ia-status-indicator-story.d.ts.map