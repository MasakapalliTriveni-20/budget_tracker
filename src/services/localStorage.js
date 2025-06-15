export const load = (key) => {
  try {
    const data = localStorage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
};

export const save = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};
