import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import * as Yup from "yup";
import { firebase } from "../config/firebase";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";

const validationSchema = Yup.object().shape({
  name: Yup.string().required().label("Name"),
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function RegisterScreen({ navigation }) {
  const auth = firebase.auth();
  const register = (email, password) => {
    auth
      .createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        console.log(authUser);
        navigation.navigate("Login");
      })
      .catch((Error) => {
        alert(Error.message);
      });
  };

  const adddata = (values) => {
    const dataRef = firebase.firestore().collection("user");

    let user = {
      name: values.name,
      email: values.email,
      password: values.password,
    };
    dataRef
      .add(user)
      .then((data) => {
        register(user.email, user.password);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Screen style={styles.container}>
      <Form
        initialValues={{ name: "", email: "", password: "" }}
        onSubmit={adddata}
        // onSubmit={(values) => register(values)}
        validationSchema={validationSchema}
      >
        <FormField
          autoCorrect={false}
          icon="account"
          name="name"
          placeholder="Name"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="email"
          keyboardType="email-address"
          name="email"
          placeholder="Email"
          textContentType="emailAddress"
        />
        <FormField
          autoCapitalize="none"
          autoCorrect={false}
          icon="lock"
          name="password"
          placeholder="Password"
          secureTextEntry
          textContentType="password"
        />
        <SubmitButton title="Register" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
});

export default RegisterScreen;
