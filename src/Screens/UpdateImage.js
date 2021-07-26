import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  Dimensions,
  Vibration,
  ImageBackground,
  ScrollView,
  Alert,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-cardview';
import Camera from 'react-native-camera';
import {RNCamera} from 'react-native-camera';
import PhotoUpload from 'react-native-photo-upload';
// import { NavigationEvents } from 'react-navigation'
import SearchableDropdown from 'react-native-searchable-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
import { Button } from 'react-native-elements';
import Loading from 'react-native-whc-loading';

export default class UpadteImage extends React.Component {
  // static navigationOptions = {
  //     headerTitle: (
  //         <View style={{ flex: 1, alignItems: "center", marginStart: 0 }}>
  //             <Image
  //                 source={require("../images/poslogo.jpg")}
  //                 style={{
  //                     height: 105,
  //                     width: 105,
  //                     marginRight: 20,
  //                     resizeMode: "contain"
  //                 }}
  //             />
  //         </View>
  //     ),
  //     // headerRight: (
  //     //     <View style={{ marginRight: 20 }}>
  //     //         <FontAwesome name="bell" size={25} color="#16a0db" />
  //     //     </View>
  //     // )
  // };

  // static navigationOptions = ({ navigation }) => {
  //     const { params } = navigation.state;
  //        return {
  //         headerTitle: (
  //           <View style={{ flex: 1, alignItems: "center", marginStart: 20 }}>
  //             <Image source={require('../images/poslogo.jpg')}
  //               style={{ height: 100, width: 100, marginRight: 20, resizeMode: 'contain' }} />
  //           </View>
  //         ),

  //            headerRight: (<View  style={{ marginRight: 0 }}>
  //       <TouchableOpacity onPress={()=>params.onPressMethod()}>
  //       <MaterialIcons name="save" size={40} color="#3386D6" />
  //       </TouchableOpacity>

  //        </View>)
  //     };
  //   }

  constructor() {
    super();
    this.state = {
      check: true,
      vitemname: '',
      dcostprice: '',
      nsaleprice: '',
    };
  }

  Backscreen = () => {
    this.props.navigation.navigate('BarcodeupdateImg', {
      SKU: '',
    });
  };

  buttonClickded = () => {
    this.refs.loading.show(false);
    Alert.alert(
      '',
      'Image Uploaded succesfully',
      [{ text: 'OK', onPress: () => this.Backscreen() }],
      { cancelable: false },
    );
  };
  errorClickded = () => {
    this.refs.loading.show(false);
    Alert.alert('', 'Sorry, this barcode not prasent in the database', [
      { text: 'OK', onPress: () => this.Backscreen() },
    ]);
  };

