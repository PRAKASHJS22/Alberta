import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View,
  TouchableOpacity, Image, TextInput, Vibration, Dimensions, Alert
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-cardview';
import Loading from 'react-native-whc-loading'
import { RNCamera } from 'react-native-camera';
import { ScrollView } from 'react-native-gesture-handler';
// import { NavigationEvents } from 'react-navigation'
import AsyncStorage from "@react-native-community/async-storage";
import SearchableDropdown from 'react-native-searchable-dropdown';


export default class PhysChooseItem extends Component {


  // static navigationOptions = ({ navigate, navigation }) => ({

  //   headerTitle: (
  //     <View style={{ flex: 1, alignItems: "center", marginStart: 20 }}>
  //       <Image source={require('../images/poslogo.jpg')}
  //         style={{ height: 100, width: 100, marginRight: 20, resizeMode: 'contain' }} />
  //     </View>
  //   ),
  //   headerRight: <TouchableOpacity onPress={() => { navigation.navigate('PhysItemList'); }}>
  //     <FontAwesome name="chevron-right" size={25} color="#16a0db"/></TouchableOpacity>,
  // })
  componentDidMount() {
    this.barcode.clear()
    this.setState({ 'barcode': "" })
    this.state.barCodeScanned = true
    this.state.itemname = ""
    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('userid').then((user_id) => {
        AsyncStorage.getItem('ipiid').then((ipiid) => {
          AsyncStorage.getItem('Sid').then((SID) => {
            if (data) {
              this.refs.loading.show(true);
              const url = API_BASE_URL + 'admin/new_get_item_with_pi?sid='
              fetch(url + SID + "&token=" + data + "&userid=" + user_id + "&ipiid=" + ipiid)
                .then(response => response.json())
                .then(responseJson => {
                  this.refs.loading.show(false);
                  //Successful response from the API Call


                  this.setState({
                    serverData: [...responseJson.item_data],
                    //adding the new data in Data Source of the SearchableDropdown
                  });

                })
                .catch(error => {
                  console.error(error);
                });
            }
          })
        })
      })
    })
    //alert('jjj')
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
      barcode: "",
      isLoading: false,
      barCodeScanned: true,
      serverData: [],
      itemname: "",
      physicalqty: "",
      updateqty: "",
      ipiid: "",
    };
  }

  cancelAlert = () => {

    this.state.barCodeScanned = true
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
      // this.state.barCodeScanned = true
    }
  }

  Nextscreen = () => {
    // this.props.navigation.navigate('PhysItemInforma')
    if (this.state.barcode == "") {
      return
    }

    this.state.barCodeScanned = false;
    AsyncStorage.getItem('ipiid').then((ipiid) => {
      AsyncStorage.getItem('token').then((data) => {
        AsyncStorage.getItem("Sid").then(sid => {
          if (data) {

            // https://devportal.albertapayments.com/api/admin/addbarcode?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHBzOlwvXC9kZXZwb3J0YWwuYWxiZXJ0YXBheW1lbnRzLmNvbVwvYXV0aGVudGljYXRlX25ldyIsImlhdCI6MTU3NDI1MzI0NiwiZXhwIjoxNTc2ODQ1MjQ2LCJuYmYiOjE1NzQyNTMyNDYsImp0aSI6Ijk3MjQ4NWFmYjVlNDU1MGUyOGNhZTRiMGU0YmRhZDMxIn0.caUsX2eSEC9fO7wGZfxmUW7_wgiDtyfFVOTy2MEc6zI&sid=1001&barcode=60265219977
            this.refs.loading.show();
            fetch(API_BASE_URL + `admin/get_sku?sku=${this.state.barcode}&token=${encodeURIComponent(data)}&sid=${sid}&ipiid=${ipiid}`, {
              method: 'GET',

            }).then((response) => response.json())
              .then((responseJson) => {

                switch (responseJson.status) {
                  case "success":
                    this.refs.loading.show(false);
                    AsyncStorage.setItem(
                      "ipiid",
                      JSON.stringify(responseJson.data[0].ipiid)
                    );
                    var SampleNameArray = responseJson.data[0].vitemname
                    var qty_on_hand = responseJson.data[0].iqtyonhand
                    var barcode = responseJson.data[0].vbarcode
                    var physicalqty = responseJson.data[0].physicalqty
                    var updateqty = responseJson.data[0].updateqty
                    //  var visinventory = responseJson.data[0].visinventory
                    this.props.navigation.navigate('PhysItemInforma',
                      {
                        item: SampleNameArray,
                        qty_on_hand: qty_on_hand,
                        barcode: barcode,
                        physicalqty: physicalqty,
                        updateqty: updateqty,

                      })
                    break;
                  case responseJson.status:
                    Alert.alert(
                      '',
                      responseJson.status,
                      [
                        { text: 'OK', onPress: () => this.refs.loading.show(false) },
                      ],
                      { cancelable: false },
                    );
                  default:
                    break;
                }
                // if (responseJson.status == "success") {
                //   this.refs.loading.show(false);
                //   AsyncStorage.setItem(
                //     "ipiid",
                //     JSON.stringify(responseJson.data[0].ipiid)
                //   );
                //   var SampleNameArray = responseJson.data[0].vitemname
                //   var qty_on_hand = responseJson.data[0].iqtyonhand
                //   var barcode = responseJson.data[0].vbarcode
                //   var physicalqty = responseJson.data[0].physicalqty
                //   var updateqty = responseJson.data[0].updateqty
                //   //  var visinventory = responseJson.data[0].visinventory
                //   this.props.navigation.navigate('PhysItemInforma',
                //     {
                //       item: SampleNameArray,
                //       qty_on_hand: qty_on_hand,
                //       barcode: barcode,
                //       physicalqty: physicalqty,
                //       updateqty: updateqty,

                //     })
                //   this.props.navigation.navigate('AddItem');

                // } else {
                //   Alert.alert(
                //     'Something went wrong! Please try again later!!!!'
                //   )
                //   this.refs.loading.show(false);
                // }

                // if(responseJson.error){


                // }
                // if (responseJson.error) {
                //   // this.refs.loading.show(false);
                //   alert("hi")


                // }
              })
              .catch((error) => {

                Alert.alert(

                  '',
                  'Something went wrong! Please try again later!!!!',
                  [
                    { text: 'OK', },
                  ],

                )
                // this.state.barCodeScanned = true;
              });
          }
        })
      });
    })
    this.barcode.clear()
  }



  onBarCodeRead(scanResult) {

    if (this.state.barCodeScanned == false) {
      return
    }


    //Vibration.vibrate()

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
      <View style={styles.container}>
        {/* <NavigationEvents onDidFocus={() => this.componentDidMount()} /> */}

        <View style={{ marginTop: 5, alignContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>Choose Item</Text>
        </View>
        <View style={{ margin: 5 }}>


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
              borderColor: '#fff',
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
            placeholderTextColor="white"
            //place holder for the search input
            resetValue={true}
            //reset textInput Value with true and false state
            underlineColorAndroid="transparent"


          //To remove the underline from the android input
          />

        </View>



        <View style={{ margin: 5 }}>
          <TextInput
            ref={input => { this.barcode = input }}
            style={styles.input}
            placeholder="Enter Barcode"
            placeholderTextColor='white'
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
      </View>
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
  }
};
