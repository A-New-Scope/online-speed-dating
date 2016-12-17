<template>

  <div v-if='$store.state.matches'>
    <h1>people like you</h1>
  </div>

  <div v-else>
    <h1>nobody likes you</h1>
  </div>

</template>