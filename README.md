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

## Development

```zsh
npm i
npm run dev
```

## Versioning and Publishing

### Prerelease Version

1. Create prerelease version on your branch:
   1. `npm version prerelease --preid=<some_prefix>`
   2. If you use JIRA, recommend using the ticket number, ie `--preid=webdev-1234`
   3. This will also create a `git` tag
2. Push the tag that was created in the `npm version` step
3. Publish prerelease to npm:
   1. Go to the [Element's release page](https://github.com/internetarchive/elements/releases)
   2. Tap `Draft a new release` button
   3. Select the tag you created
   4. Tap `Generate release notes`
   5. Select `Set as a pre-release`
   6. Tap `Publish release`

### Release Version

1. Use [Semantic Versioning](https://semver.org) to determine release number
2. On the `main` branch:
   1. Run `npm version [major | minor | patch]`
   2. `git push && git push --tags`
3. Publish release to npm:
   1. Go to the [Element's release page](https://github.com/internetarchive/elements/releases)
   2. Tap `Draft a new release` button
   3. Select the tag you created
   4. Tap `Generate release notes`
   5. Select `Set as the latest release`
   6. Tap `Publish release`

## Adding a Component

### Structure
Each component has its own directory in `src/elements` (or `src/labs` if it's still in development). The basic structure looks like this, though components can have additional files and directories if neededd. Take a look at other elements to see what they each contain.
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

Import your story in `/demo/app-root.ts` and add it to the page.

#### Story Template<a id="story-template"></a>

The story template is a component you can use in your story to demo your component. This lets us present them in a consistent way.

It has 5 main configurations:

*Properties*
- `elementTag` (_string_) your component's name, ie `ia-button`
- `exampleUsage` (_string_) your element's example usage, displays it with syntax highlighting
- `labs` (_boolean_) if your component is in `labs` to update links

*Slots*
- `demo` put your component demo in here
- `settings` put your component settings in here

Here's an example:
```typescript
import '@demo/story-template';
...
render() {
  return html`
    <story-template elementTag="ia-button" elementClassName="IAButton" .exampleUsage=${this.exampleUsage}>
      <div slot="demo">
        <ia-button @click=${() => alert('Button clicked!')}
          >Click Me</ia-button
        >
      </div>

      <div slot="settings">
        <table>
          <tr>
            <td>Color</td>
            <td><input type="color" value="#007bff" id="color" /></td>
          </tr>
        </table>
        <button @click=${this.apply}>Apply</button>
      </div>
    </story-template>
  `;
}

// return a string of your element's usage and it will
// be displayed with syntax highlighting
// can be dynamic
private get exampleUsage(): string {
  return `<ia-button @click=\${() => alert('Button clicked!')}>
    Click Me
  </ia-button>`;
}

private apply(): void {
  // update component settings based on settings change
}
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
