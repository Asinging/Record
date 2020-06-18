<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-row dense>
          <!-- calender Start here -->

          <v-col cols="12" v-if="calender">
            <v-col cols="12" sm="6">
              <v-date-picker v-model="dates" multiple color="orange">
                <v-btn text color="orange" @click="cancel">Cancel</v-btn>
                <v-btn text color="orange" class="justify-end" @click="sumbitDates">Sumbit</v-btn>
              </v-date-picker>
            </v-col>
            <v-col cols="12" sm="6">
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
            <v-card
              height="120"
              v-bind:style="{backgroundColor:color[
              Math.floor(Math.random() *color.length)]}"
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

          <!-- custom search start here -->

          <v-col cols="12" v-else>
            <v-card
              v-bind:style="{backgroundColor:color[
             Math.floor(Math.random() *color.length)]}"
            >
              <v-card-title class="white--text pd-4">Custom Search</v-card-title>

              <v-card-subtitle class="white--text ma-5">This Allows You search for a desire dates</v-card-subtitle>

              <v-card-actions class="justify-end">
                <v-btn
                  text
                  class="white--text pd-3"
                  id="custom_search"
                  @click="requestData($event)"
                >details</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- this Week search -->

          <v-col cols="12">
            <v-card
              v-bind:style="{backgroundColor:color[
      Math.floor(Math.random() *color.length)]}"
            >
              <v-card-title class="headline white--text">This Week</v-card-title>

              <v-card-subtitle class="white--text ma-5">You Can Pull Entry Just For This Week</v-card-subtitle>

              <v-card-actions class="justify-end">
                <v-btn
                  text
                  class="white--text pd-3"
                  id="this_week"
                  @click="requestData($event)"
                >details</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- this month Start here -->

          <v-col cols="12">
            <v-card
              v-bind:style="{backgroundColor:color[
      Math.floor(Math.random() *color.length)]}"
              class="white--text pd-3"
            >
              <v-card-title class="headline">This Month</v-card-title>

              <v-card-subtitle class="white--text ma-5">The Month Entries Can Be Requsted</v-card-subtitle>

              <v-card-actions class="justify-end">
                <v-btn
                  text
                  class="white--text pd-3"
                  id="this_month"
                  @click="requestData($event)"
                >details</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>

          <!-- this year start -->

          <v-col cols="12">
            <v-card color="orange">
              <v-card-title class="white--text pd-3">This Year</v-card-title>

              <v-card-subtitle class="white--text ma-5">The Entire Year Entries Can also Be Search</v-card-subtitle>

              <v-card-actions class="justify-end">
                <v-btn
                  text
                  class="white--text pd-3"
                  id="this_year"
                  @click="requestData($event)"
                >see more</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style scoped>
</style><script>
export default {
  data() {
    return {
      calender: false,
      menu: false,
      dates: [],
      spinnerLoader: false,
      htmlNodeText: "",
      htmlElementFromPreviousClick: "",
      serverResponse: [],
      calender: false,
      backgroundColor: "",

      color: [
        "#FF4500",
        "#FFD700",
        "#FFA500",
        "#FF8C00",
        "#FF6347",
        "#E6B428",
        "#F9AC48",
        "#F29215",
        "#B56F15",
        "#FFAE09",
        "#DAA520"
      ]
    };
  },
  mounted() {
    this.htmlElementFromPreviousClick = localStorage.getItem("htmlNodeText");
  },
  watch: {
    dates() {
      this.dates.length > 2 ? this.dates.pop() : false;
    }
  },
  methods: {
    cancel() {
      this.calender = false;
      this.spinnerLoader = false;
    },
    sumbitDates() {
      console.log(this.htmlNodeText);
      this.calender = true;
      // let htmlElementFromPreviousClick = this.htmlElementFromPreviousClick;

      if (this.dates.length != 2) {
        this.$swal("pls select two different Date");
      } else {
        let htmlNodeText = this.htmlNodeText;
        this.calender = false;
        this.spinnerLoader = true;

        let newDates = [];
        for (let i of this.dates) {
          let spltI = i.split("-").reverse();

          spltI = spltI.join("/");
          console.log(spltI);
          newDates.push(spltI);
        }
        let [date_1, date_2] = newDates;

        var dis = this;
        axios
          .get("http://localhost:1337/" + dis.htmlElementFromPreviousClick, {
            params: {
              record: htmlNodeText,
              date_1: date_1,
              date_2: date_2
            }
          })
          .then(resp => {
            let response = resp.data;
            //console.log(response);
            if (response.length == []) {
              this.spinnerLoader = true;
            } else if (response.length) {
              for (let j of response) {
                let total = 0;
                Object.values(j).forEach(val => {
                  if (!isNaN(val)) {
                    total += val;
                  }
                  ``;
                });
                j.totalById = total;
                dis.serverResponse.push(j);
              }
              //console.log(dis.serverResponse);
              this.$store.dispatch("searchedServerResponse", response);
              // console.log(this.$store.getters.searchedResult);
              this.spinnerLoading = false;
              this.$router.push({
                name: "displaySearch"
              });
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    },
    requestData() {
      if (this.htmlElementFromPreviousClick == "financialRecords") {
        this.htmlElementFromPreviousClick = `financialRecords/select`;
      }

      this.htmlNodeText = event.target.parentElement.id;
      console.log(this.htmlNodeText);
      let htmlNodeText = this.htmlNodeText;

      if (htmlNodeText == "custom_search") {
        this.calender = true;
      } else {
        this.calender = false;
        var dis = this;
        axios
          .get("http://localhost:1337/" + dis.htmlElementFromPreviousClick, {
            params: {
              record: htmlNodeText
            }
          })
          .then(resp => {
            let response = resp.data;

            if (response.length == []) {
            } else if (response.length) {
              for (let j of response) {
                let total = 0;
                Object.values(j).forEach(val => {
                  if (!isNaN(val)) {
                    // id is also getting appended
                    total += val;
                    console.log(total);
                  }
                });

                j.totalById = total;
                dis.serverResponse.push(j);
              }
              //console.log(dis.serverResponse);
              this.$store.dispatch("searchedServerResponse", response);
              for (let j of response) this.loading = false;
              this.$router.push({
                name: "displaySearch"
              });
            }
          })
          .catch(error => {
            console.error(e);
          });
      }
    }
  }
};
</script>