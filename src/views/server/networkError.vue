<template>
  <v-container fluid>
    <v-row>
      <v-col cols="12" xs="12" sm="12" md="12" lg="12" xg="12">
        <v-card flat>
          <v-row>
            <v-col cols="12" justify-content-center>
              <v-card class="text-center" style="font-size:50px " flat>
                <span class="orange--text">Connectivity Problem</span>
              </v-card>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" xs="12" sm="6" md="6" lg="7" xl="4">
              <v-card flat>
                <i>
                  <v-img src="img/devImages/candle.jpg" height="350" width="300" />
                </i>
              </v-card>
            </v-col>
            <v-col cols="12" xs="12" sm="4" md="4" lg="5" xg="3">
              <v-card flat class="font-weight-bold pt-5">
                <p
                  class="orange-text"
                  style="font-size:22px"
                >Troubleshooting Network innactivity Problems</p>
                <ul>
                  <li>Check you network connection and Refresh the page</li>
                  <li>Check the url of the request</li>
                  <li>Check if you are Connected to the right server</li>
                  <li>Make sure the Resource you are trying to connet has not been move from the domain</li>
                </ul>
              </v-card>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
<script>
export default {
  data() {
    return {};
  },

  methods: {},
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