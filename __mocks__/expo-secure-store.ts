export const store: Record<string, string> = {};

// Async methods
export const getItemAsync = jest.fn(async (key: string) => store[key] ?? null);
export const setItemAsync = jest.fn(async (key: string, value: string) => {
  store[key] = value;
});
export const deleteItemAsync = jest.fn(async (key: string) => {
  delete store[key];
});

// Synchronous methods
export const getItem = jest.fn((key: string) => store[key] ?? null);
export const setItem = jest.fn((key: string, value: string) => {
  store[key] = value;
});
export const deleteItem = jest.fn((key: string) => {
  delete store[key];
});
