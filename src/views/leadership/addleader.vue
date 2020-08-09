<template>
  <!-- <v-container fluid> -->
  <v-layout justify-end>
    <v-flex lg5 md5 sm8 xs12>
      <v-card class="elevation-1 ma-3 mt-0">
        <form ref="form" @submit.prevent="submit">
          <v-card class="elevation-0 ma-5 pt-5">
            <v-text-field
              outlined
              color="green"
              clearable
              ref="fullName"
              v-model="fullName"
              :rules="[() => !!fullName || 'name is empty']"
              label="Full Name"
              required
            ></v-text-field>
            <v-text-field
              dense
              outlined
              color="green"
              ref="department"
              :disabled="validated"
              v-model="department"
              :rules="[
                () => !!department || 'department field must not be empty',
              ]"
              label="department"
              required
              class="mb-5"
            ></v-text-field>
            <v-text-field
              color="green"
              outlined
              ref="phone"
              v-model="phone"
              :rules="[() => !!phone || 'phone field must not be empty']"
              label="phone"
              type="number"
              required
              class="mb-5"
            ></v-text-field>
            <v-text-field
              dense
              outlined
              color="green"
              ref="dateOfBirth"
              v-model="dateOfBirth"
              :rules="[
                () => !!dateOfBirth || 'Date of Birth field must not be empty',
              ]"
              label="Date of Birth"
              required
              class="mb-5"
            ></v-text-field>

            <v-text-field
              dense
              outlined
              color="green"
              ref="address"
              v-model="address"
              label="Where do you reside"
              class="mb-5"
            ></v-text-field>
            <v-text-field
              dense
              outlined
              v-if="caders"
              color="green"
              ref="dateOfService"
              v-model="dateOfService"
              label="Date of Service"
              class="mb-5"
            ></v-text-field>
            <span v-if="caders">
              <v-p color="gray">pls ignore if you are a member</v-p>
              <v-radio-group v-model="timelyComing" row>
                <v-radio label="First Timer" color="secondary" value="first"></v-radio>
                <v-radio label="Second Timer" color="secondary" value="second"></v-radio>
              </v-radio-group>
            </span>
            <v-divider height="50"></v-divider>
            <div>
              <v-layout>
                <v-flex xs10>
                  <span>
                    <v-btn class="mt-2" color="secondary" text @click="cancel">cancel</v-btn>
                  </span>
                </v-flex>
                <v-flex xs1>
                  <span>
                    <v-btn class="mt-2" color="secondary" text @click="submit">Submit</v-btn>.
                  </span>
                </v-flex>
              </v-layout>
            </div>
          </v-card>
        </form>
      </v-card>
    </v-flex>
  </v-layout>
  <!-- </v-container> -->
</template>
<script>
import qs from "qs";
export default {
  data() {
    return {
      validated: false,
      timelyComing: "",
      dateOfService: "",
      fullName: "",
      department: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      prevRoute: "this the previous route",
      formHasError: false,
      url: "",
      caders: false,
      serverResponse: [],
      serverRequest: {},
    };
  },
  beforeRouteEnter(to, from, next) {
    next((vm) => {
      from;
      vm.prevRoute = from;

      //vm.$store.dispatch("route", { route: vm.prevRoute.name });
    });
  },
  watch: {
    department() {
      if (this.leader == "ministers") {
        this.department = "Ministry";
        this.validated = true;
      }
    },
  },

  computed: {
    form() {
      return {
        fullName: this.fullName,
        department: this.department,
        phone: this.phone,
        dateOfBirth: this.dateOfBirth,
        timelyComing: this.timelyComing,
        dateOfService: this.dateOfService,
        address: this.address,
      };
    },
  },
  mounted() {
    //making a permanet storage for the prevRoute so that when i refresh i can still have access to it
    localStorage.setItem("prevRoute", this.prevRoute.name);
    // this.prevRoute = this.$store.getters.getFromRoute;

    if (this.prevRoute == undefined) {
      let preRoute = localStorage.getItem("prevRoute");
      this.$router.push({
        name: preRoute,
      });
    }
    if (this.prevRoute == "members") {
      this.leader = "members";
    } else {
      this.leader = localStorage.getItem("htmlNodeText");
    }

    if (this.leader.trim() == "members") {
      this.caders = true;
    }
  },
  methods: {
    cancel() {
      //just incase the value in the store does not holds
      // if (this.$store.getters.getFromRoute) {
      this.$router.push({
        name: `${this.prevRoute.name}`,
      });
    },
    submit() {
      function removingTrailingZeros(params) {
        let param = params.split("/");
        let rr = [];
        for (let x of param) {
          rr.push(parseInt(x));
        }
        rr = rr.join("/");

        return rr;
      }
      Object.keys(this.form).forEach((f) => {
        if (f == "dateOfService" || f == "dateOfBirth") {
          this.serverRequest[f] = removingTrailingZeros(this.form[f]); // remove any trailing zeros
        } else {
          this.serverRequest[f] = this.form[f];
        }
        if (this.caders) {
          if (!this.form[f] && this.form[f] == "dateOfService") {
            this.$swal({
              text: `${f} field must not be exmpty`,
            });
            this.formHasError = true;
          }
        }
      });

      if (!this.formHasError) {
        // let element = this.prevRoute.name.toLowerCase().slice(0, -1);
        let element = this.leader.toLowerCase();
        let url = `add${element}`;
        let dis = this;
        let params = this.serverRequest;

        axios
          .post("/" + url, qs.stringify(params), {
            header: {
              "Content-Type": "application/json",
              // "Access-Control-Allow-Orign": "*",
            },
          })
          .then((response) => {
            if (response.data.lenght !== 0) {
              //console.log(response.data);
              // this.$store.dispatch("serverResponse", response.data);

              this.$router.push({
                name: `${this.prevRoute.name}`,
              });
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    },
  },
};
</script>
<style scoped>
.anchor {
  text-decoration: none;
}
</style>
