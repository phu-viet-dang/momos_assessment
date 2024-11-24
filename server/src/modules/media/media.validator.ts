import Joi, { CustomHelpers } from "joi";

const getMediaParamsValidator = (req: any, res: any, next: any) => {
  const schema = Joi.object({
    page: Joi.number(),
    limit: Joi.number(),
    type: Joi.string().valid("image", "video"),
    searchKey: Joi.string(),
  });

  const { error } = schema.validate(req.query);
  return !!error ? next(new Error(error.details[0].message)) : next();
};

const urlsValidator = (req: any, res: any, next: any) => {
  // Custom URL validation function
  const validateUrl = (value: string, helpers: CustomHelpers) => {
    try {
      const url = new URL(value);
      if (!url.protocol.startsWith("http")) {
        throw new Error("URL must start with http or https");
      }
      return value; // If valid, return the value
    } catch (err) {
      return helpers.error("any.invalid"); // Return Joi error
    }
  };

  const schema = Joi.object({
    url: Joi.array()
      .items(
        Joi.string().pattern(
          /^https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}(:[0-9]{1,5})?(\/.*)?$/,
          "URL validation"
        )
      )
      .required(),
  });

  const { error } = schema.validate(req.body);
  return !!error ? next(new Error(error.details[0].message)) : next();
};

const MediaValidator = {
  urlsValidator,
  getMediaParamsValidator,
};

export default MediaValidator;
