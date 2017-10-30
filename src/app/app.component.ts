import { Component, AfterViewInit } from '@angular/core';
import { Http, Response } from '@angular/http';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-weather',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit{
  ngAfterViewInit() {
    //setTimeout(_=> this.getLocalData("citySearchList"));
    //setTimeout(localCitySearchList =>  JSON.parse(localStorage.getItem("citySearchList")) );

    //let cityNameListArray = JSON.parse(localStorage.getItem("cityNameListArray"));
    let cityNameListArray = this.getCityArrayLocalStorage("cityNameListArray");

    this.cityIsFavorite = true;

    console.log("citynamelistarray: " + cityNameListArray[0]);
    //this.localCitySearchName = localStorage.getItem("citySearchName");

    //this.cityFav = localStorage.getItem("cityFavorite");
    //console.log(this.cityNameListArray);

    console.log("cityIsFavorite: "+this.cityIsFavorite);

    // display the first fav city in the list....
    if(cityNameListArray.length > 0) {
      this.getWeatherData(cityNameListArray[0]);
      //this.updateFavoriteList();
      //this.favoriteCityToggle();
      

      console.log("cityIsFavorite: "+this.cityIsFavorite);


    }
    
    
  }

// page loads
//  if a favorites array exists
//     load the first item from array
//        highlight the favorites icon
//        search for the weather for that item(city)
//  else display only search

// functions needed for this to work....

// get local storage
// highlight favorites icon

getCityArrayLocalStorage(ls_key) {  
  return JSON.parse(localStorage.getItem(ls_key));
}





  constructor(private http: Http) {}
    cityIsFavorite = true;
    wasClicked = false;
    cityFav = "";
    localCitySearchName = "";
    cityName = "";
    cityNameActual = '';
    cityTemperature = 0;
    cityTemperatureMin = 0;
    cityTemperatureMax = 0;
    cityWeatherDescription = '';
    cityWeatherWindSpeed = 0;  
    showTemperature = false;
    cityNameListArray = [ ] as Array<any>;
    storedCityData = {};
    backgroundGradient = "";
    displayList = false;
    
    title = 'Your Weather';

  favoriteCityToggle() { 
    if(this.cityNameListArray.indexOf(this.cityNameActual) != -1){
      this.cityIsFavorite = true;
    } else {
      this.cityIsFavorite = false;
    }
  } 

  getWeatherData(cityName) {
    this.http.get('http://api.openweathermap.org/data/2.5/weather?APPID=' + environment.appID + '&units=imperial&q=' + cityName )
    .subscribe (
      (res: Response) => {
        const weatherCity = res.json();
        console.log(weatherCity);
              
        this.cityNameActual = weatherCity.name;
        this.cityTemperature = Math.round(parseInt(weatherCity.main.temp));
        this.cityTemperatureMin = Math.round(parseInt(weatherCity.main.temp_min));
        this.cityTemperatureMax = Math.round(parseInt(weatherCity.main.temp_max));        
        this.cityWeatherDescription = weatherCity.weather[0].description;
        this.cityWeatherWindSpeed =  Math.round(parseInt(weatherCity.wind.speed));
        //this.storeLocalData();

        this.favoriteCityToggle();
        // dynamic gradient backgorund based on temperature
        if ( this.cityTemperature >= 95 ){
          this.backgroundGradient = "linear-gradient(160deg, #000000 0%,red 100%)";
        } else if ( this.cityTemperature < 95 && this.cityTemperature >= 80 ){
          this.backgroundGradient = "linear-gradient(160deg, red 0%,orange 100%)";
        } else if ( this.cityTemperature < 80 && this.cityTemperature >= 60 ){
          this.backgroundGradient = "linear-gradient(160deg, orange 0%,yellow 100%)";
        } else if ( this.cityTemperature < 60 && this.cityTemperature >= 40 ){
          this.backgroundGradient = "linear-gradient(160deg, yellow 0%,green 100%)";
        } else if ( this.cityTemperature < 40 && this.cityTemperature >= 20 ){
          this.backgroundGradient = "linear-gradient(160deg, green 0%,blue 100%)";
        } else if ( this.cityTemperature < 20 && this.cityTemperature >= 0 ){
          this.backgroundGradient = "linear-gradient(160deg, blue 0%,blueviolet 100%)";
        } else if ( this.cityTemperature < 0 ){
          this.backgroundGradient = "linear-gradient(160deg, blueviolet 0%,rebeccapurple 100%)";
        }
      }
    )
  }
  
  // click the icon, add OR remove from favorites list
  updateFavoriteList(){

    // hide or show the list if there is anything to display
    if (this.cityNameListArray.length > 0)
        this.displayList = true;
    else {
      this.displayList = false;
    }

    if(this.cityNameListArray.indexOf(this.cityNameActual) != -1){
      // city is not a favorite, hide icon
      this.cityIsFavorite = false;
      //  remove city from list
      this.cityNameListArray.splice(this.cityNameListArray.indexOf(this.cityNameActual), 1);

      // update the local storage item
      localStorage.setItem("cityNameListArray",  JSON.stringify(this.cityNameListArray));
    } else {
      // city is a fav, show icon
      this.cityIsFavorite = true;
      // add item to array
      this.cityNameListArray.push(this.cityNameActual);

      // update the local storage item
      localStorage.setItem("cityNameListArray",  JSON.stringify(this.cityNameListArray));
    }    
  }

  /*
  setFavoriteCity() {
    // if current city equals localstorage cityfavorite
    if (localStorage.getItem("cityFavorite") == this.cityNameActual) {
      this.cityIsFavorite = false;
      localStorage.removeItem("cityFavorite");
    } else {

      this.cityIsFavorite = true;
      localStorage.setItem("cityFavorite", this.cityNameActual);
      //localStorage.setItem("cityFavoriteList", JSON.stringify(this.cityNameListArray));
      //this.cityNameListArray.push(this.cityNameActual);

    }
  }
  */

  /*
  storeLocalData() {
   	let newDate = new Date().toLocaleString('en-US',  { hour12: true,
														year: "numeric", 
														month: "2-digit", 
														day: "2-digit",
                            hour: "numeric", 
                            minute: "numeric"});
    let citySearchObj = {
      citySearchName: this.cityNameActual,
      latestTemp: this.cityTemperature,
      favorite: "no",
      dateTime: newDate
    }
   localStorage.setItem('citySearchName', this.cityNameActual);
  }
  */
    
}
