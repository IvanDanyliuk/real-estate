import resend from "../config/resend";
import { EMAIL_SENDER } from "../constants/env";

type Params = {
  to: string,
  subject: string,
  text: string,
  html: string,
};

export const getFromEmail = () => {
  return process.env.NODE_ENV === "development" ? "onboarding@resend.dev" : EMAIL_SENDER;
};

export const getToEmail = (to: string) => {
  return process.env.NODE_ENV === "development" ? "delivered@resend.dev" : to;
};

export const sendEmail = async ({ to, subject, text, html }: Params) => {
  return await resend.emails.send({
    from: getFromEmail(),
    to: getToEmail(to),
    subject,
    text,
    html,
  });
};