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
@customElement('ia-share-panel')
export class IASharePanel extends LitElement {
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
          --item-navigator-share-link-color--: var(
            --item-navigator-share-link-color,
            var(--true-white)
          );
          --item-navigator-share-icon-border--: var(
            --item-navigator-share-icon-border,
            #4b4b4b
          );
          --item-navigator-share-icon-bg--: var(
            --item-navigator-share-icon-bg,
            transparent
          );
          --item-navigator-icon-fill-color--: var(
            --item-navigator-icon-fill-color,
            var(--true-white)
          );
          --item-navigator-textarea-color--: var(
            --item-navigator-textarea-color,
            var(--true-white)
          );
          --item-navigator-textarea-bg--: var(
            --item-navigator-textarea-bg,
            #151515
          );

          display: block;
          height: 100%;
          overflow-y: auto;
          font-size: 1.4rem;
          box-sizing: border-box;
        }

        header {
          display: flex;
          align-items: baseline;
        }

        h3 {
          padding: 0;
          margin: 0 1rem 0 0;
          font-size: 1.6rem;
        }

        h4 {
          font-size: 1.4rem;
        }

        :host > div {
          padding: 1rem 0;
        }

        .share-option {
          display: block;
          padding: 0.5rem 0;
          font-size: 1.6rem;
          text-decoration: none;
          color: var(--item-navigator-share-link-color--);
          cursor: pointer;
          transition: background-color 0.2s;
          border-radius: 6px;
        }

        .share-option:hover {
          background-color: rgba(255, 255, 255, 0.05);
        }

        .share-option > * {
          display: inline-block;
          padding: 0.2rem;
          margin-right: 1rem;
          vertical-align: middle;
          border: 1px solid var(--item-navigator-share-icon-border--);
          border-radius: 7px;
          background: var(--item-navigator-share-icon-bg--);
        }

        .share-option .ia-icon {
          width: 2rem;
          height: 2rem;
        }

        .ia-icon .fill-color {
          fill: var(--item-navigator-icon-fill-color--);
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
          color: var(--item-navigator-share-link-color--);
        }

        .code {
          position: relative;
        }

        textarea {
          display: block;
          width: 100%;
          height: 120px;
          padding: 0.8rem 1rem;
          box-sizing: border-box;
          resize: none;
          cursor: pointer;
          font: normal 1.4rem var(--base-font-family);
          color: var(--item-navigator-textarea-color--);
          background: var(--item-navigator-textarea-bg--);
        }

        small {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 3rem;
          padding: 0.5rem 1rem;
          box-sizing: border-box;
          font: normal 1.2rem/2rem var(--base-font-family);
          color: var(--item-navigator-textarea-bg--);
          background: var(--item-navigator-textarea-color--);
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
