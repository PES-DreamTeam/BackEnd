const Joi = require('joi');

const create = {
    body: Joi.object().keys({
        brand: Joi.string().required(),
        model: Joi.string().required(),
        chargerType: Joi.string().required(),
    })
}

module.exports = {
    create
}
