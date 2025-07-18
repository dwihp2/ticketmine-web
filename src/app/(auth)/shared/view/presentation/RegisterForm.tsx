import { useState } from "react";

export function RegisterForm({ onSubmit }: { onSubmit: (email: string, name: string, password: string) => void }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form className="space-y-4" onSubmit={e => { e.preventDefault(); onSubmit(email, name, password); }}>
      <div>
        <label className="block mb-1 font-medium">Name</label>
        <input type="text" className="w-full border rounded px-3 py-2" value={name} onChange={e => setName(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Email</label>
        <input type="email" className="w-full border rounded px-3 py-2" value={email} onChange={e => setEmail(e.target.value)} required />
      </div>
      <div>
        <label className="block mb-1 font-medium">Password</label>
        <input type="password" className="w-full border rounded px-3 py-2" value={password} onChange={e => setPassword(e.target.value)} required />
      </div>
      <button type="submit" className="w-full bg-green-600 text-white py-2 rounded font-semibold">Register</button>
    </form>
  );
}
