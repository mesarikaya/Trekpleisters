import camelize from "camelize";
import { host, isMock } from "../../utils/env";

export const restaurantsRequest = (location = "37.7749295,-122.4194155") => {
  console.log("Fetch places request: ", location);
  return fetch(`${host}/placesNearby?location=${location}&mock=${isMock}`, {
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => {
      console.log(e);
    });
};

export const restaurantsTransform = ({ results = [] }) => {
  const mappedResults = results.map((restaurant) => {
    return {
      ...restaurant,
      address: restaurant.vicinity,
      isOpenNow: restaurant.opening_hours && restaurant.opening_hours.open_now,
      isClosedTemporarily: restaurant.business_status === "CLOSED_TEMPORARILY",
    };
  });

  return camelize(mappedResults);
};

restaurantsRequest()
  .then((result) => {
    //console.log(result);
  })
  .catch((err) => {
    console.log(err);
  });
