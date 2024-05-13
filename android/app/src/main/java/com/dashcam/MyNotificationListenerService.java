package com.dashcam;

import android.content.ComponentName;
import android.content.Context;
import android.media.MediaMetadata;
import android.media.session.MediaController;
import android.media.session.MediaSessionManager;
import android.media.session.PlaybackState;
import android.service.notification.NotificationListenerService;
import android.util.Log;
import android.widget.Toast;

import java.util.Collections;
import java.util.List;
import java.util.Objects;

public class MyNotificationListenerService extends NotificationListenerService {

    private static final String TAG = "MyNotificationListener";

    @Override
    public void onCreate() {
        super.onCreate();
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "Notification Listener Service destroyed");
    }

    public static void playPauseCommand(Context context) {
        MediaController mediaController = getMediaController(context);
        if (mediaController != null) {
            if(mediaController.getPlaybackState()!=null && mediaController.getPlaybackState().getState() == PlaybackState.STATE_PLAYING) {
                mediaController.getTransportControls().pause();
            } else {
                mediaController.getTransportControls().play();
            }
        }
    }

    public static void nextCommand(Context context) {
        MediaController mediaController = getMediaController(context);
        if (mediaController != null) {
            mediaController.getTransportControls().skipToNext();
        }
    }

    public static void prevCommand(Context context) {
        MediaController mediaController = getMediaController(context);
        if (mediaController != null) {
            mediaController.getTransportControls().skipToPrevious();
        }
    }

    public static PlaybackState getPlaybackState(Context context) {
        MediaController mediaController = getMediaController(context);
        if (mediaController != null && mediaController.getPlaybackState()!=null) {
            return mediaController.getPlaybackState();
        }
        return null;
    }

    public static String getTrackName(Context context) {
        MediaController mediaController = getMediaController(context);
        if (mediaController != null && mediaController.getMetadata() != null) {
            CharSequence trackName = mediaController.getMetadata().getText(MediaMetadata.METADATA_KEY_TITLE);
            return trackName != null ? trackName.toString() : "";
        }
        return "";
    }

    private static MediaController getMediaController(Context context) {
        List<MediaController> mediaControllers = getActiveMediaControllers(context);
        for (MediaController controller : mediaControllers) {
            Log.d(TAG, "Found media controller!" + controller.getPackageName());
            Toast.makeText(context, controller.getPackageName(), Toast.LENGTH_SHORT).show();
        }
        if( mediaControllers.isEmpty()) {
            Log.d(TAG, "Did not find any media controller :(");
            Toast.makeText(context, "Did not find any media controller :(", Toast.LENGTH_SHORT).show();
        }
        return mediaControllers.isEmpty() ? null : mediaControllers.get(0);
    }

    private static List<MediaController> getActiveMediaControllers(Context context) {
        try {
            Objects.requireNonNull(context, "Context cannot be null");

            MediaSessionManager mediaSessionManager = (MediaSessionManager) context.getSystemService(Context.MEDIA_SESSION_SERVICE);
            if (mediaSessionManager == null) {
                return Collections.emptyList();
            }

            return mediaSessionManager.getActiveSessions(new ComponentName(context, NotificationListenerService.class));
        } catch (Exception e) {
            Toast.makeText(context, e.getMessage() + e, Toast.LENGTH_SHORT).show();
        }

        return Collections.emptyList();
    }
}
