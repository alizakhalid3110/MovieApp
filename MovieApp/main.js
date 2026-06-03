import React from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import { Bars3CenterLeftIcon , MagnifyingGlassIcon} from "react-native-heroicons/outline";
import { SafeAreaView  } from "react-native-safe-area-context";
import Trendings from "./Components/Trendings";
import { useState, useEffect } from "react";
import TopRated from "./Components/Toprated";
import Upcoming from "./Components/upcoming";
import Loading from "./Components/Loading";

const Main = ({navigation})=>{
      const [TrendingMovies, setTrendingmovies]= useState([1,2,3]);
        const [TopratedMovies, setTopratedMovies]= useState([1,2,3]);
          const [UpcomingMovies, setUpcomingMovies ]= useState([1,2,3]);
          
          const [Load, setLoad]=useState(true)
          // 🔹 Replace with your actual API key (Bearer token)
const   API_KEY = "eb211ac19b4a206a16686a24dc91649a"; // vs

useEffect(() => {
  const fetchMovies = async () => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/trending/movie/day?language=en-US&api_key=${API_KEY}` 
      );
      
      const data = await res.json();
      console.log(data)
      setTrendingmovies(data.results || []);

      const res2 = await fetch(
        `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1&api_key=${API_KEY}`
      );
      const data2 = await res2.json();
      console.log(data2.results)
      setTopratedMovies(data2.results || []);

      const res3 = await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1&api_key=${API_KEY}`
      );
      const data3 = await res3.json();
      setUpcomingMovies(data3.results || []);

      setLoad(false);
    } catch (err) {
      console.error("Error fetching movies:", err);
    }
  };

  fetchMovies();
  
  
}, []);

  
  return(

    <SafeAreaView style={{
      backgroundColor:'#1f1d1dff', flex:1
    }}>
      
<View style={{
  padding:30, flexDirection:'row', justifyContent:'space-between'
}}>
<Bars3CenterLeftIcon  color={'white'} size={30}/>
<Text style={{
  color:'orange', fontSize:25, fontWeight:'bold'
}}>
  M<Text  style={{
  color:'white', fontSize:25, fontWeight:'bold'
}}>ovies</Text>
</Text>
<TouchableOpacity onPress={()=>navigation.navigate('Search')}>
<MagnifyingGlassIcon color={'white'} size={25}/>
</TouchableOpacity>

</View>{
  Load ? (
    <Loading/>

  ):(
    

<ScrollView 

showsVerticalScrollIndicator={false}
contentContainerStyle={{
}}
 >
  <Trendings data={TrendingMovies} setdata ={setTrendingmovies} />
   
{/* //Upcoming movies */}
<Upcoming data ={UpcomingMovies} />
<TopRated data ={TopratedMovies} />
</ScrollView>
  )
}


    </SafeAreaView>
    
  );
};


export default Main;