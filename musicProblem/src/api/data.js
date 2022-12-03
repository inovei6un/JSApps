import { del, get, post, put } from "./api.js";

const endpoints = {
    'albums': '/data/albums',
    'getAllAlbums': '/data/albums?sortBy=_createdOn%20desc&distinct=name',
    'singleAlbum' : '/data/albums/',
    'search' : '/data/albums?where='
}

export async function createAlbum(data) {
    return post(endpoints.albums, data);
}

export async function getAllAlbums() {
    return get(endpoints.getAllAlbums);
}

export async function getDetailsById(id) {
    return get(endpoints.singleAlbum + id);
}

export async function deleteAlbumById(id) {
    return del(endpoints.singleAlbum + id)
}
// create application service //

export async function updateAlbum(id, data) {
    return put(endpoints.singleAlbum + id, data)
}

export async function searchAlbum(query) {
    return get(`/data/albums?where=name%20LIKE%20%22${query}%22`)
}
