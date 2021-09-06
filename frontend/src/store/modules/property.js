export default {
    state: {
        property: null,
        currentProperty: null
    },
    getters: {
        getProperty(state) {
            return state.property
        },
        getCurrentProperty(state) {
            return state.currentProperty
        }
    },
    mutations: {
        setProperty(state, property) {
            state.property = property
        },
        setCurrentProperty(state, property) {
            state.currentProperty = property
        },
        removePropertyMutation(state, id) {
            const deletionIndex = state.property.findIndex(item => item.id === id)
            state.property = [
                ...state.property.slice(0, deletionIndex),
                ...state.property.slice(deletionIndex + 1)
            ]
        },
        addPropertyPageMutation(state, property) {
            const targetProperty = state.property
                .concat(property)
                .reduce((res, val) => {
                    res[val.id] = val
                    return res
                }, {})

            state.property = Object.values(targetProperty)
        },
        updatePropertyPageMutation(state, page) {
            state.page = page
        },
        updatePropertyPagesMutation(state, pages) {
            state.pages = pages
        },
        updatePropertyTotalMutation(state, count) {
            state.count = count
        }
    },
    actions: {
        listProperty({ commit }, page = 0) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)
                this._vm.$axios
                    .get('/property', {
                        params: {
                            page: page
                        }
                    })
                    .then(response => {
                        commit('setProperty', response.data.list)
                        commit('updatePropertyPageMutation', Math.min(response.data.page, response.data.pages - 1))
                        commit('updatePropertyPagesMutation', response.data.pages)
                        commit('updatePropertyTotalMutation', response.data.total)
                        commit('setError', null)
                        commit('setLoading', false)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('setError', error.message)
                        commit('setLoading', false)
                        reject(error)
                    })
            })
        },
        infoProperty({ commit }, id) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)
                this._vm.$axios.get(`/property/${id}`)
                    .then((response) => {
                        commit('setCurrentProperty', response.data)
                        commit('setError', null)
                        commit('setLoading', false)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit('setCurrentProperty', null)
                        commit('setError', error.message)
                        commit('setLoading', false)
                        reject()
                    })
            })
        },
        addProperty({ commit }, formData) {
            return new Promise((resolve, reject) => {
                const data = {
                    name: formData.name,
                    description: formData.description,
                    cost: formData.cost
                }
                commit('setLoading', true)
                if (formData.id === 0) {
                    this._vm.$axios
                        .post('/property', data)
                        .then(response => {
                            commit('setError', null)
                            commit('setLoading', false)
                            resolve(response)
                        })
                        .catch(error => {
                            commit('setError', error.message)
                            commit('setLoading', false)
                            reject(error)
                        })
                } else {
                    this._vm.$axios
                        .put('/property/' + formData.id, data)
                        .then(response => {
                            commit('setError', null)
                            commit('setLoading', false)
                            resolve(response)
                        })
                        .catch(error => {
                            commit('setError', error.message)
                            commit('setLoading', false)
                            reject(error)
                        })
                }
            })
        },
        removeProperty({ commit }, id) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)
                this._vm.$axios
                    .delete('/property/' + id)
                    .then(response => {
                        commit('removePropertyMutation', id)
                        commit('setError', null)
                        commit('setLoading', false)
                        resolve(response)
                    })
                    .catch(error => {
                        commit('setError', error.message)
                        commit('setLoading', false)
                        reject()
                    })
            })
        },
        async loadPropertyPageAction({ commit, state }) {
            commit('setLoading', true)
            const response = await this._vm.$axios
                .get('/property', {
                    params: {
                        page: state.page + 1
                    }
                })

            commit('addPropertyPageMutation', response.data.list)
            commit('updatePropertyPageMutation', Math.min(response.data.page, response.data.pages - 1))
            commit('updatePropertyPagesMutation', response.data.pages)
            commit('updatePropertyTotalMutation', response.data.total)
            commit('setLoading', false)
        }
    }
}