import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {
    public clientId="d4b2de5f-7eab-43de-a61e-7afe1d7cf143";          //here you can paste your client id
    public redirectUri="https://localhost:44389/signin-microsoft";
    public resourceUrl="http://localhost:8080/authorize.html";   //here you can paste your site url
    public AccessTokenURL = 'https://login.microsoftonline.com/f8a1e658-4481-439f-af4c-fb0c9588eee4/oauth2/token';
}

