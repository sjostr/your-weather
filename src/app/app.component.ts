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
    setTimeout(cityNameListArray =>  JSON.parse(localStorage.getItem("cityNameListArray")) );
    this.localCitySearchName = localStorage.getItem("citySearchName");
    //this.cityFav = localStorage.getItem("cityFavorite");

    // display the first fav city in the list....
    if(this.cityNameListArray.length > 0) {
      console.log("there is something in the array");
      this.getWeatherData(this.cityNameListArray[0]);
    }
    
    
  }
  constructor(private http: Http) {}
    cityIsFavorite = false;
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
    
    title = 'Your Weather';
  
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

        if(this.cityNameListArray.indexOf(this.cityNameActual) != -1){
          this.cityIsFavorite = true;
        } else {
          this.cityIsFavorite = false;
        }

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
