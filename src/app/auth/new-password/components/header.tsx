import Image from 'next/image'
import Link from 'next/link'

export default function Header() {
  return (
    <section className="mb-3 space-y-2 text-center">
      <div className="flex items-center justify-center gap-3">
        <Link href="/" className="flex flex-wrap items-center justify-center gap-2">
          <Image src="/wt-logo.png" alt="WT-Logo" width={75} height={75} />
          <span className="text-3xl font-bold">Workout Tracker</span>
        </Link>
      </div>
      <h1 className="text-3xl font-extrabold">Alterar a senha</h1>
      <p className="max-w-2xl">
        Atualize a sua senha para garantir a confidencialidade dos dados de sua conta. Seus dados não serão divulgados.
      </p>
    </section>
  )
}
