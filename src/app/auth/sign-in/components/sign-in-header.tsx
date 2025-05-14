import Image from 'next/image'
import Link from 'next/link'

export default function SignInHeader() {
  return (
    <section className="mb-3 space-y-3 text-center">
      <div className="flex items-center justify-center gap-3">
        <Link href="/" className="flex flex-wrap items-center justify-center gap-2">
          <Image src="/wt-logo.png" alt="WT-Logo" width={75} height={75} />
          <span className="text-3xl font-bold">Workout Tracker</span>
        </Link>
      </div>
      <article>
        <h1 className="text-3xl font-extrabold">Acessar conta</h1>
        <p>Acesse sua conta para acompanhar seu progresso e gerenciar seus treinos.</p>
      </article>
    </section>
  )
}
