import { URLS } from "./const";
import type { OTPResponseBody } from "./types";

export class Client {
  private id: string;
  private password: string;
  private cookie: string | null = null;

  constructor(id: string, password: string) {
    this.id = id;
    this.password = password;
  }

  public async login(): Promise<void> {
    try {
      const response = await fetch(URLS.INITIAL_LOGIN, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ malshabId: this.id, password: this.password }),
      });

      if (!response.ok) {
        throw new Error(`Login failed with status ${response.status}`);
      }

      const cookies = response.headers.get("set-cookie");
      if (!cookies) throw new Error("Login response did not contain cookies");

      this.cookie = cookies;
    } catch (err) {
      throw new Error(`Login error: ${(err as Error).message}`);
    }
  }

  public async sendOtp(): Promise<OTPResponseBody> {
    if (!this.cookie) {
      throw new Error("Cannot send OTP before logging in");
    }

    try {
      const response = await fetch(URLS.SEND_OTP, {
        method: "POST",
        headers: {
          Accept: "application/json, text/plain, */*",
          "Content-Type": "application/json",
          Cookie: this.cookie,
        },
        body: JSON.stringify({ sendOtpMethod: 1, Email: "", Mobile: "" }),
      });

      if (!response.ok) {
        throw new Error(`OTP request failed with status ${response.status}`);
      }

      const json = (await response.json()) as OTPResponseBody;
      if (!json || json.statusDescription !== "Success") {
        throw new Error(
          `OTP request failed: ${json?.statusDescription ?? "No response"}`,
        );
      }

      return json;
    } catch (err) {
      throw new Error(`sendOtp error: ${(err as Error).message}`);
    }
  }
}
