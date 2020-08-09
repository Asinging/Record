<template>
  <v-container class="ma-0">
    <v-layout>
      <!-- the header of the mounted page -->
      <v-row justify-center ma-0 transition="fab-transition">
        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
          <v-card class="elevation-0 pa-1">
            <v-row ma-0>
              <v-col cols="12" xl="12" lg="12">
                <v-card
                  class="elevation-0 ma-0 orange--text text-center text-lg-h1"
                  style="font-size:20px; font-family:aurial"
                >{{ formattedHtmlNodeText }}</v-card>
              </v-col>
            </v-row>

            <!-- the body of the mounted page -->

            <v-row mt-0>
              <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                <!-- the entire page card  aside the header-->
                <v-card class="elevation-0 ml-5 mt-0">
                  <v-row>
                    <v-col cols="12" xs="12" sm="6" md="6" lg="5 " xl="4">
                      <!-- this card contain the controls of the page e.g custom search  this year and etc -->
                      <v-card class="mt-0 elevation-0 pa-3">
                        <!-- custom search start here -->
                        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                          <v-card
                            class="white--text cards_action text-center pt-3 elevation-0"
                            height="50px"
                            @click="requestData($event)"
                            id="custom_search"
                            color="primary"
                          >Custom Search</v-card>
                        </v-col>

                        <!-- this Week search -->

                        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                          <v-card
                            class="white--text cards_action text-center pt-3 elevation-0"
                            height="50px"
                            @click="requestData($event)"
                            id="this_week"
                            color="primary"
                          >This Week</v-card>
                        </v-col>

                        <!-- this month Start here -->

                        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                          <v-card
                            class="white--text cards_action text-center pt-3 elevation-0"
                            height="50px"
                            @click="requestData($event)"
                            id="this_month"
                            color="primary"
                          >This Month</v-card>
                        </v-col>

                        <!-- this year start -->

                        <v-col cols="12" xs="12" sm="12" md="12" lg="12" xl="12">
                          <v-card
                            class="white--text cards_action text-center pt-3 elevation-0"
                            height="50px"
                            @click="requestData($event)"
                            id="this_year"
                            color="primary"
                          >This Year</v-card>
                        </v-col>
                      </v-card>
                    </v-col>

                    <!-- this wil display when  dates has been selected -->

                    <v-col cols="12" lg="4 " md="6" sm="6" xs="12" v-if="calender">
                      <v-card class="text-center elevation-0 pt-3">
                        <v-date-picker v-model="dates" multiple color="primary" class="elevation-1">
                          <v-btn text color="primary" @click="cancel">Cancel</v-btn>
                          <div class="flex-grow-1"></div>
                          <v-btn text color="primary" @click="requestData($event)">Sumbit</v-btn>
                        </v-date-picker>
                      </v-card>
                    </v-col>
                    <v-col cols="12" lg="2 " md="6" sm="6" xs="12" v-else-if=" menuCard">
                      <v-card class="text-center elevation-0 pt-5">
                        <v-date-picker v-model="dates" multiple color="primary" class="elevation-1">
                          <v-btn text color="primary" @click="cancel">Cancel</v-btn>
                          <div class="flex-grow-1"></div>
                          <v-btn text color="primary" @click="requestData($event)">Sumbit</v-btn>
                        </v-date-picker>
                      </v-card>
                    </v-col>
                    <v-col cols="12" lg="3 " md="6" sm="6" xs="12" v-if="menuCard">
                      <!-- the menu card -->
                      <v-card class="elevation-0 text-center">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          color="primary"
                          :close-on-content-click="false"
                          :return-value.sync="dates"
                          transition="scale-transition"
                          offset-y
                          min-width="500px"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-combobox
                              color="green"
                              class="orange-text"
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
                      </v-card>
                    </v-col>

                    <!-- the controls of the page the record searche -->
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>

      <!-- </v-flex> -->
    </v-layout>
  </v-container>
</template>
<style scoped>
.cards_action {
  cursor: pointer;
  font-size: 18px;
  font-family: sans-serif aurial;
  font: outlined;
  font-weight: bold;
}
</style>
<script>
import qs from "qs";
import Vue from "vue";
import Loader from "vue-loading-overlay";
Vue.use(Loader);

