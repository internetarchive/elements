import { LitElement, type CSSResultGroup, type PropertyValues } from 'lit';
import type { SnowflakesParams } from 'magic-snowflakes';
/**
 * An element that shows snowflakes to demo the elements library
 */
export declare class IASnow extends LitElement {
    snowConfig?: SnowflakesParams;
    private snowing;
    private snowflakes?;
    render(): import("lit-html").TemplateResult<1>;
    protected willUpdate(_changedProperties: PropertyValues): void;
    private get startButtonTemplate();
    private get clearButtonTemplate();
    private startSnowing;
    private stopSnowing;
    static get styles(): CSSResultGroup;
}
//# sourceMappingURL=ia-snow.d.ts.map