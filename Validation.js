
class Validation {

    /**
     * Checks if the value is a number.
     * @param {String} value arg1 [This value is intended to be a number.]
     * @return {boolean} If the value is a number then true is returned, else false.
     */
    static isNum(value){
        let isNum = false;
        try{
            !isNaN(value)
            isNum = true;
        }catch(ex){
            console.log('Validation -> .checkIfNum() -> ' + ex);
        }
    }

    /**
     * Checks if the text is an email.
     * @param {String} text 
     * @returns {boolean} If text is an email then true is returned, else false.
     */
    static isEmail(text){
        let isEmail = false;

        const emailRegex = /^[^.@]+[@][^.@]+[.](com|gov|info|org|edu|mil|biz|co|me|net|io|uk|ca)$/;
        
        console.log('email regex check returns -> ' + emailRegex.test(text.trim().toLowerCase()));
        if(emailRegex.test(text.trim().toLowerCase())){
            isEmail = true;
        }

        return isEmail;
    }

    /**
     * Checks if the field is blank.
     * @param {String} text 
     * @returns {boolean} if true is blank, else false.
     */

    static isBlank(text){
        let isBlank = true;

        if(text.length > 0){
            isBlank = false;
        }

        return isBlank;
        }

    /**
     * Checks if the password follows standard password requirements.
     * @param {String} text 
     * @returns {boolean} 
     */
    static passwordRulesFollowed(text){
        let passGood = false;
        const passwordRegex = /^[A-Z]{1}[\W\w]+$/; //ensures password starts with uppercase letter

        //ensures the password is 8 or more characters in length 
        // and that it contains a special character and a number
        if(passwordRegex.test(text) && text.length >= 8 &&  
        
           (text.includes('_') || text.includes('-')|| text.includes('+')
           || text.includes('=')|| text.includes('*')|| text.includes('&')|| text.includes('%')
           || text.includes('^')|| text.includes('$')|| text.includes('#')|| text.includes('@')
           || text.includes('!')|| text.includes('~')|| text.includes('`')|| text.includes(',')
           || text.includes('.')|| text.includes('>')|| text.includes('<')|| text.includes('?')
           || text.includes('\'')|| text.includes('"')|| text.includes(';')|| text.includes(':')
           || text.includes('[')|| text.includes(']')|| text.includes('{')|| text.includes('}')
           || text.includes('\\')|| text.includes('|'))&&( 
              text.includes('0')|| text.includes('1')|| text.includes('2')|| text.includes('3')
           || text.includes('4')|| text.includes('5')|| text.includes('6')|| text.includes('7')
           || text.includes('8')|| text.includes('9')
            )
        ){
            passGood = true
        }

        return passGood;
    }

    /**
     * Ensures passwords match.
     * @param {String} PasswordA 
     * @param {String} PasswordB 
     * @returns {boolean} If true then passwords match, else false.
     */
    static passwordsMatch(PasswordA, PasswordB){
        let passGood = false;

        if(PasswordA === PasswordB){
            passGood = true
        }

        return passGood;
    }

    /**
     * This is designed for conveinence to return a string that states a message saying the <field name> must not be blank. -> that is all it does
     * @param {string} fieldName 
     * @returns 
     */
    static blankField = (fieldName) => {
        return `The ${fieldName} must not be blank.`;
    } 
//site used for deveoping regex -> https://regex101.com/

}

export default Validation;

 