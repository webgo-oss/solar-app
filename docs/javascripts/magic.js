const Earth=[{
    id:"ani",
    con:"Earth, the third planet from the Sun, supports life with its 15°C average temperature, nitrogen-oxygen atmosphere, and 9.8 m/s² gravity. It orbits the Sun in 365.25 days.",
}
// {
//     id:"ani2",
//     con:"365.25 days (1 year).",
// },
// {
//     id:"ani3",
//     con:" -89°C to 56°C (extremes), with an average of ~15°C.",
// },
// {
//     id:"ani4",
//     con:"Composed of 78% nitrogen, 21% oxygen, and trace gases.",
// },
// {
//     id:"ani5",
//     con:"9.8 m/s² at the surface."
];
const para=document.getElementById('ani');
const para2=document.getElementById('ani2');
const para3=document.getElementById('ani3');
const para4=document.getElementById('ani4');
const para5=document.getElementById('ani5');
const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if(para.textContent==""){
          function typeText(elementId, text, speed) {
            let i = 0;
            const element = document.getElementById(elementId);
            
            function typing() {
                if (i < text.length) {
                    element.innerHTML += text.charAt(i);
                    i++;
                } else {
                    clearInterval(interval); 
                }
            }
            const interval = setInterval(typing, speed);
        }
        typeText(Earth[0].id,Earth[0].con, 40);
    }
//     if(para2.textContent==""){
//       function typeText(elementId, text, speed) {
//         let i = 0;
//         const element = document.getElementById(elementId);
        
//         function typing() {
//             if (i < text.length) {
//                 element.innerHTML += text.charAt(i);
//                 i++;
//             } else {
//                 clearInterval(interval); 
//             }
//         }
//         const interval = setInterval(typing, speed);
//     }
//     typeText(Earth[1].id,Earth[1].con, 50);
// }
// if(para3.textContent==""){
//   function typeText(elementId, text, speed) {
//     let i = 0;
//     const element = document.getElementById(elementId);
    
//     function typing() {
//         if (i < text.length) {
//             element.innerHTML += text.charAt(i);
//             i++;
//         } else {
//             clearInterval(interval); 
//         }
//     }
//     const interval = setInterval(typing, speed);
// }
// typeText(Earth[2].id,Earth[2].con, 50);
// }
// if(para4.textContent==""){
//   function typeText(elementId, text, speed) {
//     let i = 0;
//     const element = document.getElementById(elementId);
    
//     function typing() {
//         if (i < text.length) {
//             element.innerHTML += text.charAt(i);
//             i++;
//         } else {
//             clearInterval(interval); 
//         }
//     }
//     const interval = setInterval(typing, speed);
// }
// typeText(Earth[3].id,Earth[3].con, 50);
// }
// if(para5.textContent==""){
// function typeText(elementId, text, speed) {
// let i = 0;
// const element = document.getElementById(elementId);

// function typing() {
//     if (i < text.length) {
//         element.innerHTML += text.charAt(i);
//         i++;
//     } else {
//         clearInterval(interval); 
//     }
// }
// const interval = setInterval(typing, speed);
// }
// typeText(Earth[4].id,Earth[4].con, 50);
// }
        }
      });
    },
    { threshold: 1.0 } // Trigger when 100% of con2 is visible
  );

  observer.observe(para);
