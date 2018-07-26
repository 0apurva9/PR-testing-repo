import { SUCCESS, REQUESTING, ERROR, FAILURE } from "../../lib/constants";
import {
  setDataLayer,
  ADOBE_DEFAULT_CLP_PAGE_LOAD
} from "../../lib/adobeUtils";
import * as ErrorHandling from "../../general/ErrorHandling.js";
export const GET_CATEGORIES_REQUEST = "GET_CATEGORIES_REQUEST";
export const GET_CATEGORIES_SUCCESS = "GET_CATEGORIES_SUCCESS";
export const GET_CATEGORIES_FAILURE = "GET_CATEGORIES_FAILURE";

export const GET_HEADER_REQUEST = "GET_HEADER_REQUEST";
export const GET_HEADER_SUCCESS = "GET_HEADER_SUCCESS";
export const GET_HEADER_FAILURE = "GET_HEADER_FAILURE";
const USER_CATEGORY_PATH = "v2/mpl/catalogs";
const mock = {
  items: [
    {
      brandsTabAZListComponent: [
        {
          popularBrands: [
            {
              brandName: "11cent",
              webURL: "https://www.tatacliq.com/11cent/c-mbh11a00510"
            },
            {
              brandName: "612 League",
              webURL: "https://www.tatacliq.com/612-league/c-mbh11b10162"
            },
            {
              brandName: "883 Police",
              webURL: "https://www.tatacliq.com/883-police/c-mbh11a00645"
            },
            {
              brandName: "Abhiyuthan",
              webURL: "https://www.tatacliq.com/abhiyuthan/c-mbh11a00404"
            },
            {
              brandName: "Addic",
              webURL: "https://www.tatacliq.com/addic/c-mbh15w00251"
            },
            {
              brandName: "Addons",
              webURL: "https://www.tatacliq.com/addons/c-mbh16w00003"
            },
            {
              brandName: "Adidas Footwear",
              webURL: "https://www.tatacliq.com/adidas/c-mbh13f00009"
            },
            {
              brandName: "Adidas  Apparels",
              webURL: "https://www.tatacliq.com/adidas/c-mbh11f00009"
            },
            {
              brandName: "Afrojack",
              webURL: "https://www.tatacliq.com/afrojack/c-mbh13f00190"
            },
            {
              brandName: "Ahilya Jewels",
              webURL: "https://www.tatacliq.com/ahilya-jewels/c-mbh19b10145"
            },
            {
              brandName: "Alberto Torresi",
              webURL: "https://www.tatacliq.com/alberto-torresi/c-mbh13f00011"
            },
            {
              brandName: "ALCIS",
              webURL: "https://www.tatacliq.com/alcis/c-mbh11b10054"
            },
            {
              brandName: "Aldo  Footwear",
              webURL: "https://www.tatacliq.com/aldo/c-mbh13f00012"
            },
            {
              brandName: "Aldo Accessories",
              webURL: "https://www.tatacliq.com/aldo/c-mbh16f00012"
            },
            {
              brandName: "Allen cooper",
              webURL: "https://www.tatacliq.com/allen-cooper/c-mbh13f00261"
            },
            {
              brandName: "Allen Solly  Footwear",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh13a00023"
            },
            {
              brandName: "Allen Solly  Apparels",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh11a00023"
            },
            {
              brandName: "Allen Solly Kids",
              webURL: "https://www.tatacliq.com/allen-solly-kids/c-mbh11a00146"
            },
            {
              brandName: "Amazing Spiderman",
              webURL: "https://www.tatacliq.com/amazing-spiderman/c-mbh13a00282"
            },
            {
              brandName: "American Tourister",
              webURL:
                "https://www.tatacliq.com/american-tourister/c-mbh16w00012"
            },
            {
              brandName: "Amigos",
              webURL: "https://www.tatacliq.com/amigos/c-mbh13f00202"
            },
            {
              brandName: "Ankor",
              webURL: "https://www.tatacliq.com/ankor/c-mbh11b10073"
            },
            {
              brandName: "AnnaSimona",
              webURL: "https://www.tatacliq.com/annasimona/c-mbh21b10089"
            },
            {
              brandName: "Zudio Footwear",
              webURL: "https://www.tatacliq.com/zudio/c-mbh13a00315"
            }
          ],
          featuredBrands: [
            {
              brandName: "11cent",
              webURL: "https://www.tatacliq.com/11cent/c-mbh11a00510"
            },
            {
              brandName: "612 League",
              webURL: "https://www.tatacliq.com/612-league/c-mbh11b10162"
            },
            {
              brandName: "883 Police",
              webURL: "https://www.tatacliq.com/883-police/c-mbh11a00645"
            },
            {
              brandName: "Abhiyuthan",
              webURL: "https://www.tatacliq.com/abhiyuthan/c-mbh11a00404"
            },
            {
              brandName: "Addic",
              webURL: "https://www.tatacliq.com/addic/c-mbh15w00251"
            },
            {
              brandName: "Addons",
              webURL: "https://www.tatacliq.com/addons/c-mbh16w00003"
            },
            {
              brandName: "Adidas Footwear",
              webURL: "https://www.tatacliq.com/adidas/c-mbh13f00009"
            },
            {
              brandName: "Adidas  Apparels",
              webURL: "https://www.tatacliq.com/adidas/c-mbh11f00009"
            },
            {
              brandName: "Afrojack",
              webURL: "https://www.tatacliq.com/afrojack/c-mbh13f00190"
            },
            {
              brandName: "Ahilya Jewels",
              webURL: "https://www.tatacliq.com/ahilya-jewels/c-mbh19b10145"
            },
            {
              brandName: "Alberto Torresi",
              webURL: "https://www.tatacliq.com/alberto-torresi/c-mbh13f00011"
            },
            {
              brandName: "ALCIS",
              webURL: "https://www.tatacliq.com/alcis/c-mbh11b10054"
            },
            {
              brandName: "Aldo  Footwear",
              webURL: "https://www.tatacliq.com/aldo/c-mbh13f00012"
            },
            {
              brandName: "Aldo Accessories",
              webURL: "https://www.tatacliq.com/aldo/c-mbh16f00012"
            },
            {
              brandName: "Allen cooper",
              webURL: "https://www.tatacliq.com/allen-cooper/c-mbh13f00261"
            },
            {
              brandName: "Allen Solly  Footwear",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh13a00023"
            },
            {
              brandName: "Allen Solly  Apparels",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh11a00023"
            },
            {
              brandName: "Allen Solly Kids",
              webURL: "https://www.tatacliq.com/allen-solly-kids/c-mbh11a00146"
            },
            {
              brandName: "Amazing Spiderman",
              webURL: "https://www.tatacliq.com/amazing-spiderman/c-mbh13a00282"
            },
            {
              brandName: "American Tourister",
              webURL:
                "https://www.tatacliq.com/american-tourister/c-mbh16w00012"
            },
            {
              brandName: "Amigos",
              webURL: "https://www.tatacliq.com/amigos/c-mbh13f00202"
            },
            {
              brandName: "Ankor",
              webURL: "https://www.tatacliq.com/ankor/c-mbh11b10073"
            },
            {
              brandName: "AnnaSimona",
              webURL: "https://www.tatacliq.com/annasimona/c-mbh21b10089"
            },
            {
              brandName: "Zudio Footwear",
              webURL: "https://www.tatacliq.com/zudio/c-mbh13a00315"
            }
          ],
          items: [
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476200517662_mufti_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476198420510_killer_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12478725881886_redtape_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476200910878_nuon_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12478724964382_pepe_jeans_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo: "",
              text: "See All",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            }
          ],
          subType: "Kids"
        },
        {
          popularBrands: [
            {
              brandName: "11cent",
              webURL: "https://www.tatacliq.com/11cent/c-mbh11a00510"
            },
            {
              brandName: "612 League",
              webURL: "https://www.tatacliq.com/612-league/c-mbh11b10162"
            },
            {
              brandName: "883 Police",
              webURL: "https://www.tatacliq.com/883-police/c-mbh11a00645"
            },
            {
              brandName: "Abhiyuthan",
              webURL: "https://www.tatacliq.com/abhiyuthan/c-mbh11a00404"
            },
            {
              brandName: "Addic",
              webURL: "https://www.tatacliq.com/addic/c-mbh15w00251"
            },
            {
              brandName: "Addons",
              webURL: "https://www.tatacliq.com/addons/c-mbh16w00003"
            },
            {
              brandName: "Adidas Footwear",
              webURL: "https://www.tatacliq.com/adidas/c-mbh13f00009"
            },
            {
              brandName: "Adidas  Apparels",
              webURL: "https://www.tatacliq.com/adidas/c-mbh11f00009"
            },
            {
              brandName: "Afrojack",
              webURL: "https://www.tatacliq.com/afrojack/c-mbh13f00190"
            },
            {
              brandName: "Ahilya Jewels",
              webURL: "https://www.tatacliq.com/ahilya-jewels/c-mbh19b10145"
            },
            {
              brandName: "Alberto Torresi",
              webURL: "https://www.tatacliq.com/alberto-torresi/c-mbh13f00011"
            },
            {
              brandName: "ALCIS",
              webURL: "https://www.tatacliq.com/alcis/c-mbh11b10054"
            },
            {
              brandName: "Aldo  Footwear",
              webURL: "https://www.tatacliq.com/aldo/c-mbh13f00012"
            },
            {
              brandName: "Aldo Accessories",
              webURL: "https://www.tatacliq.com/aldo/c-mbh16f00012"
            },
            {
              brandName: "Allen cooper",
              webURL: "https://www.tatacliq.com/allen-cooper/c-mbh13f00261"
            },
            {
              brandName: "Allen Solly  Footwear",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh13a00023"
            },
            {
              brandName: "Allen Solly  Apparels",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh11a00023"
            },
            {
              brandName: "Allen Solly Kids",
              webURL: "https://www.tatacliq.com/allen-solly-kids/c-mbh11a00146"
            },
            {
              brandName: "Amazing Spiderman",
              webURL: "https://www.tatacliq.com/amazing-spiderman/c-mbh13a00282"
            },
            {
              brandName: "American Tourister",
              webURL:
                "https://www.tatacliq.com/american-tourister/c-mbh16w00012"
            },
            {
              brandName: "Amigos",
              webURL: "https://www.tatacliq.com/amigos/c-mbh13f00202"
            },
            {
              brandName: "Ankor",
              webURL: "https://www.tatacliq.com/ankor/c-mbh11b10073"
            },
            {
              brandName: "AnnaSimona",
              webURL: "https://www.tatacliq.com/annasimona/c-mbh21b10089"
            },
            {
              brandName: "Zudio Footwear",
              webURL: "https://www.tatacliq.com/zudio/c-mbh13a00315"
            }
          ],
          featuredBrands: [
            {
              brandName: "11cent",
              webURL: "https://www.tatacliq.com/11cent/c-mbh11a00510"
            },
            {
              brandName: "612 League",
              webURL: "https://www.tatacliq.com/612-league/c-mbh11b10162"
            },
            {
              brandName: "883 Police",
              webURL: "https://www.tatacliq.com/883-police/c-mbh11a00645"
            },
            {
              brandName: "Abhiyuthan",
              webURL: "https://www.tatacliq.com/abhiyuthan/c-mbh11a00404"
            },
            {
              brandName: "Addic",
              webURL: "https://www.tatacliq.com/addic/c-mbh15w00251"
            },
            {
              brandName: "Addons",
              webURL: "https://www.tatacliq.com/addons/c-mbh16w00003"
            },
            {
              brandName: "Adidas Footwear",
              webURL: "https://www.tatacliq.com/adidas/c-mbh13f00009"
            },
            {
              brandName: "Adidas  Apparels",
              webURL: "https://www.tatacliq.com/adidas/c-mbh11f00009"
            },
            {
              brandName: "Afrojack",
              webURL: "https://www.tatacliq.com/afrojack/c-mbh13f00190"
            },
            {
              brandName: "Ahilya Jewels",
              webURL: "https://www.tatacliq.com/ahilya-jewels/c-mbh19b10145"
            },
            {
              brandName: "Alberto Torresi",
              webURL: "https://www.tatacliq.com/alberto-torresi/c-mbh13f00011"
            },
            {
              brandName: "ALCIS",
              webURL: "https://www.tatacliq.com/alcis/c-mbh11b10054"
            },
            {
              brandName: "Aldo  Footwear",
              webURL: "https://www.tatacliq.com/aldo/c-mbh13f00012"
            },
            {
              brandName: "Aldo Accessories",
              webURL: "https://www.tatacliq.com/aldo/c-mbh16f00012"
            },
            {
              brandName: "Allen cooper",
              webURL: "https://www.tatacliq.com/allen-cooper/c-mbh13f00261"
            },
            {
              brandName: "Allen Solly  Footwear",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh13a00023"
            },
            {
              brandName: "Allen Solly  Apparels",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh11a00023"
            },
            {
              brandName: "Allen Solly Kids",
              webURL: "https://www.tatacliq.com/allen-solly-kids/c-mbh11a00146"
            },
            {
              brandName: "Amazing Spiderman",
              webURL: "https://www.tatacliq.com/amazing-spiderman/c-mbh13a00282"
            },
            {
              brandName: "American Tourister",
              webURL:
                "https://www.tatacliq.com/american-tourister/c-mbh16w00012"
            },
            {
              brandName: "Amigos",
              webURL: "https://www.tatacliq.com/amigos/c-mbh13f00202"
            },
            {
              brandName: "Ankor",
              webURL: "https://www.tatacliq.com/ankor/c-mbh11b10073"
            },
            {
              brandName: "AnnaSimona",
              webURL: "https://www.tatacliq.com/annasimona/c-mbh21b10089"
            },
            {
              brandName: "Zudio Footwear",
              webURL: "https://www.tatacliq.com/zudio/c-mbh13a00315"
            }
          ],
          items: [
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476200517662_mufti_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476198420510_killer_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12478725881886_redtape_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476200910878_nuon_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12478724964382_pepe_jeans_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo: "",
              text: "See All",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            }
          ],
          subType: "Men"
        },
        {
          popularBrands: [
            {
              brandName: "11cent",
              webURL: "https://www.tatacliq.com/11cent/c-mbh11a00510"
            },
            {
              brandName: "612 League",
              webURL: "https://www.tatacliq.com/612-league/c-mbh11b10162"
            },
            {
              brandName: "883 Police",
              webURL: "https://www.tatacliq.com/883-police/c-mbh11a00645"
            },
            {
              brandName: "Abhiyuthan",
              webURL: "https://www.tatacliq.com/abhiyuthan/c-mbh11a00404"
            },
            {
              brandName: "Addic",
              webURL: "https://www.tatacliq.com/addic/c-mbh15w00251"
            },
            {
              brandName: "Addons",
              webURL: "https://www.tatacliq.com/addons/c-mbh16w00003"
            },
            {
              brandName: "Adidas Footwear",
              webURL: "https://www.tatacliq.com/adidas/c-mbh13f00009"
            },
            {
              brandName: "Adidas  Apparels",
              webURL: "https://www.tatacliq.com/adidas/c-mbh11f00009"
            },
            {
              brandName: "Afrojack",
              webURL: "https://www.tatacliq.com/afrojack/c-mbh13f00190"
            },
            {
              brandName: "Ahilya Jewels",
              webURL: "https://www.tatacliq.com/ahilya-jewels/c-mbh19b10145"
            },
            {
              brandName: "Alberto Torresi",
              webURL: "https://www.tatacliq.com/alberto-torresi/c-mbh13f00011"
            },
            {
              brandName: "ALCIS",
              webURL: "https://www.tatacliq.com/alcis/c-mbh11b10054"
            },
            {
              brandName: "Aldo  Footwear",
              webURL: "https://www.tatacliq.com/aldo/c-mbh13f00012"
            },
            {
              brandName: "Aldo Accessories",
              webURL: "https://www.tatacliq.com/aldo/c-mbh16f00012"
            },
            {
              brandName: "Allen cooper",
              webURL: "https://www.tatacliq.com/allen-cooper/c-mbh13f00261"
            },
            {
              brandName: "Allen Solly  Footwear",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh13a00023"
            },
            {
              brandName: "Allen Solly  Apparels",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh11a00023"
            },
            {
              brandName: "Allen Solly Kids",
              webURL: "https://www.tatacliq.com/allen-solly-kids/c-mbh11a00146"
            },
            {
              brandName: "Amazing Spiderman",
              webURL: "https://www.tatacliq.com/amazing-spiderman/c-mbh13a00282"
            },
            {
              brandName: "American Tourister",
              webURL:
                "https://www.tatacliq.com/american-tourister/c-mbh16w00012"
            },
            {
              brandName: "Amigos",
              webURL: "https://www.tatacliq.com/amigos/c-mbh13f00202"
            },
            {
              brandName: "Ankor",
              webURL: "https://www.tatacliq.com/ankor/c-mbh11b10073"
            },
            {
              brandName: "AnnaSimona",
              webURL: "https://www.tatacliq.com/annasimona/c-mbh21b10089"
            },
            {
              brandName: "Zudio Footwear",
              webURL: "https://www.tatacliq.com/zudio/c-mbh13a00315"
            }
          ],
          featuredBrands: [
            {
              brandName: "11cent",
              webURL: "https://www.tatacliq.com/11cent/c-mbh11a00510"
            },
            {
              brandName: "612 League",
              webURL: "https://www.tatacliq.com/612-league/c-mbh11b10162"
            },
            {
              brandName: "883 Police",
              webURL: "https://www.tatacliq.com/883-police/c-mbh11a00645"
            },
            {
              brandName: "Abhiyuthan",
              webURL: "https://www.tatacliq.com/abhiyuthan/c-mbh11a00404"
            },
            {
              brandName: "Addic",
              webURL: "https://www.tatacliq.com/addic/c-mbh15w00251"
            },
            {
              brandName: "Addons",
              webURL: "https://www.tatacliq.com/addons/c-mbh16w00003"
            },
            {
              brandName: "Adidas Footwear",
              webURL: "https://www.tatacliq.com/adidas/c-mbh13f00009"
            },
            {
              brandName: "Adidas  Apparels",
              webURL: "https://www.tatacliq.com/adidas/c-mbh11f00009"
            },
            {
              brandName: "Afrojack",
              webURL: "https://www.tatacliq.com/afrojack/c-mbh13f00190"
            },
            {
              brandName: "Ahilya Jewels",
              webURL: "https://www.tatacliq.com/ahilya-jewels/c-mbh19b10145"
            },
            {
              brandName: "Alberto Torresi",
              webURL: "https://www.tatacliq.com/alberto-torresi/c-mbh13f00011"
            },
            {
              brandName: "ALCIS",
              webURL: "https://www.tatacliq.com/alcis/c-mbh11b10054"
            },
            {
              brandName: "Aldo  Footwear",
              webURL: "https://www.tatacliq.com/aldo/c-mbh13f00012"
            },
            {
              brandName: "Aldo Accessories",
              webURL: "https://www.tatacliq.com/aldo/c-mbh16f00012"
            },
            {
              brandName: "Allen cooper",
              webURL: "https://www.tatacliq.com/allen-cooper/c-mbh13f00261"
            },
            {
              brandName: "Allen Solly  Footwear",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh13a00023"
            },
            {
              brandName: "Allen Solly  Apparels",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh11a00023"
            },
            {
              brandName: "Allen Solly Kids",
              webURL: "https://www.tatacliq.com/allen-solly-kids/c-mbh11a00146"
            },
            {
              brandName: "Amazing Spiderman",
              webURL: "https://www.tatacliq.com/amazing-spiderman/c-mbh13a00282"
            },
            {
              brandName: "American Tourister",
              webURL:
                "https://www.tatacliq.com/american-tourister/c-mbh16w00012"
            },
            {
              brandName: "Amigos",
              webURL: "https://www.tatacliq.com/amigos/c-mbh13f00202"
            },
            {
              brandName: "Ankor",
              webURL: "https://www.tatacliq.com/ankor/c-mbh11b10073"
            },
            {
              brandName: "AnnaSimona",
              webURL: "https://www.tatacliq.com/annasimona/c-mbh21b10089"
            },
            {
              brandName: "Zudio Footwear",
              webURL: "https://www.tatacliq.com/zudio/c-mbh13a00315"
            }
          ],
          items: [
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476200517662_mufti_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476198420510_killer_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12478725881886_redtape_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476200910878_nuon_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12478724964382_pepe_jeans_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo: "",
              text: "See All",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            }
          ],
          subType: "Women"
        },
        {
          popularBrands: [
            {
              brandName: "11cent",
              webURL: "https://www.tatacliq.com/11cent/c-mbh11a00510"
            },
            {
              brandName: "612 League",
              webURL: "https://www.tatacliq.com/612-league/c-mbh11b10162"
            },
            {
              brandName: "883 Police",
              webURL: "https://www.tatacliq.com/883-police/c-mbh11a00645"
            },
            {
              brandName: "Abhiyuthan",
              webURL: "https://www.tatacliq.com/abhiyuthan/c-mbh11a00404"
            },
            {
              brandName: "Addic",
              webURL: "https://www.tatacliq.com/addic/c-mbh15w00251"
            },
            {
              brandName: "Addons",
              webURL: "https://www.tatacliq.com/addons/c-mbh16w00003"
            },
            {
              brandName: "Adidas Footwear",
              webURL: "https://www.tatacliq.com/adidas/c-mbh13f00009"
            },
            {
              brandName: "Adidas  Apparels",
              webURL: "https://www.tatacliq.com/adidas/c-mbh11f00009"
            },
            {
              brandName: "Afrojack",
              webURL: "https://www.tatacliq.com/afrojack/c-mbh13f00190"
            },
            {
              brandName: "Ahilya Jewels",
              webURL: "https://www.tatacliq.com/ahilya-jewels/c-mbh19b10145"
            },
            {
              brandName: "Alberto Torresi",
              webURL: "https://www.tatacliq.com/alberto-torresi/c-mbh13f00011"
            },
            {
              brandName: "ALCIS",
              webURL: "https://www.tatacliq.com/alcis/c-mbh11b10054"
            },
            {
              brandName: "Aldo  Footwear",
              webURL: "https://www.tatacliq.com/aldo/c-mbh13f00012"
            },
            {
              brandName: "Aldo Accessories",
              webURL: "https://www.tatacliq.com/aldo/c-mbh16f00012"
            },
            {
              brandName: "Allen cooper",
              webURL: "https://www.tatacliq.com/allen-cooper/c-mbh13f00261"
            },
            {
              brandName: "Allen Solly  Footwear",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh13a00023"
            },
            {
              brandName: "Allen Solly  Apparels",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh11a00023"
            },
            {
              brandName: "Allen Solly Kids",
              webURL: "https://www.tatacliq.com/allen-solly-kids/c-mbh11a00146"
            },
            {
              brandName: "Amazing Spiderman",
              webURL: "https://www.tatacliq.com/amazing-spiderman/c-mbh13a00282"
            },
            {
              brandName: "American Tourister",
              webURL:
                "https://www.tatacliq.com/american-tourister/c-mbh16w00012"
            },
            {
              brandName: "Amigos",
              webURL: "https://www.tatacliq.com/amigos/c-mbh13f00202"
            },
            {
              brandName: "Ankor",
              webURL: "https://www.tatacliq.com/ankor/c-mbh11b10073"
            },
            {
              brandName: "AnnaSimona",
              webURL: "https://www.tatacliq.com/annasimona/c-mbh21b10089"
            },
            {
              brandName: "Zudio Footwear",
              webURL: "https://www.tatacliq.com/zudio/c-mbh13a00315"
            }
          ],
          featuredBrands: [
            {
              brandName: "11cent",
              webURL: "https://www.tatacliq.com/11cent/c-mbh11a00510"
            },
            {
              brandName: "612 League",
              webURL: "https://www.tatacliq.com/612-league/c-mbh11b10162"
            },
            {
              brandName: "883 Police",
              webURL: "https://www.tatacliq.com/883-police/c-mbh11a00645"
            },
            {
              brandName: "Abhiyuthan",
              webURL: "https://www.tatacliq.com/abhiyuthan/c-mbh11a00404"
            },
            {
              brandName: "Addic",
              webURL: "https://www.tatacliq.com/addic/c-mbh15w00251"
            },
            {
              brandName: "Addons",
              webURL: "https://www.tatacliq.com/addons/c-mbh16w00003"
            },
            {
              brandName: "Adidas Footwear",
              webURL: "https://www.tatacliq.com/adidas/c-mbh13f00009"
            },
            {
              brandName: "Adidas  Apparels",
              webURL: "https://www.tatacliq.com/adidas/c-mbh11f00009"
            },
            {
              brandName: "Afrojack",
              webURL: "https://www.tatacliq.com/afrojack/c-mbh13f00190"
            },
            {
              brandName: "Ahilya Jewels",
              webURL: "https://www.tatacliq.com/ahilya-jewels/c-mbh19b10145"
            },
            {
              brandName: "Alberto Torresi",
              webURL: "https://www.tatacliq.com/alberto-torresi/c-mbh13f00011"
            },
            {
              brandName: "ALCIS",
              webURL: "https://www.tatacliq.com/alcis/c-mbh11b10054"
            },
            {
              brandName: "Aldo  Footwear",
              webURL: "https://www.tatacliq.com/aldo/c-mbh13f00012"
            },
            {
              brandName: "Aldo Accessories",
              webURL: "https://www.tatacliq.com/aldo/c-mbh16f00012"
            },
            {
              brandName: "Allen cooper",
              webURL: "https://www.tatacliq.com/allen-cooper/c-mbh13f00261"
            },
            {
              brandName: "Allen Solly  Footwear",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh13a00023"
            },
            {
              brandName: "Allen Solly  Apparels",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh11a00023"
            },
            {
              brandName: "Allen Solly Kids",
              webURL: "https://www.tatacliq.com/allen-solly-kids/c-mbh11a00146"
            },
            {
              brandName: "Amazing Spiderman",
              webURL: "https://www.tatacliq.com/amazing-spiderman/c-mbh13a00282"
            },
            {
              brandName: "American Tourister",
              webURL:
                "https://www.tatacliq.com/american-tourister/c-mbh16w00012"
            },
            {
              brandName: "Amigos",
              webURL: "https://www.tatacliq.com/amigos/c-mbh13f00202"
            },
            {
              brandName: "Ankor",
              webURL: "https://www.tatacliq.com/ankor/c-mbh11b10073"
            },
            {
              brandName: "AnnaSimona",
              webURL: "https://www.tatacliq.com/annasimona/c-mbh21b10089"
            },
            {
              brandName: "Zudio Footwear",
              webURL: "https://www.tatacliq.com/zudio/c-mbh13a00315"
            }
          ],
          items: [
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476200517662_mufti_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476198420510_killer_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12478725881886_redtape_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476200910878_nuon_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12478724964382_pepe_jeans_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo: "",
              text: "See All",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            }
          ],
          subType: "Electronics"
        },
        {
          popularBrands: [
            {
              brandName: "11cent",
              webURL: "https://www.tatacliq.com/11cent/c-mbh11a00510"
            },
            {
              brandName: "612 League",
              webURL: "https://www.tatacliq.com/612-league/c-mbh11b10162"
            },
            {
              brandName: "883 Police",
              webURL: "https://www.tatacliq.com/883-police/c-mbh11a00645"
            },
            {
              brandName: "Abhiyuthan",
              webURL: "https://www.tatacliq.com/abhiyuthan/c-mbh11a00404"
            },
            {
              brandName: "Addic",
              webURL: "https://www.tatacliq.com/addic/c-mbh15w00251"
            },
            {
              brandName: "Addons",
              webURL: "https://www.tatacliq.com/addons/c-mbh16w00003"
            },
            {
              brandName: "Adidas Footwear",
              webURL: "https://www.tatacliq.com/adidas/c-mbh13f00009"
            },
            {
              brandName: "Adidas  Apparels",
              webURL: "https://www.tatacliq.com/adidas/c-mbh11f00009"
            },
            {
              brandName: "Afrojack",
              webURL: "https://www.tatacliq.com/afrojack/c-mbh13f00190"
            },
            {
              brandName: "Ahilya Jewels",
              webURL: "https://www.tatacliq.com/ahilya-jewels/c-mbh19b10145"
            },
            {
              brandName: "Alberto Torresi",
              webURL: "https://www.tatacliq.com/alberto-torresi/c-mbh13f00011"
            },
            {
              brandName: "ALCIS",
              webURL: "https://www.tatacliq.com/alcis/c-mbh11b10054"
            },
            {
              brandName: "Aldo  Footwear",
              webURL: "https://www.tatacliq.com/aldo/c-mbh13f00012"
            },
            {
              brandName: "Aldo Accessories",
              webURL: "https://www.tatacliq.com/aldo/c-mbh16f00012"
            },
            {
              brandName: "Allen cooper",
              webURL: "https://www.tatacliq.com/allen-cooper/c-mbh13f00261"
            },
            {
              brandName: "Allen Solly  Footwear",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh13a00023"
            },
            {
              brandName: "Allen Solly  Apparels",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh11a00023"
            },
            {
              brandName: "Allen Solly Kids",
              webURL: "https://www.tatacliq.com/allen-solly-kids/c-mbh11a00146"
            },
            {
              brandName: "Amazing Spiderman",
              webURL: "https://www.tatacliq.com/amazing-spiderman/c-mbh13a00282"
            },
            {
              brandName: "American Tourister",
              webURL:
                "https://www.tatacliq.com/american-tourister/c-mbh16w00012"
            },
            {
              brandName: "Amigos",
              webURL: "https://www.tatacliq.com/amigos/c-mbh13f00202"
            },
            {
              brandName: "Ankor",
              webURL: "https://www.tatacliq.com/ankor/c-mbh11b10073"
            },
            {
              brandName: "AnnaSimona",
              webURL: "https://www.tatacliq.com/annasimona/c-mbh21b10089"
            },
            {
              brandName: "Zudio Footwear",
              webURL: "https://www.tatacliq.com/zudio/c-mbh13a00315"
            }
          ],
          featuredBrands: [
            {
              brandName: "11cent",
              webURL: "https://www.tatacliq.com/11cent/c-mbh11a00510"
            },
            {
              brandName: "612 League",
              webURL: "https://www.tatacliq.com/612-league/c-mbh11b10162"
            },
            {
              brandName: "883 Police",
              webURL: "https://www.tatacliq.com/883-police/c-mbh11a00645"
            },
            {
              brandName: "Abhiyuthan",
              webURL: "https://www.tatacliq.com/abhiyuthan/c-mbh11a00404"
            },
            {
              brandName: "Addic",
              webURL: "https://www.tatacliq.com/addic/c-mbh15w00251"
            },
            {
              brandName: "Addons",
              webURL: "https://www.tatacliq.com/addons/c-mbh16w00003"
            },
            {
              brandName: "Adidas Footwear",
              webURL: "https://www.tatacliq.com/adidas/c-mbh13f00009"
            },
            {
              brandName: "Adidas  Apparels",
              webURL: "https://www.tatacliq.com/adidas/c-mbh11f00009"
            },
            {
              brandName: "Afrojack",
              webURL: "https://www.tatacliq.com/afrojack/c-mbh13f00190"
            },
            {
              brandName: "Ahilya Jewels",
              webURL: "https://www.tatacliq.com/ahilya-jewels/c-mbh19b10145"
            },
            {
              brandName: "Alberto Torresi",
              webURL: "https://www.tatacliq.com/alberto-torresi/c-mbh13f00011"
            },
            {
              brandName: "ALCIS",
              webURL: "https://www.tatacliq.com/alcis/c-mbh11b10054"
            },
            {
              brandName: "Aldo  Footwear",
              webURL: "https://www.tatacliq.com/aldo/c-mbh13f00012"
            },
            {
              brandName: "Aldo Accessories",
              webURL: "https://www.tatacliq.com/aldo/c-mbh16f00012"
            },
            {
              brandName: "Allen cooper",
              webURL: "https://www.tatacliq.com/allen-cooper/c-mbh13f00261"
            },
            {
              brandName: "Allen Solly  Footwear",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh13a00023"
            },
            {
              brandName: "Allen Solly  Apparels",
              webURL: "https://www.tatacliq.com/allen-solly/c-mbh11a00023"
            },
            {
              brandName: "Allen Solly Kids",
              webURL: "https://www.tatacliq.com/allen-solly-kids/c-mbh11a00146"
            },
            {
              brandName: "Amazing Spiderman",
              webURL: "https://www.tatacliq.com/amazing-spiderman/c-mbh13a00282"
            },
            {
              brandName: "American Tourister",
              webURL:
                "https://www.tatacliq.com/american-tourister/c-mbh16w00012"
            },
            {
              brandName: "Amigos",
              webURL: "https://www.tatacliq.com/amigos/c-mbh13f00202"
            },
            {
              brandName: "Ankor",
              webURL: "https://www.tatacliq.com/ankor/c-mbh11b10073"
            },
            {
              brandName: "AnnaSimona",
              webURL: "https://www.tatacliq.com/annasimona/c-mbh21b10089"
            },
            {
              brandName: "Zudio Footwear",
              webURL: "https://www.tatacliq.com/zudio/c-mbh13a00315"
            }
          ],
          items: [
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476200517662_mufti_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476198420510_killer_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12478725881886_redtape_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12476200910878_nuon_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo:
                "https://assets.tatacliq.com/medias/sys_master/managed/12478724964382_pepe_jeans_white.png",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              brandLogo: "",
              text: "See All",
              webURL:
                "https://tmppprd.tataunistore.com/mens-clothing-ethnic-wear/c-msh1112"
            }
          ],
          subType: "Life style"
        }
      ],
      componentName: "brandsTabAZListComponent"
    },
    {
      categoriesTabAZListComponent: [
        {
          category_name: "Women",
          subCategories: [
            {
              category_name: "Ethnic Wear",
              subCategories: [
                {
                  category_name: "Ethnic Wear",
                  webURL: "/womens-clothing-ethnic-wear/c-msh1012"
                },
                {
                  category_name: "Kurtis & Kurtas",
                  webURL:
                    "/womens-clothing-ethnic-wear-kurtis-kurtas/c-msh1012100"
                },
                {
                  category_name: "Suits Sets"
                },
                {
                  category_name: "Dress Materials",
                  webURL:
                    "/womens-clothing-ethnic-wear-dress-materials/c-msh1012104"
                },
                {
                  category_name: "Sarees",
                  webURL: "/womens-clothing-ethnic-wear-sarees/c-msh1012102"
                },
                {
                  category_name: "Bottoms",
                  webURL: "/womens-clothing-ethnic-wear-bottoms/c-msh1012103"
                },
                {
                  category_name: "Dupattas",
                  webURL: "/womens-clothing-ethnic-wear-dupatta/c-msh1012105"
                }
              ],
              webURL: "/womens-clothing-ethnic-wear/c-msh1012"
            },
            {
              category_name: "Inner and Night Wear",
              subCategories: [
                {
                  category_name: "Inner and Night Wear",
                  webURL: "/womens-clothing-inner-nightwear/c-msh1014"
                },
                {
                  category_name: "Bras",
                  webURL: "/womens-clothing-inner-nightwear-bras/c-msh1014100"
                },
                {
                  category_name: "Panties",
                  webURL:
                    "/womens-clothing-inner-nightwear-panties/c-msh1014101"
                },
                {
                  category_name: "Lingerie Sets",
                  webURL: "/womens-clothing-inner-nightwear-sets/c-msh1014102"
                },
                {
                  category_name: "Camisole",
                  webURL:
                    "/womens-clothing-inner-nightwear-camisole/c-msh1014103"
                },
                {
                  category_name: "Sleepwear & Robes",
                  webURL:
                    "/womens-clothing-inner-nightwear-sleepwear-robes/c-msh1014106"
                },
                {
                  category_name: "Shapewear",
                  webURL:
                    "/womens-clothing-inner-nightwear-shapewear/c-msh1014107"
                }
              ],
              webURL: "/womens-clothing-inner-nightwear/c-msh1014"
            },
            {
              category_name: "Western Wear",
              subCategories: [
                {
                  category_name: "Western Wear"
                },
                {
                  category_name: "Tops & Tunics",
                  webURL:
                    "/womens-clothing-casual-wear-tops-tunics/c-msh1016102"
                },
                {
                  category_name: "Dresses",
                  webURL: "/womens-clothing-casual-wear-dresses/c-msh1016100"
                },
                {
                  category_name: "Shirts",
                  webURL: "/womens-clothing-casual-wear-shirts/c-msh1016103"
                },
                {
                  category_name: "Pants & Trousers",
                  webURL: "/womens-clothing-casual-wear-trousers/c-msh1016104"
                },
                {
                  category_name: "Jeans",
                  webURL: "/womens-clothing-casual-wear-jeans/c-msh1016106"
                },
                {
                  category_name: "Leggings",
                  webURL: "/womens-clothing-casual-wear-leggings/c-msh1016107"
                },
                {
                  category_name: "Jumpsuits",
                  webURL: "/womens-clothing-casual-wear-jumpsuits/c-msh1016108"
                },
                {
                  category_name: "Skirts",
                  webURL: "/womens-clothing-casual-wear-skirts/c-msh1016105"
                },
                {
                  category_name: "Capris",
                  webURL: "/womens-clothing-casual-wear-capris/c-msh1016112"
                },
                {
                  category_name: "Jackets & Blazers",
                  webURL:
                    "/womens-clothing-casual-wear-jackets-blazers/c-msh1016101"
                },
                {
                  category_name: "Shrugs",
                  webURL: "/womens-clothing-casual-wear-shrugs/c-msh1016114"
                },
                {
                  category_name: "Sweatshirts",
                  webURL:
                    "/womens-clothing-casual-wear-sweatshirts/c-msh1016113"
                },
                {
                  category_name: "Sweaters",
                  webURL: "/womens-clothing-casual-wear-sweaters/c-msh1016110"
                },
                {
                  category_name: "Shorts",
                  webURL: "/womens-clothing-casual-wear-shorts/c-msh1016109"
                }
              ]
            },
            {
              category_name: "Active & Sportswear",
              subCategories: [
                {
                  category_name: "Active & Sportswear",
                  webURL: "/womens-clothing-sports-wear/c-msh1018"
                }
              ],
              webURL: "/womens-clothing-sports-wear/c-msh1018"
            },
            {
              category_name: "Swimwear",
              subCategories: [
                {
                  category_name: "Swimwear",
                  webURL: "/womens-clothing-swim-beachwear/c-msh1013"
                }
              ],
              webURL: "/womens-clothing-swim-beachwear/c-msh1013"
            },
            {
              category_name: "Footwear",
              subCategories: [
                {
                  category_name: "Footwear",
                  webURL: "/footwear-women/c-msh1310"
                },
                {
                  category_name: "Casual",
                  webURL: "/footwear-women-casual/c-msh1310113"
                },
                {
                  category_name: "Ethnic",
                  webURL: "/footwear-women-ethnic/c-msh1310125"
                },
                {
                  category_name: "Formal",
                  webURL: "/footwear-women-formal/c-msh1310112"
                },
                {
                  category_name: "Sneakers",
                  webURL: "/footwear-women-sneakers/c-msh1310115"
                },
                {
                  category_name: "Boots",
                  webURL: "/footwear-women-boots/c-msh1310114"
                },
                {
                  category_name: "Running Shoes",
                  webURL: "/footwear-women-running/c-msh1310117"
                },
                {
                  category_name: "Training Shoes",
                  webURL: "/footwear-women-training/c-msh1310118"
                },
                {
                  category_name: "Flip Flops",
                  webURL: "/footwear-women-home-beach-wear/c-msh1310116"
                }
              ],
              webURL: "/footwear-women/c-msh1310"
            },
            {
              category_name: "Bags",
              subCategories: [
                {
                  category_name: "Women Bags",
                  webURL: "/accessories-women-bags/c-msh1600"
                },
                {
                  category_name: "Handbags",
                  webURL: "/accessories-women-bags-handbags/c-msh1600010"
                },
                {
                  category_name: "Shoulder Bags"
                },
                {
                  category_name: "Tote Bags",
                  webURL: "/accessories-women-bags-tote-bags/c-msh1600004"
                },
                {
                  category_name: "Sling Bag",
                  webURL: "/accessories-women-bags-sling-bags/c-msh1600000"
                },
                {
                  category_name: "Clutches",
                  webURL: "/accessories-women-bags-clutches/c-msh1600001"
                },
                {
                  category_name: "Wallets",
                  webURL: "/accessories-women-bags-wallets/c-msh1600002"
                },
                {
                  category_name: "Backpacks",
                  webURL: "/accessories-women-bags-backpacks/c-msh1600003"
                },
                {
                  category_name: "Cases & Pouches",
                  webURL: "/accessories-women-bags-cases-pouches/c-msh1600006"
                },
                {
                  category_name: "Messenger Bags",
                  webURL: "/accessories-women-bags-messenger-bags/c-msh1600007"
                },
                {
                  category_name: "Others",
                  webURL: "/accessories-women-bags-others/c-msh1600013"
                }
              ],
              webURL: "/accessories-women-bags/c-msh1600"
            },
            {
              category_name: "Watches",
              subCategories: [
                {
                  category_name: "Watches",
                  webURL: "/watches-women/c-msh1501"
                },
                {
                  category_name: "Analog",
                  webURL: "/watches-women-analog/c-msh1501000"
                },
                {
                  category_name: "Digital",
                  webURL: "/watches-women-digital/c-msh1501001"
                },
                {
                  category_name: "Smart Watches"
                }
              ],
              webURL: "/watches-women/c-msh1501"
            }
          ],
          webURL:
            "https://tmppprd.tataunistore.com/womenswear?&icid2=shopbydept:x:womenswear:x:page:1:01_08_2017"
        },
        {
          category_name: "Men",
          subCategories: [
            {
              category_name: "Footwear",
              subCategories: [
                {
                  category_name: "Footwear",
                  webURL: "/footwear-men/c-msh1311"
                },
                {
                  category_name: "Casual Shoes",
                  webURL: "/footwear-men-casual/c-msh1311113"
                },
                {
                  category_name: "Sneakers",
                  webURL: "/footwear-men-sneakers/c-msh1311115"
                },
                {
                  category_name: "Formal Shoes",
                  webURL: "/footwear-men-formal/c-msh1311112"
                },
                {
                  category_name: "Running Shoes",
                  webURL: "/footwear-men-running/c-msh1311117"
                },
                {
                  category_name: "Training Shoes",
                  webURL: "/footwear-men-training/c-msh1311118"
                },
                {
                  category_name: "Sports Shoes"
                },
                {
                  category_name: "Boots"
                },
                {
                  category_name: "Flip Flops",
                  webURL: "/footwear-men-home-beach-wear/c-msh1311116"
                }
              ],
              webURL: "/footwear-men/c-msh1311"
            },
            {
              category_name: "Ethnic Wear",
              subCategories: [
                {
                  category_name: "Ethnic Wear",
                  webURL: "/mens-clothing-ethnic-wear/c-msh1112"
                },
                {
                  category_name: "Kurta",
                  webURL: "/mens-clothing-ethnic-wear-kurta/c-msh1112102"
                },
                {
                  category_name: "Kurta sets",
                  webURL: "/mens-clothing-ethnic-wear-kurta-sets/c-msh1112101"
                }
              ],
              webURL: "/mens-clothing-ethnic-wear/c-msh1112"
            },
            {
              category_name: "Casual Wear",
              subCategories: [
                {
                  category_name: "Casual Wear",
                  webURL: "/mens-clothing-casual-wear/c-msh1116"
                },
                {
                  category_name: "T-shirts & Polos",
                  webURL:
                    "/mens-clothing-casual-wear-t-shirts-polos/c-msh1116100"
                },
                {
                  category_name: "Casual Shirts",
                  webURL: "/mens-clothing-casual-wear-shirts/c-msh1116101"
                },
                {
                  category_name: "Jeans",
                  webURL: "/mens-clothing-casual-wear-jeans/c-msh1116105"
                },
                {
                  category_name: "Chinos & Trousers",
                  webURL:
                    "/mens-clothing-casual-wear-trousers-chinos/c-msh1116106"
                },
                {
                  category_name: "Shorts",
                  webURL: "/mens-clothing-casual-wear-shorts/c-msh1116107"
                },
                {
                  category_name: "Sweatshirts",
                  webURL: "/mens-clothing-casual-wear-sweatshirts/c-msh1116102"
                },
                {
                  category_name: "Casual Jackets",
                  webURL: "/mens-clothing-casual-wear-jackets/c-msh1116103"
                },
                {
                  category_name: "Formal Shirts"
                },
                {
                  category_name: "Formal Trousers"
                },
                {
                  category_name: "Suits & Blazers"
                }
              ],
              webURL: "/mens-clothing-casual-wear/c-msh1116"
            },
            {
              category_name: "Innerwear",
              subCategories: [
                {
                  category_name: "Inner & Nightwear",
                  webURL: "/mens-clothing-inner-nightwear/c-msh1114"
                }
              ],
              webURL: "/mens-clothing-inner-nightwear/c-msh1114"
            },
            {
              category_name: "Sports Wear",
              subCategories: [
                {
                  category_name: "Sports Wear",
                  webURL: "/mens-clothing-sports-wear/c-msh1118"
                },
                {
                  category_name: "T-Shirts & Jerseys",
                  webURL: "/mens-clothing-sports-wear-t-shirts/c-msh1118100"
                },
                {
                  category_name: "Shorts",
                  webURL: "/mens-clothing-sports-wear-shorts/c-msh1118101"
                },
                {
                  category_name: "Sports Jackets",
                  webURL: "/mens-clothing-sports-wear-jackets/c-msh1118103"
                },
                {
                  category_name: "Joggers",
                  webURL: "/mens-clothing-sports-wear-track-pants/c-msh1118104"
                },
                {
                  category_name: "Tracksuits",
                  webURL: "/mens-clothing-sports-wear-sets/c-msh1118102"
                },
                {
                  category_name: "Trunks"
                },
                {
                  category_name: "Sports Shoes"
                }
              ],
              webURL: "/mens-clothing-sports-wear/c-msh1118"
            },
            {
              category_name: "Mens Bags",
              subCategories: [
                {
                  category_name: "Bags",
                  webURL: "/accessories-mens-bags/c-msh1604"
                },
                {
                  category_name: "Backpacks",
                  webURL: "/accessories-mens-bags-backpacks/c-msh1604005"
                },
                {
                  category_name: "Messenger Bags",
                  webURL: "/accessories-mens-bags-messenger-bags/c-msh1604001"
                },
                {
                  category_name: "Sling Bags",
                  webURL: "/accessories-mens-bags-sling-bags/c-msh1604004"
                },
                {
                  category_name: "Cross Body Bags",
                  webURL: "/accessories-mens-bags-cross-body-bags/c-msh1604006"
                },
                {
                  category_name: "Wallets",
                  webURL: "/accessories-mens-bags-wallets/c-msh1604000"
                },
                {
                  category_name: "Others",
                  webURL: "/accessories-mens-bags-others/c-msh1604007"
                }
              ],
              webURL: "/accessories-mens-bags/c-msh1604"
            },
            {
              category_name: "Watches",
              subCategories: [
                {
                  category_name: "Watches",
                  webURL: "/watches-men/c-msh1500"
                },
                {
                  category_name: "Analog",
                  webURL: "/watches-men-analog/c-msh1500000"
                },
                {
                  category_name: "Digital",
                  webURL: "/watches-men-digital/c-msh1500001"
                },
                {
                  category_name: "Analog & Digital",
                  webURL: "/watches-men-analog-digital/c-msh1500002"
                },
                {
                  category_name: "Smartwatches"
                }
              ],
              webURL: "/watches-men/c-msh1500"
            },
            {
              category_name: "Accessories",
              subCategories: [
                {
                  category_name: "Accessories"
                },
                {
                  category_name: "Belts"
                },
                {
                  category_name: "Ties"
                },
                {
                  category_name: "Cufflinks"
                },
                {
                  category_name: "Others"
                }
              ]
            }
          ],
          webURL:
            "https://tmppprd.tataunistore.com/menswear?&icid2=shopbydept:x:menswear:x:page:4:01_08_2017"
        },
        {
          category_name: "Electronics",
          subCategories: [
            {
              category_name: "Mobile Phones",
              subCategories: [
                {
                  category_name: "Mobile Phones",
                  webURL: "/electronics-mobile-phones/c-msh1210"
                },
                {
                  category_name: "Smartphones",
                  webURL: "/electronics-mobile-phones-smartphones/c-msh1210100"
                },
                {
                  category_name: "iPhone",
                  webURL: "/electronics-mobile-phones-iphone/c-msh1210102"
                }
              ],
              webURL: "/electronics-mobile-phones/c-msh1210"
            },
            {
              category_name: "TV & Entertainment",
              subCategories: [
                {
                  category_name: "TV & Entertainment",
                  webURL: "/electronics-tv/c-msh1216"
                },
                {
                  category_name: "HD Ready TV",
                  webURL: "/electronics-tv-hd-ready-tv/c-msh1216105"
                },
                {
                  category_name: "Full HD LED TV",
                  webURL: "/electronics-tv-full-hd-led-tv/c-msh1216104"
                },
                {
                  category_name: "Smart TV",
                  webURL: "/electronics-tv-smart-tv/c-msh1216106"
                },
                {
                  category_name: "4k Ultra HD TV",
                  webURL: "/electronics-tv-4k-ultra-hd-tv/c-msh1216107"
                },
                {
                  category_name: "TV Accessories",
                  webURL: "/electronics-tv-tv-accessories/c-msh1216101"
                }
              ],
              webURL: "/electronics-tv/c-msh1216"
            },
            {
              category_name: "Large Appliances",
              subCategories: [
                {
                  category_name: "Large Appliances",
                  webURL: "/electronics-large-appliances/c-msh1214"
                },
                {
                  category_name: "Refrigerators",
                  webURL:
                    "/electronics-large-appliances-refrigerators/c-msh1214100"
                },
                {
                  category_name: "Washing Machine",
                  webURL:
                    "/electronics-large-appliances-washing-machine/c-msh1214103"
                },
                {
                  category_name: "Clothes Dryer",
                  webURL:
                    "/electronics-large-appliances-clothes-dryer/c-msh1214104"
                }
              ],
              webURL: "/electronics-large-appliances/c-msh1214"
            },
            {
              category_name: "Air Conditioner",
              subCategories: [
                {
                  category_name: "Air Conditioner",
                  webURL: "/electronics-air-conditioner/c-msh1230"
                },
                {
                  category_name: "Split AC",
                  webURL: "/electronics-air-conditioner-split-ac/c-msh1230100"
                },
                {
                  category_name: "Window AC",
                  webURL: "/electronics-air-conditioner-window-ac/c-msh1230101"
                },
                {
                  category_name: "Other AC",
                  webURL: "/electronics-air-conditioner-other-ac/c-msh1230102"
                },
                {
                  category_name: "Air Cooler",
                  webURL:
                    "/electronics-small-appliances-air-cooler/c-msh1231102"
                }
              ],
              webURL: "/electronics-air-conditioner/c-msh1230"
            },
            {
              category_name: "Tablets",
              subCategories: [
                {
                  category_name: "Tablets",
                  webURL: "/electronics-tablets/c-msh1211"
                },
                {
                  category_name: "Tablet",
                  webURL: "/electronics-tablets-tablets/c-msh1211100"
                },
                {
                  category_name: "iPad",
                  webURL: "/electronics-tablets-ipad/c-msh1211101"
                },
                {
                  category_name: "Kindle",
                  webURL: "/electronics-tablets-kindle/c-msh1211104"
                }
              ],
              webURL: "/electronics-tablets/c-msh1211"
            },
            {
              category_name: "Wearable Devices",
              subCategories: [
                {
                  category_name: "Wearable Devices",
                  webURL: "/electronics-wearable-devices/c-msh1219"
                },
                {
                  category_name: "Smart Watch",
                  webURL:
                    "/electronics-wearable-devices-smart-watch/c-msh1219104"
                },
                {
                  category_name: "Fitness Tracker",
                  webURL:
                    "/electronics-wearable-devices-fitness-tracker/c-msh1219105"
                }
              ],
              webURL: "/electronics-wearable-devices/c-msh1219"
            },
            {
              category_name: "Camera",
              subCategories: [
                {
                  category_name: "Camera",
                  webURL: "/electronics-camera/c-msh1220"
                },
                {
                  category_name: "Security Cameras",
                  webURL: "/electronics-camera-security-cameras/c-msh1220103"
                },
                {
                  category_name: "Camcorder",
                  webURL: "/electronics-camera-camcorder/c-msh1220104"
                },
                {
                  category_name: "DSLR",
                  webURL: "/electronics-camera-dslr/c-msh1220105"
                },
                {
                  category_name: "Camera Bags",
                  webURL: "/electronics-camera-camera-bags/c-msh1220110"
                },
                {
                  category_name: "Digital Camera",
                  webURL: "/electronics-camera-digital-camera/c-msh1220107"
                },
                {
                  category_name: "Binoculars",
                  webURL: "/electronics-camera-binoculars/c-msh1220109"
                },
                {
                  category_name: "Tripod",
                  webURL: "/electronics-camera-tripod/c-msh1220114"
                },
                {
                  category_name: "Flash & Battery",
                  webURL: "/electronics-camera-flash-battery/c-msh1220111"
                },
                {
                  category_name: "Camera Lens",
                  webURL: "/electronics-camera-camera-lens/c-msh1220112"
                }
              ],
              webURL: "/electronics-camera/c-msh1220"
            },
            {
              category_name: "Laptops",
              subCategories: [
                {
                  category_name: "Laptops",
                  webURL: "/electronics-laptop/c-msh1223"
                },
                {
                  category_name: "Notebook & Macbook",
                  webURL: "/electronics-laptop-notebook-macbook/c-msh1223100"
                },
                {
                  category_name: "2-in-1",
                  webURL: "/electronics-laptop-2-in-1/c-msh1223101"
                }
              ],
              webURL: "/electronics-laptop/c-msh1223"
            },
            {
              category_name: "Kitchen Appliances",
              subCategories: [
                {
                  category_name: "Kitchen Appliances",
                  webURL: "/electronics-kitchen-appliances/c-msh1229"
                },
                {
                  category_name: "Microwave Oven",
                  webURL:
                    "/electronics-kitchen-appliances-microwave-oven/c-msh1229100"
                },
                {
                  category_name: "Air Fryer",
                  webURL:
                    "/electronics-kitchen-appliances-air-fryer/c-msh1229101"
                },
                {
                  category_name: "cooker",
                  webURL: "/electronics-kitchen-appliances-cooker/c-msh1229102"
                },
                {
                  category_name: "Cooktop",
                  webURL: "/electronics-kitchen-appliances-cooktop/c-msh1229103"
                },
                {
                  category_name: "Food & Roti Maker",
                  webURL:
                    "/electronics-kitchen-appliances-food-roti-maker/c-msh1229105"
                },
                {
                  category_name: "Toaster",
                  webURL: "/electronics-kitchen-appliances-toaster/c-msh1229106"
                },
                {
                  category_name: "Coffee Maker",
                  webURL:
                    "/electronics-kitchen-appliances-coffee-maker/c-msh1229107"
                },
                {
                  category_name: "Espresso Machine",
                  webURL:
                    "/electronics-kitchen-appliances-espresso-machine/c-msh1229108"
                },
                {
                  category_name: "Kettle",
                  webURL: "/electronics-kitchen-appliances-kettle/c-msh1229109"
                },
                {
                  category_name: "Mixer & Grinder",
                  webURL:
                    "/electronics-kitchen-appliances-mixer-grinder/c-msh1229112"
                },
                {
                  category_name: "Chopper",
                  webURL: "/electronics-kitchen-appliances-chopper/c-msh1229111"
                },
                {
                  category_name: "Blender & Juicer",
                  webURL:
                    "/electronics-kitchen-appliances-blender-juicer/c-msh1229110"
                }
              ],
              webURL: "/electronics-kitchen-appliances/c-msh1229"
            },
            {
              category_name: "Small Appliances",
              subCategories: [
                {
                  category_name: "Small Appliances",
                  webURL: "/electronics-small-appliances/c-msh1231"
                },
                {
                  category_name: "Air Purifier",
                  webURL: "/electronics-small-appliances/c-msh1231"
                },
                {
                  category_name: "Vacuum Cleaner",
                  webURL:
                    "/electronics-small-appliances-vacuum-cleaner/c-msh1231101"
                },
                {
                  category_name: "Water Purifier",
                  webURL:
                    "/electronics-small-appliances-water-purifier/c-msh1231103"
                }
              ],
              webURL: "/electronics-small-appliances/c-msh1231"
            },
            {
              category_name: "Personal Care",
              subCategories: [
                {
                  category_name: "Personal Care",
                  webURL: "/electronics-personal-care/c-msh1236"
                },
                {
                  category_name: "Epilator",
                  webURL: "/electronics-personal-care/c-msh1236"
                },
                {
                  category_name: "Hair Dryer",
                  webURL: "/electronics-personal-care-hair-dryer/c-msh1236101"
                },
                {
                  category_name: "Hair Styler",
                  webURL: "/electronics-personal-care-hair-styler/c-msh1236103"
                },
                {
                  category_name: "Trimmer & Shaver",
                  webURL:
                    "/electronics-personal-care-trimmer-shaver/c-msh1236105"
                },
                {
                  category_name: "Health Care",
                  webURL: "/electronics-personal-care-health-care/c-msh1236106"
                },
                {
                  category_name: "Hair Straightener",
                  webURL:
                    "/electronics-personal-care-hair-straightener/c-msh1236102"
                }
              ],
              webURL: "/electronics-personal-care/c-msh1236"
            },
            {
              category_name: "Storage Devices",
              subCategories: [
                {
                  category_name: "Storage Devices",
                  webURL: "/electronics-storage-devices/c-msh1228"
                },
                {
                  category_name: "Hard Disk",
                  webURL: "/electronics-storage-devices-hard-disk/c-msh1228101"
                },
                {
                  category_name: "Pen drive",
                  webURL: "/electronics-storage-devices-pen-drive/c-msh1228102"
                }
              ],
              webURL: "/electronics-storage-devices/c-msh1228"
            },
            {
              category_name: "Accessories",
              subCategories: [
                {
                  category_name: "Accessories",
                  webURL: "/electronics-accessories/c-msh1222"
                },
                {
                  category_name: "Charger",
                  webURL: "/electronics-accessories-charger/c-msh1222100"
                },
                {
                  category_name: "Covers & Cases",
                  webURL: "/electronics-accessories-covers-cases/c-msh1222101"
                },
                {
                  category_name: "Memory Card",
                  webURL: "/electronics-accessories-memory-card/c-msh1222102"
                },
                {
                  category_name: "Power Bank",
                  webURL: "/electronics-accessories-power-bank/c-msh1222103"
                },
                {
                  category_name: "Selfie Stick",
                  webURL: "/electronics-accessories-selfie-stick/c-msh1222107"
                },
                {
                  category_name: "Tablet Keyboard",
                  webURL:
                    "/electronics-accessories-tablet-keyboard/c-msh1222105"
                },
                {
                  category_name: "Screen Protector",
                  webURL:
                    "/electronics-accessories-screen-protector/c-msh1222104"
                },
                {
                  category_name: "Protection Plan",
                  webURL:
                    "/electronics-accessories-protection-plan/c-msh1222108"
                },
                {
                  category_name: "ITablet Stand",
                  webURL: "/electronics-accessories-tablet-stand/c-msh1222106"
                }
              ],
              webURL: "/electronics-accessories/c-msh1222"
            },
            {
              category_name: "Audio & Video",
              subCategories: [
                {
                  category_name: "Audio & Video",
                  webURL: "/electronics-audio-video/c-msh1232"
                },
                {
                  category_name: "DVD Player",
                  webURL: "/electronics-audio-video-dvd-player/c-msh1232100"
                },
                {
                  category_name: "Projector",
                  webURL: "/electronics-audio-video-projector/c-msh1232101"
                },
                {
                  category_name: "IPOD",
                  webURL: "/electronics-audio-video-ipod/c-msh1232102"
                },
                {
                  category_name: "MP3 Player",
                  webURL: "/electronics-audio-video-mp3-player/c-msh1232103"
                }
              ],
              webURL: "/electronics-audio-video/c-msh1232"
            },
            {
              category_name: "Speakers",
              subCategories: [
                {
                  category_name: "Speakers",
                  webURL: "/electronics-speakers/c-msh1235"
                },
                {
                  category_name: "Bluetooth",
                  webURL: "/electronics-speakers-bluetooth/c-msh1235100"
                },
                {
                  category_name: "Boombox",
                  webURL: "/electronics-speakers-boombox/c-msh1235101"
                },
                {
                  category_name: "Sound Bar",
                  webURL: "/electronics-speakers-sound-bar/c-msh1235104"
                },
                {
                  category_name: "Dock",
                  webURL: "/electronics-speakers-dock/c-msh1235103"
                },
                {
                  category_name: "Portable Speakers",
                  webURL: "/electronics-speakers-portable-speakers/c-msh1235102"
                }
              ],
              webURL: "/electronics-speakers/c-msh1235"
            },
            {
              category_name: "Head Phones",
              subCategories: [
                {
                  category_name: "Head Phones",
                  webURL: "/electronics-head-phones/c-msh1234"
                },
                {
                  category_name: "Earphones",
                  webURL: "/electronics-head-phones-earphones/c-msh1234100"
                },
                {
                  category_name: "Headsets",
                  webURL: "/electronics-head-phones-headsets/c-msh1234101"
                }
              ],
              webURL: "/electronics-head-phones/c-msh1234"
            },
            {
              category_name: "Home Theater",
              subCategories: [
                {
                  category_name: "Home Theater",
                  webURL: "/electronics-home-theater/c-msh1233"
                },
                {
                  category_name: "Speaker",
                  webURL: "/electronics-home-theater-speaker/c-msh1233105"
                },
                {
                  category_name: "Home Theatre",
                  webURL: "/electronics-home-theater-home-theatre/c-msh1233102"
                }
              ],
              webURL: "/electronics-home-theater/c-msh1233"
            },
            {
              category_name: "Computer Parts",
              subCategories: [
                {
                  category_name: "Computer Parts",
                  webURL: "/electronics-computer-parts/c-msh1226"
                },
                {
                  category_name: "Keyboard & Mouse",
                  webURL:
                    "/electronics-computer-parts-keyboard-mouse/c-msh1226100"
                },
                {
                  category_name: "Webcam",
                  webURL: "/electronics-computer-parts-webcam/c-msh1226101"
                },
                {
                  category_name: "Software",
                  webURL: "/electronics-computer-parts-software/c-msh1226102"
                },
                {
                  category_name: "Accessories",
                  webURL: "/electronics-computer-parts-accessories/c-msh1226103"
                }
              ],
              webURL: "/electronics-computer-parts/c-msh1226"
            },
            {
              category_name: "Networking Devices",
              subCategories: [
                {
                  category_name: "Networking Devices",
                  webURL: "/electronics-networking-devices/c-msh1225"
                },
                {
                  category_name: "Wifi Dongle",
                  webURL:
                    "/electronics-networking-devices-wifi-dongle/c-msh1225100"
                },
                {
                  category_name: "Router & Modem",
                  webURL:
                    "/electronics-networking-devices-router-modem/c-msh1225102"
                }
              ],
              webURL: "/electronics-networking-devices/c-msh1225"
            },
            {
              category_name: "Desktop",
              subCategories: [
                {
                  category_name: "Desktop",
                  webURL: "/electronics-desktop/c-msh1224"
                },
                {
                  category_name: "All In One",
                  webURL: "/electronics-desktop-all-in-one/c-msh1224100"
                },
                {
                  category_name: "iMac",
                  webURL: "/electronics-desktop-imac/c-msh1224101"
                },
                {
                  category_name: "Monitor",
                  webURL: "/electronics-desktop-monitor/c-msh1224103"
                }
              ],
              webURL: "/electronics-desktop/c-msh1224"
            },
            {
              category_name: "Gaming",
              subCategories: [
                {
                  category_name: "Gaming",
                  webURL: "/electronics-gaming/c-msh1221"
                },
                {
                  category_name: "Consoles & Pads",
                  webURL: "/electronics-gaming-consoles-pads/c-msh1221100"
                },
                {
                  category_name: "Software",
                  webURL: "/electronics-gaming-software/c-msh1221101"
                },
                {
                  category_name: "Mouse",
                  webURL: "/electronics-gaming-mouse/c-msh1221103"
                }
              ],
              webURL: "/electronics-gaming/c-msh1221"
            },
            {
              category_name: "Printer & Parts",
              subCategories: [
                {
                  category_name: "Printer & Parts",
                  webURL: "/electronics-printer-parts/c-msh1227"
                },
                {
                  category_name: "All In One",
                  webURL: "/electronics-printer-parts-all-in-one/c-msh1227100"
                },
                {
                  category_name: "Cartridge & Toner",
                  webURL:
                    "/electronics-printer-parts-cartridge-toner/c-msh1227101"
                },
                {
                  category_name: "Laser Printer",
                  webURL:
                    "/electronics-printer-parts-laser-printer/c-msh1227102"
                },
                {
                  category_name: "Paper",
                  webURL: "/electronics-printer-parts-paper/c-msh1227103"
                }
              ],
              webURL: "/electronics-printer-parts/c-msh1227"
            }
          ],
          webURL:
            "https://tmppprd.tataunistore.com/electronics-store?&icid2=shopbydept:electronics:all:e:x:1:26-05"
        }
      ],
      componentName: "categoriesTabAZListComponent"
    }
  ],
  message: "",
  pageName: "",
  pageType: ""
};
export function getCategoriesRequest() {
  return {
    type: GET_CATEGORIES_REQUEST,
    status: REQUESTING
  };
}
export function getCategoriesSuccess(categories) {
  return {
    type: GET_CATEGORIES_SUCCESS,
    status: SUCCESS,
    categories
  };
}

