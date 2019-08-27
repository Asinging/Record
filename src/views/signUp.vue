<template>
  <v-layout justify-center>
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form" class="mt-3">
        <v-card-text>
          <v-text-field
            ref="fname"
            v-model="fname"
            :rules="[() => !!fname || 'This field is required',]"
            :error-messages="errorMessages"
            label="First Name"
            placeholder="mike "
            required
          ></v-text-field>
          <v-text-field
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
            ref="password"
            v-model="password"
            :rules="[() => !!password || 'This field is required']"
            label="password"
            type="password"
            required
          ></v-text-field>
          <v-text-field
            ref="repassword"
            v-model="repassword"
            :rules="[() => !!repassword || 'This field is required']"
            label="Re-password"
            type="password"
            required
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-12"></v-divider>
        <v-card-actions>
          <v-btn text @click="resetForm">Cancel</v-btn>
          <v-spacer></v-spacer>
          <v-slide-x-reverse-transition>
            <v-tooltip v-if="formHasErrors" bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon class="my-0" @click="resetForm" v-on="on">
                  <v-icon>refresh</v-icon>
                </v-btn>
              </template>
              <span>Refresh form</span>
            </v-tooltip>
          </v-slide-x-reverse-transition>
          <v-btn color="secondary" @click="submit">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data: () => ({
    errorMessages: "",
    fname: "",
    lname: "",
    email: "",
    password: "",
    repassword: "",
    formHasErrors: ""
  }),

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

  watch: {
    fname() {
      this.errorMessages = "";
    },
    lname() {
      this.errorMessages = "";
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
      var firstName = this.fname;
      var signUpDetails = {
        firstName: this.fname,
        lastName: this.lname,
        email: this.email,
        password: this.password,
        rePassword: this.repassword
      };
      console.log(firstName);
      this.formHasErrors = false;

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          this.formHasErrors = true;
        } else {
          this.$refs[f].validate(true);
        }
      });
      async function axiosInAction() {
        try {
          const response = await axios.get("http://localhost:1337/insertdb", {
            params: signUpDetails
          });
          console.log("this is the response" + " " + response);
        } catch (error) {
          console.log(error);
        }
        console.log(signUpDetails.firstName);
      }
      axiosInAction();
    }
  }
};
</script>

}
</script>

<style>
</style>
>