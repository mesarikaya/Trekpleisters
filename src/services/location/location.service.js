import camelize from "camelize";
import { host, isMock } from "../../utils/env";

export const locationRequest = (searchTerm) => {
  console.log("Fetch request: ", searchTerm);
  return fetch(`${host}/geocode?city=${searchTerm}&mock=${isMock}`, {
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

export const locationTransform = (result) => {
  console.log(result);
  const formattedResponse = camelize(result.results);
  const { geometry = {} } = formattedResponse[0];
  const { lat, lng } = geometry.location;

  return { lat, lng, viewport: geometry.viewport };
};
