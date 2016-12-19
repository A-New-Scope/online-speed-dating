<template>
<div class="messageContainer">
    <div class="message">
    <img class="background" :src="background" alt="backgroundImage">

        {{ msg }}
    </div>
    <signup v-if='!this.$store.state.user.username'></signup>
    <aboutus></aboutus>
    <techstack></techstack>
</div>
</template>
