/**
 * 统计数据相关钩子函数
 * @module hooks/use-site-stats
 */

"use client";

import { useBlogPosts } from "@/features/blog/hooks";
import type { SiteStats } from "@/features/home/types";
import { useMemo } from "react";

/**
 * 获取网站统计数据
 * @returns 网站各模块的统计数据
 */
export function useSiteStats(): SiteStats & { refresh: () => void } {
  // 禁用缓存，确保每次都从服务器获取最新数据
  const {
    posts: blogPosts,
    loading: blogLoading,
    error: blogError,
    refresh: refreshBlog,
  } = useBlogPosts();

  const stats = useMemo(() => {
    // 博客数量
    const blogCount = blogPosts?.length || 0;

    // 文档数量 - 设置为0，因为文档模块已被移除
    const docCount = 0;

    // 友链数量 - 从友链功能获取
    const friendCount = 0; // TODO: 从友链功能获取实际数量

    return {
      blogCount,
      docCount,
      friendCount,
    };
  }, [blogPosts]);

  const loading = blogLoading;
  const error = blogError?.message ?? null;

  return {
    ...stats,
    loading,
    error,
    refresh: () => {
      refreshBlog();
    },
  };
}
