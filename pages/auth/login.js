import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  async function handleLogin(e) {
    e.preventDefault();
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/dashboard");
    } catch (err) {
      setError(err.message || "خطأ في تسجيل الدخول");
    }
  }

  return (
    <div className="container py-12">
      <div className="card max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">تسجيل دخول</h1>
        <form onSubmit={handleLogin} className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">البريد الإلكتروني</label>
            <input className="input" type="email" value={email} onChange={e=>setEmail(e.target.value)} required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">كلمة المرور</label>
            <input className="input" type="password" value={password} onChange={e=>setPassword(e.target.value)} required />
          </div>
          {error && <p className="text-red-600 text-sm">{error}</p>}
          <button className="btn btn-primary w-full" type="submit">دخول</button>
        </form>
        <p className="text-center mt-4 text-sm">إنشاء حساب جديد؟ <Link href="/auth/signup"><a className="text-blue-600">اضغط هنا</a></Link></p>
      </div>
    </div>
  );
                                                                                      }
