import { Workbox } from 'workbox-window';

export default function registerServiceWorker() {

  // if ( 'production' !== process.env.NODE_ENV ) {
  //   return;
  // }
  // // Check if the serviceWorker Object exists in the navigator object ( means if browser supports SW )
  // if ('serviceWorker' in navigator) {
  //   const wb = new Workbox('sw.js');

  //   // wb.addEventListener('installed', event => {
  //   //   /**
  //   //    * We have the condition - event.isUpdate because we don't want to show
  //   //    * this message on the very first service worker installation,
  //   //    * only on the updated
  //   //    */
  //   //   if (event.isUpdate) {
  //   //     if (confirm(`New app update is available!. Click OK to refresh`)) {
  //   //       window.location.reload();
  //   //     }
  //   //   }
  //   // });
  //   wb.register();
  // }

  // Check if service workers are supported
  if ('serviceWorker' in navigator) {
    // register workbox service worker
    const workboxSW = new Workbox('/src-sw.js');
    workboxSW.register();
  } else {
    console.error('Service workers are not supported in this browser.');
  }

}