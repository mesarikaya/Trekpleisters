import React from "react";
import { CardField, useStripe } from "@stripe/stripe-react-native";
import { cardTokenRequest } from "../../../services/checkout/checkout.service";

export const CreditCardInput = ({ name, onSuccess, onError }) => {
  const { confirmPayment } = useStripe();

  const onChange = async (cardDetails) => {
    console.log("cardDetails", cardDetails);
    const { values, complete } = cardDetails;
    const isComplete = complete || complete === "true";
    const card = {
      number: cardDetails.number,
      exp_month: cardDetails.expiryMonth,
      exp_year: cardDetails.expiryYear,
      cvc: cardDetails.cvc,
      name: name,
    };

    console.log("isComplete:", complete, complete === true);
    if (isComplete) {
      try {
        const info = await cardTokenRequest(card);
        onSuccess(info);
      } catch (e) {
        onError();
      }
    }
  };

  return (
    <CardField
      dangerouslyGetFullCardDetails={true}
      postalCodeEnabled={true}
      placeholders={{
        number: "4242 4242 4242 4242",
      }}
      cardStyle={{
        backgroundColor: "#FFFFFF",
        textColor: "#000000",
      }}
      style={{
        width: "100%",
        height: 50,
        marginVertical: 10,
      }}
      onCardChange={(cardDetails) => {
        onChange(cardDetails);
      }}
      onFocus={(focusedField) => {
        console.log("focusField", focusedField);
      }}
    />
  );
};
