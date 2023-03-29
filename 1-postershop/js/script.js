const app = {
    el: {
        gallery: document.querySelector('main#gallery'),
        posters: document.querySelectorAll('#gallery > article'),
        single: document.querySelector('main#single'),
        header: document.querySelector('header')
    },
    state: {
        selectedPoster: null
    },
    async toggleViews(){
        this.el.gallery.classList.toggle('hide');
        this.el.single.classList.toggle('hide');
    },
    async setSelectedPoster(e){
        // get pressed data
        const id = e.target.parentNode.getAttribute('data-id');
        this.state.selectedPoster = id;
        const title = e.target.parentNode.children[1].innerText;
        const desc = e.target.parentNode.children[2].innerText

        this.el.single.innerHTML = '';

        const el = `
        <article>
            <img src="assets/char-${id}.png" alt="${title}" />
            <h2>${title}</h2>
            <p>${desc}</p>
            <button>Tillbaka</button>
        </article>
        `;

        this.el.single.insertAdjacentHTML('beforeend', el);

        document.querySelector('button').addEventListener('click', () => {
            this.toggleViews()
        })
    },
    async addEvents(){
        // Gallery events
        this.el.posters.forEach(article => {
            article.addEventListener('click', (e) => {
                this.setSelectedPoster(e);
                this.toggleViews()
            })
        })
    },
    async init(){
        this.addEvents();
    }
}

app.init()