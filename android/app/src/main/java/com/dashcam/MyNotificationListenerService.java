package com.dashcam;

import android.app.Notification;
import android.media.MediaMetadata;
import android.media.session.MediaController;
import android.media.session.MediaSession;
import android.service.notification.NotificationListenerService;
import android.service.notification.StatusBarNotification;
import android.util.Log;

public class MyNotificationListenerService extends NotificationListenerService {

    private static final String TAG = "MyNotificationListener";

    public static MediaController mediaController;

    @Override
    public void onCreate() {
        super.onCreate();
        Log.d(TAG, "Notification Listener Service created");
    }

    @Override
    public void onDestroy() {
        super.onDestroy();
        Log.d(TAG, "Notification Listener Service destroyed");
    }

    @Override
    public void onNotificationPosted(StatusBarNotification sbn) {
        Log.d(TAG, "Notification posted: " + sbn.toString());
        MediaSession.Token token = (MediaSession.Token) sbn.getNotification().extras
                .get(Notification.EXTRA_MEDIA_SESSION);
        if (token != null) {
            mediaController = new MediaController(getApplicationContext(), token);
            if (mediaController.getMetadata() != null) {
                Log.d(TAG, mediaController.getMetadata().getString(MediaMetadata.METADATA_KEY_TITLE));
            }
            Log.d(TAG, "MediaController created");
        }
    }

    @Override
    public void onNotificationRemoved(StatusBarNotification sbn) {
        Log.d(TAG, "Notification removed: " + sbn.toString());
        // Handle notification removal
    }
}
