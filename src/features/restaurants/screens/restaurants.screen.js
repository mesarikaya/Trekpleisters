import React, { useContext, useState } from "react";
import {
  SafeAreaView,
  StatusBar,
  FlatList,
  Pressable as TouchableOpacity,
} from "react-native";
import { ActivityIndicator } from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import styled from "styled-components";
import { FadeInView } from "../../../components/animations/fade.animations";
import { FavouritesBar } from "../../../components/favourites/favourites-bar.component";
import { Spacer } from "../../../components/spacer/spacer.component";
import { Text } from "../../../components/typography/text.component";
import { FavouritesContext } from "../../../services/favorites/favorites.context";
import { LocationContext } from "../../../services/location/location.context";
import { RestaurantsContext } from "../../../services/restaurants/restaurant.context";
import { RestaurantInfoCard } from "../components/restaurant-info-card.component";
import { Search } from "../components/search.component";

const SafeArea = styled(SafeAreaView)`
  flex: 1;
  ${StatusBar.currentHeight && `margin-top: ${StatusBar.currentHeight}px`};
`;

const RestaurantList = styled(FlatList).attrs({
  contentContainerStyle: {
    padding: 16,
  },
})``;

const Loading = styled(ActivityIndicator)`
  margin-left: -25px;
`;

const LoadingContainer = styled.View`
  position: absolute;
  top: 50%;
  left: 50%;
`;

export const RestaurantsScreen = ({ navigation }) => {
  const { error: locationError } = useContext(LocationContext);
  const { isLoading, restaurants, error } = useContext(RestaurantsContext);
  const [isToggled, setIsToggled] = useState(false);
  const { favourites } = useContext(FavouritesContext);
  const hasError = !!error || !!locationError;

  return (
    <>
      <SafeArea>
        {isLoading && (
          <LoadingContainer>
            <Loading size={50} animating={true} color={Colors.blue300} />
          </LoadingContainer>
        )}
        <Search
          isFavouritesToggled={isToggled}
          onFavouritesToggle={() => setIsToggled(!isToggled)}
        />
        {isToggled && (
          <FavouritesBar
            favourites={favourites}
            onNavigate={navigation.navigate}
          />
        )}
        {hasError && (
          <Spacer position="left" size="large">
            <Text variant="error">
              Something went wrong retrieving the data
            </Text>
          </Spacer>
        )}
        {!hasError && (
          <RestaurantList
            data={restaurants}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate("RestaurantDetail", {
                      restaurant: item,
                    })
                  }
                >
                  <Spacer position="bottom" size="large">
                    <FadeInView>
                      <RestaurantInfoCard restaurant={item} />
                    </FadeInView>
                  </Spacer>
                </TouchableOpacity>
              );
            }}
            keyExtractor={(item) => item.name}
          />
        )}
      </SafeArea>
    </>
  );
};
