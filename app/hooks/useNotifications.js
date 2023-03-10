import { useEffect } from "react";
import { Notifications } from "expo";
import * as Permissions from "expo-permissions";

export default useNotifications = (notificationListener) => {
  useEffect(() => {
    registerForPushNotifications();

    if (notificationListener) Notifications.addListener(notificationListener);
  }, []);

  const registerForPushNotifications = async () => {
    try {
      const permission = await Permissions.askAsync(Permissions.NOTIFICATIONS);
      if (!permission.granted) return;

      const token = await Notifications.getExpoPushTokenAsync();
    } catch (error) {
      console.log("Error getting a push token", error);
    }
  };
};
