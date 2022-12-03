import { html } from "../lib.js";
import { register } from "../api/user.js";
import { createSubmitHandler } from "../util.js";
import { notify } from "./notify.js";

const registerTemplate = (onRegister) => html`
        <section id="register">
            <form @submit=${onRegister} id="register-form">
                <div class="container">
                    <h1>Register</h1>
                    <label for="username">Username</label>
                    <input id="username" type="text" placeholder="Enter Username" name="username">
                    <label for="email">Email</label>
                    <input id="email" type="text" placeholder="Enter Email" name="email">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <label for="repeatPass">Repeat Password</label>
                    <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
                    <div class="gender">
                        <input type="radio" name="gender" id="female" value="female">
                        <label for="female">Female</label>
                        <input type="radio" name="gender" id="male" value="male" checked>
                        <label for="male">Male</label>
                    </div>
                    <input type="submit" class="registerbtn button" value="Register">
                    <div class="container signin">
                        <p>Already have an account?<a href="/login">Sign in</a>.</p>
                    </div>
                </div>
            </form>
        </section>`

export async function showRegister(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    async function onRegister({username, email, password, repeatPass, gender}) { 
        if (username == '' || email == '' || password == '') {
            return notify('All fields are required!')
        }

        if (password != repeatPass) {
            return notify(`Passwords don't match!`)
        }

        await register(username, email, password, gender);  // await to check if the fetch is successful if it's not code will stop
        ctx.updateNav();
        ctx.page.redirect('/memes');
    }
}
