"use server";

import { DutyCalculationData } from "@/lib/types";
import * as cheerio from "cheerio";

export async function fetchDuty(
  data: Record<string, string>
): Promise<DutyCalculationData | undefined> {
  try {
    console.log(data);
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
        "Content-Type": "application/x-www-form-urlencoded",
        "User-Agent":
          "Mozilla/5.0 (Linux; Android 13; SM-A536U) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/112.0.0.0 Mobile Safari/537.36",
      },
      body: new URLSearchParams(data),
    };

    var response = await fetch(
      "https://www.mra.mw/WebServices/calculateDuty",
      options
    );

    var html = await response.text();

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
