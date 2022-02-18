import $ from 'jquery';
import './index.css';
import './demo';
import Vue from 'vue';
import App from './views/App.vue';


const vm = new Vue({
    el:"#app",
    render:h=>h(App),
})