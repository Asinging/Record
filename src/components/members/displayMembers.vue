
<template >
  <v-layout>
    <v-flex xs12>
      <v-card class="elavation-0" flat>
        <!-- header of the page mounted -->

        <v-layout>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-card class="elevation-0 font-weight-bold orange--text">
              <marquee>{{spacedDrawerInnerHtmlElement.includes("Update")?"Members".toUpperCase():spacedDrawerInnerHtmlElement.updateMembers}}</marquee>
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

    let destructureServerResponse = this.serverResponse.flat();

    this.spacedDrawerInnerHtmlElement = localStorage.getItem(
      "spacedDrawerInnerHtmlElement"
    );
    this.DOMDisplayContent = [];
    function getAve(object) {
      return Object.keys(object).filter((key) => {
        let maximum = Math.max.apply(null, Object.values(object)); //get the maximum value of the object
        let minimum = Math.min.apply(null, Object.values(object));

        return object[key] >= Math.floor((maximum + minimum) / 2); // if object.key is greater or equall to ave
      });
    }
    this.prevRoute = this.$store.getters.getFromRoute;
    this.drawerInnerHtmlElement = localStorage.getItem(
      "drawerInnerHtmlElement"
    );

    // console.log(this.serverResponse);
    if (
      this.drawerInnerHtmlElement != "firstTimers" ||
      this.drawerInnerHtmlElement != "secondTimers"
    ) {
      if (this.serverResponse != "") {
        var irregularMembers = []; // for iteration
        var regularMembers = []; // for iteration
        let count = {}; // holds the numbers of times someone ful_name appears in the destructured arr
        let regularMembersDuplicate = [];
        let irregularMembersDuplicate = [];

        let fullNameContainer = destructureServerResponse.map((input) => {
          return input.full_name;
        });
        // });

        fullNameContainer.forEach((a) => {
          count[a] = (count[a] || 0) + 1; // if count[a ] returns undefined assign and add 1 otherwise add  oneto
        });
        fullNameContainer.forEach((element) => {
          // this separate the regular and irregular members using the
          // the data source from you

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

        destructureServerResponse.map((members) => {
          if (
            regularMembers.includes(members.full_name) &&
            !regularMembersDuplicate.includes(members.full_name) // filtering the object push into the regular
            // so we dont have duplicate
          ) {
            regularMembersDuplicate.push(members.full_name);

            this.regularMembers.push(members);
          } else if (
            // push into irreguler array
            !irregularMembersDuplicate.includes(members.full_name) &&
            !regularMembers.includes(members.full_name)
          ) {
            irregularMembersDuplicate.push(members.full_name);
            this.irregularMembers.push(members);
          }
        });

        //debugger;
        // console.log(this.drawerInnerHtmlElement);
        if (this.drawerInnerHtmlElement == "irregularMembers") {
          this.DOMDisplayContent = this.irregularMembers;
        } else if (this.drawerInnerHtmlElement == "regularMembers") {
          this.DOMDisplayContent = this.regularMembers;
        } else {
          this.DOMDisplayContent = destructureServerResponse;
        }
      } else {
        this.loading = "";
      }
    } else {
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
      let dis = this.drawerInnerHtmlElement;
      console.log(dis);

      printJS({
        printable: "printSection",
        type: "html",
        header: dis.toUpperCase(),
      });
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