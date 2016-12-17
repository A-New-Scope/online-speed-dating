<template>
 <section id="about" class="container content-section text-center" v-if='!this.$store.state.user.username'>
        <div class="row">
            <h2>About Us</h2>
            <div class="container">
                <div class="row aboutUs">
                    <div class="icons col-md-3"> <img class="img_icons" :src='dan' alt="">
                        <br/> Dan Gidlay </div>
                    <div class="icons col-md-3"> <img class="img_icons" :src='elliott' alt="">
                        <br/> Elliott Birch </div>
                    <div class="icons col-md-3"> <img class="img_icons" :src='eric' alt="">
                        <br/> Eric 'Chris' Lau </div>
                    <div class="icons col-md-3"> <img class="img_icons" :src='wasiff' alt="">
                        <br/> Wasiff Afzal </div>
                </div>
            </div>
        </div>
    </section>

</template>