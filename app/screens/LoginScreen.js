import React, { useContext, useEffect } from "react";
import { StyleSheet, Image } from "react-native";
import * as Yup from "yup";
import { firebase } from "../config/firebase";
import Screen from "../components/Screen";
import { Form, FormField, SubmitButton } from "../components/forms";
import AuthContext from "../context/AuthContext";

const validationSchema = Yup.object().shape({
  email: Yup.string().required().email().label("Email"),
  password: Yup.string().required().min(6).label("Password"),
});

function LoginScreen(props) {
  const auth = firebase.auth();
  const authContext = useContext(AuthContext);
  const signIn = (values) => {
    auth
      .signInWithEmailAndPassword(values.email, values.password)
      .then((authUser) => {
        console.log("user login data: ", authUser.user._delegate.uid);
        authContext.setUser(authUser?.user._delegate.uid);
      })
      .catch((Error) => {
        alert(Error.message);
      });
  };

  console.log("ksdfkjdskjfks: ", authContext.user);

  return (
    <Screen style={styles.container}>
      <Image style={styles.logo} source={require("../assets/logo-red.png")} />

      <Form
        initialValues={{ email: "", password: "" }}
        onSubmit={(values) => signIn(values)}
        validationSchema={validationSchema}
      >
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
        <SubmitButton title="Login" />
      </Form>
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  logo: {
    width: 80,
    height: 80,
    alignSelf: "center",
    marginTop: 50,
    marginBottom: 20,
  },
});

export default LoginScreen;
