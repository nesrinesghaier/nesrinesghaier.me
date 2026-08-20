import sceneSvg from "./scene.svg?st-inline";
import sceneHtml from "./scene.html?raw";

export default {
  init() {
    document.querySelector("#menu").innerHTML = sceneHtml;
    document.querySelector("#menu .svg").innerHTML = sceneSvg;
  },
};
