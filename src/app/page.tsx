"use client";

import { useRouter } from 'next/navigation';  // ใช้สำหรับการเปลี่ยนเส้นทางไปยังหน้าที่เกี่ยวข้อง

const HomePage = () => {
  const router = useRouter();

  // ฟังก์ชันสำหรับเปลี่ยนเส้นทางไปยังหน้า Sign Up
  const handleSignUp = () => {
    router.push('register');  // เปลี่ยนเส้นทางไปยังหน้าลงทะเบียน
  };

  // ฟังก์ชันสำหรับเปลี่ยนเส้นทางไปยังหน้า Sign In
  const handleSignIn = () => {
    router.push('login');  // เปลี่ยนเส้นทางไปยังหน้าเข้าสู่ระบบ
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Welcome to Finall Project</h1>
      <p>Please choose one of the options below:</p>
      
      {/* ปุ่มสำหรับไปหน้า Sign Up */}
      <button onClick={handleSignUp} style={{ padding: '10px 20px', margin: '10px' }}>
        Sign Up
      </button>
      
      {/* ปุ่มสำหรับไปหน้า Sign In */}
      <button onClick={handleSignIn} style={{ padding: '10px 20px', margin: '10px' }}>
        Sign In
      </button>
    </div>
  );
};

export default HomePage;
