<template>
  <v-layout>
    <v-flex xs12 sm6 offset-sm3>
      <v-container fluid>
        <v-layout>
          <v-flex>
            <router-link to="./about">
              <v-card ripple width="100px">ab</v-card>
            </router-link>

            <v-img
              src="/img/devImages/image.jpg"
              height="500"
              aspect-ratio="9:16"
              class="grey lighten-2"
            ></v-img>
          </v-flex>
        </v-layout>
        <v-layout>
          <v-flex><template v-slot:</v-flex>
        </v-layout>
      </v-container>
    </v-flex>
  </v-layout>
</template>


<script>
import Footer from "../components/footer";
export default {
  components: {
    Footer
  }
};
</script>

<style>
</style>
