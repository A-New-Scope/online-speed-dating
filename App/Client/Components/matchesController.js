import temp from '../Templates/matchesTemplate.vue';

var matches = {
  template: temp.template,
  //method that makes post request to '/matches' then saves response in store's matches
  methods: {
    getMatches: function($http){
      this.$http.post('/api/matches', {
        sessionUser: this.$store.state.user.username
      }).then(function(response){
        console.log('HERE ARE YOUR MATCHES', response.body)
        this.$store.commit('setMatches', response.body);
      })
    },

    // likeCallee: function($http) {
    //   var caller = 'test';//this.$store.state.user.username
    //   var callee = 'doggie';
    //   this.$http.post('/api/likes', {
    //     sessionUser: caller,
    //     likedUser: callee
    //   });
    // }
  },

  mounted: function(){
    console.log("GETTING YOUR MATCHES")
    // this.likeCallee()
    this.getMatches()
  }
};

export default matches;