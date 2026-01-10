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

