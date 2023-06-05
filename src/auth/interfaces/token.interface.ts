import { User } from '../schema/user.schema';

export interface Tokens {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  email: string;
  number: string;
}

export type SignUpType = {
  tokens: Tokens;
  user: User;
};
