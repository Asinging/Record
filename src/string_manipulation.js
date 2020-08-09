export const stringManipulation = {
    data() {

    },
    mounted() {

    },
    methods: {
        setCharAt: function (str, index, charToReplace) {
            return (
                str.substring(0, index) + charToReplace + str.substring(index + 1)
            );
        },

        //checks for  innerHTML  text with space

        stringWithSpace: function (str, extractedText) {

            let counter = 0;
            for (let i = 1; i <= str.length; i++) {
                counter++;
                if (str.charAt(i) == " ") {
                    //if extractext has innitialization and assign if 
                    if (extractedText == "") {
                        extractedText = str.substr(0, counter);
                        localStorage.setItem("extractedText", extractedText);
                    }
                    i++;
                    let replaceText = str.charAt(i).toUpperCase();

                    // replacing a charater at a location of the string
                    str = this.setCharAt(str, i, replaceText);

                    i--;
                }
            }
            // replace the innerHTML string with string that has no space
            str = str.replace(/ /g, "");
            return str

        }
    }

}