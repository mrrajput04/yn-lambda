const Joi = require("joi");

async function validateUserBody(req, res, next) {
  const userSchema = Joi.object({
    first_name: Joi.string().max(256).required(),
    middle_name: Joi.string().max(256).allow(""),
    last_name: Joi.string().max(256).required(),
    mother_name: Joi.string().max(128),
    gender: Joi.string().max(30).required(),
    email_address: Joi.string().email().max(256).allow(""),
    aadhaar_no: Joi.string().max(30).allow(""),
    dob: Joi.date().iso().default("1900-01-01").required(),
    qualification: Joi.string().max(256).allow(""),
    phone_number: Joi.string().min(10).max(10).required(),
    phone_type: Joi.string().max(64).allow(""),
    phone_belongs_to: Joi.string().max(128).allow(""),
    state: Joi.string().max(256).required(),
    district: Joi.string().max(256).required(),
    block: Joi.string().max(256).required(),
    village: Joi.string().max(256).required(),
    program_id: Joi.number().integer(),
    proposed_village: Joi.string().max(256).allow(""),
    language: Joi.string().max(128).allow(""),
    status: Joi.string().max(30).allow(""),
    workplace_id: Joi.string().max(30).allow(""),
    external_id: Joi.string().max(30).allow(""),
    username: Joi.string().max(128).allow(""),
    access_code: Joi.string().max(128).allow(""),
    access_code_expiry: Joi.string().max(30).allow(""),
    is_deleted: Joi.number().integer().default(0),
    entity_id: Joi.string().max(128).allow(""),
    enrollment_seq: Joi.number().integer().default(0),
    is_kas_message: Joi.number().integer().default(0),
    created_by: Joi.string().max(128),
    updated_by: Joi.string().max(128),
    pos_id: Joi.number().integer().default(0),
    is_coach: Joi.number().integer().default(0),
    is_generated: Joi.number().integer().default(0),
    is_generated_pos: Joi.number().integer().default(0),
    blood_group: Joi.string().max(20).allow(""),
    is_pan: Joi.number().integer().default(0),
    is_aadhaar: Joi.number().integer().default(0),
    is_bank_acc: Joi.number().integer().default(0),
    in_readingcamp: Joi.number().integer(),
    in_mathcamp: Joi.number().integer(),
    is_leader: Joi.number().integer().default(0),
  });

  try {
    const value = await userSchema.validateAsync(req.body);
    return next();
  } catch (e) {
    return next(e);
  }
}

module.exports = validateUserBody;
