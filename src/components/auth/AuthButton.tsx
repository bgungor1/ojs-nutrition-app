import { ActivityIndicator, Pressable, Text } from 'react-native';
interface AuthButtonProps {
    title: string;
    onPress: () => void;
    loading?: boolean;
    disabled?: boolean;
}
export default function AuthButton({
    title,
    onPress,
    loading = false,
    disabled = false,
}: AuthButtonProps) {
    return (
        <Pressable
            onPress={onPress}
            disabled={disabled || loading}
            className={`w-full py-4 rounded-lg items-center justify-center ${disabled || loading ? 'bg-gray-400' : 'bg-black active:bg-gray-800'
                }`}
        >
            {loading ? (
                <ActivityIndicator color="#fff" />
            ) : (
                <Text className="text-white text-base font-bold tracking-widest uppercase">
                    {title}
                </Text>
            )}
        </Pressable>
    );
}