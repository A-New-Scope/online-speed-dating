import temp from '../Templates/adminTemplate.vue';
import moment from 'moment';

var admin = {
  template: temp.template,
  data: function () {

    return {
      username: '',
      date: '', 
      eventType: '',
      eventName: ''
    };
  }, 
  computed: {
    allEvents () {
      return this.$store.state.allEvents;
    }
  },

  methods: {
    startEvent(event) {

    },

    setupEvent(event) {
      console.log(event._id);
      this.$http.post('/event/setup', {
        _id: event._id
      })
      .then((res) => { 
        var body = res.body;
        this.$store.commit('setUser', body);
      })
      .catch((err) => console.error(err)); 
    },

    endEvent(event) { 
      this.$store.state.pubnub.publish({
        message: 'End',
        channel: [event._id]
      });
    },

    incrementRound(event) {
      this.$store.state.pubnub.publish({
        message: number,
        channel: [event._id]
      });

    },

    moment: function (date) {
      return moment(date);
    },
    submit () {

      var body = {
        username: this.username,
        date: this.date,
        eventType: this.eventType,
        eventName: this.eventName
      };
      console.log(body);
      let dbUrl = '/api/events';
      this.$http.post(dbUrl, body)
      .then((res) => {
        console.log(res.body);
        this.$store.commit( 'setNewEvent', res.body);
        //clear form fields
        this.username = '',
        this.date = '',
        this.eventType = '', 
        this.eventName = '';

      })
      .catch((err) => {
        console.error('Something went wrong with POST: ', err);
      });
    } 
  },
};


export default admin;

// data () {
//     return {

//     };
//   },

//   methods: {
//     submit ($http) {
//       var body = {
//         username: this.username,
//         date: this.date,
//         eventType: this.eventType,
//         eventName: this.eventName
//       };
//       let dbUrl = '/api/events';
//       this.$http.post(dbUrl, body)
//       .then((res) => {
//         //clear form fields
//         this.username = '',
//         this.date = '',
//         this.eventType = '',
//         this.eventName = '';

//       })
//       .catch((err) => {
//         console.error('Something went wrong with POST: ', err);
//       });
//     },