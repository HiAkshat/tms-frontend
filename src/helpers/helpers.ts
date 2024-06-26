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

export const isTextEmpty = (text: string) => {
  if (text==""){
    return true
  }

  else{
    return false
  }
}

export const isTextEmptyAndSet = (text: string, setIsTextValid: React.Dispatch<React.SetStateAction<boolean>>) => {
  if (text==""){
    setIsTextValid(false)
    return false
  }
  else{
    setIsTextValid(true)
    return true
  }
}

export const toTitleCase = (text: string) => {
  return text.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export const isDateBeforeDate = (date1: Date, date2: Date) => {
  if (date1<date2) return true
  else return false
}

export const isDateBeforeNow = (date: Date) => {
  return date < new Date()
}
