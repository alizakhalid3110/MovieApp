import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import { useState, useEffect } from "react";



const Upcoming = ({ data }) => {
    const [MovieDetail, setMovieDetail] = useState([]); // Keep state for consistency if needed elsewhere, but not for navigation
    const [id, setid] = useState(null); // Initialize with null
    const [change, setChange] = useState(false);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [MovieCasts, setMovieCasts] = useState([]);

    const navigation = useNavigation();
    const API_KEY = "eb211ac19b4a206a16686a24dc91649a";

    // Use a function that takes the ID as an argument
    const FetchDtails = async (movieId) => {
        if (!movieId) return; // Important check

        const detailurl = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${API_KEY}`;
        const similarurl = `https://api.themoviedb.org/3/movie/${movieId}/similar?api_key=${API_KEY}`;
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



            navigation.navigate('Movie', { MovieDetail: Detaildata, relatedMovies: relateddata, MovieCasts: castdata });

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


    return (

        <View style={{ padding: 20 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{
                    color: 'white', fontWeight: 'bold', fontSize: 16
                }}>Upcoming</Text>
                <TouchableOpacity>
                    <Text style={{
                        color: 'orange'
                    }}>See all</Text>
                </TouchableOpacity>


            </View>
            <ScrollView horizontal contentContainerStyle={{
                flexDirection: 'row', gap: 17, marginTop: 30
            }}>
                {
                    data.map((item, index) => {

                        return (
                            <TouchableOpacity onPress={() => setid(item.id)}
                                key={index} style={{ borderRadius: 15 }}>
                                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }} style={{
                                    height: 160, width: 130, borderRadius: 15
                                }} />
                                <Text style={{
                                    color: 'white', marginTop: 7
                                }}>{item.original_title && item.original_title.length > 15 ? item.original_title.slice(0, 15) + '...' : item.orignal_title
                                    }</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>

    );
};


export default Upcoming;