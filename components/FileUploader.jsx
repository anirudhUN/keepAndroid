import React, { useState, useCallback } from 'react';
import { StyleSheet, ScrollView, View, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import Icon from 'react-native-vector-icons/EvilIcons';

const FileUploader = () => {
  const [fileResponse, setFileResponse] = useState([]);

  const handleDocumentSelection = useCallback(async () => {
    try {
      const response = await DocumentPicker.pick({
        type: [DocumentPicker.types.images],
        presentationStyle: 'fullScreen',
        allowMultiSelection: true,
      });
      setFileResponse((prevResponse) => [...prevResponse, ...response]);
    } catch (err) {
      console.warn(err);
    }
  }, []);

  return (
    <View>
      <Icon
        name="image"
        style={styles.icon}
        onPress={handleDocumentSelection}
        color="white"
        size={40}
      />
      <ScrollView>
        {fileResponse.map((file, index) => (
          <View key={index.toString()}>
            <Image source={{ uri: file?.uri }} style={styles.image} />
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: 200,
    height: 200,
    resizeMode: 'cover',
    margin: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
  },
  icon: {
    margin: 10,
  },
});

export default FileUploader;
