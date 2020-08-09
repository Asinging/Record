import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    NODEText: '',

    serverResponse: [], // used
    user: {
      userName: '', //used
      userId: ''
    },
    appParams: { //used
      appName: '',
      appInitial: '',

    },
    customDatesQuery: [],
    vueLoader: '',
    vueLoaderConfig: {}

  },
  mutations: {
    vueLoaderConfig(state, payload) {
      state.vueLoaderConfig = payload
    },
    vueLoader(state, obj) {
      state.vueLoader = obj
    },
    customDatesQuery(state, dates) {
      state.customDatesQuery = dates
    },
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
    vueLoaderConfig({
      commit
    }, payload) {
      commit("vueLoaderConfig", payload)
    },
    vueLoader({
      commit
    }, objPayload) {
      commit("vueLoader", objPayload)
    },
    customDatesQuery({
      commit
    }, payload) {
      commit("customDatesQuery", payload)
    },
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
    LoaderConfig(state) {
      return state.vueLoaderConfig
    },
    loader(state) {
      return state.vueLoader
    },
    customDates(state) {
      return state.customDatesQuery
    },
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