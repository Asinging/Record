<template>
  <div id="inpired">
    <!-- <v-app> -->
    <v-card light>
      <v-toolbar text dense height="90" flat color="primary">
        <v-app-bar-nav-icon @click="drawer=!drawer">
          <v-icon color="white">mdi-menu</v-icon>
        </v-app-bar-nav-icon>

        <template v-slot:prepend></template>

        <v-toolbar-title class="white-=text text-center">
          <span class="white--text header" bold v-if="admin">{{admin.toUpperCase()}}</span>
          <span class="white--text header" bold v-else>RECORDS MANAGEMENT</span>
        </v-toolbar-title>
        <div class="flex-grow-1"></div>

        <!-- sign up  -->

        <v-flex xs3 sm2 lg1 md1>
          <!-- <v-layout> -->
          <v-row>
            <v-icon class color="white" ripple="6">person</v-icon>

            <v-card
              class="white--text ml-2"
              outlined
              color="primary"
              id="login"
              @click="userStatusSend($event)"
              ripples
            >{{userStatusBtn}}</v-card>
          </v-row>
          <!-- // </v-layout> -->
        </v-flex>
      </v-toolbar>
    </v-card>

    <v-navigation-drawer app v-model="drawer" absolute and width="280">
      <!-- {{drawer}} -->
      <template v-slot:prepend>
        <v-layout>
          <v-flex offset-xs1></v-flex>
          <div class="mt-3 mb-5">
            <img src="img/devImages/avat1.jpg" height="90" width="80" />
          </div>

          <!-- <v-spacer></v-spacer> -->
          <v-list-item class="ma-5 mb-4 pr-3">
            <v-list-item-content>
              <v-list-item-title class="side_bar_title">DASHBOARD</v-list-item-title>
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

          <v-list-item-title class="subtitle-1" @click="routerLink($event)">Home</v-list-item-title>
        </v-list-item>

        <!-- the leadership column starts here -->

        <v-list-group prepend-icon="person" value="true" v-model="leadership" color="primary">
          <template v-slot:activator>
            <v-list-item-title class="subtitle-1" @click="runFnc(leadership)">Leadership</v-list-item-title>
          </template>
          <v-list-item
            v-for="(item, pastor) in leadershipRecords"
            :key="pastor"
            @click="routerLink($event)"
          >
            <v-list-item-content>
              <v-list-item-title color="secondary" ref="item">{{item.leader}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon color="secondary">{{item.icon}}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <template v-if="leadership">
          <v-divider></v-divider>
        </template>
        <!-- the leadership column starts here -->

        <!-- the records column starts here -->

        <v-list-group prepend-icon=" mdi-animation" value="true" v-model="records" color="primary">
          <template v-slot:activator>
            <v-list-item-title class="subtitle-1" @click="runFnc(records)">Records</v-list-item-title>
          </template>

          <v-list-group sub-group value="true" v-model="finances" prepend-icon="mdi-cash-100">
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
                <v-list-item-title color="secondary">{{ item.giving }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon color="secondary">{{ item.icon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <template v-if="finances">
            <v-divider></v-divider>
          </template>

          <v-list-group
            sub-group
            value="tet"
            v-model="attendance"
            prepend-icon="mdi-account-switch"
            color="primary"
          >
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
                <v-list-item-title color="secondary">{{item.timers}}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon color="secondary">{{item.icon}}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <template v-if="attendance">
            <v-divider></v-divider>
          </template>

          <v-list-group
            sub-group
            value="test"
            v-model="members"
            color="secondary"
            prepend-icon="mdi-account-heart"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title @click="runFnc(members)">Members Records</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(item, kk) in membership" :key="kk" @click="routerLink($event)">
              <v-list-item-content>
                <v-list-item-title color="secondary">{{item.comers}}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon color="secondary">{{ item.icon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
        <template v-if="records">
          <v-divider></v-divider>
        </template>
        <!-- the records column stop here -->

        <!-- the events column stops here -->
        <v-list-group
          prepend-icon="mdi-calendar-multiple"
          color="primary"
          value="true"
          v-model="events"
        >
          <template v-slot:activator>
            <v-list-item-title class="subtitle-1" @click="runFnc(events)">Events</v-list-item-title>
          </template>
          <v-list-item @click="routerLink($event)">
            <v-list-item-icon>
              <v-icon color="secondary">event</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Birthdays</v-list-item-title>
          </v-list-item>
        </v-list-group>
        <!-- the events column stops here -->
        <!-- the calender column start here -->
        <v-list-group
          prepend-icon=" mdi-scale-bathroom"
          value="true"
          v-model="misc"
          color="primary"
        >
          <template v-slot:activator>
            <v-list-item-title class="subtitle-1" @click="runFnc(misc)">Misc</v-list-item-title>
          </template>
          <v-list-item
            v-for="(item, calender) in miscellaneous"
            :key="calender"
            @click="routerLink($event)"
          >
            <v-list-item-content>
              <v-list-item-title color="secondary" ref="item">{{item.data}}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon color="secondary">{{item.icon}}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>

        <!-- the calender column stops -->
      </v-list>
    </v-navigation-drawer>

    <!-- toolbar -->

    <!-- header 2  -->
    <!-- </v-app> -->
  </div>

  <!-- body of the wepbage define here -->
</template>
<style scoped>
</style>

<script>
//import HomePage from "./homePage.vue";
import { concatInnerHtml } from "../helper.js";
import { eventBus } from "../events.js";
import { stringManipulation } from "../string_manipulation.js";
export default {
  mixins: [stringManipulation],
  components: {
    //HomePage
  },
  data() {
    return {
      blue: "",
      misc: "",
      userStatus: false, //  user not login display login button
      userStatusBtn: "LOGIN", // BTN displays login if the the userStatus is false and LOGOUT if not
      admin: localStorage.getItem("userName"),
      rout: "",
      drawer: false,
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
        { icon: "mdi mdi-account-tie", record: "Financial Records" },
        { icon: "person-details-outline", record: "Attendance Record" },
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
      ],
      miscellaneous: [
        { icon: "mdi-transit-transfer", data: "Mandate" },
        { icon: "mdi-account-check", data: "Calender" }
      ]
    };
  },
  // computed: {
  //   draw() {
  //     console.log(this.$store.state.draw);
  //     return $store.state.draw;
  //   }
  // },
  watch: {
    admin() {
      //  if (userStatus)
      console.log(this.admin);
    }
  },
  mounted() {
    this.drawer = this.$store.state.draw;
    //console.log(this.drawer);
  },
  methods: {
    userStatusSend() {
      if (!this.userStatus) {
        // no user logged in
        this.$router.push({
          name: "login"
        });
      } else if (this.userStatus) {
        this.userStatusBtn = "LOGOUT";
        localStorage.setItem("userName", "") && localStorage.setItem("id", "");
        this.$router.push({
          path: "Auth/login"
        });
      }
    },
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
