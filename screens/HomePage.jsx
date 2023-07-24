import {
  StatusBar,
  Alert,
  Text,
  FlatList,
  View,
  ActivityIndicator,
  RefreshControl,
  TouchableOpacity,
} from 'react-native';
import { Post } from '../components/Post';
import { Loading } from '../components/Loading';
import axios from 'axios';
import React from 'react';

export const HomePage = ({ navigation }) => {
  const [isLoading, setIsLoading] = React.useState(true);

  const [items, setItem] = React.useState([]);

  const fetchPosts = () => {
    setIsLoading(true);
    axios
      .get('https://64be01932320b36433c7f5cd.mockapi.io/Post')
      .then(({ data }) => {
        setItem(data);
      })
      .catch((error) => {
        Alert.alert('Warning!!!', error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  React.useEffect(fetchPosts, []);
  if (isLoading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" />
        <Text style={{ marginTop: 15 }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View>
      <FlatList
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={fetchPosts} />
        }
        data={items}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('FullPost', {
                id: item.id,
                title: item.title,
              })
            }>
            <Post
              title={item.title}
              imageUrl={item.imageUrl}
              createdAt={item.createdAt}
            />
          </TouchableOpacity>
        )}
      />
      <StatusBar theme="auto" />
    </View>
  );
};
