import Sound from 'react-native-sound';

Sound.setCategory('Playback', true);

const SoundManager = {
    startup: new Sound('startup.mp3', Sound.MAIN_BUNDLE),
    red: new Sound('red.mp3', Sound.MAIN_BUNDLE),
    green: new Sound('green.mp3', Sound.MAIN_BUNDLE),
    yellow: new Sound('yellow.mp3', Sound.MAIN_BUNDLE),
    error: new Sound('error.mp3', Sound.MAIN_BUNDLE),

    currentSound: null as Sound | null,

    playStartupSound: () => {
        SoundManager.stopAllSounds();
        SoundManager.currentSound = SoundManager.startup;
        SoundManager.startup.play();
    },

    playRedSound: () => {
        SoundManager.stopAllSounds();
        SoundManager.currentSound = SoundManager.red;
        SoundManager.red.play();
    },

    playGreenSound: () => {
        SoundManager.stopAllSounds();
        SoundManager.currentSound = SoundManager.green;
        SoundManager.green.play();
    },

    playYellowSound: () => {
        SoundManager.stopAllSounds();
        SoundManager.currentSound = SoundManager.yellow;
        SoundManager.yellow.play();
    },

    playErrorSound: () => {
        SoundManager.stopAllSounds();
        SoundManager.currentSound = SoundManager.error;
        SoundManager.error.play();
    },

    stopAllSounds: () => {
        if (SoundManager.currentSound) {
            SoundManager.currentSound.stop();
        }
    },
};

export default SoundManager;
