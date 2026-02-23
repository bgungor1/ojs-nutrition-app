import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
interface AuthCheckboxProps {
    checked?: boolean;
    onToggle?: (value: boolean) => void;
    children: React.ReactNode;
}
export default function AuthCheckbox({
    checked = false,
    onToggle,
    children,
}: AuthCheckboxProps) {
    const [isChecked, setIsChecked] = useState(checked);
    const handleToggle = () => {
        const newValue = !isChecked;
        setIsChecked(newValue);
        onToggle?.(newValue);
    };
    return (
        <Pressable onPress={handleToggle} className="flex-row items-start gap-3">
            <View
                className={`w-5 h-5 rounded border-2 items-center justify-center mt-0.5 ${isChecked ? 'bg-black border-black' : 'border-gray-300 bg-white'
                    }`}
            >
                {isChecked && <Text className="text-white text-xs">✓</Text>}
            </View>
            <View className="flex-1">
                {children}
            </View>
        </Pressable>
    );
}