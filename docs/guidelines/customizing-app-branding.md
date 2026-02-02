# Personalizar nome e ícone do app

Este guia explica como alterar o **nome exibido** do app (na tela inicial do dispositivo) e como usar um **ícone personalizado** em vez do padrão do Expo.

---

## Nome do app

O nome que aparece **sob o ícone** na tela inicial (e em outras telas do sistema) é controlado pelo campo `expo.name` no `app.json`.

### Onde alterar

Arquivo: **`app.json`** (raiz do projeto)

```json
{
  "expo": {
    "name": "MindEase",
    "slug": "mind_ease_mobile",
    ...
  }
}
```

- **`name`**: Nome exibido para o usuário (pode ter espaços e maiúsculas, ex.: `"Mind Ease"` ou `"MindEase"`).
- **`slug`**: Identificador técnico usado em URLs e builds (Expo). Mantenha sem espaços e em minúsculas (ex.: `mind_ease_mobile`). Evite alterar o slug depois de publicar, para não quebrar links.

### Depois de alterar o nome

Se você já rodou `npx expo prebuild` antes, é recomendável gerar de novo o código nativo para que o nome apareça corretamente no Android e no iOS:

```bash
npx expo prebuild --clean
```

Em seguida, rode o app de novo (`npm run android` ou `npm run ios`).

---

## Ícone do app

O ícone é a imagem que aparece na tela inicial, na gaveta de apps e nas lojas. O projeto já está configurado para usar os arquivos em `assets/`.

### Arquivos envolvidos

| Arquivo | Uso | Tamanho recomendado |
|--------|-----|----------------------|
| `assets/icon.png` | Ícone principal (iOS e fallback) | **1024×1024 px** |
| `assets/adaptive-icon.png` | Camada de frente do ícone adaptativo (Android) | **1024×1024 px** |
| `assets/splash.png` | Tela de abertura (splash) | 1024×1024 px (ou conforme design) |
| `assets/favicon.png` | Favicon da versão web | 48×48 px ou maior |

### Como usar seu próprio ícone

1. **Crie ou exporte a imagem do ícone**
   - Formato: **PNG**, fundo opaco (ou transparente no ícone adaptativo).
   - Tamanho: **1024×1024 px**, quadrado (ex.: 1023×1024 não é válido).
   - O ícone deve preencher o quadrado; o sistema aplica máscaras (cantos arredondados etc.).

2. **Substitua os arquivos em `assets/`**
   - Troque `assets/icon.png` pelo seu ícone principal.
   - Para Android: troque `assets/adaptive-icon.png` pela **camada de frente** do ícone adaptativo (a cor de fundo é definida no `app.json`).

3. **Ícone adaptativo (Android)**
   - No Android, o ícone pode ser exibido em formas diferentes (círculo, quadrado com cantos arredondados etc.).
   - Mantenha o conteúdo importante na **região central** (cerca de 66% do centro), para não ser cortado nas máscaras.
   - A cor de fundo é configurada em `app.json`:

   ```json
   "android": {
     "adaptiveIcon": {
       "foregroundImage": "./assets/adaptive-icon.png",
       "backgroundColor": "#ffffff"
     }
   }
   ```

   Altere `backgroundColor` para a cor desejada (ex.: `#232323` para fundo escuro).

4. **Opcional: splash e favicon**
   - Para alterar a tela de abertura: substitua `assets/splash.png` e, se quiser, ajuste `expo.splash` no `app.json`.
   - Para a versão web: substitua `assets/favicon.png`.

### Referências de design

- [Android: Adaptive Icon Guidelines](https://developer.android.com/develop/ui/views/launch/icon_design_adaptive)
- [Apple: App Icon Design (Human Interface Guidelines)](https://developer.apple.com/design/human-interface-guidelines/app-icons/)
- [Expo: Splash screen and app icon](https://docs.expo.dev/develop/user-interface/splash-screen-and-app-icon/)

### Depois de trocar os ícones

Se você usa **prebuild** (código nativo gerado pelo Expo):

```bash
npx expo prebuild --clean
```

Depois, faça um novo build (local ou EAS). Em desenvolvimento, às vezes é necessário desinstalar o app do dispositivo/emulador e instalar de novo para ver o novo ícone.

---

## Resumo

| O que alterar | Onde | Observação |
|---------------|------|------------|
| Nome exibido | `app.json` → `expo.name` | Ex.: `"MindEase"` ou `"Mind Ease"` |
| Ícone principal | Substituir `assets/icon.png` | 1024×1024 px, PNG |
| Ícone Android (adaptativo) | Substituir `assets/adaptive-icon.png` e, se quiser, `backgroundColor` em `app.json` | 1024×1024 px; manter foco no centro |
| Splash | Substituir `assets/splash.png` e/ou config em `app.json` | Opcional |
| Favicon (web) | Substituir `assets/favicon.png` | Opcional |

Após mudanças em nome ou ícones, use `npx expo prebuild --clean` e gere um novo build para ver tudo refletido no app instalado.
