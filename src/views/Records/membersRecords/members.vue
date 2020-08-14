<template>
  <v-layout>
    <v-flex sx12 sm12 md12 lg12 xg12>
      <v-layout>
        <v-flex>
          <v-Display-members></v-Display-members>
        </v-flex>
      </v-layout>
      <v-flex sx12 sm12 md12 lg12 xg12>
        <v-card class="elevation-10 ma-10 pa-10 outlined" max-width="200" outlined>
          <Button :clickFnc="updateRecord">
            <template #button>update data</template>
          </Button>
        </v-card>
      </v-flex>
    </v-flex>
  </v-layout>
</template>
<style scoped>
.avater {
  cursor: pointer;
}
</style><script>
import { stringManipulation } from "../../../string_manipulation.js";
import Displaymember from "../../../components/members/displayMembers.vue";
import Button from "../../../components/customSlots.vue";
export default {
  mixins: [stringManipulation],
  components: {
    "v-Display-members": Displaymember,
    Button: Button,
  },
  data() {
    return {
      selected: false,
      drawerInnerHtmlElement: "",
      serverResponse: [],
      DOMDisplayContent: [],

      // headers: [
      //   { text: "S/N", value: "id", sortable: true },
      //   {
      //     text: "Full name",
      //     value: "full_name",
      //   },
      //   { text: "Department", value: "department" },
      //   { text: "phone", value: "phone" },
      //   { text: "Date Of Birth", value: "date_of_birth" },
      //   { text: "Rank", value: "role" },
      //   { text: "Address", value: "address" },
      // ],
    };
  },
  mounted() {
    //   this.serverResponse = this.$store.getters.serverResponse;
    this.drawerInnerHtmlElement = localStorage.getItem(
      "drawerInnerHtmlElement"
    );

    axios
      .get("/" + this.drawerInnerHtmlElement)
      .then((resp) => {
        let response = resp.data;

        if (response.length == []) {
        } else if (response.length) {
          if (this.drawerInnerHtmlElement != "members") {
            this.$router.push({ name: `displayMembers` });
          }
          // let resp = response.forEach((resp) => {
          //   console.log(resp);
          // });

          this.$store.dispatch("serverResponse", response);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  },
  // watch: {
  //   dates() {
  //     this.dates.length > 2 ? this.dates.pop() : false;
  //   },
  // },

  methods: {
    updateRecord() {
      this.$router.push({
        name: "addLeader",
      });
    },
    // requestData() {
    //   let extractedText = "";
    //   this.htmlNodeText = event.target.innerText;

    //   let htmlNodeText = this.htmlNodeText.toLowerCase();
    //   localStorage.setItem("formattedHtmlNodeText", htmlNodeText); // this differentiate it fromm htmlNodeText

    //   if (htmlNodeText.indexOf(" ") >= 0) {
    //     htmlNodeText = this.stringWithSpace(htmlNodeText, extractedText);
    //     localStorage.setItem("htmlNodeText", htmlNodeText);
    //   } else {
    //     extractedText = htmlNodeText;
    //     localStorage.setItem("htmlNodeText", htmlNodeText);
    //     localStorage.setItem("extractedText", extractedText);
    //     // this.$store.dispatch("htmlNodeText", htmlElement);
    //   }
    //   console.log(htmlNodeText);

    //   axios
    //     .get("/" + htmlNodeText)
    //     .then((resp) => {
    //       let response = resp.data;

    //       if (response.length == []) {
    //         //this.spinnerLoader = true;
    //       } else if (response.length) {
    //         if (htmlNodeText != "members") {
    //           this.$router.push({ name: `displayMembers` });
    //         }

    //         this.$store.dispatch("searchedServerResponse", response);
    //         // console.log(this.$store.getters.searchedResult);
    //         // this.spinnerLoading = false;
    //       }
    //     })
    //     .catch((error) => {
    //       console.error(error);
    //     });

    // },
  },
};
</script>