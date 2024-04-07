import { useState } from 'react';
import { View, Image, StatusBar, Alert } from 'react-native';
import { FontAwesome6, MaterialIcons } from '@expo/vector-icons';
import { Link, router } from 'expo-router';
import axios from 'axios';

import { colors } from '@/styles/colors';

import { api } from '@/server/api';

import { Input } from '@/components/Input';
import { Button } from '@/components/Button'

const EVENT_ID = '9e9bd979-9d10-4915-b339-3786b1634f33';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  async function handleRegister() {
    try {
      if (!name.trim() || !email.trim()) {
        return Alert.alert('Inscrição', 'Nome e e-mail são obrigatórios.');
      }

      setIsLoading(true);

      const response = await api.post(`/events/${EVENT_ID}/attendees`, {
        name,
        email,
      });

      if (response.data.attendeeId) {
        Alert.alert('Inscrição', 'Inscrição realizada com sucesso.', [
          { text: 'OK', onPress: () => router.push('/ticket') }
        ])
      }
    } catch(error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        if (String(error.response?.data.message).includes('already registered')) {
          return Alert.alert('Inscrição', 'Este e-mail já está cadatrado.');
        }
      }

      Alert.alert('Inscrição', 'Não foi possível fazer a inscrição');
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <View className="flex-1 items-center justify-center p-8 bg-green-500">
      <StatusBar barStyle="light-content" />

      <Image
        source={require("@/assets/logo.png")}
        className="h-16"
        resizeMode="contain"
      />

      <View className="w-full mt-12 gap-3">
        <Input>
          <FontAwesome6
            name="user-circle"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="Nome completo"
            onChangeText={setName}
          />
        </Input>

        <Input>
          <MaterialIcons
            name="alternate-email"
            color={colors.green[200]}
            size={20}
          />
          <Input.Field
            placeholder="E-mail"
            keyboardType="email-address"
            onChangeText={setEmail}
          />
        </Input>

        <Button
          title="Fazer inscrição"
          onPress={handleRegister}
          isLoading={isLoading}
        />

        <Link
          href="/"
          className="text-gray-100 text-base text-center mt-8"
        >
          Já possui ingresso?
        </Link>
      </View>
    </View>
  )
}
