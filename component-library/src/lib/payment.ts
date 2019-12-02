// export const edmitPlusOneTimeProductId = '4D931A78-ABA8-4F6C-B80F-09EA995C0AD6';
export const edmitPlusMonthlySubscriptionProductId = 'a4a22baa-eef1-4b4f-9b75-e5facf57ee79';
export const EDMIT_PLUS_ANNUAL_PRODUCT_ID = '24465F4D-D87B-494C-B5CB-64100B01BCA6';
export const EDMIT_PLUS_MONTHLY_PRODUCT_ID = 'a37c27d7-f86e-42a0-b951-39dde214ab96';

export const edmitPremiumSubscriptionProductId = '4b232478-8e70-4239-af1f-c734754f2bc0';

export const BCFU_PRODUCT_ID = '36107755-aeb2-4177-b04f-c1603e4fd33e'

export const AAACU_PRODUCT_ID = 'b7f51292-32be-45df-8be7-fc6bd0007dc4'

export const EDMIT_PLUS_DCU_PRODUCT_ID = '6302f6cf-0d0a-4f83-a278-e1a7dce6cee9'

export enum EPurchaseProduct {
  PLUS_ANNUAL = 'Edmit Plus (Annual)',
  PLUS_MONTHLY = 'Edmit Plus (Monthly)',
  PREMIUM = 'Edmit Premium'
  // NOW = 'Edmit Now'
}

export function nameOfProduct(product: EPurchaseProduct): string {
  switch (product) {
    case EPurchaseProduct.PLUS_ANNUAL:
    case EPurchaseProduct.PLUS_MONTHLY:
      return 'Edmit Plus';
    case EPurchaseProduct.PREMIUM:
      return 'Edmit Premium';
  }
}
