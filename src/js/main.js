//= ../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js
//= ../../node_modules/tiny-slider/dist/min/tiny-slider.js


document.addEventListener('DOMContentLoaded', function() {
    initFeedbackNotes();
});


function initFeedbackNotes() {
    var sliderContainer = document.querySelector('.feedback-notes-slider');
    if (!sliderContainer) return;

    tns({
        container: sliderContainer,
        items: 3,
        slideBy: 1,
        autoplay: false,
        navAsThumbnails: false,
        center: true,
        controls: false,
        autoplayButtonOutput: false,
        navPosition: 'bottom',
    });
}