import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Keyboard,
  TextInput,
  Dimensions,
  Vibration,
  ScrollView,
  Alert,
  ImageBackground,
  SafeAreaView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-cardview';
// import Camera from 'react-native-camera';
import Loading from 'react-native-whc-loading';
import { RNCamera } from 'react-native-camera';
// import { NavigationEvents } from 'react-navigation'
import SearchableDropdown from 'react-native-searchable-dropdown';
import AsyncStorage from '@react-native-community/async-storage';
// import {SafeAreaView} from 'react-native-safe-area-context';
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

export default class SelectItem extends Component {
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
        barcodeFinderVisible: true,
      },
      barcode: '',
      isLoading: false,
      barCodeScanned: true,
      ipoid: '',
      searchItemName: '',
      serverData: [],
      testVariable: '',
      iitemid: '',
      vitemcode: ',',
      npack: '',
      new_costprice: '',
      name: '',
      vendorItemCode: '',
      itemname: '',
    };
  }

  // static navigationOptions = {
  //     headerTitle: (
  //         <View style={{ flex: 1, alignItems: "center", marginRight: 20 }}>
  //             <Image source={require('../images/poslogo.jpg')}
  //                 style={{
  //                     height: 105,
  //                     width: 105, marginRight: 20, resizeMode: 'contain'
  //                 }} />
  //         </View>
  //     ),

  // }
  componentDidMount() {
    this.barcode.clear();
    this.state.itemname = '';

    this.setState({ vendorItemCode: '' });

    this.setState({ barcode: '' });
    this.state.barCodeScanned = true;

    AsyncStorage.getItem('token').then((data) => {
      // alert(data)
      AsyncStorage.getItem('Sid').then((datasid) => {
        // alert(datasid)
        if (data) {
          // this.refs.loading.show(true);
          const url = API_BASE_URL + 'admin/new_get_item_with_name?sid=';
          fetch(url + datasid + '&token=' + data)
            .then((response) => response.json())
            .then((responseJson) => {
              // this.refs.loading.show(false);
              // alert(JSON.stringify(responseJson))
              //Successful response from the API Call
              this.setState({
                serverData: responseJson.item_data,
                //adding the new data in Data Source of the SearchableDropdown
              });
              // alert(JSON.stringify(this.state.serverData));
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    });
  }

  cancelAlert = () => {
    (this.state.barCodeScanned = true), this.setState({ vendorItemCode: '' });
    this.setState({ barcode: '' });
  };

  a = () => { };

  session = () => {
    AsyncStorage.removeItem('savedPassword');
    this.props.navigation.navigate('Loginscreen');
  };

  // sessionButton = () => {
  //     Alert.alert(
  //         "",
  //         "Session expired Please login again",
  //         [
  //             {
  //                 text: "Cancel",
  //                 onPress: () => console.log("Cancel Pressed"),
  //                 style: "cancel"
  //             },
  //             {
  //                 text: "OK",
  //                 onPress: () => this.session()
  //             }
  //         ],
  //         {
  //             cancelable: false
  //         }
  //     );
  //     return true;
  // };

  screen = () => {
    const { barcode } = this.state;
    if (barcode == '') {
      Alert.alert('', 'Barcode missing Please check', [{ text: 'OK' }]);
    } else {
      this.Nextscreen();
    }
  };

  Nextscreen = () => {
    if (this.state.barcode == '') {
      return;
    }

    this.state.barCodeScanned = false;
    // this.props.navigation.navigate('ItemInformation')
    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {
        if (data) {
          // this.refs.loading.show(true);

          fetch(
            API_BASE_URL +
            `admin/get_itemdetails_with_barcode?sid=${SID}&barcode=${this.state.barcode}&token=${data}`,
            {
              method: 'GET',
            },
          )
            .then((response) => response.json())
            .then((responseJson) => {
              this.refs.loading.show(false);
              //this.refs.loading.show(false);
              //console.log(responseJson)
              if (responseJson.status == 'success') {
                this.refs.loading.show(false);

                var SampleNameArray = responseJson.item_data[0].vitemname;
                var costPrice = JSON.stringify(
                  responseJson.item_data[0].new_costprice,
                );
                var QOHData = JSON.stringify(responseJson.item_data[0].QOH);
                var SalesPriceData = responseJson.item_data[0].dunitprice;
                // var barcodeData = responseJson.data[0].vbarcode;

                var iitemid = JSON.stringify(responseJson.item_data[0].iitemid);
                var vitemcode = responseJson.item_data[0].vitemcode;

                var new_costprice = JSON.stringify(
                  responseJson.item_data[0].new_costprice,
                );
                var npack = JSON.stringify(responseJson.item_data[0].npack);

                this.props.navigation.navigate('ItemInformation', {
                  item: SampleNameArray,
                  cost: costPrice,
                  qoh: QOHData,
                  sale: SalesPriceData,
                  vitemcode: vitemcode,
                  iitemid: iitemid,
                  new_costprice: new_costprice,
                  npack: npack,

                  // barcodePassValue: barcodeData
                });
              }

              if (responseJson.error == 'No Barcode Found') {
                //this.refs.loading.show(false);

                Alert.alert(
                  '',
                  'Item Not found ! Add Item to continue or proceed with next item',
                  [{ text: 'OK', onPress: () => this.cancelAlert() }],
                );
                return;
              } else if (responseJson.error == 'Token is Invalid') {
                //this.sessionButton()
              }
              Keyboard.dismiss();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    });
  };

  vendorItemCodeMethod = () => {
    if (this.state.vendorItemCode == '') {
      Alert.alert('', 'Vendor code missing Please check', [{ text: 'OK' }]);
      return;
    }
    // this.props.navigation.navigate('ItemInformation')
    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {
        if (data) {
          fetch(
            API_BASE_URL +
            `admin/get_item_with_vendoritemcode?sid=${SID}&vendoritemcode=${this.state.vendorItemCode}&token=${data}`,
            {
              method: 'GET',
            },
          )
            .then((response) => response.json())
            .then((responseJson) => {
              this.refs.loading.show(false);
              //console.log(responseJson)
              if (responseJson.status == 'success') {
                var SampleNameArray = responseJson.item_data[0].vitemname;
                var costPrice = JSON.stringify(
                  responseJson.item_data[0].new_costprice,
                );
                var QOHData = JSON.stringify(responseJson.item_data[0].QOH);
                var SalesPriceData = responseJson.item_data[0].dunitprice;
                // var barcodeData = responseJson.data[0].vbarcode;

                var iitemid = JSON.stringify(responseJson.item_data[0].iitemid);
                var vitemcode = responseJson.item_data[0].vitemcode;

                var new_costprice = JSON.stringify(
                  responseJson.item_data[0].new_costprice,
                );
                var npack = JSON.stringify(responseJson.item_data[0].npack);

                this.props.navigation.navigate('ItemInformation', {
                  item: SampleNameArray,
                  cost: costPrice,
                  qoh: QOHData,
                  sale: SalesPriceData,
                  vitemcode: vitemcode,
                  iitemid: iitemid,
                  new_costprice: new_costprice,
                  npack: npack,

                  // barcodePassValue: barcodeData
                });
              }

              if (responseJson.error == 'No Item found.') {
                //this.refs.loading.show(false);

                Alert.alert('', 'Vendor Item code not found', [
                  { text: 'OK', onPress: () => this.cancelAlert() },
                ]);
                return;
              } else if (responseJson.error == 'Token is Invalid') {
                //this.sessionButton()
              }
              Keyboard.dismiss();
            })
            .catch((error) => {
              console.error(error);
            });
        }
      });
    });
  };

  itemNameSearch = () => {
    fetch(
      API_BASE_URL +
      `get_item_with_name?sid=1001&keyword=${this.state.searchItemName}`,
      {
        method: 'GET',
      },
    )
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.status == 'success') {
        }

        if (responseJson.error == 'No Barcode Found') {
          //this.refs.loading.show(false);

          Alert.alert(
            '',
            'Item Not found ! Add Item to continue or proceed with next item',
            [{ text: 'OK', onPress: () => this.cancelAlert() }],
          );
          return;
        } else if (responseJson.error == 'Token is Invalid') {
          //this.sessionButton()
        }
        Keyboard.dismiss();
      })
      .catch((error) => {
        console.error(error);
      });
  };

  onBarCodeRead(scanResult) {
    if (this.state.barCodeScanned == false) {
      return;
    }

    Vibration.vibrate();

    if (scanResult.type == 'org.gs1.UPC-E') {
      AsyncStorage.getItem('UEUA').then((UEUA) => {
        if (UEUA == '1') {
          // this.refs.loading.show();

          fetch(
            API_BASE_URL +
            `convertupce2upca?upc=${encodeURIComponent(scanResult.data)}`,
            {
              method: 'GET',
            },
          )
            .then((response) => response.json())
            .then((responseJson) => {
              // this.refs.loading.show(false);
              if (responseJson.status == 'success') {
                AsyncStorage.getItem('UPCAL').then((UPCAL) => {
                  if (UPCAL == '1') {
                    AsyncStorage.getItem('UPCAR').then(
                      (UPCAR) => {
                        if (UPCAR == '1') {
                          this.setState({
                            barcode: responseJson.data.substring(
                              1,
                              responseJson.data.length - 1,
                            ),
                          });
                          //if (this.state.barcode != '') this.Nextscreen();
                        } else {
                          this.setState({
                            barcode: responseJson.data.substring(1),
                          });
                          //if (this.state.barcode != '') this.Nextscreen();
                        }
                      },
                      //if (this.state.barcode != '') this.Nextscreen();
                    );
                    //if (this.state.barcode != '') this.Nextscreen();
                  } else {
                    AsyncStorage.getItem('UPCAR').then((UPCAR) => {
                      if (UPCAR == '1') {
                        this.setState({
                          barcode: responseJson.data.substring(
                            0,
                            responseJson.data.length - 1,
                          ),
                        });
                        //if (this.state.barcode != '') this.Nextscreen();
                      } else {
                        this.setState({ barcode: responseJson.data });
                        //if (this.state.barcode != '') this.Nextscreen();
                      }
                      //if (this.state.barcode != '') this.Nextscreen();
                    });
                  }
                });
              } else if (responseJson.status == 'error') {
                //this.setState({'barcode' : responseJson.data})
                Alert.alert('', responseJson.message, [
                  { text: 'OK', onPress: () => this.cancelAlert() },
                ]);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          AsyncStorage.getItem('UPCEL').then((UPCEL) => {
            if (UPCEL == '1') {
              AsyncStorage.getItem('UPCER').then((UPCER) => {
                if (UPCER == '1') {
                  this.setState({
                    barcode: scanResult.data.substring(
                      1,
                      scanResult.data.length - 1,
                    ),
                  });
                  //if (this.state.barcode != '') this.Nextscreen();
                } else {
                  this.setState({ barcode: scanResult.data.substring(1) });
                  //if (this.state.barcode != '') this.Nextscreen();
                }
              });
            } else {
              AsyncStorage.getItem('UPCER').then((UPCER) => {
                if (UPCER == '1') {
                  this.setState({
                    barcode: scanResult.data.substring(
                      0,
                      scanResult.data.length - 1,
                    ),
                  });
                  //if (this.state.barcode != '') this.Nextscreen();
                } else {
                  this.setState({ barcode: scanResult.data });
                  //if (this.state.barcode != '') this.Nextscreen();
                }
              });
            }
          });
        }
      });

      if (this.state.barcode != '') this.Nextscreen();
    } else {
      var ScannedBarcodeResult = '';
      if (scanResult.data.length > 12)
        ScannedBarcodeResult = scanResult.data.substring(
          scanResult.data.length - 12,
        );

      // scanned result UPCA
      this.state.barCodeScanned = false;
      AsyncStorage.getItem('UAUE').then((UAUE) => {
        if (UAUE == '1') {
          //this.refs.loading.show();

          fetch(
            API_BASE_URL +
            `convertupca2upce?upc=${encodeURIComponent(
              ScannedBarcodeResult,
            )}`,
            {
              method: 'GET',
            },
          )
            .then((response) => response.json())
            .then((responseJson) => {
              // this.refs.loading.show(false);
              if (responseJson.status == 'success') {
                AsyncStorage.getItem('UPCEL').then((UPCEL) => {
                  if (UPCEL == '1') {
                    AsyncStorage.getItem('UPCER').then((UPCER) => {
                      if (UPCER == '1') {
                        this.setState({
                          barcode: responseJson.data.substring(
                            1,
                            responseJson.data.length - 1,
                          ),
                        });
                        if (this.state.barcode != '') this.Nextscreen();
                      } else {
                        this.setState({
                          barcode: responseJson.data.substring(1),
                        });
                        if (this.state.barcode != '') this.Nextscreen();
                      }
                    });
                  } else {
                    AsyncStorage.getItem('UPCER').then((UPCER) => {
                      if (UPCER == '1') {
                        this.setState({
                          barcode: responseJson.data.substring(
                            0,
                            responseJson.data.length - 1,
                          ),
                        });
                        if (this.state.barcode != '') this.Nextscreen();
                      } else {
                        this.setState({ barcode: responseJson.data });
                        if (this.state.barcode != '') this.Nextscreen();
                      }
                    });
                  }
                });
              } else if (responseJson.status == 'error') {
                //this.setState({'barcode' : responseJson.data})
                Alert.alert('', responseJson.message, [
                  { text: 'OK', onPress: () => this.cancelAlert() },
                ]);
              }
            })
            .catch((error) => {
              console.error(error);
            });
        } else {
          AsyncStorage.getItem('UPCAL').then((UPCAL) => {
            if (UPCAL == '1') {
              AsyncStorage.getItem('UPCAR').then((UPCAR) => {
                if (UPCAR == '1') {
                  this.setState({
                    barcode: ScannedBarcodeResult.substring(
                      1,
                      ScannedBarcodeResult.length - 1,
                    ),
                  });
                  if (this.state.barcode != '') this.Nextscreen();
                } else {
                  this.setState({ barcode: ScannedBarcodeResult.substring(1) });
                  if (this.state.barcode != '') this.Nextscreen();
                }
              });
            } else {
              AsyncStorage.getItem('UPCAR').then((UPCAR) => {
                if (UPCAR == '1') {
                  this.setState({
                    barcode: ScannedBarcodeResult.substring(
                      0,
                      ScannedBarcodeResult.length - 1,
                    ),
                  });
                  if (this.state.barcode != '') this.Nextscreen();
                } else {
                  this.setState({ barcode: ScannedBarcodeResult });
                  if (this.state.barcode != '') this.Nextscreen();
                }
              });
            }
          });
        }
      });

      //if (this.state.barcode != '') this.Nextscreen();
    }
  }

  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
          {/* <NavigationEvents onDidFocus={() => this.componentDidMount()} /> */}

          <View style={{ width: '100%' }}>
            <ImageBackground
              source={require('../../assets/images/header.jpeg')}
              style={{ position: 'relative', height: 100, paddingTop: 20 }}>
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
                  onPress={() =>
                    this.props.navigation.navigate('AddNewReceivingOrder')
                  }>
                  Receiving Order
                </Text>
              </View>
            </ImageBackground>
          </View>

          <View stye={{ marginTop: 30 }}>
            <View style={{ margin: 5 }}>
              <SearchableDropdown
                // onTextChange={qoh => this.setState({ qoh })}

                onTextChange={(qoh) => this.setState({ qoh })}
                onItemSelect={(item) => {
                  (this.state.barcode = item.vbarcode),
                    (this.state.itemname = item.name),
                    (resetValue = true),
                    this.Nextscreen();
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
                // placeholderTextColor=""
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
                // ref={input => { this.vendorItemCode = input }}
                value={this.state.vendorItemCode}
                placeholder="Enter Vendor Code"
                placeholderTextColor="Black"
                returnKeyType="done"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                onChangeText={(vendorItemCode) => this.setState({ vendorItemCode })}
                onSubmitEditing={() => this.vendorItemCodeMethod()}
              />
            </View>

            <View style={{ margin: 5 }}>
              <TextInput
                style={styles.textBox1}
                ref={(input) => {
                  this.barcode = input;
                }}
                // style={styles.input}
                placeholder="Enter Barcode"
                placeholderTextColor="Black"
                returnKeyType="done"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={false}
                value={this.state.barcode}
                onChangeText={(barcode) => this.setState({ barcode })}
                onSubmitEditing={() => this.screen()}
              />
            </View>

            <CardView
              cardElevation={6}
              cardMaxElevation={1}
              cornerRadius={3}
              style={{ margin: 10 }}>
              <RNCamera
                ref={(ref) => {
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
                permissionDialogMessage={
                  'We need your permission to use your camera phone'
                }
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
            <Loading show={true / false} />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = {
  container: {
    flex: 1,
    width: '100%',
    flexDirection: 'column',
    backgroundColor: '#fff',
  },
  preview: {
    // width: this.maskLength,
    height: 200,
    alignItems: 'center',
  },

  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  contentRow: {
    flexDirection: 'row',
  },

  content: {
    borderWidth: 2,
    borderColor: 'green',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    //width: 250,
    alignSelf: 'stretch',
    height: 40,
    width: '90%',
    marginStart: 10,
    borderRadius: 3,
    backgroundColor: '#636466',
    marginBottom: 10,
    color: '#fff',
    fontSize: 15,
    paddingHorizontal: 20,
  },
  input1: {
    //width: 250,

    alignSelf: 'stretch',
    height: 40,
    width: '90%',
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
    alignItems: 'center',
  },
  enterBarcodeManualButton: {
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 40,
  },
  scanScreenMessage: {
    fontSize: 14,
    color: 'white',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
