# 📚 _elements_ 🏛️

## Demo

<https://internetarchive.github.io/elements>

## Installation

```zsh
npm i -S @internetarchive/elements
```

## Usage

```typescript
import "@internetarchive/elements/ia-button/ia-button";

...

<ia-button @click=() => alert('Clicked!')>Click Me</ia-button>
```

## Build Dependencies

We use SVGs in this repo, which not all build systems support out of the box. Here's how to support SVGs:

### Webpack

Add this to your Webpack config:

```json
module: {
  rules: [
    {
      test: /\.svg/,
      type: 'asset/resource',
    },
  ],
},
```

### @web/test-runner

Install rollup image plugins:

```shell
npm i -D @rollup/plugin-image @web/dev-server-rollup
```

Update config:

```js
import rollupImage from '@rollup/plugin-image';
import { rollupAdapter } from '@web/dev-server-rollup';

export default ({
  mimeTypes: {
    '**/*.scss': 'js',
    '**/*.css': 'js',
    '**/*.svg': 'js',
    '**/*.json': 'js',
  },
  plugins: [rollupAdapter(rollupImage())],
})
```

### Jest

Create `SVGMock` file, ie `tests/jest/mocks/svg.js`

```js
/**
 * Mock for SVG imports in Jest tests.
 */
export class SVGMock {}
```

Add to Jest config:

```json
"jest": {
  "moduleNameMapper": {
    "\\.svg$": "<rootDir>/tests/jest/mocks/svg.js",
  },
}
```

## Development

Requires Node 24+ and pnpm 11+. `.npmrc` sets `engine-strict=true`, so an older
Node or a different package manager fails the install rather than warning.

```zsh
pnpm install
pnpm run dev
```

## Versioning and Publishing

### Prerelease Version

1. Create prerelease version on your branch:
   1. `pnpm version prerelease --preid=<some_prefix>`
   2. If you use JIRA, recommend using the ticket number, ie `--preid=webdev-1234`
   3. This will also create a `git` tag
