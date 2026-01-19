# 🧠 MindEase – Plataforma de Acessibilidade Cognitiva (Mobile)

Aplicação **mobile** desenvolvida com **React Native + Expo**, derivada do projeto **MindEase Web**, como evolução multiplataforma da proposta criada no **Hackathon Final da Pós-Graduação FIAP (Front-End)**.

O foco central permanece o mesmo: **Acessibilidade Cognitiva**, com atenção especial a usuários que enfrentam desafios como:

* TDAH
* TEA (Autismo)
* Dislexia
* Burnout e sobrecarga mental
* Ansiedade em interfaces digitais
* Dificuldades de foco, organização e autorregulação

O **MindEase Mobile** não é uma simples adaptação visual da versão web. Ele foi **reprojetado para o contexto mobile**, respeitando limitações, padrões de interação e recursos nativos, mantendo o máximo possível da **lógica de domínio, regras e estados compartilhados**.

---

## 🎯 Objetivo do Projeto

O objetivo do projeto é expandir o MindEase para o ecossistema mobile, garantindo:

* Reuso de lógica e regras de negócio da versão web
* Arquitetura limpa e sustentável (Clean Architecture)
* Experiência mobile previsível, guiada e com baixa carga cognitiva
* Uso consciente de recursos nativos (gestos, notificações, acessibilidade)
* Persistência de preferências por usuário
* Autenticação segura

Além do aspecto técnico, o projeto prioriza **decisões de UX baseadas em neurodiversidade**, adaptadas ao uso em dispositivos móveis.

---

## 📱 Contexto Mobile

Diferente da web, o ambiente mobile apresenta desafios específicos:

* Interação predominantemente por toque e gestos
* Ausência de teclado físico como padrão
* Navegação não baseada em URLs
* Acessibilidade orientada a leitores de tela e gestos

Por isso, o MindEase Mobile foi estruturado para:

* Minimizar decisões simultâneas
* Guiar o usuário por fluxos claros
* Reduzir estímulos visuais desnecessários
* Manter consistência entre telas

---

## ♿ Acessibilidade Cognitiva (Pilar Central)

A aplicação segue princípios práticos de **Cognitive Load Reduction**, aplicados especificamente ao mobile:

* Sessões de foco com tempo controlado e pausas orientadas
* Modo foco para reduzir estímulos visuais
* Alertas cognitivos contextuais e não intrusivos
* Ritmo guiado de uso (evita hiperfoco prolongado)
* Interface progressiva (menos informações por tela)
* Animações opcionais e controladas

### Acessibilidade no React Native

A aplicação utiliza recursos nativos de acessibilidade:

* `accessibilityLabel`
* `accessibilityHint`
* `accessibilityRole`
* Compatibilidade com leitores de tela (TalkBack / VoiceOver)

> ⚠️ Diferente da web, não há dependência de ARIA ou navegação por teclado.

---

## 🧠 Estrutura Funcional e Responsabilidade das Telas

Cada tela possui **responsabilidade única**, evitando sobrecarga cognitiva.

### 🔐 Autenticação

* Login com Google via Firebase Authentication
* Fluxo compatível com Expo (OAuth nativo)
* Criação automática do perfil do usuário no Firestore

### 🧠 Home / Dashboard Cognitivo

* Visão resumida do estado atual do usuário
* Ativação rápida do modo foco
* Acesso direto às sessões de foco e tarefas
* Exibição apenas de informações relevantes no momento

### ⏱️ Sessão de Foco

* Timer adaptável inspirado no Pomodoro
* Opções pré-definidas de foco e pausa
* Pausas obrigatórias para evitar hiperfoco
* Feedback visual e cognitivo claro ao final de ciclos

### 🚨 Alertas Cognitivos

* Intervenções conscientes, não notificações constantes
* Exibidos apenas quando:

  * O tempo de foco ultrapassa limites seguros
  * É necessário iniciar ou encerrar uma pausa
  * O usuário retorna ao app após inatividade

### ✅ Organizador de Tarefas

* Tarefas simples e hierarquizadas
* Subtarefas em checklist
* Redução de decisões simultâneas
* Integração opcional com sessões de foco

### ⚙️ Perfil e Preferências

* Tamanho de fonte
* Espaçamento
* Contraste
* Redução de movimento
* Persistência automática por usuário

---

## 🧱 Arquitetura

O projeto segue **Clean Architecture**, com separação clara entre:

* **Domain**: regras de negócio, lógica de foco, alertas e validações
* **Application**: hooks e contexts compartilhados
* **Infrastructure**: Firebase, storage, autenticação
* **UI (Mobile)**: componentes e telas React Native

A lógica compartilhada foi extraída da versão web sempre que possível, evitando duplicação.

---

## 🚀 Stack Utilizada (Mobile)

### Mobile

* **React Native**
* **Expo**
* **TypeScript**
* **NativeWind** (Tailwind no React Native)
* **React Navigation**
* **Firebase Authentication**
* **Firestore**
* **Zod**

### Animações

* **react-native-reanimated** (uso pontual e opcional)

---

## 🧪 Testes

Os testes no ambiente mobile seguem abordagens específicas:

* Testes de lógica e domínio reutilizados
* Testes de componentes com Testing Library (React Native)
* Testes E2E planejados com Detox (futuro)

O foco principal é validar **comportamento do usuário** e não implementação interna.

---

## 📦 Como Rodar o Projeto

### Pré-requisitos

* **Node.js 22+**
* **Expo CLI**
* **Conta Firebase**
* **Conta Google Cloud** (OAuth)

### Instalação

```bash
git clone https://github.com/Brendhon/MindEase-Mobile.git
cd MindEase-Mobile
npm install
```

### Variáveis de Ambiente

Crie um arquivo `.env` com:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id
```

### Execução

```bash
npx expo start
```

Abra no:

* Expo Go (Android / iOS)
* Emulador Android
* Simulador iOS

---

## 🔁 Relação com o Projeto Web

* O MindEase Mobile reutiliza a lógica central do projeto web
* UI e navegação foram recriadas para mobile
* Acessibilidade foi reinterpretada para leitores de tela e gestos

Projeto Web:
🔗 [https://mind-ease-web.vercel.app](https://mind-ease-web.vercel.app)

---

## 👥 Autor

**Brendhon Moreira**

* LinkedIn: [https://www.linkedin.com/in/brendhon-moreira](https://www.linkedin.com/in/brendhon-moreira)
* Email: [brendhon.e.c.m@gmail.com](mailto:brendhon.e.c.m@gmail.com)
