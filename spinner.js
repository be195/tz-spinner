const RADIUS = 55;

let templateNode;

class Spinner {
  _animated = false;
  _hidden = false;
  _value = 0;

  constructor(container, value = 0) {
    if (!templateNode) {
      templateNode = document.querySelector('template#spinner');
      if (!templateNode)
        throw new Error('spinner template not found!?');
    }

    const clone = document.importNode(templateNode.content, true);
    container.appendChild(clone);

    this.element = container.lastElementChild;
    this.value = value;
  }

  get inner() {
    if (!this._inner)
      this._inner = this.element.querySelector('.inner');
    return this._inner;
  }

  get circumference() {
    return 2 * Math.PI * RADIUS;
  }

  get value() {
    return this._value;
  }

  set value(value) {
    this._value = Math.min(100, Math.max(0, value));
    const offset = this.circumference - (this._value / 100) * this.circumference;
    this.inner.style.strokeDashoffset = offset;
  }

  get animated() {
    return this._animated;
  }

  set animated(animated) {
    this._animated = animated;

    if (animated)
      this.element.classList.add('animated');
    else
      this.element.classList.remove('animated');
  }

  get hidden() {
    return this._hidden;
  }

  set hidden(hidden) {
    this._hidden = hidden;
    this.inner.style.transition = hidden ? 'none' : 'inherit';
    this.element.style.visibility = hidden ? 'hidden' : 'visible';
  }
}

export default Spinner;