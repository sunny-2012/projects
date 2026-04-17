import { getCollection } from "@/lib/content";
import { NextResponse } from "next/server";

export async function GET() {
  const blogPosts = await getCollection("posts", "en"); // Default to English posts for RSS
  
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://magesticwork.co";

  const items = blogPosts.map((post) => `
    <item>
      <title><![CDATA[${post.data.title}]]></title>
      <link>${siteUrl}/blog/${post.slug}</link>
      <description><![CDATA[${post.data.description}]]></description>
      <pubDate>${new Date(post.data.pubDate).toUTCString()}</pubDate>
      <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
    </item>
  `).join("");

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0" xmlns:atom="http://www.w3.org/2000/svg">
      <channel>
        <title>Magestic Work's Blog</title>
        <link>${siteUrl}/blog</link>
        <description>A humble Astronaut's guide to the stars</description>
        <atom:link href="${siteUrl}/rss.xml" rel="self" type="application/rss+xml" />
        ${items}
      </channel>
    </rss>`;

  return new NextResponse(rss, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
