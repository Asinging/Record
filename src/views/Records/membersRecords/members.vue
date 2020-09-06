<template>
  <v-layout>
    <v-flex sx12 sm12 md12 lg12 xg12>
      <v-layout>
        <v-flex>
          <v-Display-members></v-Display-members>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<style scoped>
.avater {
  cursor: pointer;
}
</style><script>
import { stringsFns } from "../../../stringsFns.js";
import Displaymember from "../../../components/members/displayMembers.vue";
import Button from "../../../components/customSlots.vue";
export default {
  mixins: [stringsFns],
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
    };
  },
  mounted() {
    //   this.serverResponse = this.$store.getters.serverResponse;
    this.drawerInnerHtmlElement = localStorage.getItem(
      "drawerInnerHtmlElement"
    );
    this.drawerInnerHtmlElement == "updateMembers"
      ? (this.drawerInnerHtmlElement = "members")
      : false;

    axios
      .get("/" + this.drawerInnerHtmlElement)
      .then((resp) => {
        let response = resp.data;
        if (response.length == []) {
        } else if (response.length) {
          this.$store.dispatch("serverResponse", response);
          this.$router.push({ name: `displayMembers` });
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