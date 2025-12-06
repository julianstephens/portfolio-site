---
title: Feature Flag Service
published: 2025-11-06
path: /feature-flag-service
repoUrl: https://github.com/julianstephens/feature-flag-service
summary: A scalable feature flag management system with REST and gRPC APIs
---

# Feature Flag Service

> Note: This project is still in progress. Interfaces, endpoints, storage options, and deployment details may change before a stable release.

A self‑hosted feature flag configuration service.

## Feature Overview

MVP

- CRUD for projects, environments, flags, segments (admin API)
- Boolean and multivariate flags
- Attribute‑based targeting rules and percentage rollouts
- Basic health checks and JSON logs

Planned

- Admin web UI
- Audit log and change history
- RBAC support
- Scheduled flag changes and prerequisites/dependencies between flags

## HTTP API (high‑level, WIP)

Admin API (Bearer admin token)

- POST /api/v1/projects, GET /api/v1/projects/:key
- POST /api/v1/environments, GET /api/v1/environments/:key (returns SDK key)
- CRUD /api/v1/flags (create/update/delete/list)
- CRUD /api/v1/segments
- GET /healthz, /readyz

Evaluation API (SDK key)

- POST /api/v1/evaluate: batch flag evaluation for a given context
- GET /api/v1/flags (optional: prefetch cacheable metadata)
- GET /api/v1/stream (planned SSE for live updates)
- GET /api/v1/config (ETag/polling metadata; planned)

Notes

- All endpoints and schemas are subject to change while the project evolves
- Expect structured error payloads with machine‑readable codes

## Security

- Separate credentials: admin token for management; per‑environment SDK keys for evaluation
- Do not expose admin APIs to the public internet
- Prefer TLS termination (or enable built‑in TLS) in production
