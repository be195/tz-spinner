import Spinner from './spinner.js';

function tryGetElement(selector) {
  const element = document.querySelector(selector);
  if (!element) throw new Error(`No element with selector '${selector}' found`);

  return element
}

let animated = false;
let hide = false;

(function() {
  const spinnerContainer = tryGetElement('.spinner');
  const spinner = new Spinner(spinnerContainer, 25); // by default set to 25%

  const progressInput = tryGetElement('#progress');
  const animateCheckbox = tryGetElement('#animate');
  const hideCheckbox = tryGetElement('#hide');

  animateCheckbox.addEventListener('change', () => {
    animated = animateCheckbox.checked;
    spinner.animated = animated;
  });

  hideCheckbox.addEventListener('change', () => {
    hide = hideCheckbox.checked;
    spinner.hidden = hide;
  });

  function onInput() {
    const value = parseInt(progressInput.value);
    spinner.value = value;
  }

  progressInput.value = spinner.value;
  progressInput.addEventListener('input', onInput);
})();