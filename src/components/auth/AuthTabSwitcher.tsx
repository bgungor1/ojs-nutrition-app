import { usePathname, useRouter } from 'expo-router';
import { Pressable, Text, View } from 'react-native';


export default function AuthTabSwitcher() {
    const router = useRouter();
    const pathname = usePathname();

    const isLogin = pathname.toLowerCase().includes('login');


    return (
        <View className="flex-row border border-gray-200 rounded-lg overflow-hidden">
            <Pressable
                onPress={() => router.replace('/(auth)/Login')}
                className={`flex-1 py-3 items-center ${isLogin ? 'bg-white' : 'bg-gray-100'}`}>
                <Text
                    className={`text-base font-semibold ${isLogin ? 'text-blue-600' : 'text-gray-500'
                        }`}
                >
                    Giriş Yap
                </Text>
            </Pressable>
            <Pressable
                onPress={() => router.replace('/(auth)/Register')}
                className={`flex-1 py-3 items-center ${!isLogin ? 'bg-white' : 'bg-gray-100'}`}
            >
                <Text
                    className={`text-base font-semibold ${!isLogin ? 'text-blue-600' : 'text-gray-500'
                        }`}
                >
                    Kayıt Ol
                </Text>
            </Pressable>
        </View>
    )
}