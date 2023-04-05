class Validator {
  data: string | number | boolean;

  constructor(_data: any) {
    this.data = _data;
  }
}

export class StringValidator extends Validator {
  constructor(data: string) {
    if (typeof data !== "string") throw "Input must be a string";
    else super(data);
  }
}

abstract class RegexValidator extends StringValidator {
  protected _regex: RegExp = new RegExp("");

  constructor(data: string, message: string) {
    super(data);
    if (!this.regex.test(data)) throw message;
  }

  // Propriedade getter "regex"
  protected get regex(): RegExp {
    return this._regex;
  }
}

export class EmailValidator extends RegexValidator {
  constructor(data: string) {
    super(data, "Error: invalid email.");
  }

  protected get regex(): RegExp {
    return /^(\w{1,}@\w{1,}\.(\w{3})(\.\w{2}){0,1})$/gim;
  }
}

export class PasswordValidator extends RegexValidator {
  constructor(data: string) {
    super(data, "Error: invalid password.");
  }

  protected get regex(): RegExp {
    return /^\w{1,}$/gim;
  }
}
export class NameValidator extends RegexValidator {
  constructor(data: string) {
    super(data, "Error: invalid name.");
  }

  protected get regex(): RegExp {
    return /^([a-z]{1,})([ ]{1}[a-z]{1,}){0,}$/gim;
  }
}

export class UsernameValidator extends RegexValidator {
  constructor(data: string) {
    super(data, "Error: invalid username.");
  }

  protected get regex(): RegExp {
    return /^[a-z]{1,}$/gim;
  }
}
export class UuidValidator extends RegexValidator {
  constructor(data: string) {
    super(data, "Error: invalid uuid.");
  }

  protected get regex(): RegExp {
    return /^[a-fA-F0-9]{8}-[a-fA-F0-9]{4}-[1-5][a-fA-F0-9]{3}-[89aAbB][a-fA-F0-9]{3}-[a-fA-F0-9]{12}$/;
  }
}
