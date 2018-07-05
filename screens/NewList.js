import React from 'react';
import { StyleSheet, View, Text, TextInput } from 'react-native';
import { connect } from 'react-redux';
import { Button, Input } from 'react-native-elements';
import { addList } from '../actions/index';
import { bindActionCreators } from 'redux';


class NewList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      text: 'New List'
    };
  }

  static navigationOptions = {
    title: 'Add new List',
    headerStyle: {
      backgroundColor: 'blue',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    }
  };

  handleClick = () => {
    this.props.addList(this.state.text);
    this.setState({
      text: 'New List'
    });
    this.props.navigation.navigate('active');
  }


  render() {
    return (
      <View style={styles.container}>
        <Input
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
          placeholder="Put list's name here"
          containerStyle={styles.inputStyle}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="Back"
            onPress={() => this.props.navigation.goBack()}
            buttonStyle={styles.backButton}
          />
          <Button
            title="Add List"
            disabled={!this.state.text}
            onPress={this.handleClick}
            buttonStyle={styles.addButton}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#72a8ff'
  },
  inputStyle: {
    backgroundColor: '#fff',
    borderRadius: 50,
    borderColor: 'red',
    marginBottom: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  backButton: {
    backgroundColor: "transparent",
    width: 100,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50
  },
  addButton: {
    backgroundColor: "#3ccc37",
    width: 100,
    height: 40,
    borderColor: "white",
    borderWidth: 1,
    borderRadius: 50
  }
});

const mapStateToProps = state => {
  return {
    lists: state.lists
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addList }, dispatch);
}


export default connect(mapStateToProps, mapDispatchToProps)(NewList);
