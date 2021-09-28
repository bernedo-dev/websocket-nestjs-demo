const app = new Vue({
    el: '#app',
    data: {
     title: 'Chat Team Hamilton-Murphy',
     name: '',
     text: '',
     messages: [],
     connectedClients: 0,
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
     this.socket = io('https://hamilton-murphy-chat.herokuapp.com/', { withCredentials: false })
    //  this.socket = io('http://localhost:3000', { withCredentials: false })
     this.socket.on('message', (message) => {
      this.receivedMessage(message)
     });
     this.socket.on('connected-clients', (message) =>{
        this.connectedClients = message.q;
     });
    }
   })