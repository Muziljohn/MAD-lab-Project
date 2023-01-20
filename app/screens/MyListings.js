import React from "react";
import Card from "../components/Card";
import firebase from "firebase/compat";
import AuthContext from "../context/AuthContext";
import { ActivityIndicator, ScrollView } from "react-native";
import { useState, useEffect } from "react";
const MyListings = (props) => {
  const dataRef = firebase.firestore().collection("listing");
  const [listings, setListing] = useState([]);
  const [isLoading, setLoading] = useState(false);

  const getData = () => {
    dataRef.onSnapshot((querySnapshot) => {
      const data = [];

      querySnapshot.forEach((doc) => {
        const { images, price, title, user } = doc.data();
        data.push({
          id: doc.id,
          images,
          price,
          title,
        });
      });

      setListing(data);
      setLoading(false);
    });
  };
  useEffect(() => {
    setLoading(true);
    getData();
  }, []);
  return (
    <ScrollView>
      <ActivityIndicator animating={isLoading} size="large" color={"#fc5c65"} />
      {listings.map((item) => {
        if (AuthContext.user == item.user) {
          return (
            <Card
              title={item.title}
              subTitle={"$" + item.price}
              image={item.images[0]}
            />
          );
        }
      })}
    </ScrollView>
  );
};

export default MyListings;
