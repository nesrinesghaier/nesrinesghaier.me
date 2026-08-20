import sceneSvg from "./scene.svg?st-inline";
import sceneHtml from "./scene.html?raw";

export default {
  init() {
    document.querySelector('[data-scene="scene2"]').innerHTML = sceneHtml;
    document.querySelector('[data-scene="scene2"] .svg').innerHTML = sceneSvg;
  },
};
