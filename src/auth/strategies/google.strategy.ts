import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID: "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",
      clientSecret: "1089319691605-o68oqcjnte5gad26qki0cks06cslh5sn.apps.googleusercontent.com",
      callbackURL: 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }
  async validate (accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    const { name, emails} = profile
    return {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      accessToken
    }
  }
}
