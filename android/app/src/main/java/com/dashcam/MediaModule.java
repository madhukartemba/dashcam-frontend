package com.dashcam;

import android.content.Context;
import android.media.AudioManager;
import android.media.session.PlaybackState;
import android.os.SystemClock;
import android.util.Log;
import android.view.KeyEvent;

import androidx.annotation.NonNull;

import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;

public class MediaModule extends ReactContextBaseJavaModule {
    MediaModule(ReactApplicationContext context) {
        super(context);
    }

    @NonNull
    @Override
    public String getName() {
        return "MediaModule";
    }

    @ReactMethod
    public void playPauseMedia() {
        if (isMusicPlaying()) {
            MyNotificationListenerService.mediaController.getTransportControls().pause();
        } else {
            MyNotificationListenerService.mediaController.getTransportControls().play();
        }
    }

    @ReactMethod
    public void skipToNextTrack() {
        MyNotificationListenerService.mediaController.getTransportControls().skipToNext();
    }

    @ReactMethod
    public void skipToPreviousTrack() {
        MyNotificationListenerService.mediaController.getTransportControls().skipToPrevious();
    }

    @ReactMethod
    public void getPlaybackState(Promise promise) {
        int playbackState = isMusicPlaying() ? PlaybackState.STATE_PLAYING : PlaybackState.STATE_PAUSED;
        promise.resolve(playbackState);
    }

    public boolean isMusicPlaying() {
        AudioManager audioManager = (AudioManager) getReactApplicationContext().getSystemService(Context.AUDIO_SERVICE);
        return audioManager.isMusicActive();
    }
}
