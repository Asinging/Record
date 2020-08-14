
<template >
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-layout>
          <v-flex xs12 sm12 md12 lg12 xl12>
            <v-card class="elevation-2 text-center">{{drawerInnerHtmlElements}}</v-card>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex>
            <v-card>
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

          
              <!-- <v-layout>
                <v-flex xs12>
                  <v-Button :clickFnc="cancel">
                    <template #btn>cancel</template>
                  </v-Button>
                </v-flex>
                <v-flex xs5 offset-lg8 offset-xs1>
                  <v-Button :clickFnc="print">
                    <template #btn>Print</template>
                  </v-Button>
                </v-flex>
              </v-layout> -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import Buttons from "../../../components/customSlots.vue";
// export default {
//   components: {
//     "v-Button": Buttons,
//   },
//   data() {
//     return {
//       drawerInnerHtmlElement: "",
//       prevRoute: "",
//       DOMDisplayContent: [],
//       loading: true,

//       serverResponse: [],

//       selected: [],
//       loadingMessage: `Record is empty add to`,

//       headers: [
//         { text: "S/N", value: "id", sortable: true },
//         {
//           text: "Full name",
//           value: "full_name",
//         },
//         { text: "Department", value: "department" },
//         { text: "phone", value: "phone" },
//         { text: "Date Of Birth", value: "date_of_birth" },
//         { text: "Address", value: "address" },
//       ],
//     };
//   },
//   mounted() {
//     this.prevRoute = this.$store.getters.getFromRoute;
//     this.drawerInnerHtmlElement = localStorage.getItem(
//       "drawerInnerHtmlElement"
//     );

//     this.serverResponse = this.$store.getters.searchedResult;
//     console.log(this.serverResponse);
//     if (this.serverResponse != "") {
//     } else {
//       this.loading = "";
//     }
//     if (this.DOMDisplayContent) {
//       this.loading = false;
//     }
//   },
//   //get the destination route to
//   beforeRouteEnter(to, from, next) {
//     next((vm) => {
//       from;
//       vm.prevRoute = from;
//       vm.$store.dispatch("route", { route: vm.prevRoute.name });
//     });
//   },
//   methods: {
//     print() {
//       alert("you are  about to print");
//       printJS("printSection", "html");
//     },
//     cancel() {
//       console.log(this.prevRoute);
//       this.$router.push({
//         // name: this.prevRoute.name
//         name: localStorage.getItem("drawerInnerHtmlElement"),
//       });
//     },
//   },
// };
</script>
<style scoped>
.addpastordelete {
  text-decoration: none;
}
</styles>