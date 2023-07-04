class HeroComp extends HTMLElement {
	connectedCallback() {
		this.src = this.getAttribute('src') || '';
		this.srcset = this.getAttribute('srcset') || '';
		this.alt = this.getAttribute('alt') || 'Restaurant Catalogue Main Image';
		this.render();
	}

	render() {
		this.innerHTML = `
			<picture>
				<source media="(max-width: 600px)" srcset="${this.srcset}">
				<img src="${this.src}" id="hero"
				alt="${this.alt}">
      </picture>
            `;
	}

	attributeChangedCallback(name, oldValue, newValue) {
		this[name] = newValue;
		this.render();
	}

	static get observedAttributes() {
		return ['src','srcset','alt'];
	}
}

customElements.define('hero-comp', HeroComp);
