# 💪 Workout Tracker - Plataforma de Gestão de Treinos Pessoais (Frontend)

O **Workout Tracker (Frontend)** é a interface web da plataforma de treinos, desenvolvida com **Next.js 15 + React 19**, voltada à **experiência do usuário final**, seja um aluno, personal trainer ou administrador.

A aplicação permite **criar, editar, visualizar e registrar treinos**, acompanhar métricas de desempenho, editar perfil, interagir com dashboards inteligentes, fazer upload de imagens e muito mais.

Construída com **Server & Client Components**, **Cookies de autenticação**, **Tailwind CSS**, **React Query**, **T3-OSS**, e uma arquitetura limpa, a aplicação é **escalável, acessível, performática e responsiva**.

---

## 🚀 Funcionalidades Atuais

- 🧑‍💻 Login e cadastro com JWT via cookies
- ⚙️ Dashboard inteligente com KPIs e estatísticas de treino
- 🏋️ Visualização e execução de treinos e exercícios
- 📝 Criação e registro de logs de exercícios
- 📈 Gráficos com progresso semanal/mensal
- 👤 Perfil com avatar, dados físicos e informações pessoais
- 🖼️ Upload de imagem de perfil via MinIO
- 🧭 Navegação responsiva e fluida
- 🔁 Gerenciamento de cache e requisições com React Query
- 🧪 Testes automatizados com Jest e Cypress

---

## 🛠️ Tecnologias Utilizadas

| Tecnologia                                                                                                                                                                                                        | Descrição                                                       |
| ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| ![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)                                                                                                        | **Next.js 15** — Framework React com renderização híbrida       |
| ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)                                                                                                               | **React 19** — Biblioteca base para criação de interfaces       |
| ![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)                                                                                                 | **TypeScript** — Tipagem estática e robustez                    |
| ![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)                                                                                            | **Tailwind CSS** — Estilização utilitária e responsiva          |
| ![Shadcn/UI](https://img.shields.io/badge/shadcn/ui-18181B?style=for-the-badge)                                                                                                                                   | **shadcn/ui** — Design System baseado em Tailwind               |
| ![Radix UI](https://img.shields.io/badge/Radix_UI-EF4444?style=for-the-badge)                                                                                                                                     | **Radix UI** — Componentes acessíveis e customizáveis           |
| ![Lucide](https://img.shields.io/badge/lucide--icons-000000?style=for-the-badge)                                                                                                                                  | **Lucide Icons** — Ícones modernos e personalizáveis            |
| ![React Hook Form](https://img.shields.io/badge/React--Hook--Form-EC5990?style=for-the-badge)                                                                                                                     | **React Hook Form** — Manipulação de formulários                |
| ![Zod](https://img.shields.io/badge/zod-3A1C78?style=for-the-badge)                                                                                                                                               | **Zod** — Validação de schemas                                  |
| ![React Query](https://img.shields.io/badge/React_Query-FF4154?style=for-the-badge&logo=reactquery&logoColor=white)                                                                                               | **React Query** — Gerenciamento de dados assíncronos            |
| ![T3-OSS](https://img.shields.io/badge/T3--OSS-1F2937?style=for-the-badge)                                                                                                                                        | **T3 Stack** — Padrão de estrutura moderna para apps TypeScript |
| ![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)                                                                                                                   | **Jest** — Testes unitários                                     |
| ![date-fns](https://img.shields.io/badge/date--fns-008080?style=for-the-badge)                                                                                                                                    | **date-fns** — Manipulação de datas                             |
| ![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=for-the-badge&logo=eslint&logoColor=white) ![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=prettier&logoColor=black) | **ESLint + Prettier** — Qualidade e formatação de código        |
| ![pnpm](https://img.shields.io/badge/pnpm-F69220?style=for-the-badge&logo=pnpm&logoColor=black)                                                                                                                   | **pnpm** — Gerenciador de pacotes                               |

---

## 📁 Estrutura de Pastas

```bash
src/
├── app/
│   ├── (home)/
│   ├── auth/
│   │   ├── components/
│   │   ├── forgot-password/
│   │   ├── new-password/
│   │   ├── sign-in/
│   │   ├── sign-up/
│   │   └── layout.tsx
│   ├── dashboard/
│   │   ├── components/
│   │   ├── history/
│   │   ├── settings/
│   │   ├── stats/
│   │   ├── workouts/
│   │   ├── layout.tsx
│   │   └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── not-found.tsx
├── auth/
├── components/
├── context/
├── hooks/
├── http/
├── lib/
├── providers/
├── utils/
├── env.mjs
└── middleware.ts
```

## 📦 Instalação

```bash
pnpm install
pnpm generate # geração das chamadas de acordo com o swagger da API configurada no arquivo kubb.config.ts
```

## 🛠️ Desenvolvimento

```bash
pnpm dev
```

## 🚨 Produção

```bash
pnpm build
pnpm start
```

## 🔑 Variáveis de Ambiente

Crie um arquivo .env.local com:

```bash
NEXT_PUBLIC_API_URL=""
```

## 🔮 Funcionalidades Futuras

- 🎨 Personalização de cores e temas

- 🔔 Notificações in-app

- 📲 Versão mobile/PWA com push notifications

- 📆 Calendário de treinos

- 🧠 Recomendações de treino via IA

- 👥 Relacionamento com outros usuários (personal, amigos)

- 💳 Gestão de planos e pagamentos (Stripe)

## 📬 Contato

- **Autor**: 👨‍💻 [YuriLRodrigues](https://github.com/YuriLRodrigues)
- **LinkedIn**: [Yuri Leite Rodrigues](https://www.linkedin.com/in/yuri-leite-rodrigues)
