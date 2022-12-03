import { deleteMeme, getMemeById } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (meme, isOwner, onDelete) => html`
            <section id="meme-details">
            <h1>Meme Title: ${meme.title}

            </h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${meme.imageUrl}>
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${meme.description}
                    </p>

                    <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->

                    ${isOwner ? html`<a class="button warning" href="/edit/${meme._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>` : nothing}
                    
            
                </div>
            </div>
        </section>`;


export async function showDetails(ctx) {
    const id = ctx.params.id
    const meme = await getMemeById(id)
    const userData = getUserData();

    const isOwner = userData && userData.id == meme._ownerId; // alternative userData?.id == meme._ownerId;
    ctx.render(detailsTemplate(meme, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this meme?');

        if (choice) {
            await deleteMeme(id)
            ctx.page.redirect('/memes');
        }
    }
}
