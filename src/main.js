import { createApp } from 'vue'
import App from './App.vue'
import store from "./store";
import router from './router'
import proxyConfig from "./proxies/_config";

import VueSweetalert2 from 'vue-sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

import { library } from "@fortawesome/fontawesome-svg-core";
import { faTimes, faCheck, faSignOutAlt, faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

library.add(faTimes);
library.add(faCheck);
library.add(faSignOutAlt);
library.add(faEdit);
library.add(faTrash);

const app = createApp(App);

app.use(
    {
        install: (app, options) => {
            app.config.globalProperties.$proxies = proxyConfig;

        }
    }
);

app.use(
    {
        install: (app, options) => {

            function initializate() {
                const token = localStorage.getItem("access_token").split(".");
                const payload = JSON.parse(
                    decodeURIComponent(
                        atob(token[1])
                            .split("")
                            .map(function (c) {
                                return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                            })
                            .join("")
                    )
                );

                store.dispatch('setUserAction', {
                    id: payload.nameid,
                    name: payload.email.split('@')[0],
                    email: payload.email,
                    roles: payload.role
                  });

            }

            app.config.globalProperties.$user = {
                initializate
            };

        }
    }
);

app.use(VueSweetalert2);
app.use(store);
app.use(router);
app.component("font-awesome-icon", FontAwesomeIcon);
app.mount('#app')
