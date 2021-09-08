const state = {
    error: null,
    loading: false,
    authenticated: localStorage.getItem('AuthState') === 'true'
};

export default state;