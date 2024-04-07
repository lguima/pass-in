import { Alert, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'

import { colors } from "@/styles/colors";
import { Credential } from '@/components/Credential';
import { Header } from '@/components/Header';
import { Button } from "@/components/Button";

export default function Ticket() {
  const [image, setImage] = useState('');

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets) {
        setImage(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Foto', 'Não foi possível selecionar a imagem.');
    }
  }

  return (
    <View className="flex-1 bg-green-500">
      <StatusBar barStyle="light-content" />

      <Header title="Minha credencial" />

      <ScrollView
        className="-mt-28 -z-10"
        contentContainerClassName="px-8 pb-8"
        showsVerticalScrollIndicator={false}
      >
        <Credential
          image={image}
          onChangeAvatar={handleSelectImage}
        />
        <FontAwesome
          name="angle-double-down"
          size={24}
          color={colors.gray[300]}
          className="self-center my-6"
        />

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do Unite Summit.
        </Text>

        <Button title="Compartilhar" />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-10"
        >
          <Text className="text-base text-red-500 font=bold text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>
  </View>
  )
}
