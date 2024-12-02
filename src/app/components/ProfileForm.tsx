'use client'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

const ProfileForm = ({existingUsername=''}:{existingUsername?:string}) => {
    const [username, setUsername] = useState(existingUsername)
  const router = useRouter()

  const handleSubmit = async (ev: FormEvent) => {
    ev.preventDefault()

    try {
      const res = await axios.post("/api/profile", { username })
      if (res.data) {
        router.push("/dashboard/event-types")
        router.refresh()
      }
    } catch (err) {
      console.error('Error saving username.', err)
    }
  }

  return (
    <form
    onSubmit={handleSubmit}
    className="flex flex-col gap-4 w-full max-w-sm mt-4 mb-8 text-indigo-800"
  >
    <label className="flex flex-col">
      <span className="text-lg font-semibold mb-2">Username</span>
      <input
        type="text"
        value={username}
        onChange={(e) => {
          setUsername(e.target.value)
        }}
        placeholder="username"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </label>
    <button
      type="submit"
      className="bg-indigo-500 text-white py-2 rounded-md hover:bg-blue-600 transition-colors"
    >
      Save
    </button>
  </form>
  )
}

export default ProfileForm