class Validator {
  data: string | number | boolean;

  constructor(_data: any) {
    this.data = _data;
  }
}

export class StringValidator extends Validator {
  constructor(data: string) {
    if (typeof data !== "string") throw "O tipo deve ser uma string";
    else super(data);
  }
}

abstract class RegexValidator extends StringValidator {
  protected _regex: RegExp = new RegExp("");

  constructor(data: string) {
    super(data);
    if (!this.regex.test(data)) throw "O tipo está errado";
  }

  // Propriedade getter "regex"
  protected get regex(): RegExp {
    return this._regex;
  }
}

export class EmailValidator extends RegexValidator {
  constructor(data: string) {
    super(data);
  }

  protected get regex(): RegExp {
    return /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
  }
}

export class PasswordValidator extends RegexValidator {
  constructor(data: string) {
    super(data);
  }

  protected get regex(): RegExp {
    return /^\w{1,}$/gim;
  }
}
export class NameValidator extends RegexValidator {
  constructor(data: string) {
    super(data);
  }

  protected get regex(): RegExp {
    return /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
  }
}
