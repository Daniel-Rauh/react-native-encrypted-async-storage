import * as SecureStore from 'expo-secure-store';
import {createId} from '@paralleldrive/cuid2';
import {CreateEncryptionKey, GetEncryptionKey} from './types';

export const getEncryptionKey: GetEncryptionKey = () => {
  try {
    const existingKey = SecureStore.getItem('encryptionKey');
    if (existingKey) {
      return existingKey;
    }
    return createEncryptionKey();
  } catch (e) {
    const error = e as Error;
    throw new Error(`Could not get encryption key. Error: ${error.message}`);
  }
};

export const createEncryptionKey: CreateEncryptionKey = () => {
  const newKey = createId();
  SecureStore.setItem('encryptionKey', newKey);
  return newKey;
};
