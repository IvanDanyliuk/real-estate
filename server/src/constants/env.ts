const getEnv = (key: string, defaultValue?: string): string => {
  const value = process.env[key] || defaultValue;
  if(value === undefined) {
    throw Error(`Missing String environment variable for ${key}`);
  }
  return value;
};

export const MONGODB_URI = getEnv("MONGODB_URI");
export const PORT = getEnv("PORT", "5000");
export const APP_ORIGIN = getEnv("APP_ORIGIN");
export const JWT_SECRET = getEnv("JWT_SECRET");
export const JWT_REFRESH_SECRET = getEnv("JWT_REFRESH_SECRET");
export const RESEND_API_KEY = getEnv("RESEND_API_KEY");
export const EMAIL_SENDER = getEnv("EMAIL_SENDER");
export const CLOUDINARY_CLOUD_NAME = getEnv('CLOUDINARY_CLOUD_NAME');
export const CLOUDINARY_API_KEY = getEnv('CLOUDINARY_API_KEY');
export const CLOUDINARY_API_SECRET = getEnv('CLOUDINARY_API_SECRET');