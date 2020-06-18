<template>
  <v-content>
    <v-container fluid>
      <v-card height="300">
        <p>OPPs it's seems network has issues</p>
      </v-card>
    </v-container>
  </v-content>
</template>
<script>
export default {
  data() {
    return {};
  },

  methods: {}
};
</script>
<style scoped>
.branchField {
  width: 250px;
  text-align: center;
  margin-left: 50px;
}
.proceedDiv {
  border-radius: 30px;
  color: white;
  margin-left: 40px;
  margin-right: 20px;
  margin-top: 0px;

  padding: 5px;
  padding-right: 0px;
  width: 200px;
  height: 35px;
  text-align: center;
  border-bottom-left-radius: 30px !important;
  border-bottom-right-radius: 30px !important;
}
.proceedIcon {
  margin-right: 0px;
  margin-left: 20px;
  text-align: right;
}
#branchIcon {
  position: relative;
  margin-top: -52px;
  text-align: right;
  margin-bottom: 30px;
  margin-right: 20px;
}
.holder {
  text-align: center;
  align-content: center;
  margin-left: 30px;
}
</style>