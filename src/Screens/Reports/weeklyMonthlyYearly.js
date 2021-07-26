import React, {Component} from 'react';
import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  StyleSheet,
} from 'react-native';
import {ListItem} from 'react-native-elements';
import {TouchableOpacity, ScrollView} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import moment from 'moment-timezone';
import AsyncStorage from '@react-native-community/async-storage';
import PureChart from "react-native-pure-chart";

export default class ReportsView extends Component {
  state = {
    isLoading: true ,
    tableData:[],
    chartData:[]

   
  };

  handleWeekly = () => {
    var date = moment().format('MM-DD-YYYY');
    this.setState({date: date});

    AsyncStorage.getItem('Sid').then(data => {
      if (data) {
        STORE_ID = data;
        API_URL =
          API_BASE_URL +
          'get_last_7days_transactions?store_id=' +
          data +
          '&date=' +
          date;
        return fetch(API_URL)
          .then(response => response.json())
          .then(responseJson => {
            // alert(JSON.stringify(responseJson));
            this.setState(
              {
                isLoading: false,
                // tableHead: responseJson.table_title,
                tableData: responseJson.table_data,
                chartData: responseJson.chart_data,
              },
              function () {},
            );
          })
          .catch(error => {
            console.error(error);
          });
      }
    });
    // this.getChartData("get_last_7days_transactions/")
  };

  componentDidMount() {
    this.handleWeekly()
  }

  handleMonthly = () => {

      this.getChartData("get_last_4weeks_transactions/")
  };
  handleYearly = () => {
  
    this.getChartData("get_last_12months_transactions/")
  };


  getChartData = (apiUrl) =>{
    AsyncStorage.getItem("Sid").then(data => {
        if (data) {
          STORE_ID = data;
          API_URL = API_BASE_URL + apiUrl + STORE_ID;
          return fetch(API_URL)
            .then(response => response.json())
            .then(responseJson => {
              console.log(responseJson);
              this.setState(
                {
                  isLoading: false,
                //   tableHead: responseJson.table_title,
                  tableData: responseJson.table_data,
                  chartData: responseJson.chart_data
                },
                function () { }
              );
            })
            .catch(error => {
              console.error(error);
            });
        }
      });

  }

  render() {
    let sampleData = [
        {
          seriesName: "Sales",
          data: this.state.chartData,
          color: "#3386D6"
        }
      ];
    return (
      <SafeAreaView>
        <View style={{width: '100%'}}>
          <ImageBackground
            source={require('../../assets/images/header.jpeg')}
            style={{position: 'relative', height: 200, paddingTop: 20}}>
            {/* <FontAwesome style={{marginTop:0}} name="caret-left" color={'#fff'} size={26} onPress={()=>this.props.navigation.navigate('Dashboard')} />
            <Text
              style={{color: '#fff', paddingHorizontal: 40}}
              onPress={() => this.props.navigation.navigate('Dashboard')}>
              Weekly/Monthly/Yearly Reports
            </Text> */}
            <FontAwesome style={{marginBottom:-27,marginLeft:10}} name="caret-left" color={'#fff'} size={26} onPress={()=>this.props.navigation.navigate('Reports')} />
                  <Text style={{color: 'white',fontSize:15,paddingHorizontal:8,paddingVertical:3,marginLeft:15}} onPress={()=>this.props.navigation.navigate('Reports')}> Weekly/Monthly/Yearly Reports</Text>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                marginTop: 30,
                alignContent:'center',
                marginLeft:30
              }}>
              <TouchableOpacity
                style={styles.btncontainer}
                onPress={() => this.handleWeekly()}>
                <Text style={styles.btntext}>W</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btncontainer}
                onPress={() => this.handleMonthly()}>
                <Text style={styles.btntext}>M</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.btncontainer}
                onPress={() => this.handleYearly()}>
                <Text style={styles.btntext}>Y</Text>
              </TouchableOpacity>
            </View>
          </ImageBackground>
        </View>
        <View  style={{
                  backgroundColor: '#fff',
                  borderRadius: 0,
                  paddingHorizontal: 20,
                  paddingVertical: 20,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 1},
                  shadowOpacity: 0.2,
                  shadowRadius: 2,
                  elevation: 3,
                  shadowRadius: 5,
                  margin:20,
                  marginTop: -60,
                }}>
        <PureChart
              data={sampleData}
              color="#000"
              width={"80%"}
              defaultColumnWidth={30}
              height={230}
              marginRight={"10%"}
              showEvenNumberXaxisLabel={false}
              backgroundColor="#fff"
              xAxisColor={"#000"}
              yAxisColor={"#000"}
              xAxisGridLineColor={"#ccc"}
              yAxisGridLineColor={"#ccc"}
              labelColor={"#000"}
              type="bar"
            //   size={20}
              numberOfYAxisGuideLine={10}
              customValueRenderer={(index, point) => {
                // if (index % 2 === 0) return null
                return (
                  <View>
                    <Text
                      style={{
                        textAlign: "center",
                        color: "#fff",
                        fontSize: 10,
                        fontWeight: "bold"
                      }}
                    >
                      {point.y}

                    </Text>
                  </View>
                );
              }}
            />
        </View>
        <ScrollView>
          {this.state.tableData.map((val, index) => {
            return (
              <View>
                {
                  <TouchableOpacity>
                    <ListItem
                      // key={index}
                      keyExtractor={(item, index) => index.toString()}
                      bottomDivider
                      containerStyle={{
                        borderRadius: 35,
                        marginHorizontal: 10,
                        marginVertical: 10,
                      }}>
                      <View style={{flexDirection:'row',justifyContent:'space-around',alignContent:'space-between'}}> 
                        {/* <FontAwesome name="circle" color={'#3386D6'} size={32} /> */}
                        <Text
                          style={{
                            fontSize: 12,
                            // paddingVertical: 2,
                            paddingHorizontal: 16,
                          }}>
                          {val[0]}
                        </Text>
                        <Text
                          style={{
                            fontSize: 16,
                            // paddingVertical: 2,
                            paddingHorizontal: 16,
                          }}>
                          {val[1]}
                        </Text>
                      </View>
                    </ListItem>
                  </TouchableOpacity>
                }
              </View>
            );
          })}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  btncontainer: {
    backgroundColor: '#fff',
    borderRadius: 10,
    height: 30,
    width: 50,
    // marginHorizontal:"1%",
    // marginStart: "28%",
    // width: "28%",
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    margin:10,
    // marginLeft: 12,
    //padding: 5,
  },
  btntext: {
    //textAlign : 'center',
    fontSize: 14,
    alignItems: 'center',
    color: '#000',
  },
});
