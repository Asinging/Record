<template>
  <v-layout>
    <v-flex align-center>
      <v-card ref="form" class="ma-3 elevation-0" width="200">
        <v-container>
          <v-text-field
            dense
            color="green"
            clearable
            ref="fullName"
            v-model="fullName"
            :rules="[
            () => !!fullName|| 'name is empty']"
            label="Full Name"
            required
          ></v-text-field>
          <v-text-field
            dense
            color="green"
            ref="department"
            :disabled="validated"
            v-model="department"
            :rules="[
            () => !!department || 'department field must not be empty']"
            label="department"
            required
            class="mb-5"
          ></v-text-field>
          <v-text-field
            color="green"
            ref="phone"
            v-model="phone"
            :rules="[
            () => !!phone || 'phone field must not be empty']"
            label="phone"
            type="number"
            required
            class="mb-5"
          ></v-text-field>
          <v-text-field
            dense
            color="green"
            ref="dateOfBirth"
            v-model="dateOfBirth"
            :rules="[
            () => !!dateOfBirth || 'Date of Birth field must not be empty']"
            label="Date of Birth"
            required
            class="mb-5"
          ></v-text-field>

          <v-text-field
            dense
            color="green"
            ref="address"
            v-model="address"
            label="Where do you reside"
            class="mb-5"
          ></v-text-field>
          <v-text-field
            dense
            v-if="caders"
            color="green"
            ref="dateOfService"
            v-model="dateOfService"
            label="Date of Service"
            class="mb-5"
          ></v-text-field>
          <span v-if="caders">
            <v-p color="gray">pls ignore if you are member</v-p>
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
                  <v-btn class="mt-2" color="secondary" text @click=" submit">Submit</v-btn>.
                </span>
              </v-flex>
            </v-layout>
          </div>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
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
      serverRequest: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      from;
      vm.prevRoute = from;

      vm.$store.dispatch("route", { route: vm.prevRoute.name });
    });
  },
  watch: {
    department() {
      if (this.leader == "ministers") {
        this.department = "Ministry";
        this.validated = true;
      }
    }
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
        address: this.address
      };
    }
  },
  mounted() {
    this.prevRoute = this.$store.getters.getFromRoute;
    console.log(this.prevRoute);
    //this.cader = localStorage.getItem("extractedText");
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
        name: `${this.prevRoute.name}`
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
      // let fullName = this.fullName;
      // let department = this.department;
      // let phone = this.phone;
      // let dateOfBirth = this.dateOfBirth;
      // if (this.caders) {
      //   var timelyComing = this.timelyComing;
      //   var dateOfService = this.dateOfService;
      //   var address = this.address;
      // }

      Object.keys(this.form).forEach(f => {
        if (f == "dateOfService" || f == "dateOfBirth") {
          this.serverRequest[f] = removingTrailingZeros(this.form[f]); // remove any trailing zeros
        } else {
          this.serverRequest[f] = this.form[f];
        }

        //console.log(this.form[f], f);
        if (this.caders) {
          if (!this.form[f] && this.form[f] == "dateOfService") {
            this.$swal({
              text: `${f} field must not be exmpty`
            });
            this.formHasError = true;
          }
        }
      });

      if (!this.formHasError) {
        // let element = this.prevRoute.name.toLowerCase().slice(0, -1);
        let element = this.leader.toLowerCase();
        let combinUrl = `add${element}`;
        console.log(this.serverRequest);
        let dis = this;
        axios
          .get(
            "http://localhost:1337/" + combinUrl,
            {
              params: dis.serverRequest
            },
            {
              headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Orign": "*"
              }
            }
          )
          .then(response => {
            if (response.data.lenght !== 0) {
              //this.$router.push("/addpastor.vue");
              //console.log(response.data);
              this.$store.dispatch("searchedServerResponse", response.data);

              this.$router.push({
                name: `${this.prevRoute.name}`
              });
            }
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  }
};
</script>
<style scoped>
.anchor {
  text-decoration: none;
}
</style>
