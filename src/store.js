import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {

    // preRoute: "",
    // draw: '',
    NODEText: '',

    serverResponse: "", // used
    user: {
      userName: '', //used
      userId: ''
    },
    appParams: { //used
      appName: '',
      appInitial: '',

    }


  },
  mutations: {

    htmlNodeText(state, innerHTML) {
      state.NODEText = innerHTML
    },

    serverResponse(state, response) {
      state.serverResponse = response
    },

    // fromRoute(state, routeName) {
    //   state.preRoute = routeName.route

    // },
    // navigationDrawer(state, draw) {
    //   state.draw = draw
    // },

    authDetails(state, user) {
      state.user.userName = user.userName
      state.user.userId = user.userId
    },
    appParams(state, payload) {
      state.appParams.appName = payload.appName
      state.appParams.appInitial = payload.appInitial
    }

  },
  actions: {
    serverResponse({
      commit
    }, response) {
      commit("serverResponse", response)
    },

    htmlNodeText({
      commit
    }, innerHTML) {
      commit("htmlNodeText", innerHTML)
    },

    // route({
    //   commit
    // }, routeName) {
    //   commit("fromRoute", routeName)
    // },
    // navigationDrawer({
    //   commit
    // }, draw) {
    //   commit("navigationDrawer", draw)
    // },
    authDetails({
      commit
    }, user) {
      commit("authDetails", user)
    },
    appParams({
      commit
    }, payload) {
      commit("appParams", payload)
    }
  },
  getters: {
    getHtmlElementClicked(state) {
      return state.NODEText
    },

    // getFromRoute(state) {
    //   return state.preRoute
    // },
    // navigationDrawer(state) {
    //   return state.draw
    // },

    serverResponse(state) {
      return state.serverResponse
    },
    authDetails(state) {
      return state.user
    },

  }

})