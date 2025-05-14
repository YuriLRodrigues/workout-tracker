import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

import { BarChart3, LineChart, PieChart } from 'lucide-react'

export default function EstatisticasPage() {
  return (
    <div className="container mx-auto space-y-8 py-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Estatísticas</h1>
        <p className="text-muted-foreground">Acompanhe sua evolução e desempenho</p>
      </div>

      <Tabs defaultValue="evolucao">
        <TabsList>
          <TabsTrigger value="evolucao">Evolução</TabsTrigger>
          <TabsTrigger value="carga">Carga</TabsTrigger>
          <TabsTrigger value="frequencia">Frequência</TabsTrigger>
        </TabsList>
        <TabsContent value="evolucao" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Evolução de Carga</CardTitle>
                    <CardDescription>Progresso dos últimos 3 meses</CardDescription>
                  </div>
                  <LineChart className="text-muted-foreground h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex h-[300px] items-end gap-2">
                  {Array.from({ length: 12 }).map((_, i) => {
                    const height = 40 + Math.random() * 220
                    return <div key={i} className="bg-primary/80 w-full rounded-t" style={{ height: `${height}px` }} />
                  })}
                </div>
                <div className="text-muted-foreground mt-2 flex justify-between text-sm">
                  <div>Jan</div>
                  <div>Fev</div>
                  <div>Mar</div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Distribuição de Treinos</CardTitle>
                    <CardDescription>Por tipo de treino</CardDescription>
                  </div>
                  <PieChart className="text-muted-foreground h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent className="flex justify-center">
                <div className="relative h-[300px] w-[300px]">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="border-primary/30 h-[200px] w-[200px] rounded-full border-8">
                      <div className="border-t-primary border-r-primary border-b-primary/70 border-l-primary/50 h-full w-full rotate-45 rounded-full border-8" />
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">42</div>
                      <div className="text-muted-foreground text-sm">Total de Treinos</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="md:col-span-2">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Evolução por Exercício</CardTitle>
                    <CardDescription>Progresso dos principais exercícios</CardDescription>
                  </div>
                  <BarChart3 className="text-muted-foreground h-4 w-4" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="font-medium">Supino Reto</div>
                      <div className="text-muted-foreground text-sm">+10kg (13.3%)</div>
                    </div>
                    <div className="bg-primary/20 h-2 w-full overflow-hidden rounded-full">
                      <div className="bg-primary h-full" style={{ width: '75%' }} />
                    </div>
                    <div className="text-muted-foreground flex justify-between text-xs">
                      <div>75kg</div>
                      <div>85kg</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="font-medium">Agachamento</div>
                      <div className="text-muted-foreground text-sm">+15kg (15.8%)</div>
                    </div>
                    <div className="bg-primary/20 h-2 w-full overflow-hidden rounded-full">
                      <div className="bg-primary h-full" style={{ width: '80%' }} />
                    </div>
                    <div className="text-muted-foreground flex justify-between text-xs">
                      <div>95kg</div>
                      <div>110kg</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="font-medium">Levantamento Terra</div>
                      <div className="text-muted-foreground text-sm">+20kg (16.7%)</div>
                    </div>
                    <div className="bg-primary/20 h-2 w-full overflow-hidden rounded-full">
                      <div className="bg-primary h-full" style={{ width: '85%' }} />
                    </div>
                    <div className="text-muted-foreground flex justify-between text-xs">
                      <div>120kg</div>
                      <div>140kg</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <div className="font-medium">Puxada Frontal</div>
                      <div className="text-muted-foreground text-sm">+8kg (11.4%)</div>
                    </div>
                    <div className="bg-primary/20 h-2 w-full overflow-hidden rounded-full">
                      <div className="bg-primary h-full" style={{ width: '70%' }} />
                    </div>
                    <div className="text-muted-foreground flex justify-between text-xs">
                      <div>70kg</div>
                      <div>78kg</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="carga" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Distribuição de Carga</CardTitle>
              <CardDescription>Carga total por grupo muscular</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex h-[400px] items-end justify-center gap-6">
                {[
                  { nome: 'Peito', valor: 85, porcentagem: '22%' },
                  { nome: 'Costas', valor: 78, porcentagem: '20%' },
                  { nome: 'Pernas', valor: 110, porcentagem: '28%' },
                  { nome: 'Ombros', valor: 65, porcentagem: '17%' },
                  { nome: 'Braços', valor: 50, porcentagem: '13%' },
                ].map((grupo, i) => {
                  const height = (grupo.valor / 110) * 300
                  return (
                    <div key={i} className="flex flex-col items-center gap-2">
                      <div className="text-sm font-medium">{grupo.porcentagem}</div>
                      <div className="bg-primary/80 w-16 rounded-t" style={{ height: `${height}px` }} />
                      <div className="text-sm font-medium">{grupo.nome}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="frequencia" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Frequência de Treinos</CardTitle>
              <CardDescription>Últimos 30 dias</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-7 gap-2">
                {Array.from({ length: 30 }).map((_, i) => {
                  const intensity = Math.random()
                  let bgClass = 'bg-muted'

                  if (intensity > 0.7) bgClass = 'bg-primary'
                  else if (intensity > 0.4) bgClass = 'bg-primary/60'
                  else if (intensity > 0.1) bgClass = 'bg-primary/30'

                  return <div key={i} className={`${bgClass} h-8 w-8 rounded-sm`} title={`Dia ${i + 1}`} />
                })}
              </div>
              <div className="mt-4 flex justify-end gap-3">
                <div className="flex items-center gap-1">
                  <div className="bg-muted h-4 w-4 rounded-sm" />
                  <span className="text-muted-foreground text-xs">Nenhum</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-primary/30 h-4 w-4 rounded-sm" />
                  <span className="text-muted-foreground text-xs">Leve</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-primary/60 h-4 w-4 rounded-sm" />
                  <span className="text-muted-foreground text-xs">Moderado</span>
                </div>
                <div className="flex items-center gap-1">
                  <div className="bg-primary h-4 w-4 rounded-sm" />
                  <span className="text-muted-foreground text-xs">Intenso</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
