import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AuthContext from "./app/context/AuthContext";
import navigationTheme from "./app/navigation/navigationTheme";
import AppNavigator from "./app/navigation/AppNavigator";
import AuthNavigator from "./app/navigation/AuthNavigator";
import { getUser } from "./app/context/storage";
export default function App() {
  const [user, setUser] = useState();

  const restoreToken = async () => {
    try {
      const token = await getUser();
      if (!token) return;
      setUser(token);
    } catch (e) {
      console.log("error");
    }
  };
  useEffect(() => {
    restoreToken();
    console.log("userrrrrr: ", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      <NavigationContainer theme={navigationTheme}>
        {user ? <AppNavigator /> : <AuthNavigator />}
      </NavigationContainer>
    </AuthContext.Provider>
  );
}
