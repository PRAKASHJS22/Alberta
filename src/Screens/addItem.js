import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View,
  TouchableOpacity, Image, TextInput, Vibration, Dimensions, Alert, ImageBackground, SafeAreaView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-cardview';
import Loading from 'react-native-whc-loading'
import { RNCamera } from 'react-native-camera';
import { ScrollView } from 'react-native-gesture-handler';
// import { NavigationEvents } from 'react-navigation'
import AsyncStorage from '@react-native-community/async-storage';
import SearchableDropdown from 'react-native-searchable-dropdown';


export default class AddItem extends Component {

  // static navigationOptions = {
  //   headerTitle: (
  //     <View style={{ flex: 1, alignItems: "center", marginRight: 20 }}>
  //       <Image source={require('../images/poslogo.jpg')}
  //         style={{ height: 100, width: 100, resizeMode: 'contain' }} />
  //     </View>
  //   ),

  // }
  componentDidMount() {
    this.barcode.clear()
    this.setState({ 'barcode': "" })
    this.state.barCodeScanned = true
    this.state.itemname = ""
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
    if (this.state.barcode == "") {
      return
    }

    this.state.barCodeScanned = false;
    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem("Sid").then(sid => {
        if (data) {

          // https://devportal.albertapayments.com/api/admin/addbarcode?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjQsImlzcyI6Imh0dHBzOlwvXC9kZXZwb3J0YWwuYWxiZXJ0YXBheW1lbnRzLmNvbVwvYXV0aGVudGljYXRlX25ldyIsImlhdCI6MTU3NDI1MzI0NiwiZXhwIjoxNTc2ODQ1MjQ2LCJuYmYiOjE1NzQyNTMyNDYsImp0aSI6Ijk3MjQ4NWFmYjVlNDU1MGUyOGNhZTRiMGU0YmRhZDMxIn0.caUsX2eSEC9fO7wGZfxmUW7_wgiDtyfFVOTy2MEc6zI&sid=1001&barcode=60265219977
          this.refs.loading.show();
          fetch(API_BASE_URL + `admin/checkPriceBySKU_new?sku=${this.state.barcode}&token=${encodeURIComponent(data)}&sid=${sid}`, {
            method: 'GET',

          }).then((response) => response.json())
            .then((responseJson) => {
              this.refs.loading.show(false);
              if (responseJson.status == "success") {
                var SampleNameArray = responseJson.data[0].vitemname
                var nbottledepositamt = responseJson.data[0].nbottledepositamt
                var SampleNameArray1 = responseJson.data[0].dcostprice
                var selling_price = responseJson.data[0].dunitprice
                var qty_on_hand = responseJson.data[0].iqtyonhand
                var tax1 = responseJson.data[0].vtax1
                var tax2 = responseJson.data[0].vtax2
                var tax3 = responseJson.data[0].vtax3
                var department = responseJson.data[0].department
                var category = responseJson.data[0].category
                var supplier = responseJson.data[0].supplier
                var selling_unit = responseJson.data[0].dunitprice
                var age_verification = responseJson.data[0].vageverify
                var food_stamp = responseJson.data[0].vfooditem
                var WIC_item = responseJson.data[0].WIC_item
                var barcode = responseJson.data[0].vbarcode
                var visinventory = responseJson.data[0].visinventory
                var vdepartmentname = responseJson.data[0].vdepartmentname
                var vcategoryname = responseJson.data[0].vcategoryname
                var vcompanyname = responseJson.data[0].vcompanyname
                var vdepcode = responseJson.data[0].vdepcode
                var vcategorycode = responseJson.data[0].vcategorycode
                var vsuppliercode = responseJson.data[0].vsuppliercode
                var vsubcategoryname = responseJson.data[0].subcat_name
                var vsubcategorycode = responseJson.data[0].subcat_id
                var vunitcode = responseJson.data[0].vunitcode
                var vsize = responseJson.data[0].vsize
                var manufacturer_id = responseJson.data[0].manufacturer_id
                var addItem = "addItem"


                this.props.navigation.navigate('AddNewItem',
                  {
                    addItem: addItem,
                    item: SampleNameArray,
                    cost: SampleNameArray1,
                    sellingPrice: selling_price,
                    qty_on_hand: qty_on_hand,
                    department: department,
                    category: category,
                    supplier: supplier,
                    selling_unit: selling_unit,
                    age_verification: age_verification,
                    food_stamp: food_stamp,
                    barcode: barcode,
                    visinventory: visinventory,
                    tax1: tax1,
                    tax2: tax2,
                    tax3: tax3,
                    vdepartmentname: vdepartmentname,
                    vcategoryname: vcategoryname,
                    vcompanyname: vcompanyname,
                    vdepcode: vdepcode,
                    vcategorycode: vcategorycode,
                    vsuppliercode: vsuppliercode,
                    vsubcategoryname: vsubcategoryname,
                    vsubcategorycode: vsubcategorycode,
                    nbottledepositamt: nbottledepositamt,
                    vunitcode: vunitcode,
                    vsize: vsize,
                    manufacturer_id: manufacturer_id
                  })

                //   this.props.navigation.navigate('AddItem');

              }
              else if (responseJson.error) {
                this.NplItemScreen();
              }
              // else if (responseJson.data[0].subcat_name == null) {
              //   alert("testing")
              // }
              else { }
            })
            .catch((error) => {
              Alert.alert(

                '',
                'Something went wrong! Please try again later!!!!',
                [
                  { text: 'OK', },
                ]
              )
              // this.state.barCodeScanned = true;
            });
        }
      })
    });
    // this.barcode.clear()
  }

  NplItemScreen = () => {

    AsyncStorage.getItem('token').then((data) => {
      if (data) {
        fetch(API_BASE_URL + `admin/getItemBySKU_new?sku=${this.state.barcode}&token=${encodeURIComponent(data)}`, {
          method: 'GET',
        }).then((response) => response.json())
          .then((responseJson) => {
            if (responseJson.status == "success") {
              Alert.alert(
                'No Item found',
                'Do you Want to download data from NPL',
                [
                  {
                    text: 'No', onPress: () => this.cancelAlert(),
                    style: 'cancel',
                  },
                  { text: 'Add data from NPL', onPress: () => this.abc() },
                  { text: 'Add data Manually', onPress: () => this.abcd() },
                ],
                { cancelable: false },
              );
            }
            if (responseJson.message == "Item not found in NPL") {
              Alert.alert(
                'No Item found',
                'Do you Want to Add Item Manually',
                [

                  { text: 'Yes', onPress: () => this.abcd() },

                  {
                    text: 'Cancel', onPress: () => this.cancelAlert(),
                    style: 'cancel',
                  },

                ],
                { cancelable: false },

              );
              // Alert.alert(
              //   'No Item found',
              //   'Do you Want to download data from NPL',
              //   [

              //     { text: 'Add data from NPL', onPress: () => this.abc() },


              //     { text: 'Add data Manually', onPress: () => this.abcd() },

              //     {
              //       text: 'No',
              //       style: 'cancel',
              //     },

              //   ],
              //   { cancelable: false },

              // );
            }
            else { }
          })

          .catch((error) => {
            Alert.alert(

              '',
              'Something went wrong! Please try again later!!!!',
              [
                { text: 'OK', },
              ]
            )
          });
      }
      // this.barcode.clear()

    });
  }

  abc = () => {

    AsyncStorage.getItem('token').then((data) => {

      if (data) {
        fetch(API_BASE_URL + `admin/getItemBySKU_new?sku=${this.state.barcode}&token=${encodeURIComponent(data)}`, {
          method: 'GET',
        }).then((response) => response.json())
          .then((responseJson) => {

            var SampleNameArray = responseJson.data.item_name
            var SampleNameArray1 = responseJson.data.cost
            var selling_price = responseJson.data.dunitprice
            var qty_on_hand = responseJson.data.qty_on_hand
            var tax1 = responseJson.data.tax1
            var tax2 = responseJson.data.tax2
            var department = responseJson.data.department
            var category = responseJson.data.category
            var supplier = responseJson.data.supplier
            var selling_unit = responseJson.data.selling_price
            var age_verification = responseJson.data.age_verification
            var food_stamp = responseJson.data.food_stamp
            var WIC_item = responseJson.data.WIC_item
            var barcode = responseJson.data.barcode

            // var SampleNameArray = responseJson.data.vitemname
            // var qty_on_hand = responseJson.data.iqtyonhand
            // var barcode = responseJson.data.vbarcode
            // var tax1 = responseJson.data.vtax1
            // var tax2 = responseJson.data.vtax2
            // var selling_unit = responseJson.data.dcostprice
            // var selling_price = responseJson.data.dunitprice
            // var department = responseJson.data.vdepartmentname
            // var category = responseJson.data.vcategoryname
            // var supplier = responseJson.data.vsuppliercode
            // var age_verification = responseJson.data.vageverify
            // var food_stamp = responseJson.data.vfooditem
            var nplItem = "nplItem"
            this.props.navigation.navigate('NPLAddItem',
              {
                nplItem: nplItem,
                item: SampleNameArray,
                cost: SampleNameArray1,
                sellingPrice: selling_price,
                qty_on_hand: qty_on_hand,
                department: department,
                category: category,
                supplier: supplier,
                selling_unit: selling_unit,
                age_verification: age_verification,
                food_stamp: food_stamp,
                barcode: barcode,
                tax1: tax1,
                tax2: tax2,
                // item: SampleNameArray,
                // cost: SampleNameArray1,
                // sellingPrice: selling_price,
                // qty_on_hand: qty_on_hand,
                // food_stamp: food_stamp,
                // barcode: barcode,
                // // selling_unit: selling_unit,
                // age_verification: age_verification,
                // tax1: tax1,
                // tax2: tax2,
                // vdepartmentname: vdepartmentname,
                // vcategoryname: vcategoryname,
                // vsuppliercode: vsuppliercode,
              })

          })
      }
    })
  }
  abcd = () => {

    // AsyncStorage.getItem("token").then(data => {
    //   // alert(this.state.categoryHolder)
    //   AsyncStorage.getItem("Sid").then(sid => {
    //     if (sid) {
    //       if (data) {
    //         fetch(
    //           API_BASE_URL + `admin/taxinfo?token=${data}&sid=${sid}`,
    //           {
    //             method: "POST",
    //             headers: {
    //               Accept: "application/json",
    //               "Content-Type": "application/json"
    //             },
    //           }
    //         )
    //           .then(response => response.json())
    //           .then(responseJson => {

    //             if (responseJson.success) {

    //               var bCodePass = this.state.barcode
    //               var tax3 = responseJson.success



    //               this.props.navigation.navigate('NPLBlankResponse',
    //                 {
    //                   barcodePass: bCodePass,
    //                   tax3: tax3
    //                 })



    //             }

    //             else {

    //               var bCodePass = this.state.barcode


    //               this.props.navigation.navigate('NPLBlankResponse',
    //                 {
    //                   barcodePass: bCodePass,

    //                 })





    //             }







    //           })

    //           .catch(error => {
    //             console.error(error);
    //           });
    //       }
    //     }
    //   });
    // });
    var bCodePass = this.state.barcode
    this.props.navigation.navigate('NPLBlankResponse',
      {
        barcodePass: bCodePass,

      })

    // this.props.navigation.navigate('NPLBlankResponse')


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
      <SafeAreaView >
        {/* <NavigationEvents onDidFocus={() => this.componentDidMount()} /> */}
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
              <Text style={{ color: 'white', fontSize: 15, paddingHorizontal: 8, paddingVertical: 3 }} onPress={() => this.props.navigation.navigate('Items')}>Add/Edit Item</Text>

            </View>
          </ImageBackground>
        </View>


        <View style={{ marginTop: 10 }}>
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
            placeholder="Enter Items Name"
            placeholderTextColor="gray"
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
            barcodeFinderBorderWidth={5}
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
