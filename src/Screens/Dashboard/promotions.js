import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View, Dimensions, Image, ActivityIndicator, TouchableWithoutFeedback, SwipeView ,ImageBackground} from 'react-native';
import {Button} from 'react-native-elements';
import {ListItem} from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import Loading from "react-native-whc-loading";
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-community/async-storage';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { NavigationEvents } from 'react-navigation'
// import Modal from "react-native-modal";

export default class Promotions extends Component {

    constructor() {
        super()

        this.state = { isLoading: false, isFetching: false, isModalVisible: false,dataSource:[] };
        this.setState({  ipoid: "", isLoading: false, });

    }
    

    nextscreen = (item, index) => {




        //  alert(item.ipoid)
     if(item.category == "Open Ended"){

        AsyncStorage.setItem(
            "promotion_id",
            JSON.stringify(item.promotion_id)
        );
        AsyncStorage.setItem(
            "category",item.category
        );
        AsyncStorage.setItem(
            "itemTypeValue",item.same_group
        );
        this.props.navigation.navigate('PromOpen')
     }

     if(item.category == "Time Bound"){

        AsyncStorage.setItem(
            "promotion_id",
            JSON.stringify(item.promotion_id)
        );
        AsyncStorage.setItem(
            "category",item.category
        );
        AsyncStorage.setItem(
            "itemTypeValue",item.same_group
        );
        this.props.navigation.navigate('PromTime')
     }

     if(item.category == "Stock Bound"){

        AsyncStorage.setItem(
            "promotion_id",
            JSON.stringify(item.promotion_id)
        );
        AsyncStorage.setItem(
            "category",item.category
        );

        AsyncStorage.setItem(
            "itemTypeValue",item.same_group
        );
        this.props.navigation.navigate('PromStockBuyN')
        
     }

     

        // AsyncStorage.setItem(
        //     "itemTypeValue",
        //     item.same_group
        // );
        
      
        // AsyncStorage.setItem(
        //     "same_group",item.same_group
        // );

     //   this.props.navigation.navigate('',item.same_group)
        


     
    //    this.props.navigation.navigate('PromStockBuyN')
    }

    onRefresh() {
        this.setState({ isFetching: true }, function () { this.componentDidMount() });
    }



    LoginPress = () => {

        // alert("Under Development")
         this.props.navigation.navigate('PromTile')
     //this.setState({ isModalVisible: !this.state.isModalVisible });
    }

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
    // }

    // renderItem = ({ item, index }) => {



    //     console.log(item.estatus)
    //     return (
    //         <View>



    //             <ScrollView>
    //                 < View style={{
    //                     marginTop: 3, borderRightWidth: 1,
    //                     borderBottomWidth: 1,

    //                 }
    //                 }>


    //                     {/* <TouchableOpacity onPress={this.nextscreen()}> */}

    //                     <TouchableWithoutFeedback onPress={() => this.nextscreen(item, index)}>


    //                         <View style={{ flexDirection: 'row', paddingHorizontal: '1%', marginBottom: '0%', width: "100%", backgroundColor: '#fff' }}>
    //                             <Text style={{ fontSize: 18,  color:'#3386D6', width: "30%" , color: item.status === 'Active' ? '#3386D6' : '#ff0000', }}>{item.promotion_name}</Text>
    //                             <Text style={{ fontSize: 18,  color:'#3386D6', width: "22%" , paddingHorizontal: "2%", color: item.status === 'Active' ? '#3386D6' : '#ff0000', }}>{item.promotion_type}</Text>
    //                             <Text style={{ fontSize: 18,  color: '#3386D6', width: "28%" , textAlign: 'center' ,color: item.status === 'Active' ? '#3386D6' : '#ff0000', }}>{item.status}</Text>
    //                             <Text style={{ fontSize: 18,  color: '#3386D6', width: "15%" , textAlign: 'center' ,color: item.status === 'Active' ? '#3386D6' : '#ff0000', }}>{item.category}</Text>
    //                         </View>




    //                     </TouchableWithoutFeedback>



    //                 </View >

    //             </ScrollView>



    //         </View>

    //     )


    // }

