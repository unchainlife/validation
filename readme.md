# JSON Validation

# Example

    const validate = require('validation-unchained');

    const { errors, data } = model.validate({
      username: 'chris',
      password: 'pass'
    }, {
      strict: true,
      rules: {
        username: { type: String },
        password: { type: String, length: { min: 6, max: 255, inclusive: true } }
      }
    });
    console.log(errors);
    // => { password: [ 'Must be between 6 and 255 characters long.' ] }

## Features

1. Type Conversion
    1. Boolean
    1. Date
    1. Number
    1. String
1. Strict enforcement
1. Array Values
1. All Types
    1. Required
1. Boolean Validation
1. Date Validation
1. Number Validation
    1. Min values
    1. Max values
1. String Validation
    1. Required values
    1. String lengths
    1. Regular Expression
1. Custom Validation [WIP]
