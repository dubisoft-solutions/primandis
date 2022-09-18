//= ../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js
//= ../../node_modules/tiny-slider/dist/min/tiny-slider.js


document.addEventListener('DOMContentLoaded', function() {
    initFeedbackNotes();
});


function initFeedbackNotes() {
    tns({
        container: '.feedback-notes-slider',
        items: 3,
        slideBy: 1,
        autoplay: true,
        navAsThumbnails: true,
        center: true,
        controls: false,
        autoplayButtonOutput: false,
        navPosition: 'bottom',
    });
}