# Project: Gold Standard Spring Boot Scaffold
**Goal:** Build a production-ready, reusable software factory for Spring Boot 3.4+ applications using Hexagonal Architecture.

## 1. Technology Stack
- **Language:** Java 21 (LTS)
- **Framework:** Spring Boot 3.4+
- **Build Tool:** Maven (Wrapper included)
- **Database:** PostgreSQL 16 (Primary), Redis (Cache/Session)
- **Auth Provider:** Firebase Authentication (Google Identity Platform)
- **Observability:** Spring Boot Admin, Micrometer, Zipkin (Tracing)
- **Documentation:** SpringDoc OpenAPI (Swagger UI)

## 2. Architectural Guidelines (Hexagonal / Ports & Adapters)
The project must strictly adhere to the following package structure to ensure the "Core" remains independent of frameworks.

### Package Structure: `com.standard.scaffold`
* **`domain`** (The Core - Pure Java)
    * **`model`**: Rich domain entities. **Constraint:** NO Spring annotations (e.g., `@Service`, `@Table`, `@Entity` allowed only if using JPA as strictly defined below, but ideally POJOs). *Note: For pragmatic reasons, we will use Jakarta Persistence annotations in Domain but strictly NO Spring Logic.*
    * **`port`**: Interfaces defining inputs and outputs.
        * `in`: Use Cases (e.g., `CreateUserUseCase`).
        * `out`: Driven Ports (e.g., `SaveUserPort`, `SendNotificationPort`).
    * **`exception`**: Domain-specific business exceptions.
* **`application`** ( The Orchestrator)
    * **`service`**: Implements `port.in` interfaces. Orchestrates logic but contains no technical details.
* **`infrastructure`** (The Adapters - Spring Beans)
    * **`adapter.in`**: Entry points (RestControllers, ScheduledJobs).
    * **`adapter.out`**: Implementations of `port.out`.
        * `persistence`: Spring Data JPA Repositories.
        * `notification`: Email/SMS adapters (SendGrid/Twilio stubs).
        * `auth`: Firebase Token verification.
    * **`configuration`**: Spring `@Configuration` classes (Security, Swagger, Beans).

## 3. Key Implementation Features

### A. The Base Entity (Persistence)
All database entities must extend a common `BaseEntity` class containing:
* **Primary Key:** `UUID` (not Long).
* **Auditing:** `@CreatedBy`, `@CreatedDate`, `@LastModifiedBy`, `@LastModifiedDate`.
* **Soft Delete:**
    * Must use Hibernate 6.4+ `@SoftDelete` or `@SQLDelete` + `@SQLRestriction` annotations.
    * Field: `deletedAt` (Instant), not just a boolean.

### B. Hybrid Security Architecture
* **Stateless API:** No server-side sessions for Auth.
* **Firebase Integration:**
    * Clients exchange credentials (Google/Apple/Email) with Firebase directly on the frontend.
    * Backend receives a `Bearer <Firebase-JWT>`.
    * **Filter:** A custom `OncePerRequestFilter` verifies the JWT via Firebase Admin SDK and populates the `SecurityContext`.
* **User Profile:**
    * On first login, check if the `firebase_uid` exists in the local `users` table. If not, create a profile.

### C. Developer Experience (DX)
* **Swagger UI:** Auto-generated at `/swagger-ui.html`. Must support JWT "Authorize" button.
* **Global Exception Handler:** usage of `@RestControllerAdvice` to map Domain Exceptions to **RFC 7807 Problem Details** JSON.
* **Logging:** JSON-formatted logs in console (Logback) with **MDC Correlation IDs** (TraceID) for every request.

## 4. DevOps & Production Readiness
* **Docker Compose:** A `docker-compose.yml` must spin up:
    * PostgreSQL (Port 5432)
    * Spring Boot Admin Server
    * Redis
* **CI/CD:** A `Jenkinsfile` (Declarative Pipeline) that:
    1.  **Builds:** `mvn clean package -DskipTests`
    2.  **Tests:** Runs Unit Tests.
    3.  **Quality:** Runs Checkstyle/Spotless.
    4.  **Dockerize:** Builds the image using Jib or Dockerfile.

## 5. Verification Strategy
Every implementation phase MUST include a **Verification Gate** — a concrete, executable checklist that must pass before proceeding to the next phase. Gates are not optional.

### Gate Structure (Required Per Phase)
Each phase gate must define:
1. **Files Must Exist** — Exact file paths that must be present after the phase completes.
2. **Commands** — Shell commands to run with their expected output (e.g., `./mvnw compile` -> `BUILD SUCCESS`).
3. **Assertions** — Grep/search patterns that must match (positive) or must NOT match (negative) to enforce architectural rules.
4. **Pass Criteria** — A plain-English statement of what "done" means for this phase.

### Gate Types By Layer
| Layer | Mandatory Checks |
|---|---|
| **Foundation** | File existence, `docker-compose config` syntax validation, directory structure matches hexagonal layout. |
| **Configuration** | `./mvnw dependency:resolve` succeeds, config files parse without error. |
| **Domain** | **STRICT** — `grep -r` for `org.springframework`, `jakarta.persistence`, `com.fasterxml.jackson` in `domain/` must return zero results. All port interfaces must exist. |
| **Persistence** | `./mvnw compile` succeeds. JPA entities, repositories, and adapters all present. Mappers exist between domain and JPA models. |
| **Security** | `./mvnw compile` succeeds. `OncePerRequestFilter` subclass exists. Firebase Admin SDK in dependency tree. |
| **Web/App** | `./mvnw compile` succeeds. Controllers annotated with `@RestController`. `@RestControllerAdvice` exception handler present. |
| **Messaging** | `./mvnw compile` succeeds. `MessageOutPort` has at least one adapter implementation. |
| **Testing** | `./mvnw test` — all tests pass with zero failures. |
| **DevOps** | `./mvnw clean install` full build passes. `./mvnw checkstyle:check` passes. `Jenkinsfile` and `README.md` exist. |

### Failure Protocol
If a gate fails:
1. Do NOT proceed to the next phase.
2. Fix the failing code.
3. Re-run the gate.
4. Only mark the phase as complete (`[x]`) after all gate criteria pass.

## 6. Implementation Roadmap
1.  **Init:** Maven project generation.
2.  **Core:** BaseEntity and Domain Logic.
3.  **Infra:** Persistence and Security Adapters.
4.  **Glue:** Application Services and Controllers.