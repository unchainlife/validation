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

function convertNumber(result, name, rule, value) {
  if (typeof value === 'undefined') return null;
  if (typeof value === 'number') return value;
  if (typeof value === 'string') {
    const num = Number.parseFloat(value);
    if (!isNaN(num)) return num;
  }
  addError(result, name, `'${value}' is not a valid number.`);
  return value;
}

function convertString(result, name, rule, value) {
  if (typeof value === 'undefined') return null;
  if (typeof value === 'string') return value;
  return value.toString();
}

function convertDate(result, name, rule, value) {
  if (typeof value === 'undefined') return null;
  if (value instanceof Date) return value;
  if (typeof value === 'string') {
    var date = Date.parse(value);
    if (!isNaN(date)) return new Date(date);
  }
  addError(result, name, `'${value}' is not a valid date.`);
  return value;
}

function convertType(result, data, options, name, rule, value) {
  if (Array.isArray(rule.type)) {
    result.data[name] = value;
  } else {
    switch (rule.type) {
      case Number:
        result.data[name] = convertNumber(result, name, rule, value);
        break;
      case String:
        result.data[name] = convertString(result, name, rule, value);
        break;
      case Date:
        result.data[name] = convertDate(result, name, rule, value);
        break;
      default:
        result.data[name] = value;
    }
  }
  return true;
}

function validateRule(result, data, options, name, rule, value) {
  if (!convertType(result, data, options, name, rule, value)) return false;
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
