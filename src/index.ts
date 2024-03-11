import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoES from 'crypto-es';
import {EncryptedAsyncStorage} from './types';
import {getEncryptionKey} from './utils';

export const encryptedAsyncStorage: EncryptedAsyncStorage = {
  getItem: async key => {
    try {
      const unencryptedValue = await AsyncStorage.getItem(key);
      const encryptionKey = SecureStore.getItem('encryptionKey');
      if (unencryptedValue && encryptionKey) {
        return CryptoES.AES.decrypt(unencryptedValue, encryptionKey).toString(
          CryptoES.enc.Utf8
        );
      }
      return null;
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `could not retrieve Item from async storage. Error: ${error.message}`
      );
    }
  },
  setItem: async (key, value) => {
    try {
      const enctyptionKey = getEncryptionKey();
      const encryptedValue = CryptoES.AES.encrypt(
        value,
        enctyptionKey
      ).toString();
      return await AsyncStorage.setItem(key, encryptedValue);
    } catch (e) {
      const error = e as Error;
      throw new Error(
        `could not set Item to async storage. Error: ${error.message}`
      );
    }
  },
  removeItem: AsyncStorage.removeItem,
  mergeItem: AsyncStorage.mergeItem,
  clear: AsyncStorage.clear,
  getAllKeys: AsyncStorage.getAllKeys,
};
