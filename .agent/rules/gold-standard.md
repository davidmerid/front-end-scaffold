# Gold Standard Rules

All agents operating in this workspace must adhere to the following rules at all times.

## 1. Architectural Integrity
- **Hexagonal Architecture**: Strictly separating Domain, Application, and Infrastructure layers.
- **Domain Purity**: The `domain` package must NEVER import frameworks (Spring, Hibernate, Jackson, etc.).
- **Persistence**: Use `BaseEntity` with UUIDs and `@SoftDelete`.
- **Security**: Always secure endpoints. Use `OncePerRequestFilter` with Firebase Auth.

## 2. Code Quality
- **Formatting**: Adhere to Prettier/Checkstyle configurations.
- **Testing**:
  - Minimum 80% code coverage.
  - Unit tests for all business logic.
  - Integration tests for controllers and repositories.
- **Documentation**: JSDoc/JavaDoc for public methods.

## 3. Workflow Adherence
- **Planning**: Always use `scaffold-planner` (Backend) or `implement-feature` (Frontend) for new work.
- **Verification**: NEVER skip a verification gate. If a gate fails, fix it before proceeding.
- **Commits**: Use Conventional Commits (`feat:`, `fix:`, `chore:`).

## 4. Environment
- **Secrets**: NEVER hardcode secrets. Use `.env` or environment variables.
- **Docker**: Ensure `docker-compose.yml` reflects the current infrastructure needs.
