import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import { firebase } from "../config/firebase";
import Card from "../components/Card";
import colors from "../config/colors";
import routes from "../navigation/routes";
import Screen from "../components/Screen";
import Text from "../components/Text";
import AppButton from "../components/Button";
function ListingsScreen({ navigation }) {
  const dataRef = firebase.firestore().collection("listing");
  const [listings, setListing] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const getData = () => {
    dataRef.onSnapshot((querySnapshot) => {
      const data = [];

      querySnapshot.forEach((doc) => {
        const { images, price, title } = doc.data();
        data.push({
          id: doc.id,
          images,
          price,
          title,
        });
      });

      setListing(data);
      setLoading(false);
      if (!listings) setError(true);
    });
  };
  console.log(error);
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  console.log("muzilhassan");
  return (
    <Screen style={styles.screen}>
      {error && (
        <>
          <Text>Couldnt retrive data from the server please try again</Text>
          <AppButton title={"Retry"} />
        </>
      )}
      <ActivityIndicator
        animating={isLoading}
        size="large"
        color={"#fc5c65"}
        style={styles.container}
      />
      <FlatList
        data={listings}
        keyExtractor={(listing) => listing.id.toString()}
        renderItem={({ item }) => (
          <Card
            title={item.title}
            subTitle={"$" + item.price}
            image={item.images[0]}
            onPress={() => navigation.navigate(routes.LISTING_DETAILS, item)}
          />
        )}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  screen: {
    padding: 20,
    backgroundColor: colors.light,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ListingsScreen;
