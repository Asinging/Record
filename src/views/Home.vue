<template>
  <v-container>
    <v-layout>
      <v-row no-gutters>
        <v-col
          cols="12"
          xs="12"
          sm="4"
          md="12"
          lg="4"
          v-for="(card, car) in cards"
          :key="car"
        >
          <v-card class="elevation-1 ma-2   rounded">
            <v-card-title
              v-text="card.title"
              class="ccard_title "
            ></v-card-title>
            <v-card-text>
              {{ more ? card.largeText.slice(0, 120) : "yes" }}</v-card-text
            >
            <!-- <div class="flex-grow-1"></div>
            <v-flex offset-xs9 offset-sm11>-->

            <v-card-action>
              <v-col class="text-right">
                <v-btn
                  depressed
                  large
                  tile
                  text
                  @click="largeText(event)"
                  v-text="card.action"
                  color="orange"
                  class="white--text ccard_action align-right pa-3"
                  align-center
                ></v-btn>
              </v-col>
            </v-card-action>

            <!-- </v-flex> -->
          </v-card>
          <!-- <v-divider></v-divider> -->
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      more: true,
      cards: [
        {
          title: "LEADERSHIP",
          action: "MORE",
          // text:
          //   " This judiciously and elaboratively expresses the efficiency and effective leadership  structure of the church and its records, starting from",
          largeText:
            "This judiciously and elaboratively expresses the leadership of the church and its records, starting from " +
            " the head pastors down to the ministers and down to the heads of units/department",
        },
        {
          flex: 4,
          title: "MEMBERSHIP",
          action: "MORE",
          // text:
          //   "The membership record of the church keeps track of the the members currently in the church and actively in the worship of the Lord of almighty.",
          largeText:
            "  The membership record of the church keeps track of the the members currently in the church and actively in the worship of the Lord of almighty this , keeps track of how often a particular member has been comming to " +
            "church",
        },
        {
          flex: 4,
          title: "ATTENDANCE",
          action: "MORE",
          // text:
          //   "The attendance record of the church keeps accurately the total nunber of the persons that has ever worship in  the church an the and the total",
          largeText:
            "  The attendance record of the church keeps accurately the total nunber of the persons that has ever worship in" +
            "the church an the and the total number of the persons per services",
        },
        {
          flex: 4,
          title: "FINANCES",
          action: "MORE",
          // text:
          //   "the financial record of the church has to be kept accurate and without abiquity. this features takes care of that",
          largeText:
            " the financial record of the church has to be kept accurate and without abiquity. this features takes care of that",
        },
      ],
    };
  },
  beforeMount() {
    this.$store.getters.authDetails.userName
      ? false
      : this.$router.push({ name: "login" });
    // localStorage.getItem("orgName" === undefined)
    //   ? this.$router.push({ name: "setuppage" })
    //   : false;
  },
  methods: {
    largeText() {
      let innerHtml = event.target.innerText.trim();
      if (innerHtml === "MORE") {
        console.log(event);
      }
    },
  },
};
</script>
<style scoped>
#login {
  border-width: 0px;
}
</style>
