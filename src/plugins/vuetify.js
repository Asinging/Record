 import Vue from 'vue'
 import Vuetify from 'vuetify'
 import 'vuetify/dist/vuetify.min.css'

 //import 'material-design-icons-iconfont/dist/material-design-icons.css'
 import '@mdi/font/css/materialdesignicons.css'
 import colors from 'vuetify/lib/util/colors'

 // // import { preset } from 'vue-cli-plugin-vuetify-preset-crane/preset'


 Vue.use(Vuetify)

 export default new Vuetify({

   icons: {
     iconfont: 'mdi ',
   },
   theme: {
     themes: {
       light: {

         primary: colors.green.darken1,
         secondary: colors.yellow.darken1,
         tertiary: colors.green.darken1,
         accent: colors.shades.black,
         error: colors.red.accent3,
       },
       dark: {
         primary: colors.orange,

         secondary: colors.orange.lighten3,
       },
       //  dark: {
       //    primary: 'Hotkeys: Alt+X',
       //    secondary: '#ffffff',
       //    // /secondary: '#424242',
       //    accent: '#82B1FF',  xd s,
       //    error: '#FF5252',
       //    info: '#2196F3',
       //    success: '#4CAF50',
       //    warning: '#FFC107'
       //  }

     }
   },



   //  theme: {
   //    dark: true
   //  }
 })