/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/components/**/*.{js,ts,jsx,tsx}', './src/app/**/*.{js,ts,jsx,tsx}', './src/ui/**/*.{js,ts,jsx,tsx}'],
    theme: {
        extend: {
            colors: {
                "gold": {
                    "primary": "#AD9255",
                    100: "#EBE4D4",
                    200: "#D6CBA9",
                    300: "#C1AD80",
                    500: "#A49062",
                    700: "#826E40",
                    800: "#57492B",
                    1000: "#2B2515",
                },
                "black": {
                    "primary": "#181A19",
                    100: "#333433",
                    200: "#262727",
                    300: "#141414",
                    400: "#090909",
                }
            },
            backgroundImage: {
                "gold-gradient": "linear-gradient(180deg, #FFE998 0%, #57370D 100%)",
                "black-gradient": "linear-gradient(180deg, #333433 0%, #181A19 100%)",
            },
            fontFamily: {
                lora: ["var(--font-lora)", "serif"],
                lato: ["var(--font-lato)", "sans-serif"],
                taviraj: ["var(--font-taviraj)", "serif"],
                cinzel: ["var(--font-cinzel)", "serif"],
            },
            fontSize: {
                "7xl": ["84px", {lineHeight: "126px"}],
                "6xl": ["72px", {lineHeight: "80px"}],
                "5xl": ["64px", {lineHeight: "96px"}],
                "4xl": ["56px", {lineHeight: "84px"}],
                "3xl": ["56px", {lineHeight: "66px"}],
                "2xl": ["44px", {lineHeight: "66px"}],
                xl: ["36px", {lineHeight: "46px"}],
                lg: ["32px", {lineHeight: "48px"}],
                base: ["24px", {lineHeight: "36px"}],
                sm: ["22px", {lineHeight: "33px"}],
                xs: ["20px", {lineHeight: "30px"}],
                "2xs": ["18px", {lineHeight: "27px"}],
                "3xs": ["16px", {lineHeight: "24px"}],
                "4xs": ["14px", {lineHeight: "22px"}],
                "5xs": ["12px", {lineHeight: "18px"}],
                "6xs": ["10px", {lineHeight: "15px"}],
            },
            boxShadow: {
                "gold-smaller": "0 2px 10.6px 0 rgba(173, 146, 85, 1)",
                "gold-small": "0 14px 42px 0 rgba(173, 146, 85, 1)",
                "gold-regular": "0 24px 65px 0 rgba(173, 146, 85, 1)",
                "gold-medium": "0 32px 72px 0 rgba(173, 146, 85, 1)",

                "white-smaller": "0 8px 28px 0 rgba(255, 255, 255, 0.1)",
                "white-small": "0 14px 42px 0 rgba(255, 255, 255, 0.1)",
                "white-regular": "0 24px 65px 0 rgba(255, 255, 255, 0.1)",
                "white-medium": "0 32px 72px 0 rgba(255, 255, 255, 0.1)",
            },
            keyframes: {
                'slide-in-right': {
                    from: {transform: 'translateX(50px)', opacity: 0},
                    to: {transform: 'translateX(0)', opacity: 1},
                },
                'slide-in-left': {
                    from: {transform: 'translateX(-50px)', opacity: 0},
                    to: {transform: 'translateX(0)', opacity: 1},
                },
                'slide-in-top': {
                    from: {transform: 'translateY(-50px)', opacity: 0},
                    to: {transform: 'translateX(0)', opacity: 1},
                },
                'slide-in-bottom': {
                    from: {transform: 'translateY(50px)', opacity: 0},
                    to: {transform: 'translateX(0)', opacity: 1},
                },
                'fade': {
                    from: {opacity: 0},
                    to: {opacity: 1},
                },
                'scale-in': {
                    from: {transform: 'scale(0.5)', opacity: 0},
                    to: {transform: 'scale(1)', opacity: 1},
                },
                'float': {
                    '0%, 100%': {transform: 'translateY(0)'},
                    '50%': {transform: 'translateY(-10px)'}, // высота "левитации"
                },

            },
            animation: {
                'slide-in-right': 'slide-in-right 1s ease-out both',
                'slide-in-left': 'slide-in-left 1s ease-out both',
                'slide-in-top': 'slide-in-top 1s ease-out both',
                'slide-in-bottom': 'slide-in-bottom 1s ease-out both',
                'fade': 'fade 2s ease-out both',
                'scale-in': 'scale-in 0.5s ease-out both',
                'float': 'float 3s ease-in-out infinite',
            }
        },
        screens: {
            "max-mobile": {max: "583px"},
            mobile: "584px",

            "max-ipad": {max: "833px"},
            ipad: "834px",

            "max-laptop": {max: "1193px"},
            laptop: "1194px",

            "max-desk": {max: "1349px"},
            desk: "1350px",

            wide: "1920px",
        }
    },
    plugins: [],
}
