import React from "react";
import {
StyleSheet,
View,
ActivityIndicator,
Image,
Text,
Dimensions,
Platform
} from "react-native";

import * as Location from 'expo-location';


interface appState {
  loading: boolean,
  error: boolean,
  place: string,
  weather: string,
  weatherIcon: string,
  temperature: string,
  weatherDesc: string,

}


export default class Source extends React.Component <{},appState> {


constructor(props) {
 super(props);
 this.state = {
   loading: true,
   error: false,
   place: '',
   weather: '',
   weatherIcon: '',
   temperature: '',
   weatherDesc: '',
  };
}

componentDidMount() {

  this._getLocationAsync();

}

_getLocationAsync = async () => {
  let { status } = await Location.requestPermissionsAsync();
  if (status !== 'granted') {
    this.setState({
      error: true,
    });
  }

  let location = await Location.getCurrentPositionAsync({});
  //console.log(location)
  this.fetchWeather(location.coords.latitude, location.coords.longitude);
};

fetchWeather(lat, lon) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=ab5ab999ca01f88dace52322a9d5cc3b`)
  .then(response => response.json())
  .then((responseJson)=> {
    //console.log(responseJson);
    this.setState({
     loading: false,
     place: responseJson.name,
     weather: responseJson.weather[0].main,
     weatherIcon: responseJson.weather[0].icon,
     temperature: responseJson.main.temp,
     weatherDesc: responseJson.weather[0].description,
    })
  })
  .catch(error=>console.log(error)) //to catch the errors if any
}



render(){
  if(this.state.error){
    return( 
      <View style={styles.loader}> 
        <ActivityIndicator size="large" color="#0c9"/>
      </View>
  )}

 if(this.state.loading){
  return( 
    <View style={styles.loader}> 
      <ActivityIndicator size="large" color="#0c9"/>
    </View>
)}
return(
  <View
      style={[
        styles.weatherContainer,
        { backgroundColor: "grey" }
      ]}
    >
      <View style={styles.headerContainer}>
        <Image 
          source={{ uri: "http://openweathermap.org/img/wn/" + this.state.weatherIcon + "@2x.png" }} 
          style={styles.icon} 
        />
        <Text style={styles.tempText}>{this.state.temperature}˚C</Text>
      </View>
      <View style={styles.subHeaderContainer}>
        <Text style={styles.subText}>{this.state.place}</Text>
      </View>
      <View style={styles.bodyContainer}>
        <Text style={styles.title}>{this.state.weather}</Text>
        <Text style={styles.subtitle}>
          {this.state.weatherDesc}
        </Text>
      </View>
    </View>
)}
}


const styles = StyleSheet.create({
  icon: { 
    width: Dimensions.get('window').width*0.4, 
    height: Dimensions.get('window').width*0.4
  },
  loader:{
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
   weatherContainer: {
    flex: 1
  },
  headerContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingLeft: 20,
    paddingTop: 40,
    paddingBottom: 0
  },
  subHeaderContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingLeft: 25,
    paddingTop: 0
  },
  tempText: {
    fontSize: 60,
    color: '#fff',
    paddingLeft: 10
  },
  subText: {
    fontSize: 28,
    color: '#fff'
  },
  bodyContainer: {
    flex: 2,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
    paddingLeft: 25,
    paddingRight: 10,
    marginBottom: 40
  },
  title: {
    fontSize: 60,
    color: '#fff'
  },
  subtitle: {
    fontSize: 24,
    color: '#fff'
  }
});