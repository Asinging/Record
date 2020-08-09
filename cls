[33mcommit 14da41d9ce412f71f112614d82662e236d306cc2[m[33m ([m[1;36mHEAD -> [m[1;32mmaster[m[33m)[m
Author: singingsongs <ejesunday2@gmail.com>
Date:   Mon Aug 3 01:17:32 2020 +0100

    set to debugg recordSearchTool

[1mdiff --git a/src/add_delete_leaders.js b/src/add_delete_leaders.js[m
[1mindex e873b4d..ef1f1db 100644[m
[1m--- a/src/add_delete_leaders.js[m
[1m+++ b/src/add_delete_leaders.js[m
[36m@@ -5,7 +5,9 @@[m
 [m
 // ##################################[m
 [m
[31m-[m
[32m+[m[32mimport Vue from "vue"[m
[32m+[m[32mimport VueSweetalert2 from 'vue-sweetalert2';[m
[32m+[m[32mVue.use(VueSweetalert2)[m
 [m
 [m
 export const principalMixin = {[m
[1mdiff --git a/src/components/header.vue b/src/components/header.vue[m
[1mindex f8f2e6d..bf2ab1d 100644[m
[1m--- a/src/components/header.vue[m
[1m+++ b/src/components/header.vue[m
[36m@@ -1,5 +1,5 @@[m
 <template>[m
[31m-  <v-container class="pa-2 ma-3">[m
[32m+[m[32m  <v-container class="pa-2 ma-3 mb-0">[m
     <v-layout>[m
       <v-flex xs12 md12 lg12 xl12>[m
         <v-sheet>[m
[36m@@ -21,7 +21,7 @@[m
             </v-flex>[m
           </v-layout>[m
         </v-sheet>[m
[31m-        <v-divider style="width:100%" class="mb-10 mt-1"></v-divider>[m
[32m+[m[32m        <v-divider style="width:100%" class="mb-1 mt-1"></v-divider>[m
       </v-flex>[m
     </v-layout>[m
   </v-container>[m
[1mdiff --git a/src/main.js b/src/main.js[m
[1mindex d529e0a..5ae6325 100644[m
[1m--- a/src/main.js[m
[1m+++ b/src/main.js[m
[36m@@ -5,6 +5,7 @@[m [mimport App from './App.vue'[m
 import router from './router'[m
 import store from './store'[m
 import $ from "jquery/dist/jquery.js"[m
[32m+[m[32mimport qs from "qs"[m
 [m
 // import io from 'socket.io-client';[m
 // import VueSocketIO from 'vue-socket.io';[m
[36m@@ -19,11 +20,11 @@[m [mimport 'sweetalert2/dist/sweetalert2.min.css';[m
 import VueHtmlToPaper from "vue-html-to-paper";[m
 import printJS from 'print-js';[m
 import Loader from 'vue-loading-overlay'[m
[31m-import Qs from "qs"[m
[32m+[m
 import "vue-loading-overlay/dist/vue-loading.css"[m
 //  export const SocketIo = io.connect('http://localhost:1337')[m
 [m
[31m-Vue.use(Loader)[m
[32m+[m[32mVue.use(VueSweetalert2, Loader)[m
 [m
 new Vue({[m
 [m
[1mdiff --git a/src/views/Records/attendanceRecords/firstTimers.vue b/src/views/Records/attendanceRecords/firstTimers.vue[m
[1mindex 5e394dd..7e62170 100644[m
[1m--- a/src/views/Records/attendanceRecords/firstTimers.vue[m
[1m+++ b/src/views/Records/attendanceRecords/firstTimers.vue[m
[36m@@ -1,17 +1,17 @@[m
 <template>[m
   <v-container>[m
[31m-    <v-layout>[m
[31m-      <SearchContentParams />[m
[32m+[m[32m    <v-layout justify-center>[m
[32m+[m[32m      <v-card class="elevation-0"><SearchContentParams /></v-card>[m
     </v-layout>[m
     <!-- <p>the lord is good</p> -->[m
   </v-container>[m
[31m-</template> [m
[31m-   <script>[m
[32m+[m[32m</template>[m
[32m+[m[32m<script>[m
 import SearchContentParams from "../recordSearchTool.vue";[m
 //import Button from "../../../components/customSlots.vue";[m
 export default {[m
   components: {[m
[31m-    SearchContentParams[m
[32m+[m[32m    SearchContentParams,[m
     // "v-Button": Button[m
   },[m
   data() {[m
[36m@@ -19,7 +19,7 @@[m [mexport default {[m
   },[m
   mounted() {},[m
 [m
[31m-  methods: {}[m
[32m+[m[32m  methods: {},[m
 };[m
[31m-</script> <style scoped>[m
[31m-</style>[m
\ No newline at end of file[m
[32m+[m[32m</script>[m
[32m+[m[32m<style scoped></style>[m
[1mdiff --git a/src/views/Records/attendanceRecords/secondTimers.vue b/src/views/Records/attendanceRecords/secondTimers.vue[m
[1mindex 0682288..b6820cd 100644[m
[1m--- a/src/views/Records/attendanceRecords/secondTimers.vue[m
[1m+++ b/src/views/Records/attendanceRecords/secondTimers.vue[m
[36m@@ -1,25 +1,18 @@[m
 <template>[m
   <v-container>[m
[31m-    <v-card>[m
[31m-      <v-layout>[m
[32m+[m[32m    <v-layout>[m
[32m+[m[32m      <v-card class="elevation-0">[m
         <SearchContentParams />[m
[31m-      </v-layout>[m
[31m-      <v-layout>[m
[31m-        <!-- <v-flex offset-xs7>[m
[31m-          <v-Button :clickFnc="addRecord">[m
[31m-            <template #btn="slotProps">add to record</template>[m
[31m-          </v-Button>[m
[31m-        </v-flex>-->[m
[31m-      </v-layout>[m
[31m-    </v-card>[m
[32m+[m[32m      </v-card>[m
[32m+[m[32m    </v-layout>[m
   </v-container>[m
[31m-</template> [m
[31m- <script>[m
[32m+[m[32m</template>[m
[32m+[m[32m<script>[m
 import SearchContentParams from "../recordSearchTool.vue";[m
 //import Button from "../../../components/customSlots.vue";[m
 export default {[m
   components: {[m
[31m-    SearchContentParams[m
[32m+[m[32m    SearchContentParams,[m
     // "v-Button": Button[m
   },[m
   data() {[m
[36m@@ -35,11 +28,11 @@[m [mexport default {[m
     //     name: "addFinancialRecord"[m
     //   });[m
     // }[m
[31m-  }[m
[32m+[m[32m  },[m
 };[m
 </script>[m
 <style scoped>[m
 .date {[m
   font-size: 50px;[m
 }[m
[31m-</style>[m
\ No newline at end of file[m
[32m+[m[32m</style>[m
[1mdiff --git a/src/views/Records/financialRecords/addFinancialRecord.vue b/src/views/Records/financialRecords/addFinancialRecord.vue[m
[1mindex 54477f4..5e7f407 100644[m
[1m--- a/src/views/Records/financialRecords/addFinancialRecord.vue[m
[1m+++ b/src/views/Records/financialRecords/addFinancialRecord.vue[m
[36m@@ -7,41 +7,59 @@[m
           <v-text-field[m
             label="Offering"[m
             shaped[m
[32m+[m[32m            prepend-inner-icon="mdi-currency-ngn"[m
             auto-grow[m
[32m+[m[32m            :rules="[[m
[32m+[m[32m              () =>[m
[32m+[m[32m                !isNaN(offering) ||[m
[32m+[m[32m                offering.match(/^(\d+,)*\d+$/) ||[m
[32m+[m[32m                'sorry field is expecting number',[m
[32m+[m[32m            ]"[m
             outlined[m
             row-height="15"[m
             v-model="offering"[m
[32m+[m[32m            placeholder="0.000.00"[m
             ref="offering"[m
[31m-            type="number"[m
[31m-            placeholder="N 1000.00"[m
             color="green"[m
           ></v-text-field>[m
         </v-col>[m
         <v-col cols="12" sm="6" lg="4">[m
           <v-text-field[m
[32m+[m[32m            prepend-inner-icon="mdi-currency-ngn"[m
             shaped[m
             auto-grow[m
             outlined[m
[32m+[m[32m            :rules="[[m
[32m+[m[32m              () =>[m
[32m+[m[32m                !isNaN(tithe) ||[m
[32m+[m[32m                tithe.match(/^(\d+,)*\d+$/) ||[m
[32m+[m[32m                'sorry field is expecting number',[m
[32m+[m[32m            ]"[m
             label="Tithe"[m
             row-height="15"[m
             v-model="tithe"[m
             ref="tithe"[m
[31m-            type="number"[m
[31m-            placeholder="N 1000.00"[m
[32m+[m[32m            placeholder="0.000.00"[m
             color="green"[m
           ></v-text-field>[m
         </v-col>[m
         <v-col cols="12" sm="6" lg="4">[m
           <v-text-field[m
[32m+[m[32m            prepend-inner-icon="mdi-currency-ngn"[m
             shaped[m
             auto-grow[m
             outlined[m
             label="ThanksGiving"[m
             row-height="15"[m
[32m+[m[32m            :rules="[[m
[32m+[m[32m              () =>[m
[32m+[m[32m                !isNaN(thanksGiving) ||[m
[32m+[m[32m                thanksGiving.match(/^(\d+,)*\d+$/) ||[m
[32m+[m[32m                'sorry field is expecting number',[m
[32m+[m[32m            ]"[m
             v-model="thanksGiving"[m
             ref="thanksGiving"[m
[31m-            type="number"[m
[31m-            placeholder="N 1000.00"[m
[32m+[m[32m            placeholder="0.000.00"[m
             color="green"[m
           ></v-text-field>[m
         </v-col>[m
[36m@@ -65,12 +83,16 @@[m
       <v-layout>[m
         <v-flex xs12>[m
           <v-Button :clickFnc="cancel">[m
[31m-            <template #btn>cancel</template>[m
[32m+[m[32m            <template #btn[m
[32m+[m[32m              >cancel</template[m
[32m+[m[32m            >[m
           </v-Button>[m
         </v-flex>[m
         <v-flex xs5 offset-lg8 offset-xs1>[m
           <v-Button :clickFnc="submit">[m
[31m-            <template #btn>sumbit</template>[m
[32m+[m[32m            <template #btn[m
[32m+[m[32m              >sumbit</template[m
[32m+[m[32m            >[m
           </v-Button>[m
         </v-flex>[m
       </v-layout>[m
[36m@@ -79,12 +101,26 @@[m
 </template>[m
 <script>[m
 import Button from "../../../components/customSlots.vue";[m
[32m+[m[32mimport qs from "qs";[m
 export default {[m
   components: {[m
[31m-    "v-Button": Button[m
[32m+[m[32m    "v-Button": Button,[m
   },[m
   data() {[m
     return {[m
[32m+[m[32m      commaValue: function numberWithCommas(x) {[m
[32m+[m[32m        let num = parseInt(x);[m
[32m+[m
[32m+[m[32m        if (num) {[m
[32m+[m[32m          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");[m
[32m+[m[32m        } else {[m
[32m+[m[32m          return x;[m
[32m+[m[32m        }[m
[32m+[m[32m      },[m
[32m+[m[32m      formattedInputValue: function convertToNumber(x) {[m
[32m+[m[32m        let inputValue = x.split(",");[m
[32m+[m[32m        return parseInt(inputValue.join(""));[m
[32m+[m[32m      },[m
       slotProps: "",[m
       offering: "",[m
       tithe: "",[m
[36m@@ -93,11 +129,11 @@[m [mexport default {[m
       formHasError: false,[m
       emptyFields: "",[m
 [m
[31m-      sentData: [][m
[32m+[m[32m      sentData: [],[m
     };[m
   },[m
   beforeRouteEnter(to, from, next) {[m
[31m-    next(vm => {[m
[32m+[m[32m    next((vm) => {[m
       from;[m
       vm.prevRoute = from;[m
 [m
[36m@@ -106,32 +142,50 @@[m [mexport default {[m
   },[m
   computed: {[m
     form() {[m
[32m+[m[32m      // let formattedInputValue = split();[m
       return {[m
[31m-        offering: this.offering,[m
[31m-        tithe: this.tithe,[m
[31m-        thanksGiving: this.thanksGiving,[m
[31m-        date: this.date[m
[32m+[m[32m        offering: this.formattedInputValue(this.offering),[m
[32m+[m[32m        tithe: this.formattedInputValue(this.tithe),[m
[32m+[m[32m        thanksGiving: this.formattedInputValue(this.thanksGiving),[m
[32m+[m[32m        date: this.date,[m
       };[m
[31m-    }[m
[32m+[m[32m    },[m
[32m+[m[32m  },[m
[32m+[m[32m  watch: {[m
[32m+[m[32m    offering() {[m
[32m+[m[32m      let num = this.offering.split(",");[m
[32m+[m[32m      this.offering = this.commaValue(num.join(""));[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    tithe() {[m
[32m+[m[32m      let num = this.tithe.split(",");[m
[32m+[m[32m      this.tithe = this.commaValue(num.join(""));[m
[32m+[m[32m    },[m
[32m+[m
[32m+[m[32m    thanksGiving() {[m
[32m+[m[32m      let num = this.thanksGiving.split(",");[m
[32m+[m[32m      this.thanksGiving = this.commaValue(num.join(""));[m
[32m+[m[32m    },[m
   },[m
   methods: {[m
     cancel() {[m
       this.$router.push({[m
         //path: `${this.$store.getters.getFromRoute}`[m
[31m-        name: `${localStorage.getItem("htmlNodeText")}`[m
[32m+[m[32m        name: `${localStorage.getItem("htmlNodeText")}`,[m
       });[m
     },[m
     submit() {[m
[32m+[m[32m      console.log(this);[m
       let obb = {};[m
       this.formHasError == false;[m
       let counter = 0;[m
 [m
[31m-      Object.entries(this.form).forEach(value => {[m
[31m-        // capturing the fields that are not empty and putting the values in a different arr to be sent to the serverss[m
[32m+[m[32m      Object.entries(this.form).forEach((value) => {[m
[32m+[m[32m        // capturing the fields that are not empty and putting the values in a different arr to be sent to the server[m
         if (value) {[m
           for (let i = 0; i <= value.length; i++) {[m
             counter = i + 1;[m
[31m-            // checking for e empty fields[m
[32m+[m[32m            // checking for  empty fields[m
             if (value[counter] && !this.emptyFields) {[m
               this.emptyFields = value[counter];[m
             }[m
[36m@@ -157,24 +211,27 @@[m [mexport default {[m
           }[m
         }[m
       });[m
[31m-[m
[32m+[m[32m      console.log(this.offering);[m
       let dis = this;[m
       if (this.date && (this.offering || this.tithe || this.thanksGiving)) {[m
[32m+[m[32m        let params = {[m
[32m+[m[32m          offering: this.offering,[m
[32m+[m[32m          tithe: this.tithe,[m
[32m+[m[32m          thanksGiving: this.thanksGiving,[m
[32m+[m[32m          date: this.date,[m
[32m+[m[32m        };[m
         axios[m
[31m-          .get("http://localhost:1337/financeRecords/insert", {[m
[31m-            params: {[m
[31m-              offering: this.offering,[m
[31m-              tithe: this.tithe,[m
[31m-              thanksGiving: this.thanksGiving,[m
[31m-              date: this.date[m
[31m-            }[m
[32m+[m[32m          .post("/financeRecords/insert", qs.stringify(params), {[m
[32m+[m[32m            header: {[m
[32m+[m[32m              "Content-type": "application/json",[m
[32m+[m[32m            },[m
           })[m
[31m-          .then(response => {[m
[32m+[m[32m          .then((response) => {[m
             if (response) {[m
               console.log(response);[m
               this.$router.push({[m
                 //path: `${this.$store.getters.getFromRoute}`[m
[31m-                name: localStorage.getItem("htmlNodeText")[m
[32m+[m[32m                name: localStorage.getItem("htmlNodeText"),[m
               });[m
             }[m
           });[m
[36m@@ -184,7 +241,7 @@[m [mexport default {[m
       if (this.date == "") {[m
         this.$swal("date field must not empty");[m
       }[m
[31m-    }[m
[31m-  }[m
[32m+[m[32m    },[m
[32m+[m[32m  },[m
 };[m
[31m-</script>[m
\ No newline at end of file[m
[32m+[m[32m</script>[m
[1mdiff --git a/src/views/Records/financialRecords/financialRecords.vue b/src/views/Records/financialRecords/financialRecords.vue[m
[1mindex 08f98e8..d7bf414 100644[m
[1m--- a/src/views/Records/financialRecords/financialRecords.vue[m
[1m+++ b/src/views/Records/financialRecords/financialRecords.vue[m
[36m@@ -4,22 +4,24 @@[m
       <SearchContentParams />[m
     </v-layout>[m
     <v-layout>[m
[31m-      <div class="flex-grow-1"></div>[m
[31m-      <v-flex md1 sm1 xs1 lg1>[m
[32m+[m[32m      <!-- <div class="flex-grow-1"></div> -->[m
[32m+[m[32m      <v-flex offset-md10 offset-sm9 offset-xs6 offset-lg10>[m
         <v-Button :clickFnc="addRecord">[m
[31m-          <template #btn>add to record</template>[m
[32m+[m[32m          <template #btn[m
[32m+[m[32m            >add to record</template[m
[32m+[m[32m          >[m
         </v-Button>[m
       </v-flex>[m
     </v-layout>[m
   </v-container>[m
[31m-</template> [m
[31m- <script>[m
[32m+[m[32m</template>[m
[32m+[m[32m<script>[m
 import SearchContentParams from "../recordSearchTool.vue";[m
 import Button from "../../../components/customSlots.vue";[m
 export default {[m
   components: {[m
     SearchContentParams,[m
[31m-    "v-Button": Button[m
[32m+[m[32m    "v-Button": Button,[m
   },[m
   data() {[m
     return {};[m
[36m@@ -31,14 +33,14 @@[m [mexport default {[m
   methods: {[m
     addRecord() {[m
       this.$router.push({[m
[31m-        name: "addFinancialRecord"[m
[32m+[m[32m        name: "addFinancialRecord",[m
       });[m
[31m-    }[m
[31m-  }[m
[32m+[m[32m    },[m
[32m+[m[32m  },[m
 };[m
 </script>[m
 <style scoped>[m
 .date {[m
   font-size: 50px;[m
 }[m
[31m-</style>[m
\ No newline at end of file[m
[32m+[m[32m</style>[m
[1mdiff --git a/src/views/Records/recordSearchTool.vue b/src/views/Records/recordSearchTool.vue[m
[1mindex 90c74ef..37897d8 100644[m
[1m--- a/src/views/Records/recordSearchTool.vue[m
[1m+++ b/src/views/Records/recordSearchTool.vue[m
[36m@@ -1,190 +1,212 @@[m
 <template>[m
[31m-  <v-layout>[m
[31m-    <v-flex>[m
[31m-      <span>{{ formattedHtmlNodeText }}</span>[m
[31m-      <v-row>[m
[31m-        <!-- calender Start here -->[m
[31m-[m
[31m-        <v-col cols="12" v-if="calender">[m
[31m-          <v-col ols="12" xs="12" sm="12" md="6" lg="4" xl="3">[m
[31m-            <v-date-picker[m
[31m-              v-model="dates"[m
[31m-              multiple[m
[31m-              color="orange"[m
[31m-              class="flat"[m
[31m-              elevation-0[m
[32m+[m[32m  <v-container class="ma-0">[m
[32m+[m[32m    <!-- <v-layout>[m
[32m+[m[32m    <v-flex> -->[m
[32m+[m[32m    <v-row justify-center ma-0 transition="fab-transition">[m
[32m+[m[32m      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">[m
[32m+[m[32m        <v-card class="elevation-0 pa-1">[m
[32m+[m[32m          <v-row justify-center[m
[32m+[m[32m            ><v-col cols="12" xl="4" lg="12">[m
[32m+[m[32m              <v-card[m
[32m+[m[32m                class=" elevation-0 ma-5 orange--text  text-center text-lg-h1 justify-center"[m
[32m+[m[32m                style="font-size:35px; font-family:aurial"[m
[32m+[m[32m                >{{ formattedHtmlNodeText }}</v-card[m
[32m+[m[32m              ></v-col[m
             >[m
[31m-              <v-btn text color="orange" @click="cancel">Cancel</v-btn>[m
[31m-              <div class="flex-grow-1"></div>[m
[31m-              <v-btn text color="orange" @click="sumbitDates">Sumbit</v-btn>[m
[31m-            </v-date-picker>[m
[31m-          </v-col>[m
[31m-          <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="3">[m
[31m-            <v-menu[m
[31m-              ref="menu"[m
[31m-              v-model="menu"[m
[31m-              :close-on-content-click="false"[m
[31m-              :return-value.sync="dates"[m
[31m-              transition="scale-transition"[m
[31m-              offset-y[m
[31m-              min-width="290px"[m
[31m-            >[m
[31m-              <template v-slot:activator="{ on, attrs }">[m
[31m-                <v-combobox[m
[32m+[m[32m          </v-row>[m
[32m+[m
[32m+[m[32m          <v-row>[m
[32m+[m[32m            <!-- calender Start here -->[m
[32m+[m
[32m+[m[32m            <v-col cols="12" v-if="calender">[m
[32m+[m[32m              <v-col cols="12" xs="12" sm="12" md="5" lg="6" xl="3">[m
[32m+[m[32m                <v-date-picker[m
                   v-model="dates"[m
                   multiple[m
[31m-                  chips[m
[31m-                  small-chips[m
[31m-                  label="Selected Dates"[m
[31m-                  readonly[m
[31m-                  v-bind="attrs"[m
[31m-                  v-on="on"[m
[31m-                ></v-combobox>[m
[31m-              </template>[m
[31m-            </v-menu>[m
[31m-          </v-col>[m
[31m-        </v-col>[m
[31m-        <!-- spnner loader card starts from here -->[m
[31m-        <v-col cols="12" v-else-if="spinnerLoader">[m
[31m-          <div class="flex-grow-1"></div>[m
[31m-          <v-card[m
[31m-            height="120"[m
[31m-            v-bind:style="{[m
[31m-              backgroundColor: color[Math.floor(Math.random() * color.length)],[m
[31m-            }"[m
[31m-          >[m
[31m-            <v-p class="ma-5 white--text justify-center">[m
[31m-              please wait[m
[31m-              <v-progress-circular[m
[31m-                :size="40"[m
[31m-                class="white--text ma-5 justify-center"[m
[31m-                color="white"[m
[31m-                indeterminate[m
[31m-              ></v-progress-circular>[m
[31m-            </v-p>[m
[31m-          </v-card>[m
[31m-        </v-col>[m
[31m-[m
[31m-        <!-- today's search start here -->[m
[31m-[m
[31m-        <!-- custom search start here -->[m
[31m-[m
[31m-        <v-col cols="12" v-else>[m
[31m-          <v-card[m
[31m-            v-bind:style="{[m
[31m-              backgroundColor: color[Math.floor(Math.random() * color.length)],[m
[31m-            }"[m
[31m-          >[m
[31m-            <v-card-title v-if="flag" class="white--text pd-4"[m
[31m-              >See Birthday range</v-card-title[m
[31m-            >[m
[31m-            <v-card-title v-else class="white--text pd-4"[m
[31m-              >Custom Search</v-card-title[m
[31m-            >[m
[31m-[m
[31m-            <v-card-subtitle class="white--text ma-5"[m
[31m-              >This Allows You search for a desire dates</v-card-subtitle[m
[32m+[m[32m                  color="primary"[m
[32m+[m[32m                  class="elevation-1"[m
[32m+[m[32m                >[m
[32m+[m[32m                  <v-btn text color="primary" @click="cancel">Cancel</v-btn>[m
[32m+[m[32m                  <div class="flex-grow-1"></div>[m
[32m+[m[32m                  <v-btn text color="primary" @click="sumbitDates"[m
[32m+[m[32m                    >Sumbit</v-btn[m
[32m+[m[32m                  >[m
[32m+[m[32m                </v-date-picker>[m
[32m+[m[32m              </v-col>[m
[32m+[m[32m              <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="3">[m
[32m+[m[32m                <v-menu[m
[32m+[m[32m                  ref="menu"[m
[32m+[m[32m                  v-model="menu"[m
[32m+[m[32m                  :close-on-content-click="false"[m
[32m+[m[32m                  :return-value.sync="dates"[m
[32m+[m[32m                  transition="scale-transition"[m
[32m+[m[32m                  offset-y[m
[32m+[m[32m                  min-width="290px"[m
[32m+[m[32m                >[m
[32m+[m[32m                  <template v-slot:activator="{ on, attrs }">[m
[32m+[m[32m                    <v-combobox[m
[32m+[m[32m                      v-model="dates"[m
[32m+[m[32m                      multiple[m
[32m+[m[32m                      chips[m
[32m+[m[32m                      small-chips[m
[32m+[m[32m                      label="Selected Dates"[m
[32m+[m[32m                      readonly[m
[32m+[m[32m                      v-bind="attrs"[m
[32m+[m[32m                      v-on="on"[m
[32m+[m[32m                    ></v-combobox>[m
[32m+[m[32m                  </template>[m
[32m+[m[32m                </v-menu>[m
[32m+[m[32m              </v-col>[m
[32m+[m[32m            </v-col>[m
[32m+[m[32m            <!-- spnner loader card starts from here -->[m
[32m+[m[32m            <v-col[m
[32m+[m[32m              cols="12"[m
[32m+[m[32m              xs="12"[m
[32m+[m[32m              sm="12"[m
[32m+[m[32m              md="6"[m
[32m+[m[32m              lg="4"[m
[32m+[m[32m              xl="3"[m
[32m+[m[32m              v-else-if="spinnerLoader"[m
             >[m
[31m-[m
[31m-            <v-card-actions class="justify-end">[m
[31m-              <v-btn[m
[31m-                text[m
[31m-                class="white--text pd-3"[m
[31m-                id="custom_search"[m
[31m-                @click="requestData($event)"[m
[31m-                >details</v-btn[m
[32m+[m[32m              <div class="flex-grow-1"></div>[m
[32m+[m[32m              <v-card[m
[32m+[m[32m                height="120"[m
[32m+[m[32m                v-bind:style="{[m
[32m+[m[32m                  backgroundColor:[m
[32m+[m[32m                    color[Math.floor(Math.random() * color.length)],[m
[32m+[m[32m                }"[m
               >[m
[31m-            </v-card-actions>[m
[31m-          </v-card>[m
[31m-        </v-col>[m
[31m-[m
[31m-        <!-- this Week search -->[m
[31m-[m
[31m-        <v-col cols="12">[m
[31m-          <v-card[m
[31m-            v-bind:style="{[m
[31m-              backgroundColor: color[Math.floor(Math.random() * color.length)],[m
[31m-            }"[m
[31m-          >[m
[31m-            <v-card-title class="headline white--text">This Week</v-card-title>[m
[31m-[m
[31m-            <v-card-subtitle class="white--text ma-5"[m
[31m-              >You Can Pull Entry Just For This Week</v-card-subtitle[m
[31m-            >[m
[31m-[m
[31m-            <v-card-actions class="justify-end">[m
[31m-              <v-btn[m
[31m-                text[m
[31m-                class="white--text pd-3"[m
[31m-                id="this_week"[m
[31m-                @click="requestData($event)"[m
[31m-                >details</v-btn[m
[32m+[m[32m                <v-p class="ma-5 white--text justify-center">[m
[32m+[m[32m                  please wait[m
[32m+[m[32m                  <v-progress-circular[m
[32m+[m[32m                    :size="40"[m
[32m+[m[32m                    class="white--text ma-5 justify-center"[m
[32m+[m[32m                    color="white"[m
[32m+[m[32m                    indeterminate[m
[32m+[m[32m                  ></v-progress-circular>[m
[32m+[m[32m                </v-p>[m
[32m+[m[32m              </v-card>[m
[32m+[m[32m            </v-col>[m
[32m+[m
[32m+[m[32m            <!-- today's search start here -->[m
[32m+[m
[32m+[m[32m            <!-- custom search start here -->[m
[32m+[m
[32m+[m[32m            <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="3" v-else>[m
[32m+[m[32m              <v-card[m
[32m+[m[32m                class="pa-3"[m
[32m+[m[32m                v-bind:style="{[m
[32m+[m[32m                  backgroundColor:[m
[32m+[m[32m                    color[Math.floor(Math.random() * color.length)],[m
[32m+[m[32m                }"[m
               >[m
[31m-            </v-card-actions>[m
[31m-          </v-card>[m
[31m-        </v-col>[m
[31m-[m
[31m-        <!-- this month Start here -->[m
[31m-[m
[31m-        <v-col cols="12" md="12">[m
[31m-          <v-card[m
[31m-            v-bind:style="{[m
[31m-              backgroundColor: color[Math.floor(Math.random() * color.length)],[m
[31m-            }"[m
[31m-            class="white--text pd-3"[m
[31m-          >[m
[31m-            <v-card-title class="headline">This Month</v-card-title>[m
[31m-[m
[31m-            <v-card-subtitle class="white--text ma-5"[m
[31m-              >The Month Entries Can Be Requsted</v-card-subtitle[m
[31m-            >[m
[31m-[m
[31m-            <v-card-actions class="justify-end">[m
[31m-              <v-btn[m
[31m-                text[m
[31m-                class="white--text pd-3"[m
[31m-                id="this_month"[m
[31m-                @click="requestData($event)"[m
[31m-                >details</v-btn[m
[32m+[m[32m                <v-card-title v-if="flag" class="white--text pd-4"[m
[32m+[m[32m                  >See Birthday range</v-card-title[m
[32m+[m[32m                >[m
[32m+[m[32m                <v-card-title v-else class="white--text pd-4"[m
[32m+[m[32m                  >Custom Search</v-card-title[m
[32m+[m[32m                >[m
[32m+[m
[32m+[m[32m                <v-card-actions class="justify-end">[m
[32m+[m[32m                  <v-btn[m
[32m+[m[32m                    text[m
[32m+[m[32m                    class="white--text pd-3"[m
[32m+[m[32m                    id="custom_search"[m
[32m+[m[32m                    @click="requestData($event)"[m
[32m+[m[32m                    >details</v-btn[m
[32m+[m[32m                  >[m
[32m+[m[32m                </v-card-actions>[m
[32m+[m[32m              </v-card>[m
[32m+[m[32m            </v-col>[m
[32m+[m
[32m+[m[32m            <!-- this Week search -->[m
[32m+[m
[32m+[m[32m            <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="3">[m
[32m+[m[32m              <v-card[m
[32m+[m[32m                class="pa-3"[m
[32m+[m[32m                v-bind:style="{[m
[32m+[m[32m                  backgroundColor:[m
[32m+[m[32m                    color[Math.floor(Math.random() * color.length)],[m
[32m+[m[32m                }"[m
               >[m
[31m-            </v-card-actions>[m
[31m-          </v-card>[m
[31m-        </v-col>[m
[31m-[m
[31m-        <!-- this year start -->[m
[31m-[m
[31m-        <v-col cols="12">[m
[31m-          <v-card[m
[31m-            v-if="!flag"[m
[31m-            v-bind:style="{[m
[31m-              backgroundColor: color[Math.floor(Math.random() * color.length)],[m
[31m-            }"[m
[31m-          >[m
[31m-            <v-card-title class="white--text pd-3">[m
[31m-              This Year{{ color[Math.floor(Math.random() * color.length)] }}[m
[31m-            </v-card-title>[m
[31m-[m
[31m-            <v-card-subtitle class="white--text ma-5"[m
[31m-              >The Entire Year Entries Can also Be Search</v-card-subtitle[m
[31m-            >[m
[31m-[m
[31m-            <v-card-actions class="justify-end">[m
[31m-              <v-btn[m
[31m-                text[m
[31m-                class="white--text pd-3"[m
[31m-                id="this_year"[m
[31m-                @click="requestData($event)"[m
[31m-                >see more</v-btn[m
[32m+[m[32m                <v-card-title class="headline white--text"[m
[32m+[m[32m                  >This Week</v-card-title[m
[32m+[m[32m                >[m
[32m+[m
[32m+[m[32m                <v-card-actions class="justify-end">[m
[32m+[m[32m                  <v-btn[m
[32m+[m[32m                    text[m
[32m+[m[32m                    class="white--text pd-3"[m
[32m+[m[32m                    id="this_week"[m
[32m+[m[32m                    @click="requestData($event)"[m
[32m+[m[32m                    >details</v-btn[m
[32m+[m[32m                  >[m
[32m+[m[32m                </v-card-actions>[m
[32m+[m[32m              </v-card>[m
[32m+[m[32m            </v-col>[m
[32m+[m
[32m+[m[32m            <!-- this month Start here -->[m
[32m+[m
[32m+[m[32m            <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="3">[m
[32m+[m[32m              <v-card[m
[32m+[m[32m                v-bind:style="{[m
[32m+[m[32m                  backgroundColor:[m
[32m+[m[32m                    color[Math.floor(Math.random() * color.length)],[m
[32m+[m[32m                }"[m
[32m+[m[32m                class="white--text  pa-3"[m
               >[m
[31m-            </v-card-actions>[m
[31m-          </v-card>[m
[31m-        </v-col>[m
[31m-      </v-row>[m
[31m-    </v-flex>[m
[31m-  </v-layout>[m
[32m+[m[32m                <v-card-title class="headline">This Month</v-card-title>[m
[32m+[m
[32m+[m[32m                <v-card-actions class="justify-end">[m
[32m+[m[32m                  <v-btn[m
[32m+[m[32m                    text[m
[32m+[m[32m                    class="white--text pd-3"[m
[32m+[m[32m                    id="this_month"[m
[32m+[m[32m                    @click="requestData($event)"[m
[32m+[m[32m                    >details</v-btn[m
[32m+[m[32m                  >[m
[32m+[m[32m                </v-card-actions>[m
[32m+[m[32m              </v-card>[m
[32m+[m[32m            </v-col>[m
[32m+[m
[32m+[m[32m            <!-- this year start -->[m
[32m+[m
[32m+[m[32m            <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="3">[m
[32m+[m[32m              <v-card[m
[32m+[m[32m                class="pa-3"[m
[32m+[m[32m                v-if="!flag"[m
[32m+[m[32m                v-bind:style="{[m
[32m+[m[32m                  backgroundColor:[m
[32m+[m[32m                    color[Math.floor(Math.random() * color.length)],[m
[32m+[m[32m                }"[m
[32m+[m[32m              >[m
[32m+[m[32m                <v-card-title class="white--text pd-3">[m
[32m+[m[32m                  This Year{{ color[Math.floor(Math.random() * color.length)] }}[m
[32m+[m[32m                </v-card-title>[m
[32m+[m
[32m+[m[32m                <v-card-actions class="justify-end">[m
[32m+[m[32m                  <v-btn[m
[32m+[m[32m                    text[m
[32m+[m[32m                    class="white--text pd-3"[m
[32m+[m[32m                    id="this_year"[m
[32m+[m[32m                    @click="requestData($event)"[m
[32m+[m[32m                    >see more</v-btn[m
[32m+[m[32m                  >[m
[32m+[m[32m                </v-card-actions>[m
[32m+[m[32m              </v-card>[m
[32m+[m[32m            </v-col>[m
[32m+[m[32m          </v-row></v-card[m
[32m+[m[32m        >[m
[32m+[m[32m      </v-col>[m
[32m+[m[32m    </v-row>[m
[32m+[m
[32m+[m[32m    <!-- </v-flex>[m
[32m+[m[32m  </v-layout> -->[m
[32m+[m[32m  </v-container>[m
 </template>[m
[31m-<style scoped></style[m
[31m-><script>[m
[32m+[m[32m<style scoped></style>[m
[32m+[m[32m<script>[m
[32m+[m[32mimport qs from "qs";[m
 export default {[m
   data() {[m
     return {[m
[36m@@ -194,7 +216,7 @@[m [mexport default {[m
       dates: [],[m
       spinnerLoader: false,[m
       formattedHtmlNodeText: "",[m
[31m-      htmlElementFromPreviousClick: "",[m
[32m+[m[32m      innerHtmlElementFromPreviousClick: "",[m
       serverResponse: [],[m
       calender: false,[m
       backgroundColor: "",[m
[36m@@ -212,7 +234,9 @@[m [mexport default {[m
     };[m
   },[m
   mounted() {[m
[31m-    this.htmlElementFromPreviousClick = localStorage.getItem("htmlNodeText");[m
[32m+[m[32m    this.innerHtmlElementFromPreviousClick = localStorage.getItem([m
[32m+[m[32m      "htmlNodeText"[m
[32m+[m[32m    );[m
     this.formattedHtmlNodeText = localStorage.getItem("formattedHtmlNodeText"); // differentiates it from the htmlNOdeText string with no space[m
     if (this.formattedHtmlNodeText == "Birthdays") {[m
       this.flag = true;[m
[36m@@ -231,7 +255,7 @@[m [mexport default {[m
     sumbitDates() {[m
       // console.log(this.htmlNodeText);[m
       this.calender = true;[m
[31m-      // let htmlElementFromPreviousClick = this.htmlElementFromPreviousClick;[m
[32m+[m[32m      // let innerHtmlElementFromPreviousClick = this.innerHtmlElementFromPreviousClick;[m
 [m
       if (this.dates.length != 2) {[m
         this.$swal("pls select two different Date");[m
[36m@@ -251,40 +275,55 @@[m [mexport default {[m
         let [date_1, date_2] = newDates;[m
 [m
         var dis = this;[m
[32m+[m
         axios[m
[31m-          .get("http://localhost:1337/" + dis.htmlElementFromPreviousClick, {[m
[31m-            params: {[m
[31m-              record: innerHtmlClicked,[m
[31m-              date_1: date_1,[m
[31m-              date_2: date_2,[m
[32m+[m[32m          .get([m
[32m+[m[32m            "/" + dis.innerHtmlElementFromPreviousClick,[m
[32m+[m[32m            {[m
[32m+[m[32m              params: {[m
[32m+[m[32m                record: innerHtmlClicked,[m
[32m+[m[32m                date_1: date_1,[m
[32m+[m[32m                date_2: date_2,[m
[32m+[m[32m              },[m
             },[m
[31m-          })[m
[32m+[m[32m            {[m
[32m+[m[32m              header: {[m
[32m+[m[32m                "Content-type": "application/json",[m
[32m+[m[32m              },[m
[32m+[m[32m            }[m
[32m+[m[32m          )[m
           .then((resp) => {[m
             let response = resp.data;[m
[31m-            //console.log(response);[m
             if (response.length == []) {[m
[31m-              this.spinnerLoader = true;[m
[32m+[m[32m              this.spinnerLoader = true; //bring loader here[m
             } else if (response.length) {[m
               if ([m
[31m-                this.htmlElementFromPreviousClick == "secondTimers" ||[m
[31m-                this.htmlElementFromPreviousClick == "secondTimers"[m
[32m+[m[32m                this.innerHtmlElementFromPreviousClick == "firstTimers" ||[m
[32m+[m[32m                this.innerHtmlElementFromPreviousClick == "secondTimers"[m
               ) {[m
[31m-                this.$store.dispatch("searchedServerResponse", response);[m
[32m+[m[32m                this.$store.dispatch("serverResponse", response);[m
 [m
                 this.$router.push({[m
                   name: "displayMembers",[m
                 });[m
[31m-              } else if (this.htmlElementFromPreviousClick) {[m
[31m-                this.$store.dispatch("searchedServerResponse", response);[m
[32m+[m[32m              } else if ([m
[32m+[m[32m                this.innerHtmlElementFromPreviousClick == "Birthdays"[m
[32m+[m[32m              ) {[m
[32m+[m[32m                this.$store.dispatch("serverResponse", response);[m
 [m
                 this.$router.push({[m
                   name: "displayBirthdays",[m
                 });[m
[32m+[m
[32m+[m[32m                // finacial search goes here[m
               } else {[m
[32m+[m[32m                //console.log(response);[m
                 for (let j of response) {[m
                   let total = 0;[m
                   Object.values(j).forEach((val) => {[m
[32m+[m[32m                    console.log(val)[m
                     if (!isNaN(val)) {[m
[32m+[m[41m                      [m
                       // id is also getting appended[m
                       total += val;[m
                     }[m
[36m@@ -294,7 +333,7 @@[m [mexport default {[m
                   dis.serverResponse.push(j);[m
                 }[m
                 //console.log(dis.serverResponse);[m
[31m-                this.$store.dispatch("searchedServerResponse", response);[m
[32m+[m[32m                this.$store.dispatch("serverResponse", response);[m
                 this.loading = false;[m
                 this.$router.push({[m
                   name: "displayFinancialSearch",[m
[36m@@ -309,8 +348,8 @@[m [mexport default {[m
     },[m
     requestData() {[m
       this.spinnerLoader = false;[m
[31m-      if (this.htmlElementFromPreviousClick == "financialRecords") {[m
[31m-        this.htmlElementFromPreviousClick = `financialRecords/select`;[m
[32m+[m[32m      if (this.innerHtmlElementFromPreviousClick == "financialRecords") {[m
[32m+[m[32m        this.innerHtmlElementFromPreviousClick = "financialRecords/select";[m
       }[m
 [m
       this.innerHtmlClicked = event.target.parentElement.id;[m
[36m@@ -323,12 +362,20 @@[m [mexport default {[m
       } else {[m
         this.calender = false;[m
         var dis = this;[m
[32m+[m[32m        console.log(innerHtmlClicked);[m
[32m+[m
         axios[m
[31m-          .get("http://localhost:1337/" + dis.htmlElementFromPreviousClick, {[m
[31m-            params: {[m
[31m-              record: innerHtmlClicked,[m
[32m+[m[32m          .get([m
[32m+[m[32m            "/" + dis.innerHtmlElementFromPreviousClick,[m
[32m+[m[32m            {[m
[32m+[m[32m              params: {[m
[32m+[m[32m                record: innerHtmlClicked,[m
[32m+[m[32m              },[m
             },[m
[31m-          })[m
[32m+[m[32m            {[m
[32m+[m[32m              header: { "Content-type": "application/json" },[m
[32m+[m[32m            }[m
[32m+[m[32m          )[m
           .then((resp) => {[m
             let response = resp.data;[m
 [m
[36m@@ -338,14 +385,11 @@[m [mexport default {[m
               });[m
             } else if (response.length) {[m
               if (this.formattedHtmlNodeText) {[m
[31m-                console.log("this is it");[m
                 this.$router.push({[m
                   name: "displayBirthdays",[m
                 });[m
[31m-                this.$store.dispatch("searchedServerResponse", response);[m
[32m+[m[32m                this.$store.dispatch("serverResponse", response);[m
               } else {[m
[31m-                console.log(this.formattedHtmlNodeText);[m
[31m-                console.log("this is it");[m
                 for (let j of response) {[m
                   let total = 0;[m
                   Object.values(j).forEach((val) => {[m
[36m@@ -359,7 +403,7 @@[m [mexport default {[m
                   dis.serverResponse.push(j);[m
                 }[m
                 //console.log(dis.serverResponse);[m
[31m-                this.$store.dispatch("searchedServerResponse", response);[m
[32m+[m[32m                this.$store.dispatch("serverResponse", response);[m
 [m
                 this.$router.push({[m
                   name: "displaySearch",[m
[1mdiff --git a/src/views/authentication/login.vue b/src/views/authentication/login.vue[m
[1mindex 2cfbb9f..0436e8e 100644[m
[1m--- a/src/views/authentication/login.vue[m
[1m+++ b/src/views/authentication/login.vue[m
[36m@@ -122,12 +122,13 @@[m
 <script>[m
 import { eventBus } from "../../events.js";[m
 import Buttons from "../../components/customSlots.vue";[m
[31m-import Vue from "vue";[m
[32m+[m
 // import Loading from "vue-loading-overlay";[m
 // import Vue from "vue";[m
 //Vue.use(Loading);[m
[31m-import VueSweetalert2 from "vue-sweetalert2";[m
[31m-Vue.use(VueSweetalert2);[m
[32m+[m[32mimport Vue from "vue";[m
[32m+[m[32mimport Loader from "vue-loading-overlay";[m
[32m+[m[32mVue.use(Loader);[m
 [m
 export default {[m
   components: {[m
[1mdiff --git a/src/views/authentication/signUp.vue b/src/views/authentication/signUp.vue[m
[1mindex a313c09..160910b 100644[m
[1m--- a/src/views/authentication/signUp.vue[m
[1m+++ b/src/views/authentication/signUp.vue[m
[36m@@ -125,8 +125,8 @@[m
 <script>[m
 import AddDeleteCustomButton from "../../components/customSlots.vue";[m
 import Vue from "vue";[m
[31m-import VueSweetalert2 from "vue-sweetalert2";[m
[31m-Vue.use(VueSweetalert2);[m
[32m+[m[32mimport Loader from "vue-loading-overlay";[m
[32m+[m[32mVue.use(Loader);[m
 //import SubmitButtons from "../../components/submissionButtons.vue";[m
 export default {[m
   components: {[m
[1mdiff --git a/src/views/setupPage/recordSetup.vue b/src/views/setupPage/recordSetup.vue[m
[1mindex 46fe650..c884d31 100644[m
[1m--- a/src/views/setupPage/recordSetup.vue[m
[1m+++ b/src/views/setupPage/recordSetup.vue[m
[36m@@ -120,8 +120,8 @@[m [mimport qs from "qs";[m
 [m
 import AddDeleteCustomButton from "../../components/customSlots.vue";[m
 import Vue from "vue";[m
[31m-import VueSweetalert2 from "vue-sweetalert2";[m
[31m-Vue.use(VueSweetalert2);[m
[32m+[m[32mimport Loader from "vue-loading-overlay";[m
[32m+[m[32mVue.use(Loader);[m
 //import SubmitButtons from "../../components/submissionButtons.vue";[m
 export default {[m
   components: {[m
[36m@@ -226,7 +226,7 @@[m [mexport default {[m
 [m
             {[m
               header: {[m
[31m-                "Content-Type": "multipart/form-data",[m
[32m+[m[32m                "content-Type": "multipart/form-data",[m
               },[m
             }[m
           )[m
