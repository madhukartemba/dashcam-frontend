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
        AudioManager audioManager = (AudioManager) getReactApplicationContext().getSystemService(Context.AUDIO_SERVICE);
        if (audioManager != null) {
            long eventTime = SystemClock.uptimeMillis();
            KeyEvent downEvent = new KeyEvent(eventTime, eventTime, KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_MEDIA_PLAY_PAUSE, 0);
            KeyEvent upEvent = new KeyEvent(eventTime, eventTime, KeyEvent.ACTION_UP, KeyEvent.KEYCODE_MEDIA_PLAY_PAUSE, 0);
            audioManager.dispatchMediaKeyEvent(downEvent);
            audioManager.dispatchMediaKeyEvent(upEvent);
        }
    }


    @ReactMethod
    public void skipToNextTrack() {
        AudioManager audioManager = (AudioManager) getReactApplicationContext().getSystemService(Context.AUDIO_SERVICE);
        if (audioManager != null) {
            audioManager.dispatchMediaKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_MEDIA_NEXT));
            audioManager.dispatchMediaKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_MEDIA_NEXT));
        }
    }

    @ReactMethod
    public void skipToPreviousTrack() {
        AudioManager audioManager = (AudioManager) getReactApplicationContext().getSystemService(Context.AUDIO_SERVICE);
        if (audioManager != null) {
            audioManager.dispatchMediaKeyEvent(new KeyEvent(KeyEvent.ACTION_DOWN, KeyEvent.KEYCODE_MEDIA_PREVIOUS));
            audioManager.dispatchMediaKeyEvent(new KeyEvent(KeyEvent.ACTION_UP, KeyEvent.KEYCODE_MEDIA_PREVIOUS));
        }
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
