/**
 * Inject our stylesheet, so the user doesn't have to explicitly include it
 * along with this script. This assumes that the stylesheet is in the same
 * directory the script is, and it is named the same. So this is page.js; it
 * expects page.css to be present in the same directory. If it was page.min.js,
 * it would expect page.min.css.
 */
var scriptName = document.currentScript.src;
var stylesheet = scriptName.substring(0, scriptName.lastIndexOf('.')) + '.css';
console.log('Including stylesheet: ' + stylesheet);
document.write('<link rel="stylesheet" href="' + stylesheet + '"/>');

/*
 * Set the dimensions of the page. This must be called either in the onload
 * function, or sometime before the page has finished rendering.
 */
function pageSetup(width = '8.5in', height = '11in', margin = '1.5cm') {
    console.log('Setting up page with dimensions: ' + width + 'x' + height + ' and margins: ' + margin + '...');

    // When doing math, convert all units to a base unit.
    const baseUnit = 'cm';
    // This function holds the conversion factors for CSS-style absolute
    // measurements.
    function toBaseUnit(value) {
        var floatVal = parseFloat(value);
        var strVal = value.toString();
        if (strVal.endsWith('cm')) {
            return floatVal;
        } else if (strVal.endsWith('mm')) {
            return floatVal / 100;
        } else if (strVal.endsWith('in')) {
            return floatVal * 2.54;
        } else {
            /* We only support CSS absolute units. */
            return null;
        }
    }

    // If any inputs are invalid, use the defaults.
    if (!toBaseUnit(width) || !toBaseUnit(height) || !toBaseUnit(margin)) {
        console.log('Invalid dimension(s) or margin. Using default setup.');
        return pageSetup();
    }

    // Calculate the absolute content width, for use with the continuous-content
    // and footer elements, because relative width just doesn't seem to be working.
    var contentWidth = toBaseUnit(width) - (toBaseUnit(margin) * 2);

    // Write the CSS rules for setting the page height.
    document.write(
        '<style>' +
        '  .page {' +
        '    width: ' + width + ';' +
        '    height: ' + height + ';' +
        '  }' +
        '  .page-content {' +
        '    margin: ' + margin + ';' +
        '  }' +
        '  #continuous-content, #footer, #first-page-footer {' +
        '    width: ' + contentWidth + baseUnit + ';' +
        '  }' +
        '</style>'
    );
}

// If no onload function is specified, then setup the page. Unfortunately, I have
// no way of knowing if the onload function is a reference to pageSetup() or not.
// If it isn't, well then this whole thing is worthless.
if (!document.currentScript.onload) {
    console.log('No page setup specified, using the defaults.');
    document.currentScript.onload = pageSetup();
}

/*
 * Thus function allows us to add our onload function without overwritting any
 * existing onload functions. It simply copies the function reference and places
 * it within a new function along with the function we pass in here. I found it
 * here:
 * https://www.htmlgoodies.com/beyond/javascript/article.php/3724571/Using-Multiple-JavaScript-Onload-Functions.htm
 */
function addLoadEvent(func) {
    var oldonload = window.onload;
    if (typeof window.onload != 'function') {
        window.onload = func;
    } else {
        window.onload = function () {
            if (oldonload) {
                oldonload();
            }
            func();
        }
    }
}

/**
 * When the window is loaded, this function will take all the content
 * in the 'continuous-content' container and paginate it. That is, it
 * will split it up and write out elements that look like pieces of
 * paper. This is to provide a print-preview, basically. When used with
 * 'page.css', the browser will display exactly what would be printed.
 */
