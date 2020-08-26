<template>
  <v-container ma-0>
    <!-- <v-layout> -->

    <v-row no-gutters align="center">
      <v-col cols="12" xs="12" sm="12" lg="12" xl="12">
        <v-card class justify-center flat>
          <v-row>
            <v-col cols="12"></v-col>
            <v-col cols="12" xs="12" sm="7" md="5" lg="6" xl="6" class="hidden-sm-and-down">
              <v-card flat>
                <i>
                  <v-img src="img/devImages/door.png" height="400" width="300" />
                </i>
              </v-card>
            </v-col>

            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" class="justify-content-center">
              <v-col cols="12" offset-xs="6" offset-lg="2">
                <v-card flat class="text--orange">
                  <v-card-text
                    class="font-weight-bold"
                  >Supply your Names and Email correctly Registered</v-card-text>
                </v-card>
              </v-col>

              <v-card class="mt-5" flat>
                <form @submit.prevent="login" class="vld-parent" ref="formContainer">
                  <v-card class="ml-8 elevation-0 pa-5" ref="form">
                    <v-text-field
                      @click="datePicked"
                      prepend-inner-icon="mdi-account"
                      color="primary"
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

                    <!-- <v-card class="text-center elevation-0 mb-10" v-if="datePicking">
                      <v-date-picker
                        @onclick="datePicked"
                        v-model="dates"
                        color="primary"
                        class="elevation-20"
                        justify-center
                      ></v-date-picker>
                    </v-card>

                    <v-menu
                      ref="dates"
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
                    </v-menu>-->

                    <!-- <v-text-field
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
                    ></v-text-field>-->

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
                    </v-card>
                  </v-card>
                </form>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
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

      vueLoaderConfig: {},
      overlay: false,
      responseReceived: false,
      loginResponseMessage: true,
      email: "",

      fullName: "",
      formHasErrors: false,
      loader: "",
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
        // this.loader.hide();
      }
    },
  },
  computed: {
    form() {
      return {
        email: this.email,
        fullName: this.email,
      };
    },
  },

  mounted() {
    // this.vueLoaderConfig = JSON.parse(localStorage.getItem("vueLoaderConfig"));
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

    submit() {
      this.responseReceived = false;
      this.formHasErrors = false;
      let email = this.email.trim();

      let userLogin = {
        email: this.email.trim(),
        fullName: this.fullName.trim(),
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
        // this.loader = this.$loading.show(this.vueLoaderConfig);
        let params = userLogin;
        axios
          .post("/forgotPassword", qs.stringify(params), {
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
            this.serverResponse = response.data.message;
            setTimeout(() => {
              this.$router.push({
                name: "login",
              });
            }, 1000);
          });

        //console.log(this.serverResponse);
      } else {
        // this.responseReceived = true;
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
