import React, { use } from "react";
import { View, Text , Dimensions, Image, StyleSheet, TouchableOpacity} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { SafeAreaView } from "react-native-safe-area-context";
const  {width} = Dimensions.get('window');
import { useState , useEffect} from "react";
import { useNavigation } from "@react-navigation/native";




const Trendings = ({data})=>{
  
     const [MovieDetail, setMovieDetail] = useState([]); // Keep state for consistency if needed elsewhere, but not for navigation
      const [id, setid] = useState(null); // Initialize with null
      const [change, setChange] = useState(false);
      const [relatedMovies, setRelatedMovies]= useState([]);
      const [MovieCasts, setMovieCasts]= useState([]);
  
      const navigation = useNavigation();
      const API_KEY = "eb211ac19b4a206a16686a24dc91649a";
  
      // Use a function that takes the ID as an argument
      const FetchDtails = async (movieId) => {
          if (!movieId) return; // Important check
  
          const detailurl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
          const similarurl =`https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`;
          const CreditUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${API_KEY}`;
          try {
              const response = await fetch(detailurl);
              const Detaildata = await response.json();
              const fetchsimilar = await fetch(similarurl);
              const res2 = await fetchsimilar.json();
              const relateddata = res2.results;
              const Res3 = await fetch(CreditUrl);
              const Creditdata = await Res3.json();
              const castdata = Creditdata.cast;
              
  
          
              navigation.navigate('Movie', { MovieDetail: Detaildata ,relatedMovies:relateddata, MovieCasts:castdata});
  
              // Optional: Update state if you need the data in this component later
              setMovieDetail(Detaildata);
              setRelatedMovies(relateddata);
              setMovieCasts(castdata)
              console.log(Detaildata)
              console.log(relateddata)
              console.log(castdata)
              setChange(true);
  
          } catch (error) {
              console.error("Failed to fetch movie details:", error);
          }
      };                                                                  
  
  
      useEffect(() => {
          if (id) {
              FetchDtails(id);
          }
      }, [id]);

  return(
 <SafeAreaView style={{ flex:1,  alignItems:'center'}}>
    <Text style={{
        marginRight:270, marginBottom:30, color:'white'
    }}>Trendings</Text>
  <Carousel
 loop
 width={width}
 scrollAnimationDuration={1000}
 autoPlay ={false}
 data={data}
      height={300}
 renderItem={({item})=>(
    <TouchableOpacity style={{height:400,width:250, alignSelf:'center'}}  onPress={()=>setid(item.id)}  >
        <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
        
        
        style={{height:300, width:250, borderRadius:15}}
        />
    </TouchableOpacity>
 
 )

 }
 mode="stack"
   modeConfig={{ showLength: 2 }}

 />
  
 </SafeAreaView>

  )
};

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
   
  },
  card: {
    borderRadius: 12,
    backgroundColor: '#fff',
    padding: 10,
    alignItems: 'center',
    elevation: 3,
    width:'80%',
    marginLeft:'10%'
  },
  image: {
    width: 180,
    height: '180',
    borderRadius: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  

  },
  desc: {
    fontSize: 14,
    color: '#555',
    color:'orange'
  },
  discount: {
    fontSize: 14,
    color: 'green',
    marginTop: 5,
  },
});



export default Trendings;
