const version = 17;
var oldVersion = version - 1;

const MAIN_CACHE = `ARK-cache-version: ${version}`;
const OLD_MAIN_CACHE = `ARK-cache-version: ${oldVersion}`;
const VERSION_CACHE = 'ARK-bibles';
var update = true;
var updateVar = true;

const urlsToCache = [
     'manifest.webmanifest',
     'code/css/apps/settings.css',
     'code/css/shared/shared.css',
     'code/css/shared/boxes.css',
     'code/css/shared/lateload.css',
     'code/js/z-shared/shared.js',
     'code/js/index/index.js',
     'code/js/z-shared/boxes.js'
];

self.addEventListener('install', event => {
     event.waitUntil(
          (async () => {
               const cache = await caches.open(MAIN_CACHE);
               await cache.addAll(urlsToCache);
               console.log('Precached assets successfully stored.');
          })()
     );
});

self.addEventListener('activate', async (event) => {

     event.waitUntil(
          (async () => {
               await deleteCaches();
               self.clients.claim();
          })()
     );
});

async function deleteCaches() {

     const cacheAllowList = [MAIN_CACHE, VERSION_CACHE];
     const keys = await caches.keys();
     await Promise.all(keys.map(async (key) => {
          if (!cacheAllowList.includes(key)) { await caches.delete(key); };
     }));
};

async function deleteCachedFile(fileName) {
     const cache = await caches.open(MAIN_CACHE);
     const keys = await cache.keys();

     for (const request of keys) {
          if (request.url.endsWith(fileName)) { await cache.delete(request); };
     };
     return Promise.resolve(true);
};

self.addEventListener('fetch', event => {

     event.respondWith(
          (async () => {

               const cache = await caches.open(MAIN_CACHE);
               const versionCache = await caches.open(VERSION_CACHE);
               var url = new URL(event.request.url);
               var filename = url.pathname.split('/').pop();
               url.search = '';

               // This can be removed after editing TWF is finished
               if (navigator.onLine) {

                    if (filename === 'variables.js') {
                         if (updateVar) {
                              const headResponse = await fetch(event.request, { method: 'HEAD', redirect: 'follow' });
                              const newETag = headResponse.headers.get('ETag');
                              let cachedResponse = await cache.match(url);
                              if (cachedResponse) {
                                   const oldETag = cachedResponse.headers.get('ETag');
                                   if (newETag && oldETag && newETag !== oldETag) {
                                        const newResponse = await fetchOnlineUpdate(event.request, filename);
                                        if (newResponse.ok) { await cache.put(url, newResponse); };
                                   };
                                   updateVar = false;
                              };
                         };
                    };

                    if (filename === 'TWFVerses.json') {
                         if (update) {
                              const headResponse = await fetch(event.request, { method: 'HEAD', redirect: 'follow' });
                              const newETag = headResponse.headers.get('ETag');
                              let cachedResponse = await versionCache.match(url);
                              if (cachedResponse) {
                                   const oldETag = cachedResponse.headers.get('ETag');
                                   if (newETag && oldETag && newETag !== oldETag) {
                                        const newResponse = await fetchOnlineUpdate(event.request, filename);
                                        if (newResponse.ok) { await versionCache.put(url, newResponse); };
                                   };
                                   update = false;
                                   return cachedResponse;
                              };
                         };
                    };
               };
               // End This can be removed after editing TWF is finished

               if (filename.endsWith('.json')) {

                    const cachedResponse = await versionCache.match(url);
                    if (cachedResponse) {
                         // Start Here
                         //const cntEncode = cachedResponse.headers.get('Content-Encoding')
                         return cachedResponse;
                    };

                    const response = await fetchOnline(event.request, filename);
                    if (!response.ok) { return response; };
                    await versionCache.put(url, response.clone());
                    return response;
               } else {

                    const cachedResponse = await cache.match(url);
                    if (cachedResponse) { return cachedResponse; };

                    let evr = event.request.clone();
                    const response = await fetchOnline(evr, filename);
                    if (!response.ok) { return response; };
                    let cleanedResponse = cleanResponse(response);
                    await cache.put(url, cleanedResponse.clone());
                    return response;
               };
          })()
     );
});

function cleanResponse(response) {
     // If the response has been redirected, clone the body into a new Response object
     if (response.redirected) {
          return new Response(response.body, {
               status: response.status,
               statusText: response.statusText,
               headers: response.headers,
          });
     }
     return response;
}

async function fetchOnlineUpdate(evr, filename) {

     if (navigator.onLine) {
          try {
               const response = await fetch(evr, { cache: 'reload', redirect: 'follow' });
               if (!response.ok) { return new Response(`${filename}Network fetch error: 500`, { status: 500 }); };
               return response;
          } catch (error) {
               return new Response(`${filename}Network fetch error: 500-1`, { status: 500 });
          };
     } else { return new Response(`${filename}: No internet connection error: 503-1`, { status: 503 }); };
};

async function fetchOnline(evr, filename) {

     if (navigator.onLine) {
          try {
               const response = await fetch(evr, { redirect: 'follow' });
               if (!response.ok) { return new Response(`${filename}Network fetch error: 500`, { status: 500 }); };
               return response;
          } catch (error) {
               return new Response(`${filename}Network fetch error: 500-1`, { status: 500 });
          };
     } else { return new Response(`${filename}: No internet connection error: 503-1`, { status: 503 }); };
};

self.addEventListener('message', (event) => {
     if (event.data.action === 'checkCaches') {
          checkCaches(1);
          checkCaches(2);
     };
});

async function checkCaches(cacheToCheck) {
     let checkCache = '';
     if (cacheToCheck === 1) {
          checkCache = MAIN_CACHE;
     } else { checkCache = VERSION_CACHE; };

     const cache = await caches.open(checkCache);
     const cachedRequests = await cache.keys();
     if (!cachedRequests.length) return;

     const updatePromises = cachedRequests.map(async (request) => {
          const url = request.url;
          const headResponse = await fetch(url, { method: 'HEAD', cache: 'no-store', redirect: 'follow' });
          if (headResponse.status === 404) {
               console.log(`Resource ${url} no longer exists on server (404). Deleting from cache.`);
               await cache.delete(request);
               return;
          };

          const newETag = headResponse.headers.get('ETag');
          const cachedResponse = await cache.match(request);

          if (cachedResponse) {
               const cachedETag = cachedResponse.headers.get('ETag');
               if (newETag && cachedETag && newETag !== cachedETag) {
                    const freshResponse = await fetch(url, { redirect: 'follow' });
                    if (freshResponse.ok) {
                         await cache.put(request, freshResponse.clone());
                         console.log(`Resource ${url} was fetched and updated in cache.`);
                    } else {
                         console.warn(`Failed to fetch fresh version of ${url}: ${freshResponse.status}`);
                    };
               } else {
                    console.log(`Resource ${url} is still fresh (ETag match or no ETag change).`);
               }
          } else {
               console.log(`Resource ${url} in cache keys but no direct match found, skipping ETag check for now.`);
          };
     });
     await Promise.all(updatePromises);
};