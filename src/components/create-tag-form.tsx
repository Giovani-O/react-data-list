import { Check, X } from 'lucide-react'
import { Button } from './ui/button'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as Dialog from '@radix-ui/react-dialog'

const createTagSchema = z.object({
  title: z.string().min(3, { message: 'Name must have at least 3 characters' }),
  slug: z.string(),
})

type CreateTagSchema = z.infer<typeof createTagSchema>

function getSlugFromString(input: string): string {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^\w\s]/g, '')
    .replace(/\s+/g, '-')
}

export function CreateTagForm() {
  const { register, handleSubmit, watch } = useForm<CreateTagSchema>({
    resolver: zodResolver(createTagSchema),
  })

  async function createTag({ title, slug }: CreateTagSchema) {
    console.log(title, slug)

    await fetch('http://localhost:4444/tags', {
      method: 'POST',
      body: JSON.stringify({
        title,
        slug,
      }),
    })
  }

  const slug = watch('title') ? getSlugFromString(watch('title')) : ''

  return (
    <form onSubmit={handleSubmit(createTag)} className="w-full space-y-6">
      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="name">
          Tag name
        </label>
        <input
          {...register('title')}
          id="name"
          type="text"
          className="border border-zinc-800 rounded-lg px-3 py-2.5 w-full bg-zinc-800/50 text-sm"
        />
      </div>

      <div className="space-y-2">
        <label className="text-sm font-medium block" htmlFor="slug">
          Slug
        </label>
        <input
          {...register('slug')}
          id="slug"
          type="text"
          readOnly
          value={slug}
          className="border border-zinc-800 rounded-lg px-3 py-2.5 w-full bg-zinc-800/50 text-sm"
        />
      </div>

      <div className="flex items-center justify-end gap-2">
        <Dialog.Close asChild>
          <Button>
            <X className="size-3" strokeWidth={4} />
            Cancel
          </Button>
        </Dialog.Close>
        <Button type="submit" className="bg-teal-400 text-teal-950">
          <Check className="size-3" strokeWidth={4} />
          Save
        </Button>
      </div>
    </form>
  )
}
