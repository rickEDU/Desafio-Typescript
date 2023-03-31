var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class Validator {
    constructor(_data) {
        this.data = _data;
    }
}
class StringValidator extends Validator {
    constructor(data) {
        if (typeof data !== 'string')
            throw new Error("O tipo está errado");
        else
            super(data);
    }
}
class NumberValidator extends Validator {
    constructor(data) {
        if (typeof data !== 'number')
            throw new Error("O tipo está errado");
        else
            super(data);
    }
}
class BooleanValidator extends Validator {
    constructor(data) {
        if (typeof data !== 'boolean')
            throw new Error("O tipo está errado");
        else
            super(data);
    }
}
class RegexValidator extends StringValidator {
    constructor(data) {
        super(data);
        this._regex = new RegExp("");
        if (!this.regex.test(data))
            throw new Error("O tipo está errado");
    }
    // Propriedade getter "regex"
    get regex() {
        return this._regex;
    }
}
class EmailValidator extends RegexValidator {
    constructor(data) {
        super(data);
    }
    get regex() {
        return /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
    }
}
class PasswordValidator extends RegexValidator {
    constructor(data) {
        super(data);
    }
    get regex() {
        return /^\w{1,}$/gim;
    }
}
class NameValidator extends RegexValidator {
    constructor(data) {
        super(data);
    }
    get regex() {
        return /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
    }
}
class NameInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const input = document.createElement("input");
        input.type = 'text';
        input.placeholder = 'Nome';
        input.onchange = (e) => {
            try {
                new NameValidator(input.value);
            }
            catch (error) {
                console.log(error);
                input.innerHTML = "";
            }
        };
        shadow.appendChild(input);
    }
}
class EmailInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const input = document.createElement("input");
        input.type = 'text';
        input.placeholder = 'Email';
        input.onchange = (e) => {
            try {
                new EmailValidator(input.value);
            }
            catch (error) {
                console.log(error);
                input.innerHTML = "";
            }
        };
        shadow.appendChild(input);
    }
}
class PasswordInput extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        const input = document.createElement("input");
        input.type = 'text';
        input.placeholder = 'Senha';
        input.onchange = (e) => {
            try {
                new PasswordValidator(input.value);
            }
            catch (error) {
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
const registerBtn = document.getElementById("register");
const loginBtn = document.getElementById("login");
const updateBtn = document.getElementById("update");
loginBtn.addEventListener("click", (e) => {
    var _a, _b;
    e.preventDefault();
    const inputEmail = document.querySelector("email-input");
    const inputPassword = document.querySelector("password-input");
    if (inputEmail.shadowRoot && inputPassword.shadowRoot) {
        const email = (_a = inputEmail.shadowRoot.querySelector("input")) === null || _a === void 0 ? void 0 : _a.value;
        const password = (_b = inputPassword.shadowRoot.querySelector("input")) === null || _b === void 0 ? void 0 : _b.value;
        if (email && email !== "" &&
            password && password !== "") {
            login(email, password);
        }
    }
});
registerBtn === null || registerBtn === void 0 ? void 0 : registerBtn.addEventListener("click", (e) => {
    var _a, _b, _c;
    e.preventDefault();
    const inputName = document.querySelector("name-input");
    const inputEmail = document.querySelector("email-input");
    const inputPassword = document.querySelector("password-input");
    if (inputName.shadowRoot && inputEmail.shadowRoot && inputPassword.shadowRoot) {
        const username = (_a = inputName.shadowRoot.querySelector("input")) === null || _a === void 0 ? void 0 : _a.value;
        const email = (_b = inputEmail.shadowRoot.querySelector("input")) === null || _b === void 0 ? void 0 : _b.value;
        const password = (_c = inputPassword.shadowRoot.querySelector("input")) === null || _c === void 0 ? void 0 : _c.value;
        if (username && username !== "" &&
            email && email !== "" &&
            password && password !== "") {
            create({ username, email, password });
        }
    }
});
updateBtn === null || updateBtn === void 0 ? void 0 : updateBtn.addEventListener("click", (e) => {
    var _a, _b;
    e.preventDefault();
    const inputName = document.querySelector("name-input");
    const inputEmail = document.querySelector("email-input");
    if (inputName.shadowRoot && inputEmail.shadowRoot) {
        const username = (_a = inputName.shadowRoot.querySelector("input")) === null || _a === void 0 ? void 0 : _a.value;
        const email = (_b = inputEmail.shadowRoot.querySelector("input")) === null || _b === void 0 ? void 0 : _b.value;
        if (username && username !== "" &&
            email && email !== "") {
            update(username, email);
        }
    }
});
function create(user) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(user, "user");
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };
        try {
            const response = yield fetch("/accounts", options);
            const result = yield response.json();
            console.log(result);
            // console.log(data.error);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function login(_email, _password) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = {
            email: _email,
            password: _password
        };
        const options = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        try {
            const response = yield fetch("/accounts/login", options);
            const result = yield response.json();
            console.log(result, "login");
            // console.log(data.error);
        }
        catch (error) {
            console.log(error);
        }
    });
}
function update(_username, _email) {
    return __awaiter(this, void 0, void 0, function* () {
        const body = {
            username: _username,
            email: _email,
        };
        console.log("entrou", body);
        const options = {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        };
        try {
            const response = yield fetch("/accounts/", options);
            const result = yield response.json();
            console.log(result, "update");
            // console.log(data.error);
        }
        catch (error) {
            console.log(error);
        }
    });
}
export default { create };
