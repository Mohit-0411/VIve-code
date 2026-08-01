'use server';

import { redis } from '@/lib/redis';
import { revalidatePath } from 'next/cache';

export async function toggleLike(postId: string, userId: string) {
  const likedKey = `post:${postId}:liked_by:${userId}`;
  const countKey = `post:${postId}:likes`;

  const hasLiked = await redis.get(likedKey);

  if (hasLiked) {
    // User already liked it, so unlike
    await redis.del(likedKey);
    await redis.decr(countKey);
  } else {
    // Add like
    await redis.set(likedKey, '1');
    await redis.incr(countKey);
  }

  revalidatePath(`/forum/${postId}`);
}

export async function addComment(postId: string, userId: string, userName: string, text: string) {
  const commentsKey = `post:${postId}:comments`;
  
  const comment = {
    id: Math.random().toString(36).substring(2, 9),
    userId,
    userName,
    text,
    createdAt: new Date().toISOString(),
  };

  // Push to a Redis List
  await redis.rpush(commentsKey, JSON.stringify(comment));

  revalidatePath(`/forum/${postId}`);
}

export async function getComments(postId: string) {
  const commentsKey = `post:${postId}:comments`;
  const rawComments = await redis.lrange(commentsKey, 0, -1);
  
  return rawComments.map((c) => (typeof c === 'string' ? JSON.parse(c) : c));
}

export async function getLikesCount(postId: string) {
  const countKey = `post:${postId}:likes`;
  const count = await redis.get<number | string>(countKey);

  if (!count) return 0;
  return typeof count === 'number' ? count : parseInt(String(count), 10);
}