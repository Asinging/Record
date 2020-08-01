<template>
  <v-container ma-0>
    <!-- <v-layout> -->

    <v-row no-gutters align="center">
      <v-col cols="12" xs="12" sm="12" lg="12" xl="12">
        <v-card class justify-center flat>
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="7"
              md="5"
              lg="6"
              xl="6"
              class="hidden-sm-and-down"
            >
              <v-card flat>
                <i>
                  <v-img
                    src="img/devImages/door.png"
                    height="400"
                    width="300"
                  />
                </i>
              </v-card>
            </v-col>

            <v-col
              cols="12"
              xs="12"
              sm="12"
              md="6"
              lg="6"
              xl="6"
              class="justify-content-center"
            >
              <v-card class="mt-5" flat>
                <form
                  @submit.prevent="login"
                  class="vld-parent"
                  ref="formContainer"
                >
                  <v-card class="ml-8 elevation-0" ref="form">
                    <v-text-field
                      prepend-inner-icon="mdi-email"
                      color="primary"
                      ref="email"
                      v-model="email"
                      :rules="[
                        () =>
                          !!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
                            email
                          ) || 'E-mail must be valid',
                      ]"
                      label="Email"
                      type="email"
                      required
                    ></v-text-field>

                    <v-text-field
                      prepend-inner-icon="mdi-key"
                      color="primary"
                      ref="password"
                      v-model="password"
                      :rules="[
                        () => !!password || 'password field must nto be empty',
                      ]"
                      label="password"
                      type="password"
                      required
                      class="mb-0"
                    ></v-text-field>

                    <v-card class="ma-1" flat>
                      <v-layout>
                        <v-flex>
                          <!-- / login button -->

                          <v-flex offset-lg10 offset-xs10 offset-md10>
                            <Buttons :clickFnc="login" class>
                              <template #btn
                                >Login
                              </template>
                            </Buttons>
                          </v-flex>
                          <v-divider></v-divider>
                          <!-- signUp and forgotten passoword -->
                          <v-layout>
                            <v-flex xs12>
                              <Buttons :clickFnc="signUp">
                                <template #btn>
                                  signUP
                                </template>
                              </Buttons>
                            </v-flex>
                            <v-flex xs5 offset-lg1 offset-xs1 offset-md1>
                              <Buttons :clickFnc="forgotPassword">
                                <template #btn>
                                  Forgot Password
                                </template>
                              </Buttons>
                              <!-- /</submitButtons> -->
                            </v-flex>
                          </v-layout>
                        </v-flex>
                      </v-layout>
                    </v-card>
                  </v-card>
                </form>
              </v-card>
              <!-- </v-col> -->
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
    <!-- </v-layout> -->
  </v-container>
</template>

<script>
import { eventBus } from "../../events.js";
import Buttons from "../../components/customSlots.vue";
import Vue from "vue";
// import Loading from "vue-loading-overlay";
// import Vue from "vue";
//Vue.use(Loading);
import VueSweetalert2 from "vue-sweetalert2";
Vue.use(VueSweetalert2);

export default {
  components: {
    Buttons,
  },

  data() {
    return {
      overlay: false,
      responseReceived: false,
      loginResponseMessage: true,
      email: "",
      password: "",
      formHasErrors: false,
      loader: "",
      prevRoute: " this the previous route",
      serverResponse: "",
    };
  },
  watch: {
    responseReceived() {
      if (this.responseReceived == true) {
        let res = this.serverResponse;
        $("body").overhang({
          type: "error",
          custom: true,
          customconfirm: "overhang-overides",
          message: res,
          accent: "green",
          primary: "orange",
          customClass: "",

          duration: 1,
          speed: 3000,
          easing: "easeOutBounce",
        });
        this.loader.hide();
      }
    },
  },
  computed: {
    form() {
      return {
        email: this.email,
        password: this.password,
      };
    },
  },

  mounted() {
    //this.loader.hide()
  },
  methods: {
    signUp() {
      this.$router.push({
        path: "./signUp",
      });
    },
    login() {
      this.responseReceived = false;
      this.formHasErrors = false;
      let email = this.email;
      let password = this.password;
      let userLogin = {
        email: this.email,
        password: this.password,
      };

      let emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) {
          this.formHasErrors = true;
        }

        if (f == "email") {
          if (!emailRegex.test(this.form[f])) {
            this.formHasErrors = true;
          }
        }
        // this.$refs[f].validate(true);
      });

      if (!this.formHasErrors) {
        this.loader = this.$loading.show({
          canCancel: true,
          onCancel: this.onCancel,
          color: "green",
          loader: "spinner",
          height: 20,
          width: 200,
          duration: 3,

          opacity: 0.5,
        });

        let loader = this.loader;
        let dis = this;
        axios
          .get(
            "http://localhost:1337/login",
            {
              params: userLogin,
            },
            {
              header: {
                "Access-Control-Allow-Orign": "*",
                "content-type": "application/json",
              },
            }
          )
          .catch((err) => {
            if (err) {
              setTimeout(() => {
                this.serverResponse = err;
                this.$swal(err.response.data);
                // this.responseReceived = true;
              }, 700);
            }
            return;
          })
          .then((response) => {
            this.responseReceived = true;
            this.serverResponse = response.data.msg;
            console.log(response);
            let userName = response.data.data.full_name;
            let userId = response.data.data.id;
            localStorage.setItem("userName", userName);
            localStorage.setItem("userId", userId);
            this.$store.dispatch("authDetails", {
              userName: userName,
              userId: userId,
            });
            // when this is navigated away from the this page the overhang refuse to display fix it
            this.$router.push({
              name: "setuppage",
            });
            setTimeout(() => {
              this.loader.hide();
            }, 1000);
          });

        //console.log(this.serverResponse);
      } else {
        this.responseReceived = true;
        this.$refs.password.focus();
        this.serverResponse = "the email or password is invalid";
        this.$swal("the email or password supplied is invalid");
      }
    },
    forgotPassword() {
      alert("are you sure you forgetten your password");
    },
  },
};
</script>

<style scoped>
#login {
  padding-left: 20px;
}
</style>
