import { SUCCESS, REQUESTING, ERROR } from "../lib/constants";
import * as ErrorHandling from "../general/ErrorHandling";
export const GET_DESKTOP_FOOTER_REQUEST = "GET_DESKTOP_FOOTER_REQUEST";
export const GET_DESKTOP_FOOTER_SUCCESS = "GET_DESKTOP_FOOTER_SUCCESS";
export const GET_DESKTOP_FOOTER_FAILURE = "GET_DESKTOP_FOOTER_FAILURE";
export const FOOTER_URL =
  "https://www.tatacliq.com/getFooterContent?id=FooterSlot";
const footerMock = {
  items: [
    {
      pageLinks: [
        {
          heading: "Tata MARKETPLACE",
          list: [
            {
              text: "About Us",
              webUrl: "/aboutus"
            },
            {
              text: "Careers",
              webUrl: "/careers"
            },
            {
              text: "Sell With Us",
              webUrl: "/sellwithus"
            },
            {
              text: "Store Locator",
              webUrl: "/store-finder"
            },
            {
              text: "Terms Of Use",
              webUrl: "/tncPayment"
            },
            {
              text: "Privacy Policy",
              webUrl: "/privacy-policy"
            },
            {
              text: "Policies For Buyers",
              webUrl: "/buyer-policies"
            },
            {
              text: "Que Magazine",
              webUrl: "https://www.tatacliq.com/que/"
            },
            {
              text: "Affiliates",
              webUrl: "https://www.tatacliq.com/affiliates"
            },
            {
              text: "Sitemap",
              webUrl: "https://www.tatacliq.com/site-map"
            }
          ]
        },
        {
          heading: "CUSTOMER SERVICE",
          list: [
            {
              text: "Shopping",
              webUrl: "https://www.tatacliq.com/shopping-faq"
            },
            {
              text: "Frequently Asked Questions",
              webUrl: "/faq"
            },
            {
              text: "Offers & Promotions",
              webUrl: "https://www.tatacliq.com/offers-promo-faq"
            },
            {
              text: "Payments",
              webUrl: "https://www.tatacliq.com/payment-faq"
            },
            {
              text: "Cancellation",
              webUrl: "/cancellation"
            },
            {
              text: "Returns & Refunds",
              webUrl: "/returns"
            },
            {
              text: "CLiQ and PIQ",
              webUrl: "/cliq-piq-tnc"
            },
            {
              text: "Return to Store",
              webUrl: "/returntostore"
            },
            {
              text: "Contact Us",
              webUrl: "https://www.tatacliq.com/contact"
            }
          ]
        },
        {
          heading: "My Tata CLiQ",
          list: [
            {
              text: "My Account",
              webUrl: "/my-account"
            },
            {
              text: "My Orders",
              webUrl: "/my-account/orders"
            },
            {
              text: "My Shopping Bag",
              webUrl: "/cart"
            },
            {
              text: "My Wishlist",
              webUrl: "/my-account/wishList"
            }
          ]
        }
      ],
      newsLetter: [
        {
          heading: "NEWSLETTER",
          placeholderText: "Your Email Id",
          btnText: "Subscribe"
        }
      ],
      socialLinks: [
        {
          heading: "The Social Network",
          list: [
            {
              imageURL: "",
              webUrl: "https://plus.google.com/107413929814020009505"
            },
            {
              imageURL: "",
              webUrl: "https://www.facebook.com/TataCLiQ/"
            },
            {
              imageURL: "",
              webUrl: "https://twitter.com/tatacliq"
            },
            {
              imageURL: "",
              webUrl: "https://www.instagram.com/tatacliq/"
            },
            {
              imageURL: "",
              webUrl: "https://www.youtube.com/channel/UCUwkaWqIcl9dYQccKkM0VRA"
            },
            {
              imageURL: "",
              webUrl: "https://in.linkedin.com/company/tatacliq"
            }
          ]
        },
        {
          heading: "Download App",
          list: [
            {
              imageURL: "",
              webUrl:
                "https://play.google.com/store/apps/details?id=com.tul.tatacliq"
            },
            {
              imageURL: "",
              webUrl:
                "https://itunes.apple.com/us/app/tata-cliq-online-shopping/id1101619385?ls=1&mt=8"
            }
          ]
        }
      ]
    }
  ]
};
export function getDesktopFooterRequest() {
  return {
    type: GET_DESKTOP_FOOTER_REQUEST,
    status: REQUESTING
  };
}
export function getDesktopFooterSuccess(DesktopFooterDetails) {
  return {
    type: GET_DESKTOP_FOOTER_SUCCESS,
    status: SUCCESS,
    DesktopFooterDetails
  };
}
export function getDesktopFooterFailure(error) {
  return {
    type: GET_DESKTOP_FOOTER_FAILURE,
    status: ERROR,
    error
  };
}
export function getDesktopFooter() {
  return async (dispatch, getState, { api }) => {
    dispatch(getDesktopFooterRequest());
    try {
      const resultJson = footerMock;
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      return dispatch(getDesktopFooterSuccess(resultJson));
    } catch (e) {
      dispatch(getDesktopFooterFailure(e.message));
    }
  };
}
