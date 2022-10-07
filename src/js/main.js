//= ../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js
//= ../../node_modules/tiny-slider/dist/min/tiny-slider.js


document.addEventListener('DOMContentLoaded', function() {
    initFeedbackNotesSlider();
    addClassToBodyWhenMobileMenuOpens();
    initProductsPicturesSlider();
    initScrollToTopBtnHandler();
    initProductsFilterMobileToggler();
    initFixedElementsBellowNavbarTracker()
});


function initFeedbackNotesSlider() {
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

    sliderContainer.addEventListener('click', function(e) {
        var target = e.target;
        if (!target) return;

        var slide = target.closest('.slide-item');
        if (!slide) return;

        if (slide.classList.contains('center')) return;

        if (slide.nextElementSibling && slide.nextElementSibling.classList.contains('center')) {
            slider.goTo('prev');
        }

        if (slide.previousElementSibling && slide.previousElementSibling.classList.contains('center')) {
            slider.goTo('next');
        }
    })
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

function initProductsPicturesSlider() {
    var sliderContainer = document.querySelector('.product-pictures-slider');
    if (!sliderContainer) return;

    var slider = tns({
        container: sliderContainer,
        items: 3,
        slideBy: 1,
        autoplay: false,
        navAsThumbnails: false,
        controls: false,
        autoplayButtonOutput: false,
        autoHeight: true,
        mouseDrag: true,
        edgePadding: 30,
        gutter: 20,
        nav: false,
        center: false,
        loop: false,

        responsive: {
            0: {
                edgePadding: 10,
                gutter: 5,
            },
            768: {
                edgePadding: 30,
                gutter: 10,
            },
        }
    });
}

function initScrollToTopBtnHandler() {
    var scrollToTopButtons = document.querySelectorAll('.scroll-to-top-btn');
    if (!scrollToTopButtons.length) return;

    scrollToTopButtons.forEach(function(btn) {
        btn.addEventListener('click', function() {
            scrollToTop(500);
        });
    });

    function scrollToTop (durationMs) {
        // cancel if already on top
        if (document.scrollingElement.scrollTop === 0) return;
    
        const cosParameter = document.scrollingElement.scrollTop / 2;
        let scrollCount = 0, oldTimestamp = null;
    
        function step (newTimestamp) {
            if (oldTimestamp !== null) {
                // if duration is 0 scrollCount will be Infinity
                scrollCount += Math.PI * (newTimestamp - oldTimestamp) / durationMs;
                if (scrollCount >= Math.PI) return document.scrollingElement.scrollTop = 0;
                document.scrollingElement.scrollTop = cosParameter + cosParameter * Math.cos(scrollCount);
            }
            oldTimestamp = newTimestamp;
            window.requestAnimationFrame(step);
        }
        window.requestAnimationFrame(step);
    }
}

function initProductsFilterMobileToggler() {
    var togglers = document.querySelectorAll('.products-filter-mobile-toggler');
    var filterPanel = document.querySelector('.products-filter-panel');
    if (!filterPanel) return;

    togglers.forEach(function(toggler) {
        toggler.addEventListener('click', function(e) {
            e.preventDefault();
            var addClassToBody = filterPanel.classList.toggle('show');
            document.querySelector('body').classList.toggle('filter-panel-opened', addClassToBody);
        })
    })
}

function initFixedElementsBellowNavbarTracker() {
    var elementsToTrack = document.querySelectorAll('.make-child-div-fixed-bellow-navbar ');
    if (elementsToTrack.length == 0) return; // nothing to track

    var navbar = document.querySelector('.top-navbar');
    if (!navbar) return; // no navbar on the page, so nothing to track

    var navbarHeight = navbar.clientHeight;
    console.log('height',  navbarHeight);

    var lastKnownScrollPosition = 0;
    var ticking = false;
    var gapBetweenElemAndNavbarPx = 20;

    function doSomething(scrollPos) {
        elementsToTrack.forEach(function(el) {
            var offset = el.getBoundingClientRect();
            el.classList.toggle('fixed', offset.top - gapBetweenElemAndNavbarPx < navbarHeight);
            el.style.setProperty('--fixed-elem-position', (navbarHeight + gapBetweenElemAndNavbarPx) + 'px');      
        });
    }

    document.addEventListener('scroll', function(e) {
        lastKnownScrollPosition = window.scrollY;

        if (!ticking) {
            window.requestAnimationFrame(function() {
                doSomething(lastKnownScrollPosition);
                ticking = false;
            });

            ticking = true;
        }
    });
}