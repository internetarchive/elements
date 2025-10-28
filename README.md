# 📚 _ia-components_ 🏛️


## Component Inventory

To kickstart our library, we are going to take inventory of what already exists
and can be ported, repurposed, or deprecated in favor of the single, common solution
we are building here.

Below is a list of Lit web components that developers across the Internet Archive
have built thus far for their respective teams.

### Button

- __ads-button__ - 3 varieties, a few CSS params, and borderless styles.
  [(link)](https://github.com/internetarchive/ads-common/blob/d1dbdd0b137b54b871f1ed41a54e4256af2abaee/packages/ads-button/src/ads-button.ts)
- _ia-button_ - [(link)](URL)

### Table

- __ads-table__ - Sortable columns, arrow key navigation, and
  multiselect support.
  [(link)](https://github.com/internetarchive/ads-common/blob/d1dbdd0b137b54b871f1ed41a54e4256af2abaee/packages/ads-table/src/ads-table.ts)

### Modal

- __modal-element (vault)__ - Latest modal for ADS, globally in use on Vault site. (ignore ads-modal)
  [(link)](https://git.archive.org/dps/vault-site/-/blob/fe99de1d53c62f426b1d6b70cc100321d651a9aa/frontend/src/modals/generic-modal.ts#L58)

### Tree

- __ads-tree (vault)__ - Basic tree component, CSS animation arrow rotation on folder expansion,
  powers Vault file explorer, has material-UI icon dependency.
  [(link)](https://git.archive.org/dps/vault-site/-/blob/fe99de1d53c62f426b1d6b70cc100321d651a9aa/frontend/src/web-components/ads-tree.ts)

### Card

- __ads-card (vault)__ - Very basic card component, in use in Vault a couple places.
  [(link)](https://git.archive.org/dps/vault-site/-/blob/fe99de1d53c62f426b1d6b70cc100321d651a9aa/frontend/src/web-components/ads-card.ts)

### Toggle Switch

- __ads-toggle-switch (vault)__ - Nice toggle switch with CSS animation moving toggle back and forth.
  [(link)](https://git.archive.org/dps/vault-site/-/blob/fe99de1d53c62f426b1d6b70cc100321d651a9aa/frontend/src/web-components/ads-toggle-switch.ts)

### Icons

- Vault uses [material-web](https://github.com/material-components/material-web)'s `md-icon` font-based icon system. This project is
  unfortunately in maintenance mode, but it nevertheless works well for Lit 3.

### Library (non-rendering)

- __ads-library__ - Includes: Helpful `fetch()` abstraction, data formatters, event abstractions,
  a place for common code dependencies within the broader component library.
  [(link)](https://github.com/internetarchive/ads-common/tree/d1dbdd0b137b54b871f1ed41a54e4256af2abaee/packages/ads-library/src)
