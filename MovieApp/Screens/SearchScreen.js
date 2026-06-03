import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, TextInput, StyleSheet } from "react-native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";

const SearchScreen = ({ data }) => {
    const [MovieDetail, setMovieDetail] = useState([]);
    const [id, setid] = useState(null);
    const [change, setChange] = useState(false);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [MovieCasts, setMovieCasts] = useState([]);
    const [search, setsearch] = useState('the dark knight');
    const [showMovie, setShowMovie] = useState(null);

    const navigation = useNavigation();
    const API_KEY = "eb211ac19b4a206a16686a24dc91649a";

    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&querry=${search}`;

    const SearchMovie = async () => {
        const response = await fetch(url);
        const data = await response.json();
        console.log(data);
    };

    useEffect(() => {
        SearchMovie();
    }, [showMovie]);

    return (
        <View style={styles.container}>
            {/* search bar */}
            <View style={styles.searchBar}>
                <TextInput
                    placeholder="search movie"
                    value={search}
                    onChangeText={(text) => setsearch(text)}
                    placeholderTextColor={'darkgray'}
                    style={styles.input}
                />

                <TouchableOpacity onPress={() => setShowMovie(true)} style={styles.searchBtn}>
                    <MagnifyingGlassIcon size={22} color={'darkgray'} />
                </TouchableOpacity>
            </View>

            <View style={styles.headerRow}>
                <Text style={styles.upcomingText}>Upcoming</Text>

                <TouchableOpacity>
                    <Text style={styles.seeAllText}>See all</Text>
                </TouchableOpacity>
            </View>

            {/* <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => setid(item.id)}
                                key={index} style={styles.movieCard}>
                                <Image source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                    style={styles.poster} />
                                <Text style={styles.movieTitle}>
                                    {item.original_title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView> */}
        </View>
    );
};

export default SearchScreen;

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    searchBar: {
        backgroundColor: '#e8e5e5ff',
        width: '92%',
        height: 50,
        alignSelf: 'center',
        marginTop: 30,
        borderRadius: 30,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 5
    },
    input: {
        marginLeft: 10
    },
    searchBtn: {
        backgroundColor: 'white',
        marginRight: 10,
        padding: 10,
        borderRadius: 35,
        alignItems: 'center',
        justifyContent: 'center',
        height: 35,
        width: 35,
        alignSelf: 'center',
        elevation: 10
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    upcomingText: {
        color: 'white'
    },
    seeAllText: {
        color: 'orange'
    },
    scrollContainer: {
        flexDirection: 'row',
        gap: 17,
        marginTop: 30
    },
    movieCard: {
        borderRadius: 15
    },
    poster: {
        height: 160,
        width: 130,
        borderRadius: 15
    },
    movieTitle: {
        color: 'white',
        marginTop: 7
    }
});