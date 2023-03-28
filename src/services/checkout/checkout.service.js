import createStripe from "stripe-client";
import { host } from "../../utils/env";

const stripe = createStripe(
  "pk_test_51Mj3BcChBCorYcX9kgNIWwVBfQDDRBzuNxp0BG5z8i4w69fzKTWOxOr4scU05vrgJtRBuQhkx0jqiDQN8Pm1HmWW00Wureq062"
);

export const cardTokenRequest = (card) => stripe.createToken({ card });

export const payRequest = (token, amount) => {
  console.log("host is:", host);
  return fetch(`${host}/pay`, {
    body: JSON.stringify({
      token,
      amount,
    }),
    method: "POST",
  }).then((res) => {
    if (res.status > 200) {
      return Promise.reject("something went wrong processing your payment");
    }
    return res.json();
  });
};
