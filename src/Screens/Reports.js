import React,{Component  } from "react";
import { ScrollView } from "react-native";
import { View,Text,SafeAreaView , ImageBackground,} from "react-native";
import {ListItem} from 'react-native-elements';
import {TouchableOpacity} from 'react-native-gesture-handler';
import FontAwesome from 'react-native-vector-icons/FontAwesome';


export default class Reports extends Component{
    state={
        data:[{
            name:"current 25 Transactions"
        },
        {
            name:"End of Shift report"
        },
        {
            name:"End of day report"
        },
        {
            name:"sales history report"
        },
        {
            name:"Item Movement"
        },
        {
            name:"Tax Report"
        },
        {
          name:"Weekly/monthly/Yearly Report"
        }
    ]
    }

    handleClick = (item) =>{
      let data1 = JSON.stringify(item);
      let data2 = JSON.parse(data1)
      if(data2.name == "current 25 Transactions"){
        this.props.navigation.navigate('currTrans')
      }
      else if(data2.name == 'End of Shift report'){
      this.props.navigation.navigate('Eos')
      }
      else if(data2.name == 'End of day report'){
        this.props.navigation.navigate('Eod')
      }
      else if(data2.name == 'Item Movement'){
        this.props.navigation.navigate('ItemMov')
      }
      else if(data2.name == "Weekly/monthly/Yearly Report")
      this.props.navigation.navigate('ReportsView')
      
    }
    render(){
        return(
           <SafeAreaView>
      
               <View style={{width: '100%'}}>
              <ImageBackground
                source={require('../assets/images/header.jpeg')}
                style={{position: 'relative', height: 80, paddingTop: 20}}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    paddingVertical: 10,
                    paddingHorizontal:20
                  }}>
                 <FontAwesome style={{marginRight:0}} name="caret-left" color={'#fff'} size={26} onPress={()=>this.props.navigation.navigate('Dashboard')} />
                  <Text style={{color: 'white',fontSize:15,paddingHorizontal:8,paddingVertical:3}} onPress={()=>this.props.navigation.navigate('Dashboard')}>Reports</Text>
                </View>
              </ImageBackground>
            </View>
                <View>
          
                      {
                          this.state.data.map((val,index)=>{
                              return(
                
                                <TouchableOpacity onPress={()=>this.handleClick(val)}>
                                <ListItem
                                // key = {index}
                                keyExtractor={(item, index) => index.toString()}
                                
                                  bottomDivider
                                  containerStyle={{
                                    borderRadius: 35,
                                    marginHorizontal: 10,
                                    marginVertical: 10,
                                  }}>
                                  <View style={{flexDirection: 'row'}}>
                                    <FontAwesome name="circle" color={'#3386D6'} size={32} />
                                    <Text
                                      style={{
                                        fontSize: 16,
                                        paddingVertical: 5,
                                        paddingHorizontal: 16,
                                      }}>
                                      {val.name}
                                    </Text>
                                  </View>
                                </ListItem>
                              </TouchableOpacity>
                              )
                          })
                      }
                    


            </View>
            
           </SafeAreaView>
        )
    }
}