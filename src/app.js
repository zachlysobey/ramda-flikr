import $ from 'jquery';
import {curry, compose, prop, map} from 'ramda';

const trace = curry(function (tag, x) {
    console.log(tag, x);
    return x;
});

const Impure = {
    getJSON: curry(function (callback, url) {
        $.getJSON(url, callback);
    }),
    setHtml: curry(function (sel, html) {
        $(sel).html(html);
    })
};

const url = term => `https://api.flickr.com/services/feeds/photos_public.gne?tags=${term}&format=json&jsoncallback=?`;
const mediaUrl = compose(prop('m'), prop('media'));
const srcs = compose(map(mediaUrl), prop('items'));
const img = url => $('<img />', { src: url });
const images = compose(map(img), srcs);
const renderImages = compose(Impure.setHtml('body'), images);
const app = compose(Impure.getJSON(renderImages), url);

app('hello world');
