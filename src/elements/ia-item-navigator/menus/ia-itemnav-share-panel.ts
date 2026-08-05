import {
  css,
  html,
  LitElement,
  nothing,
  PropertyValues,
  TemplateResult,
  type CSSResultGroup,
} from 'lit';
import { customElement, property } from 'lit/decorators.js';
import themeStyles from '@src/themes/theme-styles';
import {
  shareIcon,
  twitterIcon,
  facebookIcon,
  tumblrIcon,
  pinterestIcon,
  emailIcon,
  linkIcon,
} from './share-icons';

type ShareOption = {
  name: string;
  icon: TemplateResult | string;
  url: string;
};

/** Icon for the share menu shortcut / menu entry. */
export { shareIcon };

/**
 * The "share this item" side panel: social sharing links (Twitter, Facebook,
 * Tumblr, Pinterest, email) plus copyable iframe / bbcode embed snippets.
 * Sharing options are derived from the item identifier/metadata and rebuilt
 * whenever `sharingOptions` is reset to empty.
 */
@customElement('ia-itemnav-share-panel')
export class IAItemNavSharePanel extends LitElement {
  @property({ type: String }) baseHost = 'archive.org';

  @property({ type: String }) creator = '';

  @property({ type: String }) description = '';

  @property({ type: Boolean }) embedOptionsVisible = false;

  @property({ type: String }) identifier = '';

  @property({ type: Array }) sharingOptions: ShareOption[] = [];

  @property({ type: String }) type = '';

  @property({ type: Boolean }) renderHeader = false;

  @property({ type: String }) fileSubPrefix = '';

  private copyNoteTimeouts = new WeakMap<
    Element,
    ReturnType<typeof setTimeout>
  >();

  updated(changed: PropertyValues): void {
    if (changed.has('sharingOptions') && !this.sharingOptions.length) {
      this.loadProviders();
    }
  }

  loadProviders(): void {
    let shareUrl = `https://${this.baseHost}/details/${this.identifier}`;
    if (this.fileSubPrefix) {
      shareUrl += `/${this.fileSubPrefix}`;
    }
    const shareBlurb = [
      this.description,
      this.creator,
      'Free Download, Borrow, and Streaming',
      'Internet Archive',
    ]
      .filter(Boolean)
      .join(' : ');

    this.sharingOptions = [
      {
        name: 'Twitter',
        icon: twitterIcon,
        url: `https://twitter.com/intent/tweet?${new URLSearchParams({
          url: shareUrl,
          text: shareBlurb,
          via: 'internetarchive',
        })}`,
      },
      {
        name: 'Facebook',
        icon: facebookIcon,
        url: `https://www.facebook.com/sharer/sharer.php?${new URLSearchParams({
          u: shareUrl,
        })}`,
      },
      {
        name: 'Tumblr',
        icon: tumblrIcon,
        url: `https://www.tumblr.com/widgets/share/tool/preview?${new URLSearchParams(
          {
            posttype: 'link',
            canonicalUrl: shareUrl,
            title: shareBlurb,
          },
        )}`,
      },
      {
        name: 'Pinterest',
        icon: pinterestIcon,
        url: `http://www.pinterest.com/pin/create/button/?${new URLSearchParams(
          {
            url: shareUrl,
            description: shareBlurb,
          },
        )}`,
      },
      {
        name: 'Email',
        icon: emailIcon,
        url: `mailto:?${new URLSearchParams({
          subject: shareBlurb,
          body: shareUrl,
        })}`,
      },
    ];
  }

  /**
   * Copies the embed snippet in the clicked `.code` block, preferring the async
   * Clipboard API and falling back to the legacy `execCommand` path for
   * browsers that lack it, then briefly flashes the "Copied" note.
   */
  private async copyToClipboard(event: MouseEvent): Promise<void> {
    const currentTarget = event.currentTarget as HTMLElement;
    const textarea = currentTarget.querySelector('textarea');
    const note = currentTarget.querySelector('small');
    if (!textarea || !note) return;

    try {
      await navigator.clipboard.writeText(textarea.value);
    } catch {
      // Fallback for browsers without the async Clipboard API.
      textarea.select();
      document.execCommand('copy');
      textarea.blur();
    }

    note.classList.add('visible');
    clearTimeout(this.copyNoteTimeouts.get(note));
    this.copyNoteTimeouts.set(
      note,
      setTimeout(() => note.classList.remove('visible'), 4000),
    );
  }

  get iframeEmbed(): string {
    return `<iframe
      src="https://${this.baseHost}/embed/${this.identifier}"
      width="560" height="384" frameborder="0"
      webkitallowfullscreen="true" mozallowfullscreen="true" allowfullscreen
    ></iframe>`;
  }

