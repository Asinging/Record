<template>
  <!-- <v-layout height="700"> -->

  <!-- <v-card class="elevation-0" height="500"> -->

  <v-container ma-0>
    <v-row>
      <v-col cols="12" xs="12" sm="12" lg="12" xl="12">
        <v-card class="" justify-center flat>
          <v-row>
            <v-col
              cols="12"
              xs="12"
              sm="5"
              md="6"
              lg="6"
              xl="6"
              class="hidden-sm-and-down"
            >
              <i>
                <v-img src="img/devImages/heap.jpg" height="400" width="400" />
              </i>
            </v-col>

            <v-col cols="12" xs="12" sm="5" md="5" lg="5" xl="5">
              <v-card class="elevation-0">
                <form
                  @submit.prevent="submit"
                  class="vld-parent"
                  ref="formContainer"
                  id="submit"
                >
                  <v-card ref="form" class="ml-8 mr-8 elevation-0" width="400">
                    <v-card-text>
                      <v-text-field
                        outlined
                        dense
                        ref="fullName"
                        color="green"
                        v-model="fullName"
                        :rules="[() => !!fullName || 'This field is required']"
                        :error-messages="errorMessages"
                        label="Full Name"
                        required
                      ></v-text-field>

                      <v-text-field
                        outlined
                        append-icon="mdi-email"
                        dense
                        color="green"
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
                        outlined
                        dense
                        append-icon="mdi-key"
                        color="green"
                        ref="password"
                        v-model="password"
                        :rules="[() => !!password || 'This field is required']"
                        label="password"
                        type="password"
                        required
                      ></v-text-field>

                      <v-text-field
                        outlined
                        dense
                        append-icon="mdi-key"
                        color="green"
                        ref="rePassword"
                        v-model="rePassword"
                        :rules="[
                          () => !!rePassword || 'This field is required',
                        ]"
                        label="Re-password"
                        type="password"
                        required
                      ></v-text-field>
                    </v-card-text>

                    <!-- <v-divider class="mt-12"></v-divider> -->

                    <v-layout>
                      <v-flex xs12>
                        <AddDeleteCustomButton :clickFnc="cancel">
                          <template #btn
                            >cancel
                          </template>
                        </AddDeleteCustomButton>
                      </v-flex>
                      <v-flex xs5 offset-lg5 offset-xs1>
                        <AddDeleteCustomButton :clickFnc="submit">
                          <template #btn>
                            submit
                          </template>
                        </AddDeleteCustomButton>
                        <!-- /</submitButtons> -->
                      </v-flex>
                    </v-layout>
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
<script>
import AddDeleteCustomButton from "../../components/customSlots.vue";
import Vue from "vue";
import VueSweetalert2 from "vue-sweetalert2";
Vue.use(VueSweetalert2);
//import SubmitButtons from "../../components/submissionButtons.vue";
export default {
  components: {
    //SubmitButtons
    AddDeleteCustomButton,
  },
  data() {
    return {
      overlay: false,
      overlayMessage: " the lord is good",
      responseReceived: false,
      serverResponse: "",
      formHasErrors: false,
      errorMessages: "",
      fullName: "",
      loader: "",
      email: "",
      password: "",
      rePassword: "",
      loadingEffect: false,
      prevRoute: "this is the pre",
    };
  },

  mounted() {},
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
          primary: "green",
          customClass: "",

          duration: 3,
          speed: 500,
          easing: "easeOutBounce",
        });
        this.loader.hide();
      }
    },
  },
  computed: {
    form() {
      return {
        fullNname: this.fullName,

        email: this.email,
        password: this.password,
        rePassword: this.rePassword,
      };
    },
  },

  methods: {
    cancel() {
      this.$router.push({
        name: "login",
      });
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      Object.keys(this.form).forEach((f) => {
        this.$refs[f].reset();
      });
    },
    submit() {
      this.formHasErrors = false;
      if (this.password !== this.rePassword) {
        this.$swal("password does not match");
        this.formHasErrors = true;
      }

      //debugger;
      var userDetails = {
        fullName: this.fullName,
        email: this.email,
        password: this.password, //
      };
      //this.formHasErrors = false;
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
        // console.log(this.form[f]);
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
        // debugger;
        let dis = this;
        this.responseReceived = false;
        let loader = this.loader;
        axios
          .get(
            "http://localhost:1337/adminSignUp",
            {
              params: userDetails,
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
              this.responseReceived = true;
              this.serverResponse = err;
            }
            // console.error(err.response);
            this.$swal(err.response.data);
          })
          .then((response) => {
            if (response) {
              console.log(response);
              this.responseReceived = true;
              // this.serverResponse = response.data.message;
              //debugger;

              this.$router.push({ name: "login" });
              loader.hide();
            }
          });
      } else {
        this.responseReceived = true;
        this.serverResponse = "the email or password is invalid";
        this.$swal("the email or password supplied is invalid");
      }
    },
  },
};
</script>

<style scoped>
.btn {
  color: white;
}
</style>
>
