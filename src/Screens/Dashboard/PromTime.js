import React, { Component } from "react";
import {
    StyleSheet,
    TextInput,
    Text,
    KeyboardAvoidingView,
    View,
    Image,
    TouchableOpacity,
    ImageBackground,
    ScrollView,
    ActivityIndicator,
    Picker,
    PickerIOS,
    Keyboard,
    Alert,
} from "react-native";
import RadioForm, {
    RadioButton,
    RadioButtonInput,
    RadioButtonLabel
} from "react-native-simple-radio-button";
import {Button} from 'react-native-elements';
import Icon from "react-native-vector-icons/Feather";
import { CheckBox } from "react-native-elements";
import Entypo from "react-native-vector-icons/AntDesign";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { Dropdown } from "react-native-material-dropdown";
import Loading from "react-native-whc-loading";
// import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import AsyncStorage from '@react-native-community/async-storage';
import DatePicker from 'react-native-datepicker'
import moment from "moment";


export default class PromTime extends React.Component {
    // itemArray = [
    //     {
    //         label: "Same Item      ",
    //         value: 0
    //     },
    //     {
    //         label: "Group Item               ",
    //         value: 1
    //     }
    // ];


    // static navigationOptions = {
    //     headerStyle: {
    //         backgroundColor: "#fff"
    //     },
    //     headerTitle: (
    //         <View
    //             style={{
    //                 flex: 1,
    //                 alignItems: "center",
    //                 marginStart: 0
    //             }}
    //         >
    //             <Image
    //                 source={require("../images/poslogo.jpg")}
    //                 style={{
    //                     height: 100,
    //                     width: 100,
    //                     marginRight: 0,
    //                     resizeMode: "contain"
    //                 }}
    //             />
    //         </View>
    //     ),
    //     // headerRight: (
    //     //   <View
    //     //     style={{
    //     //       marginRight: 20
    //     //     }}
    //     //   >
    //     //     <FontAwesome name="bell" size={25} color="#16a0db" />
    //     //   </View>
    //     // )
    // };

    constructor() {
        super();
        this.state = {
           
            isLoading: true,
            data: [],
            promotionValue: "",
            slabpriceView: false,
            discountTypeView: true,
            promotionData: [],
            promStatus: [],
            promotionName: "",
            promotionCode: "",
            promotionType: [],
            buyQuantity: "",
            // ItemQtyLimit: "",
            discountType: [],
            discountOption: [],
            discountValue: "",
            regdCustPrice: "",
            itemType: "",
            Status: "",
            slabPrice: "",
            discountTypeValue: "",
            discountOptionValue: "",
            itemTypeValue: "",
            promCategory: "",
            ViewBtnView: false,
            fromDate: moment()
            .format("MM-DD-YYYY"),
           
            toDate: moment()
            .format("MM-DD-YYYY"),
            fromTime : "",
            toTime : "",
            allowRegdCust : "",
            quantityLimit: "",
            viewBtnFlag: "0"



        };
    }

    componentDidMount() {


        this.setState({
            promotionValue: "Buy N get discount",
            Status: "Active",
            itemTypeValue: 0,
            isLoading: false,
            allowRegdCust : "Yes"
        });

        AsyncStorage.getItem("itemTypeValue").then(itemTypeValue => {
            if (itemTypeValue == "Same Item") {
             
              this.setState({ itemTypeValue: 0 });
            }
            else if (itemTypeValue == "Group Item") {
               
                this.setState({ itemTypeValue: 1 });
              }
            
          });



        AsyncStorage.getItem("token").then(data => {
            AsyncStorage.getItem("Sid").then(SID => {
                AsyncStorage.getItem("promotion_id").then(promotion_id => {
                    if (promotion_id) {
                        this.setState(
                            {
                                isLoading: true,
                            },

                        );
                        return fetch(
                            API_BASE_URL + `admin/editPromotionView?sid=${SID}&prom_id=${promotion_id}&token=${encodeURIComponent(
                                data
                            )}`
                        )
                            .then(response => response.json())
                            .then(responseJson => {

                                if (responseJson.status == "Buy N get discout") {
                                    this.setState(
                                        {

                                            discountTypeView: true,
                                            slabpriceView: false,
                                            ViewBtnView: true,
                                            isLoading: false,
                                            promotionName: responseJson.data[0].prom_name,
                                            promotionCode: responseJson.data[0].prom_code,
                                            fromDate: responseJson.data[0].start_date,
                                            toDate: responseJson.data[0].end_date,
                                            fromTime: responseJson.data[0].from_time,
                                            toTime: responseJson.data[0].to_time,
                                            promotionValue: responseJson.data[0].prom_type_id,
                                            buyQuantity: JSON.stringify(responseJson.data[0].buy_qty),
                                            // ItemQtyLimit: JSON.stringify(responseJson.data[0].qty_limit),
                                            promCategory: responseJson.data[0].category,
                                            discountOptionValue: responseJson.data[0].disc_each_nth,
                                            discountTypeValue: responseJson.data[0].discount_type_id,
                                            discountValue: JSON.stringify(responseJson.data[0].discounted_value),
                                            regdCustPrice: JSON.stringify(responseJson.data[0].addl_disc_cust),
                                            Status: responseJson.data[0].status,
                                            itemTypeValue: JSON.stringify(responseJson.data[0].same_group),
                                            quantityLimit:JSON.stringify(responseJson.data[0].prom_qty_limit),
                                            allowRegdCust:responseJson.data[0].allow_reg_price,
                                            // promotionName: responseJson.data[0].prom_name,

                                        },

                                    );
                                    if (this.state.promotionValue) {

                                        this.setState({
                                            promotionValue: "Buy N get discount"
                                        })
                                    }


                                }
                                if (responseJson.status == "Slab Price") {

                                    this.setState(
                                        {

                                            discountTypeView: false,
                                            slabpriceView: true,
                                            ViewBtnView: true,
                                            isLoading: false,
                                            promotionName: responseJson.data[0].prom_name,
                                            promotionCode: responseJson.data[0].prom_code,
                                            promotionValue: responseJson.data[0].prom_type_id,
                                            fromDate: responseJson.data[0].start_date,
                                            toDate: responseJson.data[0].end_date,
                                            fromTime: responseJson.data[0].from_time,
                                            toTime: responseJson.data[0].to_time,
                                            buyQuantity: JSON.stringify(responseJson.data[0].buy_qty),
                                            // ItemQtyLimit: JSON.stringify(responseJson.data[0].qty_limit),
                                            slabPrice: JSON.stringify(responseJson.data[0].slab_price),
                                            promCategory: responseJson.data[0].category,
                                            //   discountValue:  JSON.stringify(responseJson.data[0].discounted_value),
                                            regdCustPrice: JSON.stringify(responseJson.data[0].addl_disc_cust),
                                            Status: responseJson.data[0].status,
                                            itemTypeValue: responseJson.data[0].same_group,
                                            quantityLimit:JSON.stringify(responseJson.data[0].prom_qty_limit),
                                            allowRegdCust:responseJson.data[0].allow_reg_price,

                                            // promotionName: responseJson.data[0].prom_name,

                                        },


                                    );
                                    if (this.state.promotionValue) {

                                        this.setState({
                                            promotionValue: "Slab Price"
                                        })
                                    }


                                }
                            })
                            .catch(error => {
                                console.error(error);
                            });
                    }
                });
            });
        })





        AsyncStorage.getItem("token").then(data => {
            AsyncStorage.getItem("Sid").then(SID => {
                if (data) {
                    this.setState(
                        {
                            isLoading: true,
                        },
                    )
                    return fetch(
                        API_BASE_URL + `admin/getAllPromotionType?sid=${SID}&token=${encodeURIComponent(
                            data
                        )}`
                    )
                        .then(response => response.json())
                        .then(responseJson => {
                            this.setState(
                                {
                                    isLoading: false,
                                    promotionData: responseJson.data
                                },
                                function () {
                                    // In this block you can do something with new state.
                                }
                            );
                        })
                        .catch(error => {
                            console.error(error);
                        });
                }
            });
        });









    };

