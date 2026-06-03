import React from "react";
import { ActivityIndicator, View } from "react-native";
const Loading = ()=>{
    return(
        <View style={{
             alignItems:'center', justifyContent:'center', marginTop:'50%'
        }}>
           < ActivityIndicator color={'orange'} size={100}/>
        </View>
    );
};


export default Loading;