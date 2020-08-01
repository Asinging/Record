<template>
  <v-layout>
    <v-flex>
      <span>{{ formattedHtmlNodeText }}</span>
      <v-row>
        <!-- calender Start here -->

        <v-col cols="12" v-if="calender">
          <v-col ols="12" xs="12" sm="12" md="6" lg="4" xl="3">
            <v-date-picker
              v-model="dates"
              multiple
              color="orange"
              class="flat"
              elevation-0
            >
              <v-btn text color="orange" @click="cancel">Cancel</v-btn>
              <div class="flex-grow-1"></div>
              <v-btn text color="orange" @click="sumbitDates">Sumbit</v-btn>
            </v-date-picker>
          </v-col>
          <v-col cols="12" xs="12" sm="12" md="6" lg="4" xl="3">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              :return-value.sync="dates"
              transition="scale-transition"
              offset-y
              min-width="290px"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-combobox
                  v-model="dates"
                  multiple
                  chips
                  small-chips
                  label="Selected Dates"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-combobox>
              </template>
            </v-menu>
          </v-col>
        </v-col>
        <!-- spnner loader card starts from here -->
        <v-col cols="12" v-else-if="spinnerLoader">
          <div class="flex-grow-1"></div>
          <v-card
            height="120"
            v-bind:style="{
              backgroundColor: color[Math.floor(Math.random() * color.length)],
            }"
          >
            <v-p class="ma-5 white--text justify-center">
              please wait
              <v-progress-circular
                :size="40"
                class="white--text ma-5 justify-center"
                color="white"
                indeterminate
              ></v-progress-circular>
            </v-p>
          </v-card>
        </v-col>

        <!-- today's search start here -->

        <!-- custom search start here -->

        <v-col cols="12" v-else>
          <v-card
            v-bind:style="{
              backgroundColor: color[Math.floor(Math.random() * color.length)],
            }"
          >
            <v-card-title v-if="flag" class="white--text pd-4"
              >See Birthday range</v-card-title
            >
            <v-card-title v-else class="white--text pd-4"
              >Custom Search</v-card-title
            >

            <v-card-subtitle class="white--text ma-5"
              >This Allows You search for a desire dates</v-card-subtitle
            >

            <v-card-actions class="justify-end">
              <v-btn
                text
                class="white--text pd-3"
                id="custom_search"
                @click="requestData($event)"
                >details</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- this Week search -->

        <v-col cols="12">
          <v-card
            v-bind:style="{
              backgroundColor: color[Math.floor(Math.random() * color.length)],
            }"
          >
            <v-card-title class="headline white--text">This Week</v-card-title>

            <v-card-subtitle class="white--text ma-5"
              >You Can Pull Entry Just For This Week</v-card-subtitle
            >

            <v-card-actions class="justify-end">
              <v-btn
                text
                class="white--text pd-3"
                id="this_week"
                @click="requestData($event)"
                >details</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- this month Start here -->

        <v-col cols="12" md="12">
          <v-card
            v-bind:style="{
              backgroundColor: color[Math.floor(Math.random() * color.length)],
            }"
            class="white--text pd-3"
          >
            <v-card-title class="headline">This Month</v-card-title>

            <v-card-subtitle class="white--text ma-5"
              >The Month Entries Can Be Requsted</v-card-subtitle
            >

            <v-card-actions class="justify-end">
              <v-btn
                text
                class="white--text pd-3"
                id="this_month"
                @click="requestData($event)"
                >details</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>

        <!-- this year start -->

        <v-col cols="12">
          <v-card
            v-if="!flag"
            v-bind:style="{
              backgroundColor: color[Math.floor(Math.random() * color.length)],
            }"
          >
            <v-card-title class="white--text pd-3">
              This Year{{ color[Math.floor(Math.random() * color.length)] }}
            </v-card-title>

            <v-card-subtitle class="white--text ma-5"
              >The Entire Year Entries Can also Be Search</v-card-subtitle
            >

            <v-card-actions class="justify-end">
              <v-btn
                text
                class="white--text pd-3"
                id="this_year"
                @click="requestData($event)"
                >see more</v-btn
              >
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-flex>
  </v-layout>
