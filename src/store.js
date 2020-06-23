import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // htmlElement: '',
    branchCode: '',
    preRoute: "",
    drawer: false,
    NODEText: '',
    searchedServerResponse: ""

  },
  mutations: {
    commitBranchCode(state, baseString) {
      state.branchCode = baseString.code
      localStorage.setItem("branchCode", state.branchCode)
    },
    mutatehtmlNodeText(state, innerHTML) {
      state.NODEText = innerHTML
    },
    // htmlElement(state, element) {
    //   state.htmlElement = element
    // },
    searchedServerResponse(state, response) {
      state.searchedServerResponse = response
    },
    removeBranchCode(state) {
      state.branchCode = ""
    },
    fromRoute(state, routeName) {
      state.preRoute = routeName.route

    },
    drawer(state, drawer) {
      state.drawer = drawer
    }


  },
  actions: {
    searchedServerResponse({
      commit
    }, response) {
      commit("searchedServerResponse", response)
    },
    encodedBranchCode({
      commit
    }, baseString) {
      commit("commitBranchCode", baseString)
    },
    htmlNodeText({
      commit
    }, innerHTML) {
      commit("mutatehtmlNodeText", innerHTML)
    },
    removeBranchCode({
      commit
    }) {
      commit("removeBranchCode")
    },
    route({
      commit
    }, routeName) {
      commit("fromRoute", routeName)
    },
    // htmlElement({
    //   commit
    // }, element) {
    //   commit("htmlElement", element)
    // },
  },
  getters: {
    getHtmlElementClicked(state) {
      return state.NODEText
    },
    getCode(state) {
      return state.branchCode
    },
    getFromRoute(state) {
      return state.preRoute
    },
    // leaderName(state) {
    //   return state.NODEName
    // },
    serverResponse(state) {
      return state.searchedServerResponse
    }
  }

})