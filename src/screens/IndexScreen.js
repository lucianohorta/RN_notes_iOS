import React, {useContext, useState} from 'react';
import { 
  StyleSheet, 
  ImageBackground, 
  Dimensions, 
  TouchableHighlight, 
  Image, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView 
} from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { Context } from '../context/NotepadContext';
// import { Context as ImageContext } from '../context/ImageContext';

import { Ionicons } from '@expo/vector-icons';
import Header from './../components/Header';

const IndexScreen = ({ navigation }) => {
  
  const { state, deleteNote } = useContext(Context);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  const onRowDidOpen = rowKey => {
    console.log('This row has slided', rowKey);
  };

  return (
    <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', alignContent: 'flex-start', height: height}}>

    {/* HEADER */}
        <View>
            <Header
                image
                left={<View style={{marginLeft: 33,}}></View>}
                center={<Text style={styles.headerTitle}>Notas</Text>} 
                right={
                  <View style={{justifyContent: 'center', marginRight: 15, paddingTop: 10 }}>
                      <TouchableOpacity onPress = {() => navigation.navigate('Create')}>
                          <Image source = {require('./../img/create-icon.jpg')} style={{width: 31, height: 31}} />
                      </TouchableOpacity>
                  </View>  
                }
            />
        </View>

    {/* CONTENT */}
    <ImageBackground style={styles.headerBgImg} resizeMode="repeat" source={require('./../img/background.jpg')}>
        <View style={{flex: 1}}>

            <SwipeListView style={{paddingLeft: 20, width: width}}
              data={state} 
              keyExtractor={(Note) => Note.title}    
              onRowDidOpen={onRowDidOpen}
              renderItem={({item}) => {
                return (
                  <TouchableHighlight onPress={() => navigation.navigate('Show', { id: item.id })}>
                    {/* <ImageBackground style={styles.headerBgImg} resizeMode="repeat" source={require('./../img/background.jpg')}> */}
                      <View style={styles.row}>
                          <Text style={styles.noteTitle}> 
                            {item.title} 
                            {/* - {item.id} */}
                          </Text>
                          {/* <Ionicons name="ios-arrow-forward" style={styles.icon} /> */}
                      </View>
                    {/* </ImageBackground>   */}
                  </TouchableHighlight>

                
                );
              }}
              renderHiddenItem={ ({item}, data, rowMap) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity
                      style={[styles.backRightBtn, styles.backRightBtnRight]}
                      onPress={() => deleteNote(item.id)}
                  >
                      <Text style={styles.backTextWhite}>Deletar</Text>
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-75}
            />

        </View>
      </ImageBackground>

    </View>        
  );
}; 

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerShown: false,
  };
};



const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 0,
    borderTopWidth: 0,
    borderBottomWidth: 1,
    borderColor: '#e2e2e2', 
    backgroundColor: '#F2F2F2',  // row(note) color
  },
  headerTitle: {
    fontSize: 21, 
    fontFamily: 'SFSemiBold', 
    color: '#353535',
    paddingTop: 10
  },
  noteTitle: {
    fontSize: 18,
    color:"#494949",
    fontFamily: 'SFPro', 
  },
  icon: {
    fontSize: 24,
    color:"#b7b5b5"
  },
  backTextWhite: {
    color: '#FFF',
  },
  rowBack: {
      alignItems: 'center',
      backgroundColor: '#F2F2F2',    // each note background color
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
      borderBottomColor: '#d6d6d6',
      borderBottomWidth: 1,
  },
  backRightBtn: {
      alignItems: 'center',
      bottom: 0,
      justifyContent: 'center',
      position: 'absolute',
      top: 0,
      width: 75,
      backgroundColor: 'red',
  },
  backRightBtnRight: {
      backgroundColor: 'red',
      right: 0,
  },
  headerBgImg: {
    flex: 1,
    // resizeMode: 'repeat',
    // height: 5,
  }
});

export default IndexScreen;