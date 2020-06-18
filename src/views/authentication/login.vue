<template>
  <v-layout>
    <v-flex align-center>
      <v-card class="ma-1" ref="form">
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
                  <v-btn class="mt-2" color="orange" text @click="signUp">Sign Up</v-btn>
                </span>
              </v-flex>
              <v-flex xs3 justify-space-around>
                <span>
                  <v-btn
                    class="mt-3 text-right login pr-3"
                    color="orange"
                    id="login"
                    tile
                    text
                    @click="login"
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
      email: "",
      password: "",
      formHasError: false
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
    signUp() {
      this.$router.push({
        path: "./signUp"
      });
    },
    login() {
      this.formHasError = false;
      var email = this.email;
      var password = this.password;
      this.serverResponse = [];

      //            _ _     _       _   _                __                         __ _      _     _
      // __   ____ _| (_) __| | __ _| |_(_)_ __   __ _   / _| ___  _ __ _ __ ___    / _(_) ___| | __| |
      // \ \ / / _` | | |/ _` |/ _` | __| | '_ \ / _` | | |_ / _ \| '__| '_ ` _ \  | |_| |/ _ \ |/ _` |
      //  \ V / (_| | | | (_| | (_| | |_| | | | | (_| | |  _| (_) | |  | | | | | | |  _| |  __/ | (_| |
      //   \_/ \__,_|_|_|\__,_|\__,_|\__|_|_| |_|\__, | |_|  \___/|_|  |_| |_| |_| |_| |_|\___|_|\__,_|
      //                                          |___/
      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          this.formHasError = true;
        }
        this.$refs[f].validate(true);
      });

      if (this.formHasError !== true) {
        // this.$store
        //   .dispatch("login", { email, password })
        //   .then(response => {
        //     this.$router.push("/");
        //   })
        //   .catch(err => {
        //     console.log(err);
        //   });
        var loginD = {
          email: this.email,
          password: this.password
        };
        var axiosRequest = axios
          .get("http://localhost:1337/login", {
            params: loginD
          })
          .catch(err => {
            console.log(err);
          })
          .then(response => {
            console.log(response);

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
                let key = initems[0];
                let value = initems[1];
              });
            });
            alert("you have successfully login");
            this.$router.push("./");
            //}
          });
        console.log(this.serverResponse);
      }
    }
  }
};
</script>

<style scoped>
#login {
  padding-left: 20px;
}
</style>
 