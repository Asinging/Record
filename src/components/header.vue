<template>
  <div id="inpired">
    <v-navigation-drawer app v-model="drawer" temporary width="280">
      <template v-slot:prepend>
        <v-layout>
          <v-flex offset-xs1></v-flex>
          <div class="mt-3">
            <img src="img/devImages/newKmiP.jpg" height="90" width="80" />
          </div>

          <!-- <v-spacer></v-spacer> -->
          <v-list-item class="ma-12 mb-4 pr-3">
            <v-list-item-content>
              <v-list-item-title class="side_bar_title">RECORD'S HANDY</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-layout>
      </template>

      <v-divider></v-divider>

      <v-list dense shaped>
        <v-list-item @click="drawer = !drawer">
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="subtitle-1 side_bar_item" @click="routerLink($event)">Home</v-list-item-title>
        </v-list-item>

        <!-- the leadership column starts here -->

        <v-list-group prepend-icon="person" value="first" v-model="leadership">
          <template v-slot:activator>
            <v-list-item-title
              class="subtitle-1 side_bar_item"
              @click="runFnc(leadership)"
            >Leadership</v-list-item-title>
          </template>
          <!-- <divider></divider> -->

          <!-- <v-list-item v-for="(item, pastor) in leadershipRecords" :key="pastor" @click="routerLink($event)">
            <v-list-item-content>
              <v-list-item-title @click="routerLink($event)" >item.leader</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon color="green">item.icon</v-icon>
            </v-list-item-icon>
          </v-list-item>-->
          <v-list-item
            v-for="(item, pastor) in leadershipRecords"
            :key="pastor"
            @click="routerLink($event)"
          >
            <v-list-item-content>
              <v-list-item-title color="green" ref="item">{{item.leader}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon color="green">{{item.icon}}</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <!-- <v-list-item @click>
            <v-list-item-content>
              <v-list-item-title @click="routerLink($event)" ref="Ministers">Ministers</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon color="green">mdi mdi-account-child</v-icon>
            </v-list-item-icon>
          </v-list-item>
          <v-list-item @click>
            <v-list-item-content>
              <v-list-item-title
                @click="routerLink($event)"
                ref="headOfDepartments"
              >head of Departments</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon color="green">mdi mdi-account-group</v-icon>
            </v-list-item-icon>
          </v-list-item>-->
        </v-list-group>
        <template v-if="leadership">
          <v-divider></v-divider>
        </template>
        <!-- the leadership column starts here -->

        <!-- the records column starts here -->

        <v-list-group prepend-icon="mdi mdi-animation-outline" value="test" v-model="records">
          <template v-slot:activator>
            <v-list-item-title class="subtitle-1 side_bar_item" @click="runFnc(records)">Records</v-list-item-title>
          </template>

          <v-list-group sub-group value="true" v-model="finances">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title @click="runfnc=(finances)">Financial record</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(item, kk) in financialRecords"
              :key="kk"
              @click="routerLink($event)"
            >
              <v-list-item-content>
                <v-list-item-title color="green">{{ item.giving }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon color="green">{{ item.icon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <template v-if="finances">
            <v-divider></v-divider>
          </template>

          <v-list-group sub-group value="tet" v-model="attendance">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title @click="runFnc(attendance)">Attendance Record</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item
              v-for="(item, kk) in attendanceRecords"
              :key="kk"
              @click="routerLink($event)"
            >
              <v-list-item-content>
                <v-list-item-title color="green">{{item.timers}}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon color="green">{{item.icon}}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <template v-if="attendance">
            <v-divider></v-divider>
          </template>

          <v-list-group sub-group value="test" v-model="members">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title @click="runFnc(members)">Members Records</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(item, kk) in membership" :key="kk" @click="routerLink($event)">
              <v-list-item-content>
                <v-list-item-title color="green">{{item.comers}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon color="green">{{ item.icon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
        <template v-if="records">
          <v-divider></v-divider>
        </template>
        <!-- the records column stop here -->
        <!-- the calender column start here -->
        <v-list-item @click="false">
          <v-list-item-icon>
            <v-icon>mdi-calendar-month</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="subtitle-1">Calendar</v-list-item-title>
        </v-list-item>
        <!-- the calender column stops -->
        <!-- the events column stops here -->
        <v-list-group prepend-icon="mdi mdi-animation" color="yellow" value="true" v-model="events">
          <template v-slot:activator>
            <v-list-item-title class="subtitle-1" @click="runFnc(events)">Events</v-list-item-title>
          </template>
          <v-list-item @click="routerLink($event)">
            <v-list-item-icon>
              <v-icon color="green">event</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Birthdays</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <!-- the events column stops here -->
      </v-list>
    </v-navigation-drawer>

    <!-- toolbar -->
    <v-card>
      <v-toolbar color="orange" text dense height="85" flat fixed>
        <v-app-bar-nav-icon @click.stop="drawer =!drawer" color="white"></v-app-bar-nav-icon>
        <!-- ? <template v-slot:prepend></template> -->
        <v-toolbar-title class="white-=text text-center">
          <span class="white--text header" bold>KMI UNICAL</span>
        </v-toolbar-title>
        <div class="flex-grow-1"></div>

        <!-- sign up  -->

        <v-flex xs2 sm2 lg1>
          <v-layout>
            <v-row>
              <v-icon class color="white" ripple="6">person</v-icon>
              <router-link to="/login" id="login">
                <v-card class="white--text ml-2" outlined id="login" color="orange" ripple>login</v-card>
              </router-link>
            </v-row>
          </v-layout>
        </v-flex>
      </v-toolbar>
    </v-card>

    <!-- header 2  -->

    <v-layout>
      <v-flex xs12 md12 lg12>
        <v-sheet class="align-content-center mt-0 pt-5" height="100">
          <v-layout>
            <v-flex xs6 md4 lg6>
              <i class="mt-3 pa-2" width="10" color="orange">
                <img src="img/devImages/newKmiP.jpg" height="55" width="50" />
              </i>
            </v-flex>

            <v-flex xs12 md4 lg8>
              <span
                class="pa-0 mb-1"
                color="orange--text"
                style="color:#436609; font-family:verdana; padding-right:20px; font-weight:bold; font-size:15px"
              >
                KINGDOM MOVEMENT
                <p
                  style="color:#436609; font-family:verdana;  font-weight:bold; font-size:15px; padding-left:20px"
                >INTERNATIONAL</p>
              </span>
            </v-flex>
          </v-layout>
        </v-sheet>
      </v-flex>
    </v-layout>
  </div>

  <!-- body of the wepbage define here -->
</template>
<style scoped>
.card_title {
  font-size: 20px;
  font-weight: bold;
  font-family: helvetica;
  color: #436609;
}
.card_action {
  font-family: helvetica;
  font-weight: bold;
  padding: 3px !important;
}
#login {
  padding: 0px;
  border-width: 0px;
  text-decoration: none;
  margin-top: 0px;
  margin-left: 0px;
  text-decoration: none;
  font-size: 20px;
}
.header {
  font-family: helvetica;
  font-weight: bold;
}
.side_bar_title {
  font-family: helvetica;
}
.side_bar_item {
  font-family: helvetica;
}
.anchors {
  text-decoration: none;
  color: black;
}
</style>

<script>
//import HomePage from "./homePage.vue";
import { concatInnerHtml } from "../helper.js";
import { stringManipulation } from "../string_manipulation.js";
export default {
  mixins: [stringManipulation],
  components: {
    //HomePage
  },
  data() {
    return {
      rout: "",
      drawer: true,
      listGroup: 0,
      // test1: true,
      leadership: false,
      records: false,
      attendance: false,
      events: false,
      members: false,
      finances: false,
      home: false,

      htmlElement: "",

      leadershipRecords: [
        { icon: "mdi mdi-account-tie", leader: "Pastors" },
        { icon: "mdi mdi-account-child", leader: "Ministers" },
        { icon: "mdi mdi-account-group", leader: "Head Of Departments" }
      ],

      medRecords: [
        { icon: "person", record: "Financial Records" },
        { icon: "group", record: "Attendance Record" },
        { icon: "group", record: "membership Record" }
      ],
      attendanceRecords: [
        { icon: "mdi-walk", timers: "First Timers" },
        { icon: "mdi-human-handsup", timers: "Second Timers" }
      ],
      financialRecords: [
        { icon: "mdi-currency-ngn", giving: "Financial Records" }
        // { icon: "mdi-coffee", giving: "Tithe" },
        // { icon: "mdi-gift", giving: "thanks Giving" },
        // { icon: "mdi-wallet-giftcard", giving: "special honor" }
      ],
      membership: [
        { icon: "mdi-transit-transfer", comers: "Members" },
        { icon: "mdi-account-check", comers: "Regular Members" },
        { icon: "mdi-transit-transfer", comers: "Irregular Members" }
      ]
    };
  },
  mounted() {
    this.$store.dispatch("removeBranchCode");
    //console.log(`this is branchCode ${this.$store.getters.getCode}`);
    //localStorage.removeItem("branchCode");kmlklk
  },
  methods: {
    // setCharAt(str, index, charToReplace) {
    //   return str.substring(0, index) + charToReplace + str.substring(index + 1);
    // },
    runFnc(param) {
      return !param;
    },
    routerLink() {
      //dynamic router name assigned

      this.htmlElement = event.target.innerText;

      localStorage.setItem("formattedHtmlNodeText", this.htmlElement); // this is to differentiate it with htmlNodeelement
      var htmlElement = this.htmlElement.toLowerCase();

      //htmlElement.trim();
      let extractedText = ""; // to extract first word from the html element if too long
      //searches for a space in the string
      if (htmlElement.indexOf(" ") >= 0) {
        htmlElement = this.stringWithSpace(htmlElement, extractedText);

        localStorage.setItem("htmlNodeText", htmlElement);
        // console.log(htmlElemllent);
      } else {
        extractedText = htmlElement;
        localStorage.setItem("htmlNodeText", htmlElement);
        localStorage.setItem("extractedText", extractedText);
        // this.$store.dispatch("htmlNodeText", htmlElement);
      }

      this.$router.push({
        name: `${htmlElement}`
      });
      // });
    }
  }
};
</script>
