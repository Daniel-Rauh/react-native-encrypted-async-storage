export type EncryptedAsyncStorage = {
  getItem: (key: string) => Promise<string | null>;
  setItem: (key: string, value: string) => Promise<void>;
  removeItem: (key: string) => Promise<void>;
  mergeItem: (key: string, value: string) => Promise<void>;
  clear: () => Promise<void>;
  getAllKeys: () => Promise<readonly string[]>;
};

export type GetEncryptionKey = () => string;
export type CreateEncryptionKey = () => string;
