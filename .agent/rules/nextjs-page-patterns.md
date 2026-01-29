---
trigger: always_on
---

# Padrões de Criação de Páginas Next.js

## Estrutura de Rotas

A aplicação utiliza Next.js App Router com duas categorias principais de rotas:

### 1. Rotas Privadas: `web/app/(private)/`
Rotas que requerem autenticação do usuário.

**Exemplos:**
- `/pet/add` - Cadastro de novo pet
- `/pet/edit/[id]` - Edição de pet existente
- `/pet/mypets` - Listagem dos pets do usuário
- `/user/profile` - Perfil do usuário

### 2. Rotas Públicas: `web/app/(public)/`
Rotas acessíveis sem autenticação.

**Exemplos:**
- `/pet/[id]` - Visualização pública de um pet

---

## Padrões Obrigatórios para Criação de Páginas

### 1. Estrutura de Arquivos

Cada rota deve seguir esta estrutura:

```
web/app/(private|public)/[recurso]/[acao]/
├── page.tsx              # Arquivo principal da página
└── _components/          # Componentes específicos da página
    ├── ComponenteWrapper.tsx
    └── Componente.tsx
```

**Regras:**
- ✅ O arquivo `page.tsx` deve estar sempre na raiz da rota
- ✅ Componentes específicos da página devem ficar em `_components/`
- ✅ O prefixo `_` indica que a pasta não cria uma rota
- ✅ Para rotas dinâmicas, use `[parametro]` (ex: `[id]`)

---

### 2. Estrutura do Arquivo `page.tsx`

Todo arquivo `page.tsx` deve seguir este padrão:

```tsx
import { Metadata } from 'next';
import { Suspense } from 'react'; // Quando necessário

// 1. METADATA (obrigatório)
export const metadata: Metadata = {
  title: 'Adopt a Pet - [Título da Página]',
  description: '[Descrição detalhada da página para SEO]',
};

// 2. IMPORTS DE COMPONENTES COMPARTILHADOS
import Title from '@/src/shared/components/Title';
import Subtitle from '@/src/shared/components/Subtitle';

// 3. IMPORTS DE COMPONENTES ESPECÍFICOS
import ComponenteWrapper from './_components/ComponenteWrapper';

// 4. INTERFACE DE PROPS (se necessário)
interface IPageProps {
  params: Promise<{ id: string }>;
  searchParams?: Promise<{ [key: string]: string | string[] | undefined }>;
}

// 5. COMPONENTE DA PÁGINA
export default async function NomeDaPagina({ params }: IPageProps) {
  // 5.1. Await de params (se for rota dinâmica)
  const { id } = await params;

  // 5.2. Busca de dados (se necessário)
  const { data, ok } = await fetchData({ id });

  // 5.3. Tratamento de erro
  if (!ok) {
    return <p>Mensagem de erro apropriada</p>;
  }

  // 5.4. Renderização
  return (
    <section className="max-w-300 mx-auto"> {/* ou sem max-w se fullwidth */}
      <Title className="text-center mb-2.5">Título Principal</Title>
      <Subtitle className="text-center">
        Subtítulo explicativo
      </Subtitle>

      <div className="mt-8">
        <Suspense fallback={<div>Carregando...</div>}>
          <ComponenteWrapper />
        </Suspense>
      </div>
    </section>
  );
}
```

---

### 3. Regras de Nomenclatura

#### Arquivos e Pastas:
- ✅ `page.tsx` - sempre em minúsculo
- ✅ `_components/` - sempre com underscore
- ✅ `[id]/` - parâmetros dinâmicos entre colchetes
- ✅ Rotas em kebab-case: `/pet/mypets`, `/user/profile`

#### Componentes:
- ✅ PascalCase para nomes de componentes: `AddPetWrapper`, `EditPetWrapper`
- ✅ Sufixo `Wrapper` para componentes que encapsulam lógica de dados
- ✅ Nome do componente deve refletir a ação: `AddPet`, `EditPet`, `MyPets`

#### Funções de Página:
- ✅ PascalCase com sufixo `Page`: `AddPetPage`, `EditPetPage`, `ProfilePage`
- ✅ Exceção: para páginas cliente-side criadas dentro de diretórios compoents ou _components podem usar apenas o nome: `AddPet`

---

### 4. Padrões de Metadata

```tsx
export const metadata: Metadata = {
  title: 'Adopt a Pet - [Título Específico]',
  description: '[Descrição detalhada e específica da funcionalidade da página]',
};
```

**Regras:**
- ✅ Sempre incluir metadata em todas as páginas
- ✅ Title deve começar com "Adopt a Pet - "
- ✅ Description deve ser descritiva e útil para SEO
- ✅ Description deve explicar a funcionalidade da página

---

### 5. Padrões de Layout e Estrutura HTML

