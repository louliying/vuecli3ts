<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script lang='ts'>
    import { Component, Prop, Vue } from 'vue-property-decorator';
    @Component
    export default class App extends Vue {
        created () {
            console.log('process.env.VUE_APP_PRE 1---------1:', process.env.VUE_APP_PRE)
        }
    }
</script>

<style>
    @import './assets/css/base.css';
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #595959;
    }
</style>
