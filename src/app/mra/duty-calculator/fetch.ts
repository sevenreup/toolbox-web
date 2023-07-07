"use server";

import { DutyCalculationData } from "@/lib/types";
import axios from "axios";
import * as cheerio from "cheerio";

export async function fetchDuty(
  data: object
): Promise<DutyCalculationData | undefined> {
  try {
    const form = new FormData();
    // append data to form by looping through the data object
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = (data as any)[key as any];
        form.append(key, element);
      }
    }

    const options = {
      method: "POST",
      url: "https://www.mra.mw/WebServices/calculateDuty",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
      data: form,
    };

    var response = await axios.request(options);
    var html = response.data;
    const $ = cheerio.load(html);
    const text = $(".course-post blockquote").text().trim();
    const purposesRegex = /Purposes\(VDP\):\s*([A-Z]+\s[\d,]+\.\d+)/;
    const estimatedRegex = /ESTMATED\(TDE\):\s*([A-Z]+\s[\d,]+\.\d+)/;

    const purposesMatch = text.match(purposesRegex);
    const estimatedMatch = text.match(estimatedRegex);

    const purposesVDP = purposesMatch ? purposesMatch[1] : "";
    const estimatedTDE = estimatedMatch ? estimatedMatch[1] : "";

    return {
      purposesVDP,
      estimatedTDE,
    };
  } catch (error) {
    console.log(error);
  }
}
