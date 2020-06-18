// export const help = {
//     concatInnerhtml(htmlElement) {
//         htmlElement = event.target.innerText;
//         //console.log(event.target.innerHTML);
//         htmlElement.trim();
//         if (htmlElement.indexOf(" ") >= 0) {
//             for (let i = 1; i <= htmlElement.length; i++) {
//                 if (htmlElement.charAt(i) == " ") {
//                     i++;
//                     let replaceText = htmlElement.charAt(i).toUpperCase();
//                     htmlElement = htmlElement.replace(
//                         `${htmlElement.charAt(i)}`,
//                         `${replaceText}`
//                     );
//                     i--;
//                 }
//             }
//             // replace the innerHTML string with string that has no space
//             htmlElement = htmlElement.replace(/ /g, "");

//         }
//         return htmlElement
//     }
// }