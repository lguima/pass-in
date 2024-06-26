import { Alert, Modal, ScrollView, Share, StatusBar, Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome } from '@expo/vector-icons'
import { Redirect } from 'expo-router';
import { MotiView } from 'moti'

import { colors } from "@/styles/colors";

import { useBadgeStore } from '@/store/badge-store'

import { Credential } from '@/components/Credential';
import { Header } from '@/components/Header';
import { Button } from "@/components/Button";
import { QRCode } from "@/components/QRCode";

export default function Ticket() {
  const [qrCodeExpanded, setQRCodeExpanded] = useState(false);

  const badgeStore = useBadgeStore();

  async function handleShare() {
    try {
      if (badgeStore.data?.checkInURL) {
        await Share.share({
          message: badgeStore.data.checkInURL,
        });
      }
    } catch(error) {
      console.error(error);
      Alert.alert('Ingresso', 'Não foi possível compartilhar.');
    }
  }

  async function handleSelectImage() {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 4],
      });

      if (result.assets) {
        badgeStore.updateAvatar(result.assets[0].uri);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Foto', 'Não foi possível selecionar a imagem.');
    }
  }

  if (!badgeStore.data?.checkInURL) {
    return <Redirect href='/' />
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
          data={badgeStore.data}
          onChangeAvatar={handleSelectImage}
          onExpandQRCode={() => setQRCodeExpanded(true)}
        />

        <MotiView
          from={{
            translateY: 0,
          }}
          animate={{
            translateY: 10,
          }}
          transition={{
            loop: true,
            type: "timing",
            duration: 700,
          }}
        >
          <FontAwesome
            name="angle-double-down"
            size={24}
            color={colors.gray[300]}
            className="self-center my-6"
          />
        </MotiView>

        <Text className="text-white font-bold text-2xl mt-4">
          Compartilhar credencial
        </Text>

        <Text className="text-white font-regular text-base mt-1 mb-6">
          Mostre ao mundo que você vai participar do {badgeStore.data.eventTitle}.
        </Text>

        <Button
          title="Compartilhar"
          onPress={handleShare}
        />

        <TouchableOpacity
          activeOpacity={0.7}
          className="mt-10"
          onPress={badgeStore.remove}
        >
          <Text className="text-base text-red-500 font=bold text-center">
            Remover Ingresso
          </Text>
        </TouchableOpacity>
      </ScrollView>

      <Modal
        visible={qrCodeExpanded}
        statusBarTranslucent
        animationType="slide"
      >
        <View
          className="flex-1 bg-green-500 items-center justify-center"
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setQRCodeExpanded(false)}
          >
            <QRCode
              value={badgeStore.data.checkInURL}
              size={300}
            />

            <Text
              className="mt-10 font-body text-orange-500 text-sm text-center"
            >
              Diminuir QR Code
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
  </View>
  )
}
