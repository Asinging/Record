<template>
  <v-container>
    <v-layout>
      <v-flex xs12 sm12 md12 lg12 xl12>
        <v-flex>Add Importants events to your Church Record</v-flex>
        <v-layout>
          <v-flex>
            <v-card class="mt-12 elevation-0" ref="form">
              <!-- <form> -->
              <v-layout>
                <v-flex lg6>
                  <v-card flat class="title elevation-0">The Vision of the churcffh</v-card>
                  <v-card flat v-if="isEnterKeypressed">
                    <v-card
                      v-for="(list, index) in  vvision"
                      :key="index"
                      class="elevation-0"
                    >{{`<> : ${list}`}}</v-card>
                  </v-card>
                </v-flex>

                <v-flex offset- lg6>
                  <v-card flat class="elevation-0">
                    <v-textarea
                      ref="vision"
                      v-model="vision"
                      @keyup.enter="validateInput($event)"
                      outlined
                      name="vision"
                      label="Outlined textarea"
                      focus="false"
                    ></v-textarea>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex lg6>
                  <v-card flat class="title elevation-0">The Mission of the Church</v-card>
                  <v-card flat v-if="isEnterKeypressed">
                    <v-card
                      v-for="(list, index) in  vvision"
                      :key="index"
                      class="elevation-0"
                    >{{`<> : ${list}`}}</v-card>
                  </v-card>
                </v-flex>

                <v-flex offset- lg6>
                  <v-card flat class="elevation-0">
                    <v-textarea
                      ref="mission"
                      @keyup.enter="validateInput($event)"
                      v-model="mission"
                      outlined
                      name="mission"
                      label="Outlined textarea"
                    ></v-textarea>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex lg6>
                  <v-card flat class="title elevation-0">SThe Objectives of the church</v-card>
                  <v-card flat v-if="isEnterKeypressed">
                    <v-card
                      v-for="(list, index) in  vvision"
                      :key="index"
                      class="elevation-0"
                    >{{`<> : ${list}`}}</v-card>
                  </v-card>
                </v-flex>

                <v-flex offset- lg6>
                  <v-card flat class="elevation-0">
                    <v-textarea
                      ref="objectives"
                      @keyup.enter="validateInput($event)"
                      v-model="objectives"
                      outlined
                      name="input-7-4"
                      label="Outlined textarea"
                    ></v-textarea>
                  </v-card>
                </v-flex>
              </v-layout>
              <v-layout>
                <v-flex lg6>
                  <v-card
                    flat
                    class="title elevation-0"
                  >The Core values and Principles of the church</v-card>
                  <v-card flat v-if="isEnterKeypressed">
                    <v-card
                      v-for="(list, index) in  vvision"
                      :key="index"
                      class="elevation-0"
                    >{{`<> : ${list}`}}</v-card>
                  </v-card>
                </v-flex>

                <v-flex offset- lg6>
                  <v-card flat class="elevation-0">
                    <v-textarea
                      outlined
                      name="input-7-4"
                      label="Outlined textarea"
                      v-model="coreValues"
                      ref="coreValues"
                    ></v-textarea>
                  </v-card>
                </v-flex>
              </v-layout>
              <!-- </form> -->
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      count: 0,
      vision: [],
      mission: [],
      objectives: [],
      coreValues: [],
      isEnterKeypressed: false,
      vvision: [],
    };
  },
  computed: {
    count() {
      return {
        count: this.count++,
      };
    },
    form() {
      return {
        vision: this.vision,
        mission: this.mission,
        objectives: this.objectives,
        coreValues: this.coreValues,
      };
    },
  },
  methods: {
    validateInput(e) {
      if (event.keyCode == 13) {
        Object.keys(this.form).forEach((f) => {
          if (f == e.target.name) {
            this.vvision = this.form[e.target.name].split("\n");
          }
        });
        this.isEnterKeypressed = true;
      }
    },
  },
};
</script>