export function getCategoriesFailure(error) {
  return {
    type: GET_CATEGORIES_FAILURE,
    status: ERROR,
    error
  };
}

export function getCategories(userId, accessToken, cartId) {
  return async (dispatch, getState, { api }) => {
    dispatch(getCategoriesRequest());

    try {
      const result = await api.get(
        `${USER_CATEGORY_PATH}/getAllCategorieshierarchy?`
      );
      const resultJson = await result.json();
      if (resultJson.status === FAILURE) {
        throw new Error(resultJson.error);
      }
      dispatch(getCategoriesSuccess(resultJson));
      setDataLayer(ADOBE_DEFAULT_CLP_PAGE_LOAD, resultJson);
    } catch (e) {
      dispatch(getCategoriesFailure(e.message));
    }
  };
}

export function headerDetailsRequest() {
  return {
    type: GET_HEADER_REQUEST,
    status: REQUESTING
  };
}
export function headerDetailsSuccess(headerDetails) {
  return {
    type: GET_HEADER_SUCCESS,
    status: SUCCESS,
    headerDetails
  };
}

export function headerDetailsFailure(error) {
  return {
    type: GET_HEADER_FAILURE,
    status: ERROR,
    error
  };
}

export function headerDetails() {
  return async (dispatch, getState, { api }) => {
    dispatch(headerDetailsRequest());
    try {
      const result = api.get("header");
      const resultJson = result.json();
      const resultJsonStatus = ErrorHandling.getFailureResponse(resultJson);
      if (resultJsonStatus.status) {
        throw new Error(resultJsonStatus.message);
      }
      dispatch(headerDetailsSuccess(resultJson));
    } catch (e) {
      dispatch(headerDetailsFailure(e.message));
    }
  };
}