addLoadEvent(function () {

    // Get the content body
    var allContent = document.getElementById('continuous-content');
    // Get the headers and footers. Note that this gives us the option of
    // providing a first-page header and footer that is unique from the
    // rest of the pages.
    var firstPageHeader = document.getElementById('first-page-header');
    var firstPageFooter = document.getElementById('first-page-footer');
    var header = document.getElementById('header');
    var footer = document.getElementById('footer');

    // The headers and footers are optional, but the content body is not.
    if (!allContent) {
        console.log('Missing content body. Please place all content to paginate in a div with id "continuous-content"');
    } else {
        // We were provided with a content body. Begin processing it.
        // This captures the current time so at the end we can see
        // how long the process took.
        var startTime = Date.now();

        // The new page object is simply an arbitrary object that is unique from the conent.
        // It's job is to simply mark where a page break should go. When the DOM parser
        // encounters this variable in the DOM array, it will allocate a new page and then
        // resume writing content.
        var NEW_PAGE = 'new-page-marker-object';

        console.log('Building DOM...');

        // Allocate an array for the paginated document. The entire content element is
        // processed and copied into this array before any output is produced; this gives
        // us extra control over how things get written. I tried a model where I read the
        // original document, processed it, and wrote the pages all in one go, but that
        // was confusing to read, and also about 4 times slower.
        var pageDOM = [];

        // A simple function that gets a CSS style from an element. This works by accessing
        // the computed style of the element so that it returns a value even if it wasn't
        // explicitly set with a CSS.
        //
        // This function came from: https://stackoverflow.com/a/33499348/10116375
        function getStyle(e, styleName) {
            var styleValue = "";
            if (document.defaultView && document.defaultView.getComputedStyle) {
                styleValue = document.defaultView.getComputedStyle(e, "").getPropertyValue(styleName);
            } else if (e.currentStyle) {
                styleName = styleName.replace(/\-(\w)/g, function (strMatch, p1) {
                    return p1.toUpperCase();
                });
                styleValue = e.currentStyle[styleName];
            }
            if (styleValue) {
                return styleValue;
            } else {
                return '0px';
            }
        }

        // Create a new temporary page so we can get properties about it.
        var tmpPage = newPage();

        // Calculate the top and bottom margins of the page-content div.
        // These are needed to compute the absolute page height that content
        // can be placed in.
        var marginTop = parseInt(getStyle(tmpPage, 'margin-top').replace('px', ''));
        var marginBottom = parseInt(getStyle(tmpPage, 'margin-bottom').replace('px', ''));

        // Each page can hold this many pixels worth of content. If an element overflows,
        // an attempt to split it is made, and a new page is written.
        var pageHeight = tmpPage.parentElement.clientHeight - (marginTop + marginBottom);
        console.log('The fixed page height is ' + pageHeight + 'px.');

        // Remove the temporary page; it is no longer needed.
        tmpPage.parentNode.parentNode.removeChild(tmpPage.parentNode);

        // This variable stores the current position on the current page. This is
        // checked with the page height to determine when to write new pages.
        var currentHeight = 0;

        // The current page count. Start at 1, because people wanna see that the
        // first page is '1', not '0'.
        var pageCount = 1;

        // This function writes directly to the pageDOM array. It pushes the new page
        // marker, then the headers and footers for the page. It also increments the
        // page counter, and resets the current height pointer to zero. Whenever a new
        // page needs to be written, this function should be called instead of manually
        // pushing to the pageDOM array.
        function prepareNextPage() {
            pageDOM.push(NEW_PAGE);

            currentHeight = 0;

            // This function is responsible for handling the headers and footers.
            // This provides support for a unique first-page header and footer.
            // Pass the first page header or footer in along with the other page
            // headers and footers.
            function processAndWrite(firstPage, otherPages) {

                // Replace the content of all spans with the page-no class withi the
                // relevant page number. This is the current page count.
                function processPageNumbers(element) {
                    element.querySelectorAll('span.page-no').forEach(function (item) {
                        item.innerHTML = pageCount;
                    });
                }

                // The element to write to the pageDOM.
                var writeElement;

                if (pageCount == 1) {
                    writeElement = firstPage;
                } else {
                    writeElement = otherPages;
                }

                // Process the element to write to the pageDOM.
                if (writeElement) {
                    processPageNumbers(writeElement);
                    pageDOM.push(writeElement.cloneNode(true));
                    currentHeight += computeRealHeight(writeElement);
                }
            }

            // Write the headers and footers using the function described
            // above.
            processAndWrite(firstPageHeader, header);
            processAndWrite(firstPageFooter, footer);

            console.log('--- ON PAGE ' + pageCount + ' ---');
            pageCount++;

        }

        // Push an element into the pageDOM. This also calculates the element
        // height and adds it to the current height variable. For this reason,
        // it should be used over manually writing to the pageDOM.
        function pushElement(element) {
            pageDOM.push(element);
            currentHeight += computeRealHeight(element);
        }

        function computeRealHeight(element) {
            var realHeight = element.clientHeight;
            // Some elements, noteably <i> and probably <b> and <u>, report a height of zero
            // if they have no words in them. If that is the case, we have to iterate over
            // the child elements (if any) and compute their height, and add them all together.
            // This is only run when elements report a height of zero and they're not <style>
            // or <script> elements. All elements that return a non-zero height are computed as
            // a whole, not in terms of their children.
            if (realHeight == 0 && element.tagName != 'STYLE' && element.tagName != 'SCRIPT') {
                for (var i = 0; i < element.children.length; i++) {
                    realHeight += computeRealHeight(element.children[i]);
                }
            }
            var elementMarginTop = parseInt(getStyle(element, 'margin-top').replace('px', ''));
            return realHeight + elementMarginTop;
        }

        // Start out with a new, fresh page.
        prepareNextPage();

        // Iterate over all the children of the content container and process them
        // according to their height and type.
        for (var i = 0; i < allContent.children.length; i++) {

            var element = allContent.children[i];

            // If the element is page break element, simply write a new page
            // and continue.
            if (element.tagName == 'SPAN' && element.className == 'page-break') {
                prepareNextPage();
                continue;
            }

            var elementHeight = computeRealHeight(element);

            console.log('Found element: ' + element + ' (height: ' + elementHeight + ', total height on this page: ' + currentHeight + ')');

            // If the element will fit cleanly on the page, simply push it and continue.
            if (elementHeight <= pageHeight - currentHeight) {
                pushElement(element);
            } else {
                // The element is too big for the current page. Calculate how many more pixels
                // there are to fill (remaining) and how much overflow there is (overflow).
                var remaining = pageHeight - currentHeight;
                var overflow = elementHeight - remaining;
                console.log(' -> Only ' + remaining + 'px available on the current page. Overflowed by ' + overflow + 'px.');

                // Begin element-specific processing.
                // If this element is a list, we can most likely split it at one its child nodes.
                if (element.tagName == 'P') {
                    // If a paragraph overflows, write as much of it to the current page
                    // as we can before creating a new page and appending the rest of the
                    // paragraph to it.
                    // Get all the words of the paragraph.

                    // Get the line height for this paragraph.
                    var lineHeight = parseInt(getStyle(element, 'font-size').replace('px', ''));
                    // Calculate how many lines we can fit in the remaining space
                    var remainingLines = Math.floor(remaining / lineHeight);

                    // Get the total number of lines in the paragraph. Note we are using
                    // element.clientHeight instead of elementHeight, because we want to
                    // exclude padding here. elementHeight may include padding depending
                    // on how it's calculated.
                    var totalLines = Math.floor(element.clientHeight / lineHeight);

                    // The whole thing should fit on the original page. Just push it.
                    if (totalLines == remainingLines) {
                        console.log(' -> This paragraph will not be split.');
                        pushElement(element);
                        // Only add a new page if there's more content left;
                        // if this is the past element, then don't make a new
                        // page.
                        if (i < allContent.children.length - 1) {
                            prepareNextPage();
                        }
                    } else {

                        // This part computes about how many words can fit in the remaining space
                        // of the current page.

                        // Calculate the line height (in pixels) of an element
                        // (used by lines()).
                        function resolveLineHeight(elem) {
                            var fontSize = parseFloat(getStyle(elem, 'font-size').replace('px', ''));
                            var lineHeight = getStyle(elem, 'line-height');
                            if (lineHeight == 'normal' || lineHeight == 'initial') {
                                // Well, 1.2 is the default on firefox, I have no idea about other browsers.
                                return 1.2 * fontSize;
                            } else if (lineHeight == 'inherit') {
                                return resolveLineHeight(elem.parentNode);
                            } else {
                                if (parseFloat(lineHeight)) {
                                    return parseFloat(lineHeight);
                                } else {
                                    return null;
                                }
                            }
                        }

                        // Calculate the number of lines in a paragraph, taking into account
                        // the font size and line spacing.
                        function lines(paragraph) {
                            var paragraphHeight = paragraph.clientHeight;
                            var lineHeight = resolveLineHeight(paragraph);

                            if (lineHeight) {
                                return Math.floor(paragraphHeight / lineHeight);
                            } else {
                                return null;
                            }
                        }

                        var words = element.innerHTML.split(/\s+/);
                        console.log(' -> This paragraph with ' + words.length + ' words will be split into chunks.');

                        // Create the first chunk.
                        var chunkOne = element.cloneNode(false);

                        // We need to append the chunk to a visible element so we can get height
                        // feedback from it.
                        allContent.appendChild(chunkOne);

                        // Iterate over the words in the paragraph and store them in a cache.
                        // This is how we compute how many words can fit in the given number of lines,
                        // allowing us to write words all the way to the end of the last remaining line.
                        var j = 0;
                        var cache = [];
                        while (lines(chunkOne) < remainingLines && j < words.length) {
                            // We need to push the word to the chunk so we can get height feedback.
                            chunkOne.innerHTML += words[j] + ' ';
                            cache.push(words[j]);
                            j++;
                        }
                        // Clear everything and remove the element, we don't need height feedback anymore.
                        allContent.removeChild(chunkOne);

                        // We need to store everything in a regular string variable first, to prevent the
                        // browser from processing HTML tags before we're done writing them. I learned this the
                        // hard way. This also provides an 8ms speed increase for some reason.
                        var innerHTML = '';
                        // Write the words to one less than the cache length (the last word overflows)
                        for (j = 0; j < cache.length - 1; j++) {
                            innerHTML += cache[j] + ' ';
                        }
                        // Write to the chunk's innerHTML.
                        chunkOne.innerHTML = innerHTML;

                        // Push the chunk
                        pushElement(chunkOne);
                        currentHeight += remaining;

                        // Set wordCount for clarity before continuing to the next stage
                        var wordCount = j;

                        // If we're writing all the words to the first chunk,
                        // there's no need to continue with the rest of the
                        // logic in this block.
                        if (wordCount == words.length - 1) {
                            continue;
                        }

                        // Make a new page for the remaining words.
                        prepareNextPage();

                        // The rest of the words are written to this chunk; let's hope this isn't some
                        // insanely long paragraph that could span multiple pages. A word around needs
                        // to be computing how many words fit on an entire page and then going from there.
                        var chunkTwo = chunkOne.cloneNode(false);
                        // See reasoning above for why I do this.
                        innerHTML = '';

                        if (wordCount != 0) {
                            // Set the indent to zero so that it doesn't "look" like we're actually writing a
                            // new paragraph, it'll look continued from the last one.
                            chunkTwo.style.textIndent = '0px';
                        }

                        // Pop the rest of the words on the second paragraph.
                        for (var j = wordCount; j < words.length; j++) {
                            innerHTML += words[j];
                            if (j < words.length - 1) {
                                innerHTML += ' ';
                            }
                        }
                        // Write to the chunk.
                        chunkTwo.innerHTML = innerHTML;
                        // Push the second chunk.
                        pushElement(chunkTwo);
                        // Manually update the currentHeight based on how much was put on the previous
                        // page. pushElement() can't do this because it thinks the height is zero
                        // (the element hasn't been written yet so it has no height.)
                        currentHeight += elementHeight - remaining;
                    }

                } else {
                    // The element has no children, just make a new page, push it, and keep going.
                    if (element.children.length == 0) {
                        prepareNextPage();
                        pushElement(element);
                        continue;
                    } else {
                        console.log(' -> This element will be split into chunks.');
                    }
                    // The first stage of this processor will fill the current page with
                    // as many child nodes as possible.
                    // Start by cloning the element node for the first chunk.
                    var chunkOne = element.cloneNode(false);

                    var isList = element.tagName == 'OL' || element.tagName == 'UL';
                    // The list size is different from the node size because the list size counts
                    // how many LI (list item) nodes there are, where as the node size stores the
                    // entire count of nodes. The node size will never be less than the the list
                    // size, but could be more if the list is polluted with tags other than
                    // <li> tags. This processor will split at nodes, not at list items. The 
                    // list count is kept so that subsequent chunks can pick up where this chunk
                    // left off. That is, a numbered list should keep the numbering correct, so 
                    // nodes on the following pages should start their numbering where the previous
                    // node left off.
                    var listSize = 0;

                    // Set the list size to the starting point so all other lists start at the
                    // correct index.
                    if (isList && element.start) {
                        listSize = parseInt(element.start);
                    }

                    var nodeSize = 0;

                    // Iterate over the children of the element, up to the end of the current page.
                    for (var j = 0; j < element.children.length; j++) {
                        var child = element.children[j];

                        // As long as there's room on the current page for this node, append it
                        // to the stage 1 chunk and subtract the height.
                        var realHeight = computeRealHeight(child);
                        if (realHeight < remaining) {
                            chunkOne.appendChild(child.cloneNode(true));
                            remaining -= realHeight;
                            currentHeight += realHeight;

                            // Only increment the list size variable if this is actually a list item,
                            // and, you know, we're working with lists.
                            if (isList && child.tagName == 'LI') {
                                listSize++;
                            }
                            // Always increment the node size counter because every child is a node.
                            nodeSize++;
                        } else {
                            // Once the remaining height on the current page is too small, 
                            // the first stage is done.
                            console.log(' -> Chunk 1 complete. (' + nodeSize + ' child nodes.)');
                            break;
                        }
                    }

                    // Sometimes not even a single node will fit.
                    if (nodeSize > 0) {
                        // Push the first chunk to the existing page. At this point, stage 1 is complete.
                        pushElement(chunkOne);
                    }

                    // There's no more elements to write, they're all on the first page.
                    if (nodeSize == element.children.length) {
                        continue;
                    }


                    // Create the next list chunk. It is a shallow clone of the first one.
                    var nextChunk = chunkOne.cloneNode(false);
                    if (isList) {
                        // Set the starting counter for the new list.
                        nextChunk.start = (listSize).toString();
                    }
                    // Iterate over the remaining children in the original list, appending them
                    // to the current chunk as long as they'll fit on the page.
                    for (var j = nodeSize; j < element.children.length; j++) {
                        var child = element.children[j];

                        // If the node will not fit on the current page, make a new one and
                        // add the chunk to it.
                        var realHeight = computeRealHeight(child);
                        if (currentHeight + realHeight >= pageHeight) {
                            if (nextChunk.children.length > 0) {
                                pushElement(nextChunk);
                                console.log(' -> Pushed chunk with ' + nextChunk.children.length + ' nodes.');
                            }

                            prepareNextPage();

                            // Create the next chunk and set the starting point.
                            nextChunk = chunkOne.cloneNode(false);
                            if (isList) {
                                nextChunk.start = listSize.toString();
                            }
                        }
                        // Append the child node to the current chunk.
                        nextChunk.appendChild(child.cloneNode(true));
                        currentHeight += realHeight;

                        // Continue incrementing the list size counter in case the list spans
                        // multiple additional pages.
                        if (isList && child.tagName == 'LI') {
                            listSize++;
                        }
                    }
                    // The last page is now full, write the final chunk to a fresh new page.
                    if (nextChunk.children.length > 0) {
                        //prepareNextPage();
                        pushElement(nextChunk);
                        console.log(' -> Pushed final chunk with ' + nextChunk.children.length + ' nodes.');
                    }
                    // This list has been processed.
                    // Manually update currentHeight
                    //currentHeight += elementHeight - remaining;
                }
            }
        }

        // All the original content has now been cloned into the pageDOM array,
        // so we can remove it from the page.
        allContent.parentNode.removeChild(allContent);

        // This function writes a new page to the document body with the given
        // number. This number is used for the page ID.
        function newPage(number) {
            var page = document.createElement('div');
            page.className = 'page';
            page.id = 'page-' + number;
            var content = document.createElement('div');
            content.className = 'page-content';
            page.appendChild(content);
            document.body.appendChild(page);
            return content;
        }

        console.log('Building Pages...');
        // Reset the page counter to zero because we're about to iterate
        // over all the pages again. This is really just for logging
        // purposes at this point, but could possibly be used later.
        pageCount = 0;
        // Hold a reference to the current page.
        var currentPage;
        // Iterate over all of the elements in the pageDOM array to
        // actually append them to the document. This is the second
        // stage of the parser.
        for (var i = 0; i < pageDOM.length; i++) {
            var element = pageDOM[i];
            // If we have a new page object, or don't have a reference
            // to an existing page, create a new page.
            if (element == NEW_PAGE || !currentPage) {
                pageCount++;
                currentPage = newPage(pageCount);
            } else {
                // Write the element to the current page.
                currentPage.appendChild(element);
            }
        }

        console.log('Cleaning up...');

        // A simple function to remove nodes by
        // calling removeChild() on their parent.
        function removeNode(node) {
            if (node) {
                node.parentNode.removeChild(node);
            }
        }
        // Remove all the original headers and footers, as they've
        // now been cloned on to every single page.
        removeNode(firstPageHeader);
        removeNode(firstPageFooter);
        removeNode(header);
        removeNode(footer);

        // A simple benchmark to see how long we took to parse the entire DOM
        // and write it all to the page.
        // On my computer, the original version of this file would take about
        // 60 ms. This version completes in about 20 ms.
        // Interestingly enough, all the comments I've added just about
        // double the time it takes to complete. That's to say that without
        // my extensive documentation, This entire script would complete in
        // about 10 ms.
        console.log('Done. Took ' + (Date.now() - startTime) + ' ms.');
    }
});
