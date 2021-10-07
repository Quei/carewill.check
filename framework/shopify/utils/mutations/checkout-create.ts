import { checkoutDetailsFragment } from '../queries/get-checkout-query';

const checkoutCreateMutation = /* GraphQL */ `
  mutation checkoutCreate($input: CheckoutCreateInput = {}) {
    checkoutCreate(input: $input) {
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
export default checkoutCreateMutation;
