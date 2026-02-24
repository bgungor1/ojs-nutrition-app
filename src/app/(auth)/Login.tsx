import AuthButton from '@/components/auth/AuthButton';
import AuthInput from '@/components/auth/AuthInput';
import AuthTabSwitcher from '@/components/auth/AuthTabSwitcher';
import OjsLogo from '@/components/icons/OjsLogo';
import { loginSchema, type LoginFormData } from '@/schemas/auth';
import { useLoginMutation } from '@/services/authApi';
import type { AppDispatch } from '@/store';
import { setAuth } from '@/store/authSlice';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';

export default function LoginScreen() {
    const router = useRouter();
    const dispatch = useDispatch<AppDispatch>();
    const [login, { isLoading }] = useLoginMutation();

    const { control, handleSubmit } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const onSubmit = async (data: LoginFormData) => {
        try {
            const result = await login({
                email: data.email,
                password: data.password,
            }).unwrap();
            dispatch(setAuth({
                user: { id: '', email: data.email, first_name: '', last_name: '' },
                accessToken: result.data.access,
                refreshToken: result.data.refresh,
            }));
            router.replace('/(tabs)');

        } catch (error: any) {
            console.error('Login error:', error);
            Alert.alert("Login error:", error.message)
        }
    };
    return (
        <SafeAreaView className="flex-1 bg-white">
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                className="flex-1"
            >
                <ScrollView
                    contentContainerStyle={{ flexGrow: 1, paddingHorizontal: 24, paddingVertical: 32 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <View className="items-center mb-2">
                        <OjsLogo width={128} height={128} />
                    </View>
                    <Text className="text-3xl font-bold text-center mb-6">
                        Giriş Yap
                    </Text>
                    <AuthTabSwitcher />

                    <View className="mt-6 gap-4">
                        <AuthInput<LoginFormData>
                            label="E-Posta"
                            name="email"
                            control={control}
                            required
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            placeholder="ornek@email.com"
                        />
                        <AuthInput<LoginFormData>
                            label="Şifre"
                            name="password"
                            control={control}
                            required
                            secureTextEntry
                            autoComplete="password"
                            placeholder="••••••••"
                        />
                        <Pressable className="self-end">
                            <Text className="text-sm text-gray-500 underline">
                                Şifremi Unuttum?
                            </Text>
                        </Pressable>
                        <AuthButton
                            title="GİRİŞ YAP"
                            onPress={handleSubmit(onSubmit)}
                            loading={isLoading}
                        />
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}