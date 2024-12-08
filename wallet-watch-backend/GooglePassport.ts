import * as dotenv from 'dotenv';
import { GoogleProfileModel } from './model/GoogleProfile';
import passport from 'passport';
import { Strategy as GoogleStrategy, VerifyCallback } from 'passport-google-oauth20'; // Import correct types

dotenv.config();

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
                callbackURL: "/auth/google/callback",
                scope: ['profile']
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

        passport.serializeUser(function(user: any, done: (arg0: null, arg1: any) => void) {
            done(null, user);
        });

        passport.deserializeUser(function(user: any, done: (arg0: null, arg1: any) => void) {
            done(null, user);
        });
    }
}

export default GooglePassport;
