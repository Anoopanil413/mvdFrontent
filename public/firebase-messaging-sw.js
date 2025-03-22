// src/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Precache manifest will be injected here
if (self.__WB_MANIFEST) {
  // Process manifest if available
}

 fetch("/firebase-config.json")
  .then((response) => {
    return response.json();
  })
  .then((jsContent) => {
    const config = eval(jsContent);
    firebase.initializeApp(config.firebaseConfig);
    const messaging = firebase.messaging();
    messaging.onBackgroundMessage((payload) => {
      console.log('Received background message:', payload);
      
      const notificationTitle = payload.notification.title;
      const notificationOptions = {
        body: payload.notification.body,
        icon: payload.notification.icon || '/android-chrome-192x192.png',
        badge: '/android-chrome-192x192.png',
        tag: 'notification-1',
        payload:payload.data
      };
    
      self.registration.showNotification(notificationTitle, notificationOptions);
    });
    
    
    self.addEventListener('notificationclick', (event)=>{
      event.notification.close();
      event.waitUntil(
        clients.matchAll({
          type: 'window',
          includeUncontrolled: true
        }).then((clientList) => {
          for(client of clientList){
            if(client.url === '/' && 'focus' in client){
              return client.focus();
            }
          }
          if (clients.openWindow) {
            return clients.openWindow('/');
          }
        })
      )
     });
  })
  .catch((error) => {
    console.error("Error initializing Firebase in service worker:", error);
  });




// // Cache static assets
// const CACHE_NAME = 'v1';
// const urlsToCache = [
//   '/',
//   '/index.html',
//   '/manifest.webmanifest'
// ];



// self.addEventListener('install', (event) => {
//   event.waitUntil(
//     caches.open(CACHE_NAME)
//       .then((cache) => cache.addAll(urlsToCache))
//   );
// });

// self.addEventListener('activate', (event) => {
//   event.waitUntil(
//     caches.keys().then((cacheNames) => {
//       return Promise.all(
//         cacheNames.map((cacheName) => {
//           if (cacheName !== CACHE_NAME) {
//             return caches.delete(cacheName);
//           }
//         })
//       );
//     })
//   );
// });

// self.addEventListener('fetch', (event) => {
//   event.respondWith(
//     caches.match(event.request)
//       .then((response) => response || fetch(event.request))
//   );
// });