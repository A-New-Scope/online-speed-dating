<template>

  <div v-if='$store.state.matches.length'>
    <h1>people like you</h1>
    <div v-for="item in $store.state.matches">
      {{ item }}
    </div>
  </div>

  <div v-else>
    <h1>nobody likes you</h1>
  </div>

</template>