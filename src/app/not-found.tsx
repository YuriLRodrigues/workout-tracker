'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

import { Button } from '@/components/ui/button'

import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import { Dumbbell, Home, RotateCcw } from 'lucide-react'

export default function NotFound() {
  const [count, setCount] = useState(0)
  const [showMessage, setShowMessage] = useState(false)
  const router = useRouter()

  const messages = [
    'Bom começo! Continue...',
    'Você está indo bem!',
    'Quase lá, não desista!',
    'Uau! Você é persistente!',
    'Impressionante! Você encontrou o caminho de volta!',
  ]

  useEffect(() => {
    if (count >= 10) {
      setShowMessage(true)
    }
  }, [count])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="mx-auto w-full max-w-3xl text-center">
        <div className="mb-6 flex justify-center">
          <div className={cn('inline-flex rounded-full p-3', count >= 10 ? 'bg-green-600' : 'bg-red-500')}>
            <Dumbbell className="h-10 w-10" />
          </div>
          <h1 className="sr-only">Workout Tracker</h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8"
        >
          <h2 className="mb-4 text-4xl font-bold md:text-6xl">Página não encontrada</h2>
          <p className="mb-6 text-xl text-gray-300">Parece que você se perdeu durante seu treino!</p>
        </motion.div>

        <div className="mb-12 py-8">
          <div className="mb-4 text-center">
            <p className="mb-2 text-lg">Faça alguns exercícios para encontrar o caminho de volta:</p>
            <div className={cn('mb-2 text-5xl font-bold', count >= 10 ? 'text-green-600' : 'text-red-500')}>
              {count}
            </div>
            <p className="text-sm text-gray-400">Cliques no haltere</p>
          </div>

          <motion.div className="my-6 flex justify-center" whileHover={{ scale: 1.05 }}>
            <button
              onClick={() => setCount((prev) => prev + 1)}
              className="cursor-pointer border-0 bg-transparent focus:outline-none"
              aria-label="Fazer exercício"
            >
              <motion.div
                animate={{
                  rotate: count % 2 === 0 ? -15 : 15,
                  scale: count % 3 === 0 ? 1.1 : 1,
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <Dumbbell
                  className={cn(
                    'h-24 w-24 transition-colors duration-300',
                    count >= 10 ? 'text-green-600' : 'text-red-500',
                  )}
                />
              </motion.div>
            </button>
          </motion.div>

          {count > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center text-lg font-medium">
              {messages[Math.min(Math.floor(count / 2), messages.length - 1)]}
            </motion.div>
          )}
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <Button
            variant="default"
            size="lg"
            className={cn(
              'w-full text-white sm:w-auto',
              count >= 10 ? 'bg-green-600 hover:bg-green-600' : 'bg-red-500 hover:bg-red-600',
            )}
            asChild
          >
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Voltar para o início
            </Link>
          </Button>

          <Button
            variant="outline"
            size="lg"
            onClick={() => router.back()}
            className={cn(
              'w-full sm:w-auto',
              count >= 10
                ? 'border-green-600 text-green-600 transition-colors duration-300 hover:bg-green-600/10'
                : 'border-red-500 text-red-500 transition-colors duration-300 hover:bg-red-500/10',
            )}
          >
            <RotateCcw className="mr-2 h-4 w-4" />
            Voltar para página anterior
          </Button>
        </div>

        {showMessage && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-8 rounded-lg bg-green-600 p-4"
          >
            <p className="text-lg font-medium">
              Parabéns! Sua persistência é impressionante. É exatamente essa atitude que faz você progredir nos treinos!
            </p>
          </motion.div>
        )}
      </div>

      <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden opacity-10">
        <div className="flex justify-between">
          {[1, 2, 3, 4, 5].map((i) => (
            <motion.div
              key={i}
              initial={{ y: 100 }}
              animate={{
                y: [100, 80, 100],
                transition: {
                  repeat: Number.POSITIVE_INFINITY,
                  duration: 2 + i * 0.5,
                  ease: 'easeInOut',
                },
              }}
              className="h-24 w-24 md:h-32 md:w-32"
            >
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path
                  d="M50,10 C70,10 85,25 85,45 C85,65 70,80 50,80 C30,80 15,65 15,45 C15,25 30,10 50,10 Z M30,45 L70,45 M30,35 L70,35 M30,55 L70,55"
                  strokeWidth="8"
                  stroke="currentColor"
                  fill="none"
                />
              </svg>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
