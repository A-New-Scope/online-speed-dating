import temp from '../Templates/matchesTemplate.vue';

var matches = {
  template: temp.template,
  //method that makes post request to '/matches' then saves response in store's matches
  methods: {
    getMatches: function($http){
      this.$http.post('/api/matches', this.$store.state.user.username).then(function(respose){
        //store response
        this.$store.commit('setMatches', response);
      })
    }
  }
};

export default matches;