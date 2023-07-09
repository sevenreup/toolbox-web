"use server";

import { DutyCalculationData } from "@/lib/types";
import * as cheerio from "cheerio";

export async function fetchDuty(
  data: object
): Promise<DutyCalculationData | undefined> {
  try {
    const form = new FormData();
    for (const key in data) {
      if (Object.prototype.hasOwnProperty.call(data, key)) {
        const element = (data as any)[key as any];
        form.append(key, element);
      }
    }

    const options = {
      method: "POST",
      headers: {
        "Content-Type":
          "multipart/form-data; boundary=---011000010111000001101001",
      },
      body: form,
    };

    var response = await fetch(
      "https://www.mra.mw/WebServices/calculateDuty",
      options
    );
    var html = await response.text();
    console.log("dd" + html);

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
