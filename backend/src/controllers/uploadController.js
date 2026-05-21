const asyncHandler = require("../utils/asyncHandler");
const apiResponse = require("../utils/apiResponse");
const {
  uploadToCloudinary,
  deleteFromCloudinary,
} = require("../services/cloudinaryService");

exports.uploadImage = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.statusCode = 400;
    throw new Error("No file uploaded");
  }

  const result = await uploadToCloudinary(
    req.file.buffer,
    "toplink-security/images",
    "image"
  );

  return apiResponse(res, 201, "Image uploaded successfully", {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
  });
});

exports.uploadDocument = asyncHandler(async (req, res) => {
  if (!req.file) {
    res.statusCode = 400;
    throw new Error("No file uploaded");
  }

  const rawTypes = [
    "application/pdf",
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  ];

  const isRawFile = rawTypes.includes(req.file.mimetype);

  const result = await uploadToCloudinary(
    req.file.buffer,
    "toplink-security/documents",
    isRawFile ? "raw" : "auto"
  );

  return apiResponse(res, 201, "Document uploaded successfully", {
    url: result.secure_url,
    publicId: result.public_id,
    resourceType: result.resource_type,
    format: result.format,
    originalName: req.file.originalname,
    mimeType: req.file.mimetype,
  });
});

exports.deleteUpload = asyncHandler(async (req, res) => {
  const { publicId, resourceType } = req.body;

  if (!publicId) {
    res.statusCode = 400;
    throw new Error("Public ID is required");
  }

  await deleteFromCloudinary(publicId, resourceType || "image");

  return apiResponse(res, 200, "File deleted successfully");
});