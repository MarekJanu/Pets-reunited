import React, { useEffect, useState } from "react";
import { Pressable, SafeAreaView, Text, View, Image } from "react-native";
import { collection, getDocs, QuerySnapshot } from "@firebase/firestore";
import firebase from "firebase/compat";
import { ScrollView } from "react-native-gesture-handler";
import { getStorage, ref, getDownloadURL } from "firebase/storage";

const db = firebase.firestore();

export default function HomeScreen({ props }) {
  const [pets, setPets] = useState([]);

  const getPets = async () => {
    const storage = getStorage();
    const queryPets = await db.collection("lost_pets").get();
    const newPets = [];
    const newURL = []; //
    queryPets.forEach((doc) => {
      const pet = { ...doc.data(), id: doc.id };
      newPets.push(pet);
      newURL.push(pet.picture); //
    });

    setPets(newPets);
  };
  useEffect(() => {
    getPets();
  }, []);

  return (
    <ScrollView>
      <View>
        {pets.map((pet) => {
          return (
            <ScrollView key={pet.id}>
              <Text>{pet.your_name}</Text>
              <Image
                source={{
                  uri: pet.picture,
                }}
                style={{ width: 200, height: 200 }}
              />
            </ScrollView>
          );
        })}
      </View>
    </ScrollView>
  );
}
