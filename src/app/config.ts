import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {
    public clientId="aaa--bb--cc--dd"
    public clientSecret="AA-BB-CC-DD";
    public redirectUri="https://localhost:44389/signin-microsoft";
    public AccessTokenURL = 'https://login.microsoftonline.com/eltenant/oauth2/token';
    public AuthURL = `https://login.microsoftonline.com/eltenant/oauth2/authorize?client_id=`;
}

