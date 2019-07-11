import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { InAppBrowser, InAppBrowserEvent } from '@ionic-native/in-app-browser';

import { ConfigProvider } from './config';
import { HTTP } from '@ionic-native/http';
import { HttpClient } from '@angular/common/http';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = HomePage;
  pages: Array<{ title: string, component: any }>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public iab: InAppBrowser,
    public _config: ConfigProvider,
    private http: HTTP
  ) {
    this.initializeApp();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];
    platform.ready().then(() => {
      console.log('Wait...');

      this.login();
    });


  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

/*   openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  } */

  login() {
    //this.splashScreen.show();

    const url = this._config.AuthURL
      + this._config.clientId +
      `&response_type=code&redirect_uri=`
      + encodeURI(this._config.redirectUri) //here encoding redirect url using default function
    console.log('URL: ', url);

    const browser = this.iab.create(url, '_blank', {
      location: 'no',
      zoom: 'no',
      hardwareback: 'no',
      clearcache: 'yes'
    });

    browser.on("loadstart").subscribe((event) => {
      console.log('loadStart 1');
      console.log('Event: ', event);

      var log1 = event.url;
      var log2 = event.url.split("username=")
      console.log('LOG1: ', log1);
      console.log('LOG2 ', log2[1]);

      this.splashScreen.show();
    });

    browser.on("loadstop").subscribe((event) => {
      console.log('loadStop');

      this.splashScreen.hide();
      browser.show();
    });

    browser.on("loaderror").subscribe((event) => {
      console.log('loadError');

      //here we have split our requiring part one.
      var result = event.url.split("code=");
        console.log("Authentication result", result);
      //here we have split our requiring part two.
      window["AuthResult"] = result[1].split('&')[0];
      // Authentication Code stored in local for future purpose.
      // It means get access token and refresh token for sharepoint.
        console.log('Value: ', window["AuthResult"]);

      localStorage.setItem('AuthCode', window["AuthResult"]);
      browser.close();
    });


    browser.on("exit").subscribe(
      (event) => {
        //Below line for checking if closing event
        if (event) {
          if (event.type.toLowerCase() == 'exit') {
            if (localStorage.getItem("AuthCode") && localStorage.getItem("AuthCode") == 'cancel') {
              this.platform.exitApp();  //This line is used for close a app. In case not loggedin.
              event.preventDefault();
              return true;
            }
          }
        }
        this.getAccessToken();
      },
      (err) => {
        console.log("InAppBrowser Loadstop Event Error: " + err);
      }
    );
  }

  getAccessToken() {

    let body = {
      'client_id':this._config.clientId,
      'client_secret=':this._config.clientSecret,
      'client_secret':this._config.clientSecret,
      'scope':'offline_access+openid+profile+User.Read',
      'grant_type': 'authorization_code',
      'code':localStorage.getItem("AuthCode"),
      'redirect_uri':this._config.redirectUri
    }

    this.getTokens(body);
  }

  getTokens(body) {

    let headers = {

        'Content-Type': 'application/x-www-form-urlencoded'

    };

    this.http.post(this._config.AccessTokenURL, body, headers)

    .then((result:any) => {

        if(result){

            console.log("Response",JSON.parse(result.data));

            //here set token value as internal storage future purpose.

            localStorage.setItem("token",JSON.parse(result.data).access_token);

            //here set refresh token value as internal storage future purpose.

            localStorage.setItem("refereshToken",JSON.parse(result.data).refresh_token);

        }

    })

    .catch((error) => {
        console.log("Error en el resultado");
        console.log(error);

    });

  }
}
