import { Controller, type Control, type FieldPath, type FieldValues } from 'react-hook-form';
import { Text, TextInput, View, type TextInputProps } from 'react-native';

interface AccountInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value' | 'onChangeText'> {
    label: string;
    name: FieldPath<T>;
    control: Control<T>;
    leftComponent?: React.ReactNode;
    regexPattern?: RegExp;
}

export function AccountInput<T extends FieldValues>({
    label,
    name,
    control,
    leftComponent,
    regexPattern,
    ...textInputProps
}: AccountInputProps<T>) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
                <View className="w-full mb-4">
                    <Text className="text-sm text-gray-800 font-semibold mb-1.5 ml-1">
                        {label}
                    </Text>
                    <View className="relative justify-center">
                        {leftComponent && (
                            <View className="absolute left-0 z-10 h-full justify-center px-4">
                                {leftComponent}
                            </View>
                        )}
                        <TextInput
                            className={`w-full border rounded-md py-3 text-sm font-medium ${!textInputProps.editable ? 'bg-gray-200 text-gray-500' : 'bg-[#fafafa] text-black'
                                } ${error ? 'border-red-400' : 'border-gray-200'}`}
                            style={{
                                paddingLeft: leftComponent ? 90 : 16,
                                paddingRight: 16
                            }}
                            value={value}
                            onChangeText={(text) => {
                                if (regexPattern) {
                                    onChange(text.replace(regexPattern, ''));
                                } else {
                                    onChange(text);
                                }
                            }}
                            onBlur={onBlur}
                            placeholderTextColor="#a1a1aa"
                            {...textInputProps}
                        />
                    </View>
                    {error && (
                        <Text className="text-red-500 text-xs mt-1 ml-1 font-medium">{error.message}</Text>
                    )}
                </View>
            )}
        />
    );
}
