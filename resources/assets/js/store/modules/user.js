import api from './../../services/api.service';

const state = {
    user: {id: null, nickInput: null}
};

const getters = {
    isSet: state =>  {
        return state.user.nickInput  ||state.user.nick;
    },
    user: state => state.user    
};

const mutations = {
    setNick(state, nickInput){
        let newUser = {id: state.user.id, nickInput };
        state.user = newUser;
    },
    setUser(state, user){
        state.user = user;
    }

};

const actions = {

    retrieveUser({ commit  }) {
        console.log('getting user...');
        api.callPOST('/user')
            .then(user => {
                console.log('hyvä toni', user);
                commit('setUser', user);

            });

  
    },
    updateNick({ commit }, event) {
        commit('setNick', event.target.value);
    },

    storeNick({ getters }) {
        const nick = getters.user.nickInput;
        api.callPUT('/user', { nick })
         .then(user => {
             commit('setUser', user);
         })
    }
};


export default {
    state,
    getters,
    mutations,
    actions
};