<template>
  <v-layout>
    <v-flex align-center>
      <v-card ref="form" class="ma-3">
        <v-container>
          <v-text-field
            color="green"
            clearable
            ref="fullName"
            v-model="fullName"
            :rules="[
            () => !!fullName|| 'E-mail must be valid']"
            label="Full Name"
            required
          ></v-text-field>
          <v-text-field
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
            color="green"
            ref="dateOfBirth"
            v-model="dateOfBirth"
            :rules="[
            () => !!dateOfBirth || 'Date of Birth field must not be empty']"
            label="Date of Birth"
            required
            class="mb-5"
          ></v-text-field>

          <v-divider height="100"></v-divider>
          <div>
            <v-layout>
              <v-flex xs10>
                <span>
                  <v-btn class="mt-2" color="orange" text @click="cancel">cancel</v-btn>
                </span>
              </v-flex>
              <v-flex xs1>
                <span>
                  <v-btn class="mt-2" color="orange" text @click=" submit">Submit</v-btn>.
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
      fullName: "",
      department: "",
      phone: "",
      dateOfBirth: "",
      prevRoute: "this the previous route",
      formHasError: false,
      url: "",
      leader: ""
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
        dateOfBirth: this.dateOfBirth
      };
    }
  },
  mounted() {
    //console.log(this.$prevRoute.path);
    // if (this.prevRoute.name == "ministers") {
    //   console.log(this);
    //   this.department = "minister";
    // }
    // this.leader = this.$store.getters.getHtmlElementClicked;
    this.leader = localStorage.getItem("htmlNODEText");
  },
  methods: {
    cancel() {
      //just incase the value in the store does not holds
      // if (this.$store.getters.getFromRoute) {
      this.$router.push({
        path: `${this.$store.getters.getFromRoute}`
      });
      // } else {
      //   this.$router.push({
      //     path: `${localStorage.getItem("prevRoute")}`
      //   });
      // }
    },
    submit() {
      this.prevRoute.name;
      // console.log(this.prevRoute.name);
      let fullName = this.fullName;
      let department = this.department;
      let phone = this.phone;
      let dateOfBirth = this.dateOfBirth;

      this.formHasError = false;

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          this.$swal({
            text: `${f} field must not be exmpty`
          });
          this.formHasError = true;
        }
        this.$refs[f].validate(true);
      });

      if (!this.formHasError) {
        // let element = this.prevRoute.name.toLowerCase().slice(0, -1);
        let element = this.leader.toLowerCase();
        let combinUrl = `add${element}`;
        //console.log(this.leader, combinUrl);
        // this.url = combinUrl;
        // let requestUrl = this.url;

        axios
          .get(
            "http://localhost:1337/" + combinUrl,

            {
              params: {
                fullName: fullName,
                department: department,
                phone: phone,
                dateOfBirth: dateOfBirth
              }
            },
            {
              headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Orign": "*"
              }
            }
          )
          .then(response => {
            if (response !== undefined) {
              this.$router.push(`./${this.prevRoute.name}`);
              //this.$router.push("/addpastor.vue");
              //els;
            }
          })
          .catch(err => {
            console.log(err);
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
