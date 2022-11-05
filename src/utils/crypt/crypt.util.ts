import * as CryptoJS from "crypto-js";

class Crypt {
    static encryptPassword(password: string): string {
        const encrypted = CryptoJS.AES.encrypt(password, 'secret')
        return encrypted.toString()
    }

    static comparePassword(dbPassword: string, reqRassword): boolean {
        const decrypted = CryptoJS.AES.decrypt(dbPassword, 'secret')
        if (decrypted.toString(CryptoJS.enc.Utf8) !== reqRassword) {
            return false
        }
        return true
    }
}

export default Crypt;