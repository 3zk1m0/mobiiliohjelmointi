import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { TextInput, Button,  } from 'react-native-paper';

interface calcStates {
  weight: string,
  height: string,
  value: string
}

export default class MyComponent extends Component<{},calcStates> {
  constructor(props){
    super(props);
    this.state = {
      weight: '',
      height: '',
      value: ''
    };
    this.calculate = this.calculate.bind(this);
  }

  calculate() {

    let weight = parseFloat(this.state.weight.replace(',', '.'));
    let height = parseFloat(this.state.height.replace(',', '.'));
    let value = (weight / (height**2)).toFixed(1);
    this.setState({value});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text
            style={{
              justifyContent: "center",
              alignSelf: "center",
              marginTop: 40,
              marginBottom: 20,
              fontSize: 50
            }}>
            BMI Calculator
        </Text>
        <TextInput
          style={styles.input}
          label='Weight'
          placeholder="kg"
          value={this.state.weight}
          keyboardType='numeric'
          onChangeText={weight => this.setState({ weight })}
        />
        <TextInput
          style={styles.input}
          label='Height'
          placeholder="m"
          value={this.state.height}
          keyboardType='numeric'
          onChangeText={height => this.setState({ height })}
        />
        <Button 
          style={styles.button}
          mode="contained"
          onPress={this.calculate}>
          <Text style={styles.buttonText}>
            calculate
          </Text>
        </Button>
        <Text style={styles.result}>
            {this.state.value}
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  input: {
    alignSelf: "center",
    height: 80,
    textAlign: "center",
    width: "80%",
    fontSize: 40,
    marginTop: 30,
    color: "#FFCB1F"
  },
  button: {
    marginTop: 50,
    width: "80%",
    alignSelf: "center",
    textAlign: "center",
    fontSize: 70,
  },
  buttonText: {
    alignSelf: "center",
    padding: 30,
    fontSize: 40,
  },
  result: {
    marginTop: 30,
    alignSelf: "center",
    fontSize: 65,
    padding: 15
  }
});