import * as dotenv from 'dotenv';
import { GoogleProfileModel } from './model/GoogleProfile';
import passport, { DoneCallback } from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20'; // Import correct types
import { environment } from './environments/environment';

dotenv.config();

type User = {
    id: string;
    displayName: string;
    familyName: string;
    emails?: { value: string }[];
    photos?: { value: string }[];
};


// Creates a Passport configuration for Google
class GooglePassport {
    clientId: string;
    secretId: string;
    googleProfile!: GoogleProfileModel;
    
    constructor() { 
        this.clientId = process.env.GOOGLE_CLIENT_ID || '';
        this.secretId = process.env.GOOGLE_CLIENT_SECRET || '';
        
        // Define the type for the callback (accessToken, refreshToken, profile, done)
        passport.use(new GoogleStrategy({
                clientID: this.clientId,
                clientSecret: this.secretId,
                //callbackURL: "http://localhost:8080/auth/google/callback",
                callbackURL: process.env.AZURE ? "https://walletwatch-4-g7dxefauf6fwh8hx.westus-01.azurewebsites.net/auth/login/callback" : "/auth/login/callback",
                scope: ['profile','email']
            },
            (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback)  => { // Explicitly type parameters
                console.log("inside new password google strategy");
                process.nextTick(() => {
                    console.log('validating google profile:' + JSON.stringify(profile));
                    this.googleProfile = profile;
                    console.log('this.googleProfile', this.googleProfile.photos);
                    console.log("userId:" + profile.id);
                    console.log("displayName: " + profile.displayName);
                    console.log("retrieve all of the profile info needed");

                    if (profile.emails) {
                        console.log("emails:", profile.emails.map((email: { value: any; }) => email.value));
                    } else {
                        console.log("No emails found in profile");
                    }

                    return done(null, profile); // Return the profile as the user object
                }); 
            }
        ));

        passport.serializeUser(function(user: User, done: DoneCallback) {
            done(null, user);
        });

        passport.deserializeUser(function(user: User, done: DoneCallback) {
            done(null, user);
        });
    }
}

export default GooglePassport;
