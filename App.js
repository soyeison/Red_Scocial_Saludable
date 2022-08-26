import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Text } from "react-native";
import { StackLogin } from "./src/Navigator/StackLogin";

function App() {
  return (
    <NavigationContainer>
      <StackLogin />
    </NavigationContainer>
  );
}

export default App;