</template>
<style scoped></style
><script>
export default {
  data() {
    return {
      flag: false,
      calender: false,
      menu: false,
      dates: [],
      spinnerLoader: false,
      formattedHtmlNodeText: "",
      htmlElementFromPreviousClick: "",
      serverResponse: [],
      calender: false,
      backgroundColor: "",

      color: [
        "#8BC34A",
        "#C8E6C9",
        "#8BC34A",

        "#A5D6A7",
        "#81C784",
        "#AED581",
        "#66BB6A",
      ],
    };
  },
  mounted() {
    this.htmlElementFromPreviousClick = localStorage.getItem("htmlNodeText");
    this.formattedHtmlNodeText = localStorage.getItem("formattedHtmlNodeText"); // differentiates it from the htmlNOdeText string with no space
    if (this.formattedHtmlNodeText == "Birthdays") {
      this.flag = true;
    }
  },
  watch: {
    dates() {
      this.dates.length > 2 ? this.dates.pop() : false;
    },
  },
  methods: {
    cancel() {
      this.calender = false;
      this.spinnerLoader = false;
    },
    sumbitDates() {
      // console.log(this.htmlNodeText);
      this.calender = true;
      // let htmlElementFromPreviousClick = this.htmlElementFromPreviousClick;

      if (this.dates.length != 2) {
        this.$swal("pls select two different Date");
      } else {
        let innerHtmlClicked = this.innerHtmlClicked;
        this.calender = false;
        this.spinnerLoader = true;

        let newDates = [];
        for (let i of this.dates) {
          let spltI = i.split("-").reverse();

          spltI = spltI.join("/");

          newDates.push(spltI);
        }
        let [date_1, date_2] = newDates;

        var dis = this;
        axios
          .get("http://localhost:1337/" + dis.htmlElementFromPreviousClick, {
            params: {
              record: innerHtmlClicked,
              date_1: date_1,
              date_2: date_2,
            },
          })
          .then((resp) => {
            let response = resp.data;
            //console.log(response);
            if (response.length == []) {
              this.spinnerLoader = true;
            } else if (response.length) {
              if (
                this.htmlElementFromPreviousClick == "secondTimers" ||
                this.htmlElementFromPreviousClick == "secondTimers"
              ) {
                this.$store.dispatch("searchedServerResponse", response);

                this.$router.push({
                  name: "displayMembers",
                });
              } else if (this.htmlElementFromPreviousClick) {
                this.$store.dispatch("searchedServerResponse", response);

                this.$router.push({
                  name: "displayBirthdays",
                });
              } else {
                for (let j of response) {
                  let total = 0;
                  Object.values(j).forEach((val) => {
                    if (!isNaN(val)) {
                      // id is also getting appended
                      total += val;
                    }
                  });

                  j.totalById = total;
                  dis.serverResponse.push(j);
                }
                //console.log(dis.serverResponse);
                this.$store.dispatch("searchedServerResponse", response);
                this.loading = false;
                this.$router.push({
                  name: "displayFinancialSearch",
                });
              }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
    requestData() {
      this.spinnerLoader = false;
      if (this.htmlElementFromPreviousClick == "financialRecords") {
        this.htmlElementFromPreviousClick = `financialRecords/select`;
      }

      this.innerHtmlClicked = event.target.parentElement.id;

      let innerHtmlClicked = this.innerHtmlClicked;
      localStorage.setItem("innerHtmlClicked", innerHtmlClicked);

      if (innerHtmlClicked == "custom_search") {
        this.calender = true;
      } else {
        this.calender = false;
        var dis = this;
        axios
          .get("http://localhost:1337/" + dis.htmlElementFromPreviousClick, {
            params: {
              record: innerHtmlClicked,
            },
          })
          .then((resp) => {
            let response = resp.data;

            if (response.length == []) {
              this.$router.push({
                name: "networkError",
              });
            } else if (response.length) {
              if (this.formattedHtmlNodeText) {
                console.log("this is it");
                this.$router.push({
                  name: "displayBirthdays",
                });
                this.$store.dispatch("searchedServerResponse", response);
              } else {
                console.log(this.formattedHtmlNodeText);
                console.log("this is it");
                for (let j of response) {
                  let total = 0;
                  Object.values(j).forEach((val) => {
                    if (!isNaN(val)) {
                      // id is also getting appended
                      total += val;
                    }
                  });

                  j.totalById = total;
                  dis.serverResponse.push(j);
                }
                //console.log(dis.serverResponse);
                this.$store.dispatch("searchedServerResponse", response);

                this.$router.push({
                  name: "displaySearch",
                });
              }
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    },
  },
};
</script>
