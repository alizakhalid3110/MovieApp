import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, Image , ScrollView} from "react-native";
import { useState } from "react";
import Person from "../Screens/personscreen";
import { useNavigation } from "@react-navigation/native";
const Casts = ({data})=>{
    const navigation = useNavigation();
    //  const [personId, setpersonId]= useState();

const [personDetail, setPersonDetail]=useState([]);
  const API_KEY = "eb211ac19b4a206a16686a24dc91649a";


        
        const PersonDetails = async(personId)=>{
                    const url = `https://api.themoviedb.org/3/person/${personId}?api_key=${API_KEY}`;
            const response =await fetch(url);
            const data = await response.json();

            navigation.navigate('Person', {personDetail:data});

            setPersonDetail(data);
            console.log(data);
        };






    return(
             <View style={{
                padding:20
             }}>
                          <View style={{ padding:10}}>
                           <Text style={{
                               color:'gray', fontSize:16
                           }}>Top Casts</Text>
                        
               
                           
                   </View>
         <ScrollView horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                    gap:10
                }}
                
                >
                    {
                        data.map((item, index)=>{
                            return(
                                <TouchableOpacity onPress={()=>PersonDetails(item.id)} key={index}>
                                    <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.profile_path}` }} style={{
                                        height:80, width:80, borderRadius:80, resizeMode:'cover'
                                    }}/>
                                    <Text style={{color:'gray', marginLeft:10, fontSize:12, marginTop:6}}>{item.name}</Text>
                                </TouchableOpacity>
                            )
                        })
                    }
                    </ScrollView>
                   </View>
    );
};


export default Casts;