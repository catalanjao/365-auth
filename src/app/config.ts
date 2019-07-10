import { Injectable } from '@angular/core';

@Injectable()
export class ConfigProvider {
    public clientId="d4b2de5f-7eab-43de-a61e-7afe1d7cf143";
    public clientSecret="uurZqj5C75l.0Ix_Bdy*DM@u7.G76rww";
    public redirectUri="https://localhost:44389/signin-microsoft";
    public AccessTokenURL = 'https://login.microsoftonline.com/f8a1e658-4481-439f-af4c-fb0c9588eee4/oauth2/token';
    public AuthURL = `https://login.microsoftonline.com/f8a1e658-4481-439f-af4c-fb0c9588eee4/oauth2/authorize?client_id=`;
}

