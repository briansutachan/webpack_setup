import $ from "jquery";
import {API_KEY} from "./config";
import { inputContainer, formContainer, mapContainer } from "./components";

let script = document.createElement("script"); //This is how create element with JS
script.id = "google_api"; 
script.async = true;
script.defer = true;
script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=places`;


document.getElementsByTagName("head")[0].appendChild(script);

script.addEventListener("load", function (e) {
    insertComponents();
}, false);

function insertComponents(){
    $("#root").append([inputContainer(), formContainer(), mapContainer()]);
};