import React, { Component } from 'react';
import {
    StyleSheet, TextInput, Text, KeyboardAvoidingView, View, Image, TouchableOpacity,
    ScrollView, ActivityIndicator, AsyncStorage, Picker, PickerIOS, Alert, Keyboard
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import { CheckBox } from 'react-native-elements'
import Entypo from 'react-native-vector-icons/AntDesign';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import RadioForm, { RadioButton, RadioButtonInput, RadioButtonLabel } from 'react-native-simple-radio-button';
import { Dropdown } from 'react-native-material-dropdown';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default class NPLBlankResponse extends React.Component {

    testArray = [
        { label: 'Yes                     ', value: 0 },
        { label: 'No                     ', value: 1 }
    ];
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
            isLoading: true,
            PickerValueHolder: '',
            categoryHolder: "",
            supplierHolder: "",
            catdata: [],
            supdata: [],
            data: [],
            cost: "0.00",
            item: "",
            sellingPrice: "0.00",
            qty_on_hand: "",
            department: "",
            category: "",
            supplier: "",
            selling_unit: "",
            age_verification: "",
            food_stamp: "",
            barcode: "",
            isInventery: "",
            tax1: "",
            tax2: "",
            tax3: "",
            taxValue: "",
            nonTaxable: "",
            foodItem: "",
            Dcheck: "",
            Ccheck: "",
            Scheck: "",
            InventoryDataHolder: "",
            ageverificationArray: [],
            subcategory: "",
            subcategortdata: [],
            subcategoryHolder: "",
            taxArray: [],
            nbottledepositamt: "",
            sizeTypeArray: [],
            sizeArrayValue : "",
            ManufacturerArray: [],
            ManufacturerValue : "",
            unitArray: [],
            unitValue : "",
        }
    }


    componentDidMount() {
        this.props.navigation.setParams({onPressMethod: this.saveNPLItemDetails });
        const barcode = this.props.navigation.getParam('barcodePass');
        this.setState({ barcode: barcode })


        this.setState({
            tax1: "Y",
            tax2: "N",
            tax3:"N",
            unitValue: "UNT001",
            sizeArrayValue:"",
            ManufacturerValue: ""
            // nonTaxable: "N"
        })
        // const tax3 = this.props.navigation.getParam('tax3');
        // this.setState({ tax3: tax3 })





        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
                if (data) {
                    return fetch(API_BASE_URL + `admin/department/list/${SID}?token=${encodeURIComponent(data)}`)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                isLoading: false,
                                data: responseJson.data,

                            }, function () {
                                // In this block you can do something with new state.
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
        })
        // this.setState({ deptHolder: this.state.deptHolder })
        // alert(this.state.deptHolder)
        this.setState({ categoryHolder: this.state.categoryHolder })
        // alert(this.state.categoryHolder)
        this.getCategoryList(1, 1)

        this.setState({ subcategoryHolder: this.state.subcategortdata })
        // alert(this.state.categoryHolder)
        this.getSubCategoryList(1, 1)



        AsyncStorage.getItem('token').then((data) => {

            AsyncStorage.getItem('Sid').then((SID) => {
                if (data) {
                    return fetch(API_BASE_URL + `admin/vendor/list/${SID}?token=${encodeURIComponent(data)}`)
                        .then((response) => response.json())
                        .then((responseJson) => {

                            this.setState({
                                isLoading: false,
                                supdata: responseJson.data
                            }, function () {
                                // In this block you can do something with new state.
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
        })

        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
                if (data) {
                    return fetch(API_BASE_URL + `admin/size/list/${SID}?token=${encodeURIComponent(data)}`)
                        .then((response) => response.json())
                        .then((responseJson) => {

                            this.setState({
                                isLoading: false,
                                sizeTypeArray: responseJson.data
                            }, function () {
                                // In this block you can do something with new state.
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
        })


        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
                if (data) {
                    return fetch(API_BASE_URL + `admin/manufacture/list/${SID}?token=${encodeURIComponent(data)}`)
                        .then((response) => response.json())
                        .then((responseJson) => {

                            this.setState({
                                isLoading: false,
                                ManufacturerArray: responseJson.data
                            }, function () {
                                // In this block you can do something with new state.
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
        })

        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
                if (data) {
                    return fetch(API_BASE_URL + `admin/unit/list/${SID}?token=${encodeURIComponent(data)}`)
                        .then((response) => response.json())
                        .then((responseJson) => {

                            this.setState({
                                isLoading: false,
                                unitArray: responseJson.data
                            }, function () {
                                // In this block you can do something with new state.
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
        })

        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
                if (data) {
                    return fetch(API_BASE_URL + `admin/ageverification/list/${SID}?token=${encodeURIComponent(data)}`)
                        .then((response) => response.json())
                        .then((responseJson) => {

                            this.setState({
                                isLoading: false,
                                ageverificationArray: responseJson.data
                            }, function () {
                                // In this block you can do something with new state.
                            });
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
        })

    
    }



    getCategoryList = (deparmentID, isLoad = 0) => {


       

        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
           
                if (data) {
                    return fetch(API_BASE_URL + `admin/category/list/${SID}/${deparmentID}?token=${encodeURIComponent(data)}`)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            this.setState({
                                isLoading: false,
                                catdata: responseJson.data,
                                categoryHolder: '',
                                deptHolder: deparmentID,
                            }, function () {
                                // In this block you can do something with new state.
                            });

                            if (isLoad == 1) {
                                this.setState({ categoryHolder: '1' })
                                this.setState({ deptHolder: '1' })
                                this.setState({ supplierHolder: '101' })
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
        })



    }
    getSubCategoryList = (subCategoryID, isLoad = 0) => {

        // this.state.vcategoryname = ""
        // this.state.categoryHolder = ""
        // this.setState({ deptHolder: deparmentID })
        // this.setState({ categoryHolder: this.state.categoryHolder })



        AsyncStorage.getItem('token').then((data) => {
            AsyncStorage.getItem('Sid').then((SID) => {
                if (data) {

                    return fetch(API_BASE_URL + `admin/subcategorysid?category_id=${subCategoryID}&sid=${SID}&token=${encodeURIComponent(data)}`)

                        .then((response) => response.json())
                        .then((responseJson) => {


                            this.setState({
                                isLoading: false,
                                subcategortdata: responseJson.data,
                                subcategoryHolder: ''
                            }, function () {
                                // In this block you can do something with new state.
                            });
                            if (isLoad == 1) {
                                this.setState({ subcategoryHolder: 'General' })
                            }
                        })
                        .catch((error) => {
                            console.error(error);
                        });
                }
            })
        })




    }


    // GetPickerSelectedItemValue = () => {

    //     Alert.alert(this.state.PickerValueHolder);

    // }

    saveNPLItemDetails = (deparmentID) => {

        if (this.state.foodItem == 0) {
            this.state.foodItem = "Y"
        }

        if (this.state.foodItem == 1) {
            this.state.foodItem = "N"

        }

       




        AsyncStorage.getItem('token').then((data) => {

            AsyncStorage.getItem("Sid").then(sid => {

               


                if (sid) {
                    if (data) {
                        this.setState(
                            {
                                isLoading: true,
                            },
                        )

                        fetch(API_BASE_URL + `admin/insert/item/customer?token=${encodeURIComponent(data)}`, {
                            method: 'POST',
                            headers: {
                                Accept: 'application/json',
                                'Content-Type': 'application/json',
                            },
                            body: JSON.stringify({

                                sku: this.state.barCodeNumber,
                                "sid": sid,
                                item_name: this.state.item,
                                "cost": this.state.cost,
                                "barcode": this.state.barcode,
                                "selling_price": this.state.sellingPrice,
                                "qty_on_hand": this.state.qty_on_hand,
                                "department_code": this.state.deptHolder,
                                "category_code": this.state.categoryHolder,
                                subcat_id: this.state.subcategoryHolder,
                                "supplier_code": this.state.supplierHolder,
                                "age_verification": this.state.age_verification,
                                "is_inventory": "YES",
                                "food_stamp": this.state.foodItem,
                                "tax1": this.state.tax1,
                                "tax2": this.state.tax2,
                                "tax3": this.state.tax3,
                                "nbottledepositamt": this.state.nbottledepositamt,
                                "size" :this.state.sizeArrayValue,
                                "vunitcode" :this.state.unitValue,
                                "manufacturer_id" :this.state.ManufacturerValue
                            
                                
                                

                            }
                            
                            
                            
                            ),
                            
                          
                        })
                        
                        .then((response) => response.json())
                            .then((responseJson) => {

                                this.setState(
                                    {
                                        isLoading: false,
                                    },
                                )

                                if (responseJson.message) {
                                    alert(responseJson.message)
                                }

                                if (responseJson.success) {
                                    Alert.alert(
                                        responseJson.success,
                                        '',
                                        [
                                            { text: 'OK', onPress: () => this.cancelBtnPress() },

                                        ]
                                    )

                                }
                                if (responseJson.error) {
                                    alert(responseJson.error)
                                    return;
                                }
                            })
                            .catch((error) => {
                                console.error(error);
                            });
                    }
                }
            })
        });
    }
    cancelBtnPress = () => {
        this.props.navigation.navigate('Barcodeadditem');

    }

    keyboardHidefunction = () => {

        Keyboard.dismiss()

    }

    ConTwoDecDigit=(digit)=>{
        return digit.indexOf(".")>0?
                digit.split(".").length>=2?
                 digit.split(".")[0]+"."+digit.split(".")[1].substring(-1,2)
                : digit
               : digit
      }


    getTaxlist = (index) => {

        if(index == 0){

            this.setState({
                tax1 :"Y",
                tax2: "N",
                tax3:"N",
             //   nonTaxable: "N"
            })
        }

        if(index == 1){

            this.setState({
                tax1 :"N",
                tax2: "Y",
                tax3:"N",
              //  nonTaxable: "N"
            })
        }
        if(index == 2){

            this.setState({
                tax1 :"N",
                tax2: "N",
                tax3:"Y",
              //  nonTaxable: "N"
            })
        }
        if(index == 3){

            this.setState({
                tax1 :"N",
                tax2: "N",
                tax3:"N",
              //  nonTaxable: "Y"
            })
        }
    }


    render() {

        this.state.taxArray = [
            {
                value: "Y",
                label: 'Tax1'
            },
            {
                value: "1",
                label: 'Tax2',
            },
            {
                value: "2",
                label: 'Tax3',
            },
            {
                value:  "3",
                label: 'Non Taxable',
            },
        ];
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, paddingTop: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }

        // let InventoryData = [{
        //     value: 'YES',
        // }, {
        //     value: 'NO',
        // }];

        const { tax3 } = this.state


        return (
            <View style={styles.MainContainer}>
                {/* <KeyboardAwareScrollView> */}

                    <View style={{ marginTop: 5, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
                        <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>Add Item</Text>
                    </View>
                    <ScrollView>
                        <View style={styles.logocontainer}>
                            <View style={{
                                width: "40%"
                            }}>
                                <Text style={styles.setTextSize}>Item Name <Text style ={styles.setStarTextSize}>*</Text> </Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}>
                                <TextInput
                                    style={styles.input}
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.item}
                                    onChangeText={item => this.setState({ item })}
                                >
                                </TextInput>
                            </View>

                        </View>

                    
                        <View style={styles.logocontainer}>
                            <View
                                style={{
                                    width: "40%"
                                }}>
                                <Text style={styles.setTextSize}>Bar Code <Text style ={styles.setStarTextSize}>*</Text> </Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}>
                                <TextInput
                                    style={styles.input}
                                    returnKeyType="next"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    value={this.state.barcode}
                                >
                                </TextInput>
                            </View>
                        </View>

                     

                        <View style={styles.logocontainer}>
                            <View
                                style={{
                                    width: "40%"
                                }}>
                                <Text style={styles.setTextSize}>Cost <Text style ={styles.setStarTextSize}>*</Text> </Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}>
                                <TextInput
                                    style={styles.input}
                                    returnKeyType="done"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    onSubmitEditing={() => this.keyboardHidefunction()}  
                                    autoCorrect={false}
                                    keyboardType="numeric"
                                    value={this.state.cost}
                                     onEndEditing={
                                        text => {
                                       

                                             this.setState({
                                                 cost: (parseFloat(this.state.cost)).toFixed(2)
                                             })                                               
                                    
                                }
                            }
                                
                                    onChangeText={cost => this.setState({ cost : this.ConTwoDecDigit(cost) })}
                                >
                                </TextInput>
                            </View>

                        </View>

                        <View style={styles.logocontainer}>
                            <View
                                style={{
                                    width: "40%"
                                }}>

                                <Text style={styles.setTextSize}>Price <Text style ={styles.setStarTextSize}>*</Text> </Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}>
                                <TextInput
                                    style={styles.input}
                                    returnKeyType="done"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onSubmitEditing={() => this.keyboardHidefunction()}  
                                    keyboardType="numeric"
                                    value={this.state.sellingPrice}
                                    onEndEditing={
                                        text => {
                                     
                                           this.setState({
                                                sellingPrice: (parseFloat(this.state.sellingPrice)).toFixed(2)
                                             })                                               
                                    
                                }
                            }
                                    onChangeText={sellingPrice => this.setState({ sellingPrice : this.ConTwoDecDigit(sellingPrice) })}
                                >
                                </TextInput>
                            </View >
                        </View>

                        <View style={styles.logocontainer}>
                                        <View
                                            style={{
                                                width: "40%"
                                            }}
                                        >
                                            <Text style={styles.setDepartmentTextSize}>Unit  <Text style ={styles.setStarTextSize}>*</Text> </Text>
                                        </View>
                                        <View
                                            style={{
                                                width: "60%"


                                            }}
                                        >
                                            <Dropdown
                                                label=""
                                                data={this.state.unitArray}
                                                value={this.state.unitValue}
                                                // selectedValue={this.state.deptHolder}
                                                itemTextStyle="bold"
                                                labelFontSize={16}
                                                dropdownOffset={{ top: 12, left: 25 }}
                                                fontSize={16}
                                                height = {12}
                                                shadeOpacity="2.0"
                                                containerStyle={styles.input}
                                                onChangeText={(value, index) =>
                                                    this.setState({ unitValue: value })
                                                }

                                                // onChangeText={(value, index) =>
                                                //     this.setState({ taxvalue: value })
                                                // }
                                            />
                                        </View>
                                    </View>


                        <View style={styles.logocontainer} >
                            <View
                                style={{
                                    width: "40%"
                                }}>

                                <Text style={styles.setDepartmentTextSize}>Department  <Text style ={styles.setStarTextSize}>*</Text> </Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}>
                                <Dropdown
                                    label='Select Department'
                                    data={this.state.data}
                                    // value={this.state.Dcheck}
                                    selectedValue={this.state.deptHolder}
                                    value={'1'}
                                    itemTextStyle="bold"
                                    labelFontSize={16}
                                    fontSize={16}
                                    shadeOpacity="2.0"
                                    containerStyle={styles.inputt}
                                    onChangeText={(value, index) =>
                                        this.getCategoryList(value)
                                    }
                                />
                            </View >
                        </View>


                        <View style={styles.logocontainer}  >
                            <View
                                style={{
                                    width: "40%"
                                }}>

                                <Text style={styles.setDepartmentTextSize}>Category  <Text style ={styles.setStarTextSize}>*</Text> </Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}>
                                {<Dropdown
                                    label='Select Category'
                                    data={this.state.catdata}
                                    selectedValue={this.state.categoryHolder}

                                    itemTextStyle="bold"
                                    labelFontSize={16}
                                    fontSize={16}
                                    value={this.state.categoryHolder}
                                    containerStyle={styles.inputt}
                                    onChangeText={(value, index) =>
                                        this.setState({ categoryHolder: value },
                                            this.getSubCategoryList(value)

                                        )
                                    }
                                />}
                            </View>
                        </View>
                        {/* <View style={styles.logocontainer}  >
                            <Text style={styles.setDepartmentTextSize}>Sub category</Text>
                            <Dropdown
                                label='Select Sub-Category'
                                data={this.state.subcategortdata}
                                // value={this.state.vdepartmentname}
                                selectedValue={this.state.subcategoryHolder}
                                itemTextStyle="bold"
                                labelFontSize={16}
                                fontSize={16}
                                value={this.state.subcategoryHolder}
                                shadeOpacity="2.0"
                                containerStyle={{ flex: 1, width: "70%", borderColor: "transparent", marginLeft: 30, marginTop: 0, marginRight: 10 }}
                                onChangeText={(value, index) =>
                                    this.setState({ subcategoryHolder: value })


                                }

                            />
                        </View> */}

                        {/* Sub category starts*/}

                        {showcategary ? <View style={styles.logocontainer}>
                            <View
                                style={{
                                    width: "40%"
                                }}
                            >
                                <Text style={styles.setDepartmentTextSize}>Sub category</Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}
                            >
                                <Dropdown
                                    label="Select Sub-Category"
                                    data={this.state.subcategortdata}
                                    // value={this.state.vsubcategoryname}
                                    value={this.state.subcategoryHolder}
                                    itemTextStyle="bold"
                                    labelFontSize={16}
                                    fontSize={16}
                                    shadeOpacity="2.0"
                                    containerStyle={styles.inputt}
                                    onChangeText={(value, index) =>
                                        this.setState({
                                            subcategoryHolder: value
                                        })
                                    }
                                />
                            </View>
                        </View>
                            : <View></View>}

                        <View style={styles.logocontainer}  >
                            <View
                                style={{
                                    width: "40%"
                                }}>
                                <Text style={styles.setDepartmentTextSize}>Supplier  <Text style ={styles.setStarTextSize}>*</Text> </Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}>
                                {<Dropdown
                                    label='Select Supplier'
                                    data={this.state.supdata}
                                    // value={this.state.Scheck}
                                    value={'101'}
                                    // selectedValue={this.state.data.value}
                                    itemTextStyle="bold"
                                    labelFontSize={16}
                                    fontSize={16}
                                    selectedValue={this.state.supplierHolder}
                                    containerStyle={styles.inputt}
                                    onChangeText={(value, index) =>
                                        this.setState({ supplierHolder: value })
                                    }
                                />}
                            </View>
                        </View>
                        {/* <View style={styles.logocontainer}>
                            <View
                                style={{
                                    width: "40%"
                                }}>
                                <Text style={styles.setTextSize}>Inventory Item</Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}>
                                <Dropdown
                                    label=''
                                    data={InventoryData}
                                    selectedValue={this.state.InventoryDataHolder}
                                    itemTextStyle="bold"
                                    labelFontSize={16}
                                    dropdownOffset={{ top: 8, left: 25 }}
                                    fontSize={16}
                                    height = {10}
                                    shadeOpacity="2.0"
                                 //   containerStyle={styles.input}
                                    containerStyle={styles.input}
                                    onChangeText={(value, index) =>
                                        this.setState({ InventoryDataHolder: value })
                                    }
                                />
                            </View>
                        </View> */}
                        <View style={styles.logocontainer}>
                            <View
                                style={{
                                    width: "40%"
                                }}>
                                <Text style={styles.setTextSize}>QOH</Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}>
                                <TextInput
                                    style={styles.input}
                                    returnKeyType="done"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    autoCorrect={false}
                                    onSubmitEditing={() => this.keyboardHidefunction()}  
                                    keyboardType="numeric"
                                    value={this.state.qty_on_hand}
                                    onChangeText={qty_on_hand => this.setState({ qty_on_hand })}
                                >
                                </TextInput>
                            </View>
                        </View>

                        <View style={styles.logocontainer}>
                            <View
                                style={{
                                    width: "40%"
                                }}
                            >
                                <Text style={styles.setTextSize}>Bottle Deposit</Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}
                            >
                                <TextInput
                                    style={styles.input}
                                    returnKeyType="done"
                                    keyboardType="default"
                                    autoCapitalize="none"
                                    onSubmitEditing={() => this.keyboardHidefunction()}  
                                    autoCorrect={false}
                                    value={this.state.nbottledepositamt}
                                    keyboardType="numeric"
                                    onChangeText={nbottledepositamt =>
                                        this.setState({
                                            nbottledepositamt : his.ConTwoDecDigit(nbottledepositamt)
                                        })
                                    }
                                />
                            </View>
                        </View> 

                        {/* <View style={styles.taxContainer}>
                            <View
                                style={{
                                    width: "20%"
                                }}
                            >
                                <Text style={styles.setTextSize}> Tax </Text>
                            </View>
                            <View
                                style={{
                                    width: "30%"
                                }}
                            >
                                <View flexDirection="row">
                                    <CheckBox
                                        checkedIcon={
                                            <Entypo name="checksquare" size={15} color="#3386D6">

                                            </Entypo>
                                        }
                                        uncheckedIcon={
                                            <FontAwesome name="square-o" size={15} color="#636466" />
                                        }
                                        title="Tax1"
                                        checked={this.state.checkedTax1}
                                        onPress={() =>
                                            this.setState({
                                                checkedTax1: !this.state.checkedTax1
                                            })
                                        }
                                        style={{
                                            flex: 1,
                                            backgroundColor: "#fff"
                                        }}
                                    />
                                    <CheckBox
                                        checkedIcon={
                                            <Entypo
                                                name="checksquare"
                                                size={15}
                                                color="#3386D6"
                                                marginLeft="0%"
                                                marginTop="0%"
                                            />
                                        }
                                        uncheckedIcon={
                                            <FontAwesome name="square-o" size={15} color="#636466" />
                                        }
                                        title="Tax2"
                                        checked={this.state.checkedTax2}
                                        onPress={() =>
                                            this.setState({
                                                checkedTax2: !this.state.checkedTax2
                                            })
                                        }
                                    />
                                    {
                                        (tax3)
                                            ?
                                            <CheckBox
                                                checkedIcon={
                                                    <Entypo
                                                        name="checksquare"
                                                        size={15}
                                                        color="#3386D6"
                                                        marginLeft="0%"
                                                        marginEnd="1%"
                                                    />
                                                }
                                                uncheckedIcon={
                                                    <FontAwesome name="square-o" size={15} color="#636466" />
                                                }
                                                title="Tax3"
                                                checked={this.state.checkedTax3}
                                                onPress={() =>
                                                    this.setState({
                                                        checkedTax3: !this.state.checkedTax3
                                                    })
                                                }
                                            />
                                            :
                                            null
                                    }
                                </View>
                            </View>
                        </View> */} 

                                
                                    <View style={styles.logocontainer}>
                                        <View
                                            style={{
                                                width: "40%"
                                            }}
                                        >
                                            <Text style={styles.setDepartmentTextSize}>Tax</Text>
                                        </View>
                                        <View
                                            style={{
                                                width: "60%"


                                            }}
                                        >
                                            <Dropdown
                                                label=""
                                                data={this.state.taxArray}
                                                value={this.state.tax1}
                                                // selectedValue={this.state.deptHolder}
                                                itemTextStyle="bold"
                                                labelFontSize={16}
                                                dropdownOffset={{ top: 12, left: 25 }}
                                                fontSize={16}
                                                height = {12}
                                                shadeOpacity="2.0"
                                                containerStyle={styles.input}
                                                onChangeText={(index) =>
                                                   this.getTaxlist(index)
                                                }

                                                // onChangeText={(value, index) =>
                                                //     this.setState({ taxvalue: value })
                                                // }
                                            />
                                        </View>
                                    </View>

                                    
                                    <View style={styles.logocontainer}>
                                        <View
                                            style={{
                                                width: "40%"
                                            }}
                                        >
                                            <Text style={styles.setDepartmentTextSize}>Size</Text>
                                        </View>
                                        <View
                                            style={{
                                                width: "60%"


                                            }}
                                        >
                                            <Dropdown
                                                label=""
                                                data={this.state.sizeTypeArray}
                                                value={this.state.sizeArrayValue}
                                                // selectedValue={this.state.deptHolder}
                                                itemTextStyle="bold"
                                                labelFontSize={16}
                                                dropdownOffset={{ top: 12, left: 25 }}
                                                fontSize={16}
                                                height = {12}
                                                shadeOpacity="2.0"
                                                containerStyle={styles.input}
                                                onChangeText={(value, index) =>
                                                    this.setState({ sizeArrayValue: value })
                                                }

                                                // onChangeText={(value, index) =>
                                                //     this.setState({ taxvalue: value })
                                                // }
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.logocontainer}>
                                        <View
                                            style={{
                                                width: "40%"
                                            }}
                                        >
                                            <Text style={styles.setDepartmentTextSize}>Manufacturer</Text>
                                        </View>
                                        <View
                                            style={{
                                                width: "60%"


                                            }}
                                        >
                                            <Dropdown
                                                label=""
                                                data={this.state.ManufacturerArray}
                                                value={this.state.ManufacturerValue}
                                                // selectedValue={this.state.deptHolder}
                                                itemTextStyle="bold"
                                                labelFontSize={16}
                                                dropdownOffset={{ top: 12, left: 25 }}
                                                fontSize={16}
                                                height = {12}
                                                shadeOpacity="2.0"
                                                containerStyle={styles.input}
                                                onChangeText={(value, index) =>
                                                    this.setState({ ManufacturerValue: value })
                                                }

                                                // onChangeText={(value, index) =>
                                                //     this.setState({ taxvalue: value })
                                                // }
                                            />
                                        </View>
                                    </View>

                        <View style={styles.foodContainer}>
                            <View
                                style={{
                                    width: "40%"
                                }}>
                                <Text style={styles.setTextSize}>Food Item</Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}>
                                <RadioForm
                                    radio_props={this.testArray}
                                    onPress={(value) => { this.setState({ value: value }) }}

                                    labelstyle={{
                                        fontSize: 40,
                                        fontWeight: 'bold',
                                        alignItems: 'center',
                                    }}

                                    flexDirection='row'
                                    formHorizontal={true}
                                    buttonSize = {12}
                                    initial={this.state.foodItem}
                                    labelColor='#636466'
                                    selectedLabelColor='#286fb7'
                                    onPress={(foodItem) => { this.setState({ foodItem: foodItem }) }}
                                />
                            </View>
                        </View>

                        <View style={styles.logocontainer}>
                            <View
                                style={{
                                    width: "40%"
                                }}>

                                <Text style={styles.setTextSize}>Age Verification</Text>
                            </View>
                            <View
                                style={{
                                    width: "60%"
                                }}>
                                {<Dropdown
                                    label='Select AgeVerification'
                                    data={this.state.ageverificationArray}
                                    value={this.state.age_verification}
                                    itemTextStyle="bold"
                                    labelFontSize={16}
                                    fontSize={16}
                                    selectedValue={this.state.VerificationHolder}
                                    containerStyle={styles.inputt}
                                    onChangeText={(value, index) =>
                                        this.setState({ age_verification: value })
                                    }
                                />}
                            </View>
                        </View>



                        <View style={styles.btncontainerr}>
                            <TouchableOpacity
                                style={styles.btncontainer}
                                onPress={this.saveNPLItemDetails}
                            >
                                <Text style={styles.btnText}> Save </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.btncontainer}
                                onPress={this.cancelBtnPress}
                            >
                                <Text style={styles.btnText}> Cancel </Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>
                {/* </KeyboardAwareScrollView> */}
            </View>
        );
    }
}


const styles = StyleSheet.create({
    logocontainer: {
        flex: 1,
        marginTop: 0,
        marginBottom: 3,
        marginLeft: 10,
        flexDirection: "row"
    },

    btncontainerr: {
        flexDirection: "row",
        marginLeft: 50
    },
    logocontainer1: {
        flex: 1,
        marginTop: 0,
        marginBottom: 5,
        marginLeft: 10,
        flexDirection: "row"
    },
    ScrollContainer: {
        flex: 1,
        marginTop: 0,
        marginBottom: 3,
        marginLeft: 10,
        width: 100,

        flexDirection: "row"
    },
    MainContainer: {
        flex: 1,

        // Set content's vertical alignment.
        justifyContent: "center",

        // // Set content's horizontal alignment.
        alignItems: "center",

        // Set hex color code here.
        backgroundColor: "#fff"
    },

    MainContainer1: {
        justifyContent: "center",
        flex: 1,
        margin: 10
    },
    taxContainer: {
        flex: 1,
        marginTop: 0,
        marginBottom: 20,
        marginRight: 5,
        marginLeft: 10,
        backgroundColor: "#fff",

        flexDirection: "row"
    },
    foodContainer: {
        flex: 1,
        marginTop: 10,
        marginBottom: 20,
        marginLeft: 10,
        flexDirection: "row"
    },

    setTextSize: {
        fontSize: 18,
        fontWeight: "300",
        color: "#286fb7"
    },
    setDepartmentTextSize: {
        fontSize: 18,
        fontWeight: "300",
        color: "#286fb7"
    },
    setCheckMark: {
        width: 50,
        height: 50,
        marginLeft: 70,
        color: "#286fb7"
        //  color: 'white'
    },
    input: {
        //width: 250,
        alignSelf: "stretch",
        height: 40,

        marginEnd: 10,
        borderRadius: 3,
        borderRightWidth: 1,
        borderRightColor: "#636466",
        borderLeftWidth: 1,
        borderLeftColor: "#636466",
        borderTopWidth: 1,
        borderTopColor: "#636466",
        borderBottomWidth: 1,
        borderBottomColor: "#636466",

        marginBottom: 10,
        color: "#000",
        fontSize: 15,
        paddingHorizontal: 20
    },

    inputt: {
        //width: 250,
        alignSelf: "stretch",
        height: 70,

        marginEnd: 10,
        borderRadius: 3,
        borderRightWidth: 1,
        borderRightColor: "#636466",
        borderLeftWidth: 1,
        borderLeftColor: "#636466",
        borderTopWidth: 1,
        borderTopColor: "#636466",
        borderBottomWidth: 1,
        borderBottomColor: "#636466",

        marginBottom: 10,
        color: "#000",
        fontSize: 15,
        paddingHorizontal: 20
    },
    setDroupDownStyleInput: {
        marginRight: 10,
        marginLeft: 20,
        height: 40,
        width: 230,
        flexDirection: "row"
    },
    btncontainer: {
        backgroundColor: "#3386D6",

        borderRadius: 10,
        // mirginTop: 10,
        height: 35,
        marginLeft: 10,
        marginRight: 20,
        width: "30%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 30
    },
    btnText: {
        marginLeft: 0,
        fontSize: 20,
        color: "#fff"
    },
    setStarTextSize: {
        fontSize: 18,
        fontWeight: '300',
        color: "red",
      },
});
