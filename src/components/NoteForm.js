import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Button, Dimensions, TouchableOpacity, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Header from './../components/Header';
import styled from 'styled-components/native';
import { withNavigation } from 'react-navigation';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const StyledTextContent = styled.Text`
    font-family: 'SFPro';
    color: #565656;  
    line-height: 30px;
    text-align: justify;
    font-size: 19px;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    margin: 0 20px;
`;


const NoteForm = ({ onSubmit, initialValues, navigation }) => {

    // const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View style={{flex: 1}}>

            <View>
                            {/* HEADER */}
                <Header
                    image
                    left={
                        <TouchableOpacity style={{flexDirection: 'row', flex: 1, marginTop: 3}} onPress={() =>   
                            navigation.goBack()
                        }>
                            <Ionicons name="ios-arrow-back" style={styles.backicon} />
                            <Text style={styles.showNoteHeaderTitle}>Notas</Text>
                        </TouchableOpacity>
                    }
                    center={<View></View>}
                    right={
                        <TouchableOpacity style={{marginTop: 10}} onPress={() =>   
                            // navigation.navigate('Edit', {id: navigation.getParam('id') })
                            onSubmit(content)
                        }>
                            <Text style={styles.editButton}>OK</Text>
                        </TouchableOpacity>
                    }
                />
            </View>

                            {/* CONTENT */}

            <View style={{flex: 1, marginTop: height * 0.00}}>
                <TouchableOpacity onPress={() => navigation.navigate('Edit', {id: navigation.getParam('id') })  }>

                    {/* <ImageBackground style={styles.headerBgImg} resizeMode="repeat" source={require('./../img/background.jpg')}> */}
                        <View style={{marginTop: 15, height: height, width: width}}>

							{/* <TextInput style={styles.input} value={title} 
                                onChangeText={(text) => setTitle(text)} 
                            /> */}

                            <TextInput numberOfLines={25} style={styles.input} value={content} multiline={true}
                                onChangeText={(text) => setContent(text)} />

                                                        
                        </View>
                    {/* </ImageBackground> */}

                </TouchableOpacity>
            </View>

        </View>
    );
};

NoteForm.defaultProps = {  // used to fill in default values
    initialValues: {
        // title: '',
        content: '',
    }
};

const styles = StyleSheet.create ({
    input: {
        fontSize: 18,
        borderWidth: 0, 
        fontFamily: 'SFPro',
        color: '#565656',
        lineHeight: 30,
        textAlign: 'justify',
        fontSize: 19,
        marginLeft: 20,
        marginRight: 20,
        // minHeight: 500,
        flexDirection: 'row',
        flexWrap: 'wrap',
        textAlignVertical: "top"
    },
    backicon: {
        fontSize: 26,
        color: "#e4af07",
        textShadowColor:'black',
        textShadowOffset:{width: -.1, height: .1},
        textShadowRadius:.1,
        paddingRight: 8,
        paddingLeft: 10,
        marginTop: .5,
      },
    showNoteHeaderTitle: {
        fontSize: 20, 
        fontFamily: 'SFLight', 
        color: "#e4af07",
        textShadowColor:'black',
        textShadowOffset:{width: -.1, height: .1},
        textShadowRadius:.1,
        letterSpacing: .5,
    },
    editButton: {
        fontSize: 20, 
        fontFamily: 'SFPro', 
        color: "#e4af07",
        textShadowColor:'black',
        textShadowOffset:{width: -.1, height: .1},
        textShadowRadius:.1,
        letterSpacing: .5,
        paddingRight: 10,
        marginTop: -4,
    },
});

export default withNavigation(NoteForm);