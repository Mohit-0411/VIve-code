import {defineField, defineType} from 'sanity'

export const event = defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' } }),
    defineField({ name: 'eventType', title: 'Event Type', type: 'string' }),
    defineField({ name: 'description', title: 'Description', type: 'text' }),
    defineField({ name: 'date', title: 'Date', type: 'datetime' }),
    defineField({ name: 'venue', title: 'Venue', type: 'string' }),
    defineField({ name: 'registrationLink', title: 'Registration Link', type: 'url' }),
  ],
})