<template>
  <v-container align-center>
    <v-layout>
      <v-flex sx12 sm12 md12 lg12 xg12><v-card></v-card></v-flex>
    </v-layout>
  </v-container>
</template>
<style scoped>
.avater {
  cursor: pointer;
}
</style><script>
import { stringManipulation } from "../../../string_manipulation.js";
export default {
  mixins: [stringManipulation],
  data() {
    return {
      selected: false,

      serverResponse: [],
      DOMDisplayContent: [],
      htmlNodeText: "",
      backgroundColor: "",

      color: [
        "#FFD700",
        "#FF8C00",
        "#FF6347",
        "#F29215",
        "#B56F15",
        "#FFAE09",
        "#DAA520",
      ],
      headers: [
        { text: "S/N", value: "id", sortable: true },
        {
          text: "Full name",
          value: "full_name",
        },
        { text: "Department", value: "department" },
        { text: "phone", value: "phone" },
        { text: "Date Of Birth", value: "date_of_birth" },
        { text: "Rank", value: "role" },
        { text: "Address", value: "address" },
      ],
    };
  },
  mounted() {
    this.serverResponse = this.$store.getters.serverResponse;

    // alert("this is members components");
  },
  watch: {
    dates() {
      this.dates.length > 2 ? this.dates.pop() : false;
    },
  },

  methods: {
    updateData() {
      this.$router.push({
        name: "addLeader",
      });
    },
    requestData() {
      let extractedText = "";
      this.htmlNodeText = event.target.innerText;

      let htmlNodeText = this.htmlNodeText.toLowerCase();
      localStorage.setItem("formattedHtmlNodeText", htmlNodeText); // this differentiate it fromm htmlNodeText

      if (htmlNodeText.indexOf(" ") >= 0) {
        htmlNodeText = this.stringWithSpace(htmlNodeText, extractedText);
        localStorage.setItem("htmlNodeText", htmlNodeText);
      } else {
        extractedText = htmlNodeText;
        localStorage.setItem("htmlNodeText", htmlNodeText);
        localStorage.setItem("extractedText", extractedText);
        // this.$store.dispatch("htmlNodeText", htmlElement);
      }
      console.log(htmlNodeText);

      axios
        .get("/" + htmlNodeText)
        .then((resp) => {
          let response = resp.data;

          if (response.length == []) {
            //this.spinnerLoader = true;
          } else if (response.length) {
            if (htmlNodeText != "members") {
              this.$router.push({ name: `displayMembers` });
            }

            this.$store.dispatch("searchedServerResponse", response);
            // console.log(this.$store.getters.searchedResult);
            // this.spinnerLoading = false;
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>