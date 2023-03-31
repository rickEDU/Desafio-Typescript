import {IUser, IApiResponse, IUserData, ILoginData} from "./interfaces/interface"

class Validator{
    data: string | number | boolean;

    constructor(_data: any){
        this.data = _data;
    }
}


class StringValidator extends Validator{
    
    constructor(data: string){

        if (typeof data !== 'string') throw new Error("O tipo está errado")   
        else super(data);
    }
} 

class NumberValidator extends Validator{

    constructor(data: number){

        if (typeof data !== 'number') throw new Error("O tipo está errado")   
        else super(data);

    }
} 

class BooleanValidator extends Validator{

    constructor(data: boolean){

        if (typeof data !== 'boolean') throw new Error("O tipo está errado")   
        else super(data);

    }
}

abstract class RegexValidator extends StringValidator{
    protected _regex: RegExp= new RegExp("");

    constructor(data: string){
        super(data);
        if (!this.regex.test(data)) throw new Error("O tipo está errado")   
    }

    // Propriedade getter "regex"
    protected get regex(): RegExp{
        return this._regex;        
    }
}

class EmailValidator extends RegexValidator {
    constructor(data: string){
        super(data);
    }

    protected get regex(): RegExp {
        return /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
    }
}

class PasswordValidator extends RegexValidator {
    constructor(data:string){
        super(data);
    }

    protected get regex(): RegExp {
        return /^\w{1,}$/gim;
    }
}
class NameValidator extends RegexValidator {
    constructor(data: string){
        super(data);
    }

    protected get regex(): RegExp {
        return /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
    }
}

class NameInput extends HTMLElement{
    constructor(){
        super();

        const shadow = this.attachShadow({mode: "open"});
        const input = document.createElement("input");
        input.type = 'text';
        input.placeholder='Nome';
        input.onchange = (e) => {
            try {
                new NameValidator(input.value);
            } catch (error) {
                console.log(error);
                input.innerHTML = "";
            }
        };
        shadow.appendChild(input);
    }
}

class EmailInput extends HTMLElement{
    constructor(){
        super();

        const shadow = this.attachShadow({mode: "open"});
        const input = document.createElement("input");
        input.type = 'text';
        input.placeholder='Email';
        input.onchange = (e) => {
            try {
                new EmailValidator(input.value);
            } catch (error) {
                console.log(error);
                input.innerHTML = "";
            }
        };
        shadow.appendChild(input);
    }
}
class PasswordInput extends HTMLElement{
    constructor(){
        super();

        const shadow = this.attachShadow({mode: "open"});
        const input = document.createElement("input");
        input.type = 'text';
        input.placeholder='Senha';
        input.onchange = (e) => {
            try {
                new PasswordValidator(input.value);
            } catch (error) {
                console.log(error);
                input.innerHTML = "";
            }
        };
        shadow.appendChild(input);
    }
}

customElements.define("name-input", NameInput);
customElements.define("email-input", EmailInput);
customElements.define("password-input", PasswordInput);

const registerBtn = document.getElementById("register")as HTMLButtonElement;
const loginBtn = document.getElementById("login") as HTMLButtonElement;
const updateBtn = document.getElementById("update") as HTMLButtonElement;

loginBtn.addEventListener("click", (e)=>{
    e.preventDefault();

    const inputEmail = document.querySelector("email-input") as HTMLInputElement;
    const inputPassword = document.querySelector("password-input") as HTMLInputElement;

    if(inputEmail.shadowRoot && inputPassword.shadowRoot){
        const email = inputEmail.shadowRoot.querySelector("input")?.value;
        const password = inputPassword.shadowRoot.querySelector("input")?.value;
        
        if(
            email && email !== "" &&
            password && password !== ""   
        ){
            login(email, password);
        }
    }
    
})

registerBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    const inputName = document.querySelector("name-input") as HTMLInputElement;
    const inputEmail = document.querySelector("email-input") as HTMLInputElement;
    const inputPassword = document.querySelector("password-input") as HTMLInputElement;

    if(inputName.shadowRoot && inputEmail.shadowRoot && inputPassword.shadowRoot){
        const username = inputName.shadowRoot.querySelector("input")?.value;
        const email = inputEmail.shadowRoot.querySelector("input")?.value;
        const password = inputPassword.shadowRoot.querySelector("input")?.value;
        
        if(
            username && username !== "" &&
            email && email !== "" &&
            password && password !== ""   
        ){
            create({ username, email,password});
        }
    }
});
updateBtn?.addEventListener("click", (e) => {
    e.preventDefault();

    const inputName = document.querySelector("name-input") as HTMLInputElement;
    const inputEmail = document.querySelector("email-input") as HTMLInputElement;


    if(inputName.shadowRoot && inputEmail.shadowRoot){
        const username = inputName.shadowRoot.querySelector("input")?.value;
        const email = inputEmail.shadowRoot.querySelector("input")?.value;
        
        if(
            username && username !== "" &&
            email && email !== "" 
        ){
            update(username, email);
        }
    }
});

async function create(user: IUser){
    console.log(user, "user")
    const options: RequestInit =  {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(user)
    }

    try {
        const response: Response = await fetch(
            "/accounts", options);
        const result: IApiResponse<IUserData> = await response.json();

        console.log(result);
        // console.log(data.error);
        
    } catch (error) {
        console.log(error);
    }
}
async function login(_email:string, _password:string){
    const body = {
        email: _email,
        password: _password
    }

    const options: RequestInit =  {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    }
    try {
        const response: Response = await fetch(
            "/accounts/login", options);
        const result: IApiResponse<ILoginData> = await response.json();

        console.log(result, "login");
        // console.log(data.error);
        
    } catch (error) {
        console.log(error);
    }
}
async function update(_username:string, _email:string){
    const body = {
        username: _username,
        email: _email,
    }
    console.log("entrou", body)
    const options: RequestInit =  {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    }
    try {
        const response: Response = await fetch(
            "/accounts/", options);
        const result: IApiResponse<IUserData> = await response.json();

        console.log(result, "update");
        // console.log(data.error);
        
    } catch (error) {
        console.log(error);
    }
}


export default {create}
