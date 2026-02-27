export const formatPhoneNumberForApi = (phoneNumber: string): string => {
    let formattedPhone = phoneNumber.trim();

    if (!formattedPhone.startsWith('+')) {
        if (formattedPhone.startsWith('0')) {
            formattedPhone = '+90' + formattedPhone.substring(1);
        } else if (formattedPhone.startsWith('90')) {
            formattedPhone = '+' + formattedPhone;
        } else {
            formattedPhone = '+90' + formattedPhone;
        }
    }

    return formattedPhone;
};

export const stripPhonePrefix = (phoneNumber: string): string => {
    let originalPhone = phoneNumber || '';

    if (originalPhone.startsWith('+90')) {
        originalPhone = originalPhone.substring(3);
    } else if (originalPhone.startsWith('+')) {
        originalPhone = originalPhone.substring(1);
    }

    return originalPhone;
};
