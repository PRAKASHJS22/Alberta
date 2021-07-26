/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import welcome from './src/Screens/login/welcome';
import 'react-native-gesture-handler';
import Splash from "./src/Screens/splashscreen";
import login from './src/Screens/login/login';
import Dashboard from "./src/Screens/Dashboard/dashboard";
import Container from "./src/Screens/container";
import ReceivingOrder from "./src/Screens/Dashboard/receivingOrder";
import PrintLabel from "./src/Screens/Dashboard/printLabel";
import Promotions from "./src/Screens/Dashboard/promotions";
import AddNewReceivingOrder from "./src/Screens/Dashboard/addNewRecievingorder";
import SelectItem from "./src/Screens/Dashboard/selectItem";
import ItemInformation from "./src/Screens/Dashboard/itemInformation";
import OrderInformation from "./src/Screens/Dashboard/orderInformation";
import Tutorials from "./src/Screens/Dashboard/tutorials";
import ReactNativeYouTubeExample from "./src/Screens/Dashboard/Flip";
import AddPrintLabel from "./src/Screens/Dashboard/addPrintLabel";
import PromTile from './src/Screens/Dashboard/PromTile'
import PromStockBuyN from './src/Screens/Dashboard/PromStockBuyN'
import PromStockAddItem from './src/Screens/Dashboard/PromStockAddItem'
import PromStockItemList from './src/Screens/Dashboard/PromStockItemList'
import PromOpen from './src/Screens/Dashboard/PromOpen'
import PromTime from './src/Screens/Dashboard/PromTime'
import PhyChooseItem from "./src/Screens/Dashboard/PhysChooseItem";
import PhyItemInformation from "./src/Screens/Dashboard/PhysItemInforma";
import PhysItemList from "./src/Screens/Dashboard/PhysItemList";
import PhysUserList from "./src/Screens/Dashboard/PhysUserList";

import saveUsername from "./src/Screens/login/usePassword";
import TabNav from "./src/Screens/Navigation/TabNav";
import currTrans from "./src/Screens/Reports/currTrans";
import Eos from "./src/Screens/Reports/eos";
import Eod from "./src/Screens/Reports/eod";
import ItemMov from "./src/Screens/Reports/itemMov";
import ReportsView from "./src/Screens/Reports/weeklyMonthlyYearly";


import AddItem from "./src/Screens/addItem";
import ItemChangePrice from "./src/Screens/ItemChangePrice";
import ChangePrice from "./src/Screens/changePrice";
import UpdateQty from "./src/Screens/updatwQty";
import UploadPic from "./src/Screens/uploadPic";
import NPLBlankResponse from "./src/Screens/NPLBlankResponse";
import NPLAddItem from "./src/Screens/NPLAddItem";
import AddNewItem from "./src/Screens/AddNewItem";
import UpdateQuantity from "./src/Screens/UpdateQuantity";
import UpadteImage from "./src/Screens/UpdateImage";

import Storetableview from "./src/Screens/Storetableview";
// import MatTabNav from "./src/Screens/Navigation/MatTabNav";
// import FingerPrint from "./src/Screens/login/faceId";
// import Logo from './src/assets/logo/Logo';
// import login from './src/Screens/Login/login';


const Stack = createStackNavigator();

function MyStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        
      
        <Stack.Screen
       
          name="Home"
          component={welcome}
          options={{ title: null,
          // headerTitle: () => <Logo />,
        // headerStyle:{
        //   backgroundColor: '#3386D6',
        //   shadowColor: 'transparent',
        //   shadowRadius: 0,
        //   shadowOffset: {
        //     height: 0,
        // }
        // },
        // headerTintColor: '#3386D6',
        // headerTitleStyle: {
        //   fontWeight: null,
        // },
        headerShown:false
       }
        }
      
        />
        <Stack.Screen name="Splash" component={ Splash }
        options={{title:null,headerShown:false}} />
   
         <Stack.Screen name="login" component={login }
        options={{title:null,headerShown:false}} />
        <Stack.Screen name="saveUsername" component={ saveUsername }
        options={{title:null,headerShown:false}} />
      
       
        <Stack.Screen name="Container" component={Container} />
         <Stack.Screen name="Dashboard" component={TabNav}
        options={{title:null,headerShown:false}} />
        <Stack.Screen name="ReceivingOrder" component={ReceivingOrder} options={{title:null,headerShown:false}}/>
        <Stack.Screen name="PrintLabel" component={PrintLabel} options={{title:null,headerShown:false}}/>
        <Stack.Screen name="Promotions" component={Promotions} options={{title:null,headerShown:true}} />
        <Stack.Screen name="AddItem" component={AddItem} options={{title:null,headerShown:false}}/>
        <Stack.Screen name="ItemChangePrice" component={ItemChangePrice} options={{title:null,headerShown:false}}/>
        <Stack.Screen name="ChangePrice" component={ChangePrice} options={{title:null,headerShown:false}}/>
        <Stack.Screen name="UpdateQty" component={UpdateQty} options={{title:null,headerShown:false}}/>
        <Stack.Screen name="UploadPic" component={UploadPic} options={{title:null,headerShown:true}}/>
        <Stack.Screen name="currTrans" component={currTrans} options={{title:null,headerShown:false}} />
        <Stack.Screen name="Eos" component={Eos} options={{title:null,headerShown:true}} />
        <Stack.Screen name="Eod" component={Eod} options={{title:null,headerShown:true}} />
        <Stack.Screen name="ItemMov" component={ItemMov} options={{title:null,headerShown:false}} />
        <Stack.Screen name="AddNewReceivingOrder" component={AddNewReceivingOrder} options={{title:null,headerShown:false}} />
        <Stack.Screen name="SelectItem" component={SelectItem} options={{title:null,headerShown:false}} />
        <Stack.Screen name="ItemInformation" component={ItemInformation} options={{title:null,headerShown:false}} />
        <Stack.Screen name="OrderInformation" component={OrderInformation} options={{title:null,headerShown:false}} />
        <Stack.Screen name="Tutorials" component={Tutorials} options={{title:null,headerShown:false}} />
        <Stack.Screen name="ReactNativeYouTubeExample" component={ReactNativeYouTubeExample} options={{title:null,headerShown:true}} />
        <Stack.Screen name="AddPrintLabel" component={AddPrintLabel} options={{title:null,headerShown:false}} />
        <Stack.Screen name="NPLBlankResponse" component={NPLBlankResponse} options={{title:null,headerShown:true}} />
        <Stack.Screen name="NPLAddItem" component={NPLAddItem} options={{title:null,headerShown:true}} />
        <Stack.Screen name="AddNewItem" component={AddNewItem} options={{title:null,headerShown:false}} />
        <Stack.Screen name="UpdateQuantity" component={UpdateQuantity} options={{title:null,headerShown:false}} />
        <Stack.Screen name="ReportsView" component={ReportsView} options={{title:null,headerShown:false}} />
        <Stack.Screen name="UpadteImage" component={UpadteImage} options={{title:null,headerShown:true}} />
        <Stack.Screen name="PromTile" component={PromTile} options={{title:null,headerShown:true}} />
        <Stack.Screen name="PromStockBuyN" component={PromStockBuyN} options={{title:null,headerShown:true}} />
        <Stack.Screen name="PromStockAddItem" component={PromStockAddItem} options={{title:null,headerShown:true}} />
        <Stack.Screen name="PromStockItemList" component={PromStockItemList} options={{title:null,headerShown:true}} />
        <Stack.Screen name="PromOpen" component={PromOpen} options={{title:null,headerShown:true}} />
        <Stack.Screen name="PromTime" component={PromTime} options={{title:null,headerShown:true}} />
        <Stack.Screen name="PhysChooseItem" component={PhyChooseItem} options={{title:null,headerShown:true}} />
        <Stack.Screen name="PhyItemInformation" component={PhyItemInformation} options={{title:null,headerShown:true}} />
        <Stack.Screen name="PhysItemList" component={PhysItemList} options={{title:null,headerShown:true}} />
        <Stack.Screen name="PhysUserList" component={PhysUserList} options={{title:null,headerShown:true}} />
        <Stack.Screen name="Storetableview" component={Storetableview} options={{title:null,headerShown:true}} />
       
        {/* <Stack.Screen name="FingerPrint" component={ FingerPrint }
        options={{title:null,headerShown:false}} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
function HomeScreen({ navigation }) {
  return (
    <Button
      title="Go to Jane's profile"
      // onPress={() =>
      //   navigation.navigate('login', { name: '' })
      // }
    />
  );
}





export default MyStack;