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
    <View style={{ flex: 1, flexWrap: 'wrap', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', alignContent: 'flex-start', height: height }}>

      {/* HEADER */}
        <View style={{ borderBottomColor: '#d2d2d2', borderBottomWidth: 1, marginLeft: 22, paddingBottom: 10 }}>
            <Header
                image
                left={<Text style={styles.headerTitle}>Notas</Text>}
                center={<View></View>} 
                right={<View></View>}
                // right={<View style={{marginRight: 33,}}></View>}
            />
        </View>

    {/* CONTENT */}
    <ImageBackground style={styles.headerBgImg} resizeMode="repeat" source={require('./../img/background.jpg')}>
    <View style={{ backgroundColor: 'transparent', flex: 1, marginTop: height * 0.00 }}>

            <SwipeListView style={{ paddingLeft: 20, width: width, borderBottomWidth: 0 }}
              data={state} 
              keyExtractor={(Note) => Note.content}    
              onRowDidOpen={onRowDidOpen}
              onRowDidClose={onRowDidClose}
              renderItem={({item}) => {
                return (
                                                                         // before it was Show screen:
                  <TouchableHighlight style={styles.rowFront} onPress={() => navigation.navigate('Edit', { id: item.id })}>    
                    <ImageBackground style={styles.headerBgImg} resizeMode="repeat" source={require('./../img/background.jpg')}>
                      <View style={styles.row}>
                          <Text numberOfLines={1} style={styles.noteContent}> 
                            {item.content} 
                            {/* - {item.id} */} 
                          </Text>
                          <Text style={styles.date}>
                            {/* 11/02/2020 */}
                            {item.datecreated}
                          </Text>
                          {/* <Ionicons name="ios-arrow-forward" style={styles.icon} /> */}
                      </View>
                    </ImageBackground>  
                  </TouchableHighlight>
                
                );
              }}
              renderHiddenItem={ ({item}, data, rowMap) => (
                <View style={styles.rowBack}>
                  {/* <TouchableOpacity
                      style={[styles.backRightBtn, styles.backRightBtnLeft]}
                      onPress={() => closeRow(rowMap, data.item.key)}
                  >
                      <Text style={styles.backTextWhite}>Close</Text>
                  </TouchableOpacity> */}
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
              left={<View style={{marginLeft: 33, }}></View>}
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

// const closeRow = (rowMap, rowKey) => {
//   if (rowMap[rowKey]) {
//       rowMap[rowKey].closeRow();
//   }
// };

const onRowDidClose = () => {
  console.log('This row has close');
};

const onRowDidOpen = rowKey => {
  console.log('This row has slided', rowKey);
};

const styles = StyleSheet.create({
  rowFront: {
    // backgroundColor: {onRowDidOpen} == true ? 'transparent' : '#f2f2f2',
    backgroundColor: '#f2f2f2',
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
    borderBottomColor: '#d2d2d2', 
    borderBottomWidth: 1,
  },
  row: {
    flexDirection: 'column',
    flex: 1,
    width: '100%',
    paddingVertical: 9,
    paddingHorizontal: 0,
    marginHorizontal: 10,
    backgroundColor: 'transparent',  // row(note) color
  },
  headerTitle: {
    fontSize: 30, 
    fontFamily: 'SFBold', 
    color: '#353535',
    paddingTop: 10,
    marginLeft: 0,
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
    fontFamily: 'SFSemiBold', 
    marginRight: 40,
  },
  date: {
    color: '#8F8F8F',
    fontFamily: 'SFPro', 
    fontSize: 15,
  },
  icon: {
    fontSize: 24,
    color:"#b7b5b5"
  },
  backTextWhite: {
    color: '#FFF',
    fontFamily: 'SFPro', 
  },
  rowBack: {
      alignItems: 'center',
      backgroundColor: 'transparent',    // each note slided row background color
      flex: 1,
      flexDirection: 'row',
      paddingLeft: 0,
  },
  backRightBtnRight: {
      alignItems: 'center',
      position: 'absolute',
      top: 0,
      right: 0,
      bottom: 0,
      justifyContent: 'center',
      width: 85,
      backgroundColor: 'red',   // delete button color
  },
  headerBgImg: {
    flex: 1,
    resizeMode: 'repeat',
  }
});

export default IndexScreen;