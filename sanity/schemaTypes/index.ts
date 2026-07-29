import { contact } from './contact'
import { event } from './event'
import forumPost from './forumPost'
import speaker from './speaker'

export const schemaTypes = [event, speaker, forumPost, contact]

export const schema = {
  types: schemaTypes,
}