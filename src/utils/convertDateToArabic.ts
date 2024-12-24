import dayjs from "dayjs";
import localizedFormat from "dayjs/plugin/localizedFormat";
import preParsePostFormat from "dayjs/plugin/preParsePostFormat";
import relativeTime from "dayjs/plugin/relativeTime";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";

dayjs.extend(preParsePostFormat);
dayjs.extend(relativeTime);
dayjs.extend(timezone);
dayjs.extend(utc);
dayjs.extend(localizedFormat);
export const dynamic = "force-dynamic";

const months =
  "يناير_فبراير_مارس_أبريل_مايو_يونيو_يوليو_أغسطس_سبتمبر_أكتوبر_نوفمبر_ديسمبر".split(
    "_"
  );
const symbolMap: Record<number, string> = {
  1: "١",
  2: "٢",
  3: "٣",
  4: "٤",
  5: "٥",
  6: "٦",
  7: "٧",
  8: "٨",
  9: "٩",
  0: "٠",
};

const numberMap: Record<string, string> = {
  "١": "1",
  "٢": "2",
  "٣": "3",
  "٤": "4",
  "٥": "5",
  "٦": "6",
  "٧": "7",
  "٨": "8",
  "٩": "9",
  "٠": "0",
};

interface ILocale {
  formats: any;
  relativeTime: any;
  name: string;
  preparse: (string: string) => string;
  postformat: (string: string) => string;
  meridiem?: (number: number) => string;
}

export const localeDayjs: ILocale = {
  name: "ar",
  // ...
  preparse(string: string) {
    return string
      .replace(/[١٢٣٤٥٦٧٨٩٠]/g, (match) => numberMap[match])
      .replace(/،/g, ",");
  },
  postformat(string: string) {
    // Replace English digits with Arabic equivalents
    string = string.replace(/\d/g, (match: any) => symbolMap[match] || match);

    // Replace AM and PM indicators with Arabic equivalents
    const arabicIndicators: any = {
      AM: "ص",
      PM: "م",
    };

    for (const indicator in arabicIndicators) {
      string = string.replace(indicator, arabicIndicators[indicator]);
    }

    // Replace English commas with Arabic ones
    string = string.replace(/,/g, "،");

    return string;
  },
  formats: {
    LT: "HH:mm",
    LTS: "HH:mm:ss",
    L: "DD/MM/YYYY",
    LL: "D MMMM YYYY",
    LLL: "D MMMM YYYY HH:mm",
    LLLL: "dddd D MMMM YYYY HH:mm",
  },
  relativeTime: {
    future: "في %s",
    past: "منذ %s",
    s: "ثوان",
    m: "دقيقة",
    mm: "%d دقائق",
    h: "ساعة",
    hh: "%d ساعات",
    d: "يوم",
    dd: "%d أيام",
    M: "شهر",
    MM: "%d أشهر",
    y: "سنة",
    yy: "%d سنوات",
  },
  //   meridiem(hour: number) {
  //     if (hour < 12) {
  //       return "ص";
  //     } else {
  //       return "م";
  //     }
  //   },
  // ...
};
