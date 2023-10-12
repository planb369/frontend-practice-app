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
  const { postId } = router.query;

  const [details, setDetails] = useState<details | null>(null);

  useEffect(() => {
    if (postId) {
      const fetchDetails = async () => {
        try {
          const postDataRef = doc(collection(db, "posts"), postId.toString());
          const docSnap = await getDoc(postDataRef);
          if (docSnap.exists()) {
            const data = docSnap.data() as details;
            setDetails(data);
          } else {
            console.log("ドキュメントが存在しません");
          }
        } catch (error) {
          console.error("データの取得に失敗しました", error);
        }
      };

      fetchDetails();
    }
  }, [postId]);

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
