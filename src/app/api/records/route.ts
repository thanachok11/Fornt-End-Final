import { NextResponse } from '../../../../node_modules/next/server';
import connectMongo from '@/lib/mongodb';
import Record from '@/models/Record';
import jwt from 'jsonwebtoken';

export async function GET(request: Request) {
  try {
    // เชื่อมต่อกับ MongoDB
    await connectMongo();

    // ดึง JWT token จาก Authorization header
    const token = request.headers.get('Authorization')?.split(' ')[1];
    if (!token) {
      return NextResponse.json({ message: 'Authentication required' }, { status: 401 });
    }

    // ถอดรหัส JWT เพื่อดึง userId
    const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (decoded as jwt.JwtPayload).userId;

    // ดึงข้อมูลรายการที่ตรงกับ userId
    const records = await Record.find({ user: userId });

    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error('Error fetching records:', error);
    return NextResponse.json({ message: 'Failed to fetch records', error: error.message }, { status: 500 });
  }
}
