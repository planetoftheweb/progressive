/**
 * Copyright 2016 Google Inc. All rights reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
*/

// DO NOT EDIT THIS GENERATED OUTPUT DIRECTLY!
// This file should be overwritten as part of your build process.
// If you need to extend the behavior of the generated service worker, the best approach is to write
// additional code and include it using the importScripts option:
//   https://github.com/GoogleChrome/sw-precache#importscripts-arraystring
//
// Alternatively, it's possible to make changes to the underlying template file and then use that as the
// new base for generating output, via the templateFilePath option:
//   https://github.com/GoogleChrome/sw-precache#templatefilepath-string
//
// If you go that route, make sure that whenever you update your sw-precache dependency, you reconcile any
// changes made to this original template file with your modified copy.

// This generated service worker JavaScript will precache your site's resources.
// The code needs to be saved in a .js file at the top-level of your site, and registered
// from your pages in order to be used. See
// https://github.com/googlechrome/sw-precache/blob/master/demo/app/js/service-worker-registration.js
// for an example of how you can register this script and handle various service worker events.

/* eslint-env worker, serviceworker */
/* eslint-disable indent, no-unused-vars, no-multiple-empty-lines, max-nested-callbacks, space-before-function-paren, quotes, comma-spacing */
'use strict';

var precacheConfig = [["/css/app.css","46e44bdd16e653682a99b178dea82628"],["/data/pets.json","1d0f9a68066e3cc9febc64745c64d993"],["/images/icons/icon-128x128.png","bfda7c45a93753dd9b9984843bdf4761"],["/images/icons/icon-144x144.png","b21985449b4196c26166d40061ad4d94"],["/images/icons/icon-152x152.png","e767cdd48a6c6732ebad0273ec947447"],["/images/icons/icon-192x192.png","fbca206388cf36be9d6001abb5cd885b"],["/images/icons/icon-256x256.png","9551a75f83dec16df6dc48c3a6dab90d"],["/images/icons/icon-32x32.png","d55cf07eee423e441ea6475ab883148f"],["/images/icons/icon_reload.svg","f335e79828d92afbb64be2863f53372a"],["/images/pets/Bailey-523832647.jpg","cc89883fb386ce94ced1631dfd135f7f"],["/images/pets/Bailey-523832647_tn.jpg","7e442f3793f7ccc8de371e6f8e6b3085"],["/images/pets/Casper-178870793.jpg","4999f35d792dd76ab1b8cd5d0d929ed8"],["/images/pets/Casper-178870793_tn.jpg","fc90deae6d42f9f1232f19312c8ce77e"],["/images/pets/Chip-519252509.jpg","828fde7dd33cfcc45f57b8634cc8dd87"],["/images/pets/Chip-519252509_tn.jpg","7a0fcd06d2ce34722533d5679feb8336"],["/images/pets/Chyna-545429720.jpg","17f5f63a96202eebcba469ab7ee38b33"],["/images/pets/Chyna-545429720_tn.jpg","a71b0ffe9a8b868c0b295252a7f07223"],["/images/pets/Cosmo-481057312.jpg","8b051f892b3875caea852c7ac324f544"],["/images/pets/Cosmo-481057312_tn.jpg","8497b085b966d50b92868cf4b3fe260c"],["/images/pets/Felix-591830956.jpg","470242458e588902d10d4fa3d156f545"],["/images/pets/Felix-591830956_tn.jpg","9be1c144b7299eefe39dacb594e0ed2c"],["/images/pets/Fluffy-483561506.jpg","14e2174b89c223ab09fb1eca53157ea1"],["/images/pets/Fluffy-483561506_tn.jpg","25cce0b679797ec8d74c623e77ae7de1"],["/images/pets/Kiko-478801178.jpg","675f5e4d7265b553e78996e903812d02"],["/images/pets/Kiko-478801178_tn.jpg","9db7f9e7c8582f01b9550b86329ec5b7"],["/images/pets/Lucky-519705168.jpg","2e36b32063abb38146a6d29723950708"],["/images/pets/Lucky-519705168_tn.jpg","2c7317cb38f59907c458781d9fc7fcd8"],["/images/pets/Millie-586349302.jpg","d1f8e6d6186aa6fc447ccb39a65da3ab"],["/images/pets/Millie-586349302_tn.jpg","446d16099bb78a7db6fd222fdbc2a18a"],["/images/pets/Nadalee-601919350.jpg","96683b96eea4e136e81835f35a10536a"],["/images/pets/Nadalee-601919350_tn.jpg","e31bce93e47442f8bc64f8aadfe66ee8"],["/images/pets/Nugget-499158128.jpg","6084f9cf3b973b56d7dbd430abb1c8fa"],["/images/pets/Nugget-499158128_tn.jpg","615a2f94044410b784980c40fd2ea123"],["/images/pets/Oddball-534210612.jpg","b74650f2d7689a103a146942f0f3dae8"],["/images/pets/Oddball-534210612_tn.jpg","171623b994eaa40f79a4955320f6e6ff"],["/images/pets/Pax-487576086.jpg","a5f73c6a54a059944c773103bc0248fa"],["/images/pets/Pax-487576086_tn.jpg","8f6ab96662d7bafa565f8a673497c732"],["/images/pets/Pepe-505301170.jpg","12ee971e69746cf1e364a6c8d347cffb"],["/images/pets/Pepe-505301170_tn.jpg","7115be07e5bc2f1743494194e10b3b83"],["/images/pets/Rio-139983615.jpg","a811b10a402eab021951ca169f7d2357"],["/images/pets/Rio-139983615_tn.jpg","3957abdbdc712e0f2ad8e9bc183ab411"],["/images/pets/Sami-163271312.jpg","931912fec3a06b49edb7315bc26d42d5"],["/images/pets/Sami-163271312_tn.jpg","e67fd7a73312992d8d49696c946aae61"],["/images/pets/Scooter-587954386.jpg","5fc9faba68c6cac9462cb6d24e73edc2"],["/images/pets/Scooter-587954386_tn.jpg","c8f85090cdea6abfee8c6e960e58e619"],["/images/pets/Scout-482669440.jpg","95c06469855a3509b624b6c060162cd8"],["/images/pets/Scout-482669440_tn.jpg","5800af03c7bafa95a6052697b50909dc"],["/images/pets/Shadow-591817094.jpg","9e3b7b3927290551b9023341e9d328c5"],["/images/pets/Shadow-591817094_tn.jpg","ed6ff828f584145ae8a9bdc38f79b27c"],["/images/pets/Squiggles-72970152.jpg","02491754f031faa5a9c7dbf4605f5cfd"],["/images/pets/Squiggles-72970152_tn.jpg","c5609175ad6b0159cf490230c6f9fe41"],["/images/pets/Stich-56385517.jpg","836e3c5cc0f64a5b67a5f937e2a38352"],["/images/pets/Stich-56385517_tn.jpg","473c446542ab43c1551bb28387b80977"],["/images/pets/Tibbs-598156630.jpg","ba45f3064c9f03a0da4d65a6cac4f596"],["/images/pets/Tibbs-598156630_tn.jpg","6e9f28b0c1fcbb79e826a6b6c188a265"],["/images/pets/Wesley-122458883.jpg","9e57e8725fe99f8e54bdb3e19b75a41c"],["/images/pets/Wesley-122458883_tn.jpg","b45555db94668617bd750328411fa441"],["/images/pets/Zera-599775030.jpg","11ed8311a4d7335aa3c20b116aaa0089"],["/images/pets/Zera-599775030_tn.jpg","ea483d790ae30ccd7eb9eec86405fc09"],["/images/wisdompetlogo.svg","e87dec9a071f27e919d5b234e80ec1af"],["/index.html","6068369205e002bff567d682e85422f4"],["/js/app.js","362017e2659aa187b9bc1ba26a34dd83"],["/manifest.json","1fab2643b92bd63b63b6973569f632ba"]];
var cacheName = 'sw-precache-v2--' + (self.registration ? self.registration.scope : '');


