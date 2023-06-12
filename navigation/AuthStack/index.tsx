import { createStackNavigator } from "@react-navigation/stack";
import { Login, OTP, LoginSuccess } from "../../screens";

const Stack = createStackNavigator();

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="LoginSuccess" component={LoginSuccess} />
    </Stack.Navigator>
  );
}
