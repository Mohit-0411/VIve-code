export default {
  name: 'forumPost',
  title: 'Forum Post',
  type: 'document',
  fields: [
    { name: 'title', title: 'Title', type: 'string' },
    { name: 'author', title: 'Author Name', type: 'string' },
    {
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Poetry', value: 'Poetry' },
          { title: 'Story', value: 'Story' },
        ],
      },
    },
    { name: 'content', title: 'Content', type: 'text' },
    { name: 'createdAt', title: 'Created At', type: 'datetime' },
  ],
}