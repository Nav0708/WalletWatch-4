import IGoogleProfile from "../interfaces/IGoogleProfile"

class GoogleProfileModel implements IGoogleProfile {
  id: string;
  displayName: string;
  name: {
    familyName: string;
    givenName: string;
  };
  emails: Array<{
    value: string;
    verified: boolean;
  }>;
  photos: Array<{
    value: string;
  }>;
  provider: string;
  _raw: string;
  _json: {
    sub: string;
    name: string;
    given_name: string;
    family_name: string;
    picture: string;
    email: string;
    email_verified: boolean;
    locale: string;
  };

  constructor(profile: IGoogleProfile) {
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
  getFullName(): string {
    return `${this.name.givenName} ${this.name.familyName}`;
  }

  getProfilePicture(): string {
    return this.photos.length > 0 ? this.photos[0].value : '';
  }
}

export { GoogleProfileModel };