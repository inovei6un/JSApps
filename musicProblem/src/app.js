import {page, render} from './lib.js';
import { updateNav } from './views/nav.js';
import { getUserData } from './util.js';
import { showLogin } from './views/login.js';
import { showRegister } from './views/register.js';
import { showHome } from './views/home.js';
import { showCreate } from './views/create.js';
import { showCatalog } from './views/catalog.js';
import { showDetails } from './views/details.js';
import { showEdit } from './views/edit.js';
import { showSearch } from './views/search.js';

const main = document.getElementById('main-content'); // probably different id


page(decorateContext); // this is the best way to use middleware everywhere

//page routing
page('/', showHome); // should put functions without ()
page('/home', showHome);
page('/login', showLogin);
page('/register', showRegister);
page('/catalog', showCatalog);
page('/create', showCreate);
page('/details/:id', showDetails); // breaks
page('/edit/:id', showEdit); // breaks // both proly bcuz id
page('/search', showSearch);

updateNav();
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



