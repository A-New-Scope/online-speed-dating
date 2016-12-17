<template>
   <section id="techStack" class="content-section text-center" v-if='!this.$store.state.user.username'>
        <div class="container">
            <h2>Tech. Stack</h2>
            <div class="row tech">
                <div id="vue" class="techicons col-md-3"> <img class="icons" :src='vue' style="width:100px" alt=""> Vue.js </div>
                <div id="mongo" class="techicons col-md-3"> <img class="icons" :src='mongo' alt=""> MongoDb </div>
                <div id="express" class="techicons col-md-3"> <img class="icons" :src='express' alt=""> Express.js </div>
                <div class="techicons col-md-3"> <img class="icons" :src='pubnub' alt=""> PubNub </div>
            </div>
        </div>
    </section>
</template>