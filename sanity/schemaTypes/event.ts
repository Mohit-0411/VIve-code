import { defineField, defineType } from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title' },
    }),
    defineField({
      name: 'date',
      title: 'Event Date & Time',
      type: 'datetime',
    }),
    defineField({
      name: 'eventType',
      title: 'Event Type',
      type: 'string',
    }),
    defineField({
      name: 'venue',
      title: 'Venue',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'registrationLink',
      title: 'Registration Link',
      type: 'url',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'image',
      title: 'Legacy Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'speakers',
      title: 'Speakers',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'speaker' }] }],
    }),
  ],
})

export default event