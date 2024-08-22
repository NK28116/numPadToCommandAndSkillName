# Next のApp router

Next.jsには、AppルーターとPagesルーターの2種類のルーターがあります。Appルーターは、サーバーコンポーネントやストリーミングなど、Reactの最新機能を利用できる新しいルーターです。Pagesルーターは、サーバーレンダリングされたReactアプリケーションをビルドできるNext.jsオリジナルのルーターで、古いNext.jsアプリケーションも引き続きサポートされています。

## App Routerの構成
app
pages
src
public

##

##

## Link
HTMLのaタグ
next/linkからimportしてhrefでっ渡す

```tsx app/page.tsx
import Link from 'next/link'
 
export default function Page() {
  return <Link href="/dashboard">Dashboard</Link>
}
```

### 具体例
- 動的にリンクする
テンプレートリテラルと補完を使用してリンクのリストを作れる
```tsx app/blog/PostList.tsx
import Link from 'next/link'
 
export default function PostList({ posts }) {
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>
          <Link href={`/blog/${post.slug}`}>{post.title}</Link>
        </li>
      ))}
    </ul>
  )
}
```

- linkがアクティブ花道顔チェックできる
usePathname() を使用すると、リンクがアクティブかどうかを判断できます。たとえば、アクティブなリンクにクラスを追加するには、 現在のパス名がリンクの href と一致するかどうかを調べます
'use client'
 
import { usePathname } from 'next/navigation'
import Link from 'next/link'
 
export function Links() {
  const pathname = usePathname()
 
  return (
    <nav>
      <ul>
        <li>
          <Link className={`link ${pathname === '/' ? 'active' : ''}`} href="/">
            Home
          </Link>
        </li>
        <li>
          <Link
            className={`link ${pathname === '/about' ? 'active' : ''}`}
            href="/about"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  )
}

## Loading UI and Streaming

### instant loading