var ignoreUrlParametersMatching = [/^utm_/];



var addDirectoryIndex = function (originalUrl, index) {
    var url = new URL(originalUrl);
    if (url.pathname.slice(-1) === '/') {
      url.pathname += index;
    }
    return url.toString();
  };

var createCacheKey = function (originalUrl, paramName, paramValue,
                           dontCacheBustUrlsMatching) {
    // Create a new URL object to avoid modifying originalUrl.
    var url = new URL(originalUrl);

    // If dontCacheBustUrlsMatching is not set, or if we don't have a match,
    // then add in the extra cache-busting URL parameter.
    if (!dontCacheBustUrlsMatching ||
        !(url.toString().match(dontCacheBustUrlsMatching))) {
      url.search += (url.search ? '&' : '') +
        encodeURIComponent(paramName) + '=' + encodeURIComponent(paramValue);
    }

    return url.toString();
  };

var isPathWhitelisted = function (whitelist, absoluteUrlString) {
    // If the whitelist is empty, then consider all URLs to be whitelisted.
    if (whitelist.length === 0) {
      return true;
    }

    // Otherwise compare each path regex to the path of the URL passed in.
    var path = (new URL(absoluteUrlString)).pathname;
    return whitelist.some(function(whitelistedPathRegex) {
      return path.match(whitelistedPathRegex);
    });
  };