    gotoItemList = () => {


        if (this.state.promotionValue == "Buy N get discount") {
            this.state.promotionValue = "1"
        }

        if (this.state.promotionValue == "Slab Price") {
            this.state.promotionValue = "10"
        }

        if (this.state.discountTypeValue == "Percentage (%)") {
            this.state.discountTypeValue = "1"
        }
        if (this.state.discountTypeValue == "Dollar ($)") {
            this.state.discountTypeValue = "2"
        }
        if (this.state.discountOptionValue == "For Nth item") {
            this.state.discountOptionValue = "Nth"
        }
        if (this.state.discountOptionValue == "For each item") {
            this.state.discountOptionValue = "Each"
        }

        if (this.state.itemTypeValue == 0) {
            this.state.itemTypeValue = "Same Item"
        }
        if (this.state.itemTypeValue == 1) {
            this.state.itemTypeValue = "Group Item"
        }

        if (this.state.allowRegdCust == "Yes") {
            this.state.allowRegdCust = "Y"
        }

        if (this.state.quantityLimit == "") {
            this.state.quantityLimit = "0"
        }

        // if(this.state.Status == undefined)
        // {
        //    this.setState({
        //        status: "Active"
        //    })
        // }

        AsyncStorage.getItem("token").then(data => {
            AsyncStorage.getItem("promotion_id").then(promotion_id => {
                AsyncStorage.getItem("category").then(category => {




                    AsyncStorage.getItem("Sid").then(sid => {
                        if (sid) {
                            if (data) {
                                if (promotion_id) {

                                    this.setState(
                                        {
                                            isLoading: true,
                                        },
                                    )

                                   

                                    fetch(
                                        API_BASE_URL + `admin/editPromotion?(
                                data
                            )}`,
                                        {
                                            method: "POST",
                                            headers: {
                                                Accept: "application/json",
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                "promotion_category": category,
                                                sid: sid,
                                                promotion_name: this.state.promotionName,
                                                promotion_code: this.state.promotionCode,
                                                promotion_type: this.state.promotionValue,
                                                promotion_buy_qty: this.state.buyQuantity,
                                                token: data,
                                                // promotion_item_qty_limit: this.state.ItemQtyLimit,
                                                promotion_disc_options: this.state.discountOptionValue,
                                                promotion_discounted_value: this.state.discountValue,
                                                promotion_reg_cust_price: this.state.regdCustPrice,
                                                promotion_same_itme: this.state.itemTypeValue,
                                                promotion_status: this.state.Status,
                                                promotion_slab_price: this.state.slabPrice,
                                                promotion_discount_type: this.state.discountTypeValue,
                                                promotion_from_time: this.state.fromTime,
                                                promotion_to_time: this.state.toTime,
                                                promotion_end_date: this.state.toDate,
                                                promotion_start_date: this.state.fromDate,
                                                prom_id: promotion_id,
                                                qty_limit : this.state.quantityLimit,
                                                allow_reg_price : this.state.allowRegdCust
                                                //  tax3: this.state.checkedTax3
                                            })
                                        }
                                    )
                                        .then(response => response.json())
                                        .then(responseJson => {

                                            this.setState(
                                                {
                                                    isLoading: false,
                                                },
                                            )

                                            // if (responseJson.message) {
                                            //     Alert.alert(responseJson.message);

                                            // if(responseJson.status){

                                            // AsyncStorage.setItem("promotion_id",responseJson.data.promotion_id);

                                            // }
                                            // }

                                            if (responseJson.message) {
                                                this.setState({
                                                    promotionValue: "Buy N get discount"
                                                })
                                                Alert.alert(responseJson.message);
                                            }

                                            if (responseJson.status) {
                                                AsyncStorage.setItem("promotion_id", responseJson.data.promotion_id)
                                                Alert.alert(
                                                    "",
                                                    responseJson.status,
                                                    [
                                                        { text: 'OK', onPress: () => this.navigatetoItemList() },

                                                    ]
                                                )

                                            }
                                            // if (responseJson.error) {
                                            //     alert(responseJson.error);
                                            // }
                                        })

                                        .catch(error => {
                                            
                                            console.error(error);
                                            this.setState(
                                                {
                                                    isLoading: false,
                                                },
                                            )
                                        });
                                }
                                else {

                                    this.addPromotion()
                                }
                            }
                        }
                    });
                })
            })
        });


    }



    navigatetoItemList = () => {

        this.props.navigation.navigate("PromStockItemList");
    }

    viewItemBtnPress = () => {


          if (this.state.viewBtnFlag == "1"){

            Alert.alert(
                "",
                "Do you want to save the changes",
                [
                  {
                    text: "No",
                    onPress: () => this.navigatetoItemList(),
                    style: "cancel"
                  },
                  { text: "Yes", onPress: () => this.gotoItemList() }
                ],
                { cancelable: false }
              );
          }
          else{
               this.props.navigation.navigate("PromStockItemList");
             }
         
    }
    cancelBtnPress = () => {
        // this.props.navigation.navigate("PromStockAddItem");
    };

  

    getCategoryList = (value, index) => {


        if (index == 0) {
            this.setState({
                discountTypeView: true,
                slabpriceView: false,
                promotionValue: value
            })
        }

        if (index == 1) {
            this.setState({
                slabpriceView: true,
                discountTypeView: false,
                promotionValue: value
            })
        }

    }
    keyboardHidefunction = () => {

        Keyboard.dismiss()

    }


    addPromotion = () => {

        if (this.state.promotionValue == "Buy N get discount") {
            this.state.promotionValue = "1"
        }

        // if (this.state.promotionValue == "Slab Price") {
        //     this.state.promotionValue = "10"
        // }



        if (this.state.discountTypeValue == "Percentage (%)") {
            this.state.discountTypeValue = "1"
        }
        if (this.state.discountTypeValue == "Dollar ($)") {
            this.state.discountTypeValue = "2"
        }
        if (this.state.discountOptionValue == "For Nth item") {
            this.state.discountOptionValue = "Nth"
        }
        if (this.state.discountOptionValue == "For each item") {
            this.state.discountOptionValue = "Each"
        }

        if (this.state.allowRegdCust == "Yes") {
            this.state.allowRegdCust = "Y"
        }

        if (this.state.quantityLimit == "") {
            this.state.quantityLimit = "0"
        }

        // if(this.state.Status == ""){

        //     this.state.status == "Active"
        // }

        AsyncStorage.getItem("token").then(data => {


            AsyncStorage.getItem("Sid").then(sid => {
                if (sid) {
                    if (data) {
                        this.setState(
                            {
                                isLoading: true,
                            },
                        )
                        fetch(
                            API_BASE_URL + `admin/addPromotion?(
                            data
                        )}`,
                            {
                                method: "POST",
                                headers: {
                                    Accept: "application/json",
                                    "Content-Type": "application/json"
                                },
                                body: JSON.stringify({
                                    "promotion_category": "Time Bound",
                                    sid: sid,
                                    promotion_name: this.state.promotionName,
                                    promotion_code: this.state.promotionCode,
                                    promotion_type: this.state.promotionValue,
                                    promotion_buy_qty: this.state.buyQuantity,
                                    token: data,
                                    // promotion_item_qty_limit: this.state.ItemQtyLimit,
                                    promotion_disc_options: this.state.discountOptionValue,
                                    promotion_discounted_value: this.state.discountValue,
                                    promotion_reg_cust_price: this.state.regdCustPrice,
                                    promotion_same_itme: this.state.itemTypeValue,
                                    promotion_status: this.state.Status,
                                    promotion_slab_price: this.state.slabPrice,
                                    promotion_discount_type: this.state.discountTypeValue,
                                    promotion_from_time: this.state.fromTime,
                                    promotion_to_time: this.state.toTime,
                                    promotion_end_date: this.state.toDate,
                                    promotion_start_date: this.state.fromDate,
                                    qty_limit : this.state.quantityLimit,
                                    allow_reg_price : this.state.allowRegdCust
                                    // prom_id: promotion_id,
                                    //  tax3: this.state.checkedTax3
                                })
                            }
                        )
                            .then(response => response.json())
                            .then(responseJson => {

                                this.setState(
                                    {
                                        isLoading: false,
                                    },
                                )
                                // if (responseJson.message) {
                                //     Alert.alert(responseJson.message);

                                // if(responseJson.status){

                                // AsyncStorage.setItem("promotion_id",responseJson.data.promotion_id);

                                // }
                                // }

                                if (responseJson.message) {
                                    this.setState({
                                        promotionValue: "Buy N get discount"
                                    })

                                    if (this.state.allowRegdCust == "Y") {
                                        this.setState({
                                            allowRegdCust: "Yes"
                                        })
                                    }
                                    Alert.alert(responseJson.message);
                                    //  this.state.promotionValue == "Buy N get discount"
                                }

                                if (responseJson.status) {
                                    AsyncStorage.setItem("promotion_id", responseJson.data.promotion_id)
                                    Alert.alert(
                                        "",
                                        responseJson.status,
                                        [
                                            { text: 'OK', onPress: () => this.cancelBtnPress() },

                                        ]
                                    )

                                }
                                // if (responseJson.error) {
                                //     alert(responseJson.error);
                                // }
                            })

                            .catch(error => {
                                console.error(error);
                                this.setState(
                                    {
                                        isLoading: true,
                                    },
                                )
                            });
                    }

                }



            })
        });

    }


    addItemBtnTapped = () => {

        if (this.state.promotionValue == "Buy N get discount") {
            this.state.promotionValue = "1"
        }

        if (this.state.promotionValue == "Slab Price") {
            this.state.promotionValue = "10"
        }

        if (this.state.discountTypeValue == "Percentage (%)") {
            this.state.discountTypeValue = "1"
        }
        if (this.state.discountTypeValue == "Dollar ($)") {
            this.state.discountTypeValue = "2"
        }
        if (this.state.discountOptionValue == "For Nth item") {
            this.state.discountOptionValue = "Nth"
        }
        if (this.state.discountOptionValue == "For each item") {
            this.state.discountOptionValue = "Each"
        }

        if (this.state.itemTypeValue == 0) {
            this.state.itemTypeValue = "Same Item"
        }
        if (this.state.itemTypeValue == 1) {
            this.state.itemTypeValue = "Group Item"
        }

        if (this.state.allowRegdCust == "Yes") {
            this.state.allowRegdCust = "Y"
        }

        if (this.state.quantityLimit == "") {
            this.state.quantityLimit = "0"
        }

        // if(this.state.Status == undefined)
        // {
        //    this.setState({
        //        status: "Active"
        //    })
        // }

        AsyncStorage.getItem("token").then(data => {
            AsyncStorage.getItem("promotion_id").then(promotion_id => {
                AsyncStorage.getItem("category").then(category => {




                    AsyncStorage.getItem("Sid").then(sid => {
                        if (sid) {
                            if (data) {
                                if (promotion_id) {

                                    this.setState(
                                        {
                                            isLoading: true,
                                        },
                                    )

                                   

                                    fetch(
                                        API_BASE_URL + `admin/editPromotion?(
                                data
                            )}`,
                                        {
                                            method: "POST",
                                            headers: {
                                                Accept: "application/json",
                                                "Content-Type": "application/json"
                                            },
                                            body: JSON.stringify({
                                                "promotion_category": category,
                                                sid: sid,
                                                promotion_name: this.state.promotionName,
                                                promotion_code: this.state.promotionCode,
                                                promotion_type: this.state.promotionValue,
                                                promotion_buy_qty: this.state.buyQuantity,
                                                token: data,
                                                // promotion_item_qty_limit: this.state.ItemQtyLimit,
                                                promotion_disc_options: this.state.discountOptionValue,
                                                promotion_discounted_value: this.state.discountValue,
                                                promotion_reg_cust_price: this.state.regdCustPrice,
                                                promotion_same_itme: this.state.itemTypeValue,
                                                promotion_status: this.state.Status,
                                                promotion_slab_price: this.state.slabPrice,
                                                promotion_discount_type: this.state.discountTypeValue,
                                                promotion_from_time: this.state.fromTime,
                                                promotion_to_time: this.state.toTime,
                                                promotion_end_date: this.state.toDate,
                                                promotion_start_date: this.state.fromDate,
                                                prom_id: promotion_id,
                                                qty_limit : this.state.quantityLimit,
                                                allow_reg_price : this.state.allowRegdCust
                                                //  tax3: this.state.checkedTax3
                                            })
                                        }
                                    )
                                        .then(response => response.json())
                                        .then(responseJson => {

                                            this.setState(
                                                {
                                                    isLoading: false,
                                                },
                                            )

                                            // if (responseJson.message) {
                                            //     Alert.alert(responseJson.message);

                                            // if(responseJson.status){

                                            // AsyncStorage.setItem("promotion_id",responseJson.data.promotion_id);

                                            // }
                                            // }

                                            if (responseJson.message) {
                                                this.setState({
                                                    promotionValue: "Buy N get discount"
                                                })
                                                Alert.alert(responseJson.message);
                                            }

                                            if (responseJson.status) {
                                                AsyncStorage.setItem("promotion_id", responseJson.data.promotion_id)
                                                Alert.alert(
                                                    "",
                                                    responseJson.status,
                                                    [
                                                        { text: 'OK', onPress: () => this.cancelBtnPress() },

                                                    ]
                                                )

                                            }
                                            // if (responseJson.error) {
                                            //     alert(responseJson.error);
                                            // }
                                        })

                                        .catch(error => {
                                            
                                            console.error(error);
                                            this.setState(
                                                {
                                                    isLoading: false,
                                                },
                                            )
                                        });
                                }
                                else {

                                    this.addPromotion()
                                }
                            }
                        }
                    });
                })
            })
        });

    }
    render() {
        <Loading ref="loading" />;
        if (this.state.isLoading) {
            return (
                <View
                    style={{
                        flex: 1,
                        paddingTop: 20
                    }}
                >
                    <ActivityIndicator />
                </View>
            );
        }
        this.state.promStatus = [
            {
                value: "Active"
            },
            {
                value: "Closed"
            }
        ];

        this.state.discountOption = [{
            value: "Nth",
            label: 'For Nth item',

        },
        {
            value: "Each",
            label: 'For each item',
        },];
        this.state.regrPriceArray = [
            {
                value: "Y",
                label: 'Yes',
            },
            {
                value: "N",
                label: 'No'
            }
        ];

        this.state.discountType = [
            {
                value: 1,
                label: 'Percentage (%)'
            }, {
                value: 2,
                label: 'Dollar ($)',
            },];

        // this.state.tax3 = "N"
        const { tax3 } = this.state
        return (
            <View style={styles.MainContainer}>
            {/* <KeyboardAwareScrollView> */}
            <View style={{width: '100%',marginTop:100}}>
        <ImageBackground
          source={require('../../assets/images/header.jpeg')}
          style={{position: 'relative', height: 100, paddingTop: 20}}>
         <View
                  style={{
                    // display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingVertical: 10,
                    paddingHorizontal:20
                  }}>
                                      <FontAwesome style={{marginRight:10}} name="caret-left" color={'#fff'} size={26} onPress={()=>this.props.navigation.navigate('Promotions')} />
                  <Text style={{color: 'white',fontSize:15,paddingVertical:3}} onPress={()=>this.props.navigation.navigate('Promotions')}>Promotions</Text>
                  </View>
        </ImageBackground>
      </View>
      <View style={{marginTop:10}}>
                <ScrollView>
                    <View style={styles.logocontainer}>
                        <View
                            style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                              }}
                        >
                            <Text style={styles.setTextSize}>Promotion Name</Text>
                        </View>
                        <View
                            style={{
                                width: "60%"
                            }}
                        >
                            <TextInput
                                style={styles.input}
                                returnKeyType="next"
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={this.state.promotionName}
                                onChangeText={promotionName =>
                                    this.setState({
                                        promotionName,
                                        viewBtnFlag: "1"
                                    })
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.logocontainer}>
                        <View
                            style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                              }}
                        >
                            <Text style={styles.setTextSize}>Promotion Code</Text>
                        </View>


                        {(() => {
                            if (this.state.ViewBtnView == true) {
                                return (
                                    <View
                                    style={{
                                        alignItems: 'flex-end',
                                        paddingHorizontal: 30,
                                        paddingVertical: 10,
                                      }}
                                    >

                                        <TextInput
                                        
                                            editable={false}
                                            style={styles.inputCode}
                                            returnKeyType="next"
                                            keyboardType="default"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            value={this.state.promotionCode}
                                            onChangeText={promotionCode =>
                                                this.setState({
                                                    promotionCode,
                                                    viewBtnFlag: "1"
                                                })
                                            }
                                        />
                                    </View>
                                )
                            }
                        })()}

                        {(() => {
                            if (this.state.ViewBtnView == false) {
                                return (
                                    <View
                                    style={{
                                        alignItems: 'flex-end',
                                        paddingHorizontal: 30,
                                        paddingVertical: 10,
                                      }}
                                    >

                                        <TextInput
                                            // style={styles.input}
                                            returnKeyType="next"
                                            keyboardType="default"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            value={this.state.promotionCode}
                                            onChangeText={promotionCode =>
                                                this.setState({
                                                    promotionCode,
                                                    viewBtnFlag: "1"
                                                })
                                            }
                                        />
                                    </View>
                                )
                            }
                        })()}


                    </View>



                    <View style={styles.logocontainer}>
                        <View
                           style={{
                               width:'40%'
                            // alignItems: 'flex-end',
                            // paddingHorizontal: 5,
                            // paddingVertical: 10,
                          }}
                        >
                            <Text style={styles.setDepartmentTextSize}>Promotion Type</Text>
                        </View>
                        {(() => {
                            if (this.state.ViewBtnView == true) {
                                return (
                                    <View
                                    style={{
                                        width:'60%'
                                        // alignItems: 'flex-end',
                                        // paddingHorizontal: 30,
                                        // paddingVertical: 10,
                                      }}
                                    >
                                        <Dropdown
                                            //  label="Select "
                                            //   defaultValue={"Buy N get "}
                                            //   data={this.state.promotionData}
                                            value={this.state.promotionValue}
                                            itemTextStyle="bold"
                                            labelFontSize={16}
                                            fontSize={16}
                                            shadeOpacity="2.0"
                                            dropdownOffset={{ top: 5, left: 25 }}
                                            containerStyle={styles.inputt}


                                        //    onChangeText={(value, index) => this.getCategoryList(value, index)}

                                        />
                                    </View>
                                )
                            }
                        })()}
                        {(() => {
                            if (this.state.ViewBtnView == false) {
                                return (
                                    <View
                                    style={{
                                        width:'60%'
                                        // alignItems: 'flex-end',
                                        // paddingHorizontal: 30,
                                        // paddingVertical: 10,
                                      }}
                                    >
                                        <Dropdown
                                            // label="Select Department"
                                            // defaultValue={"Buy N get discount"}
                                            data={this.state.promotionData}
                                            value={this.state.promotionValue}
                                            itemTextStyle="bold"
                                            labelFontSize={16}
                                            fontSize={16}
                                            shadeOpacity="2.0"
                                            dropdownOffset={{ top: 8, left: 25 }}
                                            containerStyle={styles.inputt}
                                            onChangeText={(value, index) => this.getCategoryList(value, index)}

                                        />
                                    </View>
                                )
                            }
                        })()}
                    </View>
                    <View style={styles.logocontainer}>
                        <View
                            style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                              }}
                        >
                            <Text style={styles.setTextSize}>From Date</Text>
                        </View>
                        <View
                            style={{
                                width: "60%"
                            }}
                        >

                            <DatePicker
                                style={{ width: "90%", paddingTop: 0,}}
                                date={this.state.fromDate}
                                minDate={new Date}
                                showIcon={false}
                                
                                mode="date"
                                androidMode="spinner"
                                placeholder="select date"
                                format="MM-DD-YYYY"
                                // minDate="2016-05-01"
                                // maxDate="2016-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                               
                                onDateChange={fromDate =>
                                    this.setState({
                                        fromDate,
                                        viewBtnFlag: "1"
                                    })}
                            />
                        </View>
                    </View>
                    <View style={styles.logocontainer}>
                        <View
                           style={{
                            alignItems: 'flex-end',
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                          }}
                        >
                            <Text style={styles.setTextSize}>To Date</Text>
                        </View>
                        <View
                            style={{
                                width: "60%"
                            }}
                        >

                            <DatePicker
                                style={{ width: "90%", }}
                                date={this.state.toDate}
                                mode="date"
                                minDate={new Date}
                                showIcon={false}
                                androidMode="spinner"
                                placeholder="select time"
                                format="MM-DD-YYYY"
                                // minDate="2016-05-01"
                                // maxDate="2016-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                // customStyles={{
                                //     dateIcon: {
                                //         position: 'absolute',
                                //         left: 0,
                                //         height:20,
                                //         top: 4,
                                //         marginLeft: 0
                                //     },
                                //     dateInput: {
                                //         marginLeft: 36
                                //     }
                                //     // ... You can check the source to find the other keys.
                                // }}
                                onDateChange={toDate =>
                                    this.setState({
                                        toDate,
                                        viewBtnFlag: "1"
                                    })}
                            />
                        </View>
                    </View>

                    <View style={styles.logocontainer}>
                        <View
                            style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                              }}
                        >
                            <Text style={styles.setTextSize}>From time</Text>
                        </View>
                        <View
                            style={{
                                width: "60%"
                            }}
                        >

                            <DatePicker
                                style={{ width: "90%", paddingTop: 0 }}
                                date={this.state.fromTime}
                                mode="time"
                                androidMode="spinner"
                                placeholder="From time"
                                format="hh:mm a"
                                // minDate="2016-05-01"
                                // maxDate="2016-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0,
                                        height :0,
                                    },
                                    dateInput: {
                                        marginLeft: 0
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={fromTime =>
                                    this.setState({
                                        fromTime,
                                        viewBtnFlag: "1"
                                    })}
                            />
                        </View>
                    </View>
                    <View style={styles.logocontainer}>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                          }}
                        >
                            <Text style={styles.setTextSize}>To Time</Text>
                        </View>
                        <View
                            style={{
                                width: "60%"
                            }}
                        >

                            <DatePicker
                                style={{ width: "90%", }}
                                date={this.state.toTime}
                                mode="time"
                                androidMode="spinner"
                                placeholder="To Time"
                                format="hh:mm a"
                                // minDate="2016-05-01"
                                // maxDate="2016-06-01"
                                confirmBtnText="Confirm"
                                cancelBtnText="Cancel"
                                customStyles={{
                                    dateIcon: {
                                        position: 'absolute',
                                        height :0,
                                        left: 0,
                                        top: 4,
                                        marginLeft: 0
                                    },
                                    dateInput: {
                                        marginLeft: 0
                                    }
                                    // ... You can check the source to find the other keys.
                                }}
                                onDateChange={toTime =>
                                    this.setState({
                                        toTime,
                                        viewBtnFlag: "1"
                                    })}
                            />
                        </View>
                    </View>

                    <View style={styles.logocontainer}>
                        <View
                          style={{
                            alignItems: 'flex-end',
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                          }}
                        >
                            <Text style={styles.setTextSize}>Buy Quantity</Text>
                        </View>
                        <View
                            style={{
                                width: "60%"
                            }}
                        >
                            <TextInput
                                // style={styles.input}
                                //   returnKeyType="next"
                                style={{backgroundColor:"white"}}
                                keyboardType='number-pad'
                                underlineColorAndroid="transparent"
                                returnKeyType="done"
                                autoCapitalize="none"
                                autoCorrect={false}
                                value={this.state.buyQuantity}
                                onSubmitEditing={() => this.keyboardHidefunction()}

                                onChangeText={buyQuantity =>
                                    this.setState({
                                        buyQuantity,
                                        viewBtnFlag: "1"
                                    })
                                }
                            />
                        </View>
                    </View>
                    {/* <View style={styles.logocontainer}>
                        <View
                            style={{
                                width: "40%"
                            }}
                        >
                            <Text style={styles.setTextSize}>Item Qty Limit</Text>
                        </View>
                        <View
                            style={{
                                width: "60%"
                            }}
                        >
                            <TextInput
                                style={styles.input}
                                returnKeyType="done"
                                keyboardType='number-pad'

                                //   autoCapitalize="none"
                                autoCorrect={false}
                                value={this.state.ItemQtyLimit}
                                //    keyboardType="numeric"
                                onChangeText={ItemQtyLimit =>
                                    this.setState({
                                        ItemQtyLimit,
                                        viewBtnFlag: "1"
                                    })
                                }
                            />
                        </View>
                    </View> */}
                    {(() => {

                        if (this.state.slabpriceView == true) {

                            return (
                                <View style={styles.logocontainer}>
                                    <View
                                        style={{
                                            width: "40%"
                                        }}
                                    >
                                        <Text style={styles.setDepartmentTextSize}>Slab Price</Text>
                                    </View>
                                    <View
                                       
                                    >
                                        <TextInput
                                            // style={styles.input}
                                            returnKeyType="next"
                                            keyboardType="default"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            value={this.state.slabPrice}
                                            keyboardType="numeric"
                                            onChangeText={slabPrice =>
                                                this.setState({
                                                    slabPrice,
                                                    viewBtnFlag: "1"
                                                })
                                            }
                                        />
                                    </View>
                                </View>);


                        }
                    })()}

                    {(() => {

                        if (this.state.discountTypeView == true) {

                            return (
                                <View style={styles.logocontainer}>
                                    <View
                                        style={{
                                            width: "40%"
                                        }}
                                    >
                                        <Text style={styles.setDepartmentTextSize}>Discount Type</Text>
                                    </View>
                                    <View
                                        style={{
                                            width: "60%"

                                        }}
                                    >
                                        <Dropdown
                                            label=""
                                            data={this.state.discountType}
                                            value={this.state.discountTypeValue}
                                            // selectedValue={this.state.deptHolder}
                                            itemTextStyle="bold"
                                            labelFontSize={16}
                                            dropdownOffset={{ top: 8, left: 25 }}
                                            fontSize={16}
                                            shadeOpacity="2.0"
                                            containerStyle={styles.inputt}
                                            onChangeText={(value, index) =>
                                                this.setState({
                                                    discountTypeValue: value,
                                                    viewBtnFlag: "1"
                                                })
                                            }
                                        />
                                    </View>
                                </View>);


                        }
                    })()}

                    {(() => {

                        if (this.state.discountTypeView == true) {
                            return (
                                <View style={styles.logocontainer}>
                                    <View
                                        style={{
                                            width: "40%"
                                        }}
                                    >
                                        <Text style={styles.setDepartmentTextSize}>Discount Option</Text>
                                    </View>
                                    <View
                                      style={{
                                     width:'60%'
                                      }}
                                    >

                                        {
                                            <Dropdown
                                                label=""
                                                data={this.state.discountOption}
                                                value={this.state.discountOptionValue}
                                                // selectedValue={this.state.categoryHolder}
                                                itemTextStyle="bold"
                                                labelFontSize={16}
                                                dropdownOffset={{ top: 8, left: 25 }}
                                                fontSize={16}
                                                containerStyle={styles.inputt}
                                                onChangeText={(value, index) =>
                                                    this.setState({
                                                        discountOptionValue: value,
                                                        viewBtnFlag: "1"
                                                    })
                                                }
                                            />
                                        }
                                    </View>
                                </View>);
                        }
                    })()}

                    {(() => {

                        if (this.state.discountTypeView == true) {
                            return (
                                <View style={styles.logocontainer}>
                                    <View
                                        style={{
                                            alignItems: 'flex-end',
                                            paddingHorizontal: 5,
                                            paddingVertical: 10,
                                          }}
                                    >
                                        <Text style={styles.setDepartmentTextSize}>Discount Value</Text>
                                    </View>
                                    <View
                                      style={{
                                        alignItems: 'flex-end',
                                        paddingHorizontal: 30,
                                        paddingVertical: 10,
                                      }}
                                    >
                                        <TextInput
                                            // style={styles.input}
                                            //  returnKeyType="next"
                                            // style={{backgroundColor:"white"}}
                                            keyboardType="default"
                                            autoCapitalize="none"
                                            autoCorrect={false}
                                            returnKeyType="done"
                                            value={this.state.discountValue}
                                            keyboardType="numeric"
                                            onChangeText={discountValue =>
                                                this.setState({
                                                    discountValue,
                                                    viewBtnFlag: "1"
                                                })
                                            }
                                        />
                                    </View>
                                </View>);
                        }
                    })()}

                    <View style={styles.logocontainer}>
                        <View
                           style={{
                            alignItems: 'flex-end',
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                          }}
                        >
                            <Text style={styles.setTextSize}>Regd Cust Value</Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                              }}
                        >
                            <TextInput
                                // style={styles.input}
                                // returnKeyType="next"
                    
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="done"
                                keyboardType="numeric"
                                value={this.state.regdCustPrice}
                                onChangeText={regdCustPrice =>
                                    this.setState({
                                        regdCustPrice,
                                        viewBtnFlag: "1"
                                    })
                                }
                            />
                        </View>
                    </View>
                    {/* <View style={styles.taxContainer}>
                        <View
                            style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                              }}
                        >
                            <Text style={styles.setTextSize}>Item Type</Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                              }}
                        >
                            <View>
                                <RadioForm
                                    radio_props={this.itemArray}
                                    labelstyle={{
                                        fontSize: 40,
                                        fontWeight: "bold",
                                        color: "red",
                                        alignItems: "center",


                                    }}

                                    flexDirection="row"
                                    buttonSize={10}
                                    formHorizontal={true}
                                    initial={this.state.itemTypeValue}
                                    labelColor="#636466"
                                    selectedLabelColor="#286fb7"
                                    animation={true}
                                    onPress={itemTypeValue => {
                                        this.setState({
                                            itemTypeValue: itemTypeValue,
                                            viewBtnFlag: "1"
                                        });
                                    }}
                                />
                            </View>
                        </View>
                    </View> */}
                    <View style={styles.logocontainer}>
                        <View
                           style={{
                            alignItems: 'flex-end',
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                          }}
                        >
                            <Text style={styles.setTextSize}>Quantity Limit </Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 30,
                                paddingVertical: 10,
                              }}
                        >
                            <TextInput
                                // style={styles.input}
                                // returnKeyType="next"
                                keyboardType="default"
                                autoCapitalize="none"
                                autoCorrect={false}
                                returnKeyType="done"
                                keyboardType="numeric"
                                value={this.state.quantityLimit}
                                onChangeText={quantityLimit =>
                                    this.setState({
                                        quantityLimit,
                                        viewBtnFlag: "1"
                                    })
                                }
                            />
                        </View>
                    </View>
                    <View style={styles.logocontainer}>
                        <View
                            style={{
                                alignItems: 'flex-end',
                                paddingHorizontal: 5,
                                paddingVertical: 10,
                              }}
                        >
                            <Text style={styles.setDepartmentTextSize}>Allow Regr. Price</Text>
                        </View>
                        {(() => {
                            if (this.state.quantityLimit == 0 || this.state.quantityLimit <=0) {
                                return (
                                    <View
                                    style={{
                                        alignItems: 'flex-end',
                                        paddingHorizontal: 30,
                                        paddingVertical: 10,
                                      }}
                                    >
                                        <Dropdown
                                            //  label="Select "

                                            //data={this.state.regrPriceArray}
                                            value={this.state.allowRegdCust}
                                            itemTextStyle="bold"
                                            labelFontSize={16}
                                            fontSize={16}
                                            shadeOpacity="2.0"
                                            dropdownOffset={{ top: 8, left: 25 }}
                                            // containerStyle={styles.inputt1}


                                        //    onChangeText={(value, index) => this.getCategoryList(value, index)}

                                        />
                                    </View>
                                )
                            }
                        })()}
                        {(() => {
                            if (this.state.quantityLimit !=0 || this.state.quantityLimit>0) {
                                return (
                                    <View
                                    style={{
                                        alignItems: 'flex-end',
                                        paddingHorizontal: 30,
                                        paddingVertical: 10,
                                      }}
                                    >
                                        <Dropdown
                                            // label="Select Department"
                                            // defaultValue={"Buy N get discount"}
                                            data={this.state.regrPriceArray}
                                            value={this.state.allowRegdCust}
                                            itemTextStyle="bold"
                                            labelFontSize={16}
                                            fontSize={16}
                                            shadeOpacity="2.0"
                                            dropdownOffset={{ top: 8, left: 25 }}
                                            containerStyle={styles.inputt}
                                            onChangeText={(value) =>
                                                this.setState({
                                                    allowRegdCust: value,
                                                    viewBtnFlag: "1"
                                                })
                                            }

                                        />
                                    </View>
                                )
                            }
                        })()}
                    </View>
                    <View style={styles.logocontainer}>
                        <View
                            style={{
                                width: "40%", marginTop: "2%"
                            }}
                        >
                            <Text style={styles.setTextSize}>Status</Text>
                        </View>
                        <View
                            style={{
                                width: "60%"
                            }}
                        >

                            {
                                <Dropdown
                                    label=""
                                    data={this.state.promStatus}
                                    value={this.state.Status}
                                    defaultValue={"Active"}
                                    // selectedValue ={"Active"}
                                    itemTextStyle="bold"
                                    labelFontSize={16}
                                    fontSize={16}
                                    dropdownOffset={{ top: 8, left: 25 }}
                                    selectedValue={this.state.Status}
                                    containerStyle={styles.inputt}
                                    onChangeText={(value, index) =>
                                        this.setState({
                                            Status: value,
                                            viewBtnFlag: "1"
                                        })
                                    }
                                />
                            }
                        </View>
                    </View>
                    <View style={{display: 'flex'}}>
      <Button
        style={{marginTop: 10,width:'80%'}}
        titleStyle={{color: '#fff', fontSize: 16}}
        buttonStyle={{
          padding: 12,
          backgroundColor: '#3386D6',
          borderRadius: 25,
        }}
        containerStyle={{margin: 20}}
        //type="outline"
        title="Add Items"
        onPress={() => this.viewItemBtnPress()}
      />
    </View>
                    {/* <View style={styles.btncontainerr}>
                        <TouchableOpacity
                            style={styles.btncontainer}
                            onPress={this.addItemBtnTapped}
                        >
                            <Text style={styles.btnText}>Add Item</Text>
                        </TouchableOpacity>
                        {(() => {
                            if (this.state.ViewBtnView == true) {
                                return (
                                    <TouchableOpacity
                                        style={styles.btncontainer}
                                        onPress={this.viewItemBtnPress}
                                    >
                                        <Text style={styles.btnText}>View Items</Text>
                                    </TouchableOpacity>
                                )
                            }
                        })()}
                    </View> */}
                </ScrollView>
                </View>
                <Loading ref="loading" />
            {/* </KeyboardAwareScrollView> */}
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
        shadowOffset: {width: 0, height: 2},
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

    btncontainerr: {
        // flexDirection: "row",
        // marginLeft: 50
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginTop: "10%",
        marginBottom: "5%"
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
        // marginTop: 13,
        marginBottom: 10,
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
        fontWeight: "400",
        color: "#fff"
    },
    setDepartmentTextSize: {
        fontSize: 18,
        fontWeight: "400",
        color: "#fff"
    },
    setCheckMark: {
        width: 50,
        height: 50,
        marginLeft: 70,
        color: "#fff"
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
        paddingHorizontal: 20,
        backgroundColor:"white",
    },
    inputCode: {
        //width: 250,
        alignSelf: "stretch",
        height: 40,
        backgroundColor: '#ccc',
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
        color: "white",
        fontSize: 36,
        paddingHorizontal: 20,
        backgroundColor:"white"

    },

    inputt: {
        //width: 250,
        // alignSelf: "stretch",
        height: 42,

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
        paddingHorizontal: 20,
    },
    setDepartmentTextSize: {
        fontSize: 18,
        fontWeight: "400",
        color: "#fff"
    },

    inputt1: {
        //width: 250,
        alignSelf: "stretch",
        height: 42,
        backgroundColor: '#ccc',

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

        borderRadius: 0,
        // mirginTop: 10,
        height: 35,
        marginHorizontal: "5%",
        // marginLeft: 10,
        // marginRight: 20,
        width: "35%",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10
    },
    btnText: {
        marginLeft: 0,
        fontSize: 20,
        color: "#fff"
    }
});

