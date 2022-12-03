import { logout } from '../api/user.js';
import { html, render, page } from '../lib.js'
import { getUserData } from '../util.js';

const nav = document.querySelector('nav');

const navTemplate = (user) => html`
            <a href="/memes">All Memes</a>
             <!-- Logged users -->
             ${user ? html`<div class="user">
             <a href="/create">Create Meme</a>
             <div class="profile">
                 <span>Welcome, ${user.email}</span>
                 <a href="/profile">My Profile</a>
                 <a @click=${onLogout} href="javascript:void(0)">Logout</a>
             </div>
         </div>` : html`<div class="guest">
         <div class="profile">
             <a href="/login">Login</a>
             <a href="/register">Register</a>
         </div>
         <a class="active" href="/">Home Page</a>
     </div>`}`

export function updateNav() {
    const user = getUserData(); // if there's no user returns NULL which is falsy so the buttons for login and register will appear

    render(navTemplate(user), nav);
}

function onLogout() {
    //because there's javascript:void(0) there's no need for prevent default
    logout();
    updateNav();
    page.redirect('/');
}