    componentDidMount() {


        AsyncStorage.removeItem("promotion_id");

        AsyncStorage.removeItem("category");
        AsyncStorage.removeItem("itemTypeValue");

        

        AsyncStorage.getItem("token").then(data => {
            AsyncStorage.getItem("Sid").then(datasid => {
                if (data) {
                    this.setState(
                        {
                            isLoading: true,
                        },

                    );
                    const url = API_BASE_URL + 'admin/getAllPromotion?'
                    fetch(url +"sid=" + datasid + "&token=" + data)

                        .then((response) => response.json())
                        .then((responsejson) => {
                            this.setState(
                                {
                                    isLoading: false,
                                },

                            );

                            this.setState({ isFetching: false })

                            if (responsejson.status == "success") {

                                this.setState({ dataSource: responsejson.data })
                            }

                            if (!this.alertPresent) {
                                this.alertPresent = true;

                                if (responsejson.status == "error") {

                                    alert(responsejson.error)
                                }
                                else {
                                    this.alertPresent = false;

                                }
                            }



                        })
                        .catch((error) => {
                            console.log(error)
                        });
                }
            })

        })



        // AsyncStorage.getItem("Sid").then(SID => {
        //     const url = 'https://devportal.albertapayments.com/api/get_receiving_order2/'
        //     fetch(url)
        //         .then((response) => response.json())
        //         .then((responsejson) => {
        //             // this.setState({ isLoading: false, dataSource: responsejson.table_data })
        //             this.setState({ isLoading: false });

        //             this.setState({ dataSource: responseJson.table_data });
        //         })
        //         .catch((error) => {
        //             console.log(error)
        //         });

        // });


    }

    timebtnClicked = () =>{
        // AsyncStorage.setItem("time","Time Bond")
        this.props.navigation.navigate('PromTime');
        //this.props.navigation.navigate('Barcodechangeprice');
      
      } 


