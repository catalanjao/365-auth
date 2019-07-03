import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {
    public clientId="6eda2a34-ca3a-4666-9d41-0c34e878f1d0";          //here you can paste your client id
    public redirectUri="urn:ietf:wg:oauth:2.0:oob";
    public resourceUrl="http://localhost:8080/authorize.html";   //here you can paste your site url
    public AccessTokenURL = 'https://login.microsoftonline.com/6b3f48d6-df0e-4425-8d2d-077190b9af71/';
}

