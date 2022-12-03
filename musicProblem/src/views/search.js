import { searchAlbum } from '../api/data.js';
import {html, nothing} from '../lib.js'

const searchTemplate = (isClicked, handler, albums, hasUser) => html`
            <section id="searchPage">
            <h1>Search by Name</h1>

            <div class="search">
                <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
                <button @click=${handler} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            ${
                isClicked ?
                albums.length > 0 ?
                html`<div class="search-result"></div>
                ${albums.map(album => createCard(album, hasUser))}</div>`
                 : html`<p class="no-result">No result.</p>` : nothing
            }     
            </div>
        </section>`
        
const createCard = (album, hasUser) = html`<div class="card-box">
                    <img src=${album.imgUrl}>
                    <div>
                        <div class="text-center">
                            <p class="name">Name: ${album.name}</p>
                            <p class="artist">Artist: ${album.artist}</p>
                            <p class="genre">Genre: ${album.genre}</p>
                            <p class="price">Price: $${album.price}</p>
                            <p class="date">Release Date: ${album.releaseDate}</p>
                        </div>
                        ${hasUser ? html`<div class="btn-group">
                        <a href="/details/${album._id}" id="details">Details</a>
                    </div>`: nothing}`


export async function showSearch (ctx) {
    const isClicked = false
    ctx.render(searchTemplate(false, onSearch));

    async function onSearch(event) {
        const searchField = document.getElementById('search-input');
        const query = searchField.value;
        if (!query) {
            return alert('Fill da damn field')
        }

        const albums = await searchAlbum(query);

        ctx.render(searchTemplate(true, onSearch, albums, Boolean(ctx.user)))
    }
}


