'use client'

import { useEffect, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { userService } from '@/lib/api-services'

export default function EditUserPage() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const userId = searchParams.get('id')

    const [formData, setFormData] = useState({
        name: '',
        username: '',
        role: '',
    })

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!userId) return

        const fetchUser = async () => {
            try {
                const user = await userService.getById(userId)
                setFormData({
                    name: user.name,
                    username: user.username,
                    role: user.role,
                })
            } catch (err) {
                console.error(err)
                setError('Gagal memuat data user')
            }
        }

        fetchUser()
    }, [userId])

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!userId) return

        setLoading(true)
        setError('')

        try {
            await userService.update(userId, formData)
            router.push('/users')
        } catch (err) {
            console.error(err)
            setError('Gagal mengedit user')
        } finally {
            setLoading(false)
        }
    }


    return (
        <div>
            <h1>Edit User</h1>
            {error && <p style={{ color: 'red' }}>{error}</p>}

            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Username:
                    <input name="username" value={formData.username} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Role:
                    <select name="role" value={formData.role} onChange={handleChange} required>
                        <option value="">Pilih Role</option>
                        <option value="admin">Admin</option>
                        <option value="owner">Owner</option>
                    </select>
                </label>
                <br />
                <button type="submit" disabled={loading}>
                    {loading ? 'Menyimpan...' : 'Simpan'}
                </button>
            </form>
        </div>
    )
}
