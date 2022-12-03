import { del, get, post, put } from "./api.js";

export async function getAllAlbums() {
    return get('/data/albums?sortBy=_createdOn%20desc');
}

export async function getAlbumById(id) {
    return get('/data/albums/' + id);
}

export function deleteAlbum(id) {
    return del('/data/albums/' + id);
}

export async function createAlbum(album) {
    return post('/data/albums', album);
}

export function editAlbum(id, album) {
    return put('/data/albums/' + id, album);
}

// create application service //