    render() {
        if (this.state.isLoading) {
            return (
                <View style={{ flex: 1, padding: 20, alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
                    <ActivityIndicator size={"large"} />
                </View>
            );
        }

        const screenWidth = Math.round(Dimensions.get('window').width);
     

        return (



            <View>
                  <View style={{width: '100%'}}>
              <ImageBackground
                source={require('../../assets/images/header.jpeg')}
                style={{position: 'relative', height: 100, paddingTop: 20}}>
                <View
                  style={{
                    // display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems:'center',
                    paddingVertical: 10,
                    paddingHorizontal:10
                  }}>
                                      <FontAwesome style={{marginRight:0}} name="caret-left" color={'#fff'} size={26} onPress={()=>this.props.navigation.navigate('Promotions')} />
                  <Text style={{color: 'white',fontSize:15,paddingVertical:3,marginLeft:-150}} onPress={()=>this.props.navigation.navigate('Promotions')}>Promotions</Text>
                  <View >
              <Button
              style={{marginTop:10,}}
                titleStyle={{color: '#3386D6', fontSize: 16}}
                buttonStyle={{
                  paddingVertical: 12,
                  paddingHorizontal:20,
                  backgroundColor: '#fff',
                  borderRadius: 25,
                  // width:"50%"
                }}
                // containerStyle={{margin: 20}}
                //type="outline"
                title="Add New"
                onPress={() => {
                  this.LoginPress();
                }}
              />
            </View>
                  
                </View>
              </ImageBackground>
            </View>
                {/* <NavigationEvents onDidFocus={() => this.componentDidMount()} /> */}

                {/* <TouchableOpacity
                    style={styles.btncontainer}
                    onPress={this.LoginPress}
                >
                    <Text style={styles.btntext}>Add New</Text>
                </TouchableOpacity> */}

                   {/* <Modal isVisible={this.state.isModalVisible}>   */}
                   
{/* 
                     <View style={styles.mainContainer}>
                     
                     {(() => {
                        if(screenWidth < 414) {
                            return (
                                <View style={styles.dummyContainer} />
                            );
                        }
                    })()} 
                        
                        <View style={styles.modelContainer}>
                            <View style={styles.mainHeading}>
                                <Text style={styles.mainHeadingText}>Promotion</Text>
                            </View>
                            <View style={styles.subHeading}>
                                <Text  style={styles.subHeadingText}>Pick a Promotion Type</Text>
                            </View>
                            <TouchableOpacity style={styles.block}>
                                <Text style={styles.blockText}>STOCK BOUND</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.block}>
                                <Text style={styles.blockText}>TIME BOUND</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.block}>
                                <Text style={styles.blockText}>OPEN ENDED</Text>
                            </TouchableOpacity>

                        </View> 
                          { { {(() => {
                                if(screenWidth < 414) {
                                    
                                    return (
                                        <View style={styles.dummyContainer} />
                                    );
                                } }
                            })()} }
                        
                    </View> */}
                {/* </Modal>  */}



                <View style={styles.container}>


                    <View flexDirection='row' marginTop='0%'>



                        <View style={{
                            width: '35%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 60
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 16, color: '#fff', fontWeight: "bold" }}>Promotion Name
</Text>
                        </View>


                        <View style={{
                            width: '20%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 60,
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 16, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>Type
</Text>
                        </View>

                        <View style={{
                            width: '20%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 60,
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 16, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>Status
                        </Text>
                        </View>

                        <View style={{
                            width: '25%', alignItems: 'center', justifyContent: 'center',
                            backgroundColor: "#3386D6", height: 60,
                        }}>
                            <Text style={{ fontWeight: '300', fontSize: 16, color: '#fff', flexDirection: 'row', fontWeight: "bold" }}>Category
                        </Text>
                        </View>


                    </View>
                    {
              this.state.dataSource.map((val,idx)=>{
                  return(
                      
                    <TouchableOpacity onPress={() => this.timebtnClicked()}>
                    <ListItem
                    // key = {index}
                    keyExtractor={(item, index) => index.toString()}
                    
                      bottomDivider
                      containerStyle={{
                        borderRadius: 35,
                        marginHorizontal: 5,
                        marginVertical: 10,
                      }}>
                      <View style={{flexDirection: 'row',fontSize:14}}>
                          
                      <Text style={{width:100}}>{val.promotion_name}</Text>
                      <Text style={{width:100}}>{val.promotion_type}</Text>
                      <Text style={{width:100}}>{val.status}</Text>
                      <Text style={{width:50}}>{val.category}</Text>
                        {/* <FontAwesome style={{marginRight:0}} name="remove" color={'#3386D6'} size={16} onPress={()=>this.removeItem(val,idx)} /> */}
                        
                      </View>
                    </ListItem>
                  </TouchableOpacity>
                  )
              })
          }


                    {/* <FlatList
                        // horizontal={true}

                        data={this.state.dataSource}
                        renderItem={this.renderItem}
                        extraData={this.state}
                        onRefresh={() => this.onRefresh()}
                        refreshing={this.state.isFetching}
                        ItemSeparatorComponent={this.renderSeparator}

                    // showsVerticalScrollIndicator={true}
                    // showsHorizontalScrollIndicator={false}


                    //keyExtractor={(item, index) => index.toString()}



                    /> */}

                </View>
                <View style={{ marginTop: 0, backgroundColor: '#000', height: '20%' }}>



                </View>


            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {

        // paddingTop: 10,
        marginTop: 5,
        marginBottom: "10%",

        height: '80%',
        // fontSize:15



    },
    item: {
        padding: 10,
        fontSize: 20,
        height: 70,

    },
    btncontainer: {
        backgroundColor: "#3386D6",


        // marginTop: 10,
        bottom: 5,
        borderRadius: 40,
        height: 40,
        marginLeft: "65%",
        width: "35%",
        alignItems: 'center',
        justifyContent: 'center'
    },
    btntext: {
        //textAlign : 'center',
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff"
    },
    mainContainer: {
        flex: 1,
    },
    dummyContainer: {
        flex: 1,
    },
        modelContainer: {
        // height: 700,

        flex: 3,
        justifyContent: 'center',
        backgroundColor: '#fff',
        paddingHorizontal: 10,
    },

    mainHeading: {
        flex: 1,
        alignItems: 'center',
    },
    subHeading: {
        flex: 1,
        alignItems: 'center',
    },
    mainHeadingText: {
        marginTop: 20,
        color: 'blue',
        fontSize: 28,
        fontWeight: '800',
    },
    subHeadingText: {
        marginTop: 20,
        color: '#000',
        fontSize: 16,
    },
    block: {
        flex: 1,
        // alignItems: 'center',
        backgroundColor: 'red',
        marginBottom: 20, 
        marginLeft: 30,
        marginRight: 30,
    },
    blockText: {
        color: '#fff',
        alignSelf: 'center',
         marginTop : '7%',
    }
})