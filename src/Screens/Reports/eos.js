import React, { Component } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image, ScrollView, 
  ImageBackground,
  SafeAreaView,
  ActivityIndicator
} from 'react-native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import DatePicker from 'react-native-datepicker';
import { Dropdown } from 'react-native-material-dropdown';
import Loading from 'react-native-whc-loading';
import AsyncStorage from '@react-native-community/async-storage';
import { Cell, Section, TableView } from "react-native-tableview-simple";


const CustomSectionHeader1 = props => (
  <View>
    <Text style={{ fontSize: 15, fontWeight: '500', color: '#3386D6', alignSelf: 'center', bottom: 4 }}> {props.header} </Text>
  </View>
);

const CustomSectionHeader2 = props => (
  <View>
    <Text style={{ fontSize: 15, fontWeight: '500', color: '#3386D6', alignSelf: 'center', bottom: 2 }}> {props.header} </Text>
  </View>
);

const cellPropsDarkTheme = {

  backgroundColor: '#D3D3D3',
  height: 5,
};

export default class Eos extends Component {

  constructor(props) {
    super(props)

    this.state = {
      date: new Date(),
      SalesTotal: [],
      TenderTotal: [],
      salesData: [],
      salesnottaxed: '',
      salestaxed: '',
      grandtotal: '',
      salesexcluding: '',
      taxes: '',
      liability: '',
      openingcash: '',
      cashsales: '',
      cashpaidout: '',
      cashpickup: '',
      expectedcash: '',
      actualcash: '',
      cashover: '',
      Coupon: '',
      CashDetails: '',
      CashDetailValue: '',
      batch: '',
      addcash: '',
      shiftStart: "",
      shiftEnd: "",
      bottleDeposit: "",
      BottleDepositRedeem: "",
      TotalReturns: "",
      onAccount: "",
      cashShort: "",
      register: "",
      tenderType: [],
      libailityType: [],
      storeName: "",
      StoreID: "",
      totalLotoSales: "",
      lottoSales: "",
      loteryReddem: "",
      cashTender: "",
      creditCard: "",
      checkTender: "",
      EBTTender: "",
      ONAcc: "",
      houseAcctPayCash: "",
      houseAccCard: "",
      houseAcCheck: "",
      instantSales: "",
      instantRedeem: ""



    }
    this.batchData = null

  }



  // static navigationOptions = ({ navigate, navigation }) => ({
  //   headerTitle: (
  //     <View style={{ flex: 1, alignItems: "center", marginStart: 0 }}>
  //       <Image source={require('../images/poslogo.jpg')}
  //         style={{ height: 100, width: 100, marginRight: 0, resizeMode: 'contain' }} />
  //     </View>
  //   ),
  //   // headerRight: <TouchableOpacity onPress={() => { navigation.navigate('Notifications'); }}><FontAwesome name="bell" size={25} color="#16a0db" /></TouchableOpacity>,
  // })

  Nextscreen = () => {
    this.props.navigation.navigate('Dashboard');
  }

  componentDidMount() {

    this.setState({ visibleDetails: false })


  }

  getReportData = (batchID) => {

    AsyncStorage.getItem('token').then((data) => {
      AsyncStorage.getItem('Sid').then((SID) => {
        if (batchID) {

          this.setState({ batch: batchID })
         


          return fetch(API_BASE_URL + `admin/z_report?sid=${SID}&batch=${batchID}&token=${data}`)

            .then((response) => response.json())
            .then((responseJson) => {



              console.log("cashdetailsss " + responseJson)
              this.setState({
                visibleDetails: true,
                storeName: responseJson[0].storename,
                StoreID: responseJson[0].sid,
                shiftStart: responseJson[0].BatchStartTime,
                shiftEnd: responseJson[0].BatchEndTime,
                register: responseJson[0].TerminalId,
                // Cashover: responseJson.Cashover,


                // TenderTotal: responseJson,
                cashTender: responseJson[0].CashTender,
                creditCard: responseJson[0].CreditCardTender,
                checkTender: responseJson[0].CheckTender,
                EBTTender: responseJson[0].EBTTender,
                ONAcc: responseJson[0].HouseAcctTender,
                houseAcctPayCash: responseJson[0].HouseAcctCash,
                houseAccCard: responseJson[0].HouseAcctCard,
                houseAcCheck: responseJson[0].HouseAcctCheck,

                salesexcluding: responseJson[0].SalesExclTax,
                salestaxed: responseJson[0].TotalTaxable,
                salesnottaxed: responseJson[0].TotalNonTaxable,
                taxes: responseJson[0].TotalTax,
                liability: responseJson[0].liabilitysales,
                totalLotoSales: responseJson[0].TotalLottery,
                bottleDeposit: responseJson[0].BottleDeposit,
                BottleDepositRedeem: responseJson[0].BottleDepositRedeem,
                grandtotal: responseJson[0].NetSales,

                //Loto sales Details
                lottoSales: responseJson[0].LotterySales,
                loteryReddem: responseJson[0].LotteryRedeem,
                instantSales: responseJson[0].InstantSales,
                instantRedeem: responseJson[0].InstantRedeem,

                //PERFORMANCE STATISTICS 
                TotalReturns: responseJson[0].TotalReturns,
                oftransaction: responseJson[0].NoOfTransactions,
                avgtransaction: parseFloat(responseJson[0].AvgSaleTrn).toFixed(2),

                //Cash Count
                openingcash: responseJson[0].OpeningBalance,
                cashsales: responseJson[0].CashTender,
                addcash: responseJson[0].NetAddCash,
                onAccount: responseJson[0].HouseAcctCash,
                cashpaidout: responseJson[0].NetPaidout,
                cashpickup: responseJson[0].NetCashPickup,
                expectedcash: responseJson[0].ClosingBalance,
                actualcash: responseJson[0].UserClosingBalance,
                cashShort: responseJson[0].CashShortOver,
                // CashDetails: responseJson.CashDetail,
                // CashDetailValue: responseJson.CashDetailValue,


              });


            })
            .catch(error => {
              console.error(error);
            });
        }
      });
    })
  }


