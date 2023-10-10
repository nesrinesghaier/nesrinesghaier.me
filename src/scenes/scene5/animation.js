import sceneSvg from './scene.svg';
import sceneHtml from './scene.html';
import * as utils from '../../site/utilities';

export default {
  iskey: 0,
  keyfreq: Math.floor(Math.random() * 2) + 4,
  lightfreq: Math.floor(Math.random() * 21) + 10,
  lightlast: 'none',
  islight: 0,
  mousefreq: Math.floor(Math.random() * 21) + 30,
  ismouse: 0,
  mouselast: 0,
  minY: 3600,
  maxY: 5800,
  newq: [0, 0],

  init(site) {
    document.querySelector('[data-scene="scene5"]').innerHTML = sceneHtml;
    document.querySelector('[data-scene="scene5"] .svg').innerHTML = sceneSvg;
    document.querySelector('#cv').addEventListener('click', () => {
      window.open(
        'https://pdfhost.io/v/cI0DWkK7A_Nesrine_SGHAIER_CV.pdf',
        '_blank',
      );
    });
    document.querySelector('#sfaxcpc').addEventListener('click', () => {
      window.open(
        'https://pdfhost.io/v/bKzzXvm6H_Third_PlaceContestant362826pdf.pdf',
        '_blank',
      );
    });
    document.querySelector('#googlejam').addEventListener('click', () => {
      window.open('https://pdfhost.io/v/boyn7TLLP_gj2019pdf.pdf', '_blank');
    });
    document.querySelector('#vneuron').addEventListener('click', () => {
      window.open('https://www.vneuron.com/', '_blank');
    });
    document.querySelector('#sofia').addEventListener('click', () => {
      window.open(
        'https://www.linkedin.com/company/sofia-technologies-tunisia/',
        '_blank',
      );
    });
    document.querySelector('#eonics').addEventListener('click', () => {
      window.open('https://eonics.nl/', '_blank');
    });
    document.querySelector('#rabobank').addEventListener('click', () => {
      window.open('https://www.rabobank.nl/', '_blank');
    });
    document.querySelector('#ah').addEventListener('click', () => {
      window.open('https://www.ah.nl/', '_blank');
    });
    document.querySelector('#makerlab').addEventListener('click', () => {
      window.open('https://www.makerlab.tn/', '_blank');
    });
    this.addVideoPlayer(site);

    this.getPhoneDimensionsInAHackyWayCauseFirefoxDoesNotWork();
  },

  getPhoneDimensionsInAHackyWayCauseFirefoxDoesNotWork() {
    const rectt = document.querySelector('#iphone5positionpath');
    const newrect = rectt.cloneNode(true);
    newrect.setAttribute('id', 'dear_firefox_come_on');
    newrect.setAttribute('fill', 'transparent');
    newrect.setAttribute(
      'transform',
      'rotate(90) translate(-6930, -530) scale(8)',
    );

    //  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    // document.body.appendChild(svg);

    const svg = document.querySelector('#svg5');

    svg.appendChild(newrect);
  },

  addVideoPlayer(site) {
    const videoPlayerDiv = utils.createElementWithAttrs('div', {
      id: 'videoPlayer',
    });

    const videoPlayerIframe = utils.createElementWithAttrs('iframe', {
      id: 'vimeoPlayer',
      src: 'https://spark.adobe.com/video/YRfrWT5QdMipi/embed',
      width: '100%',
      height: '100%',
      frameborder: '0',
      allowfullscreen: true,
    });
    videoPlayerDiv.appendChild(videoPlayerIframe);
    site.siteRoot.appendChild(videoPlayerDiv);
  },

  render(data) {
    if (data.curTop > 5550 && data.curTop < 5900) {
      // console.log('resizing');

      const rect = document
        .querySelector('#dear_firefox_come_on')
        .getBoundingClientRect();

      const videoPlayerIframe = document.querySelector('#videoPlayer');
      videoPlayerIframe.style.left = `${Math.floor(rect.left)}px`;
      videoPlayerIframe.style.top = `${Math.floor(rect.top)}px`;
      videoPlayerIframe.style.width = `${Math.floor(rect.width)}px`;
      videoPlayerIframe.style.height = `${Math.floor(rect.height)}px`;
    }

    if (data.curTop > this.minY && data.curTop < this.maxY) {
      if (
        (data.curTop - this.iskey > this.keyfreq
          && data.direction === 'down')
        || (this.iskey - data.curTop > this.keyfreq && data.direction === 'up')
      ) {
        const keys1 = document.querySelectorAll('#keyboard rect');
        const keys2 = document.querySelectorAll('#keyboard2 rect');
        const keys3 = document.querySelectorAll('#keyboard3 rect');

        const randomKey1 = Math.floor(Math.random() * keys1.length);
        const randomKey2 = Math.floor(Math.random() * keys2.length);
        const randomKey3 = Math.floor(Math.random() * keys3.length);

        keys1[randomKey1].style.fill = '#ccd1d9';
        keys2[randomKey2].style.fill = '#f7f9f8';
        keys3[randomKey3].style.fill = '#f7f9f8';

        this.iskey = data.curTop;
      }

      if (
        (data.curTop - this.islight > this.lightfreq
          && data.direction === 'down')
        || (this.islight - data.curTop > this.lightfreq && data.direction === 'up')
      ) {
        this.lightlast = this.lightlast === 'none' ? 'inline' : 'none';
        document.querySelector('#imaclight').style.display = this.lightlast;
        this.islight = data.curTop;
      }
    }
  },
};
