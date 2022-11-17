class ProgressElement {
  constructor(id) {
    this.element = document.querySelector(`.${id}`);
  }

  show() {
    this.element.style.display = "flex";
  }

  hide() {
    this.element.style.display = "none";
  }

  setText(text) {
    this.element.querySelector(".info-box h3").textContent = text;
  }
}

export const PROGRESS_ELEMENT = new ProgressElement("progress");
