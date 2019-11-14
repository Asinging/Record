<template>
  <v-content>
    <v-container>
      <v-sheet class="pa-3" height="200">
        <div class="branchField">
          <v-text-field label="Branch code"></v-text-field>
        </div>

        <div id="branchIcon">
          <v-icon>vpn_key</v-icon>
        </div>

        <v-sheet ripple="10" class="proceedDiv" color="orange">
          proceed
          <v-icon color="white" class="proceedIcon">trending_flat</v-icon>
        </v-sheet>
      </v-sheet>
    </v-container>
  </v-content>
</template>
<script>
export default {
  data() {
    return {};
  }
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
</style>