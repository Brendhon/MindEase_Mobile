# Gerar APK para Android (app de teste / distribuição)

Para compartilhar um **app de teste** (por exemplo, via Google Drive) para outras pessoas instalarem no Android, é necessário gerar um **APK**. Abaixo estão duas formas: **EAS Build** (recomendado) e **build local**.

---

## Opção 1: EAS Build (recomendado)

O [EAS (Expo Application Services)](https://docs.expo.dev/build/introduction/) gera o APK na nuvem, sem precisar configurar Android SDK/keystore na sua máquina.

### 1. Instalar EAS CLI e fazer login

```bash
npm install -g eas-cli
eas login
```

> Crie uma conta em [expo.dev](https://expo.dev) se ainda não tiver.

### 2. Configurar o projeto para EAS Build

Na raiz do projeto, execute:

```bash
eas build:configure
```

Isso cria o arquivo `eas.json`. Para gerar **APK** (em vez de AAB) e facilitar o download para teste, edite `eas.json` e use um profile de preview com `buildType: "apk"`:

```json
{
  "build": {
    "development": {
      "developmentClient": true,
      "distribution": "internal"
    },
    "preview": {
      "distribution": "internal",
      "android": {
        "buildType": "apk"
      }
    },
    "production": {
      "android": {
        "buildType": "app-bundle"
      }
    }
  }
}
```

O profile **preview** gera um APK que qualquer pessoa pode baixar e instalar (sem Play Store).

### 3. Gerar o APK

```bash
eas build --platform android --profile preview
```

O build roda nos servidores da Expo. Ao terminar, você recebe um **link para download do APK**. Baixe o arquivo, suba para o Google Drive (ou outro lugar) e compartilhe o link com quem for testar.

### 4. Instalação no dispositivo

O usuário baixa o APK, abre no Android e autoriza a instalação de "fontes desconhecidas" se solicitado. Não é necessário passar pela Play Store.

---

## Opção 2: Build local (APK na sua máquina)

Se preferir gerar o APK localmente (sem usar EAS):

### 1. Gerar o código nativo (se ainda não fez)

```bash
npm run prebuild
```

### 2. Gerar o APK de release

```bash
cd android
./gradlew assembleRelease
cd ..
```

No Windows (PowerShell ou Git Bash):

```bash
cd android
.\gradlew.bat assembleRelease
cd ..
```

O APK será gerado em:

```
android/app/build/outputs/apk/release/app-release.apk
```

### Assinatura (release local)

O comando acima pode gerar um APK **não assinado** ou usar um keystore de debug, dependendo da configuração. Para um APK de release **assinado** para distribuição:

1. Crie um keystore (uma vez):
   ```bash
   keytool -genkeypair -v -storetype PKCS12 -keystore mindease-release.keystore -alias mindease -keyalg RSA -keysize 2048 -validity 10000
   ```
2. Configure o Gradle para usar esse keystore. Crie ou edite `android/gradle.properties` (não versionar dados sensíveis) ou use variáveis de ambiente com as referências no `android/app/build.gradle`.

Para **teste rápido**, muitas vezes o APK gerado com `assembleRelease` já é instalável; em alguns setups o Gradle usa um keystore de debug para release. Se o Android rejeitar a instalação, use a Opção 1 (EAS) ou configure o keystore de release conforme a [documentação do Expo/React Native](https://reactnative.dev/docs/signed-apk-android).

---

## Resumo rápido (app de teste no Drive)

| Objetivo | Comando / Passo |
|----------|------------------|
| **Gerar APK na nuvem (EAS)** | `eas build --platform android --profile preview` |
| **Onde fica o APK (EAS)** | Link no painel [expo.dev](https://expo.dev) após o build |
| **Build local** | `npm run prebuild` → `cd android` → `./gradlew assembleRelease` |
| **Onde fica o APK (local)** | `android/app/build/outputs/apk/release/app-release.apk` |

Depois é só enviar o APK para o Google Drive e compartilhar o link com os testadores.
