import { useRouter } from "next/router";
import db from "../../firebase";
import { useState, useEffect } from 'react';
import { collection, doc, getDoc, DocumentData } from "firebase/firestore";

type details = {
  id: string;
  title: string;
  text: string;
};

export default function Details() {
  const router = useRouter();
  const { id } = router.query;

  const [details, setDetails] = useState<details | null>(null);

  useEffect(() => {
    if (id) {
      const fetchDetails = () => {
        const postDetails = doc(collection(db, "posts"), id.toString());
        getDoc(postDetails)
          .then((res) => {
            const data = res.data() as details;
            setDetails(data);
          })
          .catch((error) => {
            console.error("詳細の取得に失敗しました", error);
          });
      };

      fetchDetails();
    }
  }, [id]);

  return (
    <div>
      {/* 詳細表示 */}
      {details && (
        <>
          <h1>{details.title}</h1>
          <p>{details.text}</p>
        </>
      )}
    </div>
  );
}
