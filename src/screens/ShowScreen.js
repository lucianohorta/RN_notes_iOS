import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Dimensions, ImageBackground } from 'react-native';
import { Context } from '../context/NotepadContext';
import { Ionicons } from '@expo/vector-icons';
import Header from './../components/Header';
import styled from 'styled-components/native';

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

const ShowScreen = ({ navigation }) => {
    // console.log(navigation.getParam('id'));

    const { state } = useContext(Context);

    const Nota = state.find((Nota) => Nota.id === navigation.getParam('id'));

    // const NotaContent = `${Nota.content}`;   // in case of using inside a WebView


    return (
        <View style={{flex: 1}}>
                                    {/* HEADER */}
            <View>
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
                            // this.title.focus(), 
                            navigation.navigate('Edit', {id: navigation.getParam('id') })
                        }>
                            <Text style={styles.editButton}>Editar</Text>
                        </TouchableOpacity>
                    }
                />
            </View>
                                    {/* CONTENT */}
            <View style={{flex: 1, marginTop: height * 0.00}}>
                <TouchableOpacity onPress={() => 
                    navigation.navigate('Edit', {id: navigation.getParam('id') })
                }>

                    <ImageBackground style={styles.headerBgImg} resizeMode="repeat" source={require('./../img/background.jpg')}>
                        <View style={{marginTop: 15, height: height, width: width}}>

                            {/* <Text style={styles.noteTitle}> { Nota.title } </Text>  */}
                            {/* <Text style={styles.noteContent}> { Nota.content}   </Text> */}

                            {/* <StyledNoteTitle> { Nota.title } </StyledNoteTitle> */}
                            <StyledTextContent> { Nota.content} </StyledTextContent>
                                                        
                        </View>
                    </ImageBackground>

                </TouchableOpacity>
            </View>

        </View>
    );
};

ShowScreen.navigationOptions = ({ navigation }) => {
    return {

        headerShown: false,

        // headerTitle: '',   // no header title

        // headerRight: (
        //     <TouchableOpacity onPress={() =>   
        //          navigation.navigate('Edit', {id: navigation.getParam('id') })
        //     }>
        //         {/* <EvilIcons name="pencil" size={35} /> */}
        //         <Text style={styles.editButton}>Editar</Text>
        //     </TouchableOpacity>
        // ),
        // headerLeft: (
        //     <TouchableOpacity style={{flexDirection: 'row'}} onPress={() =>   
        //         navigation.goBack()
        //    }>
        //         <Ionicons name="ios-arrow-back" style={styles.backicon} />
        //         <Text style={styles.showNoteHeaderTitle}>Notes</Text>
        //     </TouchableOpacity>
        // ),
        // headerTitleContainerStyle: {  // define space between title and back arrow
        //     left: 20,
        // },
        // headerTitleAlign: 'left',
        // headerStyle: {
        //     backgroundColor: 'transparent'
        // },
    };
};

const styles = StyleSheet.create({
    headerBgImg: {
        resizeMode: 'repeat',
    },
    backicon: {
        fontSize: 26,
        // fontFamily: 'SFLight', 
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
    // noteTitle: {
    //     lineHeight: 30,
    //     fontSize: 17,
    //     color: '#3a3a3a',
    // },
    // noteContent: {
    //     lineHeight: 30,
    //     color: '#3a3a3a',
    // },
    // webView: {
    //     height: height,
    //     width: width,
    //     flex: 1,
    //     height: height
    // }

});

export default ShowScreen;