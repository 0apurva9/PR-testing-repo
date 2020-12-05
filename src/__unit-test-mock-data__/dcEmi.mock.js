export const getPaymentModesSuccessMockData = {
  type: "paymentServiceWsData",
  status: "Success",
  cliqCash: {
    totalCliqCashBalance: {
      currencyIso: "INR",
      doubleValue: 0.0,
      formattedValue: "₹0.00",
      formattedValueNoDecimal: "₹0",
      priceType: "BUY",
      value: 0
    }
  },
  cliqCashApplied: false,
  combinedLogoURL: "/adminstatic/img/group_4.png",
  isUPIIntentEnabled: true,
  isWalletCreated: false,
  isWalletOtpVerified: false,
  listofPotentialRestriction: [],
  merchantID: "TUL_PPRD",
  merchantKey: "dummy",
  paymentModes: [
    {
      key: "Saved Card",
      value: true
    },
    {
      key: "Credit Card",
      value: true
    },
    {
      key: "Debit Card",
      value: true
    },
    {
      key: "EMI",
      value: true
    },
    {
      key: "Netbanking",
      value: true
    },
    {
      key: "Cheque",
      value: false
    },
    {
      key: "PayPal",
      value: true
    },
    {
      key: "COD",
      value: true
    },
    {
      key: "UPI",
      value: true
    },
    {
      key: "NEFT",
      value: false
    },
    {
      key: "UPI Intent",
      value: true
    },
    {
      key: "MRupee",
      value: false
    },
    {
      key: "PAYTM",
      value: false
    },
    {
      key: "Cardless EMI",
      value: true
    },
    {
      key: "Instacred",
      value: true
    },
    {
      key: "UNKNOWN",
      value: false
    },
    {
      key: "RTGS",
      value: false
    },
    {
      key: "Cliq Cash",
      value: true
    },
    {
      key: "TW",
      value: false
    }
  ],
  paymentOffers: {
    coupons: [
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          }
        ],
        offerCode: "MP_Netbanking",
        offerMaxDiscount: "500.0",
        offerTitle: "MP_Netbanking",
        paymentModes: [
          {
            mode: "Netbanking"
          },
          {
            mode: "Netbanking"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK LIMITED-VISA Card",
            bankName: "AXIS BANK LIMITED-VISA Card"
          },
          {
            bankCode: "AXIS BANK, LTD.-VISA Card",
            bankName: "AXIS BANK, LTD.-VISA Card"
          },
          {
            bankCode: "AXIS BANK-VISA Card",
            bankName: "AXIS BANK-VISA Card"
          },
          {
            bankCode: "Axis Bank-VISA Card",
            bankName: "Axis Bank-VISA Card"
          },
          {
            bankCode: "Axis Bank Mastercard Credit Card",
            bankName: "Axis Bank Mastercard Credit Card"
          },
          {
            bankCode: "Axis Bank Visa Credit Card",
            bankName: "Axis Bank Visa Credit Card"
          },
          {
            bankCode: "AXIS BANK, LTD. Mastercard Debit Card",
            bankName: "AXIS BANK, LTD. Mastercard Debit Card"
          },
          {
            bankCode: "AXIS BANK, LTD. RuPay Debit Card",
            bankName: "AXIS BANK, LTD. RuPay Debit Card"
          },
          {
            bankCode: "AXIS BANK, LTD. Visa Credit Card",
            bankName: "AXIS BANK, LTD. Visa Credit Card"
          },
          {
            bankCode: "AXIS BANK, LTD. Visa Debit Card",
            bankName: "AXIS BANK, LTD. Visa Debit Card"
          },
          {
            bankCode: "AXIS BANK LIMITED Mastercard Debit Card",
            bankName: "AXIS BANK LIMITED Mastercard Debit Card"
          },
          {
            bankCode: "AXIS BANK LIMITED RuPay Debit Card",
            bankName: "AXIS BANK LIMITED RuPay Debit Card"
          },
          {
            bankCode: "AXIS BANK LIMITED Visa Debit Card",
            bankName: "AXIS BANK LIMITED Visa Debit Card"
          }
        ],
        offerCode: "MP_Debit_Seller",
        offerMaxDiscount: "550.0",
        offerTitle: "MP_Debit_Seller",
        paymentModes: [
          {
            mode: "Debit Card"
          },
          {
            mode: "Debit Card"
          },
          {
            mode: "Credit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          },
          {
            bankCode: "STATE BANK OF INDIA-VISA Card",
            bankName: "STATE BANK OF INDIA-VISA Card"
          }
        ],
        offerCode: "MP_Credit",
        offerTitle: "MP_Credit",
        paymentModes: [
          {
            mode: "Credit Card"
          },
          {
            mode: "Credit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          }
        ],
        offerCode: "MP_Netbanking_Seller",
        offerTitle: "MP_Netbanking_Seller",
        paymentModes: [
          {
            mode: "Netbanking"
          },
          {
            mode: "Netbanking"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "MP_StdEMI_Seller",
        offerTitle: "MP_StdEMI_Seller",
        paymentModes: [
          {
            mode: "Cardless EMI"
          },
          {
            mode: "EMI"
          },
          {
            mode: "EMI"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          }
        ],
        offerCode: "HF_Debit_Seller",
        offerMaxDiscount: "150.0",
        offerTitle: "HF_Debit_Seller",
        paymentModes: [
          {
            mode: "Debit Card"
          },
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC Bank-VISA Card",
            bankName: "HDFC Bank-VISA Card"
          },
          {
            bankCode: "HDFC BANK LIMITED-VISA Card",
            bankName: "HDFC BANK LIMITED-VISA Card"
          },
          {
            bankCode: "HDFC BANK, LTD.-VISA Card",
            bankName: "HDFC BANK, LTD.-VISA Card"
          },
          {
            bankCode: "HDFC BANK CREDIT CARD",
            bankName: "HDFC BANK CREDIT CARD"
          }
        ],
        offerCode: "Demo_BANK",
        offerMaxDiscount: "500.0",
        offerTitle: "Demo_BANK",
        paymentModes: [
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "AXIS5_BankOffer",
        offerTitle: "AXIS5_BankOffer",
        paymentModes: [
          {
            mode: "Credit Card"
          },
          {
            mode: "Credit Card"
          }
        ]
      },
      {
        offerCode: "Test_Promotion_MplCartOfferCoupon",
        offerTitle: "Test_Promotion_MplCartOfferCoupon"
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          },
          {
            bankCode: "HDFC BANK, LTD.-VISA Card",
            bankName: "HDFC BANK, LTD.-VISA Card"
          },
          {
            bankCode: "HDFC BANK CREDIT CARD",
            bankName: "HDFC BANK CREDIT CARD"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK LIMITED-VISA Card",
            bankName: "HDFC BANK LIMITED-VISA Card"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          },
          {
            bankCode: "HDFC BANK, LTD.-VISA Card",
            bankName: "HDFC BANK, LTD.-VISA Card"
          },
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          }
        ],
        offerCode: "9AUGHDFC",
        offerDescription: "Valid on HDFC Bank Credit & Debit Cards TCA*",
        offerTitle: "10% Off on HDFC Bank Cards*",
        paymentModes: [
          {
            mode: "Credit Card"
          },
          {
            mode: "Debit Card"
          },
          {
            mode: "EMI"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "AXIS BANK WESTSIDE",
        offerDescription: "Instant discount on Axis Bank Credit & Debit cards*",
        offerTitle: "5% off on Westside",
        paymentModes: [
          {
            mode: "Credit Card"
          },
          {
            mode: "Debit Card"
          },
          {
            mode: "Credit Card"
          },
          {
            mode: "Debit Card"
          },
          {
            mode: "Credit Card"
          },
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "HF_SE_IncCatg_ExclPr",
        offerTitle: "HF_SE_IncCatg_ExclPr",
        paymentModes: [
          {
            mode: "Cardless EMI"
          },
          {
            mode: "EMI"
          },
          {
            mode: "EMI"
          }
        ]
      },
      {
        offerCode: "CouponBankTest1",
        offerTitle: "CouponBankTest1"
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          }
        ],
        offerCode: "MbankIncSlrIncCatgFixDiscCT",
        offerTitle: "MbankIncSlrIncCatgFixDiscCT",
        paymentModes: [
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          }
        ],
        offerCode: "TrailAxisBankOffer_Coupon",
        offerTitle: "TrailAxisBankOffer_Coupon",
        paymentModes: [
          {
            mode: "Credit Card"
          },
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          }
        ],
        offerCode: "MP_Debit",
        offerMaxDiscount: "500.0",
        offerTitle: "MP_Debit",
        paymentModes: [
          {
            mode: "Debit Card"
          },
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          }
        ],
        offerCode: "MP_Debit_InclCatg_ExcluCatg",
        offerTitle: "MP_Debit_InclCatg_ExcluCatg",
        paymentModes: [
          {
            mode: "Debit Card"
          },
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          },
          {
            bankCode: "STATE BANK OF INDIA-VISA Card",
            bankName: "STATE BANK OF INDIA-VISA Card"
          }
        ],
        offerCode: "MP_Credit_InclCatg_ExcluProd",
        offerTitle: "MP_Credit_InclCatg_ExcluProd",
        paymentModes: [
          {
            mode: "Credit Card"
          },
          {
            mode: "Credit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          }
        ],
        offerCode: "MP_NB_InclCatg_ExcluCatg",
        offerTitle: "MP_NB_InclCatg_ExcluCatg",
        paymentModes: [
          {
            mode: "Netbanking"
          },
          {
            mode: "Netbanking"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "MP_SE_InclCatg_ExcluProd",
        offerTitle: "MP_SE_InclCatg_ExcluProd",
        paymentModes: [
          {
            mode: "Cardless EMI"
          },
          {
            mode: "EMI"
          },
          {
            mode: "EMI"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          }
        ],
        offerCode: "MP_Debit_IncBrnd_ExclBrnd",
        offerTitle: "MP_Debit_IncBrnd_ExclBrnd",
        paymentModes: [
          {
            mode: "Debit Card"
          },
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "MP_Credit_Seller",
        offerTitle: "MP_Credit_Seller",
        paymentModes: [
          {
            mode: "Credit Card"
          },
          {
            mode: "Credit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "MP_Credit_InclCatg_ExcluCatg",
        offerTitle: "MP_Credit_InclCatg_ExcluCatg",
        paymentModes: [
          {
            mode: "Credit Card"
          },
          {
            mode: "Credit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          }
        ],
        offerCode: "MP_NB_IncBrnd_ExclBrnd",
        offerTitle: "MP_NB_IncBrnd_ExclBrnd",
        paymentModes: [
          {
            mode: "Netbanking"
          },
          {
            mode: "Netbanking"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "MP_SE_IncBrnd_ExclBrnd",
        offerTitle: "MP_SE_IncBrnd_ExclBrnd",
        paymentModes: [
          {
            mode: "Cardless EMI"
          },
          {
            mode: "EMI"
          },
          {
            mode: "EMI"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          },
          {
            bankCode: "AXIS BANK LIMITED Visa Debit Card",
            bankName: "AXIS BANK LIMITED Visa Debit Card"
          },
          {
            bankCode: "AXIS BANK LIMITED RuPay Debit Card",
            bankName: "AXIS BANK LIMITED RuPay Debit Card"
          },
          {
            bankCode: "AXIS BANK LIMITED Mastercard Debit Card",
            bankName: "AXIS BANK LIMITED Mastercard Debit Card"
          },
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK LIMITED-VISA Card",
            bankName: "AXIS BANK LIMITED-VISA Card"
          },
          {
            bankCode: "AXIS BANK, LTD.-VISA Card",
            bankName: "AXIS BANK, LTD.-VISA Card"
          },
          {
            bankCode: "AXIS BANK-VISA Card",
            bankName: "AXIS BANK-VISA Card"
          },
          {
            bankCode: "Axis Bank-VISA Card",
            bankName: "Axis Bank-VISA Card"
          },
          {
            bankCode: "Axis Bank Mastercard Credit Card",
            bankName: "Axis Bank Mastercard Credit Card"
          },
          {
            bankCode: "Axis Bank Visa Credit Card",
            bankName: "Axis Bank Visa Credit Card"
          },
          {
            bankCode: "AXIS BANK, LTD. Mastercard Debit Card",
            bankName: "AXIS BANK, LTD. Mastercard Debit Card"
          },
          {
            bankCode: "AXIS BANK, LTD. RuPay Debit Card",
            bankName: "AXIS BANK, LTD. RuPay Debit Card"
          },
          {
            bankCode: "AXIS BANK, LTD. Visa Credit Card",
            bankName: "AXIS BANK, LTD. Visa Credit Card"
          },
          {
            bankCode: "AXIS BANK, LTD. Visa Debit Card",
            bankName: "AXIS BANK, LTD. Visa Debit Card"
          }
        ],
        offerCode: "HF_NB_Brand",
        offerMaxDiscount: "180.0",
        offerTitle: "HF_NB_Brand",
        paymentModes: [
          {
            mode: "Netbanking"
          },
          {
            mode: "Netbanking"
          },
          {
            mode: "Credit Card"
          },
          {
            mode: "Credit Card"
          },
          {
            mode: "Debit Card"
          },
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          }
        ],
        offerCode: "CLIQB",
        offerTitle: "CLIQB",
        paymentModes: [
          {
            mode: "Debit Card"
          },
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          }
        ],
        offerCode: "MbankExcSlrIncCatgPercentDisc",
        offerTitle: "MbankExcSlrIncCatgPercentDisc",
        paymentModes: [
          {
            mode: "Credit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          }
        ],
        offerCode: "Netbanking_3183",
        offerTitle: "Netbanking_3183",
        paymentModes: [
          {
            mode: "Netbanking"
          },
          {
            mode: "Netbanking"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          }
        ],
        offerCode: "MbankExcSlrIncCatgFixDiscCT",
        offerTitle: "MbankExcSlrIncCatgFixDiscCT",
        paymentModes: [
          {
            mode: "Credit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          },
          {
            bankCode: "AXIS BANK LIMITED Visa Debit Card",
            bankName: "AXIS BANK LIMITED Visa Debit Card"
          },
          {
            bankCode: "AXIS BANK LIMITED RuPay Debit Card",
            bankName: "AXIS BANK LIMITED RuPay Debit Card"
          },
          {
            bankCode: "AXIS BANK LIMITED Mastercard Debit Card",
            bankName: "AXIS BANK LIMITED Mastercard Debit Card"
          },
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK LIMITED-VISA Card",
            bankName: "AXIS BANK LIMITED-VISA Card"
          },
          {
            bankCode: "AXIS BANK, LTD.-VISA Card",
            bankName: "AXIS BANK, LTD.-VISA Card"
          },
          {
            bankCode: "AXIS BANK-VISA Card",
            bankName: "AXIS BANK-VISA Card"
          },
          {
            bankCode: "Axis Bank-VISA Card",
            bankName: "Axis Bank-VISA Card"
          },
          {
            bankCode: "Axis Bank Mastercard Credit Card",
            bankName: "Axis Bank Mastercard Credit Card"
          },
          {
            bankCode: "Axis Bank Visa Credit Card",
            bankName: "Axis Bank Visa Credit Card"
          },
          {
            bankCode: "AXIS BANK, LTD. Mastercard Debit Card",
            bankName: "AXIS BANK, LTD. Mastercard Debit Card"
          },
          {
            bankCode: "AXIS BANK, LTD. RuPay Debit Card",
            bankName: "AXIS BANK, LTD. RuPay Debit Card"
          },
          {
            bankCode: "AXIS BANK, LTD. Visa Credit Card",
            bankName: "AXIS BANK, LTD. Visa Credit Card"
          },
          {
            bankCode: "AXIS BANK, LTD. Visa Debit Card",
            bankName: "AXIS BANK, LTD. Visa Debit Card"
          }
        ],
        offerCode: "virtual_BankCoupon",
        offerDescription: "virtual tesr",
        offerMaxDiscount: "150.0",
        offerTitle: "virtual_BankCoupon",
        paymentModes: [
          {
            mode: "Netbanking"
          },
          {
            mode: "Netbanking"
          },
          {
            mode: "Credit Card"
          },
          {
            mode: "Credit Card"
          },
          {
            mode: "Debit Card"
          },
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "AXIS10_BankOffer",
        offerTitle: "AXIS10_BankOffer",
        paymentModes: [
          {
            mode: "Credit Card"
          },
          {
            mode: "Credit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "HF_Credit_Catg",
        offerTitle: "HF_Credit_Catg",
        paymentModes: [
          {
            mode: "Credit Card"
          },
          {
            mode: "Credit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          }
        ],
        offerCode: "MbankIncSlrIncCatgPercentDisc",
        offerTitle: "MbankIncSlrIncCatgPercentDisc",
        paymentModes: [
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          }
        ],
        offerCode: "MP_Debit_InclCatg_ExcluProd",
        offerMaxDiscount: "500.0",
        offerTitle: "MP_Debit_InclCatg_ExcluProd",
        paymentModes: [
          {
            mode: "Debit Card"
          },
          {
            mode: "Debit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "MP_Credit_IncBrnd_ExclBrnd",
        offerTitle: "MP_Credit_IncBrnd_ExclBrnd",
        paymentModes: [
          {
            mode: "Credit Card"
          },
          {
            mode: "Credit Card"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "HDFC",
            bankName: "HDFC Bank"
          },
          {
            bankCode: "HDFC BANK LIMITED",
            bankName: "HDFC BANK LIMITED"
          },
          {
            bankCode: "HDFC BANK, LTD.",
            bankName: "HDFC BANK, LTD."
          }
        ],
        offerCode: "MP_NB_InclCatg_ExcluProd",
        offerMaxDiscount: "580.0",
        offerTitle: "MP_NB_InclCatg_ExcluProd",
        paymentModes: [
          {
            mode: "Netbanking"
          },
          {
            mode: "Netbanking"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "MP_StdEMI",
        offerTitle: "MP_StdEMI",
        paymentModes: [
          {
            mode: "Cardless EMI"
          },
          {
            mode: "EMI"
          },
          {
            mode: "EMI"
          }
        ]
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "MP_SE_InclCatg_ExcluCatg",
        offerTitle: "MP_SE_InclCatg_ExcluCatg",
        paymentModes: [
          {
            mode: "Cardless EMI"
          },
          {
            mode: "EMI"
          },
          {
            mode: "EMI"
          }
        ]
      },
      {
        offerCode: "Debit_3169",
        offerTitle: "Debit_3169"
      },
      {
        bankDetails: [
          {
            bankCode: "AXIS",
            bankName: "Axis Bank"
          },
          {
            bankCode: "AXIS BANK",
            bankName: "AXIS BANK"
          },
          {
            bankCode: "AXIS BANK LIMITED",
            bankName: "AXIS BANK LIMITED"
          },
          {
            bankCode: "AXIS BANK, LTD.",
            bankName: "AXIS BANK, LTD."
          }
        ],
        offerCode: "MP_Credit_1105",
        offerTitle: "MP_Credit_1105",
        paymentModes: [
          {
            mode: "Credit Card"
          },
          {
            mode: "Credit Card"
          }
        ]
      }
    ],
    totalOffers: "41"
  },
  savedCardResponse: {
    savedCardDetailsMap: [
      {
        key: "2020-08-25T13:46:54.313+05:30",
        value: {
          addressLine1: "ssdsdds sddssdds ffdfdffddf",
          cardBrand: "VISA",
          cardEndingDigits: "0008",
          cardFingerprint: "m9kmocm8kvokport88i3lc3d8",
          cardISIN: "400000",
          cardIssuer: "Other Banks - Visa Card",
          cardReferenceNumber: "5752ed60e3080db725ac2357f09d7368",
          cardToken: "806481f1-ba3f-442d-a55a-b12138803ced",
          cardType: "CREDIT",
          city: "New Delhi",
          country: "India",
          expired: " ",
          expiryMonth: "03",
          expiryYear: "2023",
          firstName: "Chandan",
          isDomestic: false,
          juspayCardType: "CREDIT",
          lastName: "Singh",
          nameOnCard: "dsdssdds fdffdf",
          nickname: "",
          pincode: "110001",
          state: "Delhi"
        }
      },
      {
        key: "2020-08-24T13:52:25.74+05:30",
        value: {
          cardBrand: "VISA",
          cardEndingDigits: "1111",
          cardFingerprint: "77e6cen0ttd27adci6q9org2pl",
          cardISIN: "411111",
          cardIssuer: "AXIS DC BANK",
          cardReferenceNumber: "2f3aba32ebdba6d54f121b987d16bc07",
          cardToken: "dca72049-605c-4912-ba5e-5d9fd407d50f",
          cardType: "DEBIT",
          expired: " ",
          expiryMonth: "10",
          expiryYear: "2020",
          isDomestic: false,
          juspayCardType: "CREDIT",
          nameOnCard: "test",
          nickname: ""
        }
      },
      {
        key: "2020-08-24T13:52:25.711+05:30",
        value: {
          cardBrand: "VISA",
          cardEndingDigits: "1111",
          cardFingerprint: "77e6cen0ttd27adci6q9org2pl",
          cardISIN: "411111",
          cardIssuer: "AXIS DC BANK",
          cardReferenceNumber: "2f3aba32ebdba6d54f121b987d16bc07",
          cardToken: "dca72049-605c-4912-ba5e-5d9fd407d50f",
          cardType: "DEBIT",
          expired: " ",
          expiryMonth: "10",
          expiryYear: "2020",
          isDomestic: false,
          juspayCardType: "CREDIT",
          nameOnCard: "test",
          nickname: ""
        }
      },
      {
        key: "2020-06-21T13:58:03.377+05:30",
        value: {
          addressLine1: "ssdsdds sddssdds ffdfdffddf",
          cardBrand: "MASTERCARD",
          cardEndingDigits: "2346",
          cardFingerprint: "7jkih546v33lmpu1206696sn6q",
          cardISIN: "512345",
          cardIssuer: "Axis Bank",
          cardReferenceNumber: "388f73899606a92906a8633ca5984201",
          cardToken: "1d0cdb2c-5acf-48e2-ac44-97f0eb4e3e53",
          cardType: "CREDIT",
          city: "New Delhi",
          country: "India",
          expired: " ",
          expiryMonth: "04",
          expiryYear: "2021",
          firstName: "Chandan",
          isDomestic: false,
          juspayCardType: "CREDIT",
          lastName: "Singh",
          nameOnCard: "ddfsfsdfs dsfddfsfds",
          nickname: "",
          pincode: "110001",
          state: "Delhi"
        }
      }
    ]
  },
  upiOffers: {
    upiOfferCalloutList: [
      {
        channel: "",
        endDateAndTime: "2020-10-01 00:00:00",
        identifier: "UpiOfferId4",
        imageUrl: "",
        name: "upi offer name4",
        offerType: "UPI",
        priority: 1003,
        promotionDisplayText: "upi offer description4",
        sequence: 0,
        startDateAndTime: "2020-02-02 00:00:00",
        termsAndConditions: "upi offer terms and conditions4",
        upiProviderName: ""
      },
      {
        channel: "",
        endDateAndTime: "2021-02-20 00:00:00",
        identifier: "UpiOfferId114",
        imageUrl: "",
        name: "upi offer 4",
        offerType: "UPI",
        priority: 1003,
        promotionDisplayText: "upi offer description44",
        sequence: 0,
        startDateAndTime: "2020-02-02 00:00:00",
        termsAndConditions: "upi offer terms and conditions44",
        upiProviderName: "PHONEPE"
      },
      {
        channel: "",
        endDateAndTime: "2021-02-20 00:00:00",
        identifier: "UpiOfferId3",
        imageUrl: "",
        name: "upi offer name3",
        offerType: "UPI",
        priority: 1002,
        promotionDisplayText: "upi offer description3",
        sequence: 0,
        startDateAndTime: "2020-02-02 00:00:00",
        termsAndConditions: "upi offer terms and conditions3",
        upiProviderName: ""
      },
      {
        channel: "",
        endDateAndTime: "2021-02-20 00:00:00",
        identifier: "UpiOfferId113",
        imageUrl: "",
        name: "upi offer 3",
        offerType: "UPI",
        priority: 1002,
        promotionDisplayText: "upi offer description33",
        sequence: 0,
        startDateAndTime: "2020-02-02 00:00:00",
        termsAndConditions: "upi offer terms and conditions33",
        upiProviderName: "PHONEPE"
      },
      {
        channel: "",
        endDateAndTime: "2021-02-20 00:00:00",
        identifier: "UpiOfferId112",
        imageUrl: "",
        name: "upi offer 2",
        offerType: "UPI",
        priority: 1001,
        promotionDisplayText: "upi offer description22",
        sequence: 0,
        startDateAndTime: "2020-02-02 00:00:00",
        termsAndConditions: "upi offer terms and conditions22",
        upiProviderName: ""
      },
      {
        channel: "",
        endDateAndTime: "2021-02-20 00:00:00",
        identifier: "UpiOfferId2",
        imageUrl: "",
        name: "upi offer name2",
        offerType: "UPI",
        priority: 1001,
        promotionDisplayText: "upi offer description2",
        sequence: 0,
        startDateAndTime: "2020-02-02 00:00:00",
        termsAndConditions: "upi offer terms and conditions2",
        upiProviderName: ""
      }
    ]
  },
  whatsapp: false,
  whatsappText: "Get order update on WhatsApp."
};

export const noCostEmiTenureListSuccessMockData = {
  type: "mplNoCostEMIBankTenureDTO",
  status: "Success",
  bankList: [
    {
      bankCode: "RBL",
      bankName: "RBL Bank",
      code: "8796191475331",
      logoUrl: "",
      noCostEMICouponList: [
        {
          description: "RBLNCE3",
          emicouponCode: "RBLNCE3",
          emicouponName: "RBLNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.13"
        },
        {
          description: "RBLNCE6",
          emicouponCode: "RBLNCE6",
          emicouponName: "RBLNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.68"
        },
        {
          description: "RBLNCE9",
          emicouponCode: "RBLNCE9",
          emicouponName: "RBLNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.21"
        },
        {
          description: "RBLNCE12",
          emicouponCode: "RBLNCE12",
          emicouponName: "RBLNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "6.7"
        },
        {
          description: "RBLNCE24",
          emicouponCode: "RBLNCE24",
          emicouponName: "RBLNCE24",
          isPercentage: "true",
          tenure: "24",
          value: "12.36"
        }
      ]
    },
    {
      bankCode: "AXIS",
      bankName: "Axis Bank",
      code: "8796093138563",
      emiInfo: "EMI for AXIS BANK",
      logoUrl:
        "https://assetspreprod3.tataunistore.com/medias/sys_master/images/26477609025566.png",
      noCostEMICouponList: [
        {
          description: "AXISNCE6",
          emicouponCode: "AXISNCE6",
          emicouponName: "AXISNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.68"
        },
        {
          description: "AXISNCE9",
          emicouponCode: "AXISNCE9",
          emicouponName: "AXISNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.59"
        },
        {
          description: "AXISNCE12",
          emicouponCode: "AXISNCE12",
          emicouponName: "AXISNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.19"
        }
      ]
    },
    {
      bankCode: "SBI",
      bankName: "State Bank of India",
      code: "8796125906563",
      logoUrl:
        "https://assets.tatacliq.com/medias/sys_master/12726691528734.png",
      noCostEMICouponList: [
        {
          description: "SBINCE3",
          emicouponCode: "SBINCE3",
          emicouponName: "SBINCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.29"
        },
        {
          description: "SBINCE6",
          emicouponCode: "SBINCE6",
          emicouponName: "SBINCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.96"
        },
        {
          description: "SBINCE9",
          emicouponCode: "SBINCE9",
          emicouponName: "SBINCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.59"
        },
        {
          description: "SBINCE12",
          emicouponCode: "SBINCE12",
          emicouponName: "SBINCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.19"
        }
      ]
    },
    {
      bankCode: "HDFC",
      bankName: "HDFC Bank",
      code: "8796191377027",
      emiInfo:
        "Convenience Fee of Rs 99+GST applicable for EMI transactions on HDFC Bank Cards payable along with 1st EMI.",
      logoUrl:
        "https://assets.tatacliq.com/medias/sys_master/12726691332126.png",
      noCostEMICouponList: [
        {
          description: "HDFCNCE3",
          emicouponCode: "HDFCNCE3",
          emicouponName: "HDFCNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.45"
        },
        {
          description: "HDFCNCE6",
          emicouponCode: "HDFCNCE6",
          emicouponName: "HDFCNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "4.23"
        },
        {
          description: "HDFCNCE9",
          emicouponCode: "HDFCNCE9",
          emicouponName: "HDFCNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.97"
        },
        {
          description: "HDFCNCE12",
          emicouponCode: "HDFCNCE12",
          emicouponName: "HDFCNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.67"
        },
        {
          description: "HDFCNCE18",
          emicouponCode: "HDFCNCE18",
          emicouponName: "HDFCNCE18",
          isPercentage: "true",
          tenure: "18",
          value: "10.94"
        },
        {
          description: "HDFCNCE24",
          emicouponCode: "HDFCNCE24",
          emicouponName: "HDFCNCE24",
          isPercentage: "true",
          tenure: "24",
          value: "14.06"
        }
      ]
    },
    {
      bankCode: "ICICI",
      bankName: "ICICI Bank",
      code: "8796093105795",
      logoUrl:
        "https://assets.tatacliq.com/medias/sys_master/12726691430430.png",
      noCostEMICouponList: [
        {
          description: "ICICINCE3",
          emicouponCode: "ICICINCE3",
          emicouponName: "ICICINCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.13"
        },
        {
          description: "ICICINCE6",
          emicouponCode: "ICICINCE6",
          emicouponName: "ICICINCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.96"
        },
        {
          description: "ICICINCE9",
          emicouponCode: "ICICINCE9",
          emicouponName: "ICICINCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.59"
        },
        {
          description: "ICICINCE12",
          emicouponCode: "ICICINCE12",
          emicouponName: "ICICINCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.18"
        }
      ]
    },
    {
      bankCode: "INDUSIND",
      bankName: "IndusInd Bank",
      code: "8796093171331",
      logoUrl: "",
      noCostEMICouponList: [
        {
          description: "INDUSINDNCE3",
          emicouponCode: "INDUSINDNCE3",
          emicouponName: "INDUSINDNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.13"
        },
        {
          description: "INDUSINDNCE6",
          emicouponCode: "INDUSINDNCE6",
          emicouponName: "INDUSINDNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.41"
        },
        {
          description: "INDUSINDNCE9",
          emicouponCode: "INDUSINDNCE9",
          emicouponName: "INDUSINDNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.97"
        },
        {
          description: "INDUSINDNCE12",
          emicouponCode: "INDUSINDNCE12",
          emicouponName: "INDUSINDNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.67"
        }
      ]
    },
    {
      bankCode: "AMEX",
      bankName: "American Express",
      code: "8796125939331",
      logoUrl: "",
      noCostEMICouponList: [
        {
          description: "AMEXNCE3",
          emicouponCode: "AMEXNCE3",
          emicouponName: "AMEXNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "1.97"
        },
        {
          description: "AMEXNCE6",
          emicouponCode: "AMEXNCE6",
          emicouponName: "AMEXNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.41"
        },
        {
          description: "AMEXNCE9",
          emicouponCode: "AMEXNCE9",
          emicouponName: "AMEXNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "4.82"
        },
        {
          description: "AMEXNCE12",
          emicouponCode: "AMEXNCE12",
          emicouponName: "AMEXNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "6.21"
        }
      ]
    },
    {
      bankCode: "HSBC",
      bankName: "HSBC",
      code: "8796191409795",
      logoUrl: "",
      noCostEMICouponList: [
        {
          description: "HSBCNCE3",
          emicouponCode: "HSBCNCE3",
          emicouponName: "HSBCNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.05"
        },
        {
          description: "HSBCNCE6",
          emicouponCode: "HSBCNCE6",
          emicouponName: "HSBCNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.55"
        },
        {
          description: "HSBCNCE9",
          emicouponCode: "HSBCNCE9",
          emicouponName: "HSBCNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.4"
        },
        {
          description: "HSBCNCE12",
          emicouponCode: "HSBCNCE12",
          emicouponName: "HSBCNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "6.94"
        }
      ]
    },
    {
      bankCode: "SCB",
      bankName: "Standard Chartered Bank",
      code: "8796158609027",
      logoUrl: "",
      noCostEMICouponList: [
        {
          description: "STANCNCE3",
          emicouponCode: "STANCNCE3",
          emicouponName: "STANCNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.13"
        },
        {
          description: "STANCNCE6",
          emicouponCode: "STANCNCE6",
          emicouponName: "STANCNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.68"
        },
        {
          description: "STANCNCE9",
          emicouponCode: "STANCNCE9",
          emicouponName: "STANCNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.59"
        },
        {
          description: "STANCNCE12",
          emicouponCode: "STANCNCE12",
          emicouponName: "STANCNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.19"
        },
        {
          description: "STANCNCE24",
          emicouponCode: "STANCNCE24",
          emicouponName: "STANCNCE24",
          isPercentage: "true",
          tenure: "24",
          value: "14.06"
        }
      ]
    },
    {
      bankCode: "CITI",
      bankName: "Citibank",
      code: "8796224145027",
      logoUrl:
        "https://assetspreprod3.tataunistore.com/medias/sys_master/images/26461992386590.jpg",
      noCostEMICouponList: [
        {
          description: "HF_NCE",
          emicouponCode: "HF_NCE",
          emicouponName: "HF_NCE",
          isPercentage: "true",
          tenure: "3",
          value: "4.5"
        }
      ]
    },
    {
      bankCode: "BOB",
      bankName: "Bank of Brodra",
      code: "8796322449027",
      logoUrl: "",
      noCostEMICouponList: [
        {
          description: "INDUSINDNCE3",
          emicouponCode: "INDUSINDNCE3",
          emicouponName: "INDUSINDNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.13"
        },
        {
          description: "ICICINCE3",
          emicouponCode: "ICICINCE3",
          emicouponName: "ICICINCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.13"
        },
        {
          description: "KOTAKNCE3",
          emicouponCode: "KOTAKNCE3",
          emicouponName: "KOTAKNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "1.97"
        },
        {
          description: "HSBCNCE3",
          emicouponCode: "HSBCNCE3",
          emicouponName: "HSBCNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.05"
        },
        {
          description: "AXISNCE3",
          emicouponCode: "AXISNCE3",
          emicouponName: "AXISNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.13"
        },
        {
          description: "HDFCNCE3",
          emicouponCode: "HDFCNCE3",
          emicouponName: "HDFCNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.45"
        },
        {
          description: "AMEXNCE3",
          emicouponCode: "AMEXNCE3",
          emicouponName: "AMEXNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "1.97"
        },
        {
          description: "YESNCE3",
          emicouponCode: "YESNCE3",
          emicouponName: "YESNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.13"
        },
        {
          description: "STANCNCE3",
          emicouponCode: "STANCNCE3",
          emicouponName: "STANCNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.13"
        },
        {
          description: "RBLNCE3",
          emicouponCode: "RBLNCE3",
          emicouponName: "RBLNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.13"
        },
        {
          description: "SBINCE3",
          emicouponCode: "SBINCE3",
          emicouponName: "SBINCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.29"
        },
        {
          description: "HDFCDCNCE3",
          emicouponCode: "DCNCE3APPLY",
          emicouponName: "HDFCDCNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "10.0"
        },
        {
          description: "CLIQNOCE",
          emicouponCode: "CLIQNOCE",
          emicouponName: "CLIQNOCE",
          isPercentage: "true",
          tenure: "3",
          value: "5.0"
        },
        {
          description: "HF5_NCE_Sel",
          emicouponCode: "HF5_NCE_Sel",
          emicouponName: "HF5_NCE_Sel",
          isPercentage: "true",
          tenure: "3",
          value: "0.0"
        },
        {
          description: "HF_NCE",
          emicouponCode: "HF5_NCE",
          emicouponName: "HF_NCE",
          isPercentage: "true",
          tenure: "3",
          value: "0.0"
        },
        {
          description: "HF_NCE",
          emicouponCode: "HF_NCE",
          emicouponName: "HF_NCE",
          isPercentage: "true",
          tenure: "3",
          value: "4.5"
        },
        {
          description: "TESTAXISNCE3",
          emicouponCode: "TESTAXISNCE3",
          emicouponName: "TESTAXISNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.13"
        },
        {
          description: "MP_NCE",
          emicouponCode: "MP_NCE",
          emicouponName: "MP_NCE",
          isPercentage: "true",
          tenure: "3",
          value: "10.0"
        },
        {
          description: "AXIS_NCE",
          emicouponCode: "AXIS_NCE",
          emicouponName: "AXIS_NCE",
          isPercentage: "true",
          tenure: "3",
          value: "2.18"
        },
        {
          description: "NCE1111",
          emicouponCode: "NCE1111",
          emicouponName: "NCE1111",
          isPercentage: "true",
          tenure: "3",
          value: "10.0"
        },
        {
          description: "TESTYESNCE3",
          emicouponCode: "TESTYESNCE3",
          emicouponName: "TESTYESNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.13"
        },
        {
          description: "MP_NCE_Coupon",
          emicouponCode: "MP_NCE_Coupon",
          emicouponName: "MP_NCE_Coupon",
          isPercentage: "true",
          tenure: "3",
          value: "10.0"
        },
        {
          description: "Demo_NCE",
          emicouponCode: "Demo_NCE",
          emicouponName: "Demo_NCE",
          isPercentage: "true",
          tenure: "3",
          value: "5.0"
        },
        {
          description: "KOTAKNCE6",
          emicouponCode: "KOTAKNCE6",
          emicouponName: "KOTAKNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.41"
        },
        {
          description: "HSBCNCE6",
          emicouponCode: "HSBCNCE6",
          emicouponName: "HSBCNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.55"
        },
        {
          description: "HDFCNCE6",
          emicouponCode: "HDFCNCE6",
          emicouponName: "HDFCNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "4.23"
        },
        {
          description: "STANCNCE6",
          emicouponCode: "STANCNCE6",
          emicouponName: "STANCNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.68"
        },
        {
          description: "AXISNCE6",
          emicouponCode: "AXISNCE6",
          emicouponName: "AXISNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.68"
        },
        {
          description: "ICICINCE6",
          emicouponCode: "ICICINCE6",
          emicouponName: "ICICINCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.96"
        },
        {
          description: "AMEXNCE6",
          emicouponCode: "AMEXNCE6",
          emicouponName: "AMEXNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.41"
        },
        {
          description: "YESNCE6",
          emicouponCode: "YESNCE6",
          emicouponName: "YESNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.68"
        },
        {
          description: "INDUSINDNCE6",
          emicouponCode: "INDUSINDNCE6",
          emicouponName: "INDUSINDNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.41"
        },
        {
          description: "RBLNCE6",
          emicouponCode: "RBLNCE6",
          emicouponName: "RBLNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.68"
        },
        {
          description: "SBINCE6",
          emicouponCode: "SBINCE6",
          emicouponName: "SBINCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.96"
        },
        {
          description: "TESTYESNCE6",
          emicouponCode: "TESTYESNCE6",
          emicouponName: "TESTYESNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.68"
        },
        {
          description: "TESTAXISNCE6",
          emicouponCode: "TESTAXISNCE6",
          emicouponName: "TESTAXISNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.68"
        },
        {
          description: "AMEXNCE9",
          emicouponCode: "AMEXNCE9",
          emicouponName: "AMEXNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "4.82"
        },
        {
          description: "AXISNCE9",
          emicouponCode: "AXISNCE9",
          emicouponName: "AXISNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.59"
        },
        {
          description: "SBINCE9",
          emicouponCode: "SBINCE9",
          emicouponName: "SBINCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.59"
        },
        {
          description: "STANCNCE9",
          emicouponCode: "STANCNCE9",
          emicouponName: "STANCNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.59"
        },
        {
          description: "ICICINCE9",
          emicouponCode: "ICICINCE9",
          emicouponName: "ICICINCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.59"
        },
        {
          description: "YESNCE9",
          emicouponCode: "YESNCE9",
          emicouponName: "YESNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.59"
        },
        {
          description: "HDFCNCE9",
          emicouponCode: "HDFCNCE9",
          emicouponName: "HDFCNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.97"
        },
        {
          description: "RBLNCE9",
          emicouponCode: "RBLNCE9",
          emicouponName: "RBLNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.21"
        },
        {
          description: "HSBCNCE9",
          emicouponCode: "HSBCNCE9",
          emicouponName: "HSBCNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.4"
        },
        {
          description: "INDUSINDNCE9",
          emicouponCode: "INDUSINDNCE9",
          emicouponName: "INDUSINDNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.97"
        },
        {
          description: "KOTAKNCE9",
          emicouponCode: "KOTAKNCE9",
          emicouponName: "KOTAKNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.59"
        },
        {
          description: "Bulk_NCE_9",
          emicouponCode: "Bulk_NCE_9",
          emicouponName: "Bulk_NCE_9",
          isPercentage: "true",
          tenure: "9",
          value: "10.0"
        },
        {
          description: "YESNCE12",
          emicouponCode: "YESNCE12",
          emicouponName: "YESNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.18"
        },
        {
          description: "STANCNCE12",
          emicouponCode: "STANCNCE12",
          emicouponName: "STANCNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.19"
        },
        {
          description: "ICICINCE12",
          emicouponCode: "ICICINCE12",
          emicouponName: "ICICINCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.18"
        },
        {
          description: "HDFCNCE12",
          emicouponCode: "HDFCNCE12",
          emicouponName: "HDFCNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.67"
        },
        {
          description: "KOTAKNCE12",
          emicouponCode: "KOTAKNCE12",
          emicouponName: "KOTAKNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.19"
        },
        {
          description: "AXISNCE12",
          emicouponCode: "AXISNCE12",
          emicouponName: "AXISNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.19"
        },
        {
          description: "HSBCNCE12",
          emicouponCode: "HSBCNCE12",
          emicouponName: "HSBCNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "6.94"
        },
        {
          description: "SBINCE12",
          emicouponCode: "SBINCE12",
          emicouponName: "SBINCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.19"
        },
        {
          description: "RBLNCE12",
          emicouponCode: "RBLNCE12",
          emicouponName: "RBLNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "6.7"
        },
        {
          description: "AMEXNCE12",
          emicouponCode: "AMEXNCE12",
          emicouponName: "AMEXNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "6.21"
        },
        {
          description: "INDUSINDNCE12",
          emicouponCode: "INDUSINDNCE12",
          emicouponName: "INDUSINDNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.67"
        },
        {
          description: "AXIS_NCE_3",
          emicouponCode: "AXIS_NCE_3",
          emicouponName: "AXIS_NCE_3",
          isPercentage: "true",
          tenure: "12",
          value: "2.45"
        },
        {
          description: "HDFCNCE18",
          emicouponCode: "HDFCNCE18",
          emicouponName: "HDFCNCE18",
          isPercentage: "true",
          tenure: "18",
          value: "10.94"
        },
        {
          description: "YESNCE24",
          emicouponCode: "YESNCE24",
          emicouponName: "YESNCE24",
          isPercentage: "true",
          tenure: "24",
          value: "14.06"
        },
        {
          description: "HDFCNCE24",
          emicouponCode: "HDFCNCE24",
          emicouponName: "HDFCNCE24",
          isPercentage: "true",
          tenure: "24",
          value: "14.06"
        },
        {
          description: "RBLNCE24",
          emicouponCode: "RBLNCE24",
          emicouponName: "RBLNCE24",
          isPercentage: "true",
          tenure: "24",
          value: "12.36"
        },
        {
          description: "STANCNCE24",
          emicouponCode: "STANCNCE24",
          emicouponName: "STANCNCE24",
          isPercentage: "true",
          tenure: "24",
          value: "14.06"
        }
      ]
    },
    {
      bankCode: "KOTAK",
      bankName: "Kotak Mahindra Bank",
      code: "8796093073027",
      logoUrl: "",
      noCostEMICouponList: [
        {
          description: "KOTAKNCE3",
          emicouponCode: "KOTAKNCE3",
          emicouponName: "KOTAKNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "1.97"
        },
        {
          description: "KOTAKNCE6",
          emicouponCode: "KOTAKNCE6",
          emicouponName: "KOTAKNCE6",
          isPercentage: "true",
          tenure: "6",
          value: "3.41"
        },
        {
          description: "KOTAKNCE9",
          emicouponCode: "KOTAKNCE9",
          emicouponName: "KOTAKNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.59"
        },
        {
          description: "KOTAKNCE12",
          emicouponCode: "KOTAKNCE12",
          emicouponName: "KOTAKNCE12",
          isPercentage: "true",
          tenure: "12",
          value: "7.19"
        }
      ]
    },
    {
      bankCode: "YES",
      bankName: "YES BANK, LTD.",
      code: "8796191442563",
      logoUrl: "",
      noCostEMICouponList: [
        {
          description: "YESNCE9",
          emicouponCode: "YESNCE9",
          emicouponName: "YESNCE9",
          isPercentage: "true",
          tenure: "9",
          value: "5.59"
        },
        {
          description: "YESNCE24",
          emicouponCode: "YESNCE24",
          emicouponName: "YESNCE24",
          isPercentage: "true",
          tenure: "24",
          value: "14.06"
        }
      ]
    }
  ],
  numEligibleProducts: "2"
};

export const getBankDetailsforDCEmiSuccessMockData = {
  type: "emiBankListWsDTO",
  status: "Success",
  bankList: [
    {
      code: "AXISDC",
      emiBank: "AXIS DC BANK",
      emitermsrate: [
        {
          emiConvCharge: "0.00",
          interestPayable: "2109.00",
          interestRate: "13.0",
          monthlyInstallment: "33033.00",
          overallCost: "99099.00",
          term: "3"
        },
        {
          emiConvCharge: "0.00",
          interestPayable: "3998.70",
          interestRate: "14.0",
          monthlyInstallment: "16831.45",
          overallCost: "100989.00",
          term: "6"
        }
      ],
      logoUrl:
        "https://assetspreprod3.tataunistore.com/medias/sys_master/images/26477609025566.png",
      pk: "8796256913027"
    }
  ],
  bankSpecificTnC: [],
  nonEmiProdList: []
};

export const bankConvFeeIsZero = {
  isNoCostEmiApplied: true,
  selectedEMIType: "No Cost EMI",
  bankList: [
    {
      bankCode: "AXISDC",
      bankName: "AXIS DC BANK",
      code: "8796256913027",
      logoUrl: "",
      noCostEMICouponList: [
        {
          description: "AXISDCNCE3",
          emicouponCode: "AXISDCNCE3",
          emicouponName: "AXISDCNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.78"
        }
      ]
    }
  ],
  noCostEmiProductCount: "1",
  totalProductCount: 1,
  noCostEmiDetails: {
    type: "applyCouponsDTO",
    status: "success",
    appliedCouponDiscount: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 0,
      formattedValue: "₹0.00",
      formattedValueNoDecimal: "₹0",
      priceType: "BUY",
      value: 0
    },
    cartAmount: {
      bagTotal: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 67990,
        formattedValue: "₹67990.00",
        formattedValueNoDecimal: "₹67990",
        priceType: "BUY",
        value: 67990
      },
      noCostEMIConvCharge: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 0,
        formattedValue: "₹0.00",
        formattedValueNoDecimal: "₹0",
        priceType: "BUY",
        value: 0
      },
      noCostEMIDiscountValue: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 1098.1,
        formattedValue: "₹1098.10",
        formattedValueNoDecimal: "₹1098",
        priceType: "BUY",
        value: 1098.1
      },
      noCostEMIInterestValue: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 1098.1,
        formattedValue: "₹1098.10",
        formattedValueNoDecimal: "₹1098",
        priceType: "BUY",
        value: 1098.1
      },
      noCostEMIOrderValue: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 39500,
        formattedValue: "₹39500.00",
        formattedValueNoDecimal: "₹39500",
        priceType: "BUY",
        value: 39500
      },
      noCostEMIPerMonthPayable: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 13166.666666666666,
        formattedValue: "₹13166.67",
        formattedValueNoDecimal: "₹13166",
        priceType: "BUY",
        value: 13166.666666666666
      },
      noCostEMITotalPayable: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 39500,
        formattedValue: "₹39500.00",
        formattedValueNoDecimal: "₹39500",
        priceType: "BUY",
        value: 39500
      },
      paybleAmount: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 38401.9,
        formattedValue: "₹38401.90",
        formattedValueNoDecimal: "₹38401",
        priceType: "BUY",
        value: 38401.9
      },
      shippingCharge: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 0,
        formattedValue: "₹0.00",
        formattedValueNoDecimal: "₹0",
        priceType: "BUY",
        value: 0
      },
      totalDiscountAmount: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 28490,
        formattedValue: "₹28490.00",
        formattedValueNoDecimal: "₹28490",
        priceType: "BUY",
        value: 28490
      }
    },
    cliqCashApplied: false,
    cliqCashBalance: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 4951,
      formattedValue: "₹4951.00",
      formattedValueNoDecimal: "₹4951",
      priceType: "BUY",
      value: 4951
    },
    cliqCashPaidAmount: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 0,
      formattedValue: "₹0.00",
      formattedValueNoDecimal: "₹0",
      priceType: "BUY",
      value: 0
    },
    couponDiscount: "0",
    deliveryCharges: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 0,
      formattedValue: "₹0.00",
      formattedValueNoDecimal: "₹0",
      priceType: "BUY",
      value: 0
    },
    isBankPromotionApplied: false,
    isRemainingAmount: true,
    otherDiscount: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 1098.1,
      formattedValue: "₹1098.10",
      formattedValueNoDecimal: "₹1098",
      priceType: "BUY",
      value: 1098.1
    },
    subTotalPrice: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 39500,
      formattedValue: "₹39500.00",
      formattedValueNoDecimal: "₹39500",
      priceType: "BUY",
      value: 39500
    },
    totalPrice: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 38401.9,
      formattedValue: "₹38401.90",
      formattedValueNoDecimal: "₹38401",
      priceType: "BUY",
      value: 38401.9
    }
  },
  isNoCostEmiProceeded: false,
  cardDetails: {
    is_emi: true,
    emi_bank: "AXISDC",
    emi_tenure: "3",
    selectedMonth: 0,
    selectedCouponCode: "AXISDCNCE3",
    selectedBankName: "AXIS DC BANK"
  },
  emiBinValidationErrorMessage: null,
  isRetryPaymentFromURL: false,
  retryPaymentDetails: null,
  isDebitCard: true,
  emiEligibiltyDetails: {
    type: "dcemiEligibilityDTO",
    status: "Success",
    DCEMIEligibleMessage:
      "Please enter the card details registered with +91 7754556878",
    isDCEMIEligible: true
  }
};
export const bankConvFeeNonZero = {
  isNoCostEmiApplied: true,
  selectedEMIType: "No Cost EMI",
  bankList: [
    {
      bankCode: "AXISDC",
      bankName: "AXIS DC BANK",
      code: "8796256913027",
      logoUrl: "",
      noCostEMICouponList: [
        {
          description: "AXISDCNCE3",
          emicouponCode: "AXISDCNCE3",
          emicouponName: "AXISDCNCE3",
          isPercentage: "true",
          tenure: "3",
          value: "2.78"
        }
      ]
    }
  ],
  noCostEmiProductCount: "1",
  totalProductCount: 1,
  noCostEmiDetails: {
    type: "applyCouponsDTO",
    status: "success",
    appliedCouponDiscount: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 0,
      formattedValue: "₹0.00",
      formattedValueNoDecimal: "₹0",
      priceType: "BUY",
      value: 0
    },
    cartAmount: {
      bagTotal: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 67990,
        formattedValue: "₹67990.00",
        formattedValueNoDecimal: "₹67990",
        priceType: "BUY",
        value: 67990
      },
      noCostEMIConvCharge: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 0,
        formattedValue: "₹0.00",
        formattedValueNoDecimal: "₹0",
        priceType: "BUY",
        value: 10
      },
      noCostEMIDiscountValue: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 1098.1,
        formattedValue: "₹1098.10",
        formattedValueNoDecimal: "₹1098",
        priceType: "BUY",
        value: 1098.1
      },
      noCostEMIInterestValue: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 1098.1,
        formattedValue: "₹1098.10",
        formattedValueNoDecimal: "₹1098",
        priceType: "BUY",
        value: 1098.1
      },
      noCostEMIOrderValue: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 39500,
        formattedValue: "₹39500.00",
        formattedValueNoDecimal: "₹39500",
        priceType: "BUY",
        value: 39500
      },
      noCostEMIPerMonthPayable: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 13166.666666666666,
        formattedValue: "₹13166.67",
        formattedValueNoDecimal: "₹13166",
        priceType: "BUY",
        value: 13166.666666666666
      },
      noCostEMITotalPayable: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 39500,
        formattedValue: "₹39500.00",
        formattedValueNoDecimal: "₹39500",
        priceType: "BUY",
        value: 39500
      },
      paybleAmount: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 38401.9,
        formattedValue: "₹38401.90",
        formattedValueNoDecimal: "₹38401",
        priceType: "BUY",
        value: 38401.9
      },
      shippingCharge: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 0,
        formattedValue: "₹0.00",
        formattedValueNoDecimal: "₹0",
        priceType: "BUY",
        value: 0
      },
      totalDiscountAmount: {
        currencyIso: "INR",
        currencySymbol: "₹",
        doubleValue: 28490,
        formattedValue: "₹28490.00",
        formattedValueNoDecimal: "₹28490",
        priceType: "BUY",
        value: 28490
      }
    },
    cliqCashApplied: false,
    cliqCashBalance: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 4951,
      formattedValue: "₹4951.00",
      formattedValueNoDecimal: "₹4951",
      priceType: "BUY",
      value: 4951
    },
    cliqCashPaidAmount: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 0,
      formattedValue: "₹0.00",
      formattedValueNoDecimal: "₹0",
      priceType: "BUY",
      value: 0
    },
    couponDiscount: "0",
    deliveryCharges: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 0,
      formattedValue: "₹0.00",
      formattedValueNoDecimal: "₹0",
      priceType: "BUY",
      value: 0
    },
    isBankPromotionApplied: false,
    isRemainingAmount: true,
    otherDiscount: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 1098.1,
      formattedValue: "₹1098.10",
      formattedValueNoDecimal: "₹1098",
      priceType: "BUY",
      value: 1098.1
    },
    subTotalPrice: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 39500,
      formattedValue: "₹39500.00",
      formattedValueNoDecimal: "₹39500",
      priceType: "BUY",
      value: 39500
    },
    totalPrice: {
      currencyIso: "INR",
      currencySymbol: "₹",
      doubleValue: 38401.9,
      formattedValue: "₹38401.90",
      formattedValueNoDecimal: "₹38401",
      priceType: "BUY",
      value: 38401.9
    }
  },
  isNoCostEmiProceeded: false,
  cardDetails: {
    is_emi: true,
    emi_bank: "AXISDC",
    emi_tenure: "3",
    selectedMonth: 0,
    selectedCouponCode: "AXISDCNCE3",
    selectedBankName: "AXIS DC BANK"
  },
  emiBinValidationErrorMessage: null,
  isRetryPaymentFromURL: false,
  retryPaymentDetails: null,
  isDebitCard: true,
  emiEligibiltyDetails: {
    type: "dcemiEligibilityDTO",
    status: "Success",
    DCEMIEligibleMessage:
      "Please enter the card details registered with +91 7754556878",
    isDCEMIEligible: true
  }
};
