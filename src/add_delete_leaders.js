// ################################
// description: this is a  delete MIXIN for all the components that may neeD it 
/// by SINGINGSONGZ


// ##################################

import Vue from "vue"
import VueSweetalert2 from 'vue-sweetalert2';
Vue.use(VueSweetalert2)


export const principalMixin = {
    data() {
        return {
            currentRouteName: "",
            fetchLeader: ""

        }
    },
    beforeRouteEnter(from, to, next) {

        next(vm => {
            from;
            vm.currentRouteName = from
        })
    },


    methods: {
        add() {

            this.$router.push({
                path: "./addLeader"
            });
        },
        //arrow function does not work here
        deleteLeader() {


            //check if the component has a designated name if does not 
            if (this.$options.name === '') {
                console.log(this.currentRouteName)
                this.fetchLeader = this.currentRouteName.name.slice(0, -1)



            } else {
                this.fetchLeader = this.$options.name

            }
            //fetching the router name as a string

            let fetchLeaderName = this.fetchLeader

            //fetching the router name as a string


            var dis = this;


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
                    text: `select a ${fetchLeaderName} to delete`,
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
                    text: `you are about to Remove ${

                        
                  dis.selected.length <= 1
                    ? dis.selected.map(item =>fetchLeaderName+ " " + item.full_name)
                    : dis.selected.length + " " + fetchLeaderName
                }s`,
                    showCloseButton: true,
                    showCancelButton: true
                }).then(result => {
                    //this.ids;
                    if (result.value) {
                        this.selected.forEach(row => {
                            this.dataSets.indexOf(row) !== -1 ?
                                this.dataSets.splice(this.dataSets.indexOf(row), 1) :
                                false;
                            this.deleted.push(row);
                        });
                        // console.log(this.deleted);
                        //deleted data entry section

                        dis.deleted.forEach(single => {
                            // removing the selected element by each
                            dis.selected.indexOf(single) !== -1 ?
                                dis.selected.splice(dis.selected.indexOf(single), 1) :
                                false;

                            let idds = {
                                id: single.id
                            };
                            dis.serverData.push(idds);
                        });
                        //console.log(dis.serverData);
                        // automatic database update

                        let data = dis.serverData;

                        axios.get(
                            "http://localhost:1337/deleteLeader", {
                                params: {
                                    ids: data
                                }
                            }, {
                                headers: {
                                    "Content-Type": "application/json",
                                    "Access-Control-Allow-Origin": "*"
                                }
                            }
                        );

                        this.$swal({
                            //type: "success",
                            title: "Deleted",

                            text: `you have successfully deleted ${dis.deleted.length <= 1 ? dis.deleted.map(item =>  item.full_name):dis.deleted.length +" "+ fetchLeaderName}s`
                            //       text: `you have successfully deleted ${
                            //   dis.deleted.length
                            // } ${fetchLeaderName}${dis.deleted.length <= 1 ? "" : "s"}`
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
        },

    }

}