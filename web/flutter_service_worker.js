'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';
const RESOURCES = {
  "assets/AssetManifest.json": "6ff480fc2bdaced0901d8b1c2f0e8d98",
"assets/assets/font/IranNastaliq.ttf": "8d7d8fa0b9ddb8ec258ad6b8b9b6d254",
"assets/assets/font/Kamran.ttf": "0d9309586eecc270d73a73be9ce2b339",
"assets/assets/font/Nazanin.ttf": "fe70eb00cc03165219440c4b13b6bc66",
"assets/assets/NovinGozarLogo.jpg": "76ebb57d500638929953123ced7f6301",
"assets/assets/svg/alarm.svg": "e36b8d99cb5410dce4005f77375316c2",
"assets/assets/svg/alldevice.svg": "7f70f8c29b665cb3e9cad7806b3331c5",
"assets/assets/svg/avatar.svg": "39ac82e65694f805e37ff37a7d6aa03a",
"assets/assets/svg/devices/doorsensor.svg": "042b01bcbc6693afece2fe9976ae51d7",
"assets/assets/svg/devices/key.svg": "90ae4bfd6fbd2a0aeef5674bbd78acab",
"assets/assets/svg/devices/router.svg": "89dbdcb59cae8531604164fe1eba16a5",
"assets/assets/svg/devices/socket.svg": "3cb0ca5f15537185fa98378e1ac49ae7",
"assets/assets/svg/rooms/balcony.svg": "fe60514af1e6ffe799f28ef439568a55",
"assets/assets/svg/rooms/bathtub.svg": "7707e54b67a7d0342fc2b65f3162a548",
"assets/assets/svg/rooms/bed.svg": "a729f14bd26c56064f3ef43f1907cf92",
"assets/assets/svg/rooms/furniture.svg": "8f84dc51498d6e8217cf40bf7a05571d",
"assets/assets/svg/rooms/kitchen.svg": "5610e8fa3a0ebee62491091af3dbc208",
"assets/assets/svg/rooms/living.svg": "5820f406839e4fe41ce9497a8b2f9fd6",
"assets/assets/svg/rooms/openeddoor.svg": "9fd4bf0925743c782bb92d282818f3b6",
"assets/assets/svg/rooms/toilet.svg": "04f920920d45fbc093b790cd4d5c7723",
"assets/assets/svg/rooms/yard.svg": "c51e142d6364a60621abe36dd4f740f2",
"assets/FontManifest.json": "339ae0e3083e93fc0e310df798755080",
"assets/fonts/MaterialIcons-Regular.otf": "e7069dfd19b331be16bed984668fe080",
"assets/NOTICES": "0b42fddfb1c1f8b82cbf4e5223fcf7c7",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "6d342eb68f170c97609e9da345464e5e",
"assets/packages/flutter_neumorphic/fonts/NeumorphicIcons.ttf": "32be0c4c86773ba5c9f7791e69964585",
"canvaskit/canvaskit.js": "97937cb4c2c2073c968525a3e08c86a3",
"canvaskit/canvaskit.wasm": "3de12d898ec208a5f31362cc00f09b9e",
"canvaskit/profiling/canvaskit.js": "c21852696bc1cc82e8894d851c01921a",
"canvaskit/profiling/canvaskit.wasm": "371bc4e204443b0d5e774d64a046eb99",
"favicon.png": "5dcef449791fa27946b3d35ad8803796",
"flutter.js": "a85fcf6324d3c4d3ae3be1ae4931e9c5",
"icons/Icon-192.png": "ac9a721a12bbc803b44f645561ecb1e1",
"icons/Icon-512.png": "96e752610906ba2a93c65f8abe1645f1",
"icons/Icon-maskable-192.png": "c457ef57daa1d16f64b27b786ec2ea3c",
"icons/Icon-maskable-512.png": "301a7604d45b3e739efc881eb04896ea",
"index.html": "9a12dbdad2797d9b514f427fa0d64d30",
"/": "9a12dbdad2797d9b514f427fa0d64d30",
"main.dart.js": "5f6e414a27fa4152027ed1aad8a1c772",
"manifest.json": "8eb313c52a9c773b49d6291c43d5fe2a",
"splash/img/dark-1x.png": "a0ee7c9cc8e04e10b142a67ff5a40f36",
"splash/img/dark-2x.png": "dce445a54e41276372794c3260399a7d",
"splash/img/dark-3x.png": "31405d4e4407ca663677a02ef99f8754",
"splash/img/dark-4x.png": "089c2b27f42a0ce9ac5947cb83eba2d7",
"splash/img/light-1x.png": "a0ee7c9cc8e04e10b142a67ff5a40f36",
"splash/img/light-2x.png": "dce445a54e41276372794c3260399a7d",
"splash/img/light-3x.png": "31405d4e4407ca663677a02ef99f8754",
"splash/img/light-4x.png": "089c2b27f42a0ce9ac5947cb83eba2d7",
"splash/splash.js": "123c400b58bea74c1305ca3ac966748d",
"splash/style.css": "c94c38ff00a9d487c353a2d78989ea08",
"version.json": "2623c4f0e344561eb39f8efd6ea9ad98"
};

// The application shell files that are downloaded before a service worker can
// start.
const CORE = [
  "main.dart.js",
"index.html",
"assets/AssetManifest.json",
"assets/FontManifest.json"];
// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});

// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});

// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});

self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});

// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}

// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
