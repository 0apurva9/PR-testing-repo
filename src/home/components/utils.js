export function transformData(datum) {
  let image = datum.imageUrl;
  if (!image) {
    image = datum.imageURL;
  }

  let title = datum.productName;
  if (!title) {
    title = datum.title;
  }

  if (datum.image_link) {
    image = datum.image_link;
  }

  let url;
  if (datum.webURL) {
    url = datum.webURL;
  }

  if (datum.link) {
    url = datum.link;
  }
  let price;
  if (datum.mrp) {
    price = datum.mrp;
  }
  if (datum.mrpPrice) {
    price = datum.mrpPrice.doubleValue;
  }
  if (datum.price) {
    price = datum.price;
  }
  let discountPrice;
  if (datum.winningSellerMOP) {
    discountPrice = datum.winningSellerMOP;
  }
  if (datum.winningSellerSpecialPrice) {
    discountPrice = datum.winningSellerSpecialPrice;
  }
  if (datum.discountedPrice) {
    discountPrice = datum.discountedPrice.doubleValue;
  }
  if (datum && datum.winningSellerPrice) {
    discountPrice =
      datum.winningSellerPrice && datum.winningSellerPrice.doubleValue;
  }
  if (datum && datum.mop) {
    discountPrice = datum.mop;
  }
  return {
    image: image,
    video: datum.video,
    title: title,
    description: datum.description,
    price,
    discountPrice,
    webURL: url,
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
