import { ActivityIndicator } from 'react-native';

export function Loading() {
  return (
    <ActivityIndicator className="flex-1 items-center justify-center bg-green-500 text-orange-500" />
  )
}
