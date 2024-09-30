"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';  // ใช้ next/navigation สำหรับ Next.js 13+

const AddRecordPage = () => {
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('income');
  const [note, setNote] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();  // ใช้ useRouter เพื่อเปลี่ยนเส้นทาง

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // ดึง JWT token จาก localStorage
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        return;
      }

      // ส่งคำขอ POST ไปยัง API เพื่อเพิ่มข้อมูล
      const response = await fetch('/api/records', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,  // ส่ง JWT token ไปกับคำขอ
        },
        body: JSON.stringify({
          amount: parseFloat(amount),  // แปลงเป็น number
          date,
          type,
          note,
        }),
      });

      if (response.ok) {
        // หากเพิ่มข้อมูลสำเร็จ, เปลี่ยนเส้นทางไปหน้า dashboard
        router.push('/dashboard');
      } else {
        const data = await response.json();
        setError(data.message || 'Failed to add record');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <div>
      <h1>Add Income/Expense</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="date"
          placeholder="Date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <select value={type} onChange={(e) => setType(e.target.value)}>
          <option value="income">Income</option>
          <option value="expense">Expense</option>
        </select>
        <textarea
          placeholder="Note"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />
        <button type="submit">Add Record</button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
};

export default AddRecordPage;