  get bbcodeEmbed(): string {
    return `[archiveorg ${this.identifier} width=560 height=384 frameborder=0 webkitallowfullscreen=true mozallowfullscreen=true]`;
  }

  get helpURL(): string {
    return `https://${this.baseHost}/help/audio.php?identifier=${this.identifier}`;
  }

  get header(): TemplateResult | typeof nothing {
    const header = html`<header><h3>Share this ${this.type}</h3></header>`;
    return this.renderHeader ? header : nothing;
  }

  render(): TemplateResult {
    return html`
      ${this.header}
      <div>
        ${this.sharingOptions.map(
          (option) =>
            html`<a class="share-option" href=${option.url} target="_blank">
              ${option.icon} ${option.name}
            </a>`,
        )}
        <details>
          <summary class="share-option">
            ${linkIcon} Get an embeddable link
          </summary>
          <div class="embed">
            <h4>Embed</h4>
            <div class="code" @click=${this.copyToClipboard}>
              <textarea readonly>${this.iframeEmbed}</textarea>
              <small>Copied to clipboard</small>
            </div>
            <h4>
              Embed for wordpress.com hosted blogs and archive.org item
              &lt;description&gt; tags
            </h4>
            <div class="code" @click=${this.copyToClipboard}>
              <textarea readonly>${this.bbcodeEmbed}</textarea>
              <small>Copied to clipboard</small>
            </div>
            <p>
              Want more?
              <a href=${this.helpURL}
                >Advanced embedding details, examples, and help</a
              >!
            </p>
          </div>
        </details>
      </div>
    `;
  }

  static get styles(): CSSResultGroup {
    return [
      themeStyles,
      css`
        :host {
          --item-navigator-text-color--: var(
            --item-navigator-text-color,
            var(--true-white)
          );
          --item-navigator-border-color--: var(
            --item-navigator-border-color,
            #4b4b4b
          );
          /* Icons follow the adjustable text color by default. */
          --item-navigator-icon-color--: var(
            --item-navigator-icon-color,
            var(--item-navigator-text-color--)
          );
          --item-navigator-share-embed-bg--: var(
            --item-navigator-share-embed-bg,
            #151515
          );

          display: block;
          height: 100%;
          overflow-y: auto;
          /* 10px base (petabox scale); internal sizing is em against it. */
          font-size: var(--item-navigator-base-font-size, 10px);
          color: var(--item-navigator-text-color--);
          box-sizing: border-box;
        }

        header {
          display: flex;
          align-items: baseline;
        }

        h3 {
          padding: 0;
          margin: 0 1em 0 0;
          font-size: 1.6em;
        }

        h4 {
          font-size: 1.4em;
        }

        :host > div {
          padding: 1em 0;
        }

        .share-option {
          display: block;
          padding: 0.5em 0;
          font-size: 1.6em;
          text-decoration: none;
          color: var(--item-navigator-text-color--);
          cursor: pointer;
          transition: background-color 0.2s;
          border-radius: 6px;
        }

        .share-option:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .share-option > * {
          display: inline-block;
          padding: 0.2em;
          margin-right: 1em;
          vertical-align: middle;
          border: 1px solid var(--item-navigator-border-color--);
          border-radius: 7px;
        }

        .share-option .ia-icon {
          /* Reset to the base so the icon (em) doesn't compound against the
             share-option's enlarged font-size. */
          font-size: var(--item-navigator-base-font-size, 10px);
          width: 2em;
          height: 2em;
        }

        /* Our glyphs are masked spans: the mask supplies the shape, this
           supplies the paint. */
        span.ia-icon {
          background-color: var(--item-navigator-icon-color--);
        }

        /* Host-supplied icons may still be inline svg, so keep theming those
           the original way. */
        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-color--);
        }

        /* Hide the triangle that appears on details tags */
        summary::marker {
          content: '';
        }

        summary::-webkit-details-marker {
          display: none;
        }

        .embed {
          padding-right: 5px;
        }

        .embed a {
          color: var(--item-navigator-text-color--);
        }

        .code {
          position: relative;
        }

        textarea {
          display: block;
          width: 100%;
          height: 120px;
          padding: 0.8em 1em;
          box-sizing: border-box;
          resize: none;
          cursor: pointer;
          font: normal 1.4em var(--base-font-family);
          color: var(--item-navigator-text-color--);
          background: var(--item-navigator-share-embed-bg--);
        }

        small {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3em;
          padding: 0.5em 1em;
          box-sizing: border-box;
          font: normal 1.2em/2em var(--base-font-family);
          color: var(--item-navigator-share-embed-bg--);
          background: var(--item-navigator-text-color--);
          opacity: 0;
          transition: opacity 300ms linear;
        }

        small.visible {
          opacity: 1;
        }
      `,
    ];
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'ia-itemnav-share-panel': IAItemNavSharePanel;
  }
}
