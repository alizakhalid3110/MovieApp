import React, { useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, ScrollView, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { ChevronLeftIcon, HeartIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";
import Casts from "../Components/Casts";
import Similar from "../Components/Similar";

const Movie = () => {
    const route = useRoute();
    const { MovieDetail } = route.params;
    const { relatedMovies } = route.params;
    const { MovieCasts } = route.params;

    const [favourite, setFavourite] = useState(false);
    const navigation = useNavigation();

    return (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
            <View>
                <ImageBackground
                    source={{ uri: `https://image.tmdb.org/t/p/w500${MovieDetail.poster_path}` }}
                    style={styles.imageBg}
                    imageStyle={styles.imageStyle}
                >
                    <View style={styles.header}>
                        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                            <ChevronLeftIcon size={24} color={'orange'} />
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setFavourite(!favourite)} style={styles.heartBtn}>
                            <HeartIcon size={24} color={favourite ? 'orange' : 'gray'} />
                        </TouchableOpacity>
                    </View>
                </ImageBackground>

                <View style={styles.titleWrapper}>
                    <Text style={styles.title}>
                        {MovieDetail.original_title}
                    </Text>
                </View>

                {/* date releasing */}
                <View>
                    <Text style={styles.releaseText}>
                        {MovieDetail.status} . {MovieDetail.release_date}. {MovieDetail.runtime}mins
                    </Text>
                </View>

                {/* Geners */}
                <View style={styles.genreWrapper}>
                    <Text style={styles.genreText}>
                        {MovieDetail.genres.map(g => g.name).join(" . ")}
                    </Text>
                </View>

                <View style={styles.overviewWrapper}>
                    <Text style={styles.overviewText}>
                        {MovieDetail.overview}
                    </Text>
                </View>

                <View>
                    <Casts data={MovieCasts} />
                </View>

                <View>
                    <Similar data={relatedMovies} />
                </View>
            </View>
        </ScrollView>
    );
};

export default Movi;

const styles = StyleSheet.create({
    scrollContainer: {
        backgroundColor: '#1f1d1dff'
    },
    imageBg: {
        width: 380,
        height: 420,
        borderRadius: 15
    },
    imageStyle: {
        resizeMode: 'stretch'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
    },
    backBtn: {
        marginTop: 20,
        backgroundColor: 'white',
        padding: 6,
        borderRadius: 50,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    heartBtn: {
        marginTop: 20,
        marginLeft: 20,
        backgroundColor: 'white',
        padding: 6,
        borderRadius: 50,
        height: 40,
        width: 40,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleWrapper: {
        padding: 10
    },
    title: {
        textAlign: 'center',
        color: 'white',
        fontSize: 27,
        fontWeight: 'bold'
    },
    releaseText: {
        textAlign: 'center',
        color: 'white'
    },
    genreWrapper: {
        flexDirection: 'row',
        padding: 15,
        alignItems: 'center',
        alignSelf: 'center'
    },
    genreText: {
        color: 'white'
    },
    overviewWrapper: {
        padding: 25
    },
    overviewText: {
        color: 'gray'
    }
});