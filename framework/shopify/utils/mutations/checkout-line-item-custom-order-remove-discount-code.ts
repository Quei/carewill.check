import { checkoutDetailsFragment } from '../queries/get-checkout-query';

const checkoutLineItemCustomOrderRemoveDiscountCodeMutation = /* GraphQL */ `
  mutation checkoutLineItemCustomOrderRemoveDiscountCode($checkoutId: ID!) {
    checkoutDiscountCodeRemove(checkoutId: $checkoutId) {
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
export default checkoutLineItemCustomOrderRemoveDiscountCodeMutation;
