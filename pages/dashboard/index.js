import { useEffect, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { useRouter } from "next/router";
import { doc, getDoc } from "firebase/firestore";

export default function DashboardRouter() {
  const router = useRouter();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, async (user) => {
      if (!user) {
        router.replace("/auth/login");
        return;
      }
      // جلب الدور من users/{uid}
      const snap = await getDoc(doc(db, "users", user.uid));
      const role = snap.exists() ? snap.data().role : null;
      if (role === "teacher") router.replace("/teacher/dashboard");
      else if (role === "student") router.replace("/student/dashboard");
      else if (role === "parent") router.replace("/parent/dashboard");
      else router.replace("/");
      setChecking(false);
    });
    return () => unsub();
  }, [router]);

  if (checking) {
    return <div className="container py-16"><div className="card text-center">جارِ التحقق...</div></div>;
  }
  return null;
}
