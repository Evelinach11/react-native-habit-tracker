export const getRandomToastMessage = (toastMessages) => {
  const randomIndex = Math.floor(Math.random() * toastMessages.length);
  return toastMessages[randomIndex];
};
