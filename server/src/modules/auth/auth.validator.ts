import Joi from "joi";

export const validateUserAuth = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);
  return !!error ? next(new Error(error.details[0].message)) : next();
};
