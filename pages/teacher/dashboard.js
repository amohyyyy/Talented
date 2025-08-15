import { useEffect, useState } from "react";
import { auth, db } from "../../lib/firebase";
import { collection, query, where, onSnapshot, addDoc, serverTimestamp } from "firebase/firestore";
import { signOut } from "firebase/auth";

export default function TeacherDashboard() {
  const [courses, setCourses] = useState([]);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  useEffect(() => {
    const q = query(collection(db, "courses"), where("owner", "==", auth.currentUser ? auth.currentUser.uid : "_"));
    const unsub = onSnapshot(q, (snap) => {
      const list = [];
      snap.forEach(d => list.push({ id: d.id, ...d.data() }));
      setCourses(list);
    });
    return () => unsub();
  }, []);

  async function createCourse(e) {
    e.preventDefault();
    if (!title) return;
    await addDoc(collection(db, "courses"), {
      title,
      description: desc,
      owner: auth.currentUser.uid,
      createdAt: serverTimestamp()
    });
    setTitle(""); setDesc("");
  }

  return (
    <div className="container py-8">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">لوحة المعلم</h1>
        <button className="btn" onClick={() => signOut(auth)}>تسجيل الخروج</button>
      </div>

      <div className="card mb-6">
        <h2 className="font-semibold mb-3">إنشاء دورة فعلية</h2>
        <form onSubmit={createCourse} className="grid md:grid-cols-3 gap-3">
          <input className="input" placeholder="عنوان الدورة" value={title} onChange={e=>setTitle(e.target.value)} />
          <input className="input" placeholder="وصف قصير" value={desc} onChange={e=>setDesc(e.target.value)} />
          <button className="btn btn-primary" type="submit">حفظ</button>
        </form>
      </div>

      <div className="card">
        <h2 className="font-semibold mb-3">دوراتي</h2>
        <ul className="space-y-2">
          {courses.map(c => (
            <li key={c.id} className="border rounded-md p-3 flex justify-between items-center">
              <div>
                <div className="font-medium">{c.title}</div>
                <div className="text-sm text-gray-600">{c.description}</div>
              </div>
              <a className="text-blue-600" href={`/courses/${c.id}`}>فتح</a>
            </li>
          ))}
          {courses.length === 0 && <p className="text-gray-600">لا توجد دورات بعد.</p>}
        </ul>
      </div>
    </div>
  );
}
