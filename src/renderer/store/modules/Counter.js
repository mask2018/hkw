const state = {
  main: 0,
  name: ''
}

const mutations = {
  DECREMENT_MAIN_COUNTER (state) {
    state.main--
  },
  INCREMENT_MAIN_COUNTER (state) {
    state.main++
  },
  moreCom (state, name) {
    state.name = name
    // console.log('保存', state.name)
  }
}

const getters = {
  moreCom (state) {
    // console.log('获取', state.name)
    return state.name
  }
}

const actions = {
  someAsyncTask ({ commit }) {
    // do something async
    commit('INCREMENT_MAIN_COUNTER')
  },
  moreCom (state, name) {
    // console.log('获取', state.name)
  }
}

export default {
  state,
  mutations,
  actions,
  getters
}
