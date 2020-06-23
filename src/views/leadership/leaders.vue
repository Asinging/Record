
<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <!-- <v-layout>
          <v-flex xs12>
            <AddDeleteCustomButton>
              <template v-slot:button>
                <v-btn
                  text
                  large
                  depressed
                  tile
                  class="ml-1 mb-0 pt-2 pb-2 pl-1 pr-1 white--text addpastordelete"
                  color="orange"
                  @click="add"
                >Add pastors</v-btn>
              </template>
            </AddDeleteCustomButton>
          </v-flex>
          <v-flex xs5 offset-lg8 offset-xs1>
            <AddDeleteCustomButton>
              <template v-slot:button>
                <v-btn
                  text
                  large
                  depressed
                  tile
                  class="white--text pr-1 pl-1"
                  color="orange"
                  @click="deleteLeader"
                >Remove Pastor</v-btn>
              </template>
            </AddDeleteCustomButton>
          </v-flex>
        </v-layout>-->
        <v-layout>
          <v-flex xs12>
            <AddDeleteCustomButton :clickFnc="add">
              <template #btn="slotProps">add {{slotProps.btnName=leader}}</template>
            </AddDeleteCustomButton>
          </v-flex>
          <v-flex xs5 offset-lg8 offset-xs1>
            <AddDeleteCustomButton :clickFnc="deleteLeader">
              <template #btn="slotProps">Delete {{slotProps.btnName=leader}}</template>
            </AddDeleteCustomButton>
          </v-flex>
        </v-layout>
      </v-card>
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
        class="elevation-1"
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
    AddDeleteCustomButton
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
      htmlNodeText: "", // this is use instead  my leader for space string e.g "head of departments"
      loadingMessage: `Record is empty add to`,

      headers: [
        { text: "S/N", value: "id", sortable: true },
        {
          text: "Full name",
          value: "full_name"
        },
        { text: "Department", value: "department" },
        { text: "phone", value: "phone" },
        { text: "Date Of Birth", value: "date_of_birth" }
      ],
      dataSets: []
    };
  },

  mounted() {
    console.log(this);
    // this.leader = this.$store.getters.getHtmlElementClicked;
    // if (localStorage.getItem("h"))
    this.htmlNodeText = localStorage.getItem("htmlNodeText");
    this.leader = localStorage.getItem("extractedText");
    console.log(this.leader);
    axios
      .get("http://localhost:1337/" + this.htmlNodeText)
      .then(resp => {
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
        response.forEach(element => {
          dis.dataSets.push(element);
        });
      })
      .catch(err => {
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
  }
};
</script>
<style scoped>
.addpastordelete {
  text-decoration: none;
}
</styles>