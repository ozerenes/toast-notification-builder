# Architecture Overview

This document describes the high-level architecture
and design decisions of the Toast Notification Builder.

## Goals

- Separate configuration (builder) from runtime behavior (toast engine)
- Keep UI components stateless and reusable
- Use TypeScript as the source of truth for the domain

## Non-Goals

- Building a full toast framework
- Supporting SSR or backend persistence
- Introducing heavy abstractions

## High-Level Modules

### 1. Builder Layer

Responsible for creating and editing notification configurations.
Does not display real notifications.

### 2. Toast Engine

Responsible for displaying active notifications,
handling stacking, positioning, and auto-dismiss behavior.

### 3. Persistence Layer

Handles saving and loading presets using localStorage.

## State Management

Pinia is used to separate:

- Builder state
- Active toast state
- Preset persistence state

## Open Decisions

- Animation variants (fade, slide, bounce)
- Code export format (JS vs JSON)
