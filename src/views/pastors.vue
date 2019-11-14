
<template>
  <v-layout>
    <v-flex xs12>
      <v-card>
        <v-layout>
          <v-flex xs12>
            <addDelete>
              <template v-slot:add>
                <router-link to="addpastor">
                  <v-btn class="ma-3 pl-7 pr-7" @click>Add pastors</v-btn>
                </router-link>
              </template>
            </addDelete>
          </v-flex>
          <v-flex xs5>
            <addDelete>
              <template v-slot:delete>
                <v-btn class="ma-3" @click="deletePastor">Remove Pastor</v-btn>
              </template>
            </addDelete>
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
        item-key="name"
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
import AddDelete from "../components/addDeletePastors.vue";
export default {
  components: {
    AddDelete
  },
  data() {
    return {
      loading: false,
      singleSelect: false,
      deleted: [],
      serverData: [],
      selected: [],
      loadingMessage: "",

      headers: [
        { text: "Full name", value: "name", sortable: true, align: "left" },
        { text: "Department", value: "department" },
        { text: "phone", value: "phone" },
        { text: "Date Of Birth", value: "dateOfBirth" }
      ],
      dataSets: []
    };
  },
  created() {
    axios
      .get(
        "http://localhost:1337/pastors"
        //   {
        // headers: {
        //   "Content-Type": "application/json",
        //   "Access-Control-Allow-Origin": "*"
        // }
        // }
      )
      .then(response => {
        let res = response.data;
        if (res.length == []) {
          this.loading = true;
          this.loadingMessage = "the record is empty ";
        }

        res.forEach(element => {
          this.dataSets.push(element);
        });
      })
      .catch(err => {
        console.log("i couldn't go");

        this.loading = true;
        this.loadingMessage = "pls Check your network connection or Reload";
      });
  },
  computed: {
    chn() {
      return {
        template: this.msg
      };
    }
  },

  methods: {
    addPastor() {
      //this is the values to be displayed
      let empObj = {
        name: "",
        department: "",
        date_of_birth: "",
        phone: ""
      };
      this.dataSets = [];
      this.dataSets.push(empObj);
      //console.log(this.dataSets);
    },
    deletePastor() {
      let dis = this;
      if (this.dataSets.length == 0 && this.loading == true) {
        this.$swal({
          title: "opps",
          type: "info",
          text: "Record still loading please wait"
        });
      }

      if (this.selected.length == [] && this.dataSets.length != []) {
        this.$swal({
          title: "You Want To Remove",
          type: "info",
          text: "select a pastor to delete",
          showCloseButton: true,
          showCancelButton: true,
          focusConfirm: false
        });
      } else if (
        !this.loading &&
        this.dataSets.length != [] &&
        this.selected.length != []
      ) {
        this.$swal({
          type: "warning",
          title: "Are You Sure",
          text: `you are about to Remove ${dis.selected.length} pastor${
            dis.selected.length <= 1 ? "" : "s"
          } from a list`,

          showCloseButton: true,
          showCancelButton: true
        }).then(result => {
          this.ids;
          if (result.value) {
            this.selected.forEach(row => {
              this.dataSets.indexOf(row) !== -1
                ? this.dataSets.splice(this.dataSets.indexOf(row), 1)
                : false;
              dis.deleted.push(row);
            });
            //deleted data entry section

            dis.deleted.forEach(single => {
              // removing the selected element by each
              this.selected.indexOf(single) !== -1
                ? dis.selected.splice(dis.selected.indexOf(single), 1)
                : false;

              let idds = {
                id: single.id
              };
              dis.serverData.push(idds);
            });
            //console.log(dis.serverData);
            // automatic database update

            let data = dis.serverData;

            axios.get(
              "http://localhost:1337/deletepastor",
              {
                params: {
                  ids: data
                }
              },
              {
                headers: {
                  "Content-Type": "application/json",
                  "Access-Control-Allow-Origin": "*"
                }
              }
            );

            this.$swal({
              type: "success",
              title: "Deleted",
              text: `you have successfully deleted ${
                dis.deleted.length
              } pastor${dis.deleted.length <= 1 ? "" : "s"}`
            });
            this.deleted.length = [];
            if (this.dataSets.length === []) {
              this.loading = true;
            }
            dis.serverData = [];
          }
        });
        // this.selected.length = [];
      }
    }
  }
};
</script>