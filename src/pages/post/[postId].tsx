// import { useRouter } from "next/router";
// import { useState, useEffect } from 'react';
// import { collection, doc, getDoc, DocumentData } from "firebase/firestore";

// type details = {
//   id: string;
//   title: string;
//   text: string;
// };

// export default function Details() {
//   const router = useRouter();
//   const { postId } = router.query;

//   const [details, setDetails] = useState<details | null>(null);

//   useEffect(() => {
//     if (postId) {
//       const fetchDetails = () => {
//         const postDetails = doc(collection(db, "posts"), postId.toString());
//         getDoc(postDetails)
//           .then((res) => {
//             const data = res.data() as details;
//             setDetails(data);
//           })
//           .catch((error) => {
//             console.error("詳細の取得に失敗しました", error);
//           });
//       };

//       fetchDetails();
//     }
//   }, [postId]);

//   return (
//     <div>
//       {/* 詳細表示 */}
//       {details && (
//         <>
//           <h1>{details.title}</h1>
//           <p>{details.text}</p>
//         </>
//       )}
//     </div>
//   );
// }
