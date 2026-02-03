# 🧠 MindEase – Plataforma de Acessibilidade Cognitiva (Mobile)

> Aplicação **mobile** do projeto **MindEase**, desenvolvida com React Native + Expo para oferecer uma experiência de acessibilidade cognitiva adaptada a dispositivos móveis.

Este projeto é a evolução multiplataforma da [aplicação web](https://github.com/Brendhon/MindEase), focada em usuários com TDAH, TEA, Dislexia, Burnout e outras neurodivergências que impactam a interação com interfaces digitais.

---

## 📜 Sumário

- [🧠 MindEase – Plataforma de Acessibilidade Cognitiva (Mobile)](#-mindease--plataforma-de-acessibilidade-cognitiva-mobile)
  - [📜 Sumário](#-sumário)
  - [🎯 Sobre o Projeto](#-sobre-o-projeto)
  - [✨ Funcionalidades Principais](#-funcionalidades-principais)
    - [🔐 Autenticação Segura](#-autenticação-segura)
    - [🧠 Dashboard Cognitivo](#-dashboard-cognitivo)
    - [⏱️ Sessão de Foco](#️-sessão-de-foco)
    - [🚨 Alertas Cognitivos](#-alertas-cognitivos)
    - [✅ Organizador de Tarefas](#-organizador-de-tarefas)
    - [⚙️ Perfil e Preferências](#️-perfil-e-preferências)
  - [♿ Acessibilidade Cognitiva: O Pilar Central](#-acessibilidade-cognitiva-o-pilar-central)
  - [🧱 Arquitetura e Stack](#-arquitetura-e-stack)
    - [Arquitetura](#arquitetura)
    - [Stack Tecnológica](#stack-tecnológica)
  - [🚀 Como Rodar o Projeto](#-como-rodar-o-projeto)
    - [Pré-requisitos](#pré-requisitos)
    - [1. Instalação](#1-instalação)
    - [2. Configuração do Firebase](#2-configuração-do-firebase)
    - [3. Variáveis de Ambiente](#3-variáveis-de-ambiente)
    - [4. Build e Execução](#4-build-e-execução)
      - [Troubleshooting: Android SDK não encontrado](#troubleshooting-android-sdk-não-encontrado)
  - [🧪 Testes e Qualidade de Código](#-testes-e-qualidade-de-código)
    - [Rodar os testes unitários](#rodar-os-testes-unitários)
    - [Qualidade de Código e CI](#qualidade-de-código-e-ci)
  - [📲 Gerar APK para Android (app de teste / distribuição)](#-gerar-apk-para-android-app-de-teste--distribuição)
  - [🌐 Relação com o Projeto Web](#-relação-com-o-projeto-web)
  - [👥 Autor](#-autor)

---

## 🎯 Sobre o Projeto

O MindEase Mobile expande o ecossistema MindEase, oferecendo uma **experiência nativa** projetada para reduzir a carga cognitiva em dispositivos móveis. O foco é garantir uma interação previsível, guiada e com baixa sobrecarga sensorial.

A plataforma é desenhada para atender, com especial atenção, usuários que enfrentam desafios como:

- TDAH (Transtorno do Déficit de Atenção com Hiperatividade)
- TEA (Transtorno do Espectro Autista)
- Dislexia
- Burnout e sobrecarga mental
- Ansiedade em interfaces digitais
- Dificuldades de foco, organização e autorregulação

Diferente da web, o ambiente mobile impõe desafios de interação (toque, gestos) e cognição. Por isso, a aplicação foi estruturada para minimizar decisões simultâneas, guiar o usuário por fluxos claros e reduzir estímulos visuais desnecessários.

---

## ✨ Funcionalidades Principais

Cada funcionalidade foi desenhada com uma **responsabilidade única** para evitar sobrecarga cognitiva.

### 🔐 Autenticação Segura

- Login simplificado com Google (Firebase Authentication).
- Fluxo nativo via Expo, sem formulários complexos.
- Criação automática do perfil de usuário no Firestore.

### 🧠 Dashboard Cognitivo

- Visão resumida e centralizada do estado do usuário.
- Acesso rápido ao modo foco e às tarefas principais.
- Exibição de informações contextuais e relevantes.

### ⏱️ Sessão de Foco

- Timer adaptável inspirado no método Pomodoro, com ciclos de foco e pausa.
- Pausas orientadas para evitar hiperfoco e fadiga mental.
- Feedback claro ao final de cada ciclo.

### 🚨 Alertas Cognitivos

- Intervenções conscientes e não intrusivas.
- Acionados em momentos estratégicos, como excesso de tempo em uma tarefa ou necessidade de pausa, para auxiliar na autorregulação.

### ✅ Organizador de Tarefas

- Criação de tarefas simples com subtarefas (checklist).
- Interface desenhada para reduzir a paralisia decisória.
- Integração opcional com as sessões de foco.

### ⚙️ Perfil e Preferências

- Ajustes de acessibilidade como tamanho de fonte, espaçamento e contraste.
- Opção para reduzir movimento e animações.
- Preferências salvas automaticamente por usuário.

---

## ♿ Acessibilidade Cognitiva: O Pilar Central

A aplicação utiliza recursos nativos de acessibilidade do React Native (`accessibilityLabel`, `accessibilityHint`, etc.) e é compatível com leitores de tela (TalkBack/VoiceOver).

Os princípios de **Cognitive Load Reduction** são aplicados de forma prática:

- **Ritmo Guiado**: A interface evita hiperfoco prolongado e guia o usuário.
- **Interface Progressiva**: Menos informações são exibidas por tela.
- **Estímulos Controlados**: Animações e alertas são opcionais e contextuais.

> ⚠️ Diferente da web, não há dependência de ARIA ou navegação por teclado. A acessibilidade é focada em gestos e leitores de tela.

---

## 🧱 Arquitetura e Stack

### Arquitetura

O projeto segue os princípios da **Clean Architecture**, garantindo separação de responsabilidades e reuso de código. A lógica de domínio (regras de negócio, validações) é compartilhada com a versão web sempre que possível.

- **Domain**: Regras de negócio, lógica de foco e alertas.
- **Application**: Hooks e contexts que orquestram o fluxo de dados.
- **Infrastructure**: Serviços externos como Firebase (Auth, Firestore).
- **UI (Mobile)**: Componentes e telas em React Native.

### Stack Tecnológica

- **React Native** e **Expo**: Base do desenvolvimento mobile.
- **TypeScript**: Tipagem estática para segurança e manutenibilidade.
- **NativeWind**: Tailwind CSS para React Native.
- **Expo Router**: Sistema de navegação baseado em arquivos.
- **Firebase**: Autenticação e banco de dados (Firestore).
- **React Hook Form** e **Zod**: Formulários e validação de dados.
- **Vitest**: Testes unitários e de componentes.
- **React Native Reanimated**: Animações pontuais e opcionais.

---

## 🚀 Como Rodar o Projeto

**Quer apenas experimentar o app?** Baixe o [APK de testes no Google Drive](https://drive.google.com/file/d/1Tp_kh-MkFM5MhrZDHKaDKd1Hi_QDf4E8/view?usp=drive_link) e instale no Android. Não é necessário configurar ambiente nem Firebase para testar.

> ⚠️ **Importante**: Para rodar o projeto a partir do código-fonte, este projeto utiliza módulos nativos e **NÃO funciona com Expo Go**. É necessário um **development build**.

### Pré-requisitos

| Requisito              | Descrição                             |
| ---------------------- | ------------------------------------- |
| **Node.js 22+**        | Runtime JavaScript                    |
| **Android Studio**     | Para builds Android (inclui emulador) |
| **Xcode**              | Para builds iOS (apenas macOS)        |
| **Conta Firebase**     | Autenticação e banco de dados         |
| **Conta Google Cloud** | Configuração OAuth                    |

### 1. Instalação

```bash
git clone https://github.com/Brendhon/MindEase-Mobile.git
cd MindEase-Mobile
npm install
```

### 2. Configuração do Firebase

Antes de executar o projeto, configure o Firebase e Google Sign-In:

1. Crie um projeto no [Firebase Console](https://console.firebase.google.com/)
2. Habilite **Authentication > Google**
3. Registre os apps Android e iOS
4. Baixe os arquivos de configuração e coloque na raiz do projeto:
   - `google-services.json` (Android)
   - `GoogleService-Info.plist` (iOS)

> 📖 Guia completo: [`docs/guidelines/google-auth.md`](docs/guidelines/google-auth.md)

### 3. Variáveis de Ambiente

```bash
cp environment.example .env
```

Preencha o `.env` com suas credenciais Firebase:

```bash
EXPO_PUBLIC_FIREBASE_API_KEY=your-api-key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your-auth-domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your-project-id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your-bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
EXPO_PUBLIC_FIREBASE_APP_ID=your-app-id

# Google OAuth
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id
```

### 4. Build e Execução

```bash
# Gerar código nativo (obrigatório na primeira vez)
npm run prebuild

# Executar no Android
npm run android

# Executar no iOS (apenas macOS)
cd ios && pod install && cd ..
npm run ios
```

#### Troubleshooting: Android SDK não encontrado

Se ao executar `npm run android` você receber erro relacionado ao SDK não encontrado, crie manualmente o arquivo `android/local.properties`:

```properties
sdk.dir=C:\Users\SEU_USUARIO\AppData\Local\Android\Sdk
```

Para evitar isso no futuro, configure a variável de ambiente `ANDROID_HOME` com o caminho do SDK.

---

## 🧪 Testes e Qualidade de Código

### Rodar os testes unitários

Os testes validam principalmente o comportamento do usuário e as regras de negócio.

```bash
npm run test
```

Para modo watch (re-executa ao alterar arquivos):

```bash
npm run test:watch
```

### Qualidade de Código e CI

- **Husky + lint-staged**: Antes de cada commit, `Prettier` e `ESLint` são executados para garantir formatação e qualidade do código.
- **GitHub Actions**: Em cada pull request, o workflow de CI executa testes e lint para validar as mudanças. Veja a configuração em [`.github/workflows/ci-mobile.yml`](.github/workflows/ci-mobile.yml).

---

## 📲 Gerar APK para Android (app de teste / distribuição)

Para compartilhar um app de teste (por exemplo, via Google Drive) para outras pessoas instalarem no Android, é necessário gerar um APK. O passo a passo completo está em um documento dedicado:

> 📖 **[Como gerar o APK para Android](docs/guidelines/building-android-apk.md)** — EAS Build (recomendado) e build local, assinatura e resumo para distribuição no Drive.

---

## 🌐 Relação com o Projeto Web

- O MindEase Mobile reutiliza a lógica central do projeto web.
- A UI e navegação foram recriadas para o contexto mobile.
- A acessibilidade foi reinterpretada para leitores de tela e gestos.

**Projeto Web:**

- Site: [https://mind-ease-web.vercel.app](https://mind-ease-web.vercel.app)
- GitHub: [https://github.com/Brendhon/MindEase](https://github.com/Brendhon/MindEase)

---

## 👥 Autor

**Brendhon Moreira**

- LinkedIn: [https://www.linkedin.com/in/brendhon-moreira](https://www.linkedin.com/in/brendhon-moreira)
- Email: [brendhon.e.c.m@gmail.com](mailto:brendhon.e.c.m@gmail.com)
