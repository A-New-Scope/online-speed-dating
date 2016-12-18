<template>
    <div>
        <template v-if='$store.state.beforeEventFlag'>
            <button v-on:click.prevent='signalEventReady'>I'm ready to speed-date!</button>
        </template>
        <template v-else-if='$store.state.activeViewFlag'>
            <transition name='relocate'>
                <video v-if='$store.state.soloViewFlag' v-bind:src='$store.state.myVideoSrc' key='soloView' autoplay='autoplay'></video>
                <video v-else v-bind:src='$store.state.myVideoSrc' key='duoView' autoplay='autoplay'></video>
            </transition>
            <template v-if='$store.state.soloViewFlag'>
                <template v-if='$store.state.beforeStartFlag'>
                    <div>Thanks for coming! The speed-dating bonanza will begin soon!</div>
                </template>
                <template v-else>
                    <template v-if='$store.state.isCallerFlag'>
                        <button v-if='$store.state.calleeReadyFlag' v-on:click.prevent='callCallee'>Start that video-date!</button>
                        <div v-else>Please be patient while your date gets ready!</div>
                    </template>
                    <template v-else>
                        <div v-if='$store.state.calleeReadyFlag'>Your date should be ready any moment! I know I'm excited!</div>
                        <button v-else v-on:click.prevent='signalCalleeReady'>I'm ready for a date!</button>
                    </template>
                </template>
            </template>
            <template v-else>
                <video v-bind:src='$store.state.videoOutSrc' autoplay='autoplay'></video>
                <button v-on:click.prevent="likeCallee"> LIKE </button>
            </template>

        </template>
        <template v-else>
            <div>The event has ended. Thanks for coming!</div>
        </template>
    </div>
</template>
