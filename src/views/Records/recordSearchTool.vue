<template>
  <v-container class="ma-0">
    <!-- <v-layout>
    <v-flex> -->
    <v-row justify-center ma-0 transition="fab-transition">
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
        <v-card class="elevation-0 pa-1">
          <v-row justify-center
            ><v-col cols="12" xl="4" lg="12">
              <v-card
                class=" elevation-0 ma-5 orange--text  text-center text-lg-h1 justify-center"
                style="font-size:35px; font-family:aurial"
                >{{ formattedHtmlNodeText }}</v-card
              ></v-col
            >
          </v-row>

          <v-row>
            <!-- calender Start here -->

            <v-col cols="12" v-if="calender">
              <v-col cols="12" xs="12" sm="12" md="5" lg="6" xl="3">
                <v-date-picker
                  v-model="dates"
                  multiple
                  color="primary"
                  class="elevation-1"
                >
                  <v-btn text color="primary" @click="cancel">Cancel</v-btn>
                  <div class="flex-grow-1"></div>
                  <v-btn text color="primary" @click="sumbitDates"
                    >Sumbit</v-btn
                  >
                </v-date-picker>
              </v-col>
              <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="3">
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
            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="6"
              lg="4"
              xl="3"
              v-else-if="spinnerLoader"
            >
              <div class="flex-grow-1"></div>
              <v-card
                height="120"
                v-bind:style="{
                  backgroundColor:
                    color[Math.floor(Math.random() * color.length)],
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

            <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="3" v-else>
              <v-card
                class="pa-3"
                v-bind:style="{
                  backgroundColor:
                    color[Math.floor(Math.random() * color.length)],
                }"
              >
                <v-card-title v-if="flag" class="white--text pd-4"
                  >See Birthday range</v-card-title
                >
                <v-card-title v-else class="white--text pd-4"
                  >Custom Search</v-card-title
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

            <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="3">
              <v-card
                class="pa-3"
                v-bind:style="{
                  backgroundColor:
                    color[Math.floor(Math.random() * color.length)],
                }"
              >
                <v-card-title class="headline white--text"
                  >This Week</v-card-title
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

            <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="3">
              <v-card
                v-bind:style="{
                  backgroundColor:
                    color[Math.floor(Math.random() * color.length)],
                }"
                class="white--text  pa-3"
              >
                <v-card-title class="headline">This Month</v-card-title>

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

            <v-col cols="12" xs="12" sm="6" md="4" lg="4" xl="3">
              <v-card
                class="pa-3"
                v-if="!flag"
                v-bind:style="{
                  backgroundColor:
                    color[Math.floor(Math.random() * color.length)],
                }"
              >
                <v-card-title class="white--text pd-3">
                  This Year{{ color[Math.floor(Math.random() * color.length)] }}
                </v-card-title>

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
          </v-row></v-card
        >
      </v-col>
    </v-row>

    <!-- </v-flex>
  </v-layout> -->
  </v-container>
</template>
<style scoped></style>
<script>
import qs from "qs";
export default {
  data() {
    return {
      flag: false,
      calender: false,
      menu: false,
      dates: [],
      spinnerLoader: false,
      formattedHtmlNodeText: "",
      innerHtmlElementFromPreviousClick: "",
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
    this.innerHtmlElementFromPreviousClick = localStorage.getItem(
      "htmlNodeText"
    );
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
      // let innerHtmlElementFromPreviousClick = this.innerHtmlElementFromPreviousClick;

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
          .get(
            "/" + dis.innerHtmlElementFromPreviousClick,
            {
              params: {
                record: innerHtmlClicked,
                date_1: date_1,
                date_2: date_2,
              },
            },
            {
              header: {
                "Content-type": "application/json",
              },
            }
          )
          .then((resp) => {
            let response = resp.data;
            if (response.length == []) {
              this.spinnerLoader = true; //bring loader here
            } else if (response.length) {
              if (
                this.innerHtmlElementFromPreviousClick == "firstTimers" ||
                this.innerHtmlElementFromPreviousClick == "secondTimers"
              ) {
                this.$store.dispatch("serverResponse", response);

                this.$router.push({
                  name: "displayMembers",
                });
              } else if (
                this.innerHtmlElementFromPreviousClick == "Birthdays"
              ) {
                this.$store.dispatch("serverResponse", response);

                this.$router.push({
                  name: "displayBirthdays",
                });

                // finacial search goes here
              } else {
                //console.log(response);
                for (let j of response) {
                  let total = 0;
                  Object.values(j).forEach((val) => {
                    console.log(val)
                    if (!isNaN(val)) {
                      
                      // id is also getting appended
                      total += val;
                    }
                  });

                  j.totalById = total;
                  dis.serverResponse.push(j);
                }
                //console.log(dis.serverResponse);
                this.$store.dispatch("serverResponse", response);
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
      if (this.innerHtmlElementFromPreviousClick == "financialRecords") {
        this.innerHtmlElementFromPreviousClick = "financialRecords/select";
      }

      this.innerHtmlClicked = event.target.parentElement.id;

      let innerHtmlClicked = this.innerHtmlClicked;
      localStorage.setItem("innerHtmlClicked", innerHtmlClicked);

      if (innerHtmlClicked == "custom_search") {
        this.calender = true;
      } else {
        this.calender = false;
        var dis = this;
        console.log(innerHtmlClicked);

        axios
          .get(
            "/" + dis.innerHtmlElementFromPreviousClick,
            {
              params: {
                record: innerHtmlClicked,
              },
            },
            {
              header: { "Content-type": "application/json" },
            }
          )
          .then((resp) => {
            let response = resp.data;

            if (response.length == []) {
              this.$router.push({
                name: "networkError",
              });
            } else if (response.length) {
              if (this.formattedHtmlNodeText) {
                this.$router.push({
                  name: "displayBirthdays",
                });
                this.$store.dispatch("serverResponse", response);
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
                this.$store.dispatch("serverResponse", response);

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
