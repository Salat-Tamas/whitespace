// "use client";
// import MemFlipCard from "@/components/games/memory/MemFlipCard";
// import React from "react";

// type Props = {};

// const shuffle = ([...arr]) => {
//   let m = arr.length;
//   while (m) {
//     const i = Math.floor(Math.random() * m--);
//     [arr[m], arr[i]] = [arr[i], arr[m]];
//   }
//   return arr;
// };

// const page = (props: Props) => {
//   //TODO: fetch data from sanity
//   var titles = ["title1", "title2", "title3"];
//   titles = [...titles, ...titles];
//   titles = shuffle(titles);
//   const [flipped, setFlipped] = React.useState<>([]);
//   const [solved, setSolved] = React.useState([]);
//   const [moves, setMoves] = React.useState(0);
//   const [gameOver, setGameOver] = React.useState(false);

//   React.useEffect(() => {
//     initGame();
//   }, []);

//   const initGame = () => {
//     setFlipped([]);
//     setSolved([]);
//     setMoves(0);
//     setGameOver(false);
//   };

//   const handleCLick = (i: number) => {
//     if (flipped.length === 2) {
//       setTimeout(() => {
//         setFlipped([]);
//       }, 1000);
//     } else {
//       setFlipped([...flipped, i]);
//     }
//   };

//   return (
//     <main className="flex justify-center items-center w-full h-full pt-10 min-h-screen">
//       <div className="flex flex-wrap gap-2 md:gap-8">
//         {titles.map((title, i) => {
//           const [isFlipped, setIsFlipped] = React.useState(false);
//           if (flipped.includes(i) || solved.includes(i)) {
//             setIsFlipped(true);
//           }
//           return (
//             <div key={i} onClick={() => handleCLick(i)}>
//               <MemFlipCard
//                 title={title}
//                 isFlipped={isFlipped}
//                 setIsFlipped={setIsFlipped}
//               />
//             </div>
//           );
//         })}
//       </div>
//     </main>
//   );
// };

// export default page;

// FIXME
