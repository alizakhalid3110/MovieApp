import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, StyleSheet } from "react-native";
import { HeartIcon, ChevronLeftIcon } from "react-native-heroicons/solid";
import { useNavigation, useRoute } from "@react-navigation/native";

const Person = () => {
    const route = useRoute();
    const [favourite, setFavourite] = useState(false);
    const navigation = useNavigation();

    const { personDetail } = route.params;

    return (
        <ScrollView style={styles.container}>
            <View>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backBtn}>
                        <ChevronLeftIcon size={24} color={'orange'} />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => setFavourite(!favourite)} style={styles.heartBtn}>
                        <HeartIcon size={24} color={favourite ? 'orange' : 'gray'} />
                    </TouchableOpacity>
                </View>

                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: `https://image.tmdb.org/t/p/w500${personDetail.profile_path}` }}
                        style={styles.image}
                    />
                </View>

                <View style={styles.nameSection}>
                    <Text style={styles.name}>{personDetail.name}</Text>
                    <Text style={styles.place}>{personDetail.place_of_birth}</Text>
                </View>

                <View style={styles.infoBox}>
                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Gender</Text>
                        <Text style={styles.value}>Male</Text>
                    </View>

                    <Text style={styles.divider}>|</Text>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Gender</Text>
                        <Text style={styles.value}>Male</Text>
                    </View>

                    <Text style={styles.divider}>|</Text>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Gender</Text>
                        <Text style={styles.value}>Male</Text>
                    </View>

                    <Text style={styles.divider}>|</Text>

                    <View style={styles.infoItem}>
                        <Text style={styles.label}>Gender</Text>
                        <Text style={styles.value}>Male</Text>
                    </View>

                    <Text style={styles.divider}>|</Text>
                </View>
            </View>

            <View style={styles.bioSection}>
                <Text style={styles.bioTitle}>Biography</Text>
                <Text style={styles.bioText}>{personDetail.biography}</Text>
            </View>
        </ScrollView>
    );
};

export default Person;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1f1d1dff'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
        marginTop: 10
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
    imageWrapper: {
        padding: 10,
        alignSelf: 'center',
        shadowColor: 'lightgray',
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1
    },
    image: {
        height: 250,
        width: 250,
        borderRadius: 250,
        borderColor: 'lightgray',
        borderWidth: 1
    },
    nameSection: {
        alignSelf: 'center',
        marginTop: 10,
        padding: 5
    },
    name: {
        color: 'white',
        fontWeight: '900',
        fontSize: 25
    },
    place: {
        color: 'gray',
        fontSize: 13,
        marginTop: 5
    },
    infoBox: {
        backgroundColor: 'gray',
        width: '88%',
        alignSelf: 'center',
        marginTop: 15,
        borderRadius: 30,
        flexDirection: 'row',
        padding: 6,
        gap: 7
    },
    infoItem: {
        marginLeft: 5,
        marginTop: 4
    },
    label: {
        color: 'white',
        fontSize: 12,
        fontWeight: 'bold'
    },
    value: {
        color: 'white',
        fontSize: 11
    },
    divider: {
        color: 'white',
        fontSize: 30,
        marginLeft: 5
    },
    bioSection: {
        marginBottom: 50,
        marginTop: 10,
        padding: 20
    },
    bioTitle: {
        marginBottom: 20,
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white'
    },
    bioText: {
        color: 'gray'
    }
});