<template>
  <v-card-actions>
    <v-btn @click="cancel()" class="btn" color="orange" text>Cancel</v-btn>
    <v-spacer></v-spacer>
    <v-slide-x-reverse-transition>
      <v-tooltip v-if="formHasErrors" bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon class="my-0" color="orange" @click="resetForm" v-on="on">
            <v-icon>refresh</v-icon>
          </v-btn>
        </template>
        <span>Refresh form</span>
      </v-tooltip>
    </v-slide-x-reverse-transition>
    <v-btn :loading="loadingEffect" class="btn" color="orange" text @click="submit">Submit</v-btn>
  </v-card-actions>
</template>
<script>
export default {
  data() {
    return {};
  },
  props: {
    cancel: {
      type: Function
    },
    submit: {
      type: Function
    }
  }
};
</script>