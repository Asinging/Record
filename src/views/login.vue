<template>
  <v-layout class="mt-5">
    <v-flex align-center>
      <v-container>
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
          :rules="[
            () => !!password || 'password field must nto be empty']"
          label="password"
          type="password"
          required
          class="mb-5"
        ></v-text-field>
        <v-divider></v-divider>

        <router-link to="signUp">
          <v-btn class="mt-2 primary">Sign Up</v-btn>
        </router-link>
        <v-spacer></v-spacer>
        <v-btn class="mt-3 text-right primary">Login</v-btn>
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      email: null,
      password: null
    };
  }
};
</script>

<style>
</style>
