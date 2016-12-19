import angular from 'angular';
import angularMeteor from 'angular-meteor';
import template from './carousel.html';
import angularUI from 'angular-ui-bootstrap'

class CarouselCtrl {
    constructor() {
        this.myInterval = 5000;
        this.noWrapSlides = false;
        this.active = 0;
        this.slides = [];
    }
    addSlid() {
        var newWidth = 600 + slides.length + 1;
        this.slides.push({
            image: 'images/Hsbc-logo.svg',
            text: ['Nice image', 'Awesome photograph', 'That is so cool', 'I love that'][slides.length % 4],
        });
    }
}
export default angular.module('carousel', [
        angularMeteor,
        angularUI
    ])
    .component('carousel', {
        templateUrl: template,
        controller: CarouselCtrl
    });