#### Container Principal:
```tsx
// Para páginas com largura limitada (maioria dos casos)
<section className="max-w-300 mx-auto">
  {/* conteúdo */}
</section>

// Para páginas full-width
<section>
  {/* conteúdo */}
</section>
```

#### Títulos e Subtítulos:
```tsx
// Centralizado (padrão para formulários e ações)
<Title className="text-center mb-2.5">Título</Title>
<Subtitle className="text-center">Subtítulo</Subtitle>

// Alinhado à esquerda (padrão para listagens)
<Title className="mb-2.5">Título</Title>
<Subtitle>Subtítulo</Subtitle>
```

#### Espaçamento:
- ✅ `mb-2.5` entre Title e Subtitle
- ✅ `mt-8` antes do conteúdo principal
- ✅ Usar classes do Tailwind para consistência

---

### 6. Padrões de Componentes Wrapper

Componentes Wrapper são usados para:
- Buscar dados do servidor
- Gerenciar estado complexo
- Isolar lógica de negócio

```tsx
// _components/AddPetWrapper.tsx
'use client'; // Se precisar de interatividade

import { useEffect, useState } from 'react';
import AddPet from './AddPet';

export default function AddPetWrapper() {
  // Lógica de dados e estado
  
  return <AddPet {...props} />;
}
```

**Quando usar Wrapper:**
- ✅ Quando a página precisa de dados do servidor
- ✅ Quando há lógica complexa de estado
- ✅ Quando precisa separar Server Component de Client Component

---

### 7. Padrões de Suspense

```tsx
import { Suspense } from 'react';

// Sempre envolver componentes que fazem fetch de dados
<Suspense fallback={<div>Carregando...</div>}>
  <ComponenteWrapper />
</Suspense>
```

**Quando usar:**
- ✅ Componentes que fazem fetch de dados
- ✅ Componentes que podem demorar para carregar
- ✅ Melhorar UX com loading states

---

### 8. Padrões de Rotas Dinâmicas

```tsx
// Estrutura de pasta
web/app/(public)/pet/[id]/page.tsx

// Interface de props
interface IPetPage {
  params: Promise<{ id: string }>;
}

// Uso no componente
export default async function PetPage({ params }: IPetPage) {
  const { id } = await params;
  
  // Usar o id para buscar dados
  const { data, ok } = await petGet({ id });
  
  if (!ok) {
    return <p>Erro ao carregar dados</p>;
  }
  
  return <div>{/* renderização */}</div>;
}
```

---

### 9. Padrões de Tratamento de Erros

```tsx
// Sempre validar resposta de APIs
const { data, ok } = await fetchData();

if (!ok) {
  return (
    <p>
      Mensagem de erro clara e amigável para o usuário
    </p>
  );
}

// Continuar com renderização normal
return <div>{/* conteúdo */}</div>;
```

---

### 10. Padrões de Imports

Ordem de imports:

```tsx
// 1. Imports do Next.js e React
import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';

// 2. Metadata export (se aplicável)
export const metadata: Metadata = { ... };

// 3. Actions e funções do servidor
import petGet from '@/app/actions/pet-get';

// 4. Componentes compartilhados
import Title from '@/src/shared/components/Title';
import Subtitle from '@/src/shared/components/Subtitle';

// 5. Componentes locais
import ComponenteWrapper from './_components/ComponenteWrapper';
```

---

## Checklist para Criar uma Nova Página

- [ ] Criar pasta na estrutura correta: `(private)` ou `(public)`
- [ ] Criar arquivo `page.tsx`
- [ ] Adicionar metadata com title e description
- [ ] Importar componentes necessários na ordem correta
- [ ] Criar interface de props (se necessário)
- [ ] Implementar função da página com nome apropriado
- [ ] Adicionar tratamento de erros (se houver fetch de dados)
- [ ] Usar estrutura HTML semântica com `<section>`
- [ ] Adicionar Title e Subtitle apropriados
- [ ] Envolver componentes assíncronos em `<Suspense>`
- [ ] Criar pasta `_components/` se necessário
- [ ] Criar componentes Wrapper se necessário
- [ ] Testar a rota no navegador

---

## Exemplos de Referência

### Página Simples (Formulário)
Referência: `web/app/(private)/pet/add/page.tsx`

### Página com Parâmetro Dinâmico
Referência: `web/app/(public)/pet/[id]/page.tsx`

### Página com Listagem
Referência: `web/app/(private)/pet/mypets/page.tsx`

### Página com Edição
Referência: `web/app/(private)/pet/edit/[id]/page.tsx`

---

## Observações Importantes

1. **Server Components por padrão**: Todas as páginas são Server Components, a menos que você adicione `'use client'`
2. **Params são Promises**: No Next.js 15+, params e searchParams são Promises e devem ser awaited
3. **Consistência visual**: Sempre usar os componentes compartilhados (Title, Subtitle) para manter consistência
4. **SEO**: Metadata é obrigatória em todas as páginas
5. **Acessibilidade**: Usar HTML semântico e estrutura apropriada de headings
