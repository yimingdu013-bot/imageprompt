# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Saasfly is an enterprise-grade Next.js SaaS boilerplate providing a complete open-source solution for building SaaS applications. It's a monorepo project using Turborepo with multiple apps and packages.

## Development Commands

### Core Commands
- **Install dependencies**: `bun install`
- **Run development servers**: `bun run dev-web` (runs without stripe webhook)
- **Run full dev environment**: `bun run dev` (includes all services)
- **Build projects**: `bun run build`
- **Database pushes**: `bun db-push` (requires POSTGRES_URL in .env.local)

### Code Quality
- **Linting**: `bun run lint`
- **Fix linting issues**: `bun run lint:fix`
- **Format code**: `bun run format`
- **Fix formatting**: `bun run format:fix`
- **Type checking**: `bun run typecheck`

### Package-specific Commands
For the main Next.js app (apps/nextjs):
- **Start production**: `cd apps/nextjs && bun start`
- **Run with environment**: Commands use `with-env` to load from `../../.env.local`

## Architecture

### Monorepo Structure
- **apps/**: Main Next.js application with App Router
- **packages/**: Shared packages
  - **auth**: Authentication proxy service

The CLAUDE.md focuses on essential information that requires understanding multiple files, avoiding repetitive details that can be easily discovered through file exploration.