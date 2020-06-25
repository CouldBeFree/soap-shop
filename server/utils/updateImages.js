const updateImages = (files, imagesFromClient) => {
  if(!files && !imagesFromClient) return;
  let images = [];

  if (files && !imagesFromClient) {
    images = files
  } else if (files && imagesFromClient) {
    for(const image of imagesFromClient) {
      images.push(JSON.parse(image));
    }
    images = [...images, ...files];
  } else {
    for(const image of imagesFromClient) {
      images.push(JSON.parse(image));
    }
  }

  return images;
}

module.exports = updateImages;
