export function transformData(datum) {
  let image = datum.imageUrl;
  if (!image) {
    image = datum.imageURL;
  }

  let title = datum.productName;
  if (!title) {
    title = datum.title;
  }
  console.log("IN TRANSFORM DATA");
  console.log(datum);
  return {
    image: image,
    video: datum.video,
    title: title,
    description: datum.description,
    price: datum.mrp,
    discountPrice: datum.winningSellerMOP,
    webURL: datum.webURL,
    ...datum
  };
}
export function transformItem(datum) {
  return {
    imageURL: datum.imageUrl,
    discountPrice: datum.winningSellerMOP,
    price: datum.mrp,
    title: datum.productName,
    webURL: datum.webURL
  };
}
