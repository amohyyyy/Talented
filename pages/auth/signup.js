import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("student");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, password);
      await setDoc(doc(db, "users", cred.user.uid), {
        uid: cred.user.uid,
        email,
        role,
        createdAt: serverTimestamp()
      });
      // تجربة حقيقية: توجه للوحة التحكم وسيتم إعادة التوجيه حسب الدور
      router.replace("/dashboard");
    } catch (err) {
      setError(err.message || "خطأ أثناء التسجيل");
      setLoading(false);
    }
  }

  return (
    <div className="container py-12">
      <div className="card max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">إنشاء حساب حقيقي</h1>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">كلمة المرور</label>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">الدور</label>
            <select className="input" value={role} onChange={e=>setRole(e.target.value)}>
              <option value="teacher">معلم</option>
              <option value="student">طالب</option>
              <option value="parent">ولي أمر</option>
            </select>
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn btn-primary w-full" disabled={loading} type="submit">
            {loading ? "جارٍ الإنشاء..." : "إنشاء حساب"}
          </button>
        </form>
        <p className="text-center mt-4 text-sm">لديك حساب؟ <Link href="/auth/login"><a className="text-blue-600">تسجيل دخول</a></Link></p>
      </div>
    </div>
  );
        }
