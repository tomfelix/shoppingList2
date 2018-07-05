import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createBottomTabNavigator, createStackNavigator } from 'react-navigation';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/lib/integration/react';

import List from './screens/List';
import NewList from './screens/NewList';
import NewItem from './screens/NewItem';
import rootReducer from './reducers/index';
import Loading from './components/Loading';
import CurrentLists from './screens/CurrentLists';
import ArchivedLists from './screens/ArchivedLists';
import { store, persistor } from './index';


export default class App extends React.Component {
  render() {
    const CurrentStack = createStackNavigator({
    active: CurrentLists,
    list: List,
    newList: NewList,
    newItem: NewItem
    });

    const ArchivedStack = createStackNavigator({
    archived: ArchivedLists,
    list: List,
    });

    const MainNavigator = createBottomTabNavigator({
      active: CurrentStack,
      archived: ArchivedStack,
    },
    {
      navigationOptions: ({ navigation }) => ({
        tabBarIcon: ({ focused, tintColor }) => {
          const { routeName } = navigation.state;
          let iconName;
          if (routeName === 'active') {
            iconName = `ios-albums${focused ? '' : '-outline'}`;
          } else if (routeName === 'archived') {
            iconName = `ios-archive${focused ? '' : '-outline'}`;
          }
          return <Ionicons name={iconName} size={30} color={tintColor} />;
        },
      }),
      tabBarOptions: {
        activeTintColor: 'blue',
        inactiveTintColor: 'gray',
      },
      headerStyle: {
        backgroundColor: '#f4511e',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      }
    });

    return (
      <Provider store={store}>
        <PersistGate loading={<Loading />} persistor={persistor}>
          <MainNavigator />
        </PersistGate>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'grey'
  },
});