export default {
  data() {
    return {
      overHang: false,
      overHangMessage: "",
      flag: false,
      calender: false,
      menuCard: false,
      menu: false,
      dates: [],
      loading: "",
      spinnerLoader: false,
      formattedHtmlNodeText: "",
      innerHtmlElementFromPreviousClick: "",
      serverResponse: [],

      innerHtmlCurrentlyClicked: '"',
    };
  },
  mounted() {
    this.vueLoaderConfig = this.vueLoaderConfig = JSON.parse(
      localStorage.getItem("vueLoaderConfig")
    );
    this.innerHtmlElementFromPreviousClick = localStorage.getItem(
      "htmlNodeText"
    );

    console.log(this.innerHtmlElementFromPreviousClick);

    this.formattedHtmlNodeText = localStorage.getItem("formattedHtmlNodeText"); // differentiates it from the htmlNOdeText string with no space
    if (this.formattedHtmlNodeText == "Birthdays") {
      this.flag = true;
    }
  },
  watch: {
    overHang() {
      if (this.overHang == true) {
        let res = this.serverResponse;
        $("body").overhang({
          type: "error",
          custom: true,
          customconfirm: "overhang-overides",
          message: this.overHangMessage,
          accent: "green",
          primary: "orange",
          customClass: "",

          duration: 1,
          speed: 3000,
          easing: "easeOutBounce",
        });
      }
    },
    dates() {
      if (this.dates.length != []) {
        this.menuCard = true;
      }
      this.dates.length > 2 ? this.dates.pop() : false;
    },
  },
  methods: {
    cancel() {
      this.calender = false;
      this.spinnerLoader = false;
    },

    requestData() {
      this.menuCard = false;
      this.calender = false;
      let dis = this;
      var resp;
      this.$store.dispatch("serverResponse", "");
      this.innerHtmlCurrentlyClicked = event.target.id;

      const submitDates = () => {
        if (this.dates.length == []) {
          this.$swal("No date selected");
          alert("yes");
        } else if (this.dates.length < 2) {
          this.$swal("pls select range of different Dates to find record");
          this.calender = true;
          return false;
        } else {
          // let innerHtmlCurrentlyClicked = dis.innerHtmlCurrentlyClicked;

          this.calender = false;
          // this.spinnerLoader = true;
          let newDates = [];
          for (let i of this.dates) {
            let spltI = i.split("-").reverse();
            newDates.push(spltI.join("/"));
          }
          this.dates.length = [];
          // this custom dates will be use along side the header of the datatable
          this.$store.dispatch("customDatesQuery", newDates);
          return newDates;
        }
      };

      // the axios in action
      const axiosRequest = (firstparam, dateSelected) => {
        this.loading = this.$loading.show(this.vueLoaderConfig);

        if (dateSelected) {
          var [date_1, date_2] = dateSelected;
        }
        axios
          .get(
            "/" + dis.innerHtmlElementFromPreviousClick + "/select",
            {
              params: {
                record: firstparam,
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
              this.overHangMessage =
                "No record in the database matches what you requested for try  another request";
              this.overHang = true;
              setTimeout(() => {
                this.loading.hide();
              }, 1000);
            } else if (response.length) {
              this.loading.hide();
              this.$store.dispatch("serverResponse", response);
              if (
                this.innerHtmlElementFromPreviousClick == "firstTimers" ||
                this.innerHtmlElementFromPreviousClick == "secondTimers"
              ) {
                this.$router.push({
                  name: "displayMembers",
                });
              } else if (
                this.innerHtmlElementFromPreviousClick == "birthdays"
              ) {
                this.$router.push({
                  name: "displayBirthdays",
                });
              } else {
                for (let j of response) {
                  let total = 0;

                  Object.entries(j).forEach((val) => {
                    if (!isNaN(val[1]) && val[0] != "id") {
                      // id is also getting appended
                      total += val[1];
                    }
                  });
                  // total of the individual field e.g offering, tithe and thanksgiving
                  j.totalById = total;
                  this.serverResponse.push(j);
                }

                this.$store.dispatch("serverResponse", "");
                this.$store.dispatch("serverResponse", dis.serverResponse);
                this.loading = false;
                this.$router.push({
                  name: "displayFinancialSearch",
                });
              } //ends
            }
          })
          .catch((error) => {
            setTimeout(() => {
              this.overhang = true;
              this.loading.hide();
            });
            console.error(error);
          });
        // this.loading.hide();

        return false;
      };
      if (this.innerHtmlCurrentlyClicked != "") {
        localStorage.setItem(
          "innerHtmlCurrentlyClicked",
          dis.innerHtmlCurrentlyClicked
        );
      }

      if (
        this.innerHtmlCurrentlyClicked == "custom_search" &&
        this.dates.length == 0
      ) {
        this.calender = true;
      } else if (
        this.innerHtmlCurrentlyClicked != "custom_search" &&
        this.innerHtmlCurrentlyClicked != ""
      ) {
        let resp = axiosRequest(this.innerHtmlCurrentlyClicked);
      }
      if (this.dates.length) {
        const dateSelected = submitDates();
        // this.loader();
        if (dateSelected) {
          resp = axiosRequest("custom_search", dateSelected);
          // this.loading.hide();
        }
      }
    },
  },
};
</script>
