export function getFormattedProductsForBundling(products) {
  let mainBundledProductsUssIds = [];
  products &&
    products.map((product, index) => {
      if (
        product.bundledAssociatedItems &&
        product.bundledAssociatedItems.length > 0
      ) {
        mainBundledProductsUssIds.push({
          ussId: product.USSID,
          productIndex: index
        });
      }
    });

  let digitalBundledProductIndex = [];
  mainBundledProductsUssIds &&
    mainBundledProductsUssIds.length > 0 &&
    mainBundledProductsUssIds.map(productUssId => {
      // let physicalBundledProducts = products.filter((product,index,arr)=>{
      //   if(product.bundledwithSKU === productUssId.ussId && !product.isDigitalBundled){
      //     products.splice(index,1);
      //   }
      //   return product.bundledwithSKU === productUssId.ussId && !product.isDigitalBundled;
      // });

      // if(physicalBundledProducts && physicalBundledProducts.length > 0){
      //   physicalBundledProducts.map((physicalBundledProduct,index)=>{
      //     products.splice(productUssId.productIndex+index+1, 0, physicalBundledProduct);
      //   });
      // }

      let digitalBundledProducts = products.filter((product, index, arr) => {
        if (
          product.bundledwithSKU === productUssId.ussId &&
          product.isDigitalBundled
        ) {
          digitalBundledProductIndex.push(index);
        }
        return (
          product.bundledwithSKU === productUssId.ussId &&
          product.isDigitalBundled
        );
      });

      if (digitalBundledProducts && digitalBundledProducts.length > 0) {
        products[
          productUssId.productIndex
        ].digitalProductData = digitalBundledProducts;
      }
    });

  if (digitalBundledProductIndex) {
    for (var i = digitalBundledProductIndex.length - 1; i >= 0; i--) {
      products.splice(digitalBundledProductIndex[i], 1);
    }
  }
  return products;
}
