<template>
  <v-layout>
    <v-flex align-center>
      <v-card ref="form" class="ma-3">
        <v-container>
          <v-text-field
            color="green"
            clearable
            ref="fullName"
            v-model="fullName"
            :rules="[
            () => !!fullName|| 'E-mail must be valid']"
            label="Full Name"
            required
          ></v-text-field>
          <v-text-field
            color="green"
            ref="department"
            v-model="department"
            :rules="[
            () => !!department || 'department field must nto be empty']"
            label="department"
            required
            class="mb-5"
          ></v-text-field>
          <v-text-field
            color="green"
            ref="phone"
            v-model="phone"
            :rules="[
            () => !!phone || 'phone field must nto be empty']"
            label="phone"
            type="number"
            required
            class="mb-5"
          ></v-text-field>
          <v-text-field
            color="green"
            ref="dateOfBirth"
            v-model="dateOfBirth"
            :rules="[
            () => !!dateOfBirth || 'Date of Birth field must nto be empty']"
            label="Date of Birth"
            required
            class="mb-5"
          ></v-text-field>

          <v-divider height="100"></v-divider>
          <div>
            <v-layout>
              <v-flex xs10>
                <span>
                  <router-link to="./pastors">
                    <v-btn class="mt-2" color="orange" text>cancel</v-btn>
                  </router-link>
                </span>
              </v-flex>
              <v-flex xs1>
                <span>
                  <v-btn class="mt-2" color="orange" text @click="submit">Submit</v-btn>
                </span>
              </v-flex>
            </v-layout>
          </div>
        </v-container>
      </v-card>
    </v-flex>
  </v-layout>
</template>
<script>
export default {
  data() {
    return {
      fullName: "",
      department: "",
      phone: "",
      dateOfBirth: "",

      formHasError: false
    };
  },

  computed: {
    form() {
      return {
        fullName: this.fullName,
        department: this.department,
        phone: this.phone,
        dateOfBirth: this.dateOfBirth
      };
    }
  },
  methods: {
    submit() {
      let fullName = this.fullName;
      let department = this.department;
      let phone = this.phone;
      let dateOfBirth = this.dateOfBirth;

      this.formHasError = false;

      Object.keys(this.form).forEach(f => {
        if (!this.form[f]) {
          alert("this form has gbegeh");
          this.formHasError = true;
        }
        this.$refs[f].validate(true);
      });

      if (!this.formHasError) {
        axios
          .get(
            "http://localhost:1337/membersInsert",
            {
              params: {
                fullName: fullName,
                department: department,
                phone: phone,
                dateOfBirth: dateOfBirth
              }
            },
            {
              headers: {
                "content-type": "application/json",
                "Access-Control-Allow-Orign": "*"
              }
            }
          )
          .then(response => {
            console.log(response.data);
            if (response !== undefined) {
              alert("i don bring d stuff");
              this.$router.push("./pastors");
              //this.$router.push("/addpastor.vue");
              //els;
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    }
  }
};
</script>
<style scoped>
.anchor {
  text-decoration: none;
}
</style>
