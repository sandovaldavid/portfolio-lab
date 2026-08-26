FROM mcr.microsoft.com/devcontainers/typescript-node:24-bookworm

ARG PNPM_VERSION=11.7.0

USER root
RUN corepack enable \
    && corepack prepare "pnpm@${PNPM_VERSION}" --activate

USER node
WORKDIR /workspaces/portfolio-lab
