class ImgLook extends HTMLElement {
    constructor() {
        super();
        this.style.display = "block";
        this.style.height = "200px";
        this.style.width = "200px";
        document.body.append(this);
    }
    hide() {
        this.hidden = true;
    }
}
customElements.define("img-new", ImgLook);
let look = new ImgLook;
look.style.backgroundImage = 'url("images/fire.jpg")'