import { Slot } from 'expo-router';
import {
  useFonts,
  Roboto_700Bold,
  Roboto_500Medium,
  Roboto_400Regular,
} from '@expo-google-fonts/roboto'

import { Loading } from '@/components/Loading'

import '@/styles/global.css';

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Roboto_700Bold,
    Roboto_500Medium,
    Roboto_400Regular
  });

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <Slot />
  )
}