  componentDidMount() {
    this.props.navigation.setParams({ onPressMethod: this.saveNPLItemDetails });
    SKU = this.props.route.params.sku;
    if (SKU) {
      this.setState({ SKU: SKU });
      AsyncStorage.getItem('Sid').then(data => {
        if (data) {
          this.refs.loading.show();
          STORE_ID = data;
          API_URL = API_BASE_URL + 'getimage/';
          fetch(API_URL, {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              sid: STORE_ID,
              sku: SKU,
            }),
          })
            .then(response => response.json())
            .then(responseJson => {
              this.refs.loading.show(false);
              if (responseJson.vitemname) {
                this.setState({
                  image: 'data:image/gif;base64,' + responseJson.data,
                  vitemname: responseJson.vitemname,
                  dcostprice: responseJson.dcostprice,
                  nsaleprice: responseJson.dunitprice,
                });
              } else if (responseJson.error) {
                this.errorClickded();
              }
            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    }
  }

  saveNPLItemDetails = () => {
    // alert('Under development')
    AsyncStorage.getItem('Sid').then(data => {
      if (data) {
        this.refs.loading.show();
        STORE_ID = data;
        API_URL = API_BASE_URL + 'uploadbase64image/';
        fetch(API_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sid: STORE_ID,
            sku: this.state.SKU,
            image: this.state.uploadedImage,
          }),
        })
          .then(response => response.json())
          .then(responseJson => {
            // this.refs.loading.show(false);
            if (responseJson) {
              if (responseJson.status == 'success') {
                // Alert.alert(responseJson.message);

                this.buttonClickded();
              }
            } else {
              alert('Something went wrong!');
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  };
  cancelBtnPress = () => {
    // alert("Under development");

    this.props.navigation.navigate('BarcodeupdateImg', {
      sku: '',
    });
  };

  render() {
    return (
      <View style={styles.MainContainer}>
        <View style={{ width: '100%' }}>
          <ImageBackground
            source={require('../assets/images/header.jpeg')}
            style={{
              position: 'relative',
              height: 100,
              paddingTop: 20,
              marginBottom: 10,
            }}>
            <View
              style={{
                // display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                // paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{ color: 'white', marginTop: 10 }}
                onPress={() => this.props.navigation.navigate('Items')}>
                Upload Picture
              </Text>
            </View>
          </ImageBackground>
        </View>
        <ScrollView>
          <View style={styles.logocontainer}>
            <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>
              <Text style={styles.setTextSize}>Item Name</Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              <TextInput
                style={{ color: "white" }}
                value={this.state.vitemname}
                editable={false}
              // style={styles.input}
              />
            </View>
          </View>

          <View style={styles.logocontainer}>
            <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>
              <Text style={styles.setTextSize}>Cost</Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              <TextInput
                style={{ color: "white" }}
                // style={styles.input}
                value={this.state.dcostprice}
                editable={false}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>

          <View style={styles.logocontainer}>
            <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: 5,
                paddingVertical: 10,
              }}>
              <Text style={styles.setTextSize}>Price</Text>
            </View>
            <View
              style={{
                alignItems: 'flex-end',
                paddingHorizontal: 30,
                paddingVertical: 10,
              }}>
              <TextInput
                style={{ color: "white" }}
                // style={styles.input}
                value={this.state.nsaleprice}
                editable={false}
                returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
              />
            </View>
          </View>
          <Text style={{ textAlign: 'center' }}>
            Tap on image to select Photo
          </Text>
          <View style={styles.log}>
            <PhotoUpload
              onPhotoSelect={avatar => {
                if (avatar) {
                  this.setState({ uploadedImage: avatar });
                  // console.log('Image base64 string: ', "data:image/jpg;base64,"+avatar)
                }
              }}>
              <Image
                style={{
                  paddingVertical: 30,
                  width: 250,
                  height: 250,
                  borderRadius: 7,
                }}
                resizeMode="cover"
                source={{
                  uri:
                    this.state.image != ''
                      ? this.state.image
                      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1024px-Circle-icons-profile.svg.png',
                }}
              />
            </PhotoUpload>
          </View>

          {/* <View style={styles.logocontainer}>
                        <TouchableOpacity
                            style={styles.btncontainer}
                            onPress={this.saveNPLItemDetails}
                        >
                            <Text style={styles.btnText}>Save</Text>
                        </TouchableOpacity>

                        <TouchableOpacity
                            style={styles.btncontainer}
                            onPress={this.cancelBtnPress}
                        >
                            <Text style={styles.btnText}>Cancel</Text>
                        </TouchableOpacity>
                    </View> */}
          <View style={{ display: 'flex' }}>
            <Button
              style={{ marginTop: 10 }}
              titleStyle={{ color: '#fff', fontSize: 16 }}
              buttonStyle={{
                padding: 12,
                backgroundColor: '#3386D6',
                borderRadius: 25,
              }}
              containerStyle={{ margin: 20 }}
              //type="outline"
              title="Save"
              onPress={() => this.saveNPLItemDetails()}
            />
          </View>
          <Loading ref="loading" />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logocontainer: {
    width: '95%',
    backgroundColor: 'grey',
    marginHorizontal: 10,
    flexDirection: 'row',
    height: 45,
    // backgroundColor: 'red',
    // paddingRight: 8,
    paddingLeft: 28,
    // width: '100%',
    borderTopWidth: 0.4,
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    // backgroundColor: '#fff',
    marginBottom: 8,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderColor: '#ccc',
    justifyContent: 'space-between',
  },
  log: {
    width: 250,
    height: 250,
    marginStart: 50,
    alignContent: 'center',
    justifyContent: 'center',
    paddingVertical: 30,
    borderColor: '#ccc',
    borderWidth: 8,
    flexDirection: 'row',
  },
  MainContainer: {
    flex: 1,

    // Set content's vertical alignment.
    // justifyContent: 'center',

    // // Set content's horizontal alignment.
    // alignItems: 'center',

    // Set hex color code here.
    backgroundColor: '#fff',
  },
  taxContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    marginRight: 5,
    flexDirection: 'row',
  },
  foodContainer: {
    flex: 1,
    marginTop: 10,
    marginBottom: 20,
    marginLeft: 0,
    flexDirection: 'row',
  },

  setTextSize: {
    marginTop: 10,
    width: 90,
    height: 50,
    marginLeft: 0,
    color: 'white',
    fontWeight: 'bold',
    flexDirection: 'row',
    color: '#fff',
  },

  setCheckMark: {
    width: 50,
    height: 50,
    marginLeft: 70,
    //  color: 'white'
  },
  input: {
    //width: 250,
    alignSelf: 'stretch',
    height: 40,
    backgroundColor: '#ccc',

    marginEnd: 10,
    borderRadius: 3,
    borderRightWidth: 1,
    borderRightColor: '#636466',
    borderLeftWidth: 1,
    borderLeftColor: '#636466',
    borderTopWidth: 1,
    borderTopColor: '#636466',
    borderBottomWidth: 1,
    borderBottomColor: '#636466',

    marginBottom: 10,
    color: '#000',
    fontSize: 15,
    paddingHorizontal: 20,
  },
  input1: {
    //width: 250,
    alignSelf: 'stretch',
    marginRight: 10,
    marginLeft: 20,
    height: 40,
    width: 230,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    color: '#000',
    fontSize: 15,
    paddingHorizontal: 20,
  },
  btncontainer: {
    flex: 1,
    backgroundColor: '#3386D6',
    paddingVertical: 15,
    borderRadius: 10,
    height: 50,
    marginLeft: 10,
    marginRight: 40,
    width: '45%',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 30,
  },
  btnText: {
    fontSize: 20,
    color: '#fff',
    alignItems: 'center',
  },
});
