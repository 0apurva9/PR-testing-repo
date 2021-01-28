import React from "react";
import FeedComponentABPC from "./FeedComponentABPC";
import ProductImageHeader from "../../general/components/ProductImageHeader";
import Logo from "../../general/components/Logo";
import { TATA_CLIQ_ROOT } from "../../lib/apiRequest.js";

export default class MsdAutomatedBrandProductCarousel extends React.Component {
    handleClick(url) {
        const urlSuffix = url.replace(TATA_CLIQ_ROOT, "$1");
        this.props.history.push(urlSuffix);
        this.props.setClickedElementId();
    }

    doSome(value) {
        if (value) {
            return value.itemIds;
        }
        // if (process.env.environment === "production") {
        //   apiUrl = "https://www.tatacliq.com";
        // }
        // let productCodes;
        // each(value.itemIds, itemId => {
        //   productCodes = `${itemId},${productCodes}`;
        // });
        // let productCodes = value.itemIds && value.itemIds.toString();
        // const url = `${apiUrl}/marketplacewebservices/v2/mpl/cms/page/getProductInfo?isPwa=true&productCodes=${productCodes}`;
        // return fetch(url)
        //   .then(response => response.json())
        //   .then(function(response) {
        //     if (response && response.status && response.status === "Success") {
        //       return response;
        //     }
        //   });
        // let requests =
        //   value.itemIds &&
        //   value.itemIds.map(id => {
        //     return fetch(
        //       `${apiUrl}/marketplacewebservices/v2/mpl/products/productDetails/${id}?isPwa=true&isMDE=true`
        //       //`${apiUrl}/marketplacewebservices/v2/mpl/cms/page/getProductInfo?isPwa=true&productCodes=${id}` removing getProductInfo calls and adding productDetails as asked by Amit Dixit
        //     );
        //   });

        // return Promise.all(requests)
        //   .then(response =>
        //     Promise.all(
        //       response.map(r => {
        //         return r.json();
        //       })
        //     )
        //   )
        //   .then(res => {
        //     let list = [];
        //     res.forEach(item => {
        //       if (item && item.status && item.status === "SUCCESS") {
        //         //list.push(item.results[0]); removing productInfo call
        //         list.push(item);
        //       }
        //     });
        //     return { results: list };
        //   });
    }

    render() {
        if (this.props.homeAbcMsdData && this.props.homeAbcMsdData.length > 0) {
            return this.props.homeAbcMsdData.map((value, index) => {
                let res = this.doSome(value);
                const buttonText = this.props.feedComponentData.btnText;
                return (
                    <FeedComponentABPC
                    key ={index}
                        banner={
                            <ProductImageHeader
                                image={value.imageURL}
                                description={value.description}
                                logo={<Logo image={value.brandLogo} />}
                                onClick={() => this.handleClick(value.webURL)}
                            />
                        }
                        backgroundColor="#e4e4e4"
                        carouselOptions={{
                            buttonText,
                            seeAll: () => {
                                this.handleClick(value.webURL);
                            },
                        }}
                        widgetName={"Automated Brand Product Carousal"}
                        setClickedElementId={this.props.setClickedElementId}
                        data={res}
                        sourceOfWidget={this.props.postData && this.props.postData.widgetPlatform}
                    />
                );
            });
        } else {
            return null;
        }
    }
}
