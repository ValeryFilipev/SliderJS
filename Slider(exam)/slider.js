function Slider(element) {
    this.el = document.querySelector(element);
    this.init();
}

Slider.prototype = {
    init: function () {
        this.links = this.el.querySelectorAll("#slider-nav a");
        this.wrapper = this.el.querySelector("#slider-wrapper");
        this.nextBtn = this.el.querySelector("#next");
        this.prevBtn = this.el.querySelector("#prev");
        this.navigate();
    },
    //our moves, click buttons and etc.
    navigate: function () {

        var self = this;

        for (var i = 0; i < this.links.length; i++) {
            var link = this.links[i];
            link.addEventListener('click', function (e) {
                clearInterval(self.slideCycle);
                self.slide(this);
            });
        }

        self.nextBtn.addEventListener('click', function (e) {
            var currentSlideNumber = document.querySelector('#slider-nav a.current').getAttribute("data-slide");
            var nextSlide = document.querySelector('[data-slide="' + (parseInt(currentSlideNumber, 10) + 1) + '"]');

            clearInterval(self.slideCycle);
            nextSlide.click();
        }, false);

        self.prevBtn.addEventListener('click', function (e) {
            var currentSlideNumber = document.querySelector('#slider-nav a.current').getAttribute("data-slide");
            var prevSlide = document.querySelector('[data-slide="' + (parseInt(currentSlideNumber, 10) - 1) + '"]');

            clearInterval(self.slideCycle);
            prevSlide.click();
        }, false);

        self.slideShow(2000);
    },
    //movement our slides
    slide: function (element) {
        this.setCurrentLink(element);

        var index = parseInt(element.getAttribute('data-slide'), 10) + 1;
        var currentSlide = this.el.querySelector(".slide:nth-child(" + index + ")");

        this.wrapper.style.left = "-" + currentSlide.offsetLeft + 'px';
    },
    //illumination our circles for an active slide
    setCurrentLink: function (link) {
        var parent = link.parentNode;
        var a = parent.querySelectorAll('a');

        link.className = 'current';

        for (var j = 0; j < a.length; ++j) {
            var cur = a[j];
            if (cur !== link) {
                cur.className = '';
            }
        }
    },
    //auto movement our slides
    slideShow: function (timeout) {
        var sliderCount = this.links.length;
        var self = this;
        this.slideCycle = setInterval(function () {
            var currentSlideNumber = document.querySelector('#slider-nav a.current').getAttribute("data-slide");
            var slideId = parseInt(currentSlideNumber, 10) + 1;
            self.slide(document.querySelector('[data-slide="' + (sliderCount === slideId ? 0 : slideId) + '"]'));
        }, timeout);
    }
};