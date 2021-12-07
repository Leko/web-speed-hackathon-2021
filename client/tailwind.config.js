module.exports = {
  darkMode: false,
  purge: {
    content: ['./src/**/*.html', './src/**/*.jsx'],
    options: {
      keyframes: true,
      fontFace: true,
    },
  },
};

// No options:
// -rw-r--r--  1 leko  staff  391167 Dec  7 21:14 ../dist/styles/main.css

// keyframes=true
// -rw-r--r--  1 leko  staff  390405 Dec  7 22:40 ../dist/styles/main.css

// fontFace=true
// -rw-r--r--  1 leko  staff  12148 Dec  7 22:41 ../dist/styles/main.css
