'use strict';

function addError(result, name, message) {
  if (!result.errors) {
    result.errors = { };
  }
  if (result.errors[name]) {
    result.errors[name].push(message);
  } else {
    result.errors[name] = [message];
  }
}

function validateStrict(result, data, options) {
  for (var name in options.rules) {
    const rule = options.rules[name];
    if (rule.required === false) continue;
    if (!data[name]) {
      addError(result, name, `Attribute missing.`);
    }
  }
  for (var attr in data) {
    if (!options.rules) {
      addError(errors, rule, 'Unexpected attribute.');
    }
  }
  return true;
}

function convertNumber(result, name, value) {
  if (typeof value === 'undefined') return null;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const num = Number.parseFloat(value);
    if (!isNaN(num)) return num;
  }
  addError(result, name, `'${value}' is not a valid number.`);
  return value;
}

function convertString(result, name, value) {
  return (value === null ||
          typeof value === 'undefined' ||
          typeof value === 'string')
    ? value
    : value.toString();
}

function convertBoolean(result, name, value) {
  return (
    typeof value === 'string' &&
    ['1', 'on', 'true'].indexOf(value.toLowerCase()) == -1
  ) || !!value;
}

function convertDate(result, name, value) {
  if (value === null ||
      typeof value === 'undefined' ||
      value instanceof Date) {
    return value;
  }
  var date = Date.parse(value);
  if (!isNaN(date)) return new Date(date);
  addError(result, name, `'${value}' is not a valid date.`);
  return value;
}

function convertValue(result, name, type, value) {
  switch (type) {
    case Boolean:
      return convertBoolean(result, name, value);
    case Number:
      return convertNumber(result, name, value);
    case String:
      return convertString(result, name, value);
    case Date:
      return convertDate(result, name, value);
    default:
      return value;
  }
}

function convertType(result, data, options, name, rule, value) {
  if (Array.isArray(rule.type)) {
    if (rule.type.length !== 1) {
      return addError(result, name, 'type is not properly defined.');
    }
    if (Array.isArray(value)) {
      var a = [];
      for (var i=0,j=value.length;i<j;i++) {
        a.push(convertValue(result, name, rule.type[0], value[i]));
      }
      value = a;
    } else if (rule.split) {
      value = value.split(rule.split);
    } else {
      value = [ convertValue(result, name, rule.type[0], value) ];
    }
  } else {
    value = convertValue(result, name, rule.type, value);
  }
  result.data[name] = value;
  return true;
}

function validateNumber(result, name, rule, value) {
  if (rule.min && rule.max && (value < rule.min || value > rule.max)) {
    addError(result, name, `${value} must be between ${rule.min} and ${rule.max}.`);
  } else if (rule.min && value < rule.min) {
    addError(result, name, `${value} must be at least ${rule.min}.`);
  } else if (rule.max && value > rule.max) {
    addError(result, name, `${value} must be not above ${rule.max}.`);
  }
}

function validateString(result, name, rule, value) {
  let length = value.length;
  if (rule.minLength && rule.maxLength && (length < rule.minLength || length > rule.maxLength)) {
    addError(result, name, `length must be between ${rule.minLength} and ${rule.maxLength}.`);
  } else if (rule.minLength && length < rule.minLength) {
    addError(result, name, `Length must be at least ${rule.minLength}.`);
  } else if (rule.maxLength && length > rule.maxLength) {
    addError(result, name, `Length must be at most ${rule.maxLength}.`);
  }
  if (rule.required && length == 0) {
    addError(result, name, 'value is required.');
  }
  if (rule.pattern) {
    let regex = typeof rule.pattern === 'string'
              ? new Regex(rule.pattern)
              : rule.pattern;
    if (!regex.test(value)) {
      addError(result, name, 'value is invaid.');
    }
  }
}

function validateBoolean(result, name, rule, value) {
}

function validateDate(result, name, rule, value) {
}

function validateUndefined(result, name, rule, value) {
  if (rule.required) {
    addError(result, name, `a value is required.`);
  }
}

function validateRule(result, data, options, name, rule, value) {
  if (!convertType(result, data, options, name, rule, value)) return false;
  value = result.data[name];
  switch(typeof value) {
    case 'boolean':
      validateBoolean(result, name, rule, value);
      break;
    case 'number':
      validateNumber(result, name, rule, value);
      break;
    case 'string':
      validateString(result, name, rule, value);
      break;
    case 'object':
      if (value instanceof Date) {
        validateDate(result, name, rule, value)
        break;
      }
      // null falls through
    case 'undefined':
      validateUndefined(result, name, rule, value);
      break;
    default:
      addError(result, name, `Unhandled type: ${typeof value}`);
  }
  return true;
}

function validateRules(result, data, options) {
  if (!options.rules) throw new Error("options.rules not defined.");
  for (var name in options.rules) {
    const rule = options.rules[name];
    const value = data[name];
    if (!validateRule(result, data, options, name, rule, value)) return false;
  }
}

function validate(data, options) {
  options.strict    = options.strict || false;
  options.errors    = options.errors || '$errors';
  options.firstOnly = options.firstOnly || false;

  var result = {
    errors: undefined,
    data: { }
  };

  if (options.strict) {
    validateStrict(result, data, options);
  }
  validateRules(result, data, options);
  return result;
}

module.exports = validate;
