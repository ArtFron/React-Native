import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { HomePage } from './HomePage';
import { FullPost } from './FullPost';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomePage}
          options={{ title: 'Новости' }}
        />
        <Stack.Screen
          name="FullPost"
          component={FullPost}
          options={{ title: 'Статья' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
