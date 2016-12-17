import temp from '../Templates/profileLinkTemplate.vue';
import {mapState} from 'vuex';

const profileLink = {
  name: 'profileLink',
  template: temp.template,
  data () {
    return {
    };
  },

  computed: {
    username () {
      console.log('this.$store.state.user.username is ', this.$store.state.user.username);
      return this.$store.state.user.username;
    }
  },

  methods: {
    goToMyProfile: function() {
      this.$router.push('/myprofile/' + this.username);
    },

    editProfile: function() {
      this.$router.push('/myprofile/' + this.username + '/edit');
    },

    goToProfile: function() {
      this.$router.push('/profile/' + this.username);
    },

    goToEvents: function() {
      this.$router.push('/events');
    },

    goToMatches: function() {
      this.$router.push('/matches');
    },

    logout: function() {
      this.$router.push('/');
      this.$store.commit('clearState');
      this.$http.get('/auth/logout')
      .then(()=>{

        console.log('logged out');
      });
    }
  },
};

export default profileLink;