<template>
  <v-container ma-0>
    <!-- <v-layout> -->

    <v-row no-gutters align="center">
      <v-col cols="12" offset-xs="6" offset-sm="6" offset-lg="12" offset-xl="12">
        <v-card class justify-center flat>
          <v-row>
            <v-col
              cols="12"
              offset-xs="6"
              offsets-m="8"
              offset-md="12"
              offset-lg="2"
              offset-xl="12"
            >
              <v-card flat>
                <v-card-text class="orange-text font-weight-bold">Reset your password</v-card-text>
              </v-card>
            </v-col>

            <v-col cols="12" xs="12" sm="12" md="6" lg="6" xl="6" class="justify-content-center">
              <v-card class="mt-5 pa-5" flat>
                <form @submit.prevent="login" class="vld-parent" ref="formContainer">
                  <v-card class="ml-8 elevation-0" ref="form">
                    <v-text-field
                      prepend-inner-icon="mdi-key"
                      color="primary"
                      ref="newPassword"
                      v-model="newPassword"
                      label="New Password"
                      type="password"
                      required
                    ></v-text-field>
                    <v-text-field
                      prepend-inner-icon="mdi-key"
                      color="primary"
                      ref="reNewPassword"
                      v-model="reNewPassword"
                      label="confirm New Password"
                      type="password"
                      required
                    ></v-text-field>

                    <v-card class="ma-1" flat>
                      <v-layout>
                        <v-flex>
                          <v-flex lg3 xs2 sm4 md6>
                            <Buttons :clickFnc="cancel" class>
                              <template #button>cancel</template>
                            </Buttons>
                          </v-flex>
                          <v-flex offset-lg10 offset-xs10 offset-md8>
                            <Buttons :clickFnc="reset" class>
                              <template #button>reset</template>
                            </Buttons>
                          </v-flex>
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
import { stringsFns } from "../../stringsFns.js";
import Buttons from "../../components/customSlots.vue";

import Vue from "vue";
import qs from "qs";

import Loader from "vue-loading-overlay";
Vue.use(Loader);

export default {
  mixins: [stringsFns],
  components: {
    Buttons,
  },

  data() {
    return {
      newPassword: "",
      reNewPassword: "",
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
        newPassword: this.newPassword,
        reNewPassword: reNewPassword,
      };
    },
  },

  mounted() {
    this.vueLoaderConfig = JSON.parse(localStorage.getItem("vueLoaderConfig"));
  },
  methods: {
    cancel() {
      this.$router.push({
        name: "forgottenPassword",
      });
    },
    reset() {
      let token = this.urlToken(window.location.href);
      console.log(token);
      let newPassword = this.newPassword;
      let reNewPassword = this.reNewPassword;
      if (!newPassword || newPassword !== reNewPassword) {
        return alert(
          "Check for Password empty field or Password does not match"
        );
      }
      this.loader = this.$loading.show(this.vueLoaderConfig);
      axios
        .get(
          "/resetPassword",
          {
            params: {
              newPassword: this.newPassword,
              token: token,
            },
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
          console.log(response);
          this.serverResponse = response.data.message;
          this.responseReceived = true;
          setTimeout(() => {
            this.$router.push({
              name: "login",
            });
          }, 1000);
        });

      //console.log(this.serverResponse);
    },
  },
};
</script>

<style scoped>
#login {
  padding-left: 20px;
}
</style>
