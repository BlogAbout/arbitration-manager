export default {
    state: {
        question: null,
        currentQuestion: null
    },
    getters: {
        getQuestion(state) {
            return state.question
        },
        getCurrentQuestion(state) {
            return state.currentQuestion
        }
    },
    mutations: {
        setQuestion(state, question) {
            state.question = question
        },
        setCurrentQuestion(state, question) {
            state.currentQuestion = question
        },
        removeQuestionMutation(state, id) {
            const deletionIndex = state.question.findIndex(item => item.id === id)
            state.question = [
                ...state.question.slice(0, deletionIndex),
                ...state.question.slice(deletionIndex + 1)
            ]
        },
        addQuestionPageMutation(state, question) {
            const targetQuestion = state.question
                .concat(question)
                .reduce((res, val) => {
                    res[val.id] = val
                    return res
                }, {})

            state.question = Object.values(targetQuestion)
        },
        updateQuestionPageMutation(state, page) {
            state.page = page
        },
        updateQuestionPagesMutation(state, pages) {
            state.pages = pages
        },
        updateQuestionTotalMutation(state, count) {
            state.count = count
        }
    },
    actions: {
        listQuestion({ commit }, page = 0) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)
                this._vm.$axios
                    .get('/question', {
                        params: {
                            page: page
                        }
                    })
                    .then(response => {
                        commit('setQuestion', response.data.list)
                        commit('updateQuestionPageMutation', Math.min(response.data.page, response.data.pages - 1))
                        commit('updateQuestionPagesMutation', response.data.pages)
                        commit('updateQuestionTotalMutation', response.data.total)
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
        infoQuestion({ commit }, id) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)
                this._vm.$axios.get(`/question/${id}`)
                    .then((response) => {
                        commit('setCurrentQuestion', response.data)
                        commit('setError', null)
                        commit('setLoading', false)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit('setCurrentQuestion', null)
                        commit('setError', error.message)
                        commit('setLoading', false)
                        reject()
                    })
            })
        },
        addQuestion({ commit }, formData) {
            return new Promise((resolve, reject) => {
                const data = {
                    question: formData.question,
                    answer: formData.answer
                }
                commit('setLoading', true)
                if (formData.id === 0) {
                    this._vm.$axios
                        .post('/question', data)
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
                        .put('/question/' + formData.id, data)
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
        removeQuestion({ commit }, id) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)
                this._vm.$axios
                    .delete('/question/' + id)
                    .then(response => {
                        commit('removeQuestionMutation', id)
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
        async loadQuestionPageAction({ commit, state }) {
            commit('setLoading', true)
            const response = await this._vm.$axios
                .get('/question', {
                    params: {
                        page: state.page + 1
                    }
                })

            commit('addQuestionPageMutation', response.data.list)
            commit('updateQuestionPageMutation', Math.min(response.data.page, response.data.pages - 1))
            commit('updateQuestionPagesMutation', response.data.pages)
            commit('updateQuestionTotalMutation', response.data.total)
            commit('setLoading', false)
        }
    }
}