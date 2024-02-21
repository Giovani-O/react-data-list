import { Check, X } from 'lucide-react'
import { Button } from './ui/button'

export function CreateTagForm() {
  return (
    <form className="w-full space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="name">
          Tag name
        </label>
        <input
          id="name"
          type="text"
          className="border border-zinc-800 rounded-lg px-3 py-2 w-full bg-zinc-800/50"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="slug">
          Slug
        </label>
        <input
          id="slug"
          type="text"
          readOnly
          className="border border-zinc-800 rounded-lg px-3 py-2 w-full bg-zinc-800/50"
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Button type="button">
          <X className="size-3" strokeWidth={4} />
          Cancel
        </Button>
        <Button type="submit" className="bg-teal-400 text-teal-950">
          <Check className="size-3" strokeWidth={4} />
          Save
        </Button>
      </div>
    </form>
  )
}
