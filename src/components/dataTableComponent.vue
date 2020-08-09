<template>
  <v-container>
    <v-layout>
      <v-flex xs12>
        <v-card class="elevation-0" flat id="printSection">
          <v-layout>
            <v-flex justify-center>
              <v-card
                class="elevation-0 ma-3 text-center subtitle-1 font-weight-bold orange--text undeline"
              >
                <!-- <span
                  v-if="innerHtmlCurrentlyClicked=='custom search'"
                >Records for {{innerHtmlCurrentlyClicked}} ({{date_1}} to {{date_2}})</span>
                <span v-else>Records for {{innerHtmlCurrentlyClicked}}</span>-->
                <slot name="header"></slot>
              </v-card>
            </v-flex>
          </v-layout>
          <v-layout>
            <v-flex>
              <v-data-table
                class="elevation-0"
                v-model="selected"
                :headers="headers"
                :items=" DOMDisplayContent"
                :loading="loading"
                item-key="id"
                :loading-text="loadingMessage"
              ></v-data-table>
              <!-- this is a data table props  brought outside for convenience -->
              <!-- footer-props.next-icon="$vuetify.icons.next" -->
            </v-flex>
          </v-layout>

          <!-- buttons -->

          <!-- <v-layout>
            <v-flex xs12>
              <v-Button :clickFnc="cancel">
                <template #btn>cancel</template>
              </v-Button>
            </v-flex>
            <v-flex offset-xs5 offset-sm8 offset-md8 offset-lg8 offset-xl7>
              <v-Button :clickFnc="print">
                <template #btn>
                  <v-icon>mdi-fax</v-icon>
                  <span class="ma-2">Print</span>
                </template>
              </v-Button>
            </v-flex>
          </v-layout> -->
        </v-card>

        <!-- <caption>sunday</caption> -->
      </v-flex>
    </v-layout>
  </v-container>
</template>
<style scoped>
</style>
<script>
import Buttons from "./customSlots.vue";
export default {};
</script>