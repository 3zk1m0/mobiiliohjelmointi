import React, { Component } from 'react';
import { Text, TextInput, View, Button, Alert } from 'react-native';



interface PersonProps {
  firstname: string;
  lastname: string;
  age: string;
}

class Person extends Component<PersonProps> {
  render() {
    if (this.props.firstname == '' || this.props.lastname == '' || this.props.age == '') {
      return null;
    }
    return(
    <View style={{alignItems: 'center'}}>
      <Text>Firstname: {this.props.firstname}</Text>
      <Text>Lastname: {this.props.lastname}</Text>
      <Text>Age: {this.props.age}</Text>
    </View>
    )
  }
}


interface PersonTestState {
  firstname: string;
  lastname: string;
  age: string;
}


export default class Persontest extends Component<{},PersonTestState> {
  constructor(props) {
    super(props);
    this.state = {
      firstname: '',
      lastname: '',
      age: '',
  };
  }

  render() {
    return (
      <View style={{flex: 1, justifyContent: 'center', padding: 20}}>
        <Text style={{paddingBottom: 10, fontSize: 20}}>
          Type your data
        </Text>
        <TextInput
          style={{height: 80}}
          placeholder="Firstname"
          onChangeText={(firstname) => this.setState({firstname})}
          value={this.state.firstname}
        />
        <TextInput
          style={{height: 80}}
          placeholder="Lastname"
          onChangeText={(lastname) => this.setState({lastname})}
          value={this.state.lastname}
        />
        <TextInput
          style={{height: 80}}
          placeholder="Age"
          onChangeText={(age) => this.setState({age})}
          value={this.state.age}
        />
        <Person firstname={this.state.firstname} lastname={this.state.lastname} age={this.state.age}/>
      </View>
    );
  }
}
