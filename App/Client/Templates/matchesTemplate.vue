<template>
  <div v-if='$store.state.matches'>
    people like you
  </div>

  <div v-else>
    nobody likes you
  </div>

</template>