import sceneSvg from "./scene.svg?st-inline";
import sceneHtml from "./scene.html?raw";

export default {
  init() {
    document.querySelector('[data-scene="scene3"]').innerHTML = sceneHtml;
    document.querySelector('[data-scene="scene3"] .svg').innerHTML = sceneSvg;
  },
};
