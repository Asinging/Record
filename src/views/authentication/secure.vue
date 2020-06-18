<template>
  <v-content>
    <v-container fluid>
      <v-card height="300">
        <v-flex xs12 sm7 md4>
          <div class="holder">
            <div class="branchField">
              <v-text-field label="Branch code" v-model="branchCode"></v-text-field>
            </div>

            <!-- <div id="branchIcon">
              <v-icon>vpn_key</v-icon>
            </div>-->

            <v-sheet elevation-24 class="proceedDiv" color="orange" @click="proceed">
              proceed
              <v-icon color="white" class="proceedIcon">trending_flat</v-icon>
            </v-sheet>
          </div>
        </v-flex>
      </v-card>
    </v-container>
  </v-content>
</template>
<script>
export default {
  data() {
    return {
      branchCode: ""
    };
  },
  // computed: {
  //   clearBranchCode() {
  //     //alert("i have been computed");
  //     function branchCode() {
  //       //localStorage.removeItem("branchCode");
  //     }
  //     //setInterval(branchCode, 50000);
  //   }
  // },
  methods: {
    proceed() {
      //console.log(btoa("singa13"));

      // as local storage session

      // if (this.branchCode) {
      //   localStorage.setItem("branchCode", this.branchCode);
      //   console.log(this.branchCode);
      // }
      let singa = this.branchCode.trim();
      this.$store.dispatch("encodedBranchCode", {
        code: singa
      });
      this.$router.push("/");
      //let bt = this.$store.getters.getCode;
      //   console.log(bt);
      //   alert(bt);
    }
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
.holder {
  text-align: center;
  align-content: center;
  margin-left: 30px;
}
</style>