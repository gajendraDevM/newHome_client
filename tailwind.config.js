module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors:{

      brandColor:"#B4002F"

    },
    extend: {
      fontFamily: {
        'sans': ['Montserrat', 'Sans-serif'],
        'text': ['Poppins', 'Sans-serif']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
 
}
