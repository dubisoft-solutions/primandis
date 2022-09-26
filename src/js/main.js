//= ../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js
//= ../../node_modules/tiny-slider/dist/min/tiny-slider.js


document.addEventListener('DOMContentLoaded', function() {
    initFeedbackNotes();
    addClassToBodyWhenMobileMenuOpens();
});


function initFeedbackNotes() {
    var sliderContainer = document.querySelector('.feedback-notes-slider');
    if (!sliderContainer) return;

    var slider = tns({
        container: sliderContainer,
        items: 3,
        slideBy: 1,
        autoplay: false,
        navAsThumbnails: false,
        center: true,
        controls: false,
        autoplayButtonOutput: false,
        navPosition: 'bottom',
        autoHeight: true,
        mouseDrag: true,
       
        responsive: {
            0: {
                items: 1,
                slideBy: 1,
                edgePadding: 30,
                nav: false,
                center: true,
                gutter: 10,
            },
            576: {
                gutter: 20,
                edgePadding: 100,
            },
            1200: {
                edgePadding: 0,
                items: 3,
                slideBy: 1,
                nav: true,
            }
        }
    });

    slider.events.on("transitionEnd", function(info) {
        console.log("transitionEnd", info.indexCached, info.index)
        info.slideItems[info.indexCached].classList.remove(
          "center"
        );
      
        info.slideItems[info.index].classList.add(
          "center"
        );
    });

    slider.events.on("newBreakpointEnd", function(info) {
        console.log("newBreakpointEnd", info.indexCached, info.index)
        info.slideItems[info.indexCached].classList.remove(
          "center"
        );
      
        info.slideItems[info.index].classList.add(
          "center"
        );

        slider.goTo(info.index);
    });
}

function addClassToBodyWhenMobileMenuOpens() {
    var mainNavbarCollapse = document.getElementById('mainNavbarCollapse');
    var body = document.querySelector('body');

    mainNavbarCollapse.addEventListener('show.bs.collapse', function(event) {
        body.classList.add('nav-menu-opened');
    })

    mainNavbarCollapse.addEventListener('hidden.bs.collapse', function(event) {
        body.classList.remove('nav-menu-opened');
    })
}