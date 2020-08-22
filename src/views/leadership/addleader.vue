

<template>
  <!-- <v-layout height="700"> -->

  <!-- <v-card class="elevation-0" height="500"> -->

  <v-container ma-0>
    <v-row>
      <v-col cols="12" xs="12" sm="12" lg="12" xl="12">
        <v-card class justify-center flat>
          <v-row>
            <v-col cols="12" xs="12" sm="6" md="6" lg="6" xl="6" class="hidden-xs-only">
              <i>
                <v-img src="img/devImages/heap.jpg" height="400" width="400" />
              </i>
            </v-col>

            <v-col cols="12" xs="12" sm="6  " md="6" lg="5" xl="5">
              <v-card class="elevation-0">
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
                      v-if="routeFromUpdateMembers"
                      color="green"
                      ref="dateOfService"
                      v-model="dateOfService"
                      label="Date of Service"
                      class="mb-5"
                    ></v-text-field>
                    <span v-if="routeFromUpdateMembers">
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
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- </v-card> -->
    <!-- </v-layout> -->
  </v-container>
</template>



  <!-- <v-layout justify-end>
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
              v-if="routeFromMembersComponent"
              color="green"
              ref="dateOfService"
              v-model="dateOfService"
              label="Date of Service"
              class="mb-5"
            ></v-text-field>
            <span v-if="routeFromMembersComponent">
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
  </v-layout> -->

<script>
import qs from "qs";
export default {
  data() {
    return {
      leader: "",
      validated: false,
      timelyComing: "",
      dateOfService: "",
      fullName: "",
      department: "",
      phone: "",
      dateOfBirth: "",
      address: "",
      prevRoute: {},
      formHasError: false,
      url: "",
      routeFromUpdateMembers: false,
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
    console.log(this.prevRoute);
    //making a permanet storage for the prevRoute so that when i refresh i can still have access to it
    localStorage.setItem("prevRoute", this.prevRoute.name);
    // this.prevRoute = this.$store.getters.getFromRoute;

    if (this.prevRoute == undefined) {
      let prevRoute = localStorage.getItem("prevRoute");
      this.$router.push({
        name: prevRoute,
      });
    }
    //check where the route is coming from
    if (
      this.prevRoute != "pastors" ||
      this.prevRoute != "ministers" ||
      this.prevRoute != "head of department"
    ) {
      this.leader = "members";
    } else {
      this.leader = localStorage.getItem("drawerInnerHtmlElement");
    }

    if (this.leader.trim() == "members") {
      this.routeFromUpdateMembers = true;
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
      //an interceptor function for removing trailling from integers
      function removingTrailingZeros(params) {
        let param = params.split("/");
        let arr = [];
        for (let x of param) {
          arr.push(parseInt(x));
        }
        arr = arr.join("/");

        return arr;
      }
      Object.keys(this.form).forEach((f) => {
        if (f == "dateOfService" || f == "dateOfBirth") {
          this.serverRequest[f] = removingTrailingZeros(this.form[f]); // remove any trailing zeros
        } else {
          this.serverRequest[f] = this.form[f];
        }
        if (this.routeFromUpdateMembers) {
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
        // localStorage.setItem("drawerInnerHtmlElement", element);
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
            if (response.data.length != 0) {
              //console.log(response.data);
              // this.$store.dispatch("serverResponse", response.data);

              this.$router.push({
                name: `${this.leader}`,
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
