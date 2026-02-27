import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

interface ContactInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
    placeholder: string;
    name: FieldPath<T>;
    control: Control<T>;
    multiline?: boolean;
}

export function ContactInput<T extends FieldValues>({
    placeholder,
    name,
    control,
    multiline = false,
    ...textInputProps
}: ContactInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View className="w-full mb-4">
                    <TextInput
                        className={`w-full border rounded-md px-4 py-3 text-sm bg-[#fafafa] ${error ? 'border-red-400' : 'border-gray-200'
                            } ${multiline ? 'min-h-[120px]' : ''}`}
                        value={value}
                        onChangeText={onChange}
                        onBlur={onBlur}
                        placeholderTextColor="#a1a1aa"
                        placeholder={placeholder}
                        multiline={multiline}
                        textAlignVertical={multiline ? 'top' : 'center'}
                        {...textInputProps}
                    />
                    {error && (
                        <Text className="text-red-500 text-xs mt-1 ml-1 font-medium">{error.message}</Text>
                    )}
                </View>
            )}
        />
    );
}
