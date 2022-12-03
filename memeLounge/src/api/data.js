import { del, get, post, put } from "./api.js";

export async function getAllMemes() {
    return get('/data/memes?sortBy=_createdOn%20desc');
}

export async function createMeme(meme) {
    return post('/data/memes', meme);
}

export async function getMemeById(id) {
    return get('/data/memes/' + id);
}

export function deleteMeme(id) {
    return del('/data/memes/' + id);
}

export function editMeme(id, meme) {
    return put('/data/memes/' + id, meme);
}

export function getMemesByUser(userId) {
    return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
// create application service //
