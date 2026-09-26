# Adopt a Pet

Plataforma de adoção de pets: usuários cadastram animais disponíveis para adoção, outros usuários navegam pelo feed, agendam uma visita e combinam a adoção diretamente com o tutor do pet.

- [Funcionalidades](#funcionalidades)
- [Link do Projeto](#link)
- [Screenshot GIF](#screenshot-gif)
- [Stack](#stack)
- [Arquitetura](#arquitetura)
- [Melhorias futuras](#melhorias-futuras)

## Funcionalidades

- **Feed público de pets** — qualquer visitante navega pela lista de pets disponíveis para adoção, com scroll infinito
- **Página de detalhes do pet** — galeria de imagens, informações (idade, peso, raça, sexo, status de castração, localização) e dados do tutor
- **Autenticação** com cadastro e login, sessão via JWT
- **Cadastro de pets**
  - Criação, edição e remoção de pets pelo próprio tutor
  - Upload de múltiplas imagens direto para o Cloudinary (assinatura de upload gerada pelo servidor)
- **Agendamento de adoção**
  - Usuário interessado agenda uma visita para conhecer o pet
  - Tutor recebe o contato do interessado e pode concluir a adoção, marcando o pet como indisponível
- **Painel do usuário**
  - "Meus Pets": pets cadastrados pelo próprio usuário
  - "Minhas Adoções": pets para os quais o usuário agendou visita
  - Edição de perfil (dados pessoais e foto)
- **SEO** com `sitemap.ts` e `robots.ts` gerados dinamicamente

## Link
https://petshop-web-five.vercel.app/

## Screenshot GIF
#### Feed - Sem estar numa conta
![feed](https://github.com/user-attachments/assets/d03cb1de-af67-475e-bda0-c913790bd0f3)
#### Criação de conta
![registro](https://github.com/user-attachments/assets/236ba220-e77f-445f-b702-5625b15a15e1)
#### Entrar na conta
![login](https://github.com/user-attachments/assets/58bcc151-6501-460a-8b0c-869f4f6422b7)
#### Perfil
![perfil](https://github.com/user-attachments/assets/3f4f6547-51ca-4eeb-8b61-a0f167171e8c)
#### Criação de pet
![meus pets](https://github.com/user-attachments/assets/48710732-b1e1-42c5-b2ba-67b60ad61b79)
#### Adoção de pet
![adoção](https://github.com/user-attachments/assets/f3403d9a-60f3-443a-b57a-5e325e2edce5)
#### Conclusão da adoção
![conclusão da adoção](https://github.com/user-attachments/assets/fa9507a1-9fd0-4340-80c3-ffdcebdcdb99)

## Stack

| Camada | Tecnologias |
|---|---|
| Frontend | Next.js 16, React 19, TypeScript, Tailwind CSS 4, React Query, React Hook Form, Base UI |
| Backend | Node.js, Express 5, Mongoose (MongoDB), JWT, bcryptjs, Cloudinary |
| Validação | Zod, compartilhado entre as camadas de rotas/controllers |
| Qualidade | Jest + Testing Library (client), ESLint |
| Infra | Monorepo com npm workspaces, Docker Compose, deploy na Vercel |

## Arquitetura

Monorepo dividido em `server/` e `web/`:

```
server/       # API REST em Express
  src/
    routes → controllers → services   # camadas da API
    models/                           # schemas Mongoose
    middleware/                       # autenticação e tratamento de erros
web/          # Next.js (App Router)
  app/
    (public)/   # feed e detalhes do pet, acessíveis sem login
    (private)/  # cadastro/edição de pets, meus pets, minhas adoções, perfil
    actions/    # server actions que consomem a API
  src/        # componentes compartilhados, hooks, contextos e schemas
```

O upload de imagens é feito diretamente do client para o Cloudinary: o servidor apenas gera uma assinatura autenticada (`/api/images/generate-signature/:folder`), evitando que os arquivos passem pela API.

## Melhorias futuras
- Filtros de busca no feed (por localização, raça, idade, etc.)
- Notificações em tempo real para o tutor quando alguém agenda uma visita
- Chat entre tutor e interessado dentro da própria plataforma
