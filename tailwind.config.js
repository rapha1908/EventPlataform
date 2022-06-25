/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/**/*.tsx/'
    ],
    theme: {
        extend: {
            backgroundImage: {
                blur: "url(/src/assets/bg-blur.png)",
                screen: "url(/src/assets/screen.png)",
            },
            fontFamily: {
                sans: "Roboto, sans-serif",
            },
            colors: {
                green: {
                    300: '#1597C2',
                    500: '#0B476C',
                    700: '#0B476C',
                },
                blue: {
                    500: '#81D8F7',
                },
                tccheblue: {
                    100: '#67C5E9',
                    200: '#2FA8E0',
                    300: '#1597C2',
                    400: '#0B476C',
                    500: '#192C35',
                },
                orange: {
                    500: '#FBA94C',
                },
                red: {
                    500: '#F75A68',
                },
                gray: {
                    100: '#E1E1E6',
                    200: '#C4C4CC',
                    300: '#8D8D99',
                    500: '#323238',
                    600: '#29292E',
                    700: '#121214',
                    900: '#09090A'
                }
            }
        },
    },
    plugins: [],
}