import DataLoader from 'dataloader'
import db from '../db/connection'
import User from '../entities/User'

export const dataloaders = {
  userDataloader: new DataLoader<number, User, unknown>(async (ids) => {
    const users = await db('users').whereIn('id', ids)

    return ids.map((id) => users.find((u) => u.id === id))
  }),
  // Get the likesCount for each tweet
  likesCountDataloader: new DataLoader<number, any, unknown>(async (ids) => {
    const counts = await db('likes')
      .whereIn('tweet_id', ids)
      .count('tweet_id', { as: 'likesCount' })
      .select('tweet_id')
      .groupBy('tweet_id')

    return ids.map((id) => counts.find((c) => c.tweet_id === id))
  }),
}