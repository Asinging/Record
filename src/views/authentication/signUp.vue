<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <form @submit.prevent="submit" class="vld-parent" ref="formContainer" id="submit">
        <v-card ref="form" class="mt-3">
          <v-card-text>
            <v-text-field
              ref="fullName"
              color="green"
              v-model="fullName"
              :rules="[() => !!fullName || 'This field is required']"
              :error-messages="errorMessages"
              label="Full Name"
              placeholder="Eje sunday "
              required
            ></v-text-field>

            <v-text-field
              color="green"
              clearable
              ref="email"
              v-model="email"
              :rules="[
                () =>
                  !!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) ||
                  'E-mail must be valid',
              ]"
              label="Email"
              placeholder="You@gmail.com"
              type="email"
              required
            ></v-text-field>
            <v-text-field
              color="green"
              clearable
              ref="password"
              v-model="password"
              :rules="[() => !!password || 'This field is required']"
              label="password"
              type="password"
              required
            ></v-text-field>
            <v-text-field
              color="green"
              clearable
              ref="rePassword"
              v-model="rePassword"
              :rules="[() => !!rePassword || 'This field is required']"
              label="Re-password"
              type="password"
              required
            ></v-text-field>
          </v-card-text>
          <!-- <v-divider class="mt-12"></v-divider> -->
          <v-layout>
            <v-flex xs12>
              <AddDeleteCustomButton :clickFnc="cancel">
                <template #btn>cancel</template>
              </AddDeleteCustomButton>
            </v-flex>
            <v-flex xs5 offset-lg8 offset-xs1>
              <AddDeleteCustomButton :clickFnc="submit">
                <template #btn>submit</template>
              </AddDeleteCustomButton>
              <!-- /</submitButtons> -->
            </v-flex>
          </v-layout>
        </v-card>
      </form>
      <div id="popup">{{ overlayMessage }}</div>
      <div id="overlay_msgbx">{{ overlayMessage }}</div>
    </v-flex>
  </v-layout>
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
    AddDeleteCustomButton
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
      prevRoute: "this is the pre"
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
          easing: "easeOutBounce"
        });
        this.loader.hide();
      }
    }
  },
  computed: {
    form() {
      return {
        fullNname: this.fullName,

        email: this.email,
        password: this.password,
        rePassword: this.rePassword
      };
    }
  },

  methods: {
    cancel() {
      this.$router.push({
        name: "login"
      });
    },
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset();
      });
    },
    submit() {
      if (this.password !== this.rePassword) {
        this.$swal("password does not match");
        this.formHasErrors = true;
      }

      //debugger;
      var userDetails = {
        fullName: this.fullName,
        email: this.email,
        password: this.password //
      };
      //this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          this.formHasErrors = true;
        }
        //console.log(this.form[f]);
        //this.$refs[f].validate(true);
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

          opacity: 0.5
        });
        // debugger;
        let dis = this;
        this.responseReceived = false;
        let loader = this.loader;
        axios
          .get(
            "http://localhost:1337/adminSignUp",
            {
              params: userDetails
            },
            {
              header: {
                "Access-Control-Allow-Orign": "*",
                "content-type": "application/json"
              }
            }
          )
          .catch(err => {
            if (err) {
              this.responseReceived = true;
              this.serverResponse = err;
            }
            console.info(err); 
          })
          .then(response => {
            if (response) {
              console.log(response);
              // this.responseReceived = true;
              // this.serverResponse = response.data.message;
              //debugger;

              this.$router.push({ name: "login" });
              loader.hide();
            }
          });

        console.log("apper after axios");
      }
    }
  }
};
</script>

<style scoped>
.btn {
  /* background-color: yellow !important; */
  color: white;
}
</style>
>
