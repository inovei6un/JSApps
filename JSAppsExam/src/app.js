import {page, render} from './lib.js';
import {updateNav} from './views/nav.js';
import { getUserData } from './util.js';
import { showHome } from './views/home.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showCatalog } from './views/dashboard.js';
import { showDetails } from './views/details.js';
import { showCreate } from './views/create.js';
import { showEdit } from './views/edit.js';

const main = document.querySelector('main'); // probably different id


page(decorateContext); // this is the best way to use middleware everywhere
page('/', showHome); // should put functions without ()
page('/login', showLogin);
page('/register', showRegister);
page('/dashboard', showCatalog);
page('/create', showCreate);
page('/details/:id', showDetails);
page('/edit/:id', showEdit);

updateNav();
//start page
page.start();


function decorateContext(ctx, next) {  // this is middleware 
    ctx.render = renderMain;
    ctx.updateNav = updateNav;

    const user = getUserData();
    if (user) {
        ctx.user = user; // to check if the ids are the same
    }

    next();
}

function renderMain(content) {
    render(content, main);
}



