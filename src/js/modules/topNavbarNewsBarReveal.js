/**
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 * reveal the news bar (above the top menu), using GSAP https://gsap.com/docs/v3/Plugins/ScrollTrigger/
 * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *
 */
// // import GSAP and its plugins, then register them
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// gsap.registerPlugin(ScrollTrigger);

// export function initializeNewsbarReveal() {
//     // NOTE: documentation at https://gsap.com/docs/v3/GSAP/gsap.matchMedia()/
//     let mm = gsap.matchMedia(),
//         breakPoint = 1024;

//     mm.add({
//         // set up any number of arbitrarily-named conditions. The function below will be called when ANY of them match.
//         isDesktop: `(min-width: ${breakPoint}px) and (prefers-reduced-motion: no-preference)`,
//         isMobile: `(max-width: ${breakPoint - 1}px) and (prefers-reduced-motion: no-preference)`
//     }, (context) => {
//         // context.conditions has a boolean property for each condition defined above indicating if it's matched or not.
//         let { isDesktop, isMobile } = context.conditions,
//             headerHeight = document.getElementById('newsbar').offsetHeight;
//             // NOTE: example definitions
//             // target = isDesktop ? ".desktop" : ".mobile",
//             // tl = gsap.timeline({
//             //     scrollTrigger: {
//             //         trigger: ".gray",
//             //         scrub: 1,
//             //         end: "200%",
//             //         pin: true
//             //     }
//             // });

//         // hide on scroll down, then reveal it again on when the scroll top of the viewport is reached
//         gsap.to('#newsbar', {
//             scrollTrigger: {
//                 trigger: "body",
//                 start: "top top", // start the animation when the top of the trigger element reaches the top of the viewport
//                 toggleActions: "play reverse play reverse", // play the animation forward when entering the trigger, and in reverse when leaving
//             },
//             marginTop: `-${headerHeight}px`,
//             // duration: 0.3,
//             // onComplete: function () {
//             //     document.getElementById('newsbar').classList.add('hidden');
//             // },
//         });

//         // NOTE: example code
//         // tl.to(target, { scale: 2, rotation: 360 }).to(target, { scale: 1 });
//         // // works for non-ScrollTrigger animations too: 
//         // gsap.to(target, { backgroundColor: "#2c7ad2", duration: 0.8, ease: "none", repeat: -1, yoyo: true });

//         return () => {
//             // optionally return a cleanup function that will be called when the media query no longer matches
//         }
//     });
// }