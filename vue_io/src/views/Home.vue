<template>
  <div class="home">
    <div id="chat" class="is-mobile">
      <div v-for="(message, index) in messages" :key="message.id">
        <MessageChat
          :msg="message.msg"
          :isUser="message.isUser"
          :ts="message.ts"
          :num="index + 1"
        />
      </div>
    </div>

    <hr />

    <div class="columns is-mobile is-centered">
      <div class="column is-one-third is-narrow">
        <div class="field">
          <div class="control">
            <input
              class="input"
              type="text"
              placeholder="Nome..."
              v-model="author_form"
            />
          </div>
        </div>
      </div>
      <div class="column is-narrow">
        <div class="field">
          <div class="control">
            <button class="button is-link" @click="enviarSocket">Submit</button>
          </div>
        </div>
      </div>
    </div>

    <div class="columns is-mobile is-centered">
      <div class="column is-three-quarters">
        <div class="field">
          <label class="label">Mensagem</label>
          <div class="control">
            <textarea
              class="textarea"
              placeholder="Mensagem..."
              v-model="message_form"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#chat {
  max-height: 420px;
  min-height: 320px;
  background-color: aliceblue;
  overflow-y: scroll;
  max-width: 100%;
  overflow-x: hidden;
}
</style>

<script>
// @ is an alias to /src
import MessageChat from "@/components/MessageChat.vue";
import io from "socket.io-client";
import { uuid } from 'vue-uuid'; 

export default {
  sockets: {
    connect() {
      this.$socket.client.emit("client_id");
    },
    server_id(data) {
      this.socket_id = data;
      this.session_id = uuid.v4();
      console.log(this.socket_id);
    },
    show_msg(data){
      console.log(data);
      this.messages.push({ msg: data.message_form, 
                           id: uuid.v4(), 
                           ts: data.ts,
                           isUser: data.msg_session_id == this.session_id });

    }
  },
  name: "Home",
  data() {
    return {
      socket: io(),
      socket_id: "",
      session_id: "",
      author_form: "",
      message_form: "",
      messages: [
      ],
    };
  },
  components: {
    MessageChat,
  },
  methods: {
    enviar: function () {
      this.messages.push({ msg: this.message_form, id: 11, isUser: false });
      this.scrollToEnd();
    },
    enviarSocket: function () {
      this.$socket.client.emit("msg", {message_form: this.message_form, 
                                       author_form: this.author_form,
                                       session_id: this.session_id});
    },
    scrollToEnd: function () {
      var objDiv = document.getElementById("chat");
      objDiv.scrollTop = objDiv.scrollHeight - 200;
    },
  }
};
</script>
