const Joi = require('joi');

const schema = Joi.object({
  username: Joi.string().alphanum().min(4).max(30).required(),
});

console.log(schema.validate({username:  'Victor'}));
console.log(schema.validate({username:  'Vic'}));
console.log(schema.validate({username:  ''}));
