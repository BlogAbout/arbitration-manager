import router from '@/router'

const AUTH_TYPE = 'AuthType'
const TOKEN_KEY = 'AuthToken'
const NAME_KEY = 'AuthName'
const USERNAME_KEY = 'AuthUsername'
const AUTHORITIES_KEY = 'AuthAuthorities'

export default {
    state: {
        currentUser: null
    },
    getters: {
        getCurrentUser(state) {
            return state.currentUser
        },
        getToken() {
            return localStorage.getItem(TOKEN_KEY)
        },
        getName() {
            return localStorage.getItem(NAME_KEY)
        },
        getUsername() {
            return localStorage.getItem(USERNAME_KEY)
        },
        getAuthorities() {
            let roles = []
            JSON.parse(localStorage.getItem(AUTHORITIES_KEY)).forEach(authority => { roles.push(authority) })
            return roles
        },
    },
    mutations: {
        setCurrentUser(state, user) {
            state.currentUser = user
        },
        setTypeAuth(state, type) {
            localStorage.removeItem(AUTH_TYPE)
            localStorage.setItem(AUTH_TYPE, type)
        },
        setToken(state, token) {
            localStorage.removeItem(TOKEN_KEY)
            localStorage.setItem(TOKEN_KEY, token)
        },
        setName(state, name) {
            localStorage.removeItem(NAME_KEY)
            localStorage.setItem(NAME_KEY, name)
        },
        setUsername(state, username) {
            localStorage.removeItem(USERNAME_KEY)
            localStorage.setItem(USERNAME_KEY, username)
        },
        setAuthority(state, authorities) {
            localStorage.removeItem(AUTHORITIES_KEY)
            localStorage.setItem(AUTHORITIES_KEY, JSON.stringify(authorities))
        },
        signOut() {
            localStorage.clear()
        }
    },
    actions: {
        userSignIn({ commit }, credentials) {
            return new Promise((resolve, reject) => {
                const data = {
                    username: credentials.username,
                    password: credentials.password
                }
                commit('setLoading', true)
                this._vm.$axios
                    .post('/auth/signin', data)
                    .then(response => {
                        commit('setAuth', true)
                        commit('setTypeAuth', response.data.type)
                        commit('setToken', response.data.token)
                        commit('setName', response.data.firstName)
                        commit('setUsername', response.data.username)
                        commit('setAuthority', response.data.role)
                        commit('setError', null)
                        commit('setLoading', false)

                        this._vm.$axios.defaults.headers.common['Authorization'] = this.getters["AuthModule/getTypeAuth"] + ' ' + this.getters["AuthModule/getToken"]
                        resolve(response);
                    })
                    .catch(error => {
                        commit('setError', error.message)
                        commit('setLoading', false)
                        reject(error);
                    })
            })
        },
        userSignUp({ commit }, formData) {
            return new Promise((resolve, reject) => {
                const data = {
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                    phone: formData.phone,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    middleName: formData.middleName,
                    companyName: formData.companyName,
                    noMiddleName: formData.noMiddleName,
                    entity: formData.entity,
                    code: formData.code
                }

                commit('setLoading', true)
                this._vm.$axios
                    .post('/auth/signup', data)
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
            })
        },
        userSignOut({ commit }) {
            commit('signOut')
            commit('setAuth', false)
            delete this._vm.$axios.defaults.headers.common['Authorization']
            router.push('/login')
        },
        userInfo({ commit }, login) {
            return new Promise((resolve, reject) => {
                commit('setLoading', true)
                this._vm.$axios.get(`/users/${login}`)
                    .then((response) => {
                        commit('setCurrentUser', response.data)
                        commit('setError', null)
                        commit('setLoading', false)
                        resolve(response)
                    })
                    .catch((error) => {
                        commit('setCurrentUser', null)
                        commit('setError', error.message)
                        commit('setLoading', false)
                        reject()
                    })
            })
        },
        userUpdate({ commit }, formData) {
            return new Promise((resolve, reject) => {
                const data = {
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                    phone: formData.phone,
                    firstName: formData.firstName,
                    lastName: formData.lastName,
                    middleName: formData.middleName,
                    companyName: formData.companyName,
                    noMiddleName: formData.noMiddleName,
                    entity: formData.entity,
                    inn: formData.inn,
                    kpp: formData.kpp,
                    ogrn: formData.ogrn
                }

                commit('setLoading', true)
                this._vm.$axios
                    .put('/users/' + formData.id, data)
                    .then(response => {
                        commit('setName', response.data.firstName)
                        commit('setUsername', response.data.username)

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
        }
    }
}