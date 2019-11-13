<template>
  <v-layout>
    <v-flex align-center>
      <v-card class="ma-1">
        <v-container>
          <v-text-field
            color="green"
            ref="email"
            v-model="email"
            :rules="[
            () => !!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || 'E-mail must be valid'
            ]"
            label="Email"
            placeholder="You@gmail.com"
            type="email"
            required
          ></v-text-field>
          <v-text-field
            color="green"
            ref="password"
            v-model="password"
            :rules="[
            () => !!password || 'password field must nto be empty']"
            label="password"
            type="password"
            required
            class="mb-5"
          ></v-text-field>
          <v-divider height="100"></v-divider>
          <div>
            <v-layout>
              <v-flex xs12>
                <span>
                  <router-link to="signUp" class="anchors">
                    <v-btn class="mt-2" color="orange" text>Sign Up</v-btn>
                  </router-link>
                </span>
              </v-flex>
              <v-flex xs3 justify-space-around>
                <span>
                  <v-btn
                    ripple="10"
                    class="mt-3 text-right login pr-3"
                    color="orange"
                    id="login"
                    text
                  >Login</v-btn>
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
      email: null,
      password: null
    };
  },
  computed: {
    form() {
      return {
        email: this.email,
        password: this.password
      };
    }
  },

  methods: {
    login() {
      this.formHasError = false;
      var email = this.email;
      var password = this.password;
      this.serverResponse = [];

      var login = {
        email: this.email,
        password: this.password
      };
      //validating the form fields
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          alert("this form has gbegeh");
          this.formHasError = true;
        }
        this.$refs[f].validate(true);
        //console.log(`this ${this.$ref[f]} is undefined`);
      });

      if (this.formHasError != true) {
        this.$store
          .dispatch("login", { email, password })
          .then(response => {
            this.$router.push("/");
          })
          .catch(err => {
            console.log(err);
          });
        //axiosInAction();
        //async function axiosInAction() {
        //this.serverResponse = [];
        var axiosRequest = axios
          .get("http://localhost:1337/login", {
            params: login
          })
          .catch(err => {
            console.log(err);
          })
          .then(response => {
            console.log(response);
            // if (response.status == 200 && "token" in response.config) {
            //   this.$session.start();
            //   this.$session.set("jwt", response.body.token);
            //   Vue.http.headers.common["Authorization"] =
            //     "Bearer " + response.body.token;
            //   console.log(response);
            let res = response.data.data;
            let token = response.data.token;
            localStorage = setItem("set-token", token);
            //resolve(response);

            res.forEach(items => {
              //Sres1;
              //console.log(items);
              this.serverResponse.push(items);
              //console.log(`this is the r1 ${serverResponse[counter]}`);
              Object.entries(items).forEach(initems => {
                //console.log(`this is the initems ${initems}`);
                let key = initems[0];
                let value = initems[1];

                //              let arr = `${key}:${value}`;
                //console.log(arr);
                //console.log(res1);
              });
            });
            alert("you have successfully login");
            this.$router.push("./");
            //}
          });
      }
      //}
      console.log(this.serverResponse);
      // if (axiosRequest == false) {
      //   console.log("i can't make request");
      // } else {
      //   //   this.password = "";
      //   //   this.serverResponse = res1;
      //   //   console.log(`this ${this.serverResponse}`);
    }
  }
};
</script>

<style scoped>
.anchors {
  text-decoration: none;
}
#login {
  padding-left: 20px;
}
</style>
