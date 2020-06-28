
<template >
  <v-container>
    <v-layout>
      <v-row>
        <v-col cols="12" md="12" sm="12" lg="12">
          <v-sheet>Birthday celebrant {{innerHtmlClicked}}</v-sheet>
        </v-col>
        <v-col cols="12" v-for="(item, kk) in DOMDisplayContent" :key="kk" md="4" sm="4" lg="6">
          <v-avatar
            v-ripple="{ center: true, class: `white--text` }"
            size="180"
            class="justify-center avater"
            v-bind:style="{backgroundColor:color[
              Math.floor(Math.random() *color.length)]}"
            @click="requestData($event)"
          >
            <p class="white--text headline">{{item.full_name}}</p>

            <p class="white--text headline">{{item.date_of_birth}}</p>

            <p class="white--text headline">{{item.phone}}</p>
          </v-avatar>
        </v-col>
        <!-- buttons -->
        <v-divider></v-divider>

        <v-col cols="12">
          <v-Button :clickFnc="cancel">
            <template #btn>cancel</template>
          </v-Button>

          <!-- <v-flex xs5 offset-lg8 offset-xs1> -->
          <v-Button :clickFnc="print">
            <template #btn>Print</template>
          </v-Button>
          <!-- </v-flex> -->
        </v-col>
      </v-row>
    </v-layout>
  </v-container>
</template>
<script>
import Buttons from "../../components/customSlots.vue";
export default {
  components: {
    "v-Button": Buttons
  },
  data() {
    return {
      innerHtmlClicked: "",
      prevRoute: "",
      DOMDisplayContent: [],

      serverResponse: [],

      selected: [],
      loadingMessage: `Record is empty add to`,
      color: [
        "#FF4500",
        "#FFD700",
        "#FF8C00",
        "#FF6347",

        "#F29215",
        "#B56F15",
        "#FFAE09",
        "#DAA520"
      ]
    };
  },
  mounted() {
    this.prevRoute = this.$store.getters.getFromRoute; // get Route
    this.htmlElement = localStorage.getItem("formattedHtmlNodeText"); //get routeName seperated with space
    this.serverResponse = this.$store.getters.serverResponse; //get serverResponse from store
    // console.log(this.serverResponse);
    if (this.serverResponse != "") {
      for (let x of this.serverResponse) {
        if (x.length != 0) {
          for (let y of x) {
            this.DOMDisplayContent.push(y);
          }
        }
      }
    } else {
      this.loading = "";
    }
    this.innerHtmlClicked = localStorage.getItem("innerHtmlClicked");
  },
  //get the destination route to
  beforeRouteEnter(to, from, next) {
    next(vm => {
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
</style>