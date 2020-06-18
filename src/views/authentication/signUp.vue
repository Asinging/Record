<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form" class="mt-3">
        <v-card-text>
          <v-text-field
            ref="fname"
            color="green"
            v-model="fname"
            :rules="[() => !!fname || 'This field is required',]"
            :error-messages="errorMessages"
            label="First Name"
            placeholder="mike "
            required
          ></v-text-field>
          <v-text-field
            clearable
            color="green"
            ref="lname"
            v-model="lname"
            :rules="[
              () => !!lname || 'This field is required',
            ]"
            label="last name"
            placeholder="jackson"
            required
          ></v-text-field>
          <v-text-field
            color="green"
            clearable
            ref="email"
            v-model="email"
            :rules="[
            () => !!/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email) || 'E-mail must be valid']"
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
            ref="repassword"
            v-model="repassword"
            :rules="[() => !!repassword || 'This field is required']"
            label="Re-password"
            type="password"
            required
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <SubmitButtons />
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
import SubmitButtons from "../../components/submissionButtons.vue";
export default {
  components: {
    SubmitButtons
  },
  data() {
    return {
      formHasErrors: "",
      errorMessages: "",
      fname: "",
      lname: "",
      email: "",
      password: "",
      repassword: "",
      loadingEffect: false
    };
  },

  computed: {
    form() {
      return {
        fname: this.fname,
        lname: this.lname,
        email: this.email,
        password: this.password,
        repassword: this.repassword
      };
    }
  },

  methods: {
    resetForm() {
      this.errorMessages = [];
      this.formHasErrors = false;
      Object.keys(this.form).forEach(f => {
        this.$refs[f].reset();
      });
    },
    submit() {
      var signUpDetails = {
        firstName: this.fname,
        lastName: this.lname,
        email: this.email,
        password: this.password,
        rePassword: this.repassword
      };
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          this.formHasErrors = true;
        }
        this.$refs[f].validate(true);
      });

      // axios request
      if (!this.formHasErrors) {
        this.loadingEffect = true;
        async function axiosInAction() {
          try {
            const res = await axios.get("http://localhost:1337/insertdb", {
              params: signUpDetails
            });
            console.log("this is the response" + " " + res);
          } catch (error) {
            console.log(error);
          }
        }
        axiosInAction();
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