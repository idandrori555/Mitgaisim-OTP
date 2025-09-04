import { Client } from "./api";

const main = async () => {
  try {
    const client = new Client("331957621", "Idan@555");
    void (await client.login());
    const json = await client.sendOtp();

    console.log(json);
  } catch (err) {
    console.error(err);
  }
};

if (import.meta.main) main();
