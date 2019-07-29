<template>
  <v-layout>
    <v-flex xs12 md6 lg12>
      <v-carousel height="380" :hide-delimiters="true" :show-arrows="false">
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
          reverse-transition="fade-transition"
          transition="fade-transition"
          height="50x"
        >
          <v-flex lg6>
            <v-card class="transparent" width="300">
              <v-card-text
                class="display"
                color="white"
                elavation="0"
                justify-center
              >"how God anointed Jesus of nazareth that he went about doing good"</v-card-text>
              <v-card-action>act 10:38</v-card-action>
            </v-card>
          </v-flex>
        </v-carousel-item>
      </v-carousel>
      <Control />
    </v-flex>
  </v-layout>
</template>
<script>
import Footer from "../components/footer";
import Control from "../components/controls";
export default {
  data() {
    return {
      items: [
        {
          src: "/img/devImages/image.jpg"
        },
        {
          src: "/img/devImages/image2.jpg"
        },
        {
          src: "/img/devImages/image3.jpg"
        },
        {
          src: "/img/devImages/image4.jpg"
        },
        {
          src: "/img/devImages/image5.jpg"
        },
        {
          src: "/img/devImages/image6.jpg"
        },
        {
          src: "/img/devImages/image7.jpg"
        }
      ],
      hideDelimiters: true,
      showArrow: false
    };
  },
  components: {
    Footer,
    Control
  }
};
</script>

<style>
</style>
