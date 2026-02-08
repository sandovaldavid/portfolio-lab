# Base Image: Node.js 22 (LTS 2026)
FROM mcr.microsoft.com/devcontainers/typescript-node:22

# Evitar interrupciones durante la instalación
ENV DEBIAN_FRONTEND=noninteractive

# 1. ACTUALIZACIÓN DEL SISTEMA & DEPENDENCIAS BASE
RUN apt-get update && apt-get install -y --no-install-recommends \
    gnupg2 \
    curl \
    ca-certificates \
    apt-transport-https \
    lsb-release \
    python3-pip \
    && apt-get clean && rm -rf /var/lib/apt/lists/*

# 2. ACTIVACIÓN DE PNPM (COREPACK)
RUN corepack enable && corepack prepare pnpm@latest --activate

# 3. STARSHIP PROMPT
# Se inyecta en bash y zsh para asegurar visibilidad inmediata
RUN curl -sS https://starship.rs/install.sh | sh -s -- -y \
    && echo 'eval "$(starship init bash)"' >> /home/node/.bashrc \
    && echo 'eval "$(starship init zsh)"' >> /home/node/.zshrc

# 4. HERRAMIENTAS NPM GLOBALES (Angular 21 & AI Stack)
# Forzamos la instalación. Si opencode-ai requiere permisos especiales, asegúrate de tener .npmrc configurado después.
RUN npm install -g @angular/cli@21 @lhci/cli artillery vercel opencode-ai

# 5. K6 (FIX: Método robusto para Debian moderno)
# El error anterior "Failed to parse keyring" se soluciona descargando y des-armando la llave manualmente.
RUN curl -fsSL https://dl.k6.io/key.gpg | gpg --dearmor -o /usr/share/keyrings/k6-archive-keyring.gpg \
    && echo "deb [signed-by=/usr/share/keyrings/k6-archive-keyring.gpg] https://dl.k6.io/deb stable main" | tee /etc/apt/sources.list.d/k6.list \
    && apt-get update && apt-get install -y k6

# 6. CONFIGURACIÓN FINAL DEL USUARIO
USER node

# Asegurar que los binarios globales de pnpm y npm estén en el PATH
ENV PNPM_HOME="/home/node/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
