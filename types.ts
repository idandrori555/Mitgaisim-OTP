export type OTPResponseBody = {
  otpAuthCookie: string;
  sendOtpMethod: number;
  isSharach: boolean;
  otpTarget: string;
  statusCode: number;
  statusDescription: string;
};
