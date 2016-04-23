import $ from 'jquery';
import {curry, compose, prop, map} from 'ramda';

const trace = curry((tag, x) => {
    console.log(tag, x);
    return x;
});

const Impure = {
    getJSON: curry((callback, url) => $.getJSON(url, callback)),
    setHtml: curry((sel, html) => $(sel).html(html))
};

const tags = location.search.substr(1) || 'cats';
const flickrApiBaseUrl = 'https://api.flickr.com/services/feeds/photos_public.gne';
const url = `${flickrApiBaseUrl}?tags=${tags}&format=json&jsoncallback=?`;

const img = (url) => $('<img />', { src: url });
const mediaUrl = compose(prop('m'), prop('media'));
const mediaToImg = compose(img, mediaUrl);
const images = compose(map(mediaToImg), prop('items'));
const renderImages = compose(Impure.setHtml('#gallery'), images);
const app = Impure.getJSON(renderImages);

app(url);
