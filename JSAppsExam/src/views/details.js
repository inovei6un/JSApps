import { deleteAlbum, getAlbumById } from "../api/data.js";
import { html, nothing } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (album, isOwner, onDelete) => html`
      <section id="details">
        <div id="details-wrapper">
          <p id="details-title">Album Details</p>
          <div id="img-wrapper">
            <img src=${album.imageUrl} alt="example1" />
          </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">0</span></div>

          <!--Edit and Delete are only for creator-->
          ${isOwner ? html`<div id="action-buttons">
          
          <a href="/edit/${album._id}" id="edit-btn">Edit</a>
          <a @click=${onDelete} href="" id="delete-btn">Delete</a>
        </div>` : nothing}
        </div>
      </section>`;
// <a href="" id="like-btn">Like</a> above edit button

export async function showDetails(ctx) {
    const id = ctx.params.id;
    const album = await getAlbumById(id)
    const userData = getUserData();

    const isOwner = userData && userData._id == album._ownerId; // alternative userData?.id == meme._ownerId;
    ctx.render(detailsTemplate(album, isOwner, onDelete));

    async function onDelete() {
        const choice = confirm('Are you sure you want to delete this album?');

        if (choice) {
            await deleteAlbum(album._id)
            ctx.page.redirect('/dashboard');
        }
    }
}
