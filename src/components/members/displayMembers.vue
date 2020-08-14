
<template >
  <v-layout>
    <v-flex xs12>
      <v-card class="elavation-0" flat>
        <!-- header of the page mounted -->

        <v-layout>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-card class="elevation-0 font-weight-bold orange--text">
              <marquee>{{spacedDrawerInnerHtmlElement.toUpperCase()}} RECORDS</marquee>
            </v-card>
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
                  <vButton :clickFnc="cancel">
                    <template #button>cancel</template>
                  </vButton>
                </v-flex>
                <v-flex offset-lg9 offset-xs2 offset-md8 offset-sm8>
                  <vButton :clickFnc="print">
                    <template #button>
                      <v-icon>mdi-fax</v-icon>
                      <span class="ma-2">Print</span>
                    </template>
                  </vButton>
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
    vButton: Buttons,
    vDataTables: TableData,
  },
  data() {
    return {
      drawerInnerHtmlElement: "record",
      // spacedDrawerInnerHtmlElement: "",
      prevRoute: "",
      DOMDisplayContent: [],

      selected: [],
      regularMembers: [],
      irregularMembers: [],
      serverResponse: [],
      spacedDrawerInnerHtmlElement: "yrs",
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
    this.serverResponse = this.$store.getters.serverResponse;
    // destructuring such to have array of objects
    var r = [];
    // the serverResponse fetch is array of arrays.
    let destructureResponse = this.serverResponse.flat();
    // let destructureResponse = this.serverResponse.flatMap((resp) => {
    //   console.log(resp);
    // });

    console.log(destructureResponse);
    this.spacedDrawerInnerHtmlElement = localStorage.getItem(
      "spacedDrawerInnerHtmlElement"
    );
    this.DOMDisplayContent = [];
    function getAve(object) {
      return Object.keys(object).filter((key) => {
        let maximum = Math.max.apply(null, Object.values(object)); //get the maximum value of the object
        let minimum = Math.min.apply(null, Object.values(object));
        let ave = Math.floor((maximum + minimum) / 2);

        return object[key] >= ave; // if object.key is greater or equall to ave
      });
    }
    this.prevRoute = this.$store.getters.getFromRoute;
    // this.htmlElement = localStorage.getItem("formattedHtmlNodeText");
    this.drawerInnerHtmlElement = localStorage.getItem(
      "drawerInnerHtmlElement"
    );

    // console.log(this.serverResponse);
    if (
      this.drawerInnerHtmlElement != "firstTimers" ||
      this.drawerInnerHtmlElement != "secondTimers"
    ) {
      // console.log(this.serverResponse);
      // ``;
      // console.log("this must work");
      if (this.serverResponse != "") {
        var irregularMembers = [];
        var regularMembers = [];
        let count = {};
        let regular = [];
        let irregular = [];

        let fullNameContainer = destructureResponse.map((input) => {
          return input.full_name;
        });
        // });

        console.log(fullNameContainer);

        fullNameContainer.forEach(function (a) {
          //  counting the numbers of times a persons appears in church
          // console.log(a);

          count[a] = (count[a] || 0) + 1; // if count[a ] returns undefined assign and add 1 otherwise add  to
        });

        //getAve returns the full_name object key >= the average of the highest number a person was in the church for that
        //particular request

        fullNameContainer.forEach((element) => {
          console.log(getAve(count));
          if (getAve(count).includes(element)) {
            //check if any element of the fullName is containded in
            //the data return by the getAve fnc

            regularMembers.includes(element)
              ? false // check if the value is already  present in the regularMembers else push to it
              : regularMembers.push(element);
          } else {
            irregularMembers.includes(element)
              ? false
              : irregularMembers.push(element);
          }
        });

        destructureResponse.map((members) => {
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
        // console.log(this.drawerInnerHtmlElement);
        if (this.drawerInnerHtmlElement == "irregularMembers") {
          this.DOMDisplayContent = this.irregularMembers;
        } else if (this.drawerInnerHtmlElement == "regularMembers") {
          this.DOMDisplayContent = this.regularMembers;
        } else {
          this.DOMDisplayContent = destructureResponse;
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
      // console.log(this.drawerInnerHtmlElement);
      if (
        this.drawerInnerHtmlElement == "firstTimers" ||
        this.drawerInnerHtmlElement == "secondTimers"
      ) {
        this.$router.push({
          name: this.drawerInnerHtmlElement,
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