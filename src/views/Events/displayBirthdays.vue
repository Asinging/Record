
<template >
  <v-container>
    <v-row>
      <v-col cols="12" md="12" sm="12" lg="12">
        <v-card
          class="elevation-0 text-center orange--text pa-5"
        >Birthday celebrant {{innerHtmlClicked}}</v-card>
      </v-col>

      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <v-card class="elevation-2 ma-4">
          <v-expansion-panels :accordion="accordion" :popout="popout" :inset="inset">
            <v-expansion-panel
              v-for="(item,i) in 7"
              :key="i"
              accordion="accordion"
              :popout="popout"
              :inset="inset"
            >
              <v-card class="elevation pa-10">
                <v-expansion-panel-header>{{item.full_name}}</v-expansion-panel-header>
                <v-expansion-panel-content
                  class="ma-10"
                >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat</v-expansion-panel-content>
              </v-card>
            </v-expansion-panel>
          </v-expansion-panels>
        </v-card>
      </v-col>
      <v-col>
        <v-Button :clickFnc="print">
          <template #btn>Print</template>
        </v-Button>
        <!-- </v-flex> -->
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
import Buttons from "../../components/customSlots.vue";
export default {
  components: {
    "v-Button": Buttons,
  },
  data() {
    return {
      accordion: false,
      popout: false,
      inset: false,
      readonly: false,

      innerHtmlClicked: "",
      prevRoute: "",
      birtydayCelebrants: [],
      DOMDisplayContent: [],

      serverResponse: [],

      selected: [],
      loadingMessage: `Record is empty add to`,
    };
  },
  mounted() {
    this.prevRoute = this.$store.getters.getFromRoute; // get Route
    this.htmlElement = localStorage.getItem("drawerInnerHtmlElement"); //get routeName seperated with space
    //   console.log(this.htmlElement);
    //   this.serverResponse = this.$store.getters.serverResponse; //get serverResponse from store
    //   console.log(this.serverResponse);
    //   if (this.serverResponse != "") {
    //     for (let x of this.serverResponse) {
    //       if (x.length != 0) {
    //         for (let y of x) {
    //           this.DOMDisplayContent.push(y);
    //         }
    //       }
    //     }
    //   } else {
    //     this.loading = "";
    //   }
    //   this.innerHtmlClicked = localStorage.getItem("innerHtmlClicked");

    //get the destination route to
    if (serverResponse.length != 0) {
      axios
        .get("/" + this.drawerInnerHtmlElement)
        .then((resp) => {
          let response = resp.data;

          if (response.length == []) {
          } else if (response.length) {
            this.serverResponse = response;

            //this.$store.dispatch("serverResponse", response);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    }
  },
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
      // console.log(this.prevRoute);
      this.$router.push({
        // name: this.prevRoute.name
        name: localStorage.getItem("htmlNodeText"),
      });
    },
  },
};
</script>
<style scoped>
.birthday_celebrant {
  cursor: pointer;
}
</style>