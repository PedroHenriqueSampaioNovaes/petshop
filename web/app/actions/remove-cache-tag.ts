'use server';

import { updateTag } from 'next/cache';

import { cacheTagByUserId } from '@/src/common/utils/cacheTagByUserId';

export default async function removeCacheTag(
  tagName: string,
  withUserId = false,
) {
  let tag = tagName;
  if (withUserId) tag = await cacheTagByUserId(tagName);

  if (tag) updateTag(tag);
}
