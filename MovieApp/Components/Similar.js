import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity, Image, ScrollView, StyleSheet } from "react-native";

const Similar = ({ data }) => {
    const [, setMovieDetail] = useState([]);
    const [id, setid] = useState(null);
    const [change, setChange] = useState(false);
    const [relatedMovies, setRelatedMovies] = useState([]);
    const [MovieCasts, setMovieCasts] = useState([]);

    const navigation = useNavigation();
    const API_KEY = "eb211ac19b4a206a16686a24dc91649a";

    const FetchDtails = async (movieId) => {
        if (!movieId) return;

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

            navigation.navigate('Movie', {
                MovieDetail: Detaildata,
                relatedMovies: relateddata,
                MovieCasts: castdata
            });

            setMovieDetail(Detaildata);
            setRelatedMovies(relateddata);
            setMovieCasts(castdata);

            console.log(Detaildata);
            console.log(relateddata);
            console.log(castdata);

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
        <View style={styles.container}>
            <View style={styles.headerRow}>
                <Text style={styles.title}>Similar Movies</Text>
            </View>

            <ScrollView horizontal contentContainerStyle={styles.scrollContainer}>
                {
                    data.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => setid(item.id)}
                                key={index} style={styles.card}>
                                <Image
                                    source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
                                    style={styles.poster}
                                />
                                <Text style={styles.movieTitle}>
                                    {item.original_title}
                                </Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    );
};

export default Similar;

const styles = StyleSheet.create({
    container: {
        padding: 20
    },
    headerRow: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    title: {
        color: 'white',
        fontSize: 17,
        fontWeight: 'bold'
    },
    scrollContainer: {
        flexDirection: 'row',
        gap: 17,
        marginTop: 30,
        marginBottom: 50
    },
    card: {
        borderRadius: 15
    },
    poster: {
        height: 160,
        width: 130,
        borderRadius: 15
    },
    movieTitle: {
        color: 'white',
        marginTop: 13,
        textAlign: 'center'
    }
});