import jwt from "jsonwebtoken";
import crypto from "crypto";

interface AccessTokenObject {
  skypeToken: string;
  expirationTime: number;
  expiresIn: number;
}

interface BearerTokenObject {
  bearerToken: string;
  expirationTime: number;
  expiresIn: number;
}

interface UserCredentials {
  email: string;
  password: string;
}

interface Encrypted {
  data: string;
  iv: string;
  salt: string;
}

export const generateJWT = (
  bearerTokenObject: BearerTokenObject,
  accessTokenObject: AccessTokenObject
) => {
  const jwtSecretKey = process.env.JWT_SECRET;

  const data = {
    bearerToken: bearerTokenObject.bearerToken,
    accessToken: accessTokenObject.skypeToken,
  };

  const expiresIn =
    accessTokenObject.expirationTime < bearerTokenObject.expirationTime
      ? `${accessTokenObject.expiresIn}s`
      : `${bearerTokenObject.expiresIn}s`;

  const token = jwt.sign(data, jwtSecretKey, {
    expiresIn: expiresIn,
  });

  return token;
};

export const getTokensFromJWT = (token: string) => {
  const jwtSecretKey = process.env.JWT_SECRET;

  // @ts-ignore
  const json: { bearerToken: string; accessToken: string } = jwt.verify(
    token,
    jwtSecretKey
  );

  const bearerToken = "Bearer " + json.bearerToken;
  const accessToken = "skypetoken=" + json.accessToken;

  return { bearerToken, accessToken };
};


function encrypt(password: string, plaintext: string) {
  const salt = crypto.randomBytes(16).toString("hex");
  const key = crypto.scryptSync(password, salt, 32);

  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

  let ciphered = cipher.update(plaintext, "utf8", "hex");
  ciphered += cipher.final("hex");
  return {data: ciphered, salt, iv: iv.toString("hex")};
}

const decrypt = (password: string, encrypted: Encrypted) => {
  const salt = encrypted.salt;
  const key = crypto.scryptSync(password, salt, 32);

  const cipher = crypto.createDecipheriv("aes-256-cbc", key, Buffer.from(encrypted.iv,"hex"));

  let ciphered = cipher.update(encrypted.data, "hex", "utf8");
  ciphered += cipher.final("utf8");
  return ciphered;
};

export const generateRefreshToken = (
  userCredentials: UserCredentials,
  bearerTokenObject: BearerTokenObject,
  accessTokenObject: AccessTokenObject
): string => {
  const jwtSecretKey = process.env.JWT_SECRET;
  const encPassword = process.env.ENC_PASSWD;

  const data = {
    email: encrypt(encPassword, userCredentials.email),
    password: encrypt(encPassword, userCredentials.password),
  };

  const expiresIn =`${accessTokenObject.expiresIn + bearerTokenObject.expiresIn}s`

  const token = jwt.sign(data, jwtSecretKey, {
    expiresIn: expiresIn,
  });

  return token;
};

export const decodeRefreshToken = (refreshToken: string) => {
  const jwtSecretKey = process.env.JWT_SECRET;
  const encPassword = process.env.ENC_PASSWD;

  // @ts-ignore
  const json: { email: Encrypted; password: Encrypted } = jwt.verify(
    refreshToken,
    jwtSecretKey
  );

  const email = decrypt(encPassword, json.email);
  const password = decrypt(encPassword, json.password);

  return {email, password}
}