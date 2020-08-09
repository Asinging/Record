<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card class="elevation-0" flat id="printSection">
          <v-layout>
            <v-flex justify-center>
              <v-card
                class="elevation-0 ma-3 text-center subtitle-1 font-weight-bold orange--text undeline"
              >
                <span
                  v-if="innerHtmlCurrentlyClicked=='custom search'"
                >Records for {{innerHtmlCurrentlyClicked}} ({{date_1}} to {{date_2}})</span>
                <span v-else>Records for {{innerHtmlCurrentlyClicked}}</span>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-data-table
                class="elevation-0"
                v-model="selected"
                :headers="headers"
                :items=" DOMDisplayContent"
                :loading="loading"
                item-key="id"
                :loading-text="loadingMessage"
              ></v-data-table>
              <!-- this is a data table props  brought outside for convenience -->
              <!-- footer-props.next-icon="$vuetify.icons.next" -->
            </v-flex>
          </v-layout>

          <!-- buttons -->

          <v-layout>
            <v-flex xs12>
              <v-Button :clickFnc="cancel">
                <template #btn>cancel</template>
              </v-Button>
            </v-flex>
            <v-flex offset-xs5 offset-sm8 offset-md8 offset-lg8 offset-xl7>
              <v-Button :clickFnc="print">
                <template #btn>
                  <v-icon>mdi-fax</v-icon>
                  <span class="ma-2">Print</span>
                </template>
              </v-Button>
            </v-flex>
          </v-layout>
        </v-card>

        <!-- <caption>sunday</caption> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Buttons from "../../../components/customSlots.vue";
//import { mapActions } from "vuex";
// import { remove } from "../deletefnc.js";
//import Buttons from "../components/buttons.vue";

export default {
  components: {
    "v-Button": Buttons,
  },
  data() {
    return {
      date_1: "",
      date_2: "",
      innerHtmlCurrentlyClicked: "",
      prevRoute: "",
      DOMDisplayContent: [],
      loading: true,

      serverResponse: [],

      selected: [],
      loadingMessage: `Record is empty add to`,

      headers: [
        {
          text: "S/N",
          value: "id",
          align: "center",
          // width: 70,

          sortable: true,
        },
        {
          text: "Date of Transantion",
          value: "date",
          align: "center",
        },
        {
          text: "Offering (N)",
          value: "offering",
          align: "center",
        },
        {
          text: "Tithe (N)",
          value: "tithe",
          align: "center",
        },
        {
          text: `Thanks Giving`,
          value: "thanks_giving",
          align: "center",
          class: "mdi-spin",
        },

        {
          text: "Total (N)",
          value: "totalById",
          align: "end",
          class: "orange--text font-weight-bold subtitle-1",
        },
      ],
    };
  },
  mounted() {
    let innerHtml = localStorage
      .getItem("innerHtmlCurrentlyClicked")
      .split("_");
    innerHtml = innerHtml.join(" ");

    let dates = this.$store.getters.customDates;

    [this.date_1, this.date_2] = this.$store.getters.customDates;
    console.log(this.date_1);

    this.innerHtmlCurrentlyClicked = innerHtml;
    this.prevRoute = this.$store.getters.getFromRoute;
    //console.log(innerHtmlCurrentlyClicked);

    function numberWithCommas(x) {
      if (!isNaN(x)) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return x;
      }
    }

    this.serverResponse = this.$store.getters.serverResponse;
    console.log(this.serverResponse);
    if (this.serverResponse != "") {
      var totalEntriesObject = {}, // overall total including the totalById
        // field={
        offering = 0,
        tithe = 0,
        thanks_giving = 0, // this variable name to corresponds with my database style of naming
        totalById = 0; // total taking each of the id of the return response
      // }
      this.serverResponse.forEach((record) => {
        //server response is Array of objects
        let obj = {}; // this contain a formattted object property value created dynamically

        Object.entries(record).forEach((val, key) => {
          if (val[0] === "id") {
            val[1] = val[1].toString();
            totalEntriesObject.id = "TOTAL";
          } else if (val[0] === "offering") {
            offering += val[1];
          } else if (val[0] === "tithe") {
            tithe += val[1];
          } else if (val[0] === "thanks_giving") {
            thanks_giving += val[1];
          } else if (val[0] === "totalById") {
            totalById += val[1];
          }

          obj[val[0]] = numberWithCommas(val[1]); // a new object that has its properties value formatted with comma
          // that will be display excluding the overall sum of the field which will be added later to the DOMDisplayContent
        });

        this.DOMDisplayContent.push(obj);
      });
      //function overallSum(){

      totalEntriesObject.offering = numberWithCommas(offering);
      totalEntriesObject.tithe = numberWithCommas(tithe);
      totalEntriesObject.thanks_giving = numberWithCommas(thanks_giving);
      totalEntriesObject.totalById = numberWithCommas(totalById);

      this.DOMDisplayContent.push(totalEntriesObject);
      // }
    } else {
      this.loading = true;
      this.loadingMessage = "there is no record to display try adding one   ";
    }
    if (this.DOMDisplayContent) {
      this.loading = false;
    }
  },
  //get the destination route to
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      from;
      vm.prevRoute = from;
      vm.$store.dispatch("route", {
        route: vm.prevRoute.name,
      });
    });
  },
  methods: {},

  methods: {
    print() {
      alert("you are  about to print");
      printJS("printSection", "html");
    },

    //...mapActions("myModule", ["fetchPrintStuff"]),

    cancel() {
      this.$router.push({
        // name: this.prevRoute.name
        name: localStorage.getItem("htmlNodeText"),
      });
    },
  },
};
</script>
<style scoped>
.addpastordelete {
  text-decoration: none;
}
</styles>
