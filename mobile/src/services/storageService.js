import SInfo from 'react-native-sensitive-info';

export const setItem = async(itemName, itemValue) => {
    await SInfo.setItem(itemName, itemValue, {
        sharedPreferencesName: 'conferenceStoragePrefs',
        keychainService: 'conferenceStorageKeyChain'
    })
}

export const getItem = async(itemName) => {
    const retrievedValue = await SInfo.getItem(itemName, {
        sharedPreferencesName: 'conferenceStoragePrefs',
        keychainService: 'conferenceStorageKeyChain'
    })
    return retrievedValue;
}

export const removeItem = async(itemName) => {
    await SInfo.deleteItem(itemName, {
        sharedPreferencesName: 'conferenceStoragePrefs',
        keychainService: 'conferenceStorageKeyChain'
    })
}