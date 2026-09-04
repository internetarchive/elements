import { css, html, LitElement, type CSSResultGroup } from 'lit';
import { customElement, state } from 'lit/decorators.js';

import './ia-image-viewer';
import type { ImageViewerImage } from './models';
import type { StyleInputData } from '@demo/story-components/story-styles-settings';
import '@demo/story-template';

/**
 * Placeholder images, generated rather than fetched so the demo works offline
 * and doesn't depend on any particular item staying up.
 */
function swatch(label: string, background: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600">
    <rect width="800" height="600" fill="${background}"/>
    <text x="400" y="320" font-family="sans-serif" font-size="72"
      fill="#ffffff" text-anchor="middle">${label}</text>
  </svg>`;
  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}

const DEMO_IMAGES: ImageViewerImage[] = [
  { name: 'one.svg', title: 'First image', url: swatch('1', '#1b263b') },
  { name: 'two.svg', title: 'Second image', url: swatch('2', '#2c3e50') },
  { name: 'three.svg', title: 'Third image', url: swatch('3', '#14301a') },
  { name: 'four.svg', title: 'Fourth image', url: swatch('4', '#4a1f29') },
];

/** An image that will never load, for the failure state. */
const BROKEN_IMAGE: ImageViewerImage = {
  name: 'missing.jpg',
  title: 'Missing image',
  url: 'https://example.invalid/missing.jpg',
};

@customElement('ia-image-viewer-story')
export class IAImageViewerStory extends LitElement {
  @state() private includeBroken = false;

  @state() private singleImage = false;

  @state() private lastEvent = '';

  /**
   * The three lists are built once rather than per render, so toggling a
   * setting is the only thing that changes what the viewer is handed. Building
   * them in the getter would hand over a new array every time the event log
   * updates.
   */
  private static readonly IMAGE_SETS = {
    default: DEMO_IMAGES,
    withBroken: [DEMO_IMAGES[0], BROKEN_IMAGE, ...DEMO_IMAGES.slice(1)],
    single: [DEMO_IMAGES[0]],
  };

  private get images(): ImageViewerImage[] {
    const sets = IAImageViewerStory.IMAGE_SETS;
    if (this.singleImage) return sets.single;
    return this.includeBroken ? sets.withBroken : sets.default;
  }

  private get styleInputData(): StyleInputData {
    return {
      settings: [
        {
          label: 'Height',
          cssVariable: '--image-viewer-height',
          defaultValue: 400,
          inputType: 'range',
          min: 200,
          max: 700,
          step: 10,
          unit: 'px',
        },
        {
          label: 'Text color',
          cssVariable: '--image-viewer-text-color',
          defaultValue: '#ffffff',
          inputType: 'color',
        },
        {
          label: 'Glow color',
          cssVariable: '--image-viewer-glow-color',
          defaultValue: '#ffffff',
          inputType: 'color',
        },
        {
          label: 'Slide duration',
          cssVariable: '--image-viewer-slide-duration',
          defaultValue: 500,
          inputType: 'range',
          min: 0,
          max: 1500,
          step: 50,
          unit: 'ms',
        },
      ],
    };
  }

  private onImageChanged(e: CustomEvent): void {
    this.lastEvent = `imageChanged → ${e.detail.image.name} (index ${e.detail.index})`;
  }

  private onImageLoadFailed(e: CustomEvent): void {
    this.lastEvent = `imageLoadFailed → ${e.detail.image.name}`;
  }

  private toggleRow(label: string, key: 'includeBroken' | 'singleImage') {
    return html`
      <tr>
        <td>${label}</td>
        <td>
          <input
            type="checkbox"
            .checked=${this[key]}
            @change=${() => {
              this[key] = !this[key];
            }}
          />
        </td>
      </tr>
    `;
  }

  render() {
    return html`
      <story-template
        elementTag="ia-image-viewer"
        elementClassName="IAImageViewer"
        .styleInputData=${this.styleInputData}
      >
        <div slot="demo">
          <div class="stage">
            <ia-image-viewer
              .images=${this.images}
              @imageChanged=${this.onImageChanged}
              @imageLoadFailed=${this.onImageLoadFailed}
            ></ia-image-viewer>
          </div>
          <p class="event-log">${this.lastEvent || 'No events yet.'}</p>
        </div>

        <div slot="settings">
          <table>
            ${this.toggleRow('Include a broken image', 'includeBroken')}
            ${this.toggleRow('Single image (no controls)', 'singleImage')}
          </table>
          <p class="hint">
            Arrow keys navigate, and so does a horizontal trackpad swipe. Narrow
            the demo below 890px to move the buttons under the image. Turn on
            Reduce Motion in your OS to see navigation land without animating.
          </p>
        </div>

        <div slot="usage-notes">
          <p>
            The viewer takes a plain list of
            <code>{ name, url, title? }</code> and knows nothing about where the
            images came from. It reports the image it lands on through
            <code>imageChanged</code>, so a host can mirror that into its own
            URL or analytics.
          </p>
          <p>
            Clicking an image opens it in a new tab.
            <code>imageActivated</code> is cancelable, so a host that wants a
            lightbox instead can call <code>preventDefault()</code> on it.
          </p>
        </div>
      </story-template>
    `;
  }

  static get styles(): CSSResultGroup {
    return css`
      .stage {
        background: #222;
        --image-viewer-height: 400px;
      }

      .event-log {
        margin: 0.8rem 0 0;
        font-family: monospace;
        font-size: 1.2rem;
      }

      .hint {
        font-size: 1.2rem;
      }

      td {
        padding-right: 1rem;
      }
    `;
  }
}
