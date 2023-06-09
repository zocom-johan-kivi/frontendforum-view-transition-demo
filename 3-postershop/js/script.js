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
            document.startViewTransition(() => {
                // remove transitionName
                this.toggleViews()
                setTimeout(() => {
                    document.querySelector(`[data-id="${this.state.selectedPoster}"] > img`).style.viewTransitionName = '';
                }, 1)
            });
        })

    },
    async addEvents(){
        // Gallery events
        this.el.posters.forEach(article => {
            article.addEventListener('click', (e) => {
                if(e.target.nodeName === 'IMG'){ // Only click on img
                    this.setSelectedPoster(e);
                    e.target.style.viewTransitionName = 'poster-img';
                    document.startViewTransition(() => this.toggleViews());
                }
            })
        })
    },
    async init(){
        this.addEvents();
    }
}

app.init()