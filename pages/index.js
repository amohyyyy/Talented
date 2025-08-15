import Link from "next/link";

export default function Home() {
  return (
    <div className="container py-12">
      <div className="card">
        <h1 className="text-3xl font-bold mb-2">منصة التعليم - تجربة حقيقية</h1>
        <p className="text-gray-600 mb-4">
          هذا موقع حقيقي مُربوط بـ Firebase. سجّل ثم جرّب لوحة المعلم أو الطالب.
        </p>

        <div className="flex gap-3">
          <Link href="/auth/signup"><a className="btn btn-primary">إنشاء حساب</a></Link>
          <Link href="/auth/login"><a className="btn">تسجيل دخول</a></Link>
        </div>

        <div className="mt-6">
          <h2 className="font-semibold mb-2">ملاحظات تشغيل:</h2>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            <li>فعِّل Authentication (Email/Password) في مشروع Firebase.</li>
            <li>قاعدة البيانات Firestore تستخدم مجموعات: <code>users</code>, <code>courses</code>, <code>lessons</code>, <code>quizzes</code>.</li>
            <li>بعد التسجيل ستتوَّجه تلقائيًا إلى /dashboard حيث يتم توجيهك حسب الدور.</li>
          </ul>
        </div>
      </div>
    </div>
  );
    }
