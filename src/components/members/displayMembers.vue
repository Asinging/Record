
<template >
  <v-layout>
    <v-flex xs12>
      <v-sheet>{{htmlElement.toUpperCase()}} RECORDS</v-sheet>
      <v-data-table
        id="printSection"
        v-model="selected"
        :headers="headers"
        :items=" DOMDisplayContent"
        :loading="loading"
        item-key="id"
        :loading-text="loadingMessage"
        class="elevation-1"
      ></v-data-table>

      <!-- buttons -->
      <v-layout>
        <v-flex xs12>
          <v-Button :clickFnc="cancel">
            <template #btn>cancel</template>
          </v-Button>
        </v-flex>
        <v-flex xs5 offset-lg8 offset-xs1>
          <v-Button :clickFnc="print">
            <template #btn>Print</template>
          </v-Button>
        </v-flex>
      </v-layout>
    </v-flex>
  </v-layout>
</template>
<script>
import Buttons from "../customSlots.vue";
export default {
  name: "Display-members",
  components: {
    "v-Button": Buttons
  },
  data() {
    return {
      htmlElement: "record",
      prevRoute: "",
      DOMDisplayContent: [],
      loading: true,
      selected: [],
      serverResponse: [],

      loadingMessage: `Record is empty add to`,

      headers: [
        { text: "S/N", value: "id", sortable: true },
        {
          text: "Full name",
          value: "full_name"
        },
        { text: "Department", value: "department" },
        { text: "phone", value: "phone" },
        { text: "Date Of Birth", value: "date_of_birth" },
        { text: "Address", value: "address" }
      ]
    };
  },
  mounted() {
    this.prevRoute = this.$store.getters.getFromRoute;
    this.htmlElement = localStorage.getItem("formattedHtmlNodeText");
    this.serverResponse = this.$store.getters.serverResponse;
    //console.log(this.serverResponse);
    let container = new Object();
    var n = [];
    if (this.serverResponse != "") {
      for (let x of this.serverResponse) {
        Object.entries(x).map((value, key) => {
          // console.log(value);

          if (typeof container[value[0]] === "undefined") {
            //console.log(value[1]);
            container[value[0]] = [value[1]]q
            //console.log(value[0]);
            //container.push(new Array(value[0]));
            //   valued = value[0];
            //   container.push(new Array(valued));
          }
        });
      }
        console.log(container);

      this.DOMDisplayContent = this.serverResponse;
    } else {
      this.loading = "";
    }
    if (this.DOMDisplayContent) {
      this.loading = false;
    }
  },
  //get the destination route to
  beforeRouteEnter(to, from, next) {
    next(vm => {
      from;
      vm.prevRoute = from;
      vm.$store.dispatch("route", { route: vm.prevRoute.name });
    });
  },

  methods: {
    print() {
      alert("you are  about to print");
      printJS("printSection", "html");
    },

    cancel() {
      this.$router.push({
        // name: this.prevRoute.name
        name: "members"
      });
    }
  }
};
</script>
<style scoped>
.addpastordelete {
  text-decoration: none;
}
</styles>