  // getTendorDetails = (batchID) => {


  //   AsyncStorage.getItem('token').then((data) => {
  //     AsyncStorage.getItem('Sid').then((SID) => {
  //       if (batchID) {

  //         this.setState({ batch: batchID })

  //         return fetch(API_BASE_URL + `admin/zreport_detail?sid=${SID}&batch=${batchID}&token=${data}`)

  //           .then((response) => response.json())
  //           .then((responseJson) => {




  //             const tenderType = responseJson.filter(item => item.Type === 'Tender')
  //             const libailityType = responseJson.filter(item => item.Type === 'Liability')

  //             this.setState({
  //               visibleDetails: true,

  //               TenderTotal: responseJson,
  //               libailityType,
  //               tenderType
  //             });

  //           })
  //           .catch(error => {
  //             console.error(error);
  //           });
  //       }
  //     });
  //   })
  // }

  getBatches = (date) => {
    this.refs.loading.show();
    this.setState({ date: date })

    // AsyncStorage.setItem("Sid","1097");
    AsyncStorage.getItem("Sid").then(data => {
      if (data) {
        STORE_ID = data;
        API_URL = API_BASE_URL + "getbatches/";
        fetch(API_URL, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            sid: STORE_ID,
            date: this.state.date,

          }),
        }).then(response => response.json())
          .then(responseJson => {
            this.refs.loading.show(false);
            if (responseJson) {
                console.log(responseJson)
                this.setState(
                {
                  isLoading: false,
                  batchData: responseJson
                },

              );
            }
            else {
              alert("No Batches Available!")
            }
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
  }

  render() {

    if (!this.state.visibleDetails) {
      return (
        <SafeAreaView>
        <ScrollView>
        <View style={{width: '100%'}}>
          <ImageBackground
            source={require('../../assets/images/header.jpeg')}
            style={{position: 'relative', height: 80, paddingTop: 20}}>
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-start',
                paddingVertical: 10,
                paddingHorizontal: 20,
              }}>
              <Text
                style={{color: 'white'}}
                onPress={() => this.props.navigation.navigate('Reports')}>
                End of shift report
              </Text>
            </View>
          </ImageBackground>
        </View>

          {/* <View style={{ marginTop: 5, marginBottom: 10, alignContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 25, fontWeight: '700', color: '#3386D6' }}>End of Shift Report</Text>
          </View> */}

          <View style={{ flex: 1, flexDirection: "row", width: "100%" ,backgroundColor:'#fff'}}>
            <View style={{ width: "50%" }}>
              <DatePicker
                style={{ width: "100%", paddingTop: 20 }}
                date={this.state.date}
                mode="date"
                androidMode="spinner"
                placeholder="select date"
                format="MM-DD-YYYY"
                // minDate="2016-05-01"
                // maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.getBatches(date) }}
              />
            </View>
            <View style={{ width: "50%" }}>
              <Dropdown
                // style={{ width: "80%" }}
                label='Select Batch'
                data={this.state.batchData}
                containerStyle={{
                //   borderRadius: 30,

                // shadowColor: '#000',
                // shadowOffset: {width: 0, height: 0},
                // shadowOpacity: 0.1,
                // shadowRadius: 0.2,
                // elevation: 2,
                // backgroundColor: '#fff',
                  // height:'10%',
                  // backgroundColor:'blue',height:40,color:'white'
                }}
                  itemTextStyle={{
                    padding: 2,
                    // marginTop: 2,
                    // backgroundColor: 'blue',
                    borderColor: '#bbb',
                    borderWidth: 1,}}
                    onChangeText={(value) => {
                    this.getReportData(value)
                  //alert(value)
                }}

              // onChangeText= function({}) {this.getReportData(this.selectedIndex)}
              // propsExtractor={({ props }, index) => props}
              />
            </View>
          </View>

          <Loading ref="loading" />
        </ScrollView>
        </SafeAreaView>
      );
    }
    else {
      return (
        <SafeAreaView>
        <ScrollView>
          
         

          <View style={{ flex: 1, flexDirection: "row", width: "100%" }}>
            <View style={{ width: "50%" }}>
              <DatePicker
                style={{ width: "90%", paddingTop: 20 }}
                date={this.state.date}
                mode="date"
                androidMode="spinner"
                placeholder="select date"
                format="MM-DD-YYYY"
                // minDate="2016-05-01"
                // maxDate="2016-06-01"
                confirmBtnText="Confirm"
                cancelBtnText="Cancel"
                customStyles={{
                  dateIcon: {
                    position: 'absolute',
                    left: 0,
                    top: 4,
                    marginLeft: 0
                  },
                  dateInput: {
                    marginLeft: 36
                  }
                  // ... You can check the source to find the other keys.
                }}
                onDateChange={(date) => { this.getBatches(date) }}
              />
            </View>
            <View style={{ width: "50%" }}>
              <Dropdown
                style={{ width: "80%" }}
                label='Select Batch'
                data={this.state.batchData}
                onChangeText={(value) => {

                this.getReportData(value)

                  //alert(value)
                }}

              />
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#fff',
              borderRadius: 0,
              paddingHorizontal: 35,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              shadowRadius: 2,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>SALES TOTAL</Text>
            </View>
           
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text>SALES (excluding Tax)</Text>
                    <Text>${this.state.salesexcluding}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text>TAXABLE SALES</Text>
                    <Text>${this.state.salestaxed}</Text>
                  </View>
                  {/* <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text>TAXABLE SALES</Text>
                    <Text>${this.state.salestaxed}</Text>
                  </View> */}
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text>NON-TAXABLE</Text>
                    <Text>${this.state.salestaxed}</Text>
                  </View> 
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text>TOTAL TAX</Text>
                    <Text>${this.state.salestaxed}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                      <Text>GRAND TOTAL</Text>
                    <Text>${this.state.grandtotal}</Text>
                  </View>
                </View>
             
          </View>


          <View
            style={{
              marginTop: 8,
              backgroundColor: '#fff',
              borderRadius: 0,
              paddingHorizontal: 35,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              shadowRadius: 2,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>TENDER TOTAL</Text>
            </View>
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>CASH</Text>
                    <Text>${this.state.cashTender}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>CREDIT</Text>
                    <Text>${this.state.creditCard}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>EBT</Text>
                    <Text>${this.state.EBTTender}</Text>
                  </View>
                </View>
             
          </View>

          <View
            style={{
              marginTop: 8,
              backgroundColor: '#fff',
              borderRadius: 0,
              paddingHorizontal: 35,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              shadowRadius: 2,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>PERFORMANCE STATISTICS</Text>
            </View>
            
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>#RETURNED ITEMS</Text>
                    <Text>${this.state.TotalReturns}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text># OF TRANSACTIONS</Text>
                    <Text>${this.state.oftransaction}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text># AVG TRANSACTIONS</Text>
                    <Text>${this.state.avgtransaction}</Text>
                  </View>
                </View>

                
           
          </View>

          <View
            style={{
              marginTop: 8,
              backgroundColor: '#fff',
              borderRadius: 0,
              paddingHorizontal: 35,
              paddingVertical: 20,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 1},
              shadowOpacity: 0.2,
              shadowRadius: 2,
              elevation: 3,
              shadowRadius: 2,
            }}>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <Text>CASH COUNT</Text>
            </View>
           
                <View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>OpeningCash</Text>
                    <Text>${this.state.openingcash}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>+ CASH SALES</Text>
                    <Text>${this.state.cashsales}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>- CASH PAID OUT</Text>
                    <Text>${this.state.cashpaidout}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>- SAFE DROP</Text>
                    <Text>${this.state.cashpickup}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>Expected Cash</Text>
                    <Text>${this.state.expectedcash}</Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>Actual Cash</Text>
                    <Text>${this.state.actualcash}</Text>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                    }}>
                    <Text>Cash Short</Text>
                    <Text>${this.state.cashShort}</Text>
                  </View>
                </View>
             
          </View>


          
          <Loading ref="loading" />
        </ScrollView>
        </SafeAreaView>
      );
    }

  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
    backgroundColor: '#068AD6'
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  headText: { color: "white", fontSize: 16, textAlign: "center", fontWeight: 'bold' },
  head: { height: 40, backgroundColor: '#3386D6' },
  text: { margin: 6, fontSize: 14, textAlign: 'left', color: '#3386D6' },
  table: {
    paddingTop: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    backgroundColor: '#ffff'
  }
});
