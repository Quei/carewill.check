import { checkoutDetailsFragment } from '../queries/get-checkout-query';

const checkoutLineItemAddMutation = /* GraphQL */ `
  mutation checkoutLineItemAdd(
    $checkoutId: ID!
    $lineItems: [CheckoutLineItemInput!]!
  ) {
    checkoutLineItemsAdd(checkoutId: $checkoutId, lineItems: $lineItems) {
      checkoutUserErrors {
        code
        field
        message
      }
      checkout {
        ...CheckoutDetails
      }
    }
  }

  ${checkoutDetailsFragment}
`;
export default checkoutLineItemAddMutation;