2. Push the tag that was created in the `pnpm version` step
3. Publish prerelease to npm:
   1. Go to the [Element release page](https://github.com/internetarchive/elements/releases)
   2. Tap `Draft a new release` button
   3. Select the tag you created
   4. Tap `Generate release notes`
   5. Select `Set as a pre-release`
   6. Tap `Publish release`

### Release Version

1. Use [Semantic Versioning](https://semver.org) to determine release number
2. On the `main` branch:
   1. Run `pnpm version [major | minor | patch]`
   2. `git push && git push --tags`
3. Publish release to npm:
   1. Go to the [Element release page](https://github.com/internetarchive/elements/releases)
   2. Tap `Draft a new release` button
   3. Select the tag you created
   4. Tap `Generate release notes`
   5. Select `Set as the latest release`
   6. Tap `Publish release`

## Adding a Component

### Structure
Each component has its own directory in `src/elements` (or `src/labs` if it's still in development). The basic structure looks like this, though components can have additional files and directories if needed. Take a look at other elements to see what they each contain.
```
src
- elements
  - ia-foobar // the name of the element
    - ia-foobar.ts // the main element class
    - ia-foobar.test.ts // the element's tests
    - ia-foobar-story.ts // an element that demos your element
```
Export your component in `src/index.ts`

### Story
To demo your component, we have a component catalog that you can add your demo to. Create a component in your component directory. Name it `COMPONENT-NAME-story.ts`, ie `ia-button-story.ts`.

We have a story template you can use for consistency. [More info on `story-template`](#story-template). The easiest way to use this is to copy an existing story and modify it for your needs.

Your story will be discovered by `/demo/app-root.ts` and added to the page.

#### Story Template<a id="story-template"></a>

The story template is a component you can use in your story to demo your component. This lets us present them in a consistent way.

It has a few main configurations:

*Properties*
- `elementTag` (_string_) your component's name, ie `ia-button`
- `labs` (_boolean_) if your component is in `labs` to update links
- `styleInputSettings` (_StyleInputSettings array_) the style options to display, in the appropriate format
- `propInputSettings` (_PropInputSettings array_) the prop options to display, in the appropriate format

**Note:** If the type of prop input you want to use isn't yet available in the `propInputSettings` options,
you can instead slot in custom property settings by using `slot="settings"`, adding a button to apply the
properties, and passing in a `customExampleUsage` (see `ia-snow-story.ts` for a sample implementation).

*Slots*
- `demo` put your component demo in here

Here's an example:
```typescript
import '@demo/story-template';

// Style options to display
const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Button BG color',
    cssVariable: '--button-background-color',
    defaultValue: 'blue',  // Should match the actual fallback value for the variable
    inputType: 'color',
  },
];

// Prop options to display
const propInputSettings: PropInputSettings[] = [
  {
    label: 'Mode',
    inputType: 'radio',
    propertyName: 'mode', // Should match the name of the property from its @property() declaration
    radioOptions: ['primary', 'secondary', 'danger'],
    defaultValue: 'primary', // Should match the actual default value from the @property() declaration, if any
  },
]
...
render() {
  return html`
    <story-template 
      elementTag="ia-button" 
      elementClassName="IAButton" 
      .styleInputData=${{settings: this.styleInputSettings}} 
      .propInputData=${{settings: this.propInputSettings}}
    >
      <div slot="demo">
        <ia-button @click=${() => alert('Button clicked!')}>
          Click Me
        </ia-button>
      </div>
    </story-template>
  `;
}
```

### Styling

For styling, our components use a series of rational CSS variable fallbacks to ensure:
1. All components render out of the box with reasonable defaults for colors, sizing, etc.
2. Customizable styles can be adjusted by the consumer by setting a CSS variable at the component or global level
3. The available variables are easy to find in the component file and visible in the story

#### Setting up styles

1. In the component's CSS, include the elements-wide `themeStyles` defaults
```
import themeStyles from '@src/themes/theme-styles';
...
static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
```
2. Check the theme styles to see if an existing theme variable exists you can use as a default, i.e. for an error message color you could use `--color-danger` if no variable exists but the style you want seems fairly reusable, see [Creating a new theme style](#creating-a-new-theme-style) below. If the variable is _not_ reusable, see [Non-reusable styles](#non-reusable-styles) below.
3. In the component, create a private CSS variable in the top-level `:host` section to make your chosen variable obvious to consumers, and then use this private variable wherever you need the value
```
css`
  :host {
      --color-danger--: var(--color-danger);
   }

   .error-msg {
      color: var(--color-danger--);
```
4. In the component's story, add the variable you chose in its full `ia-theme-` form, with its default fallback value, to the story `styleInputData`
```
const styleInputSettings: StyleInputSettings[] = [
  {
    label: 'Error color',
    cssVariable: '--ia-theme-color-danger',
    defaultValue: '#e51c23',
    inputType: 'color',
  },
```

#### Creating a new theme style
While working on a component, you may realize that a customizable style you need doesn't already have an associated variable in `theme-styles.ts`. If this happens, you can follow the following steps to add one:
1. Select a rational default value for the style, and add it to the defaults section at the top of the file:
```
--default-font-size-xs: 0.625rem /* 10px with 16px root font size */
```
2. Name the variable and add it to the adjustable styles list with the following structure:
```
--font-size-xs: var(--ia-theme-font-size-xs, var(--default-font-size-xs));
```
3. Use the variable as needed in your component and its story, following the steps in the [Setting up styles](#setting-up-styles) section

#### Non-reusable styles

If you have a variable that you want to make customizable but you're sure is only applicable for this component and wouldn't be of use elsewhere, you can add it as a private variable to `:host`, setting an explicit fallback within the component and prefixing it with the component to avoid variable overlap.
```
--my-component-max-height--: var(--my-component-max-height, 250px);
```

#### Other styles

For any styles that you won't be exposing to consumers via the story, you can proceed as usual, but we recommend adding a named `part` to areas of the component, such as nested elements, you imagine someone may want to further style directly.
```
<div class="indicator">
  <ia-status-indicator
    part="status-indicator"
    .mode=${this.validationStatus}
  ></ia-status-indicator>
</div>
```

## Component Inventory

To kickstart our library, we are going to take inventory of what already exists
and can be ported, repurposed, or deprecated in favor of the single, common solution
we are building here.

Below is a list of Lit web components that developers across the Internet Archive
have built thus far for their respective teams.

### Button

- __ads-button__ - 3 varieties, a few CSS params, and borderless styles. [@jeffwklein][jeffwklein]
  [(link)](https://github.com/internetarchive/ads-common/blob/d1dbdd0b137b54b871f1ed41a54e4256af2abaee/packages/ads-button/src/ads-button.ts)
- __ia-button__ - Many CSS-based style variations, plus loading and disabled state support, including optional custom loading message. Point: [@rebecca-shoptaw][rebecca-shoptaw]. [(link)](https://git.archive.org/www/offshoot/-/blob/main/src/widgets/ia-button.ts)

### Table

- __ads-table__ - Sortable columns, arrow key navigation, and
  multiselect support. [@jeffwklein][jeffwklein]
  [(link)](https://github.com/internetarchive/ads-common/blob/d1dbdd0b137b54b871f1ed41a54e4256af2abaee/packages/ads-table/src/ads-table.ts)

### Modal

- __modal-element (vault)__ - Latest modal for ADS, globally in use on Vault site. (ignore ads-modal) [@jeffwklein][jeffwklein]
  [(link)](https://git.archive.org/dps/vault-site/-/blob/fe99de1d53c62f426b1d6b70cc100321d651a9aa/frontend/src/modals/generic-modal.ts#L58)
- __iaux-modal-manager__ - Finicky but powerful modal manager with a number of config options. Point: likely [@latonv][latonv]. [(link)](https://github.com/internetarchive/iaux-modal-manager)

### Tree

- __ads-tree (vault)__ - Basic tree component, CSS animation arrow rotation on folder expansion,
  powers Vault file explorer, has material-UI icon dependency. [@jeffwklein][jeffwklein]
  [(link)](https://git.archive.org/dps/vault-site/-/blob/fe99de1d53c62f426b1d6b70cc100321d651a9aa/frontend/src/web-components/ads-tree.ts)

### Card

- __ads-card (vault)__ - Very basic card component, in use in Vault a couple places. [@jeffwklein][jeffwklein]
  [(link)](https://git.archive.org/dps/vault-site/-/blob/fe99de1d53c62f426b1d6b70cc100321d651a9aa/frontend/src/web-components/ads-card.ts)
- __ia-image-card__ - Simple component to display an image as a card, with an optional overlay color, hover-title, and on-click link. Used by various custom collections such as [Democracy's Library](https://archive.org/details/democracys-library). Point: [@rebecca-shoptaw][rebecca-shoptaw]. [(link)](https://git.archive.org/www/offshoot/-/blob/main/src/widgets/ia-image-card.ts)

### Toggle Switch

- __ads-toggle-switch (vault)__ - Nice toggle switch with CSS animation moving toggle back and forth. [@jeffwklein][jeffwklein]
  [(link)](https://git.archive.org/dps/vault-site/-/blob/fe99de1d53c62f426b1d6b70cc100321d651a9aa/frontend/src/web-components/ads-toggle-switch.ts)
- __toggle-switch (UX team)__ - Toggle switch with screen-reader support and a lot of CSS customization options. Point: [@latonv][latonv] & [@nsharma123][nsharma123]. [(link)](https://git.archive.org/www/offshoot/-/blob/main/src/widgets/toggle-switch.ts)
- __ia-password-toggle__ - Intended for password inputs but definitely extensible, renders an eye open/closed icon that switches the type of any input passed in from `text` to `password` and back. Point: [@rebecca-shoptaw][rebecca-shoptaw]. [(link)](https://git.archive.org/www/offshoot/-/blob/main/src/widgets/ia-password-toggle.ts)

### Icons

- Vault ([@jeffwklein][jeffwklein]) uses [material-web](https://github.com/material-components/material-web)'s `md-icon` font-based icon system. This project is
  unfor tunately in maintenance mode, but it nevertheless works well for Lit 3.
- __ia-icon__ - Icon designed to remove need for CSS-filtering, inherits current color by default and can inherit custom color via `color: ` or CSS variable. Point: [@rebecca-shoptaw][rebecca-shoptaw]. [(link)](https://git.archive.org/www/offshoot/-/blob/main/src/widgets/ia-icon.ts)
- __iaux-icons__ - Icon monorepo that also exports an `ia-icon`. Hopefully the `ia-icon` above can be folded into this one either by adding both to the library or using a library-hosted component within the icons repo. Point: [@iisa][iisa] & [@jbuckner][jbuckner]? [(link)](https://github.com/internetarchive/iaux-icons)
- __ia-icons__ - Another icon repo, this one with separate widgets for individual icons, i.e. `ia-icon-video`. Hopefully all three icon implementations here can be somehow standardized/combined in the new world. Point: [@traceypooh][traceypooh]. [(link)](https://github.com/internetarchive/ia-icons)

### Library (non-rendering)

- __ads-library__ - Includes: Helpful `fetch()` abstraction, data formatters, event abstractions,
  a place for common code dependencies within the broader component library. [@jeffwklein][jeffwklein]
  [(link)](https://github.com/internetarchive/ads-common/tree/d1dbdd0b137b54b871f1ed41a54e4256af2abaee/packages/ads-library/src)

### Carousel

- __basic-carousel (UX team)__ - Transforms any slotted content into a fully functioning carousel, including nav button showing/hiding, pagination-style-snapping, and custom arrow BG colors. Point: [@rebecca-shoptaw][rebecca-shoptaw]. [(link)](https://git.archive.org/www/offshoot/-/blob/main/src/widgets/basic-carousel.ts)

### Divider

- __ia-text-divider__ - Lightweight component to handle styling/rendering for the big ---OR--- divider used on i.e. the account settings page, can use custom text instead of `OR` if desired. Point: [@rebecca-shoptaw][rebecca-shoptaw]. [(link)](https://git.archive.org/www/offshoot/-/blob/main/src/widgets/ia-text-divider.ts?ref_type=heads)

### Banner

- __alert-banner (UX team)__ - Straightforward banner component with 3 urgency levels and an optional close button. Point: [@jbuckner][jbuckner]. [(link)](https://git.archive.org/www/offshoot/-/commits/main/src/widgets/alert-banner.ts)

### Input

- __ia-otp-input (UX team)__ - Complex little component to handle rendering a 6-box OTP input. Autofocuses first input, hops between inputs, supports pasting, autocomplete, a custom number of boxes and a custom allowed-characters regex (defaults to numeric-only). Used i.e. in the `Email me a code` modal on the [account settings](https://archive.org/account/settings) page. Point: [@rebecca-shoptaw][rebecca-shoptaw]. [(link)](https://git.archive.org/www/offshoot/-/blob/main/src/widgets/otp/ia-otp-input.ts)
- __ia-clearable-text-input__ - Text input with a clear button and substantial a11y support. Point: [@latonv][latonv]. [(link)](https://github.com/internetarchive/iaux-clearable-text-input/blob/main/src/ia-clearable-text-input.ts)

### Menu

- __ia-dropdown__ - Supports various customized dropdown menu use cases. Point: [@latonv][latonv]. [(link)](https://github.com/internetarchive/iaux-dropdown)

### Infinite Scroller

- __infinite-scroller (UX team)__ - Supports virtualized buffered scrolling of large lists. Point: [@latonv][latonv]. [(link)](https://github.com/internetarchive/iaux-infinite-scroller)

### Histogram

- __collection-histogram (UX team)__ - Histogram component, only used on collection pages at the moment, but the component is fairly general already. Point: [@latonv][latonv]. [(link)](https://git.archive.org/www/offshoot/-/blob/main/src/scenes/collection-page/components/histograms/collection-histogram.ts)
- __histogram-date-range (UX team)__ - Date range component for histogram, which we might explore consolidating with the above. Point: [@latonv][latonv]. [(link)](https://github.com/internetarchive/iaux-histogram-date-range)

### Activity Indicator

- __ia-activity-indicator__ - SVG-based circular activity indicator with two mode options, used in `ia-button` and throughout site. Point: [@jbuckner][jbuckner]. [(link)](https://github.com/internetarchive/iaux/blob/master/packages/ia-activity-indicator/src/ia-activity-indicator.ts)
- __circular-activity-indicator (UX team)__ - Variation on the IA activity indicator with CSS variable customization. Point: [@jbuckner][jbuckner]. [(link)](https://git.archive.org/www/offshoot/-/blob/main/src/widgets/activity-indicators/circular-activity-indicator.ts)
- __horizontal-activity-indicator (UX team)__ - Horizontal page-wide activity indicator, relies on the `sharedResizeObserver` which we'd need to convert and generalize as well. Point: [@jbuckner][jbuckner]. [(link)](https://git.archive.org/www/offshoot/-/blob/main/src/widgets/activity-indicators/horizontal-activity-indicator.ts)

### Responsiveness Helpers

- __SharedResizeObserver__ - Could be made into a more declarative component similar to [what Shoelace has done](https://shoelace.style/components/resize-observer). I.e., the component itself manages attaching/detaching the shared observer instance from its slotted children as part of its lifecycle, so that we don't have to repeat that logic all over our other components. Used by horizontal activity indicator and carousel. Point: [@latonv][latonv]. [(link)](https://github.com/internetarchive/iaux-shared-resize-observer)

### Accessibility Helpers

- __ia-sronly__ - Importable CSS class to quickly style screen-reader-only text. Point: [@nsharma123][nsharma123]. [(link)](https://github.com/internetarchive/iaux/blob/master/packages/ia-styles/src/ia-sronly.ts)

<!-- URLs for GitHub @s, in alphabetical order -->
[iisa]: https://github.com/iisa
[jbuckner]: https://github.com/jbuckner
[jeffwklein]: https://github.com/jeffwklein
[latonv]: https://github.com/latonv
[nsharma123]: https://github.com/nsharma123s
[rebecca-shoptaw]: https://github.com/rebecca-shoptaw
[traceypooh]: https://github.com/traceypooh
