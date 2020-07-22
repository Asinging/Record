import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    preRoute: "",
    draw: '',
    NODEText: '',
    searchedServerResponse: "",
    user: {
      useName: '',
      userId: ''
    }


  },
  mutations: {

    mutatehtmlNodeText(state, innerHTML) {
      state.NODEText = innerHTML
    },

    searchedServerResponse(state, response) {
      state.searchedServerResponse = response
    },

    fromRoute(state, routeName) {
      state.preRoute = routeName.route

    },
    navigationDrawer(state, draw) {
      state.draw = draw
    },

    authDetails(state, user) {
      state.user.userName = user.userName
      state.user.userId = user.userId
    }

  },
  actions: {
    searchedServerResponse({
      commit
    }, response) {
      commit("searchedServerResponse", response)
    },

    htmlNodeText({
      commit
    }, innerHTML) {
      commit("mutatehtmlNodeText", innerHTML)
    },

    route({
      commit
    }, routeName) {
      commit("fromRoute", routeName)
    },
    navigationDrawer({
      commit
    }, draw) {
      commit("navigationDrawer", draw)
    },
    authDetails({
      commit
    }, user) {
      commit("authDetails", user)
    }
  },
  getters: {
    getHtmlElementClicked(state) {
      return state.NODEText
    },

    getFromRoute(state) {
      return state.preRoute
    },

    serverResponse(state) {
      return state.searchedServerResponse
    },
    navigationDrawer(state) {
      return state.draw
    },
    authDetails(state) {
      return state.user
    }
  }

})