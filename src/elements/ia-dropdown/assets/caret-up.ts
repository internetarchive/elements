/**
 * @file Caret Up Icon
 *
 * Kept as an inline Lit `svg` template rather than an imported `.svg` file so
 * that `ia-dropdown` can recolor it via the `--dropdownCaretColor` CSS var,
 * which is not possible on the contents of an `<img>`.
 */
import { svg } from 'lit';

export default svg`<svg class="caret-up-svg" viewBox="0 0 8 4" xmlns="http://www.w3.org/2000/svg">
<path d="m6.7226499 3.51689722c.22976435.15317623.54019902.0910893.69337525-.13867505.13615665-.20423497.10222882-.47220946-.06836249-.63681849l-.07031256-.05655675-3.2773501-2.18490007-3.2773501 2.18490007c-.22976434.15317623-.29185128.4636109-.13867505.69337524.13615665.20423498.39656688.27598409.61412572.18182636l.07924953-.04315131 2.7226499-1.81402514z"
  fill=""></path>
</svg>`;
