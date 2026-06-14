import cloudinary from "../config/cloudinary.js";



export const uploadFile = async (req, res) => {
  try {
    console.log("FILE RECEIVED");

    const file =
      req.file.buffer.toString("base64");

    console.log("BASE64 CREATED");

    const result =
      await cloudinary.uploader.upload(
        `data:${req.file.mimetype};base64,${file}`,
        {
          resource_type: "auto",
        }
      );

    console.log("UPLOAD SUCCESS");

    res.status(200).json({
      success: true,
      url: result.secure_url,
    });
  } catch (error) {
    console.log("UPLOAD ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};