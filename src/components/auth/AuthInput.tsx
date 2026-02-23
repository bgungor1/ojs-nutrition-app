import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { Text, TextInput, View, type TextInputProps } from 'react-native';
interface AuthInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
    label: string;
    name: FieldPath<T>;
    control: Control<T>;
    required?: boolean;
}
export default function AuthInput<T extends FieldValues>({
    label,
    name,
    control,
    required = false,
    ...textInputProps
}: AuthInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View className="w-full">
                    <Text className="text-sm text-gray-700 mb-1">
                        {required && <Text className="text-red-500">*</Text>}
                        {label}
                    </Text>
                    <TextInput
                        className={`w-full border rounded-lg px-4 py-3 text-base bg-white ${error ? 'border-red-400' : 'border-gray-200'
                            }`}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholderTextColor="#9CA3AF"
                        {...textInputProps}
                    />
                    {error && (
                        <Text className="text-red-500 text-xs mt-1">{error.message}</Text>
                    )}
                </View>
            )}
        />
    );
}