class Validator {
    constructor(_data) {
        this.data = _data;
    }
}
class StringValidator extends Validator {
    constructor(data) {
        if (typeof data !== "string")
            throw "O tipo deve ser uma string";
        else
            super(data);
    }
}
class RegexValidator extends StringValidator {
    constructor(data) {
        super(data);
        this._regex = new RegExp("");
        if (!this.regex.test(data))
            throw "O tipo está errado";
    }
    // Propriedade getter "regex"
    get regex() {
        return this._regex;
    }
}
export class EmailValidator extends RegexValidator {
    constructor(data) {
        super(data);
    }
    get regex() {
        return /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
    }
}
export class PasswordValidator extends RegexValidator {
    constructor(data) {
        super(data);
    }
    get regex() {
        return /^\w{1,}$/gim;
    }
}
export class NameValidator extends RegexValidator {
    constructor(data) {
        super(data);
    }
    get regex() {
        return /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
    }
}
