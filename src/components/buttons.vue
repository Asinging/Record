<template>
  <div>
    <v-layout>
      <v-flex xs12>
        <!-- <span> -->
        <v-btn class="mt-2" color="orange" text @click="cancel">
          <slot name="cancel">cancel</slot>
        </v-btn>
        <!-- </span> -->
      </v-flex>
      <v-flex xs3 justify-space-around>
        <!-- <span> -->
        <v-btn
          class="mt-3 text-right login pr-3"
          color="orange"
          id="print"
          tile
          text
          v-bind:methodCall="onClick"
        >
          <slot name="submit">sumbits</slot>
        </v-btn>
        <!-- </span> -->
      </v-flex>
    </v-layout>
  </div>
</template>
<script>
export default {
  props: {
    onclick: {
      type: "function",
    },
  },
};
</script>
<style scoped></style>