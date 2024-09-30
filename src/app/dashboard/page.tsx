"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';  // สำหรับการเปลี่ยนเส้นทางไปหน้า add-record

const DashboardPage = () => {
  const [records, setRecords] = useState([]);
  const [totalIncome, setTotalIncome] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [error, setError] = useState('');
  const router = useRouter();  // สร้าง instance ของ useRouter

  useEffect(() => {
    const fetchRecords = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('User not authenticated');
        router.push('/login');
        return;
      }

      const response = await fetch('/api/records', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        setError('Failed to fetch records');
        return;
      }

      const data = await response.json();
      setRecords(data);

      let income = 0;
      let expense = 0;
      data.forEach((record: any) => {
        if (record.type === 'income') {
          income += record.amount;
        } else if (record.type === 'expense') {
          expense += record.amount;
        }
      });
      setTotalIncome(income);
      setTotalExpense(expense);
    };

    fetchRecords();
  }, [router]);

  // ฟังก์ชันสำหรับไปยังหน้าเพิ่มบันทึกรายการ
  const handleAddRecord = () => {
    router.push('/add-record');
  };

  return (
    <div>
      <h1>Dashboard</h1>
      <h2>Total Income: {totalIncome}</h2>
      <h2>Total Expense: {totalExpense}</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <ul>
        {records.map((record: any, index: number) => (
          <li key={index}>
            {record.date} - {record.type === 'income' ? 'Income' : 'Expense'} - ${record.amount} ({record.note})
          </li>
        ))}
      </ul>

      {/* ปุ่มสำหรับไปหน้าเพิ่มบันทึกรายการ */}
      <button onClick={handleAddRecord} style={{ marginTop: '20px', padding: '10px 20px' }}>
        เพิ่มบันทึกรายการ
      </button>
    </div>
  );
};

export default DashboardPage;
