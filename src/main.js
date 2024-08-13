import { createApp } from "vue";
import App from "./App.vue";
import "bootstrap/dist/js/bootstrap.bundle";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import "./assets/css/main.css";
import $vocabs from "./models/vocabs";

const app = createApp(App);

app.provide("$vocabs", $vocabs);

app.mount("#app");
