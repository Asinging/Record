<template>
  <v-container>
    <v-row no-gutters>
      <v-col cols="12">
        <v-card class="elevation-0 ma-0">
          <v-row>
            <v-col cols="12" xs="12" sm="4" md="12" lg="4" v-for="(card, car) in cards" :key="car">
              <v-card class="elevation-1 ma-2">
                {{card}}
                <!-- </v-flex> -->
              </v-card>
              <!-- <v-divider></v-divider> -->
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  name: "home",
  data() {
    return {
      months: [
        "January",
        "Febuary",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ],
    };
  },
  beforeMount() {},
  methods: {},
};
</script>
<style scoped>
#login {
  border-width: 0px;
}
</style>
