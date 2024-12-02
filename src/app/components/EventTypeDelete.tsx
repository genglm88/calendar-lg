"use client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import React from "react"

const EventTypeDelete = ({ id }: { id: string }) => {
  const router = useRouter()
  async function handleDelete() {
    const confirmDelete = confirm("Are you sure you want to delete this event?")
    if (confirmDelete) {
      try {
        await axios.delete("/api/event-types?id=" + id)
        toast.success('Item successfully deleted!');
        router.push("/dashboard/event-types")
        router.refresh()
      
      } catch (error) {
        toast.error('Error deleting item');
        console.error('error',error)
      }
    }
  }
  return (
    <div>
      <button
        type="button"
        onClick={() => handleDelete()}
        className="btn-delete !space-x-1"
      >
        <Trash size={16} />
        <span>Delete</span>
      </button>
      {/* Only use ToastContainer in this component */}
      <ToastContainer />
    </div>
  )
}

export default EventTypeDelete
