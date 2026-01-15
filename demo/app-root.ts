import { html, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

import '@src/elements/ia-button/ia-button-story';
import '@src/labs/ia-snow/ia-snow-story';
import '@src/elements/ia-status-indicator/ia-status-indicator-story';

@customElement('app-root')
export class AppRoot extends LitElement {
  render() {
    return html`
      <h1>🏛️ Internet Archive Elements ⚛️</h1>

      <fieldset>
        <legend>Settings</legend>
        <label for="darkModeToggle">Dark Mode</label>
        <input type="checkbox" switch @change=${this.toggleDarkMode} />
      </fieldset>

      <h2>🚀 Production-Ready Elements</h2>

      <ia-status-indicator-story></ia-status-indicator-story>

      <h2>🧪 Labs Elements</h2>

      <ia-snow-story></ia-snow-story>
      <ia-button-story></ia-button-story>
    `;
  }

  private toggleDarkMode(event: Event) {
    const checkbox = event.target as HTMLInputElement;
    if (checkbox.checked) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }
}
