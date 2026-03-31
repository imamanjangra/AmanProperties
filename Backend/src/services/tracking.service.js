import {UAParser} from "ua-parser-js";
import {isbot} from "isbot";
import {Click} from "../model/click.model.js";

export const trackClick = async (urlDoc, req) => {
  try {
    const userAgent = req.headers["user-agent"];
    if (isbot(userAgent)) return;

    const parser = new UAParser(userAgent);
    const result = parser.getResult();
    console.log(result);
    const browser = result.browser.name || "Unknown";
    const os = result.os.name || "Unknown";
    const device = result.device.type || "desktop";
    const cpu = result.cpu.architecture || "Unknown"
   
    await Click.create({
      urlId: urlDoc._id,
      browser,
      os,
      device,
      cpu
    });


  } catch (error) {
    console.log("Tracking Error:", error.message);
  }
};       
                                                          