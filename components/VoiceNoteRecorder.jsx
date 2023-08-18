// import React, { useState } from 'react';
// import { View, Button } from 'react-native';
// import {
//   AudioEncoderAndroidType,
//   AudioSourceAndroidType,
//   AVModeIOSOption,
//   AVEncoderAudioQualityIOSType,
//   AVEncodingOption,
// } from 'react-native-audio-recorder-player';
// import RNFS from 'react-native-fs';
// import SoundPlayer from 'react-native-sound-player';

// const VoiceNoteRecorder = () => {
//   const [isRecording, setIsRecording] = useState(false);
//   const [audioPath, setAudioPath] = useState('');
//   const [isPlaying, setIsPlaying] = useState(false);

//   const generateAudioName = () => {
//     // Implement your unique audio name generation logic here
//     return `audio_${new Date().getTime()}`;
//   };

//   const startRecording = async () => {
//     const path = `${RNFS.DocumentDirectoryPath}/${generateAudioName()}.aac`;
    
//     const audioSet = {
//       AudioEncoderAndroid: AudioEncoderAndroidType.AAC,
//       AudioSourceAndroid: AudioSourceAndroidType.MIC,
//       AVModeIOS: AVModeIOSOption.measurement,
//       AVEncoderAudioQualityKeyIOS: AVEncoderAudioQualityIOSType.high,
//       AVNumberOfChannelsKeyIOS: 2,
//       AVFormatIDKeyIOS: AVEncodingOption.aac,
//     };
    
//     const meteringEnabled = false;

//     try {
//       await RNFS.unlink(path); // Delete previous recording if exists
//       await audioRecorderPlayer?.current?.startRecorder(path, audioSet, meteringEnabled);
//       setIsRecording(true);
//       setAudioPath(path);
//     } catch (error) {
//       console.log('Uh-oh! Failed to start recording:', error);
//     }
//   };

//   const stopRecording = async () => {
//     try {
//       const result = await audioRecorderPlayer?.current?.stopRecorder();
//       setIsRecording(false);
//     } catch (error) {
//       console.log('Oops! Failed to stop recording:', error);
//     }
//   };

//   const playRecording = async () => {
//     try {
//       await SoundPlayer.playUrl(`file://${audioPath}`);
//       setIsPlaying(true);
//     } catch (error) {
//       console.log('Oops! Failed to play recording:', error);
//     }
//   };

//   const stopPlayback = async () => {
//     try {
//       await SoundPlayer.stop();
//       setIsPlaying(false);
//     } catch (error) {
//       console.log('Oops! Failed to stop playback:', error);
//     }
//   };

//   return (
//     <View>
//       <Button title={isRecording ? 'Stop Recording' : 'Start Recording'} onPress={isRecording ? stopRecording : startRecording} />
//       <Button title={isPlaying ? 'Stop Playback' : 'Play Recording'} onPress={isPlaying ? stopPlayback : playRecording} />
//     </View>
//   );
// };

// export default VoiceNoteRecorder;
