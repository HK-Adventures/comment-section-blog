import post from '../documents/post'
import author from '../documents/author'
import comment from '../documents/comment'
import settings from './settings'

export const schemaTypes = [
  // Singletons
  settings,
  // Documents
  post,
  author,
  comment,
] 