/**
 * @todo use accessibility modifier eg: public constructor(){}
 */
export default class DOMElement {
  parent: HTMLElement;
  /**
   * @todo make use of specific type
   */
  styles: string | string[];
  element: HTMLElement;

  constructor(
    parent: HTMLElement,
    styles: string | string[],
    text?: Promise<string | string[]> | string | string[],
    /**
     * @todo unused param
     */
    link?: string,
  ) {
    this.parent = parent;
    this.styles = styles;
    /**
     * @todo property assigned twice
     */
    this.element = document.createElement('div');
    this.element = this.addStyles(this.styles);
    if (text) this.addText(text);
  }
  /**
   @todo Make the method flexible to append multiple child,
   example present as addElementsToDom() method below
   @todo uneccesary return element, this.element will get manipulated 
  */
  appendToDom(): HTMLElement {
    const elementAlreadyAppended = this.parent.querySelector(`.${this.styles}`) !== null;
    if (!elementAlreadyAppended) this.parent.appendChild(this.element);
    return this.element;
  }

  /**
   *   @todo uneccesary return element, this.element will get manipulated
   */
  prependToDom(overwrite?: boolean): HTMLElement {
    const existedElement = this.parent.querySelector(`:scope > .${this.styles}`);
    if (existedElement) {
      if (overwrite) this.parent.removeChild(existedElement);
      else return this.element;
    }
    this.parent.prepend(this.element);
    return this.element;
  }

  /**
   * @todo uneccesary return element, this.element will get manipulated
   */
  addStyles(styles: string | string[]): HTMLElement {
    this.style(this.element, styles);
    return this.element;
  }

  /**
   * @todo use an interface for params
   */
  private async addText(text: Promise<string | string[]> | string | string[]) {
    if (text instanceof Promise) text = await text;
    if (typeof text === 'string') {
      this.appendText(text);
    } else
      text.forEach((textElement) => {
        this.appendText(textElement);
      });
  }

  private appendText(text: string) {
    const textElem = document.createElement('span');
    const textNode = document.createTextNode(text);
    textElem.appendChild(textNode);
    this.element.appendChild(textElem);
  }
  /**
   * @todo uneccesary return element, this.element will get manipulated
   */
  private style(elem: HTMLElement, styles: string | string[]): HTMLElement {
    if (typeof styles === 'string') {
      elem.classList.add(styles);
    } else {
      styles.forEach((style) => {
        elem.classList.add(style);
      });
    }
    return elem;
  }

  /**
   appends list of  children to the parent element
  */
  addElementsToDom(elements: HTMLElement[]) {
    const elementAlreadyAppended = this.parent.querySelector(`.${this.styles}`) !== null;
    if (!elementAlreadyAppended) this.parent.appendChild(this.element);
    for (let i = 0; i < elements.length; i++) {
      this.element.appendChild(elements[i]);
    }
  }
}
