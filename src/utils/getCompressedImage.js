import Compressor from "compressorjs";

export const getCompressedImage = async (file, imageQuality) => {
  if (!file) {
    return;
  }
  let compressedImage = await new Promise((resolve, reject) => {
    new Compressor(file, {
      // quality: imageQuality || 0.6,
      quality: file.size > 1000000 ? 0.1 : 0.3,
      success: resolve,
      error: reject,
    });
  });

  return new File([compressedImage], compressedImage.name);
};
