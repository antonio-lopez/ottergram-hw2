var DETAIL_IMAGE_SELECTOR = '[data-image-role="target"]';
var DETAIL_TITLE_SELECTOR = '[data-image-role="title"]';
var DETAIL_FRAME_SELECTOR = '[data-image-role="frame"]';
var THUMBNAIL_LINK_SELECTOR = '[data-image-role="trigger"]';
var HIDDEN_DETAIL_CLASS = 'hidden-detail';
var TINY_EFFECT_CLASS = 'is-tiny';
var ESC_KEY = 27;

function setDetails(imageUrl, titleText) {
    'use strict';

    var detailImage = document.querySelector(DETAIL_IMAGE_SELECTOR);
    detailImage.setAttribute('src', imageUrl);

    var detailTitle = document.querySelector(DETAIL_TITLE_SELECTOR);
    detailTitle.textContent = titleText;
}

function imageFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-url');
}

function titleFromThumb(thumbnail) {
    'use strict';
    return thumbnail.getAttribute('data-image-title');
}

function setDetailsFromThumb(thumbnail) {
    'use strict';
    setDetails(imageFromThumb(thumbnail), titleFromThumb(thumbnail));
}

function addThumbClickHandler(thumb) {
    'use strict';
    thumb.addEventListener('click', function (event) {
        event.preventDefault();
        setDetailsFromThumb(thumb);
        showDetails();
    });
}

function getThumbnailsArray() {
    'use strict';

    var thumbnails = document.querySelectorAll(THUMBNAIL_LINK_SELECTOR);

    var thumbnailArray = [].slice.call(thumbnails);
    return thumbnailArray;
}

function hideDetails() {
    'use strict';
    document.body.classList.add(HIDDEN_DETAIL_CLASS);
}

function showDetails() {
    'use strict';
    var frame = document.querySelector(DETAIL_FRAME_SELECTOR);
    document.body.classList.remove(HIDDEN_DETAIL_CLASS);
    frame.classList.add(TINY_EFFECT_CLASS);
    setTimeout(function () {
        frame.classList.remove(TINY_EFFECT_CLASS);
    }, 50);
}

function addKeyPressHandler() {
    'use strict';
    document.body.addEventListener('keyup', function (event) {
        event.preventDefault();
        if (event.keyCode === ESC_KEY) {
            hideDetails();
        }
    });
}

function initializeEvents() {
    'use strict';
    var thumbnails = getThumbnailsArray();
    thumbnails.forEach(addThumbClickHandler);
    addKeyPressHandler();

    // Previous and Next Buttons
    document.getElementById("previous").addEventListener("click", function (event) {
        event.preventDefault();
        prevButton();
    });

    document.getElementById("next").addEventListener("click", function (event) {
        event.preventDefault();
        nextButton();
    });
}

initializeEvents();

function getImagesArray() {
    "use strict";
    var imgArray = getThumbnailsArray();
    for (var i = 0; i < imgArray.length; i++) {
        imgArray[i] = imgArray[i].href;
    }
    return imgArray;
}

function prevButton() {
    var imgArray = getImagesArray();
    var thumbArray = getThumbnailsArray();
    var curr = imgArray.indexOf(document.getElementById("detail-image").src);
    if (curr == 0) {
        curr = imgArray.length - 1;
    } else {
        curr = curr - 1;
    }
    //console.log(curr);
    thumbArray[curr].click();
}

function nextButton() {
    var imgArray = getImagesArray();
    var thumbArray = getThumbnailsArray();
    var curr = imgArray.indexOf(document.getElementById("detail-image").src);
    if (curr == 4) {
        curr = 0;
    } else {
        curr = curr + 1;
    }
    //console.log(curr);
    thumbArray[curr].click();
}