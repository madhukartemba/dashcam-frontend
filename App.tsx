import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MainApp from './components/MainApp';
import Settings from './components/Settings/Setttings';



export type RootStackParamList = {
  MainApp: undefined,
  Settings: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {


  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='MainApp' >
        <Stack.Screen options={{ headerShown: false }} name='MainApp' component={MainApp} />
        <Stack.Screen options={{
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTintColor: 'white'
        }} name='Settings' component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
