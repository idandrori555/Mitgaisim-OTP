const URLS = {
  INITIAL_LOGIN: "https://my.mitgaisim.idf.il/api/authenticate/siteLogin",
  SEND_OTP: "https://my.mitgaisim.idf.il/api/otp/sendOtp",
} as const;

const initialLogin = async (
  malshabId: string,
  password: string,
): Promise<string> => {
  const response = await fetch(URLS.INITIAL_LOGIN, {
    headers: {
      accept: "application/json, text/plain, */*",
      "content-type": "application/json",
    },
    body: JSON.stringify({ malshabId, password }),
    method: "POST",
  });

  const cookies = response.headers.get("Set-Cookie");
  if (!cookies) throw new Error("Invalid Cookie");

  return cookies;
};

const sendOtp = async (cookie: string) => {
  const response = await fetch(URLS.SEND_OTP, {
    headers: {
      accept: "application/json, text/plain, */*",
      "accept-language": "en-US,en;q=0.9,he-IL;q=0.8,he;q=0.7,en-GB;q=0.6",
      "content-type": "application/json",
      cookie: cookie,
    },
    body: '{"sendOtpMethod":1,"Email":"","Mobile":""}',
    method: "POST",
  });

  console.log(await response.json());
};

const main = async () => {
  const cookie = await initialLogin("331957621", "Idan@555");
  sendOtp(cookie);
};
