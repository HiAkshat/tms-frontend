export const validateEmail = (email: string) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return false
  } else {
    return true
  }
};

export const validateName = (name: string) => {
  const namePattern = /^[a-z ,.'-]+$/i
  if (!namePattern.test(name)) {
    return false
  } else {
    return true
  }
};

export const validateEmailAndSet = (email: string, setIsEmailValid: React.Dispatch<React.SetStateAction<boolean>>) => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    setIsEmailValid(false);
    return false
  } else {
    setIsEmailValid(true);
    return true
  }
};

export const validateNameAndSet = (name: string, setIsNameValid: React.Dispatch<React.SetStateAction<boolean>>) => {
  const namePattern = /^[a-z ,.'-]+$/i
  if (!namePattern.test(name)) {
    setIsNameValid(false);
    return false
  } else {
    setIsNameValid(true);
    return true
  }
};
