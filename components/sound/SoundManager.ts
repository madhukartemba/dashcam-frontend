import Sound from 'react-native-sound';

Sound.setCategory('Playback', true);

const SoundManager = {
    startup: new Sound('startup.mp3', Sound.MAIN_BUNDLE),
    red: new Sound('red.mp3', Sound.MAIN_BUNDLE),
    green: new Sound('green.mp3', Sound.MAIN_BUNDLE),
    yellow: new Sound('yellow.mp3', Sound.MAIN_BUNDLE),
    error: new Sound('error.mp3', Sound.MAIN_BUNDLE),


    playStartupSound: () => {
        SoundManager.startup.play();
    },

    playRedSound: () => {
        SoundManager.red.play();
    },

    playGreenSound: () => {
        SoundManager.green.play();
    },

    playYellowSound: () => {
        SoundManager.yellow.play();
    },

    playErrorSound: () => {
        SoundManager.error.play();
    },
};

export default SoundManager;
