
<template>
  <v-layout>
    <v-flex xs12>
      <v-layout>
        <v-flex xs12>
          <AddDeleteCustomButton :clickFnc="add" ml-2>
            <template #button="slotProps">update {{slotProps.btnName=leader}}</template>
          </AddDeleteCustomButton>
        </v-flex>
        <v-flex xs5 offset-lg8 offset-xs2 offset-md9>
          <AddDeleteCustomButton :clickFnc="deleteLeader">
            <template #button="slotProps">Delete {{slotProps.btnName=leader}}</template>
          </AddDeleteCustomButton>
        </v-flex>
      </v-layout>
      <v-layout>
        <v-flex xs12 sm12 md12 lg12 xl12>
          <v-card class="elevation-0 font-weight-bold orange--text mt-5">
            <marquee>{{leader.toUpperCase()}}</marquee>
          </v-card>
        </v-flex>
      </v-layout>
      <v-data-table
        fixed-header
        v-model="selected"
        :headers="headers"
        :items="dataSets"
        :single-select="singleSelect"
        :loading="loading"
        item-key="id"
        :loading-text="loadingMessage"
        show-select
        class="elevation-0"
      >
        <template v-slot:top>
          <v-switch v-model="singleSelect" label="Single select" class="pa-5"></v-switch>
        </template>
      </v-data-table>
    </v-flex>
  </v-layout>
</template>
<script>
import AddDeleteCustomButton from "../../components/customSlots.vue";
import { principalMixin } from "../../add_delete_leaders.js";

export default {
  name: "",
  components: {
    AddDeleteCustomButton,
  },
  mixins: [principalMixin],
  data() {
    return {
      nameOfComponents: "",
      leader: "",
      loading: true,
      singleSelect: false,
      deleted: [],
      serverData: [],
      selected: [],
      drawerInnerHtmlElement: "", // this is use instead  my leader for space string e.g "head of departments"
      loadingMessage: `Record is empty add to`,

      headers: [
        { text: "S/N", value: "id", sortable: true },
        {
          text: "Full name",
          value: "full_name",
        },
        { text: "Department", value: "department" },
        { text: "phone", value: "phone" },
        { text: "Date Of Birth", value: "date_of_birth" },
      ],
      dataSets: [],
    };
  },

  mounted() {
    // this.leader = this.$store.getters.getHtmlElementClicked;
    // if (localStorage.getItem("h"))
    this.drawerInnerHtmlElement = localStorage.getItem(
      "drawerInnerHtmlElement"
    );

    let leader = localStorage.getItem("drawerInnerHtmlElement");
    this.leader = leader == "headOfDepartments" ? "head of units" : leader;
    console.log(this.drawerInnerHtmlElement);
    axios
      .get(
        "/" + this.drawerInnerHtmlElement,
        {},
        {
          header: {
            "Access-Control-Allow-Orign": "*",
            "content-type": "application/json",
            withCredentials: true,
          },
        }
      )
      .then((resp) => {
        console.log(resp);
        let response = resp.data;
        var dis = this;

        if (response.length == []) {
          this.loading = true;
          this.loadingMessage = "the record is empty ";
        } else if (response.length) {
          this.loading = false;
        }

        console.log(response);
        // fullName containers for the response so we don't have duplicate full Name
        let fullName = [];
        response.forEach((element) => {
          fullName.includes(element.full_name)
            ? false
            : (fullName.push(element.phone), dis.dataSets.push(element));
        });
      })
      .catch((err) => {
        console.error(err);

        this.loading = true;
        this.loadingMessage = "pls Check your network connection and Reload";
      });
  },
  computed: {
    // chn() {
    //   return {
    //     template: this.msg
    //   };
    // }
  },

  methods: {
    // returnName: selectedElement => {},
    // addPastor() {
    //   //this.$swal("this is the lord doin")
    //   //this is the values to be displayed
    //   let empObj = {
    //     name: "",
    //     department: "",
    //     date_of_birth: "",
    //     phone: ""
    //   };
    //   this.dataSets = [];
    //   this.dataSets.push(empObj);
    //   //console.log(this.dataSets);
    //}
  },
};
</script>
<style scoped>
.addpastordelete {
  text-decoration: none;
}
</styles>