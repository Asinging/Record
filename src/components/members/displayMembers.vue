
<template >
  <v-layout>
    <v-flex xs12>
      <v-card class="elavation-0" flat>
        <!-- header of the page mounted -->

        <v-layout>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-card class="elevation-0 text-center" flat>{{htmlElement.toUpperCase()}} RECORDS</v-card>
          </v-flex>
        </v-layout>
        <!-- the body layout of the mounted pages -->
        <v-layout flat>
          <v-flex>
            <v-card class="elevation-0" flat>
              <v-data-table
                class="elevation-0"
                id="printSection"
                v-model="selected"
                :headers="headers"
                :items=" DOMDisplayContent"
                :loading="loading"
                item-key="id"
                :loading-text="loadingMessage"
              ></v-data-table>

              <!-- buttons -->
              <v-layout>
                <v-flex xs12>
                  <v-Button :clickFnc="cancel">
                    <template #btn>cancel</template>
                  </v-Button>
                </v-flex>
                <v-flex offset-lg9 offset-xs2 offset-md8 offset-sm8>
                  <v-Button :clickFnc="print">
                    <template #btn>Print</template>
                  </v-Button>
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Buttons from "../customSlots.vue";
import TableData from "../dataTableComponent.vue";
export default {
  name: "Display-members",
  components: {
    "v-Button": Buttons,
    "v- dataTables": TableData,
  },
  data() {
    return {
      htmlElement: "record",
      prevRoute: "",
      DOMDisplayContent: [],

      selected: [],
      regularMembers: [],
      irregularMembers: [],
      serverResponse: [],
      htmlElementFromPreviousClick: "",

      loadingMessage: `Record is empty add to`,

      headers: [
        { text: "S/N", value: "id", sortable: true },
        {
          text: "Full name",
          value: "full_name",
        },
        { text: "Unit In Church", value: "department" },
        { text: "phone", value: "phone" },
        { text: "Date Of Birth", value: "date_of_birth" },
        { text: "Address", value: "address" },
      ],
    };
  },
  mounted() {
    this.DOMDisplayContent = [];
    function getAve(object) {
      return Object.keys(object).filter((key) => {
        let maximum = Math.max.apply(null, Object.values(object));
        let minimum = Math.min.apply(null, Object.values(object));
        let ave = Math.floor((maximum + minimum) / 2);

        return object[key] >= ave;
      });
    }
    this.prevRoute = this.$store.getters.getFromRoute;
    this.htmlElement = localStorage.getItem("formattedHtmlNodeText");
    this.htmlElementFromPreviousClick = localStorage.getItem("htmlNodeText");
    console.log(this.htmlElementFromPreviousClick);
    this.serverResponse = this.$store.getters.serverResponse;
    //console.log(this.serverResponse);
    //console.log("this must work");

    if (
      this.htmlElementFromPreviousClick != "firstTimers" ||
      this.htmlElementFromPreviousClick != "secondTimers"
    ) {
      // console.log("this must work");
      if (this.serverResponse != "") {
        var irregularMembers = [];
        var regularMembers = [];

        let count = {};
        let regular = [];
        let irregular = [];
        let nameContainer = this.serverResponse.map((input) => {
          return input.full_name;
        });

        nameContainer.forEach(function (a) {
          //  counting the numbers of times a persons appears in church
          count[a] = (count[a] || 0) + 1;
        });

        console.log(getAve(count));
        //getAve returns the full_name object key >= the average of the highest number a person was in the church for that
        //particular requst

        nameContainer.forEach((element) => {
          if (getAve(count).includes(element)) {
            //
            regularMembers.includes(element)
              ? false
              : regularMembers.push(element);
          } else {
            irregularMembers.includes(element)
              ? false
              : irregularMembers.push(element);
          }
        });

        this.serverResponse.map((members) => {
          if (
            regularMembers.includes(members.full_name) &&
            !regular.includes(members.full_name) // filtering the object push into the regular
            // so we dont have duplicate
          ) {
            regular.push(members.full_name);

            if (this.regularMembers.length != 0) {
              this.regularMembers.push(members);
            } else {
              this.regularMembers.push(members);
            }
          } else if (
            // push into irreguler array
            !irregular.includes(members.full_name) &&
            !regularMembers.includes(members.full_name)
          ) {
            irregular.push(members.full_name);
            this.irregularMembers.push(members);
          }
        });
        console.log(this.regularMembers);
        console.log(this.irregularMembers);
        //debugger;
        if (this.htmlElementFromPreviousClick == "irregularMembers") {
          this.DOMDisplayContent = this.irregularMembers;
          console.log("yes i enter the here take it");
        } else if (this.htmlElementFromPreviousClick == "regularMember") {
          this.DOMDisplayContent = this.regularMembers;
        } else {
          this.DOMDisplayContent = this.serverResponse;
        }
      } else {
        this.loading = "";
      }
    } else {
      //this.DOMDisplayContent = this.serverResponse;
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
      vm.$store.dispatch("route", { route: vm.prevRoute.name });
    });
  },

  methods: {
    print() {
      alert("you are  about to print");
      printJS("printSection", "html");
    },

    cancel() {
      // console.log(this.htmlElementFromPreviousClick);
      if (
        this.htmlElementFromPreviousClick == "firstTimers" ||
        this.htmlElementFromPreviousClick == "secondTimers"
      ) {
        this.$router.push({
          name: this.htmlElementFromPreviousClick,
        });
      } else {
        this.$router.push({
          name: "members",
        });
      }
    },
  },
};
</script>
<style scoped>
.addpastordelete {
  text-decoration: none;
}
</style>