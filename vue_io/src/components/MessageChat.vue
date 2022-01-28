<template>
  <div class="hello" v-bind:id=[num]>
    <div class="columns is-mobile">
      <!-- <div class="column is-4 is-offset-2"> -->
          <!-- v-bind:class="{ 'is-offset-6': isOffset}" -->
      <div
        class="column is-4"
      
        v-bind:class="[isUser ? 'is-offset-2' : 'is-offset-6']"
      >

        <article
        class="message"
      
        v-bind:class="[isUser ? 'is-primary' : 'is-link']"
        >
          <div class="message-header">

            <p v-if="isUser">Você</p>
            <p v-else>Contato</p>
            <p>{{ ts }}</p>
          </div>
          <div class="message-body">{{ msg }}</div>
        </article>
      </div>
    </div>
    <span class="hello-end"></span>
  </div>
</template>

<script>
export default {
  name: "MessageChat",
  props: {
    isUser: Boolean,
    msg: String,
    ts: String,
    num: Number
  },
  methods: {
    scrollToEnd: function () {
      var objDiv = document.getElementById("chat");
      objDiv.scrollTop = objDiv.scrollHeight - 200;
    },
  },
  mounted() {
    this.scrollToEnd();
  },
};
</script>

<style>
</style>

