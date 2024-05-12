package com.dashcam;

import android.content.Context;
import android.media.AudioManager;
import android.media.session.PlaybackState;
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
        MyNotificationListenerService.playPauseCommand(getReactApplicationContext());
    }

    @ReactMethod
    public void skipToNextTrack() {
        MyNotificationListenerService.nextCommand(getReactApplicationContext());
    }

    @ReactMethod
    public void skipToPreviousTrack() {
        MyNotificationListenerService.prevCommand(getReactApplicationContext());
    }

    @ReactMethod
    public void getPlaybackState(Promise promise) {
        AudioManager audioManager = (AudioManager) getReactApplicationContext().getSystemService(Context.AUDIO_SERVICE);
        if (audioManager != null) {
            int playbackState = audioManager.isMusicActive() ? PlaybackState.STATE_PLAYING : PlaybackState.STATE_PAUSED;
            promise.resolve(playbackState);
        } else {
            promise.reject("AUDIO_SERVICE_UNAVAILABLE", "Audio service unavailable");
        }
    }
}
