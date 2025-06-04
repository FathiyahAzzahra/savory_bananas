'use client'

import { useEffect, useState } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { userService } from '@/lib/api-services'

export default function EditUserPage() {
    const router = useRouter()
    const params = useParams()
    const userId = params?.id as string

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
        <div className="max-w-xl mx-auto p-6 mt-10 bg-white rounded-2xl shadow-md">
            <h1 className="text-2xl font-semibold mb-6 text-center">Edit User</h1>

            {error && (
                <p className="text-red-600 bg-red-100 p-3 rounded-md mb-4 text-sm">
                    {error}
                </p>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                        Name
                    </label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                        Username
                    </label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    />
                </div>

                <div>
                    <label htmlFor="role" className="block text-sm font-medium text-gray-700">
                        Role
                    </label>
                    <input
                        id="role"
                        name="role"
                        type="text"
                        value={formData.role}
                        disabled
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm bg-gray-100 cursor-not-allowed"
                    />
                </div>


                <div className="text-right">
                    <button
                        type="submit"
                        disabled={loading}
                        className={`px-4 py-2 rounded-md text-white font-semibold ${loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-indigo-600 hover:bg-indigo-700'
                            }`}
                    >
                        {loading ? 'Menyimpan...' : 'Simpan'}
                    </button>
                </div>
            </form>
        </div>
    )
}
