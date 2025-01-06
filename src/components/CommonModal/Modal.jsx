import React from 'react'
import Modal from 'react-modal'
import { Button } from '../ui/Button'


export function CustomModal({ title, children, onSubmit, isOpen, setIsOpen }) {
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await onSubmit()
      setIsOpen(false)
    } catch (error) {
      console.error('Error submitting form:', error)
    }
  }

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => setIsOpen(false)}
      contentLabel={title}
      className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-background border border-border rounded-lg p-6 w-[425px] max-w-full bg-slate-50"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      <form onSubmit={handleSubmit}>
        {children}
        <div className="flex justify-end space-x-2 mt-4">
          <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
            Cancel
          </Button>
          <Button type="submit">Save changes</Button>
        </div>
      </form>
    </Modal>
  )
}
