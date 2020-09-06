export const stringsFns = {
        data() {},
        mounted() {},
        methods: {
                setCharAt: function (str, index, charToReplace) {
                        return (str.substring(0, index) + charToReplace + str.substring(index + 1));
                },

                // checks for  innerHTML  text with space

                stringWithSpace: function (str, extractedText) {
                        if (!str) {
                                return "the string to be manipulated is empty"
                        }

                        let counter = 0;
                        for (let i = 1; i <= str.length; i++) {
                                counter++;
                                if (str.charAt(i) == " ") { // if extracted text has innitialization and assign
                                        if (extractedText == "") {
                                                extractedText = str.substr(0, counter);
                                                localStorage.setItem("extractedText", extractedText);
                                        }
                                        i++;
                                        // get the next string after the space  and make to upper Case
                                        let replaceText = str.charAt(i).toUpperCase();
                                        // replacing a charater at a location of the string
                                        str = this.setCharAt(str, i, replaceText);

                                        i--;
                                }
                        }
                        // replace the innerHTML string with string that has no space
                        str = str.replace(/ /g, "");
                        return str

                },
                urlToken: function (url) {
                        for (let i in url) {
                                if (url.charAt(i) == "=") {
                                        i++
                                        return url.substring(i)
                                }
                        }


                }
        }

}