import { useEffect, useState } from "react";
import { db } from "../../lib/firebase";
import { collection, onSnapshot, query } from "firebase/firestore";

export default function StudentDashboard() {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    const q = query(collection(db, "courses"));
    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      setCourses(list);
    });
    return () => unsub();
  }, []);
  return (
    <div className="container py-8">
      <h1 className="text-2xl font-bold mb-4">لوحة الطالب</h1>
      <div className="grid sm:grid-cols-2 gap-4">
        {courses.map(c => (
          <div key={c.id} className="card">
            <h3 className="font-semibold">{c.title}</h3>
            <p className="text-sm text-gray-600">{c.description}</p>
            <div className="mt-3">
              <a className="text-blue-600" href={`/courses/${c.id}`}>دخول الدورة</a>
            </div>
          </div>
        ))}
        {courses.length === 0 && <p className="text-gray-600">لا توجد دورات متاحة حالياً.</p>}
      </div>
    </div>
  );
}
