import { page, render } from "./lib.js";
import { updateNav } from "./views/nav.js";
import { getUserData } from "./util.js";
import { showHome } from "./views/homeView.js";
import { showCatalog } from "./views/catalog.js";
import { showLogin } from "./views/login.js";
import { showRegister } from "./views/register.js";
import { showCreate } from "./views/create.js";
import { showDetails } from "./views/details.js";
import { showEdit } from "./views/edit.js";
import { showProfile } from "./views/profile.js";

const main = document.querySelector('main');


page(decorateContext); // this is the best way to use middleware everywhere

page('/', showHome);
page('/memes', showCatalog);
page('/memes/:id', showDetails);
page('/login', showLogin);
page('/register', showRegister);
page('/create', showCreate);
page('/profile', showProfile);
page('/edit/:id', showEdit);
updateNav();

//Start App
page.start();


function decorateContext(ctx, next) {  // this is middleware 
    ctx.render = renderMain; // this is how we get render in ctx
    ctx.updateNav = updateNav;

    const user = getUserData();
    if (user) {
        ctx.user = user; // to check if the ids are the same
    }

    next();
}

function renderMain(templateResult) {
    render(templateResult, main); // will hook the view on main
}



