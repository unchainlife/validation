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
  1. Number
  1. String [WIP]
  1. Date [WIP]
  1. Boolean [WIP]
1. Strict enforcement
1. Required values [WIP]
1. Number ranges [WIP]
1. String lengths [WIP]
1. Array Values [WIP]
1. Regular Expression [WIP]
1. Custom Validation [WIP]
