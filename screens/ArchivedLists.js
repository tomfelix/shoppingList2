import React from 'react';
import { StyleSheet, View, Text, FlatList, Alert } from 'react-native';
import { connect } from 'react-redux';
import listsReducer from '../reducers/lists-reducer';
import { Icon, ListItem, Divider } from 'react-native-elements';
import { bindActionCreators } from 'redux';
import { deleteList } from '../actions/index';


class ArchivedLists extends React.Component {

  static navigationOptions = {
    title: 'Archived Lists',
    headerStyle: {
      backgroundColor: '#3a3a3a'
    },
    headerTintColor: 'white',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };


  render() {
    const archivedLists = this.props.lists.filter(list => {
      return list.archived === true;
    });

    const sortedArchivedLists = archivedLists.sort(function(a,b){
      return b.date - a.date;
    });

    return (
      <View style={styles.container}>
      <Divider style={styles.divider} />
      {
      sortedArchivedLists.map(list => (
        <ListItem
          key={list.id}
          title={list.name}
          containerStyle={styles.listItem}
          rightIcon={
            <Icon
              name='keyboard-arrow-right'
            />
          }
          badge={{ value: list.items.length, textStyle: styles.badgeTextStyle, containerStyle: styles.badgeContainerStyle }}
          onPress={() => this.props.navigation.navigate('list', { id: list.id, name: list.name })}
          onLongPress={() => {
            Alert.alert(
              'List options',
              'What do you want to do?',
              [
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
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:'#9e9e9e'
  },
  divider: {
    backgroundColor: 'black',
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
    backgroundColor: '#9e9e9e'
  },
});


const mapStateToProps = state => {
  return {
    lists: state.lists
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ deleteList }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(ArchivedLists);
