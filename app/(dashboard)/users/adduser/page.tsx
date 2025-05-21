'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useSession } from 'next-auth/react'
import { useToast } from '@/components/ui/use-toast'
import { userService } from '@/lib/api-services'

export default function AddUserPage() {
    const router = useRouter()
    const { data: session } = useSession()
    const { toast } = useToast()

    const [form, setForm] = useState({
        name: '',
        username: '',
        password: '',
    })
    const [loading, setLoading] = useState(false)

    const userRole = session?.user?.role

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setLoading(true)

        try {
            await userService.create({
                ...form,
                role: 'admin', // Fixed role
            })

            toast({
                title: 'Success',
                description: 'Admin account created successfully.',
            })

            router.push('/users')
        } catch (error: any) {
            console.error(error)
            toast({
                title: 'Error',
                description: error?.message || 'Failed to create user',
                variant: 'destructive',
            })
        } finally {
            setLoading(false)
        }
    }

    if (userRole !== 'owner') {
        return (
            <div className="flex items-center justify-center h-full">
                <Card className="w-full max-w-md">
                    <CardContent className="pt-6">
                        <div className="text-center py-10">
                            <h3 className="text-lg font-medium">Access Denied</h3>
                            <p className="text-muted-foreground mt-2">Only owners can add new users.</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="flex justify-center">
            <Card className="w-full max-w-md">
                <CardHeader>
                    <CardTitle>Add Admin User</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label htmlFor="name">Name</Label>
                            <Input id="name" name="name" value={form.name} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="username">Username</Label>
                            <Input id="username" name="username" value={form.username} onChange={handleChange} required />
                        </div>
                        <div>
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <Button type="submit" disabled={loading} className="w-full">
                            {loading ? 'Creating...' : 'Create Admin'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    )
}
