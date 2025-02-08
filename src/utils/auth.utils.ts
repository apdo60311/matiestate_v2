// import jwt from 'jsonwebtoken';
// import crypto from 'crypto';
// import bcrypt from 'bcrypt';
// import config from '@/config/env';

// /**
//  * Generates a JSON Web Token (JWT) based on the provided Token data.
//  *
//  * @param {TokenData} data - Token data to be included in the token.
//  * @param {string} secretKey - Secret key used to sign the token.
//  * @param {string} expiresIn - Expiration time for the token (e.g., '1h' for 1 hour).
//  * @returns {string} Generated JWT.
//  * @throws {Error} Throws an error if Token data is not provided or if signing fails.
//  */
// export function generateJWTToken(
//   data: TokenData,
//   secretKey: string,
//   expiresIn: number = 60 * 60
// ): string {
//   if (!data) {
//     throw new Error('Token data is required to generate a token.');
//   }

//   if (!secretKey || typeof secretKey !== 'string') {
//     throw new Error('A valid secret key is required to sign the token.');
//   }

//   try {
//     return jwt.sign(data, secretKey, { expiresIn });
//   } catch (error) {
//     throw new Error(`Error generating token: ${(error as Error).message}`);
//   }
// }

// /**
//  * Decodes a JSON Web Token (JWT) and returns the decoded payload.
//  *
//  * @param {string} token - The JWT to decode.
//  * @param {string} secretKey - Secret key used to verify the token's signature.
//  * @returns {TokenData} Decoded payload.
//  * @throws {Error} Throws an error if decoding fails or if the token is invalid.
//  */
// export function decodeJWTToken(token: string, secretKey: string): TokenData {
//   if (!token || typeof token !== 'string') {
//     throw new Error('A valid token is required for decoding.');
//   }

//   if (!secretKey || typeof secretKey !== 'string') {
//     throw new Error('A valid secret key is required to decode the token.');
//   }

//   try {
//     return jwt.verify(token, secretKey) as TokenData;
//   } catch (error) {
//     throw new Error(`Error decoding token: ${(error as Error).message}`);
//   }
// }


// export function generateSmsToken(): string {
//   return crypto
//     .randomInt(0, 10 ** 6 - 1)
//     .toString()
//     .padStart(6, '0');
// }

// /**
//  * Send SMS message
//  * @param {string} phone - Phone number
//  * @param {string} msg - Message content
//  * @param {1 | 2} lang - Language (1 = arabic, 2 = english)
//  * @returns {Promise<Response>} - API response
//  */
// export async function sendSms(
//   phone: string,
//   msg: string,
//   lang: 1 | 2
// ): Promise<Response> {
//   const API_Key = config.SMS_KEY;
//   const message = msg.replace(' ', '+');
  
//   return fetch(
//     `https://api-server14.com/api/send.aspx?apikey=${API_Key}&language=${lang}&sender=KMH-RE&mobile=${phone}&message=${message}`
//   );
// }

// export async function cryptPassword(password: string): Promise<string> {
//   const salt = await bcrypt.genSalt(10);
//   return bcrypt.hash(password, salt);
// }

// export async function comparePassword(
//   password: string,
//   hashPassword: string
// ): Promise<boolean> {
//   return bcrypt.compare(password, hashPassword);
// }