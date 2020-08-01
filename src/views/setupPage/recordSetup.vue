<template>
  <v-layout>
    <v-row>
      <v-col cols="12" xs="12" sm="12" lg="12" xl="12">
        <v-card class="elevation-0">
          <v-row>
            <v-col cols="12" xs="12" sm="7" md="5" lg="6" xl="6">
              <v-card class="ma-5 elevation-10" color="#81C784">
                <v-card-title class="white--text"
                  >This information provided here will help us set up your
                  church for you accurately</v-card-title
                >
              </v-card>
              <v-col cols="12" xs="12" sm="7" md="5" lg="6" xl="6">
                <v-card class flat>
                  <v-stepper
                    v-model="stepper"
                    vertical
                    class="elevation-0"
                    value="values"
                  >
                    <v-stepper-step step="1" :complete="stepper"
                      >Organisation Name</v-stepper-step
                    >
                    <v-stepper-content step="1"></v-stepper-content>
                    <v-stepper-step step="2" :complete="stepper"
                      >Initial</v-stepper-step
                    >
                    <v-stepper-content step="2"></v-stepper-content>
                    <v-stepper-step step="3" complete>orgLogo</v-stepper-step>
                    <v-stepper-content step="3"></v-stepper-content>
                  </v-stepper>
                </v-card>
              </v-col>
            </v-col>

            <v-col cols="12" xs="12" sm="5" md="5" lg="5" xl="5">
              <v-card class="elevation-0">
                <form
                  @submit.prevent="submit"
                  class="vld-parent"
                  ref="formContainer"
                  id="submit"
                >
                  <v-card
                    ref="form"
                    class="ml-8 mr-8 elevation-0 white--text heading"
                    width="400"
                    flat
                    style="color:white"
                  >
                    <v-card-text class="white--text">
                      <v-textarea
                        style="font-size:1.3em !important"
                        autofocus
                        active
                        shaped
                        id="orgName"
                        placeholder="The name of the organisation exactly how you wnat it to  appear"
                        outlined
                        auto-grow
                        background-color="#E8F5E9"
                        ref="orgName"
                        color="primary"
                        class="h1"
                        v-model="orgName"
                        label="Name "
                      ></v-textarea>

                      <v-textarea
                        shaped
                        style="font-size:1.em !important"
                        id="initial"
                        placeholder="An orgInitial that best summary the name Example Eje sunday Onah as Ejuno or EJS"
                        outlined
                        auto-grow
                        background-color="#E8F5E9"
                        color="primary"
                        ref="orgInitial"
                        v-model="orgInitial"
                        label="Initial"
                      ></v-textarea>
                      <v-text-field
                        outlined
                        auto-grows
                        shaped
                        id="orgLogo"
                        background-color="#E8F5E9"
                        color="primary"
                        ref="orgLogo"
                        v-model="orgLogo"
                        label="Logo"
                        type="file"
                      ></v-text-field>
                    </v-card-text>
                    <!-- <v-divider class="mt-12"></v-divider> -->
                    <v-layout>
                      <div class="flex-grow-1"></div>
                      <v-flex xs5 offset-lg8 offset-xs1>
                        <AddDeleteCustomButton :clickFnc="submit">
                          <template #btn
                            >submit</template
                          >
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
  </v-layout>
</template>
<script>
import qs from "qs";

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
      // values: 2,
      // fieldCompleted: false,
      stepper: true,
      overlay: false,
      overlayMessage: " the lord is good",
      responseReceived: false,
      serverResponse: "",
      formHasErrors: false,

      orgName: "",

      orgLogo: "",
      orgInitial: "",
      loader: "",
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
  mounted() {
    // setTimeout(() => {
    //   this.loader.hide();
    // }, 1000);
  },
  computed: {
    form() {
      return {
        orgName: this.orgName,

        orgLogo: this.orgLogo,
        orgInitial: this.orgInitial,
      };
    },
  },

  methods: {
    submit() {
      var userDetails = {
        orgName: this.orgName,
        orgLogo: this.orgLogo,
        orgInitial: this.orgInitial, //
      };
      //this.formHasErrors = false;

      Object.keys(this.form).forEach((f) => {
        if (!this.form[f]) {
          this.formHasErrors = true;
        }
      });
      //debugger;
      if (!this.formHasErrors) {
        //this.loadingEffect = true;
        this.loader = this.$loading.show({
          canCancel: true,
          onCancel: this.onCancel,
          color: "green",
          loader: "spinner",
          height: 20,
          width: 200,
          //duration;3

          opacity: 0.5,
        });
        // debugger;
        let dis = this;
        this.responseReceived = false;
        let loader = this.loader;
        //alert("this is the file upload process");
        let params = userDetails;
        axios
          .post(
            "/appSetupDetatails",
            qs.stringify(params),

            {
              header: {
                "Content-Type": "multipart/form-data",
              },
            }
          )
          .catch((err) => {
            if (err) {
              this.responseReceived = true;
              this.serverResponse = err;
            }
            console.info(err);
          })
          .then((response) => {
            if (response) {
              console.log(response);
              let appName = response.data.data.orgName;
              let appInitial = response.data.orgInitial;
              let appLogo = response.data.orgLogo;
              // localStorage.setItem("orgName", appName);
              // localStorage.setItem("orgInitial", appInitial);
              console.log(appName);
              this.$store.dispatch("appParams", {
                appName: appName,
                appInitial: appInitial,
              });
              // this.responseReceived = true;
              // this.serverResponse = response.data.message;
              //debugger;
              if (response.status === 200) {
                this.$router.push({ name: "home" });
              }

              loader.hide();
            }
          });
      } else {
        alert("this is not  the file upload process");
      }
    },
  },
};
</script>

<style scoped>
.btn {
  color: white;
}
#redd {
  color: red;
  font-size: 50px;
}
#orgName {
  background-color: red !important;
  color: red !important;
}
</style>
>
