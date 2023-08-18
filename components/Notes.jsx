import React, { useState, useCallback, useEffect } from 'react';
import { View, TextInput, Text, TouchableOpacity, StyleSheet, ScrollView, Image, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import DocumentPicker from 'react-native-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MasonryList from '@react-native-seoul/masonry-list'
const Notes = () => {
    const [input, setInput] = useState('');
    const [notes, setNotes] = useState([]);
    const [fileResponse, setFileResponse] = useState([]);
    const [isNoteEditing, setIsNoteEditing] = useState(false);
const [editingNoteId, setEditingNoteId] = useState(null);
const [editedNoteText, setEditedNoteText] = useState('');

const handleEditNote = (noteId, noteText) => {
    setEditingNoteId(noteId);
    setEditedNoteText(noteText);
    setIsNoteEditing(true); 
};

    useEffect(() => {
        const fetchNotes = async () => {
            try {
                const savedNotes = await AsyncStorage.getItem('notes');
                if (savedNotes) {
                    setNotes(JSON.parse(savedNotes));
                }
            } catch (error) {
                console.warn('Error retrieving notes:', error);
            }
        };

        fetchNotes();
    }, []);

    const handleSbmit = async () => {
        if (input !== '') {
            const newNote = {
                id: Date.now(),
                text: input,
                images: fileResponse.map((file) => file.uri),
            };
            const updatedNotes = [...notes, newNote];
            setNotes(updatedNotes);
            setInput('');
            setFileResponse([]);

            try {
                await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
            } catch (error) {
                console.warn('Error saving notes:', error);
            }
        }
    };

    const handleNoteDelete = async (noteId) => {
        const updatedNotes = notes.filter((note) => note.id !== noteId);
        setNotes(updatedNotes);
        try {
            await AsyncStorage.setItem('notes', JSON.stringify(updatedNotes));
        } catch (error) {
            console.warn('Error saving notes:', error);
        }
    };

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

        <View style={styles.area}>
            <View style={styles.formContainer}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.inputText}
                        value={input}
                        backgroundColor='#383838'
                        onChangeText={(text) => setInput(text)}
                        placeholder="Take a note..."
                        placeholderTextColor='gray'
                        multiline
                    />
                    {fileResponse.length > 0 && (
                        <Image
                            source={{ uri: fileResponse[0]?.uri }}
                            style={styles.inputImagePreview}
                        />
                    )}
                </View>
                <View >
                    <TouchableOpacity style={styles.submitButton} onPress={handleSbmit}>
                        <Icon name="add-circle-outline" size={20} style={styles.addIcon} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={styles.imageUploadButton}
                        onPress={handleDocumentSelection}
                    >
                        <Icon name="image" size={20} color="white" />
                    </TouchableOpacity>
                </View>
            </View>
            <MasonryList
                style={styles.noteContainer}
                data={notes}
                numColumns={2}
                renderItem={({ item: note }) => (
                    <TouchableOpacity style={styles.note} key={note.id} onPress={() => handleEditNote(note.id, note.text)}>
                        {editingNoteId === note.id && isNoteEditing ? (
                <TextInput
                    style={styles.noteTextInput} 
                    value={editedNoteText}
                    onChangeText={setEditedNoteText}
                    autoFocus
                />
            ) : (
                        <Text style={styles.noteText}>{note.text}</Text>)}
                        {note.images?.map((imageUri, index) => (
                            <Image
                                source={{ uri: imageUri }}
                                style={styles.noteImage}
                                key={index.toString()}
                            />
                        ))}
                        <TouchableOpacity
                            style={styles.deleteButton}
                            onPress={() => handleNoteDelete(note.id)}
                        >
                            <Icon name="delete" color="gray" size={15}/>
                        </TouchableOpacity>
                    </TouchableOpacity>
                )}
                keyExtractor={(item) => item.id.toString()}
            />
        </View>

    );
};

const styles = StyleSheet.create({
    area: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10,

    },
    formContainer: {
        flexDirection: 'row',
        alignItems: 'flex-end',
        width: '95%',
        padding:10
    },
    inputText: {
        flex: 1,
        minHeight: 50,
        maxHeight: 150,
        borderColor: 'rgba(0,0,0,0.2)',
        borderWidth: 1,
        borderRadius: 10,
        padding: 12,
        marginRight: 10,
        color: 'white'
    },
    submitButton: {
        backgroundColor: '#FFB900',
        borderRadius: 50,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    buttonsContainer: {
        flexDirection: 'row',
        width: '100%',
        marginTop: 10,
    },
    inputContainer: {
        position: 'relative',
        flex: 1,
        width: '50%',
    },
    inputImagePreview: {
        position: 'absolute',
        top: 5,
        right: 15,
        width: 100,
        height: 85,
        resizeMode: 'contain',
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center'
    },

    imagePreviewContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 10,
    },
    imagePreview: {
        width: 100,
        height: 100,
        resizeMode: 'cover',
        margin: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 5,
    },
    addIcon: {
        color: 'white',
        backgroundColor:'#FFB900'
    },
    imageUploadButton: {
        backgroundColor: '#FFB900',
        borderRadius: 50,
        padding: 8,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 5
    },
    noteContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap', 
        width: '100%',
    },

    note: {
        borderWidth: 1,
        borderColor: 'rgba(0,0,0,0.2)',
        padding: 15,
        margin: 10,
        justifyContent: 'center',
        backgroundColor: '#383838',
        borderRadius: 10,
        position: 'relative',
        flexShrink: 1, 
    },
    noteImage: {
        width: 150,
        height: 200,
        resizeMode: 'contain',
        marginVertical: 5,
        borderWidth: 1,
        borderRadius: 10,
    },
    noteText: {
        color: 'white'
    },
    deleteButton: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        backgroundColor: 'transparent',
        padding: 0,
    },
    noteTextInput: {
        // backgroundColor: 'white',
        // borderWidth: 1,
        // borderColor: 'gray',
        borderRadius: 5,
        // padding: 5,
        flexWrap: 'wrap'
        }
});

export default Notes;