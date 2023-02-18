import { useState, useMemo } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import UserContext from "./config/context/user";
import UserProfile from "./views/user";

export default function App() {
  const [user, setUser] = useState({
    status: "no-session",
    data: {},
  });

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <View style={styles.container}>
        <UserProfile />
      </View>
    </UserContext.Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
