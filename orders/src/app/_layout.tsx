import {
  Inter_400Regular as Inter400Regular,
  Inter_500Medium as Inter500Medium,
  Inter_600SemiBold as Inter600SemiBold,
  Inter_700Bold as Inter700Bold,
  useFonts,
} from '@expo-google-fonts/inter'
import { Slot } from 'expo-router'
import { View } from 'react-native'

import { Loading } from '@/components/loading'

export default function Layout() {
  const [fontsLoaded] = useFonts({
    Inter400Regular,
    Inter500Medium,
    Inter600SemiBold,
    Inter700Bold,
  })

  if (!fontsLoaded) {
    return <Loading />
  }

  return (
    <View className="flex-1 bg-slate-900">
      <Slot />
    </View>
  )
}
