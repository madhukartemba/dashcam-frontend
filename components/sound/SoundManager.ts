import Sound from 'react-native-sound';

Sound.setCategory('Playback', true);

const startup = new Sound('startup.mp3', Sound.MAIN_BUNDLE);
const red = new Sound('red.mp3', Sound.MAIN_BUNDLE);
const green = new Sound('green.mp3', Sound.MAIN_BUNDLE);
const yellow = new Sound('yellow.mp3', Sound.MAIN_BUNDLE);
const error = new Sound('error.mp3', Sound.MAIN_BUNDLE);

const SoundManager = {
  playStartupSound: () => {
    startup.play();
  },

  playRedSound: () => {
    red.play();
  },

  playGreenSound: () => {
    green.play();
  },

  playYellowSound: () => {
    yellow.play();
  },

  playErrorSound: () => {
    error.play();
  },
};

export default SoundManager;
