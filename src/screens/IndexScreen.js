import React, {useContext} from 'react';
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
import Footer from './../components/Footer';

const IndexScreen = ({ navigation }) => {  

  const { state, deleteNote } = useContext(Context);

  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;

  return (
    <View style={{flex: 1, flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', alignContent: 'flex-start', height: height}}>

    {/* HEADER */}
        <View>
            <Header
                image
                left={<View style={{marginLeft: 33,}}></View>}
                center={<Text style={styles.headerTitle}>Notas</Text>} 
                right={<View style={{marginRight: 33,}}></View>}
            />
        </View>

    {/* CONTENT */}
    <ImageBackground style={styles.headerBgImg} resizeMode="repeat" source={require('./../img/background.jpg')}>
        <View style={{flex: 1}}>

            <SwipeListView style={{paddingLeft: 20, width: width}}
              data={state} 
              keyExtractor={(Note) => Note.content}    
              onRowDidOpen={onRowDidOpen}
              onRowDidClose={onRowDidClose}
              renderItem={({item}) => {
                return (
                  <TouchableHighlight style={styles.rowFront} onPress={() => navigation.navigate('Show', { id: item.id })}>
                    <ImageBackground style={styles.headerBgImg} resizeMode="repeat" source={require('./../img/background.jpg')}>
                      <View style={styles.row}>
                          <Text numberOfLines={1} style={styles.noteContent}> 
                            {item.content} 
                            {/* - {item.id} */} 
                          </Text>
                          {/* <Ionicons name="ios-arrow-forward" style={styles.icon} /> */}
                      </View>
                    </ImageBackground>  
                  </TouchableHighlight>

                
                );
              }}
              renderHiddenItem={ ({item}, data, rowMap) => (
                <View style={styles.rowBack}>
                  <TouchableOpacity
                      style={styles.backRightBtnRight}
                      onPress={() => deleteNote(item.id)}
                  >
                      <Text style={styles.backTextWhite}>Deletar</Text>
                  </TouchableOpacity>
                </View>
              )}
              rightOpenValue={-85}
            />

        </View>
      </ImageBackground>


    {/* FOOTER */}
    <View>
            <Footer
                image
                left={<View style={{marginLeft: 33,}}></View>}
                center={<Text style={styles.footerCount}> 
                    {  state.length >= 1 ?   
                       state.length == 1 ?   <Text>{state.length} Nota </Text>   :   <Text>{state.length} Notas </Text>  
                    : 
                    <Text> Sem notas </Text>   }

                </Text>} 
                right={
                  <View style={{justifyContent: 'center', marginRight: 15, paddingTop: 10 }}>
                      <TouchableOpacity onPress = {() => navigation.navigate('Create')}>
                          <Image source = {require('./../img/create-icon.jpg')} style={{width: 31, height: 31}} />
                      </TouchableOpacity>
                  </View>  
                }
            />
        </View>

    </View>        
  );
}; 

IndexScreen.navigationOptions = ({ navigation }) => {
  return {
    headerShown: false,
  };
};

const onRowDidClose = () => {
  console.log('This row has close');
};

const onRowDidOpen = rowKey => {
  console.log('This row has slided', rowKey);
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 0,
    // borderTopWidth: 0,
    // borderBottomWidth: 0,
    // borderColor: '#e2e2e2',
    backgroundColor: 'transparent',  // row(note) color
  },
  headerTitle: {
    fontSize: 21, 
    fontFamily: 'SFSemiBold', 
    color: '#353535',
    paddingTop: 10
  },
  footerCount: {
    fontSize: 15, 
    fontFamily: 'SFSemiBold', 
    color: '#353535',
    paddingTop: 12
  },
  noteContent: {
    fontSize: 18,
    color:"#494949",
    fontFamily: 'SFPro', 
    marginRight: 40
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
      backgroundColor: 'transparent',    // each note slided row background color
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 15,
      zIndex: -1,
  },
  rowFront: {
    backgroundColor: '#f2f2f2',
    flex: 1,
    alignItems: 'flex-start',
  },
  backRightBtnRight: {
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      width: 85,
      backgroundColor: 'red',
      // backgroundColor: {onRowDidOpen} == true ? 'transparent' : 'red',
  },
  headerBgImg: {
    flex: 1,
  }
});

export default IndexScreen;