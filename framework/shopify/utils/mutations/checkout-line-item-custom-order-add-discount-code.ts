import { checkoutDetailsFragment } from '../queries/get-checkout-query';

const checkoutLineItemCustomOrderAddDiscountCodeMutation = /* GraphQL */ `
  mutation checkoutLineItemCustomOrderAddDiscountCode(
    $checkoutId: ID!
    $discountCode: String!
  ) {
    checkoutDiscountCodeApplyV2(
      checkoutId: $checkoutId
      discountCode: $discountCode
    ) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...checkoutDetails
      }
    }
  }

  ${checkoutDetailsFragment}
`;
export default checkoutLineItemCustomOrderAddDiscountCodeMutation;
