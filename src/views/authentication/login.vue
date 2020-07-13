<template>
  <v-container>
    <v-layout>
      <v-flex>
        <form @submit.prevent="login" class="vld-parent" ref="formContainer">
          <v-card class="ml-8 mr-8 elevation-0" ref="form">
            <v-text-field
              prepend-icon="mdi-email"
              dense
              color="primary"
              ref="email"
              v-model="email"
              :rules="[
            () => !!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || 'E-mail must be valid'
            ]"
              label="Email"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-key"
              dense
              color="primary"
              ref="password"
              v-model="password"
              :rules="[
            () => !!password || 'password field must nto be empty']"
              label="password"
              type="password"
              required
              class="mb-5"
            ></v-text-field>
            <v-flex offset-lg10 offset-xs10 offset-md10>
              <Buttons :clickFnc="login">
                <template #btn>Login</template>
              </Buttons>
            </v-flex>
            <v-divider></v-divider>
            <v-layout>
              <v-flex xs12>
                <Buttons :clickFnc="signUp">
                  <template #btn>signUP</template>
                </Buttons>
              </v-flex>
              <v-flex xs5 offset-lg8 offset-xs1 offset-md10>
                <Buttons :clickFnc="forgotPassword">
                  <template #btn>Forgot Password</template>
                </Buttons>
                <!-- /</submitButtons> -->
              </v-flex>
            </v-layout>
          </v-card>
        </form>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { eventBus } from "../../events.js";
import Buttons from "../../components/customSlots.vue";
// import Loading from "vue-loading-overlay";
// import Vue from "vue";
//Vue.use(Loading);

export default {
  components: {
    Buttons
  },

  data() {
    return {
      loginResponse: false,
      loginResponseMessage: true,
      email: "",
      password: "",
      formHasError: false,
      loader: "",
      prevRoute: " this the previous route"
    };
  },
  watch: {
    loginResponse() {
      if (this.loginResponse) {
        let res = this.loginResponseMessage;
        $("body").overhang({
          type: "error",
          custom: true,
          customconfirm: "overhang-overides",
          message: res,
          accent: "green",
          primary: "green",
          customClass: "",

          duration: 5,
          speed: 500,
          easing: "easeOutBounce"
        });
      }
    }
  },
  computed: {
    form() {
      return {
        email: this.email,
        password: this.password
      };
    }
  },

  mounted() {
    //this.loader.hide()
  },
  methods: {
    signUp() {
      this.$router.push({
        path: "./signUp"
      });
    },
    login() {
      // console.log($);

      this.formHasError = false;
      var email = this.email;
      var password = this.password;

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
        var userLogin = {
          email: this.email,
          password: this.password
        };
        this.loader = this.$loading.show({
          canCancel: true,
          onCancel: this.onCancel,
          color: "green",
          loader: "spinner",
          height: 20,
          width: 200,
          //duration;3

          opacity: 0.5
        });
        let loader = this.loader;
        axios
          .get(
            "http://localhost:1337/login",
            {
              params: userLogin
            }
            // {
            //   header: {
            //     "Access-Control-Allow-Orign": "*",
            //     "content-type": "application/json",
            //     Authorization: "XSRF-TOKEN",
            //     withCredentials: true
            //   }
            // }
          )
          .catch(err => {
            if (err) {
              this.loginResponse = true;
              this.loginResponseMessage = err.response.data;
              console.log(err);
            }
          })
          .then(response => {
            console.log(response);

            let userName = response.data.data.full_name;
            let userId = response.data.data.id;
            localStorage.setItem("userName", userName);
            localStorage.setItem("userId", userId);
            //eventBus.$emit("userName", userName);

            // this.loginResponse = true;
            //this.loginResponseMessage = response.data.msg;
            // console.log(this.loginResponseMessage);
            // let res = response.data.data;
            $("body").overhang({
              type: "error",
              custom: true,
              customconfirm: "overhang-overides",
              message: "you have succesfully login",
              accent: "green",
              primary: "green",
              customClass: "",

              duration: 1,
              speed: 500,
              easing: "easeOutBounce"
            });

            //localStorage = setItem("set-token", );
            //resolve(response);

            this.$router.push({
              name: "home"
            });

            loader.hide();
            //}
          });

        //console.log(this.serverResponse);
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
 