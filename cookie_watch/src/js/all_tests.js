import {run as fetch_get} from './tests/fetch_get.js';
import {run as fetch_post} from './tests/fetch_post.js';
import {run as xmlhttprequest_get} from './tests/xmlhttprequest_get.js';
import {run as xmlhttprequest_post} from './tests/xmlhttprequest_post.js';
import {run as hyperlink} from './tests/hyperlink.js';
import {run as hyperlink_iframe} from './tests/hyperlink_iframe.js';
import {run as form} from './tests/form.js';
import {run as form_iframe} from './tests/form_iframe.js';
import {run as iframe} from './tests/iframe.js';
import {run as window_open} from './tests/window_open.js';
import {run as window_open_iframe} from './tests/window_open_iframe.js';
import {run as websocket} from './tests/websocket.js';
import {run as audio} from './tests/audio.js';
import {run as video} from './tests/video.js';
import {run as track} from './tests/track.js';
import {run as image} from './tests/image.js';
import {run as svg} from './tests/svg.js';
import {run as embed} from './tests/embed.js';
import {run as link_icon} from './tests/link_icon.js';
import {run as link_stylesheet} from './tests/link_stylesheet.js';
import {run as link_prefetch} from './tests/link_prefetch.js';
import {run as link_preload_font} from './tests/link_preload_font.js';
import {run as link_preload_image} from './tests/link_preload_image.js';
import {run as link_preload_imagesrcset} from './tests/link_preload_imagesrcset.js';
import {run as link_preload_script} from './tests/link_preload_script.js';
import {run as link_preload_style} from './tests/link_preload_style.js';
import {run as import_test} from './tests/import.js';
import {run as object} from './tests/object.js';
import {run as script} from './tests/script.js';

let all_tests = [
    {
        'name': 'Fetch GET',
        'path': '/test/fetch_get',
        'popup': false,
        'run': fetch_get,
    },
    {
        'name': 'Fetch POST',
        'path': '/test/fetch_post',
        'popup': false,
        'run': fetch_post,
    },
    {
        'name': 'XMLHttpRequest GET',
        'path': '/test/xmlhttprequest_get',
        'popup': false,
        'run': xmlhttprequest_get,
    },
    {
        'name': 'XMLHttpRequest POST',
        'path': '/test/xmlhttprequest_post',
        'popup': false,
        'run': xmlhttprequest_post,
    },
    {
        'name': 'Hyperlink',
        'path': '/test/hyperlink',
        'popup': true,
        'run': hyperlink,
    },
    {
        'name': 'Hyperlink iFrame',
        'path': '/test/hyperlink_iframe',
        'popup': false,
        'run': hyperlink_iframe,
    },
    {
        'name': 'Form',
        'path': '/test/form',
        'popup': true,
        'run': form,
    },
    {
        'name': 'Form iFrame',
        'path': '/test/form_iframe',
        'popup': false,
        'run': form_iframe,
    },
    {
        'name': 'iFrame',
        'path': '/test/iFrame',
        'popup': false,
        'run': iframe,
    },
    {
        'name': 'Embed',
        'path': '/test/embed',
        'popup': false,
        'run': embed,
    },
    {
        'name': 'Window Open',
        'path': '/test/window_open',
        'popup': true,
        'run': window_open,
    },
    {
        'name': 'Window Open iFrame',
        'path': '/test/window_open_iframe',
        'popup': false,
        'run': window_open_iframe,
    },
    {
        'name': 'WebSocket',
        'path': '/test/websocket',
        'popup': false,
        'run': websocket,
    },
    {
        'name': 'Audio',
        'path': '/test/audio',
        'popup': false,
        'run': audio,
    },
    {
        'name': 'Video',
        'path': '/test/video',
        'popup': false,
        'run': video,
    },
    // {
    //     'name': 'Track',
    //     'path': '/test/track',
    //     'popup': false,
    //     'run': track,
    // },
    {
        'name': 'Image',
        'path': '/test/image',
        'popup': false,
        'run': image,
    },
    {
        'name': 'SVG',
        'path': '/test/svg',
        'popup': false,
        'run': svg,
    },
    {
        'name': 'Link Icon',
        'path': '/test/link_icon',
        'popup': false,
        'run': link_icon,
    },
    {
        'name': 'Link Stylesheet',
        'path': '/test/link_stylesheet',
        'popup': false,
        'run': link_stylesheet,
    },
    {
        'name': 'Link Prefetch',
        'path': '/test/link_prefetch',
        'popup': false,
        'run': link_prefetch,
    },
    {
        'name': 'Link Preload Font',
        'path': '/test/link_preload_font',
        'popup': false,
        'run': link_preload_font,
    },
    {
        'name': 'Link Preload Image',
        'path': '/test/link_preload_image',
        'popup': false,
        'run': link_preload_image,
    },
    {
        'name': 'Link Preload ImageSrcSet',
        'path': '/test/link_preload_imagesrcset',
        'popup': false,
        'run': link_preload_imagesrcset,
    },
    {
        'name': 'Link Preload Script',
        'path': '/test/link_preload_script',
        'popup': false,
        'run': link_preload_script,
    },
    {
        'name': 'Link Preload Style',
        'path': '/test/link_preload_style',
        'popup': false,
        'run': link_preload_style,
    },
    {
        'name': 'Import',
        'path': '/test/import',
        'popup': false,
        'run': import_test,
    },
    {
        'name': 'Object',
        'path': '/test/object',
        'popup': false,
        'run': object,
    },
    {
        'name': 'Script',
        'path': '/test/script',
        'popup': false,
        'run': script,
    },
];

export {all_tests};