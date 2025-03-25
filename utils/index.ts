import dayjs from "dayjs";
import "dayjs/locale/uz-latn";
import "dayjs/locale/ru";
import "dayjs/locale/en";

export function translateDate(
  date: Date,
  format = "MMMM D, YYYY",
  locale: string
) {
  return dayjs(date)
    .locale(locale === "uz" ? "uz-latn" : locale)
    .format(format);
}

export function formatPhoneNumber(number: string) {
  const format = number
    ?.replace(/\D/g, "")
    .match(/(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})/);
  return `+${format && format[1] ? format[1] : ""}
          ${format && format[2] ? format[2] : ""}
          ${format && format[3] ? format[3] : ""}
          ${format && format[4] ? format[4] : ""}
          ${format && format[5] ? format[5] : ""}`.replace(/\n/g, "");
}
// "D# ### ###",
// "D## ### ###",
// "D ### ### ###",
export const moneyMask = {
  mask: ["D", "D#", "D##", "D ###", "D# ###", "D## ###", "D ### ###"],
  tokens: {
    D: {
      pattern: /[1-9]/,
    },
  },
};

const validPhones = [
  "90",
  "91",
  "33",
  "50",
  "93",
  "94",
  "88",
  "95",
  "97",
  "98",
  "99",
  "77",
];
export const isValidPhone = (val: string) => {
  const phone = val.replace(/[\s)(-]/g, "");
  return phone.length === 13;
};

export function formatMoneyDecimal(
  number: number,
  fix = 0,
  option = "decimal"
) {
  let style: string;
  if (["USD", "RUB"].includes(option)) {
    style = "currency";
  } else if (["kilogram", "meter", "percent"].includes(option)) {
    style = "unit";
  } else {
    style = "";
  }

  const newStyle: string = style;
  const option2 = {
    newStyle, //  unit currency percent decimal
    [newStyle]: option,
    maximumFractionDigits: fix,
    minimumFractionDigits: fix,
    decimal: ".",
  };
  return number
    ? new Intl.NumberFormat("ru-RU", option2).format(number)
    : "0.00";
}

export const cardNumberValidator = (value: string) =>
  /8600|9860|5440|4200/.test(value);

export const checkExpireDate = (value: any) => {
  let month = value.slice(0, 2);
  let year = value.slice(3, 5);

  let currentMonth = new Date().getMonth() + 1;
  let currentYear = String(new Date().getFullYear()).slice(2, 5);
  let checkMonth =
    +month <= 12 &&
    (+year !== +currentYear ||
      (+year === +currentYear && +month >= currentMonth));
  let checkYear = year >= currentYear && year <= +currentYear + 5;

  return checkYear && checkMonth;
};

export const generateUniqueId = () =>
  Date.now().toString(36) + Math.random().toString(36).substr(2);

export const share = (network: string, title: string) => {
  if (process.client) {
    switch (network) {
      case "telegram":
        window.open(
          `https://t.me/share/url?url=${window.location.href}&text=${title}`,
          "_blank"
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${title}\n+${window.location.href}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?t=${title}\n${window.location.href}`,
          "_blank"
        );
        break;
    }
  }
};

export function downloadFile(url: string, filename: string) {
  fetch(url)
    .then((response) => response.blob())
    .then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      setTimeout(() => {
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);
      }, 0);
    });
}

export function generateUUID() {
  // Public Domain/MIT
  let d = new Date().getTime(); //Timestamp
  let d2 =
    (typeof performance !== "undefined" &&
      performance.now &&
      performance.now() * 1000) ||
    0; //Time in microseconds since page-load or 0 if unsupported
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    let r = Math.random() * 16; //random number between 0 and 16
    if (d > 0) {
      //Use timestamp until depleted
      r = (d + r) % 16 | 0;
      d = Math.floor(d / 16);
    } else {
      //Use microseconds since page-load if supported
      r = (d2 + r) % 16 | 0;
      d2 = Math.floor(d2 / 16);
    }
    return (c === "x" ? r : (r & 0x3) | 0x8).toString(16);
  });
}
const timeouts: { [key: string]: any } = {};

const cTimeout = (key = "key") => {
  if (timeouts[key]) {
    clearTimeout(timeouts[key]);
    timeouts[key] = undefined;
  }
};
export const debounce = (key = "key", fn = () => {}, timeout = 500) => {
  const sTimeout = (key: string, fn: any, timeout: number) => {
    cTimeout(key);

    timeouts[key] = setTimeout(() => {
      try {
        fn();
      } catch (e) {
        console.log(e);
      }

      timeouts[key] = undefined;
    }, timeout);
  };

  return sTimeout(key, fn, timeout);
};
