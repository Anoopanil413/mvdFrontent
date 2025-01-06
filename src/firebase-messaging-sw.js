// src/firebase-messaging-sw.js
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.1/firebase-messaging-compat.js');

// Precache manifest will be injected here
if (self.__WB_MANIFEST) {
  // Process manifest if available
}

const firebaseConfig = {
  apiKey:'AIzaSyAAKrTg3ZwJboAdBi_BZ7Ig3A-gltYg71Y',
  authDomain: 'letmego-6fd0e.firebaseapp.com',
  projectId: 'letmego-6fd0e',
  storageBucket: 'letmego-6fd0e.firebasestorage.app',
  messagingSenderId: '327813966330',
  appId: '1:327813966330:web:5fd7a018875fe78735dc43'
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('Received background message:', payload);
  
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon || '/android-chrome-192x192.png',
    badge: '/android-chrome-192x192.png',
    tag: 'notification-1'
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});

// Cache static assets
const CACHE_NAME = 'v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.webmanifest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => response || fetch(event.request))
  );
});