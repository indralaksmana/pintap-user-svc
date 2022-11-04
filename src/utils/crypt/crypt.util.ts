import * as CryptoJS from "crypto-js";

class Crypt {
    static encryptPassword(password: string) {
        const encrypted = CryptoJS.AES.encrypt(password, 'secret')
        return encrypted.toString()
    }

    static decryptPassword(password: string) {
        const decrypted = CryptoJS.AES.decrypt(password, 'secret')
        return decrypted.toString(CryptoJS.enc.Utf8)
    }
}

export default Crypt;