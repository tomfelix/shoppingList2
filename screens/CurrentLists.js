import React from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import { Icon, ListItem, Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { deleteList, archiveList } from '../actions/index';


class CurrentLists extends React.Component {

  static navigationOptions = {
    title: 'Active Lists',
    headerStyle: {
      backgroundColor: '#2372fc',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };


  render() {
    const currentLists = this.props.lists.filter(list => {
      return list.archived === false;
    });

    const sortedCurrentLists = currentLists.sort(function(a,b){
      return b.date - a.date;
    });


    return (
      <View style={styles.container}>
      <Divider style={styles.divider} />
        {
        sortedCurrentLists.map(list => (
          <ListItem
            key={list.id}
            title={list.name}
            containerStyle={styles.listItem}
            rightIcon={
              <Icon
                name='keyboard-arrow-right'
                size={30}
              />
            }
            badge={{ value: list.items.length, textStyle: styles.badgeTextStyle, containerStyle: styles.badgeContainerStyle }}
            onPress={() => this.props.navigation.navigate('list', { id: list.id, name: list.name })}
            onLongPress={() => {
              Alert.alert(
                'List options',
                'What do you want to do?',
                [
                  {text: 'Archive this list', onPress: () => this.props.archiveList(list.id)},
                  {text: 'Delete this list', onPress: () => this.props.deleteList(list.id)},
                  {text: 'Cancel', style: 'cancel'}
                ],
                { cancelable: true }
              )
            }
            }
          />
        ))
        }
        <View style={styles.newListButton}>
          <Icon
            name='playlist-add'
            reverseColor='white'
            backgroundColor='blue'
            size={30}
            onPress={() => this.props.navigation.navigate('newList')}
            reverse
            raised
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#6da5ff'
  },
  divider: {
    backgroundColor: 'white',
    height: 1
  },
  listItem: {
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderBottomColor: 'black'
  },
  badgeTextStyle: {
    color: 'black'
  },
  badgeContainerStyle: {
    backgroundColor: '#6da5ff'
  },
  newListButton: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  }
});

const mapStateToProps = state => {
  return {
    lists: state.lists
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteList, archiveList }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrentLists);
