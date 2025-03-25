module.exports = {
  purge: [
    "./components/**/*.{vue,js,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#1C1F20", // DARK 1
          light: "#606263", // DARK 2
          blue: "#051015",
          100: "#071A24",
          200: "#05111C"
        },
        blue: "#30A1DB", // BLUE
        red: {
          DEFAULT: "#E54056",
          100: "#E81C37",
        }, // RED
        green: "#0EC84D", // GREEN
        grey: {
          100: "#A2ABBE", // GREY 1
          200: "#E8E9E9", // GREY 2
          300: "#F4F5F7", // GREY 3
          400: "#F8F9FA", // GREY 4
          500: "#8E9192", // GREY 5
          600: "#DADDE8"
        },
      },
      lineHeight: {
        14: "14px",
        16: "16px",
        20: "20px",
        19: "19px",
        18: "18px",
        115: "115%",
        100: "100%",
        120: "120%",
        125: "125%",
        130: "130%",
        135: "135%",
        140: "140%",
        150: "150%",
      },
      zIndex: {
        1: "1",
        2: "2",
        3: "3",
        4: "4",
        5: "5",
        6: "6",
        7: "7",
        8: "8",
        9: "9",
        11: "11",
        12: "12",
        13: "13",
        14: "14",
        15: "15",
        16: "16",
        17: "17",
        18: "18",
        19: "19",
        21: "21",
        22: "22",
        23: "23",
        24: "24",
        25: "25",
        26: "26",
        27: "27",
        28: "28",
        29: "29",
      },
      boxShadow: {
        form: "0px 14px 30px rgba(28, 31, 32, 0.06)",
        "card-hover": "0px 14px 30px rgba(48, 161, 219, 0.11)",
        "map-hover": "0px 14px 30px rgba(48, 161, 219, 0.06)",
        "map-list": "0px 10px 28px rgba(38, 55, 91, 0.06)",
        collapse: "0px 4px 13px rgba(28, 31, 32, 0.04)",
        survey: "0px 14px 30px rgba(28, 31, 32, 0.06)",
        tab: "0px 3px 10px rgba(28, 31, 32, 0.12)",
        missionCardShadow: "box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px",
        dropDown: "0px 14px 30px 0px rgba(28, 31, 32, 0.09)",
        headMember: "0px 14px 30px 0px rgba(28, 31, 32, 0.03)",
        inset: "3px 4px 8px 0px rgba(255, 255, 255, 0.50) inset",
        hashtag: "0px 8px 12px 0px rgba(0, 0, 0, 0.12)",
        reportCard: "0px 6px 36px 0px rgba(34, 35, 44, 0.13)",
        iconDoc: "0px 4px 20px 0px rgba(0, 0, 0, 0.02)"
      },
      fontWeight: {
        normal: "300",
        450: "400",
      },
      fontFamily: {
        display: ["Gabriela", "ui-sans-serif"],
      },
    },
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
