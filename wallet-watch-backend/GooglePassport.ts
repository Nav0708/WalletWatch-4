import * as dotenv from 'dotenv';
import { GoogleProfileModel } from './model/GoogleProfile';

//let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let passport = require('passport');
//let GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
let GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config();
// Creates a Passport configuration for Google
class GooglePassport {

    clientId: string;
    secretId: string;
    googleProfile!: GoogleProfileModel;
    constructor() { 
        this.clientId = process.env.oauthID||'';
        this.secretId = process.env.oauthSecret||'';
        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                callbackURL: "http://localhost:8080/auth/google/callback",scope: ['profile']
            },
            (accessToken: any, refreshToken: any, profile: GoogleProfileModel, done: (arg0: null, arg1: any) => any) => {
                console.log("inside new password google strategy");
                process.nextTick( () => {
                    console.log('validating google profile:' + JSON.stringify(profile));
                    this.googleProfile = profile;
                    console.log('this.googleProfile',this.googleProfile.photos);
                    console.log("userId:" + profile.id);
                    console.log("displayName: " + profile.displayName);
                    console.log("retrieve all of the profile info needed");
                    if (profile.emails) {
                        console.log("emails:", profile.emails.map((email: { value: any; }) => email.value));
                      } else {
                        console.log("No emails found in profile");
                      }
                    // this.email = profile.emails[0].value;
                    return done(null, profile);
                }); 
            }
        ));

        passport.serializeUser(function(user: any, done: (arg0: null, arg1: any) => void) {
            done(null, user);
        });

        passport.deserializeUser(function(user: any, done: (arg0: null, arg1: any) => void) {
            done(null, user);
        });
    }
}
export default GooglePassport;