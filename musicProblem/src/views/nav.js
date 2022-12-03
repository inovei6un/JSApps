import { logout } from '../api/user.js';
import { html, render, page } from '../lib.js'
import { getUserData } from '../util.js';

const nav = document.querySelector('nav');

const navTemplate = (hasUser) => html`
                <img src="./images/headphones.png">
                <a href="/">Home</a>
                <ul>
                    <!--All user-->
                    <li><a href="/catalog">Catalog</a></li>
                    <li><a href="/search">Search</a></li>
                    ${hasUser ?
                    html`<li><a href="/create">Create Album</a></li>
                    <li><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>`: html`<li><a href="/login">Login</a></li>
                    <li><a href="/register">Register</a></li>`}
                </ul>`

export function updateNav() {

    const user = getUserData(); // if there's no user returns NULL which is falsy so the buttons for login and register will appear

    

    render(navTemplate(Boolean(user)), nav);
}

function onLogout() {
    //because there's javascript:void(0) there's no need for prevent default
    logout();
    updateNav();
    page.redirect('/');
}