var stripIgnoredUrlParameters = function (originalUrl,
    ignoreUrlParametersMatching) {
    var url = new URL(originalUrl);

    url.search = url.search.slice(1) // Exclude initial '?'
      .split('&') // Split into an array of 'key=value' strings
      .map(function(kv) {
        return kv.split('='); // Split each 'key=value' string into a [key, value] array
      })
      .filter(function(kv) {
        return ignoreUrlParametersMatching.every(function(ignoredRegex) {
          return !ignoredRegex.test(kv[0]); // Return true iff the key doesn't match any of the regexes.
        });
      })
      .map(function(kv) {
        return kv.join('='); // Join each [key, value] array into a 'key=value' string
      })
      .join('&'); // Join the array of 'key=value' strings into a string with '&' in between each

    return url.toString();
  };


var hashParamName = '_sw-precache';
var urlsToCacheKeys = new Map(
  precacheConfig.map(function(item) {
    var relativeUrl = item[0];
    var hash = item[1];
    var absoluteUrl = new URL(relativeUrl, self.location);
    var cacheKey = createCacheKey(absoluteUrl, hashParamName, hash, false);
    return [absoluteUrl.toString(), cacheKey];
  })
);

function setOfCachedUrls(cache) {
  return cache.keys().then(function(requests) {
    return requests.map(function(request) {
      return request.url;
    });
  }).then(function(urls) {
    return new Set(urls);
  });
}

self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return setOfCachedUrls(cache).then(function(cachedUrls) {
        return Promise.all(
          Array.from(urlsToCacheKeys.values()).map(function(cacheKey) {
            // If we don't have a key matching url in the cache already, add it.
            if (!cachedUrls.has(cacheKey)) {
              return cache.add(new Request(cacheKey, {credentials: 'same-origin'}));
            }
          })
        );
      });
    }).then(function() {
      
      // Force the SW to transition from installing -> active state
      return self.skipWaiting();
      
    })
  );
});

self.addEventListener('activate', function(event) {
  var setOfExpectedUrls = new Set(urlsToCacheKeys.values());

  event.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.keys().then(function(existingRequests) {
        return Promise.all(
          existingRequests.map(function(existingRequest) {
            if (!setOfExpectedUrls.has(existingRequest.url)) {
              return cache.delete(existingRequest);
            }
          })
        );
      });
    }).then(function() {
      
      return self.clients.claim();
      
    })
  );
});


self.addEventListener('fetch', function(event) {
  if (event.request.method === 'GET') {
    // Should we call event.respondWith() inside this fetch event handler?
    // This needs to be determined synchronously, which will give other fetch
    // handlers a chance to handle the request if need be.
    var shouldRespond;

    // First, remove all the ignored parameter and see if we have that URL
    // in our cache. If so, great! shouldRespond will be true.
    var url = stripIgnoredUrlParameters(event.request.url, ignoreUrlParametersMatching);
    shouldRespond = urlsToCacheKeys.has(url);

    // If shouldRespond is false, check again, this time with 'index.html'
    // (or whatever the directoryIndex option is set to) at the end.
    var directoryIndex = 'index.html';
    if (!shouldRespond && directoryIndex) {
      url = addDirectoryIndex(url, directoryIndex);
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond is still false, check to see if this is a navigation
    // request, and if so, whether the URL matches navigateFallbackWhitelist.
    var navigateFallback = '';
    if (!shouldRespond &&
        navigateFallback &&
        (event.request.mode === 'navigate') &&
        isPathWhitelisted([], event.request.url)) {
      url = new URL(navigateFallback, self.location).toString();
      shouldRespond = urlsToCacheKeys.has(url);
    }

    // If shouldRespond was set to true at any point, then call
    // event.respondWith(), using the appropriate cache key.
    if (shouldRespond) {
      event.respondWith(
        caches.open(cacheName).then(function(cache) {
          return cache.match(urlsToCacheKeys.get(url)).then(function(response) {
            if (response) {
              return response;
            }
            throw Error('The cached response that was expected is missing.');
          });
        }).catch(function(e) {
          // Fall back to just fetch()ing the request if some unexpected error
          // prevented the cached response from being valid.
          console.warn('Couldn\'t serve response for "%s" from cache: %O', event.request.url, e);
          return fetch(event.request);
        })
      );
    }
  }
});







