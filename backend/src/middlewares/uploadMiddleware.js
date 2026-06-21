const path = require("path");
const Busboy = require("busboy");

const MAX_FILE_SIZE = 10 * 1024 * 1024;

const imageTypes = new Set(["image/jpeg", "image/png", "image/webp"]);
const documentTypes = new Set([
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

const singleFile = (allowedTypes) => (req, res, next) => {
  let parser;

  try {
    parser = Busboy({
      headers: req.headers,
      limits: {
        fileSize: MAX_FILE_SIZE,
        files: 1,
        fields: 0,
        parts: 1,
      },
    });
  } catch {
    res.statusCode = 400;
    return next(new Error("A multipart file upload is required"));
  }

  let file = null;
  let failure = null;
  let completed = false;

  const finish = (error) => {
    if (completed) return;
    completed = true;

    if (error) return next(error);
    req.file = file;
    return next();
  };

  parser.on("file", (fieldName, stream, info) => {
    if (fieldName !== "file") {
      res.statusCode = 400;
      failure = new Error('Upload field must be named "file"');
      stream.resume();
      return;
    }

    if (!allowedTypes.has(info.mimeType)) {
      res.statusCode = 415;
      failure = new Error("This file type is not allowed");
      stream.resume();
      return;
    }

    const chunks = [];
    let tooLarge = false;

    stream.on("limit", () => {
      tooLarge = true;
      res.statusCode = 413;
      failure = new Error("File must be 10 MB or smaller");
    });
    stream.on("data", (chunk) => {
      if (!tooLarge) chunks.push(chunk);
    });
    stream.on("end", () => {
      if (tooLarge) return;

      file = {
        buffer: Buffer.concat(chunks),
        mimetype: info.mimeType,
        originalname: path.basename(info.filename || "upload"),
      };
    });
  });

  parser.on("filesLimit", () => {
    res.statusCode = 400;
    failure = new Error("Only one file can be uploaded at a time");
  });
  parser.on("partsLimit", () => {
    res.statusCode = 400;
    failure = new Error("Unexpected multipart fields");
  });
  parser.on("error", (error) => finish(error));
  parser.on("close", () => finish(failure));

  req.pipe(parser);
};

module.exports = {
  imageUpload: singleFile(imageTypes),
  documentUpload: singleFile(documentTypes),
};
