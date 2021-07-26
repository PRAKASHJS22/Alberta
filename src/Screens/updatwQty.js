import React, { Component } from 'react';
import {
  Button, Text, View, Dimensions, TextInput, ImageBackground, SafeAreaView,
  Alert, Image, Vibration, ScrollView
} from 'react-native';
import CardView from 'react-native-cardview';
import { RNCamera } from 'react-native-camera';
import Loading from 'react-native-whc-loading'
// import { NavigationEvents } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from "react-native-vector-icons/FontAwesome";
import SearchableDropdown from 'react-native-searchable-dropdown';

class UpdateQty extends Component {

  // static navigationOptions = {
  //   headerTitle: (
  //     <View style={{ flex: 1, alignItems: "center", marginRight: 20 }}>
  //       <Image source={require('../images/poslogo.jpg')}
  //         style={{ height: 100, width: 100, marginRight: 20, resizeMode: 'contain' }} />
  //     </View>
  //   ),

  // }

  componentDidMount() {
    this.barcode.clear()
    this.setState({ 'barcode': "" })
    this.state.barCodeScanned = true


    this.state.itemname = ""


    this.setState({ vendorItemCode: "" })

    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {
        if (data) {
          this.refs.loading.show(true);
          const url = API_BASE_URL + 'admin/new_get_item_with_name?sid='
          fetch(url + SID + "&token=" + data)
            .then(response => response.json())
            .then(responseJson => {
              this.refs.loading.show(false);
              //Successful response from the API Call
              this.setState({
                serverData: [...this.state.serverData, ...responseJson.item_data],
                //adding the new data in Data Source of the SearchableDropdown
              });

            })
            .catch(error => {
              console.error(error);
            });
        }
      })
    })
    //alert('jjj')
  }

  screen = () => {
    const { barcode } = this.state;
    if (barcode == "") {
      Alert.alert(

        '',
        'Barcode missing Please check',
        [
          { text: 'OK', },
        ]
      )
    } else {
      this.Nextscreen()

    }
  }


  Nextscreen = () => {
    if (this.state.barcode == "") {
      return
    }
    this.state.barCodeScanned = false;
    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {
        if (data) {
          //this.refs.loading.show();
          fetch(API_BASE_URL + `admin/checkPriceBySKU_new?sku=${this.state.barcode}&token=${encodeURIComponent(data)}&sid=${SID}`, {
            method: 'GET',

          }).then((response) => response.json())
            .then((responseJson) => {

              //this.refs.loading.show(false);
              if (responseJson.status) {

                AsyncStorage.setItem('vitemname', responseJson.data[0].vitemname);
                AsyncStorage.setItem('costPrice', responseJson.data[0].dcostprice);
                AsyncStorage.setItem('QOHData', responseJson.data[0].iqtyonhand);
                AsyncStorage.setItem('SalesPriceData', responseJson.data[0].dunitprice);
                AsyncStorage.setItem('barcodeData', responseJson.data[0].vbarcode);
                this.props.navigation.navigate('UpdateQuantity')

              }

              else if (responseJson.error) {

                Alert.alert(

                  '',
                  'Sorry, this barcode not present in the database',
                  [
                    { text: 'OK', onPress: () => this.cancelAlert() },
                  ]
                )
              }
              Keyboard.dismiss();
            })

            .catch((error) => {
              alert(responseJson.error);
            });
        }
      })
    })

  }









  constructor(props) {
    super(props);
    let { width } = Dimensions.get('window');
    // this.maskLength = (width * 85) / 100;
    this.camera = null;
    this.barcodeCodes = [];

    this.state = {
      camera: {
        type: RNCamera.Constants.Type.back,
        flashMode: RNCamera.Constants.FlashMode.auto,
        barcodeFinderVisible: true

      },
      isLoading: false,
      barcode: "",
      barCodeScanned: true,
      serverData: [],
      itemname: ""
    };
  }
  cancelAlert = () => {

    this.state.barCodeScanned = true
  }

  onBarCodeRead(scanResult) {

    if (this.state.barCodeScanned == false) {
      return
    }


    Vibration.vibrate()

    if (scanResult.type == "org.gs1.UPC-E") {

      AsyncStorage.getItem('UEUA').then(
        UEUA => {
          if (UEUA == "1") {

            // this.refs.loading.show(); 

            fetch(API_BASE_URL + `convertupce2upca?upc=${encodeURIComponent(scanResult.data)}`, {

              method: 'GET',

            }).then((response) => response.json())
              .then((responseJson) => {

                // this.refs.loading.show(false);
                if (responseJson.status == "success") {

                  AsyncStorage.getItem('UPCAL').then(
                    UPCAL => {
                      if (UPCAL == "1") {

                        AsyncStorage.getItem('UPCAR').then(
                          UPCAR => {
                            if (UPCAR == "1") {
                              this.setState({ "barcode": responseJson.data.substring(1, responseJson.data.length - 1) })
                              //if (this.state.barcode != '') this.Nextscreen();
                            } else {
                              this.setState({ "barcode": responseJson.data.substring(1) })
                              //if (this.state.barcode != '') this.Nextscreen();
                            }
                          }
                        )

                      } else {

                        AsyncStorage.getItem('UPCAR').then(
                          UPCAR => {
                            if (UPCAR == "1") {
                              this.setState({ "barcode": responseJson.data.substring(0, responseJson.data.length - 1) })
                              //if (this.state.barcode != '') this.Nextscreen();
                            } else {
                              this.setState({ 'barcode': responseJson.data })
                              //if (this.state.barcode != '') this.Nextscreen();
                            }
                          }
                        )

                      }
                    }
                  )


                } else if (responseJson.status == "error") {
                  //this.setState({'barcode' : responseJson.data})
                  Alert.alert(

                    '',
                    responseJson.message,
                    [
                      { text: 'OK', onPress: () => this.cancelAlert() },
                    ]
                  )
                }
              })
              .catch(error => {
                console.error(error);
              });
          } else {

            AsyncStorage.getItem('UPCEL').then(
              UPCEL => {
                if (UPCEL == "1") {

                  AsyncStorage.getItem('UPCER').then(
                    UPCER => {
                      if (UPCER == "1") {
                        this.setState({ "barcode": scanResult.data.substring(1, scanResult.data.length - 1) })
                        //if (this.state.barcode != '') this.Nextscreen();
                      } else {
                        this.setState({ "barcode": scanResult.data.substring(1) })
                        //if (this.state.barcode != '') this.Nextscreen();
                      }
                    }
                  )

                } else {

                  AsyncStorage.getItem('UPCER').then(
                    UPCER => {
                      if (UPCER == "1") {
                        this.setState({ "barcode": scanResult.data.substring(0, scanResult.data.length - 1) })
                        //if (this.state.barcode != '') this.Nextscreen();
                      } else {
                        this.setState({ 'barcode': scanResult.data })
                        //if (this.state.barcode != '') this.Nextscreen();
                      }
                    }
                  )

                }
              }
            )

          }
        })
      if (this.state.barcode != '') this.Nextscreen();

    } else {

      var ScannedBarcodeResult = '';
      if (scanResult.data.length > 12)
        ScannedBarcodeResult = scanResult.data.substring(scanResult.data.length - 12)

      // scanned result UPCA 
      this.state.barCodeScanned = false;
      AsyncStorage.getItem('UAUE').then(
        UAUE => {
          if (UAUE == "1") {
            //this.refs.loading.show(); 

            fetch(API_BASE_URL + `convertupca2upce?upc=${encodeURIComponent(ScannedBarcodeResult)}`, {

              method: 'GET',

            }).then((response) => response.json())
              .then((responseJson) => {
                // this.refs.loading.show(false);
                if (responseJson.status == "success") {


                  AsyncStorage.getItem('UPCEL').then(
                    UPCEL => {
                      if (UPCEL == "1") {

                        AsyncStorage.getItem('UPCER').then(
                          UPCER => {
                            if (UPCER == "1") {
                              this.setState({ "barcode": responseJson.data.substring(1, responseJson.data.length - 1) })
                              if (this.state.barcode != '') this.Nextscreen();
                            } else {
                              this.setState({ "barcode": responseJson.data.substring(1) })
                              if (this.state.barcode != '') this.Nextscreen();
                            }
                          }
                        )

                      } else {

                        AsyncStorage.getItem('UPCER').then(
                          UPCER => {
                            if (UPCER == "1") {
                              this.setState({ "barcode": responseJson.data.substring(0, responseJson.data.length - 1) })
                              if (this.state.barcode != '') this.Nextscreen();
                            } else {
                              this.setState({ 'barcode': responseJson.data })
                              if (this.state.barcode != '') this.Nextscreen();
                            }
                          }
                        )

                      }
                    }
                  )
                } else if (responseJson.status == "error") {
                  //this.setState({'barcode' : responseJson.data})
                  Alert.alert(
                    '',
                    responseJson.message,
                    [
                      { text: 'OK', onPress: () => this.cancelAlert() },
                    ]
                  )
                }
              })
              .catch(error => {
                console.error(error);
              });
          } else {

            AsyncStorage.getItem('UPCAL').then(
              UPCAL => {
                if (UPCAL == "1") {

                  AsyncStorage.getItem('UPCAR').then(
                    UPCAR => {
                      if (UPCAR == "1") {
                        this.setState({ "barcode": ScannedBarcodeResult.substring(1, ScannedBarcodeResult.length - 1) })
                        if (this.state.barcode != '') this.Nextscreen();

                      } else {
                        this.setState({ "barcode": ScannedBarcodeResult.substring(1) })
                        if (this.state.barcode != '') this.Nextscreen();
                      }
                    }
                  )

                } else {

                  AsyncStorage.getItem('UPCAR').then(
                    UPCAR => {
                      if (UPCAR == "1") {
                        this.setState({ "barcode": ScannedBarcodeResult.substring(0, ScannedBarcodeResult.length - 1) })
                        if (this.state.barcode != '') this.Nextscreen();
                      } else {
                        this.setState({ 'barcode': ScannedBarcodeResult })
                        if (this.state.barcode != '') this.Nextscreen();
                      }
                    }
                  )

                }
              }
            )

          }
        })

    }


  }


  render() {
    return (
      <SafeAreaView style={styles.container}>
        {/* <NavigationEvents onDidFocus={() => this.componentDidMount()} /> */}

        {/* <View style={{ marginTop: 5, alignContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>Update Quantity</Text>
        </View> */}
        <View style={{ width: '100%' }}>
          <ImageBackground
            source={require('../assets/images/header.jpeg')}
            style={{ position: 'relative', height: 80, paddingTop: 20 }}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingVertical: 10,
                paddingHorizontal: 20
              }}>
              <FontAwesome style={{ marginRight: 0 }} name="caret-left" color={'#fff'} size={26} onPress={() => this.props.navigation.navigate('Items')} />
              <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 8, paddingVertical: 3 }} onPress={() => this.props.navigation.navigate('Items')}>Update Quantity</Text>

            </View>
          </ImageBackground>
        </View>
        <View style={{ margin: 5, marginTop: 10 }}>


          <SearchableDropdown
            // onTextChange={qoh => this.setState({ qoh })}

            onTextChange={qoh => this.setState({ qoh })}

            onItemSelect={(item) => {
              this.state.barcode = item.vbarcode,
                this.state.itemname = item.name,
                resetValue = true,
                this.Nextscreen()
            }}
            containerStyle={{ padding: 0 }}
            //suggestion container style
            textInputStyle={{
              //inserted text style
              padding: 15,
              borderWidth: 1,
              borderColor: '#ccc',
              backgroundColor: '#fff',
              borderRadius: 30,

              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.1,
              shadowRadius: 0.2,
              elevation: 2,
              // backgroundColor: '#FAF7F6',
            }}
            itemStyle={{
              //single dropdown item style
              padding: 10,
              marginTop: 2,
              backgroundColor: '#FAF9F8',
              borderColor: '#bbb',
              borderWidth: 1,
            }}
            itemTextStyle={{
              //text style of a single dropdown item
              color: '#222',
            }}
            itemsContainerStyle={{
              //items container style you can pass maxHeight
              //to restrict the items dropdown hieght
              maxHeight: '80%',
            }}
            items={this.state.serverData}
            //mapping of item array
            defaultIndex={0}
            //default selected item index
            placeholder="Enter Item Name"
            placeholderTextColor="grey"
            //place holder for the search input
            resetValue={true}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"


          //To remove the underline from the android input
          />

        </View>



        <View style={{ margin: 5 }}>
          <TextInput
            style={styles.textBox1}
            ref={input => { this.barcode = input }}
            // style={styles.input}
            placeholder="Enter Barcode"
            placeholderTextColor='grey'
            returnKeyType="done"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false}
            value={this.state.barcode}
            onChangeText={barcode => this.setState({ barcode })}
            onSubmitEditing={() => this.screen()} />

        </View>

        <CardView
          cardElevation={6}
          cardMaxElevation={1}
          cornerRadius={3}
          style={{ margin: 10 }}>

          <RNCamera
            ref={ref => {
              this.camera = ref;
            }}
            barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
            barcodeFinderWidth={280}
            barcodeFinderHeight={220}
            barcodeFinderBorderColor="green"
            barcodeFinderBorderWidth={2}
            defaultTouchToFocus
            flashMode={this.state.camera.flashMode}
            mirrorImage={false}
            onBarCodeRead={this.onBarCodeRead.bind(this)}
            onFocusChanged={() => { }}
            onZoomChanged={() => { }}
            permissionDialogTitle={'Permission to use camera'}
            permissionDialogMessage={'We need your permission to use your camera phone'}
            style={styles.preview}
            type={this.state.camera.type}>
            <View style={styles.overlay} />
            <View style={[styles.contentRow, { height: 190 }]}>
              <View style={styles.overlay} />
              <View style={[styles.content, { width: 300, height: 190 }]} />
              <View style={styles.overlay} />
            </View>
            <View style={styles.overlay} />

          </RNCamera>


        </CardView>

        <Loading ref="loading" />
      </SafeAreaView>
      // </ScrollView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff'
  },
  preview: {
    // width: this.maskLength,
    height: 200,
    alignItems: 'center'
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  contentRow: {
    flexDirection: 'row',
  },

  content: {
    borderWidth: 2,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center'
  },

  input: {
    //width: 250,
    alignSelf: "stretch",
    height: 40,
    width: "90%",
    marginStart: 10,
    borderRadius: 3,
    backgroundColor: '#636466',
    marginBottom: 10,
    color: '#fff',
    fontSize: 15,
    paddingHorizontal: 20,
  },
  bottomOverlay: {
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.4)',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center'
  },
  textBox1: {
    height: 45,
    backgroundColor: 'red',
    paddingRight: 8,
    paddingLeft: 18,
    width: '100%',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
};

export default UpdateQty;