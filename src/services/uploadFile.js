const path = require("path");
const { json } = require("stream/consumers");
const uploadSingleFile = async (fileObject) => {
  let uploadPath = path.resolve(__dirname, "../public/images/upload");

  let extName = path.extname(fileObject.name);
  let baseName = path.basename(fileObject.name, extName);

  let finalName = `${baseName}-${Date.now()}${extName}`;
  let finalPath = `${uploadPath}/${finalName}`;

  // Use the mv() method to place the file somewhere on your server

  try {
    await fileObject.mv(finalPath);
    return {
      status: "success",
      path: finalPath,
      error: null,
    };
  } catch (error) {
    return {
      status: "error",
      path: null,
      error: error,
    };
  }
};

const uploadMultipleFiles = async (filesArray) => {
  let uploadPath = path.resolve(__dirname, "../public/images/upload");
  let count = 0;
  let results = [];
  const start = Date.now();
  for (i = 0; i < filesArray.length; i++) {
    let extName = path.extname(filesArray[i].name);
    let baseName = path.basename(filesArray[i].name, extName);

    let finalName = `${baseName}-${Date.now()}${extName}`;
    let finalPath = `${uploadPath}/${finalName}`;
    try {
      await filesArray[i].mv(finalPath);
      results.push({
        status: "success",
        path: finalPath,
        filename: filesArray[i].finalName,
        error: null,
      });
      count++;
    } catch (error) {
      results.push({
        status: "failed",
        path: finalPath,
        filename: filesArray[i].finalName,
        error: JSON.stringify(error),
      });
    }
  }
  const end = Date.now();
  return {
    count,
    results,
    time: `${(end - start) / 1000}s`,
  };
};

module.exports = { uploadSingleFile, uploadMultipleFiles };
