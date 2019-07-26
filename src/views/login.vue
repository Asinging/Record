<template>
  <v-layout>
    <v-flex>
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
        ></v-text-field>
      </v-container>
    </v-flex>
  </v-layout>
</template>