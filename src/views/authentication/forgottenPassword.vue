<template>
  <v-container ma-0>
    <!-- <v-layout> -->

    <v-row no-gutters align="center">
      <v-col cols="12" xs="12" sm="12" lg="12" xl="12">
        <v-card class justify-center flat>
          <v-row>
            <v-col cols="12" xs="12" sm="7" md="5" lg="6" xl="6" class="hidden-sm-and-down">
              <v-card flat>
                <i>
                  <v-img src="img/devImages/door.png" height="400" width="300" />
                </i>
              </v-card>
            </v-col>

            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" class="justify-content-center">
              <v-card class="mt-5" flat>
                <form @submit.prevent="login" class="vld-parent" ref="formContainer">
                  <v-card class="ml-8 elevation-1 pa-5" ref="form">
                    <v-text-field
                      @click="datePicked"
                      color="primary"
                      outlined
                      shaped
                      ref="fullName"
                      v-model="fullName"
                      label="Full Name"
                      type="String"
                      required
                    ></v-text-field>

                    <v-text-field
                      @click="datePicked"
                      prepend-inner-icon="mdi-email"
                      color="primary"
                      outlined
                      shaped
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
                    <!-- <v-text-field
                      color="primary"
                      outlined
                      shaped
                      ref="dateOfbirth"
                      v-model="dateOfbirth"
                      :rules="[
                        () => !!securityQuestion|| 'this field must nto be empty',
                      ]"
                      label="answer this security Questions"
                      class="mb-0"
                    ></v-text-field>-->

                    <v-card class="text-center elevation-0 mb-10" v-if="datePicking">
                      <v-date-picker
                        @onclick="datePicked"
                        v-model="dates"
                        color="primary"
                        class="elevation-20"
                        justify-center
                      ></v-date-picker>
                    </v-card>

                    <v-menu
                      ref="menu"
                      v-model="menu"
                      color="primary"
                      :close-on-content-click="false"
                      :return-value.sync="dates"
                      transition="scale-transition"
                      offset-y
                      min-width="500px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-combobox
                          @focus="comboo"
                          shaped
                          outlined
                          color="green"
                          class="orange-text"
                          v-model="dates"
                          label="Date Of Birth"
                          v-bind="attrs"
                          v-on="on"
                        ></v-combobox>
                      </template>
                    </v-menu>

                    <v-text-field
                      @click="datePicked"
                      color="primary"
                      outlined
                      shaped
                      ref="securityQuestion"
                      v-model="securityQuestion"
                      :rules="[
                        () => !!securityQuestion|| 'this field must nto be empty',
                      ]"
                      label="answer this security Questions"
                      class="mb-0"
                    ></v-text-field>

                    <v-card class="ma-1" flat>
                      <!-- <v-layout>
                        <v-flex>
                         
                          <v-flex offset-lg10 offset-xs10 offset-md10>
                            <Buttons :clickFnc="login" class>
                              <template #button>submit</template>
                            </Buttons>
                      </v-flex>-->

                      <v-layout>
                        <v-flex xs12>
                          <Buttons :clickFnc="cancel">
                            <template #button>cancel</template>
                          </Buttons>
                        </v-flex>
                        <v-flex xs5 offset-lg5 offset-xs1>
                          <Buttons :clickFnc="submit">
                            <template #button>submit</template>
                          </Buttons>
                          <!-- /</submitButtons> -->
                        </v-flex>
                      </v-layout>

                      <!-- signUp and forgotten passoword -->
                      <!-- <v-layout>
                            <v-flex xs12>
                              <Buttons :clickFnc="signUp">
                                <template #btn>signUP</template>
                              </Buttons>
                            </v-flex>
                            <v-flex xs5 offset-lg1 offset-xs1 offset-md1>
                              <Buttons :clickFnc="forgotPassword">
                                <template #btn>Forgot Password</template>
                              </Buttons>
                          
                            </v-flex>
                      </v-layout>-->
                      <!-- </v-flex>
                      </v-layout>-->
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
import qs from "qs";
import Vue from "vue";
import Loader from "vue-loading-overlay";
Vue.use(Loader);
// import Buttons from "../../components/customSlots.vue";

export default {
  components: {
    Buttons,
  },

  data() {
    return {
      datePicking: false,
      dates: "",
      vueLoaderConfig: {},
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
    this.vueLoaderConfig = JSON.parse(localStorage.getItem("vueLoaderConfig"));
    //this.loader.hide()
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "login",
      });
    },
    comboo() {
      // this.dates = "";
      this.datePicking = true;
    },
    datePicked() {
      this.datePicking = false;
    },
    signUp() {
      this.$router.push({
        path: "./signUp",
      });
    },
    login() {
      this.responseReceived = false;
      this.formHasErrors = false;
      let email = this.email.trim();
      let password = this.password.trim();
      let userLogin = {
        email: this.email.trim(),
        password: this.password.trim(),
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
        this.loader = this.$loading.show(this.vueLoaderConfig);

        // this.$store.dispatch("vueLoader", this.loader);
        // console.log(this.loader.show());

        let dis = this;
        let params = userLogin;
        axios
          .post("/login", qs.stringify(params), {
            header: {
              "Access-Control-Allow-Orign": "*",
              "content-type": "application/json",
            },
          })
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
