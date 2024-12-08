"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GoogleProfileModel = void 0;
class GoogleProfileModel {
    constructor(profile) {
        this.id = profile.id;
        this.displayName = profile.displayName;
        this.name = profile.name;
        this.emails = profile.emails;
        this.photos = profile.photos;
        this.provider = profile.provider;
        this._raw = profile._raw;
        this._json = profile._json;
    }
    // You can add methods to manipulate or retrieve profile data as needed.
    getFullName() {
        return `${this.name.givenName} ${this.name.familyName}`;
    }
    getProfilePicture() {
        return this.photos.length > 0 ? this.photos[0].value : '';
    }
}
exports.GoogleProfileModel = GoogleProfileModel;
