import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/NotepadContext';
import NoteForm from '../components/NoteForm';


const CreateScreen = ({ navigation }) => {
    const { addNote } = useContext(Context);

    return <NoteForm 
        onSubmit={(datecreated, content) => {
            addNote(datecreated, content, () => navigation.navigate('Index') )
                                    // ultimo param é a funcao callback do NotepadContext /\
        }} />;
};

const styles = StyleSheet.create({
    
});


export default CreateScreen;