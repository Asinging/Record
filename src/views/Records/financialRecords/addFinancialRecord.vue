<template>
  <v-card ref="form" flat class="mt-1">
    <v-container fluid>
      <slot name="theParentComponent"></slot>
      <v-row>
        <v-col cols="12" sm="6" lg="4">
          <v-text-field
            label="Offering"
            shaped
            prepend-inner-icon="mdi-currency-ngn"
            auto-grow
            :rules="[
              () =>
                !isNaN(offering) ||
                offering.match(/^(\d+,)*\d+$/) ||
                'sorry field is expecting number',
            ]"
            outlined
            row-height="15"
            v-model="offering"
            placeholder="0.000.00"
            ref="offering"
            color="green"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" lg="4">
          <v-text-field
            prepend-inner-icon="mdi-currency-ngn"
            shaped
            auto-grow
            outlined
            :rules="[
              () =>
                !isNaN(tithe) ||
                tithe.match(/^(\d+,)*\d+$/) ||
                'sorry field is expecting number',
            ]"
            label="Tithe"
            row-height="15"
            v-model="tithe"
            ref="tithe"
            placeholder="0.000.00"
            color="green"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" lg="4">
          <v-text-field
            prepend-inner-icon="mdi-currency-ngn"
            shaped
            auto-grow
            outlined
            label="ThanksGiving"
            row-height="15"
            :rules="[
              () =>
                !isNaN(thanksGiving) ||
                thanksGiving.match(/^(\d+,)*\d+$/) ||
                'sorry field is expecting number',
            ]"
            v-model="thanksGiving"
            ref="thanksGiving"
            placeholder="0.000.00"
            color="green"
          ></v-text-field>
        </v-col>
        <v-col cols="12" sm="6" lg="4">
          <v-text-field
            shaped
            auto-grow
            outlined
            label="Date Of transnction"
            row-height="15"
            v-model="date"
            ref="date"
            type="string"
            placeholder="12/12/2000"
            color="green"
            required
          ></v-text-field>
        </v-col>
      </v-row>
      <!-- <v-divider></v-divider> -->
      <v-layout>
        <v-flex xs12>
          <v-Button :clickFnc="cancel">
            <template #btn
              >cancel</template
            >
          </v-Button>
        </v-flex>
        <v-flex xs5 offset-lg8 offset-xs1>
          <v-Button :clickFnc="submit">
            <template #btn
              >sumbit</template
            >
          </v-Button>
        </v-flex>
      </v-layout>
    </v-container>
  </v-card>
</template>
<script>
import Button from "../../../components/customSlots.vue";
import qs from "qs";
export default {
  components: {
    "v-Button": Button,
  },
  data() {
    return {
      commaValue: function numberWithCommas(x) {
        let num = parseInt(x);

        if (num) {
          return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        } else {
          return x;
        }
      },
      formattedInputValue: function convertToNumber(x) {
        let inputValue = x.split(",");
        return parseInt(inputValue.join(""));
      },
      slotProps: "",
      offering: "",
      tithe: "",
      thanksGiving: "",
      date: "",
      formHasError: false,
      emptyFields: "",

      sentData: [],
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      from;
      vm.prevRoute = from;

      vm.$store.dispatch("route", { route: vm.prevRoute.name });
    });
  },
  computed: {
    form() {
      // let formattedInputValue = split();
      return {
        offering: this.formattedInputValue(this.offering),
        tithe: this.formattedInputValue(this.tithe),
        thanksGiving: this.formattedInputValue(this.thanksGiving),
        date: this.date,
      };
    },
  },
  watch: {
    offering() {
      let num = this.offering.split(",");
      this.offering = this.commaValue(num.join(""));
    },

    tithe() {
      let num = this.tithe.split(",");
      this.tithe = this.commaValue(num.join(""));
    },

    thanksGiving() {
      let num = this.thanksGiving.split(",");
      this.thanksGiving = this.commaValue(num.join(""));
    },
  },
  methods: {
    cancel() {
      this.$router.push({
        //path: `${this.$store.getters.getFromRoute}`
        name: `${localStorage.getItem("htmlNodeText")}`,
      });
    },
    submit() {
      console.log(this);
      let obb = {};
      this.formHasError == false;
      let counter = 0;

      Object.entries(this.form).forEach((value) => {
        // capturing the fields that are not empty and putting the values in a different arr to be sent to the server
        if (value) {
          for (let i = 0; i <= value.length; i++) {
            counter = i + 1;
            // checking for  empty fields
            if (value[counter] && !this.emptyFields) {
              this.emptyFields = value[counter];
            }

            if (value[i] === "offering") {
              //alert("hi");
              if (value[counter]) {
                this.offering = value[counter];
              }
              return;
            }
            if (value[i] === "tithe") {
              if (value[counter]) {
                this.tithe = value[counter];
              }
              return;
            }
            if (value[i] === "thanksGiving") {
              if (value[counter]) {
                this.thanksGiving = value[counter];
              }
            }
          }
        }
      });
      console.log(this.offering);
      let dis = this;
      if (this.date && (this.offering || this.tithe || this.thanksGiving)) {
        let params = {
          offering: this.offering,
          tithe: this.tithe,
          thanksGiving: this.thanksGiving,
          date: this.date,
        };
        axios
          .post("/financeRecords/insert", qs.stringify(params), {
            header: {
              "Content-type": "application/json",
            },
          })
          .then((response) => {
            if (response) {
              console.log(response);
              this.$router.push({
                //path: `${this.$store.getters.getFromRoute}`
                name: localStorage.getItem("htmlNodeText"),
              });
            }
          });
      } else if (this.emptyFields == "") {
        this.$swal("all the fields must not be empty");
      }
      if (this.date == "") {
        this.$swal("date field must not empty");
      }
    },
  },
};
</script>
