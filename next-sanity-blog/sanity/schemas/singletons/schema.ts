import { type SchemaTypeDefinition } from 'sanity'
import post from '../documents/post'
import author from '../documents/author'
import comment from '../documents/comment'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    post,
    author,
    comment,
  ],
} 