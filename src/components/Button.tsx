import { ActivityIndicator, Text, TouchableOpacity, TouchableOpacityProps } from 'react-native'

type Props = TouchableOpacityProps & {
  title: string
  isLoading?: boolean
}

export function Button({ title, isLoading = false, ...rest }: Props) {
  return(
    <TouchableOpacity
      activeOpacity={0.7}
      disabled={isLoading}
      className="w-full items-center justify-center h-14 rounded-lg bg-orange-500"
      { ...rest }
    >
      { isLoading ? (
        <ActivityIndicator className="text-green-500" />
      ) : (
        <Text className="text-green-500 text-base font-bold uppercase">
          {title}
        </Text>
      )}
    </TouchableOpacity>
  )
}
