export const stringEncryption = (str:any) => {
    const key = 'secretkey';  // Define your encryption key here
    
    let encryptedString = '';
    for (let i = 0; i < str.length; i++) {
      // XOR each character's charCode with the key's charCode
      encryptedString += String.fromCharCode(str.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return encryptedString;
  };
  