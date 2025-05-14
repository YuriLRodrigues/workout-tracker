import Image from 'next/image'
import Link from 'next/link'

export default function SignUpHeader() {
  return (
    <section className="mb-3 space-y-3 text-center">
      <div className="flex items-center justify-center gap-3">
        <Link href="/" className="flex flex-wrap items-center justify-center gap-2">
          <Image src="/wt-logo.png" alt="WT-Logo" width={75} height={75} />
          <span className="text-3xl font-bold">Workout Tracker</span>
        </Link>
      </div>
      <article>
        <h1 className="text-3xl font-extrabold">Crie sua conta</h1>
        <p>Crie a sua conta para começar a acompanhar seus treinos e evoluções.</p>
      </article>
    </section>
  )
}
