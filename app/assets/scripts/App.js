import $ from 'jquery';
import MobileMenu from './modules/MobileMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';
import Modal from './modules/Modal';

const mobileMenu = new MobileMenu();
const stickyHeader = new StickyHeader();
const modal = new Modal();
console.log(modal);
new RevealOnScroll();
