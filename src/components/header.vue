<template>
  <v-app>
    <v-card>
      <v-toolbar color="orange" flat dense height="70">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer" color="white"></v-app-bar-nav-icon>
        <!-- ? <template v-slot:prepend></template> -->
        <v-toolbar-title class="white-=text text-center">
          <span class="white--text" bold>KMI UNICAL</span>
        </v-toolbar-title>

        <div class="flex-grow-1"></div>
      </v-toolbar>
    </v-card>

    <v-navigation-drawer v-model="drawer" absolute temporary width="340">
      <template v-slot:prepend>
        <v-layout>
          <v-flex offset-xs1></v-flex>
          <div class="mt-3">
            <img src="img/devImages/newKmiP.jpg" height="90" width="80" />
          </div>

          <!-- <v-spacer></v-spacer> -->
          <v-list-item class="ma-12 mb-4">
            <v-list-item-content>
              <v-list-item-title>RECORD'S HANDY</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-layout>
      </template>

      <v-divider></v-divider>

      <v-list dense shaped>
        <v-list-item @click>
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="subtitle-1">Home</v-list-item-title>
        </v-list-item>

        <!-- the leadership column starts here -->

        <v-list-group prepend-icon="person" value="first" v-model="lead">
          <template v-slot:activator>
            <v-list-item-title class="subtitle-1" @click="runFnc(lead)">Leadership</v-list-item-title>
          </template>
          <!-- <divider></divider> -->
          <v-list-item v-for="(item, index) in leadership" :key="index" @click>
            <v-list-item-content>
              <v-list-item-title>{{ item.leader }}</v-list-item-title>
            </v-list-item-content>
            <v-list-item-icon>
              <v-icon color="green">{{ item.icon }}</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list-group>
        <template v-if="lead">
          <v-divider></v-divider>
        </template>

        <!-- the records column starts here -->

        <v-list-group prepend-icon="mdi mdi-animation-outline" value="test" v-model="rec">
          <template v-slot:activator>
            <v-list-item-title class="subtitle-1" ghgfdsdfgv @click="runFnc(rec)">Records</v-list-item-title>
          </template>

          <v-list-group sub-group value="true">
            <template v-slot:activator v-model="fin">
              <v-list-item-content>
                <v-list-item-title @click="runfnc=(fin)">Financial record</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(item, kk) in finRec" :key="kk" @click>
              <v-list-item-content>
                <v-list-item-title color="green">{{ item.giving }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon color="green">{{ item.icon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <template v-if="fin">
            <v-divider></v-divider>
          </template>

          <v-list-group sub-group value="test" v-model="att">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title @click="runFnc(att)">Attendance Record</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(item, kk) in attenRec" :key="kk">
              <v-list-item-content>
                <v-list-item-title color="green">{{item.timers}}</v-list-item-title>
              </v-list-item-content>

              <v-list-item-icon>
                <v-icon color="green">{{item.icon}}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
          <template v-if="att">
            <v-divider></v-divider>
          </template>

          <v-list-group sub-group value="test" v-model="me">
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title @click="runFnc(me)">Members</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(item, kk) in memb" :key="kk" @click>
              <v-list-item-content>
                <v-list-item-title color="green">{{ item.comers }}</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon color="green">{{ item.icon }}</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-group>
        </v-list-group>
        <template v-if="rec">
          <v-divider></v-divider>
        </template>

        <v-list-item @click>
          <v-list-item-icon>
            <v-icon>mdi-calendar-month</v-icon>
          </v-list-item-icon>

          <v-list-item-title class="subtitle-1">Calendar</v-list-item-title>
        </v-list-item>

        <v-list-group prepend-icon="mdi mdi-animation" color="yellow" value="true" v-model="ev">
          <template v-slot:activator>
            <v-list-item-title class="subtitle-1" @click="runFnc(ev)">Events</v-list-item-title>
          </template>
          <v-list-item @click>
            <v-list-item-icon>
              <v-icon color="green">event</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Birthdays</v-list-item-title>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      listGroup: 0,
      // test1: true,
      lead: false,
      rec: false,
      att: false,
      ev: false,
      me: false,
      fin: false,

      leadership: [
        { icon: "mdi mdi-account-tie", leader: "Pastors" },
        { icon: "mdi mdi-account-child", leader: "ministers" },
        { icon: "mdi mdi-account-group", leader: "Head of Departments" }
      ],

      medRecords: [
        { icon: "person", record: "Financial Records" },
        { icon: "group", record: "Attendance Record" },
        { icon: "group", record: "membership Record" }
      ],
      attenRec: [
        { icon: "mdi-walk", timers: "First Timers" },
        { icon: "mdi-human-handsup", timers: "Second Timers" }
      ],
      finRec: [
        { icon: "mdi-currency-ngn", giving: "Offering" },
        { icon: "mdi-coffee", giving: "Tithe" },
        { icon: "mdi-gift", giving: "thanks Giving" },
        { icon: "mdi-wallet-giftcard", giving: "special honor" }
      ],
      memb: [
        { icon: "mdi-account-check", comers: "Regular members" },
        { icon: "mdi-transit-transfer", comers: "Irregular members" }
      ]
    };
  },
  methods: {
    runFnc(param) {
      return !param, console.log(param);
      //console.log(param);
    }
  }
};
</script>