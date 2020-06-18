
<template >
  <v-layout>
    <v-flex xs12>
      <v-sheet class="ma3 justify-center align-content-center">Records for {{htmlElement}}</v-sheet>
      <v-data-table
        id="printSection"
        v-model="selected"
        :headers="headers"
        :items=" DOMDisplayContent"
        :loading="loading"
        item-key="id"
        :loading-text="loadingMessage"
        class="elevation-1"
      ></v-data-table>

      <!-- buttons -->
      <v-layout>
        <v-flex xs12>
          <v-Button :clickFnc="cancel">
            <template #btn="slotProps">cancel</template>
          </v-Button>
        </v-flex>
        <v-flex xs5 offset-lg8 offset-xs1>
          <v-Button :clickFnc="print">
            <template #btn="slotProps">Print</template>
          </v-Button>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import Buttons from "../../../components/customSlots.vue";
//import { mapActions } from "vuex";
// import { remove } from "../deletefnc.js";
//import Buttons from "../components/buttons.vue";

export default {
  components: {
    "v-Button": Buttons
  },
  data() {
    return {
      htmlElement: "",
      prevRoute: "",
      DOMDisplayContent: [],
      loading: true,

      serverResponse: [],

      selected: [],
      loadingMessage: `Record is empty add to`,

      headers: [
        { text: "S/N", value: "id", sortable: true },
        { text: "Date of Transantion", value: "date" },
        {
          text: "Offering (N)",
          value: "offering"
        },
        { text: "Tithe (N)", value: "tithe" },
        { text: "Thanks Giving (N)", value: "thanks_giving" },

        { text: "Total (N)", value: "totalById" }
      ]
    };
  },
  mounted() {
    this.prevRoute = this.$store.getters.getFromRoute;
    this.htmlElement = this.$store.getters.geHtmlElementClicked;
    function numberWithCommas(x) {
      if (!isNaN(x)) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      } else {
        return x;
      }
    }

    this.serverResponse = this.$store.getters.searchedResult;
    console.log(this.serverResponse);
    if (this.serverResponse != "") {
      var totalEntriesObject = {}, // overall total including the totalById
        offering = 0,
        tithe = 0,
        thanks_giving = 0, // wthis variable name to corresponds with database style of naming
        totalById = 0; // total taking each of the id of the return response

      this.serverResponse.forEach(value => {
        //server response is object of objects
        let obj = {}; // this holds a formattted object property value created dynamically
        // let entryTotal = 0; //this is an object property for total of an entry
        Object.entries(value).forEach((val, key) => {
          // dynamically creating an object property
          // if (val[0] != "id" && !isNaN(val[1])) {
          //   entryTotal += val[1];
          // }
          if (val[0] === "id") {
            totalEntriesObject.id = "TOTAL";
          } else if (val[0] === "offering") {
            offering += val[1];
          } else if (val[0] === "tithe") {
            tithe += val[1];
          } else if (val[0] === "thanks_giving") {
            thanks_giving += val[1];
          } else if (val[0] === "totalById") {
            // totalById += val[1];
          }

          // value.totalById = entryTotal; //create totalById as object property
          // if (val[0].totalById) {
          //   debugger;
          // }
          obj[val[0]] = numberWithCommas(val[1]); // a new object that has its properties value formatted with comma

          //}
        });

        this.DOMDisplayContent.push(obj);
      });

      totalEntriesObject.offering = numberWithCommas(offering);
      totalEntriesObject.tithe = numberWithCommas(tithe);
      totalEntriesObject.thanks_giving = numberWithCommas(thanks_giving);
      totalEntriesObject.totalById = numberWithCommas(totalById);
      this.DOMDisplayContent.push(totalEntriesObject);
      console.log(this.DOMDisplayContent);
    } else {
      this.loading = "";
    }
    if (this.DOMDisplayContent) {
      this.loading = false;
    }
  },
  //get the destination route to
  beforeRouteEnter(to, from, next) {
    next(vm => {
      from;
      vm.prevRoute = from;
      vm.$store.dispatch("route", { route: vm.prevRoute.name });
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
      console.log(this.prevRoute);
      this.$router.push({
        // name: this.prevRoute.name
        name: localStorage.getItem("htmlNodeText")
      });
    }
  }
};
</script>
<style scoped>
.addpastordelete {
  text-decoration: none;
}
</styles>