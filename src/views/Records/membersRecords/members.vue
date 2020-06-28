<template>
  <v-container align-center>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col cols="12" xs="6" sm="6" md="6">
            <v-avatar
              v-ripple="{ center: true, class: `white--text` }"
              size="200"
              class="justify-center avater"
              v-bind:style="{backgroundColor:color[
              Math.floor(Math.random() *color.length)]}"
              @click="requestData($event)"
            >
              <span class="white--text headline">Members</span>
            </v-avatar>
          </v-col>
          <v-col cols="12" xs="6" sm="6" md="6">
            <v-avatar
              v-ripple="{ center: true, class: `white--text` }"
              class="justify-right avater"
              size="210"
              v-bind:style="{backgroundColor:color[
              Math.floor(Math.random() *color.length)]}"
              @click="updateData"
            >
              <span class="white--text headline">
                Update members
                <p>Records</p>
              </span>
            </v-avatar>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6">
            <v-avatar
              v-ripple="{ center: true, class: `white--text` }"
              class="justify-right avater"
              size="210"
              v-bind:style="{backgroundColor:color[
              Math.floor(Math.random() *color.length)]}"
              @click="requestData($event)"
            >
              <span class="white--text headline">Irregular Members</span>
            </v-avatar>
          </v-col>
          <v-col cols="12" xs="12" sm="6" md="6">
            <v-avatar
              class="avater"
              v-ripple="{ center: true, class: `white--text` }"
              size="210"
              v-bind:style="{backgroundColor:color[
              Math.floor(Math.random() *color.length)]}"
              @click="requestData($event)"
            >
              <span class="white--text headline">Regular members</span>
            </v-avatar>
          </v-col>
          <v-col cols="12" sm="6" md="6">
            <v-data-table
              id="printSection"
              v-model="selected"
              :headers="headers"
              :items=" DOMDisplayContent"
              item-key="full_name"
              :loading-text="loadingMessage"
              class="elevation-1"
            ></v-data-table>
          </v-col>
        </v-row>
      </v-flex>
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
        "#DAA520"
      ],
      headers: [
        { text: "S/N", value: "id", sortable: true },
        {
          text: "Full name",
          value: "full_name"
        },
        { text: "Department", value: "department" },
        { text: "phone", value: "phone" },
        { text: "Date Of Birth", value: "date_of_birth" },
        { text: "Rank", value: "role" },
        { text: "Address", value: "address" }
      ]
    };
  },
  mounted() {
    this.serverResponse = this.$store.getters.serverResponse;

    // for (let x of this.serverResponse) {
    //   for (let y of x) {
    //     this.DOMDisplayContent.push(y);
    //   }
    // }
    // console.log(this.serverResponse);
    // console.log(this.DOMDisplayContent);
  },
  watch: {
    dates() {
      this.dates.length > 2 ? this.dates.pop() : false;
    }
  },
  computed: {
    // serverResponse() {
    //   return {
    //     serverResponse: this.serverResponse
    //   };
    // }
  },

  methods: {
    updateData() {
      this.$router.push({
        name: "addLeader"
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

      axios
        .get("http://localhost:1337/" + htmlNodeText, {
          // headers: {
          //   "content-type": "application/json",
          //   "Access-Control-Allow-Orign": "*"
          // }
        })
        .then(resp => {
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
        .catch(error => {
          console.error(error);
        });
    }
  }
};
</script>