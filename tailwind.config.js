/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    // "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hospital' : "url('/src/assets/Hospital.png')"
      },
      width: {
        '88': '22.5rem',
      },
      height: {
        '90': '23rem',
      },
      padding: {
        '45': '11.25rem',
        '46' : '11.5rem'
      },
      flexGrow: {
        2: '2'
      },
    },
      colors: {
        'red':  '#8B1A0F',
        'white': '#ffffff',
        'black': '#263238',
        'fullblack': '#000000',
        'darkblue': '#000000D9',
        'darktransparent': '#000000B2',
        'lightwhite': 'rgba(255, 255, 255, 0.7)',
        'lightgrayish': '#D0D5DD',  
        'lightgrey': '#F6F6F6',
        'verylightgray': '#F0F0F0',
        'darkgrey': '#363636',
        'bluegrey': '#64748b',
        'grey': '#D9D9D9',
        'greymercury': '#E7E7E7',
        'orange': '#FF914C',
        'lightorange': '#FF914CB2',
        'silver' : '#E5E5E5',
        'silvergray': '#A5A6A6',
        'teal': '#0A6B77',
      },
    fontFamily: {
      'inter' : ['inter', 'sans-serif'],
      'poppins': ["Poppins", 'sans-serif']
    },
    fontSize: {
      'xl' :'1.25rem',
      '2xl' :'1.3rem',
      '3xl' :'1.5rem',
      '4xl' :'2.25rem',
      '5xl': '2.5rem',
    },
  },
  plugins: [
    // require('flowbite/plugin'),
  ],
}