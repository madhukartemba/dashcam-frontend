import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, Image, Alert} from 'react-native';
import {useSelector} from 'react-redux';

interface Video {
  videoName: string;
}

export const Dashcam = () => {
  const currentUrl = useSelector((state: any) => state.urlReducer);

  const [videos, setVideos] = useState<Video[]>([]);

  useEffect(() => {
    fetchVideos();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchVideos = async () => {
    try {
      const response = await fetch(`${currentUrl}/videos`);
      const videoNames: string[] = await response.json();

      setVideos(
        videoNames.map(x => {
          return {
            videoName: x,
          };
        }),
      );
    } catch (error) {
      console.error('Error fetching videos:', error);
      Alert.alert('Error', 'Failed to fetch videos');
    }
  };

  // const downloadVideo = async (videoName: string) => {
  //   try {
  //     const url = `${currentUrl}/videos/${videoName}`;
  //     // Use a library like react-native-fs to handle file downloads
  //     // Example: https://github.com/itinance/react-native-fs#downloadfileoptions
  //     // Download the video using the url
  //   } catch (error) {
  //     console.error('Error downloading video:', error);
  //     Alert.alert('Error', 'Failed to download video');
  //   }
  // };

  const renderItem = ({item}: {item: Video}) => (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
      }}>
      {
        <Image
          source={{uri: `${currentUrl}/videos/${item.videoName}/thumbnail`}}
          style={{width: 300, height: 300, marginRight: 10}}
        />
      }
      {/* <Text>{item.videoName}</Text> */}
      {/* <Button title="Download" onPress={() => downloadVideo(item.videoName)} /> */}
    </View>
  );

  return (
    <FlatList
      data={videos}
      renderItem={renderItem}
      keyExtractor={item => item.videoName}
      ListEmptyComponent={<Text>No videos found</Text>}
    />
  );
};
