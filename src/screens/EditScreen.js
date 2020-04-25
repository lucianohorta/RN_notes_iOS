import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';
import { Context } from '../context/NotepadContext';
import NoteForm from '../components/NoteForm';
import { withNavigation } from 'react-navigation';

const EditScreen = ({ navigation }) => {

    const id = navigation.getParam('id');

    const { state, editNote } = useContext(Context);

    // if it's the note id you want to edit:
    const Nota = state.find(
        Nota => Nota.id === id
    );

    return (
        <NoteForm 
            initialValues={{ title: Nota.title, content: Nota.content }}
            onSubmit={(title, content) => {
                // console.log(title, content);
                 editNote(id, title, content,  () => navigation.pop() );   
                 // ultimo param é a funcao callback de voltar pag. do NotepadContext /\
            }} 
        />
    );
};

const styles = StyleSheet.create({

});

export default withNavigation(EditScreen);