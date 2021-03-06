const app = new Vue({
    el: '#app',
    data: {
     title: 'Chat Team Hamilton-Murphy',
     name: '',
     text: '',
     messages: [],
     connectedClients: 0,
     optionButtons: [],
     socket: null
    },
    methods: {
     sendMessage() {
      if(this.validateInput()) {
       const message = {
       name: this.name,
       text: this.text
      }
      this.socket.emit('message', message)
      this.text = ''
     }
    },
    receivedMessage(message) {
     this.messages.push(message)
    },
    validateInput() {
     return this.name.length > 0 && this.text.length > 0
    }
   },
    created() {
     this.socket = io('https://hamilton-murphy-chat.herokuapp.com/websocket/co', { extraHeaders:{ key:'hm2021'}, query:{testQuery1:'test-query-param'} })
    //  this.socket = io('http://localhost:3000/websocket/co',{ extraHeaders:{ key:'hm2021'}, query:{testQuery1:'test-query-param'} });
     this.socket.on('chat', (message) => {
      this.receivedMessage(message)
     });
     this.socket.on('connected-clients', (message) =>{
        this.connectedClients = message.q;
     });
     this.socket.on('option-buttons', (options) => {
      this.optionButtons = [];
      this.optionButtons = options;
     })
    }
   })