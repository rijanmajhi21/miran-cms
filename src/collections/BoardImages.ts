import type { CollectionConfig } from 'payload'

export const BoardImages: CollectionConfig = {
  slug: 'board-images',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['image', 'title', 'board', 'featured', 'order', 'updatedAt'],
    description: 'Images within boards - like pins on Pinterest',
    group: 'Gallery',
  },
  access: {
    read: () => true,
    create: ({ req: { user } }) => Boolean(user),
    update: ({ req: { user } }) => Boolean(user),
    delete: ({ req: { user } }) => Boolean(user),
  },
  hooks: {
    beforeChange: [
      async ({ data, operation, req }) => {
        // Auto-increment order for new images
        if (operation === 'create' && data?.board) {
          const boardId = typeof data.board === 'object' ? data.board.id : data.board

          // Find the highest order in this board
          const existing = await req.payload.find({
            collection: 'board-images',
            where: { board: { equals: boardId } },
            sort: '-order',
            limit: 1,
          })

          const highestOrder = existing.docs[0]?.order ?? -1
          data.order = highestOrder + 1
        }
        return data
      },
    ],
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      admin: {
        description: 'Optional title for this image',
      },
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
      required: true,
    },
    {
      name: 'board',
      type: 'relationship',
      relationTo: 'boards',
      required: true,
      hasMany: false,
      admin: {
        description: 'Which board does this image belong to?',
      },
    },
    {
      name: 'description',
      type: 'textarea',
      admin: {
        description: 'Optional description or story behind this image',
      },
    },
    {
      name: 'location',
      type: 'text',
      admin: {
        description: 'Where was this photo taken?',
      },
    },
    {
      name: 'dateTaken',
      type: 'date',
      admin: {
        description: 'When was this photo taken?',
        date: {
          pickerAppearance: 'dayOnly',
          displayFormat: 'MMM d, yyyy',
        },
      },
    },
    {
      name: 'camera',
      type: 'text',
      admin: {
        description: 'Camera/device used (e.g., "Sony A7III")',
      },
    },
    {
      name: 'order',
      type: 'number',
      defaultValue: 0,
      admin: {
        description: 'Display order within the board (lower numbers appear first)',
        position: 'sidebar',
      },
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description: 'Feature this image prominently',
        position: 'sidebar',
      },
    },
  ],
}
