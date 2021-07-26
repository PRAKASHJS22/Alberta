import React, { Component } from 'react';
import {
  Platform, StyleSheet, Text, View,
  TouchableOpacity, Image, TextInput, AsyncStorage, Vibration, Dimensions, Alert, ImageBackground, SafeAreaView
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CardView from 'react-native-cardview';
import Loading from 'react-native-whc-loading'
import { RNCamera } from 'react-native-camera';
import { ScrollView } from 'react-native-gesture-handler';
// import { NavigationEvents } from 'react-navigation'
import SearchableDropdown from 'react-native-searchable-dropdown';


export default class ItemMov extends Component {

  constructor(props) {
    super(props);
    let { width } = Dimensions.get('window');
    this.maskLength = (width * 85) / 100;
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



  render() {
    return (
      <SafeAreaView>
        <View style={styles.container}>



          <View style={{ width: '100%' }}>
            <ImageBackground
              source={require('../../assets/images/header.jpeg')}
              style={{ position: 'relative', height: 80, paddingTop: 20 }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  paddingVertical: 10,
                  paddingHorizontal: 20
                }}>
                <Text style={{ color: 'white' }} onPress={() => this.props.navigation.navigate('Reports')}>Item Movement</Text>

              </View>
            </ImageBackground>
          </View>

          <View style={{ marginTop: 20 }}>
            <View >
              <TextInput
                style={styles.textBox1}
                underlineColorAndroid="transparent"
                placeholder="Email"
                placeholderTextColor="#ccc"
                // returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={(email) => this.setState({ email, emailError: '' })}
              />

            </View>
            <View >
              <TextInput
                style={styles.textBox1}
                underlineColorAndroid="transparent"
                placeholder="Barcode"
                placeholderTextColor="#ccc"
                // returnKeyType="next"
                keyboardType="default"
                autoCapitalize="none"
                autoCorrect={true}
                onChangeText={(email) => this.setState({ email, emailError: '' })}
              />

            </View>
          </View>


          {/* <View style={{ margin: 5 }}>
          <TextInput
            ref={input => { this.barcode = input }}
            style={styles.input}
            placeholder="Enter Barcode"
            placeholderTextColor='white'
            returnKeyType="done"
            keyboardType="numeric"
            autoCapitalize="none"
            autoCorrect={false} />

        </View> */}

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
            // onBarCodeRead={this.onBarCodeRead.bind(this)}
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
      </SafeAreaView>
      // </ScrollView>
    );
  }
}



const styles = {
  container: {
    // flex: 1,
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
    paddingLeft: 38,
    width: '90%',
    borderBottomWidth: 0,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 1,
    elevation: 2,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 20,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    marginLeft: 20
  },
};
