import { useRegisterMutation } from '@/services';
import { AuthButton, AuthCheckbox, AuthInput, AuthTabSwitcher } from '@/components/auth';
import { OjsLogo } from '@/components/icons';
import { registerSchema, type RegisterFormData } from '@/schemas/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';
import { Alert, KeyboardAvoidingView, Platform, Pressable, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
export default function RegisterScreen() {
    const router = useRouter();
    const [register, { isLoading }] = useRegisterMutation();
    const { control, handleSubmit } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPassword: '',
        },
    });
    const onSubmit = async (data: RegisterFormData) => {
        try {
            await register({
                email: data.email,
                password: data.password,
                confirmPassword: data.confirmPassword,
                firstName: data.firstName,
                lastName: data.lastName,
            }).unwrap();

            router.replace('/(auth)/Login');

        } catch (error: any) {
            console.error('Register error:', error);
            Alert.alert("Kayıt Hatası", error?.data?.reason?.[Object.keys(error?.data?.reason)[0]]?.[0] || "Bir hata oluştu");
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
                        Üye Ol
                    </Text>
                    <AuthTabSwitcher />
                    <View className="mt-6 gap-4">
                        <AuthInput<RegisterFormData>
                            label="Ad"
                            name="firstName"
                            control={control}
                            autoCapitalize="words"
                            placeholder="Adınız"
                        />
                        <AuthInput<RegisterFormData>
                            label="Soyad"
                            name="lastName"
                            control={control}
                            autoCapitalize="words"
                            placeholder="Soyadınız"
                        />
                        <AuthInput<RegisterFormData>
                            label="E-Posta"
                            name="email"
                            control={control}
                            keyboardType="email-address"
                            autoCapitalize="none"
                            autoComplete="email"
                            placeholder="ornek@email.com"
                        />
                        <AuthInput<RegisterFormData>
                            label="Şifre"
                            name="password"
                            control={control}
                            secureTextEntry
                            placeholder="••••••••"
                        />
                        <AuthInput<RegisterFormData>
                            label="Şifre Tekrar"
                            name="confirmPassword"
                            control={control}
                            secureTextEntry
                            placeholder="••••••••"
                        />

                        <AuthButton
                            title="ÜYE OL"
                            onPress={handleSubmit(onSubmit)}
                            loading={isLoading}
                        />

                        <AuthCheckbox>
                            <Text className="text-xs text-gray-600">
                                Kampanyalardan haberdar olmak için{' '}
                                <Text className="font-bold">Ticari Elektronik İleti Onayı</Text>
                                {' '}metnini okudum, onaylıyorum.
                            </Text>
                        </AuthCheckbox>
                        <AuthCheckbox>
                            <Text className="text-xs text-gray-600">
                                <Text className="font-bold">Üyelik sözleşmesini</Text> ve{' '}
                                <Text className="font-bold">KVKK Aydınlatma Metnini</Text>
                                {' '}okudum, kabul ediyorum.
                            </Text>
                        </AuthCheckbox>
                        <View className="flex-row justify-center mt-2">
                            <Text className="text-sm text-gray-500">
                                Zaten hesabınız var mı?{' '}
                            </Text>
                            <Pressable onPress={() => router.replace('/(auth)/Login')}>
                                <Text className="text-sm text-blue-600 font-semibold">
                                    Giriş Yap
                                </Text>
                            </Pressable>
                        </View>
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}