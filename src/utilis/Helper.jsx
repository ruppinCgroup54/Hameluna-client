
export function convertKeysToLowercase(obj) {
    // Check if the input is an array
    if (Array.isArray(obj)) {
        return obj.map(item => convertKeysToLowercase(item));
    }

    // Check if the input is an object
    if (typeof obj === 'object' && obj !== null) {
        return Object.keys(obj).reduce((acc, key) => {
            // Convert the key to lowercase
            const lowerKey = key[0].toLowerCase()+key.substring(1);
            // Recur for nested objects or arrays
            acc[lowerKey] = convertKeysToLowercase(obj[key]);
            return acc;
        }, {});
    }

    // If the input is neither an array nor an object, return it as is
    return obj;
}