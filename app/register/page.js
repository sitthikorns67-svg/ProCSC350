import React from 'react'

export default function Page() {
    return (
        <div>
            <div>
                <h1>Register</h1>
            </div>
            <form>
                <div>
                    <label htmlFor="id">ID : </label>
                    <input id="id" name="id" type="number" placeholder="เช่น 67xxxxx" />
                </div>

                <div>
                    <label htmlFor="full_name">Full Name : </label>
                    <input id="full_name" name="full_name" type="text" placeholder="ชื่อ-นามสกุล" required />
                </div>

                <div>
                    <label htmlFor="email">Email : </label>
                    <input id="email" name="email" type="email" placeholder="example@email.com" required />
                </div>

                <div>
                    <label htmlFor="password">Password : </label>
                    <input id="password" name="password" type="password" placeholder="รหัสผ่าน" required />
                </div>

                <div>
                    <label htmlFor="role">Role : </label>
                    <select id="role" name="role" defaultValue="student">
                        <option value="student">Student</option>
                        <option value="instructor">Instructor</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>

                <div>
                    <button type="submit">บันทึก</button>
                    <button type="reset">ยกเลิก</button>
                </div>
            </form>
        </div>
    )
}
