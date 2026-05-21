const slugify = require("slugify");

const slugifyText = (text) => {
  return slugify(text, {
    lower: true,
    strict: true,
    trim: true,
  });
};

module.exports = slugifyText;