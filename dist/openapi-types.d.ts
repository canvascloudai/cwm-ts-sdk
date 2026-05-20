/**
 * AUTO-GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * Source: openapi.yaml
 * Generator: scripts/generate-sdk.ts  (openapi-typescript v7)
 *
 * Re-generate with:
 *   npm run generate-sdk
 *
 * These raw types correspond 1-to-1 with every path/operation in the
 * OpenAPI spec. Import them directly for low-level usage, or use the
 * type-safe generated client from sdk/generated-client.
 */
export type paths = {
    "/keys/register": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Exchange a registration token for a permanent API key
         * @description Public endpoint — no authentication required.
         *
         *     Accepts a single-use registration token minted by an admin via `POST /register-tokens`
         *     and returns a permanent API key pre-scoped to whatever the admin specified when the
         *     token was created.
         *
         *     **The token is burned immediately on success.** It cannot be reused even if the caller
         *     loses the returned key — in that case the admin must mint a new token.
         *
         *     **Intended usage pattern (Canvas Cloud AI / external agents):**
         *     1. Admin mints a registration token (expiry set for safety).
         *     2. Client calls this endpoint once to receive its permanent key.
         *     3. Client stores the key as an environment secret (`CWM_API_KEY`).
         *     4. All subsequent API calls use that key directly — no runtime token exchange ever occurs.
         */
        post: operations["registerApiKey"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/register-tokens": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all registration tokens (admin)
         * @description Requires `admin` scope. Returns all registration tokens including their status:
         *     `pending` (unused and not expired), `used`, `expired`, or `revoked`.
         *     The plain token value is never returned in list responses.
         */
        get: operations["listRegistrationTokens"];
        put?: never;
        /**
         * Mint a new registration token (admin)
         * @description Requires `admin` scope. Creates a named, scoped, time-limited single-use invite token.
         *     The plain token is returned **once** in the response and must be shared with the intended
         *     client immediately — it cannot be retrieved again.
         *
         *     The client uses the token at `POST /keys/register` to exchange it for a permanent API key.
         */
        post: operations["createRegistrationToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/register-tokens/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Revoke an unused registration token (admin)
         * @description Requires `admin` scope. Marks an unused, pending token as revoked so it can no longer
         *     be exchanged. Returns `409 Conflict` if the token has already been used (the resulting
         *     API key must be revoked separately via `DELETE /keys/{id}`).
         */
        delete: operations["revokeRegistrationToken"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/description": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get simulator description
         * @description Returns a structured JSON document describing the Cloud World Model simulator —
         *     its purpose, core concepts, workflow, capabilities, quick-start call sequence,
         *     authentication requirements, entry points, intended use cases, and a pointer
         *     to the OpenAPI spec. Intended to be consumed by AI agents before calling any
         *     other endpoint so they can reason about available functionality.
         */
        get: operations["getDescription"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all simulations for the authenticated API key
         * @description Returns all simulations owned by the authenticated API key.
         *     Admin-scoped keys receive all simulations across all keys.
         *     Requires `read` scope.
         */
        get: operations["listSimulations"];
        put?: never;
        /**
         * Create a new cloud infrastructure simulation
         * @description Creates a simulation with cloud resources (compute, network, database, storage).
         *     The simulation serves as the environment for RL training.
         */
        post: operations["createSimulation"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Simulation UUID
                 * @example 550e8400-e29b-41d4-a716-446655440000
                 */
                simulationId: string;
            };
            cookie?: never;
        };
        /**
         * Get a simulation by ID
         * @description Returns the full state of a simulation including its resources,
         *     current time step, traffic load, and autoscaling history.
         *     Requires `read` scope and ownership.
         */
        get: operations["getSimulation"];
        put?: never;
        post?: never;
        /**
         * Delete a simulation
         * @description Permanently deletes a simulation and all associated data (metrics,
         *     events, patterns, failure injections).
         *     Requires `write` scope and ownership.
         */
        delete: operations["deleteSimulation"];
        options?: never;
        head?: never;
        /**
         * Update a simulation
         * @description Partially updates a simulation's properties (e.g. name, description,
         *     traffic, resources). Only the fields provided are changed.
         *     Requires `write` scope and ownership.
         */
        patch: operations["updateSimulation"];
        trace?: never;
    };
    "/simulations/{simulationId}/step": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Advance a simulation by one time step
         * @description Executes one simulation step: applies active traffic patterns, runs the
         *     capacity model, applies active failure injections, triggers autoscaling,
         *     and saves the resulting metrics and events.
         *
         *     **Authentication:** Optional. Unauthenticated callers may only step
         *     "demo" simulations (those created without an API key) up to 20 times.
         *     Authenticated callers with `write` scope may step any simulation they own
         *     without limit.
         *
         *     Returns the updated simulation state, the step metrics, and any events
         *     generated during the step (autoscale events, cost spikes, failure
         *     recoveries, etc.).
         */
        post: operations["stepSimulation"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/step-hybrid": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Advance a simulation using hybrid (rule + ML) decision logic
         * @description Steps the simulation using the Hybrid Prediction Engine, which blends a
         *     deterministic rule-based simulation with a simulated ML-based prediction.
         *     The engine uses a confidence threshold to decide how much weight to give
         *     each path, and falls back to pure rules when ML confidence is low.
         *
         *     Returns the updated simulation state, step metrics, events, the hybrid
         *     decision record (including ML confidence and blending rationale), and the
         *     updated cumulative hybrid result object.
         *
         *     Requires `write` scope and ownership.
         */
        post: operations["stepSimulationHybrid"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/hybrid-result": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the hybrid simulation result history
         * @description Returns the cumulative hybrid decision history and summary statistics for
         *     a simulation that has been stepped via `POST /simulations/{simulationId}/step-hybrid`.
         *
         *     Includes the full list of per-step decisions (ML confidence, blending applied,
         *     fallback used, bottlenecks, event likelihoods) and aggregate summary metrics
         *     (average ML confidence, total blended steps, total fallback steps).
         *
         *     Requires `read` scope and ownership.
         */
        get: operations["getHybridResult"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/inject-traffic": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Inject a random traffic spike
         * @description Immediately injects a sudden traffic spike into the simulation by multiplying
         *     the current traffic load by a random factor (typically 2×–5×). The spike is
         *     applied to the simulation state and recorded as a warning event.
         *
         *     Useful for testing autoscaling responsiveness without configuring a full
         *     traffic pattern. The effect persists until the next step adjusts traffic
         *     back via active patterns.
         *
         *     Requires `write` scope and ownership.
         */
        post: operations["injectTraffic"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/inject-failure": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Inject a random node failure
         * @description Randomly selects a healthy compute node in the simulation and marks it as
         *     failed, updating the resource state and recording a warning event.
         *
         *     Returns 400 if no healthy nodes are available to fail.
         *     For fine-grained control over failure type, duration, and target, use
         *     `POST /simulations/{simulationId}/failures` instead.
         *
         *     Requires `write` scope and ownership.
         */
        post: operations["injectFailure"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/patterns": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List traffic patterns for a simulation
         * @description Returns all traffic patterns configured for the simulation.
         *     Patterns are applied on every simulation step to vary the traffic load
         *     (e.g. sine waves, ramps, step functions).
         *
         *     Requires `read` scope and ownership.
         */
        get: operations["listTrafficPatterns"];
        put?: never;
        /**
         * Create a traffic pattern for a simulation
         * @description Adds a new traffic pattern that will be applied on every subsequent
         *     simulation step. Multiple patterns can be active simultaneously; their
         *     effects are composed.
         *
         *     Requires `write` scope and ownership.
         */
        post: operations["createTrafficPattern"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/patterns/{patternId}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Traffic pattern UUID */
                patternId: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Delete a traffic pattern
         * @description Permanently removes a traffic pattern. The pattern will no longer be
         *     applied on subsequent simulation steps. Ownership of the parent simulation
         *     is enforced.
         *     Requires `write` scope.
         */
        delete: operations["deleteTrafficPattern"];
        options?: never;
        head?: never;
        /**
         * Update a traffic pattern
         * @description Partially updates a traffic pattern's fields (type, amplitude, period,
         *     isActive). Ownership of the parent simulation is enforced.
         *     Requires `write` scope.
         */
        patch: operations["updateTrafficPattern"];
        trace?: never;
    };
    "/simulations/{simulationId}/failures": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List failure injections for a simulation
         * @description Returns all scheduled failure injections for the simulation, including
         *     both active and inactive ones.
         *
         *     Failure injections are applied automatically on each simulation step when
         *     their time window is active.
         *
         *     Requires `read` scope and ownership.
         */
        get: operations["listFailureInjections"];
        put?: never;
        /**
         * Schedule a failure injection
         * @description Creates a new failure injection that will be applied to the simulation
         *     during the specified time window. The injection is applied immediately
         *     to the resource state (the affected resource's status changes) and an
         *     event is recorded.
         *
         *     **Failure types:**
         *     - `instance_kill` — kills a specific compute instance
         *     - `az_outage` — simulates an availability zone outage
         *     - `database_overload` — spikes database latency and error rate
         *     - `network_latency` — adds latency to all network resources
         *
         *     Requires `write` scope and ownership.
         */
        post: operations["createFailureInjection"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/failures/{failureId}": {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Failure injection UUID */
                failureId: string;
            };
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Delete a failure injection
         * @description Permanently removes a failure injection. The failure will no longer be
         *     applied on subsequent simulation steps. Ownership of the parent simulation
         *     is enforced.
         *     Requires `write` scope.
         */
        delete: operations["deleteFailureInjection"];
        options?: never;
        head?: never;
        /**
         * Update a failure injection
         * @description Partially updates a failure injection's fields (e.g. deactivate it by
         *     setting `isActive: false`, or change the end time). Ownership of the
         *     parent simulation is enforced.
         *     Requires `write` scope.
         */
        patch: operations["updateFailureInjection"];
        trace?: never;
    };
    "/simulations/{simulationId}/metrics": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get simulation metrics history
         * @description Returns the full time-series metrics history for the simulation. Each
         *     entry corresponds to one simulation step and includes CPU utilization,
         *     latency percentiles, error rate, throughput, and cost per hour.
         *
         *     Requires `read` scope and ownership.
         */
        get: operations["getSimulationMetrics"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/events": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get simulation event log
         * @description Returns all events recorded for the simulation in chronological order.
         *     Events include autoscaling decisions, failure injections, cost spikes,
         *     failure recoveries, and manually injected entries.
         *
         *     Requires `read` scope and ownership.
         */
        get: operations["getSimulationEvents"];
        put?: never;
        /**
         * Manually add an event to a simulation
         * @description Injects a custom event into the simulation's event log. Useful for
         *     annotating the timeline with external milestones (e.g. deployment
         *     markers, manual interventions).
         *
         *     Requires `write` scope and ownership.
         */
        post: operations["createSimulationEvent"];
        /**
         * Clear all events for a simulation
         * @description Permanently removes all events from the simulation's event log. This is
         *     a destructive operation and cannot be undone. Useful for resetting the
         *     log before starting a new experiment.
         *
         *     Requires `write` scope and ownership.
         */
        delete: operations["clearSimulationEvents"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/explain": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * AI-generated explanation of simulation behaviour
         * @description Uses GPT-5 to generate a natural-language explanation of what is currently
         *     happening in the simulation: why latency is high, why autoscaling is or
         *     isn't triggering, what the dominant cost drivers are, etc.
         *
         *     Set `beginnerMode: true` to receive a simplified, jargon-free explanation
         *     suitable for cloud newcomers.
         *
         *     **Authentication:** Optional. Unauthenticated callers are subject to
         *     stricter rate limits.
         */
        post: operations["explainSimulation"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/optimize": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * AI-generated infrastructure optimisation suggestions
         * @description Uses GPT-5 to analyse the simulation's current resource configuration and
         *     metric history and return prioritised suggestions for reducing cost,
         *     improving reliability, or increasing performance.
         *
         *     Set `beginnerMode: true` for simplified language.
         *
         *     **Authentication:** Optional. Unauthenticated callers are subject to
         *     stricter rate limits.
         */
        post: operations["optimizeSimulation"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/troubleshoot": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * AI-guided troubleshooting for a specific issue
         * @description Accepts a plain-text description of a problem (e.g. "latency spikes every
         *     30 seconds") and uses GPT-5 to analyse the simulation's current state and
         *     event history to produce step-by-step troubleshooting guidance.
         *
         *     **Authentication:** Optional. Unauthenticated callers are subject to
         *     stricter rate limits.
         */
        post: operations["troubleshootSimulation"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/bulk-resize": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Resize all compute resources to a new DigitalOcean Droplet size
         * @description Resizes every compute resource in the simulation to the specified
         *     DigitalOcean Droplet size tier (e.g. `s-2vcpu-4gb`, `s-4vcpu-8gb`,
         *     `s-8vcpu-16gb`). Useful for right-sizing experiments where you want
         *     to evaluate the cost/performance trade-off of a uniform resize.
         *
         *     The size must be a valid DigitalOcean Droplet slug. Use
         *     `GET /api/description` to discover available sizes.
         *
         *     Requires `write` scope and ownership.
         */
        post: operations["bulkResizeSimulation"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/analyze-bottlenecks": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * AI-powered bottleneck analysis
         * @description Uses GPT-5 to identify performance bottlenecks in the simulation based on
         *     the current resource configuration, metric history, and event log.
         *     Returns a detailed analysis and, where applicable, a DigitalOcean-specific
         *     migration recommendation.
         *
         *     Set `beginnerMode: true` for simplified language.
         *
         *     **Authentication:** Optional. Unauthenticated callers are subject to
         *     stricter rate limits.
         */
        post: operations["analyzeBottlenecks"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/explain-autoscaling": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * AI explanation of autoscaling decisions
         * @description Uses GPT-5 to explain why specific autoscaling actions were taken (or not
         *     taken) during the simulation. Analyses the scaling history, recent metrics,
         *     and events to produce a narrative that helps operators understand the
         *     autoscaler's behaviour.
         *
         *     Set `beginnerMode: true` for simplified language.
         *
         *     **Authentication:** Optional. Unauthenticated callers are subject to
         *     stricter rate limits.
         */
        post: operations["explainAutoscaling"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/right-sizing-hint": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get right-sizing recommendations
         * @description Analyses the simulation's recent metrics and resource configuration to
         *     identify over-provisioned resources. Returns actionable hints with the
         *     recommended smaller size slug, estimated hourly rate, estimated savings
         *     percentage, and a trade-off note explaining the operational impact.
         *
         *     Returns `{ hasHint: false }` when the simulation is appropriately sized
         *     and no downsizing is recommended.
         *
         *     Requires `read` scope and ownership.
         */
        get: operations["getRightSizingHint"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/validate-cost-accuracy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Validate simulation cost accuracy against provider benchmarks
         * @description Compares the simulation's cost estimates against known real-world provider
         *     pricing benchmarks. Returns a validation result indicating whether the
         *     simulated cost per hour is within the acceptable tolerance (±10%).
         *
         *     Useful for confirming the simulation is faithfully modelling provider
         *     pricing before using it for cost-optimisation decisions.
         *
         *     Requires `read` scope and ownership.
         */
        get: operations["validateCostAccuracy"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/validate-performance-accuracy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Validate simulation performance accuracy against provider benchmarks
         * @description Compares the simulation's throughput and latency estimates against known
         *     real-world provider benchmarks. Returns a validation result indicating
         *     whether the simulated performance metrics are within the acceptable
         *     tolerance (±15%).
         *
         *     Requires `read` scope and ownership.
         */
        get: operations["validatePerformanceAccuracy"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/simulations/{simulationId}/validate-accuracy": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Validate both cost and performance accuracy
         * @description Convenience endpoint that runs both cost and performance accuracy
         *     validations in a single call. Returns a combined result with an
         *     `overallValid` flag that is `true` only if both checks pass.
         *
         *     Requires `read` scope and ownership.
         */
        get: operations["validateAccuracy"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/scenarios": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all scenario templates
         * @description Returns the list of pre-built infrastructure scenario templates. Scenarios
         *     define a complete simulation configuration (resources, traffic, connections)
         *     that can be loaded directly into a new simulation via the browser UI or the
         *     API.
         *
         *     **No authentication required.**
         */
        get: operations["listScenarios"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/scenarios/{scenarioId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get a scenario template by ID
         * @description Returns the full details of a single scenario template including all
         *     resource definitions, connections, and default traffic settings.
         *
         *     **No authentication required.**
         */
        get: operations["getScenario"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pricing-history": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get cloud provider pricing history
         * @description Returns a structured pricing history document containing:
         *     - **snapshots** — a list of dated pricing snapshots with entry counts
         *     - **changes** — the most recent price changes detected across all providers
         *     - **providerTrends** — per-provider price trend direction (up / down / stable)
         *     - **resourceIds** — the full list of trackable resource identifiers
         *
         *     Use `GET /pricing-history/trend/{resourceId}` to retrieve the full
         *     price trend for a specific resource type.
         *
         *     **No authentication required.**
         */
        get: operations["getPricingHistory"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/pricing-history/trend/{resourceId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get price trend for a specific resource
         * @description Returns the full price trend time-series for a single resource type,
         *     showing how its hourly rate has changed across all available pricing
         *     snapshots.
         *
         *     Use `GET /pricing-history` to retrieve the full list of valid
         *     `resourceId` values.
         *
         *     **No authentication required.**
         */
        get: operations["getPricingTrend"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/keys": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List API keys
         * @description Lists all API keys. Only shows key prefixes for security.
         */
        get: operations["listApiKeys"];
        put?: never;
        /**
         * Create a new API key
         * @description Creates a new API key for authenticating to the RL Training API.
         *     The full key is returned only once - store it securely.
         */
        post: operations["createApiKey"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/keys/{keyId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Revoke an API key
         * @description Revokes an API key, preventing further use
         */
        delete: operations["revokeApiKey"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rl/environments": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a new RL training environment
         * @description Creates a reinforcement learning environment for training agents.
         *     Links to an existing simulation and configures episode parameters.
         *
         *     This endpoint works with simulations built on **any supported provider**,
         *     including AWS, GCP, Azure, OCI, and **DigitalOcean**. Training an agent against
         *     a DigitalOcean simulation lets you learn optimal autoscaling strategies for
         *     Droplet-based workloads, Managed Database failover handling, and
         *     multi-datacenter traffic routing — all without incurring real cloud costs.
         *     The observation space, action space, and reward function are identical
         *     regardless of provider.
         */
        post: operations["createRLEnvironment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rl/environments/{environmentId}/reset": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Reset an RL environment to start a new episode
         * @description Resets the environment to its initial state, clearing all scaling history and events.
         *     Use this to start a new training episode after the previous one completes.
         */
        post: operations["resetRLEnvironment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rl/environments/{environmentId}/step": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Execute an action and advance the simulation by one step
         * @description Executes an agent action, simulates one time step, and returns the next observation,
         *     reward, and episode completion status. This is the core training loop interaction.
         */
        post: operations["stepRLEnvironment"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rl/environments/{environmentId}/observation": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get the current observation without executing an action
         * @description Returns the current state observation without advancing the simulation.
         *     Useful for initial state inspection or debugging.
         */
        get: operations["getRLObservation"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/rl/environments/{environmentId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get RL environment details
         * @description Retrieve the current state and configuration of an RL environment
         */
        get: operations["getRLEnvironment"];
        put?: never;
        post?: never;
        /**
         * Cancel RL training episode
         * @description Cancel a running RL training episode. This endpoint is idempotent - calling it multiple times
         *     on the same episode will return success without error.
         *
         *     **Cancellation Rules:**
         *     - Episodes with isActive=true will be cancelled
         *     - Episodes already cancelled (isActive=false) will return success (idempotent behavior)
         *     - Cancelled episodes will have isActive set to false and a cancelledAt timestamp
         */
        delete: operations["cancelRLEnvironment"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/analysis/optimize": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Submit infrastructure optimization job
         * @description Analyzes your current architecture and generates 50+ tested variations
         *     with ranked recommendations for cost/performance optimization.
         */
        post: operations["submitOptimization"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/analysis/jobs/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get optimization job status
         * @description Check the progress and status of an optimization job
         */
        get: operations["getOptimizationJob"];
        put?: never;
        post?: never;
        /**
         * Cancel infrastructure optimization job
         * @description Cancel a running infrastructure optimization job. This endpoint is idempotent - calling it multiple times
         *     on the same job will return success without error.
         *
         *     **Cancellation Rules:**
         *     - Jobs with status "pending" or "running" will be cancelled
         *     - Jobs already "cancelled" will return success (idempotent behavior)
         *     - Jobs with status "completed" or "failed" cannot be cancelled (returns 409)
         *     - Cancelled jobs will have status set to "cancelled" and a cancelledAt timestamp
         */
        delete: operations["cancelOptimizationJob"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/analysis/jobs/{id}/recommendations": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get optimization recommendations
         * @description Retrieve ranked recommendations from a completed optimization job
         */
        get: operations["getRecommendations"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/predictions/validate": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Validate infrastructure against traffic forecast
         * @description Tests whether current infrastructure can handle a predicted traffic pattern.
         *     Returns validation results with bottlenecks and recommendations.
         *
         *     When a `webhookUrl` is provided, the following payload is POSTed to that URL
         *     when the job completes (example shown for the AWS EC2 validation request above):
         *
         *     ```json
         *     {
         *       "event": "prediction.completed",
         *       "jobId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
         *       "jobType": "prediction_validation",
         *       "status": "completed",
         *       "completedAt": "2025-11-23T10:35:00Z",
         *       "data": {
         *         "validationResult": {
         *           "passed": false,
         *           "summary": "Infrastructure will fail under peak load due to CPU saturation",
         *           "peakMetrics": {
         *             "timestamp": 60,
         *             "traffic": 12000,
         *             "cpuUsage": 98,
         *             "latencyP95": 820,
         *             "errorRate": 8.4,
         *             "costPerHour": 3.20
         *           },
         *           "bottlenecksDetected": [
         *             "CPU saturation at 98%",
         *             "Error rate exceeds 5%"
         *           ],
         *           "failurePoints": [
         *             { "timestamp": 55, "traffic": 10500, "reason": "CPU saturation" }
         *           ],
         *           "recommendations": [
         *             "Scale out to 5 instances before peak",
         *             "Increase CPU threshold to 75%"
         *           ]
         *         }
         *       }
         *     }
         *     ```
         *
         *     The request is signed with HMAC-SHA256; verify the `X-Webhook-Signature` header
         *     against your `webhookSecret` before processing the payload.
         */
        post: operations["validateTrafficForecast"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/predictions/optimize-thresholds": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Find optimal autoscaling thresholds for traffic forecast
         * @description Tests multiple threshold combinations to find the best autoscaling configuration
         *     for the predicted traffic pattern.
         *
         *     When a `webhookUrl` is provided, the following payload is POSTed to that URL
         *     when the job completes (example shown for the AWS EC2 Auto Scaling request above):
         *
         *     ```json
         *     {
         *       "event": "prediction.completed",
         *       "jobId": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
         *       "jobType": "prediction_optimization",
         *       "status": "completed",
         *       "completedAt": "2025-11-23T10:35:00Z",
         *       "data": {
         *         "bestThresholds": {
         *           "scaleOutCpuThreshold": 70,
         *           "scaleInCpuThreshold": 30,
         *           "scaleOutThroughputThreshold": 75,
         *           "scaleInThroughputThreshold": 35,
         *           "scaleOutLatencyThreshold": 120,
         *           "cooldownSeconds": 180,
         *           "minInstances": 3,
         *           "maxInstances": 15
         *         }
         *       }
         *     }
         *     ```
         *
         *     The request is signed with HMAC-SHA256; verify the `X-Webhook-Signature` header
         *     against your `webhookSecret` before processing the payload.
         */
        post: operations["optimizeThresholds"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/predictions/jobs/{jobId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get prediction job status
         * @description Check the status and progress of a prediction job.
         *
         *     Use this endpoint when your agent cannot hold a long-lived SSE connection
         *     (e.g. serverless functions, short-lived scripts, environments that block
         *     streaming). Poll until the job reaches a terminal state, then fetch results
         *     from `GET /api/predictions/jobs/{jobId}/results`.
         *
         *     **Terminal states:** `completed`, `failed`, `cancelled`
         *
         *     **Client Code Sample (Python — polling with exponential back-off):**
         *
         *     Install with `pip install requests`.
         *
         *     ```python
         *     import os
         *     import time
         *     import requests
         *
         *
         *     def poll_prediction_job(job_id: str, api_token: str) -> dict:
         *         """Poll GET /predictions/jobs/{jobId} until a terminal state is reached."""
         *         url = f"https://your-host/api/predictions/jobs/{job_id}"
         *         headers = {"Authorization": f"Bearer {api_token}"}
         *
         *         delay = 2       # initial poll interval in seconds
         *         max_delay = 30  # cap backoff at 30 seconds
         *
         *         while True:
         *             response = requests.get(url, headers=headers, timeout=30)
         *             response.raise_for_status()
         *             job = response.json()
         *
         *             status = job.get("status", "unknown")
         *             job_type = job.get("type", "")
         *             print(f"[{job_type}] status={status}")
         *
         *             if status == "completed":
         *                 print("Job completed successfully.")
         *                 return job
         *
         *             elif status == "failed":
         *                 error = job.get("error", "unknown error")
         *                 raise RuntimeError(f"Prediction job failed: {error}")
         *
         *             elif status == "cancelled":
         *                 print("Job was cancelled.")
         *                 return job
         *
         *             # Still pending or running — wait, then back off
         *             time.sleep(delay)
         *             delay = min(delay * 2, max_delay)
         *
         *
         *     # Usage
         *     if __name__ == "__main__":
         *         result = poll_prediction_job(
         *             job_id="pred_aws_val001",
         *             api_token=os.environ["API_KEY"],
         *         )
         *         print("Final job record:", result)
         *     ```
         */
        get: operations["getPredictionJob"];
        put?: never;
        post?: never;
        /**
         * Cancel prediction job
         * @description Cancel a running prediction job. This endpoint is idempotent - calling it multiple times
         *     on the same job will return success without error.
         *
         *     **Cancellation Rules:**
         *     - Jobs with status "pending" or "running" will be cancelled
         *     - Jobs already "cancelled" will return success (idempotent behavior)
         *     - Jobs with status "completed" or "failed" cannot be cancelled (returns 409)
         *     - Cancelled jobs will have status set to "cancelled" and a cancelledAt timestamp
         */
        delete: operations["cancelPredictionJob"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/predictions/jobs/{jobId}/results": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get prediction job results
         * @description Retrieve results from a completed prediction job
         */
        get: operations["getPredictionResults"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/predictions/jobs/{jobId}/stream": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Stream prediction job progress in real-time
         * @description Stream prediction job progress using Server-Sent Events (SSE).
         *     This endpoint provides real-time updates as validation or threshold
         *     optimization steps are executed.
         *
         *     **SSE Event Types:**
         *     - `init`: Initial job state when connection is established
         *     - `progressUpdate`: Progress update sent periodically as the job runs
         *     - `completed`: Job has finished successfully (final event before connection closes)
         *     - `failed`: Job encountered an unrecoverable error (final event before connection closes)
         *     - `cancelled`: Job was cancelled via `DELETE /api/predictions/jobs/{jobId}` (final event before connection closes)
         *
         *     **Connection Behavior:**
         *     - Connection remains open until the job completes, fails, or is cancelled
         *     - Connection automatically closes when the job reaches a terminal state
         *
         *     **Agent Reconnection and Recovery Guide:**
         *
         *     After receiving a terminal SSE event (`completed`, `failed`, or `cancelled`) the server
         *     closes the connection. Each event requires a different agent response:
         *
         *     - **`completed`**: The job finished successfully. No reconnection is needed. Fetch the
         *       full results from `GET /api/predictions/jobs/{jobId}/results` to retrieve the
         *       `validationResult`, `bestThresholds`, and `recommendations`.
         *
         *     - **`failed`**: The job encountered an unrecoverable error. Inspect the `error` field in
         *       the event payload for the root cause. Transient errors (e.g. a simulation lookup
         *       timeout) are safe to retry — submit a new job via `POST /api/predictions/validate` or
         *       `POST /api/predictions/optimize-thresholds`. Permanent errors (e.g. an invalid
         *       simulation ID or a traffic forecast that is too short) should not be retried without
         *       fixing the underlying input first. Do not attempt to reconnect to the same `jobId`;
         *       it will not recover.
         *
         *     - **`cancelled`**: Cancellation is terminal and intentional. No retry is needed or
         *       recommended. If the cancellation was unintended, submit a new job.
         *
         *     **Handling unexpected connection drops (no terminal event received):**
         *
         *     If the SSE connection closes without a `completed`, `failed`, or `cancelled` event —
         *     for example due to a network interruption, proxy timeout, or server restart — the job
         *     may still be running. Use the following fallback strategy:
         *
         *     1. Poll `GET /api/predictions/jobs/{jobId}` to check the current `status` field.
         *     2. If `status` is `running` or `pending`, reconnect to this stream endpoint.
         *     3. If `status` is `completed`, `failed`, or `cancelled`, treat it the same as if you
         *        had received the corresponding terminal SSE event (see above).
         *
         *     Agents should implement an exponential back-off (e.g. 1 s, 2 s, 4 s, cap at 30 s)
         *     before each reconnection attempt to avoid hammering the server during an outage.
         */
        get: operations["streamPredictionJob"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/chaos/scenarios": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * List all available chaos scenarios
         * @description Returns a list of pre-built chaos engineering scenarios that can be used
         *     to test infrastructure resilience.
         */
        get: operations["listChaosScenarios"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/chaos/run": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Run a chaos engineering test
         * @description Execute a chaos engineering test by injecting failures into a simulation.
         *     Can use pre-built scenarios or custom failure injections.
         *
         *     This endpoint works with simulations built on **any supported provider**,
         *     including AWS, GCP, Azure, OCI, and **DigitalOcean**. When targeting a
         *     DigitalOcean-based simulation, failure types such as `kill_instance`
         *     affect Droplets, `zone_failure` targets DigitalOcean datacenter regions,
         *     and `database_crash` targets Managed Database clusters.
         */
        post: operations["runChaosTest"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/chaos/jobs/{jobId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get chaos job status
         * @description Get the current status of a chaos engineering test job
         */
        get: operations["getChaosJob"];
        put?: never;
        post?: never;
        /**
         * Cancel chaos engineering job
         * @description Cancel a running chaos engineering job. This endpoint is idempotent - calling it multiple times
         *     on the same job will return success without error.
         *
         *     **Cancellation Rules:**
         *     - Jobs with status "pending" or "running" will be cancelled
         *     - Jobs already "cancelled" will return success (idempotent behavior)
         *     - Jobs with status "completed" or "failed" cannot be cancelled (returns 409)
         *     - Cancelled jobs will have status set to "cancelled" and a cancelledAt timestamp
         */
        delete: operations["cancelChaosJob"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/chaos/jobs/{jobId}/results": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get chaos test results
         * @description Retrieve full results from a completed chaos test including resilience score,
         *     vulnerabilities detected, and recommendations for improvement.
         *
         *     Results are provider-agnostic and work identically for simulations running
         *     on AWS, GCP, Azure, OCI, and **DigitalOcean**. For DigitalOcean simulations the
         *     `timeline` events will reference DO resource types (e.g. Droplets, Managed
         *     Databases, Spaces), and recommendations will be framed around DO-specific
         *     mitigations such as enabling Managed Database standby nodes or distributing
         *     Droplets across multiple datacenters.
         *
         *     **Client Code Sample (JavaScript / Node.js):**
         *
         *     ```javascript
         *     async function getChaosResults(jobId, apiToken) {
         *       const response = await fetch(
         *         `https://your-host/api/chaos/jobs/${jobId}/results`,
         *         {
         *           headers: {
         *             Authorization: `Bearer ${apiToken}`,
         *             Accept: 'application/json',
         *           },
         *         }
         *       );
         *
         *       if (!response.ok) {
         *         throw new Error(`HTTP ${response.status}: ${await response.text()}`);
         *       }
         *
         *       const data = await response.json();
         *
         *       console.log('Resilience score:', data.resilienceScore.overall);
         *       console.log('Grade:', data.resilienceScore.grade);
         *
         *       if (data.vulnerabilities.length > 0) {
         *         console.log('Vulnerabilities found:');
         *         for (const vuln of data.vulnerabilities) {
         *           console.log(`  [${vuln.severity.toUpperCase()}] ${vuln.title}: ${vuln.description}`);
         *         }
         *       }
         *
         *       if (data.recommendations.length > 0) {
         *         console.log('Recommendations:');
         *         data.recommendations.forEach((rec, i) => console.log(`  ${i + 1}. ${rec}`));
         *       }
         *
         *       return data;
         *     }
         *     ```
         *
         *     **Client Code Sample (Python / httpx):**
         *
         *     ```python
         *     import httpx
         *
         *     def get_chaos_results(job_id: str, api_token: str) -> dict:
         *         url = f"https://your-host/api/chaos/jobs/{job_id}/results"
         *         headers = {
         *             "Authorization": f"Bearer {api_token}",
         *             "Accept": "application/json",
         *         }
         *
         *         with httpx.Client() as client:
         *             response = client.get(url, headers=headers)
         *             response.raise_for_status()
         *
         *         data = response.json()
         *
         *         resilience = data["resilienceScore"]
         *         print(f"Resilience score: {resilience['overall']} (Grade: {resilience['grade']})")
         *
         *         vulnerabilities = data.get("vulnerabilities", [])
         *         if vulnerabilities:
         *             print("Vulnerabilities found:")
         *             for vuln in vulnerabilities:
         *                 print(f"  [{vuln['severity'].upper()}] {vuln['title']}: {vuln['description']}")
         *
         *         recommendations = data.get("recommendations", [])
         *         if recommendations:
         *             print("Recommendations:")
         *             for i, rec in enumerate(recommendations, start=1):
         *                 print(f"  {i}. {rec}")
         *
         *         return data
         *     ```
         */
        get: operations["getChaosResults"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/chaos/jobs/{jobId}/stream": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Stream chaos test job progress in real-time
         * @description Stream chaos engineering job progress using Server-Sent Events (SSE).
         *     This endpoint provides real-time updates as failure injections are applied
         *     and resilience analysis progresses.
         *
         *     **SSE Event Types:**
         *     - `init`: Initial job state when connection is established
         *     - `progressUpdate`: Progress update sent periodically as the job runs
         *     - `completed`: Job has finished successfully (final event before connection closes)
         *     - `failed`: Job encountered an unrecoverable error (final event before connection closes)
         *     - `cancelled`: Job was cancelled via `DELETE /api/chaos/jobs/{jobId}` (final event before connection closes)
         *
         *     **Connection Behavior:**
         *     - Connection remains open until the job completes, fails, or is cancelled
         *     - Connection automatically closes when the job reaches a terminal state
         *
         *     **Agent Reconnection and Recovery Guide:**
         *
         *     After receiving a terminal SSE event (`completed`, `failed`, or `cancelled`) the server
         *     closes the connection. Each event requires a different agent response:
         *
         *     - **`completed`**: The job finished successfully. No reconnection is needed. Fetch the
         *       full results from `GET /api/chaos/jobs/{jobId}/results` to retrieve the
         *       `resilienceScore`, `vulnerabilities`, `recommendations`, and `timeline`.
         *
         *     - **`failed`**: The job encountered an unrecoverable error. Inspect the `error` field in
         *       the event payload for the root cause. Transient errors (e.g. a simulation state
         *       read timeout) are safe to retry — submit a new job via `POST /api/chaos/run`.
         *       Permanent errors (e.g. an invalid simulation ID or an unresolvable scenario) should
         *       not be retried without fixing the underlying input first. Do not attempt to reconnect
         *       to the same `jobId`; it will not recover.
         *
         *     - **`cancelled`**: Cancellation is terminal and intentional. No retry is needed or
         *       recommended. If the cancellation was unintended, submit a new job.
         *
         *     **Handling unexpected connection drops (no terminal event received):**
         *
         *     If the SSE connection closes without a `completed`, `failed`, or `cancelled` event —
         *     for example due to a network interruption, proxy timeout, or server restart — the job
         *     may still be running. Use the following fallback strategy:
         *
         *     1. Poll `GET /api/chaos/jobs/{jobId}` to check the current `status` field.
         *     2. If `status` is `running` or `pending`, reconnect to this stream endpoint.
         *     3. If `status` is `completed`, `failed`, or `cancelled`, treat it the same as if you
         *        had received the corresponding terminal SSE event (see above).
         *
         *     Agents should implement an exponential back-off (e.g. 1 s, 2 s, 4 s, cap at 30 s)
         *     before each reconnection attempt to avoid hammering the server during an outage.
         */
        get: operations["streamChaosJob"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/chaos/batch": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Create a batch of chaos test scenarios
         * @description Execute multiple chaos engineering tests in parallel. Each scenario can use either
         *     a pre-built scenario or custom failure injections. Results are aggregated across all tests.
         *
         *     **DigitalOcean compatibility:** All pre-built scenarios (`zone_failure`, `database_crash`,
         *     `network_partition`, etc.) and custom injection types (`kill_instance`, `kill_zone`,
         *     `database_slowdown`, etc.) work identically on DigitalOcean simulations.
         *     Use Droplet-specific resource IDs (e.g. `droplet-web-1`) and DO datacenter region names
         *     (e.g. `nyc3`, `sfo3`) when targeting a DigitalOcean simulation.
         */
        post: operations["createBatchChaosTest"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/chaos/batch/{batchId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get batch chaos job status and aggregated results
         * @description Retrieve the current status of a batch chaos test including aggregated
         *     resilience scores, vulnerabilities, and recommendations across all child jobs.
         */
        get: operations["getBatchChaosJob"];
        put?: never;
        post?: never;
        /**
         * Cancel batch chaos test and all child jobs
         * @description Cancel a running batch chaos test. This cancels all child jobs that are still running.
         *     This endpoint is idempotent - calling it multiple times on the same batch will return success.
         *
         *     **Cancellation Rules:**
         *     - Batches with status "pending" or "running" will be cancelled
         *     - All child jobs with status "pending" or "running" will also be cancelled
         *     - Batches already "cancelled" will return success (idempotent behavior)
         *     - Batches with status "completed" or "failed" cannot be cancelled (returns 409)
         */
        delete: operations["cancelBatchChaosJob"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/chaos/batch/{batchId}/results": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get detailed results for all child jobs in a batch
         * @description Retrieve detailed results for all chaos tests in a batch, including full
         *     child job details with resilience scores, vulnerabilities, timelines, and recommendations.
         *
         *     **DigitalOcean compatibility:** When the batch was submitted against a DigitalOcean
         *     simulation, child job timelines and recommendations reference DO resource types and
         *     datacenter region names (e.g. `nyc3`, `sfo3`). Droplet resource IDs (e.g. `droplet-web-1`)
         *     appear in failure event records and vulnerability details exactly as supplied in the
         *     original request.
         */
        get: operations["getBatchChaosResults"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/multi-cloud/explore": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /**
         * Explore multi-cloud deployment strategies
         * @description Analyze a workload profile and generate optimized multi-cloud deployment strategies.
         *     The system evaluates different provider combinations across AWS, GCP, Azure, OCI, and DigitalOcean
         *     based on cost, latency, and vendor lock-in considerations.
         *
         *     **DigitalOcean as a candidate provider:** DigitalOcean is a first-class candidate in every
         *     exploration run. It is particularly well-suited for cost-optimized workloads — Droplets and
         *     Managed Databases typically produce the lowest monthly spend in the comparison report. Set a
         *     high `cost` weight (e.g. 0.7+) and a moderate budget to see DigitalOcean-primary strategies
         *     appear at the top of `topStrategies` in the results.
         */
        post: operations["exploreMultiCloudStrategies"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/multi-cloud/jobs/{jobId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get multi-cloud exploration job status
         * @description Get the current status and progress of a multi-cloud strategy exploration job
         */
        get: operations["getMultiCloudJob"];
        put?: never;
        post?: never;
        /**
         * Cancel multi-cloud exploration job
         * @description Cancel a running multi-cloud exploration job. This endpoint is idempotent - calling it multiple times
         *     on the same job will return success without error.
         *
         *     **Cancellation Rules:**
         *     - Jobs with status "pending" or "running" will be cancelled
         *     - Jobs already "cancelled" will return success (idempotent behavior)
         *     - Jobs with status "completed" or "failed" cannot be cancelled (returns 409)
         *     - Cancelled jobs will have status set to "cancelled" and a cancelledAt timestamp
         */
        delete: operations["cancelMultiCloudJob"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/multi-cloud/jobs/{jobId}/results": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get multi-cloud exploration results
         * @description Retrieve results from a multi-cloud exploration job.
         *
         *     **Partial Results Support:**
         *     - Returns partial results even when the job is still "running"
         *     - Check the `isComplete` flag to determine if more results are coming
         *     - Agents can start analyzing strategies while generation continues
         *     - For real-time streaming, use the `/stream` endpoint instead
         */
        get: operations["getMultiCloudResults"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/multi-cloud/jobs/{jobId}/stream": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Stream multi-cloud exploration results in real-time
         * @description Stream multi-cloud exploration results using Server-Sent Events (SSE).
         *     This endpoint provides real-time updates as strategies are generated.
         *
         *     **SSE Event Types:**
         *     - `init`: Initial job state when connection is established
         *     - `strategyGenerated`: A new strategy has been generated (sent for each strategy)
         *     - `progressUpdate`: Progress update (sent periodically)
         *     - `completed`: Job has finished successfully (final event before connection closes)
         *     - `failed`: Job encountered an unrecoverable error (final event before connection closes)
         *     - `cancelled`: Job was cancelled via `DELETE /api/multi-cloud/jobs/{jobId}` (final event before connection closes)
         *
         *     **Connection Behavior:**
         *     - Connection remains open until job completes, fails, or is cancelled
         *     - All existing strategies are streamed immediately upon connection
         *     - New strategies are sent as they're generated
         *     - Connection automatically closes when job finishes
         *
         *     **Agent Reconnection and Recovery Guide:**
         *
         *     After receiving a terminal SSE event (`completed`, `failed`, or `cancelled`) the server
         *     closes the connection. Each event requires a different agent response:
         *
         *     - **`completed`**: The job finished successfully. No reconnection is needed. Fetch the
         *       full ranked results from `GET /api/multi-cloud/jobs/{jobId}/results` to retrieve
         *       `topStrategies`, `allStrategies`, and the `comparisonReport`. The results endpoint
         *       also accepts a `?providers=` filter if you only need strategies for specific clouds.
         *
         *     - **`failed`**: The job encountered an unrecoverable error. Inspect the `error` field in
         *       the event payload for the root cause. Transient errors (e.g. a pricing API timeout)
         *       are safe to retry — submit a new job via `POST /api/multi-cloud/jobs`. Permanent errors
         *       (e.g. an invalid scenario ID) should not be retried without fixing the underlying
         *       input first. Do not attempt to reconnect to the same `jobId`; it will not recover.
         *
         *     - **`cancelled`**: Cancellation is terminal and intentional. No retry is needed or
         *       recommended. If the cancellation was unintended, submit a new job.
         *
         *     **Handling unexpected connection drops (no terminal event received):**
         *
         *     If the SSE connection closes without a `completed`, `failed`, or `cancelled` event —
         *     for example due to a network interruption, proxy timeout, or server restart — the job
         *     may still be running. Use the following fallback strategy:
         *
         *     1. Poll `GET /api/multi-cloud/jobs/{jobId}` to check the current `status` field.
         *     2. If `status` is `running` or `pending`, reconnect to this stream endpoint. The
         *        server replays all strategies generated so far on reconnect, so no data is lost.
         *     3. If `status` is `completed`, `failed`, or `cancelled`, treat it the same as if you
         *        had received the corresponding terminal SSE event (see above).
         *
         *     Agents should implement an exponential back-off (e.g. 1 s, 2 s, 4 s, cap at 30 s)
         *     before each reconnection attempt to avoid hammering the server during an outage.
         *
         *     **Use Cases:**
         *     - Start analyzing strategies while generation continues
         *     - Real-time progress monitoring
         *     - Faster decision-making with early access to good strategies
         *
         *     **Client Code Sample (JavaScript / Node.js):**
         *
         *     `EventSource` does not support custom headers, so use `fetch` with a
         *     `ReadableStream` to pass the Bearer token:
         *
         *     ```javascript
         *     async function streamMultiCloudJob(jobId, apiToken) {
         *       const response = await fetch(
         *         `https://your-host/api/multi-cloud/jobs/${jobId}/stream`,
         *         {
         *           headers: {
         *             Authorization: `Bearer ${apiToken}`,
         *             Accept: 'text/event-stream',
         *           },
         *         }
         *       );
         *
         *       if (!response.ok) {
         *         throw new Error(`HTTP ${response.status}: ${await response.text()}`);
         *       }
         *
         *       const reader = response.body.getReader();
         *       const decoder = new TextDecoder();
         *       let buffer = '';
         *
         *       while (true) {
         *         const { value, done } = await reader.read();
         *         if (done) break;
         *
         *         buffer += decoder.decode(value, { stream: true });
         *
         *         // SSE frames are separated by double newlines
         *         const frames = buffer.split(/\n\n/);
         *         buffer = frames.pop(); // keep incomplete trailing frame
         *
         *         for (const frame of frames) {
         *           const eventLine = frame.match(/^event:\s*(.+)$/m);
         *           const dataLine  = frame.match(/^data:\s*(.+)$/m);
         *           if (!dataLine) continue;
         *
         *           const eventType = eventLine ? eventLine[1].trim() : 'message';
         *           const payload   = JSON.parse(dataLine[1]);
         *
         *           switch (eventType) {
         *             case 'init':
         *               console.log('Stream opened. Job status:', payload.status);
         *               break;
         *
         *             case 'progressUpdate':
         *               console.log(`Progress: ${payload.progress}% — ${payload.message}`);
         *               break;
         *
         *             case 'strategyGenerated':
         *               console.log('New strategy:', payload.strategy.name,
         *                 '| cost $' + payload.strategy.metrics.monthlyCost);
         *               break;
         *
         *             case 'completed':
         *               console.log('Job complete. Top strategy:',
         *                 payload.topStrategy?.name);
         *               reader.cancel(); // close the connection
         *               return payload;
         *           }
         *         }
         *       }
         *     }
         *
         *     // Usage
         *     streamMultiCloudJob('job_aws_perf123', process.env.API_KEY)
         *       .then(result => console.log('Final result:', result))
         *       .catch(err  => console.error('Stream error:', err));
         *     ```
         *
         *     **Client Code Sample (Python):**
         *
         *     Use `httpx` with streaming to consume the SSE connection.
         *     Install with `pip install httpx`.
         *
         *     ```python
         *     import httpx
         *     import json
         *     import os
         *
         *
         *     def stream_multi_cloud_job(job_id: str, api_token: str) -> dict:
         *         """Stream a multi-cloud exploration job and return the final payload."""
         *         url = f"https://your-host/api/multi-cloud/jobs/{job_id}/stream"
         *         headers = {
         *             "Authorization": f"Bearer {api_token}",
         *             "Accept": "text/event-stream",
         *         }
         *
         *         with httpx.stream("GET", url, headers=headers, timeout=None) as response:
         *             response.raise_for_status()
         *
         *             buffer = ""
         *
         *             for chunk in response.iter_text():
         *                 buffer += chunk
         *
         *                 # SSE frames are separated by double newlines
         *                 *frames, buffer = buffer.split("\n\n")
         *
         *                 for frame in frames:
         *                     event_type = "message"
         *                     data_str = None
         *
         *                     for line in frame.splitlines():
         *                         if line.startswith("event:"):
         *                             event_type = line[len("event:"):].strip()
         *                         elif line.startswith("data:"):
         *                             data_str = line[len("data:"):].strip()
         *
         *                     if data_str is None:
         *                         continue
         *
         *                     payload = json.loads(data_str)
         *
         *                     if event_type == "init":
         *                         print(f"Stream opened. Job status: {payload['status']}")
         *
         *                     elif event_type == "progressUpdate":
         *                         print(f"Progress: {payload['progress']}% — {payload.get('message', '')}")
         *
         *                     elif event_type == "strategyGenerated":
         *                         strategy = payload["strategy"]
         *                         cost = strategy["metrics"]["monthlyCost"]
         *                         print(f"New strategy: {strategy['name']} | cost ${cost}")
         *
         *                     elif event_type == "completed":
         *                         top = payload.get("topStrategy", {})
         *                         print(f"Job complete. Top strategy: {top.get('name')}")
         *                         return payload  # connection closes when the context exits
         *
         *         return {}
         *
         *
         *     # Usage
         *     if __name__ == "__main__":
         *         result = stream_multi_cloud_job(
         *             job_id="job_aws_perf123",
         *             api_token=os.environ["API_KEY"],
         *         )
         *         print("Final result:", result)
         *     ```
         *
         *     **Agent Reconnection Code Sample — with exponential back-off (JavaScript / Node.js):**
         *
         *     The samples above cover the happy path. The snippet below adds the full
         *     reconnect loop: detecting a connection drop without a terminal event,
         *     polling the status endpoint as a fallback, and reconnecting with
         *     exponential back-off. All three terminal events (`completed`, `failed`,
         *     `cancelled`) are handled explicitly.
         *
         *     ```javascript
         *     const BASE_URL = 'https://your-host/api';
         *
         *     // Fetch the current job state without opening an SSE stream.
         *     async function pollJobStatus(jobId, apiToken) {
         *       const res = await fetch(`${BASE_URL}/multi-cloud/jobs/${jobId}`, {
         *         headers: { Authorization: `Bearer ${apiToken}` },
         *       });
         *       if (!res.ok) throw new Error(`Poll failed: HTTP ${res.status}`);
         *       return res.json(); // { status, progress, ... }
         *     }
         *
         *     async function streamWithReconnect(jobId, apiToken) {
         *       let delay    = 1_000;  // back-off starts at 1 s
         *       const MAX_DELAY = 30_000;
         *
         *       while (true) {
         *         let receivedTerminal = false;
         *
         *         try {
         *           // ── Open the SSE connection ──────────────────────────────────
         *           const response = await fetch(
         *             `${BASE_URL}/multi-cloud/jobs/${jobId}/stream`,
         *             {
         *               headers: {
         *                 Authorization: `Bearer ${apiToken}`,
         *                 Accept: 'text/event-stream',
         *               },
         *             }
         *           );
         *
         *           if (!response.ok) {
         *             throw new Error(`HTTP ${response.status}: ${await response.text()}`);
         *           }
         *
         *           const reader  = response.body.getReader();
         *           const decoder = new TextDecoder();
         *           let buffer    = '';
         *
         *           outer: while (true) {
         *             const { value, done } = await reader.read();
         *             if (done) break; // server closed — check receivedTerminal below
         *
         *             buffer += decoder.decode(value, { stream: true });
         *             const frames = buffer.split(/\n\n/);
         *             buffer = frames.pop(); // keep any incomplete trailing frame
         *
         *             for (const frame of frames) {
         *               const eventLine = frame.match(/^event:\s*(.+)$/m);
         *               const dataLine  = frame.match(/^data:\s*(.+)$/m);
         *               if (!dataLine) continue;
         *
         *               const eventType = eventLine ? eventLine[1].trim() : 'message';
         *               const payload   = JSON.parse(dataLine[1]);
         *
         *               switch (eventType) {
         *                 case 'init':
         *                   // Successful (re)connect — reset back-off timer.
         *                   console.log('Connected. Job status:', payload.status);
         *                   delay = 1_000;
         *                   break;
         *
         *                 case 'progressUpdate':
         *                   console.log(`Progress: ${payload.progress}% — ${payload.message}`);
         *                   break;
         *
         *                 case 'strategyGenerated':
         *                   console.log('Strategy:', payload.strategy.name,
         *                     '| $' + payload.strategy.metrics.monthlyCost + '/mo');
         *                   break;
         *
         *                 // ── Terminal events ──────────────────────────────────────
         *                 case 'completed':
         *                   console.log('Job complete. Top strategy:', payload.topStrategy?.name);
         *                   receivedTerminal = true;
         *                   reader.cancel();
         *                   return { status: 'completed', payload };
         *
         *                 case 'failed':
         *                   console.error('Job failed:', payload.error);
         *                   receivedTerminal = true;
         *                   reader.cancel();
         *                   return { status: 'failed', payload };
         *
         *                 case 'cancelled':
         *                   console.warn('Job cancelled.');
         *                   receivedTerminal = true;
         *                   reader.cancel();
         *                   return { status: 'cancelled', payload };
         *               }
         *
         *               if (receivedTerminal) break outer;
         *             }
         *           }
         *         } catch (err) {
         *           // Network error, proxy timeout, or server restart.
         *           console.warn('SSE connection error:', err.message);
         *         }
         *
         *         // Already handled cleanly — exit the retry loop.
         *         if (receivedTerminal) break;
         *
         *         // ── Fallback: poll before reconnecting ───────────────────────────
         *         // The connection dropped without a terminal event. The job may
         *         // still be running, or it may have finished while we were offline.
         *         try {
         *           const job = await pollJobStatus(jobId, apiToken);
         *
         *           if (job.status === 'completed') {
         *             console.log('Recovered via poll — job already completed.');
         *             return { status: 'completed', payload: job };
         *           }
         *           if (job.status === 'failed') {
         *             console.error('Recovered via poll — job failed:', job.error);
         *             return { status: 'failed', payload: job };
         *           }
         *           if (job.status === 'cancelled') {
         *             console.warn('Recovered via poll — job was cancelled.');
         *             return { status: 'cancelled', payload: job };
         *           }
         *           // status is 'running' or 'pending' — reconnect after back-off.
         *           console.log(`Job still ${job.status}. Reconnecting in ${delay / 1000}s…`);
         *         } catch (pollErr) {
         *           console.warn('Poll also failed:', pollErr.message, '— will retry.');
         *         }
         *
         *         // ── Exponential back-off ─────────────────────────────────────────
         *         await new Promise(resolve => setTimeout(resolve, delay));
         *         delay = Math.min(delay * 2, MAX_DELAY);
         *       }
         *     }
         *
         *     // Usage
         *     streamWithReconnect('job_aws_perf123', process.env.API_KEY)
         *       .then(({ status, payload }) => console.log('Done:', status, payload))
         *       .catch(err => console.error('Unrecoverable error:', err));
         *     ```
         *
         *     **Agent Reconnection Code Sample — with exponential back-off (Python):**
         *
         *     ```python
         *     import httpx
         *     import json
         *     import os
         *     import time
         *
         *
         *     BASE_URL = "https://your-host/api"
         *     TERMINAL_STATUSES = {"completed", "failed", "cancelled"}
         *
         *
         *     def poll_job_status(job_id: str, api_token: str) -> dict:
         *         """Fetch the current job state without opening an SSE stream."""
         *         url = f"{BASE_URL}/multi-cloud/jobs/{job_id}"
         *         headers = {"Authorization": f"Bearer {api_token}"}
         *         response = httpx.get(url, headers=headers, timeout=10)
         *         response.raise_for_status()
         *         return response.json()  # {"status": ..., "progress": ..., ...}
         *
         *
         *     def stream_with_reconnect(job_id: str, api_token: str) -> dict:
         *         """
         *         Open the SSE stream and reconnect automatically after unexpected drops.
         *
         *         Polls the status endpoint when the connection closes without a terminal
         *         event, and applies exponential back-off before each reconnection attempt.
         *
         *         Returns {"status": <terminal_status>, "payload": <event_payload>}.
         *         """
         *         url = f"{BASE_URL}/multi-cloud/jobs/{job_id}/stream"
         *         headers = {
         *             "Authorization": f"Bearer {api_token}",
         *             "Accept": "text/event-stream",
         *         }
         *         delay     = 1.0   # back-off starts at 1 s
         *         max_delay = 30.0
         *
         *         while True:
         *             received_terminal = False
         *
         *             try:
         *                 # ── Open the SSE connection ──────────────────────────────
         *                 with httpx.stream("GET", url, headers=headers, timeout=None) as response:
         *                     response.raise_for_status()
         *                     delay  = 1.0  # reset back-off on successful connect
         *                     buffer = ""
         *
         *                     for chunk in response.iter_text():
         *                         buffer += chunk
         *                         *frames, buffer = buffer.split("\n\n")
         *
         *                         for frame in frames:
         *                             event_type = "message"
         *                             data_str   = None
         *
         *                             for line in frame.splitlines():
         *                                 if line.startswith("event:"):
         *                                     event_type = line[len("event:"):].strip()
         *                                 elif line.startswith("data:"):
         *                                     data_str = line[len("data:"):].strip()
         *
         *                             if data_str is None:
         *                                 continue
         *
         *                             payload = json.loads(data_str)
         *
         *                             if event_type == "init":
         *                                 # Successful (re)connect — reset back-off timer.
         *                                 print(f"Connected. Job status: {payload['status']}")
         *
         *                             elif event_type == "progressUpdate":
         *                                 print(f"Progress: {payload['progress']}% — {payload.get('message', '')}")
         *
         *                             elif event_type == "strategyGenerated":
         *                                 s = payload["strategy"]
         *                                 print(f"Strategy: {s['name']} | ${s['metrics']['monthlyCost']}/mo")
         *
         *                             # ── Terminal events ──────────────────────────
         *                             elif event_type == "completed":
         *                                 top = payload.get("topStrategy", {})
         *                                 print(f"Job complete. Top strategy: {top.get('name')}")
         *                                 received_terminal = True
         *                                 return {"status": "completed", "payload": payload}
         *
         *                             elif event_type == "failed":
         *                                 print(f"Job failed: {payload.get('error')}")
         *                                 received_terminal = True
         *                                 return {"status": "failed", "payload": payload}
         *
         *                             elif event_type == "cancelled":
         *                                 print("Job cancelled.")
         *                                 received_terminal = True
         *                                 return {"status": "cancelled", "payload": payload}
         *
         *                             if received_terminal:
         *                                 break
         *
         *             except (httpx.HTTPError, httpx.StreamError) as exc:
         *                 # Network error, proxy timeout, or server restart.
         *                 print(f"SSE connection error: {exc}")
         *
         *             # Already handled cleanly — exit the retry loop.
         *             if received_terminal:
         *                 break
         *
         *             # ── Fallback: poll before reconnecting ───────────────────────
         *             # The connection dropped without a terminal event. The job may
         *             # still be running, or it may have finished while we were offline.
         *             try:
         *                 job = poll_job_status(job_id, api_token)
         *
         *                 if job["status"] in TERMINAL_STATUSES:
         *                     print(f"Recovered via poll — job {job['status']}.")
         *                     return {"status": job["status"], "payload": job}
         *
         *                 # status is 'running' or 'pending' — reconnect after back-off.
         *                 print(f"Job still {job['status']}. Reconnecting in {delay:.0f}s…")
         *
         *             except httpx.HTTPError as exc:
         *                 print(f"Poll also failed: {exc} — will retry.")
         *
         *             # ── Exponential back-off ─────────────────────────────────────
         *             time.sleep(delay)
         *             delay = min(delay * 2, max_delay)
         *
         *         return {}
         *
         *
         *     # Usage
         *     if __name__ == "__main__":
         *         result = stream_with_reconnect(
         *             job_id="job_aws_perf123",
         *             api_token=os.environ["API_KEY"],
         *         )
         *         print("Done:", result["status"], result.get("payload", {}))
         *     ```
         */
        get: operations["streamMultiCloudJob"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
};
export type webhooks = Record<string, never>;
export type components = {
    schemas: {
        /** @description Response returned when an API key is successfully created (either via admin POST /keys or via POST /keys/register) */
        ApiKeyCreatedResponse: {
            /**
             * @description Unique identifier for the created API key
             * @example 3f9a1b2c-4d5e-6f7a-8b9c-0d1e2f3a4b5c
             */
            id?: string;
            /**
             * @description The plain-text API key. Store this immediately — it is shown only once.
             * @example cwm_live_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2
             */
            key?: string;
            /**
             * @description Redacted prefix used to identify the key in listings
             * @example cwm_live_a1b2c3d4e5f6a1b2...
             */
            keyPrefix?: string;
            /** @example canvas-cloud-ai-prod */
            name?: string;
            /**
             * @example [
             *       "read",
             *       "write"
             *     ]
             */
            scopes?: ("read" | "write" | "admin")[];
            /** @example 1000 */
            rateLimit?: number;
            /**
             * Format: date-time
             * @example 2026-05-10T17:00:00.000Z
             */
            createdAt?: string;
            /** Format: date-time */
            expiresAt?: string | null;
            /** @example Store this API key securely. You won't be able to see it again. */
            message?: string;
        };
        /** @description Response returned when a registration token is minted. The plain `token` value is shown only once. */
        RegistrationTokenCreatedResponse: {
            /**
             * @description Unique identifier for the registration token
             * @example 7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d
             */
            id?: string;
            /**
             * @description The plain-text registration token. Share this with the recipient immediately — it will not be shown again.
             * @example cwm_reg_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2
             */
            token?: string;
            /**
             * @description Redacted prefix used to identify the token in listings
             * @example cwm_reg_a1b2c3d4e5f6a1b2...
             */
            tokenPrefix?: string;
            /** @example canvas-cloud-ai */
            name?: string;
            /**
             * @example [
             *       "read",
             *       "write"
             *     ]
             */
            scopes?: ("read" | "write" | "admin")[];
            /** @example 1000 */
            rateLimit?: number;
            /**
             * Format: date-time
             * @example 2026-06-01T00:00:00Z
             */
            expiresAt?: string | null;
            /**
             * Format: date-time
             * @example 2026-05-10T17:00:00.000Z
             */
            createdAt?: string;
            /** @example Share this token with the client. It can only be used once and will not be shown again. */
            message?: string;
        };
        /** @description Summary of a registration token as returned by GET /register-tokens (plain token value is never included) */
        RegistrationTokenSummary: {
            /** @example 7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d */
            id?: string;
            /** @example cwm_reg_a1b2c3d4e5f6a1b2... */
            tokenPrefix?: string;
            /** @example canvas-cloud-ai */
            name?: string;
            /**
             * @example [
             *       "read",
             *       "write"
             *     ]
             */
            scopes?: ("read" | "write" | "admin")[];
            /** @example 1000 */
            rateLimit?: number;
            /**
             * Format: date-time
             * @example 2026-06-01T00:00:00Z
             */
            expiresAt?: string | null;
            /**
             * Format: date-time
             * @description Set when the token was consumed. Null if still pending.
             */
            usedAt?: string | null;
            /** @example true */
            isActive?: boolean;
            /**
             * @description ID of the admin API key that created this token
             * @example 1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d
             */
            createdByKeyId?: string;
            /**
             * Format: date-time
             * @example 2026-05-10T17:00:00.000Z
             */
            createdAt?: string;
            /**
             * @description Computed status of the token
             * @example pending
             * @enum {string}
             */
            status?: "pending" | "used" | "expired" | "revoked";
        };
        Resource: {
            /**
             * @description Unique resource identifier
             * @example ec2-1
             */
            id: string;
            /**
             * @description Resource type
             * @example compute
             * @enum {string}
             */
            type: "compute" | "network" | "database" | "storage";
            /**
             * @description Human-readable resource name
             * @example Web Server 1
             */
            name: string;
            /**
             * @description Cloud provider
             * @example aws
             * @enum {string}
             */
            provider: "aws" | "gcp" | "azure" | "oci" | "digitalocean";
            /**
             * @description Current resource status
             * @default healthy
             * @enum {string}
             */
            status: "healthy" | "warning" | "critical" | "offline";
            /** @description Provider-specific resource characteristics */
            characteristics?: {
                /** @example ec2 */
                serviceFamily?: string;
                /** @example m5.large */
                size?: string;
                /** @example 2000 */
                maxThroughput?: number;
                /** @example 3 */
                baseLatency?: number;
            };
        };
        Connection: {
            /** @description ID of the source resource */
            sourceId: string;
            /** @description ID of the target resource */
            targetId: string;
        };
        Simulation: {
            /**
             * Format: uuid
             * @description Unique simulation identifier
             */
            id?: string;
            name?: string;
            description?: string;
            resources?: components["schemas"]["Resource"][];
            connections?: components["schemas"]["Connection"][];
            traffic?: number;
            /** @description Current simulation time step */
            currentTime?: number;
        };
        EpisodeConfig: {
            /**
             * @description Maximum steps per episode
             * @example 300
             */
            maxSteps: number;
            /**
             * @description Traffic pattern to simulate
             * @default constant
             * @example ramp
             * @enum {string}
             */
            targetTrafficPattern: "constant" | "ramp" | "burst" | "step" | "wave" | "custom";
            /**
             * @description Starting traffic load (requests/sec)
             * @default 1000
             * @example 5000
             */
            initialTraffic: number;
            targetSLA: {
                /**
                 * @description Target P95 latency threshold (ms)
                 * @example 200
                 */
                maxLatencyP95: number;
                /**
                 * @description Target maximum error rate (%)
                 * @example 1
                 */
                maxErrorRate: number;
            };
            /**
             * @description Target cost budget per hour (USD)
             * @default 10
             * @example 5
             */
            costBudgetPerHour: number;
            /**
             * @description Whether to inject random failures
             * @default false
             */
            enableFailures: boolean;
        };
        RLEnvironment: {
            /** Format: uuid */
            id?: string;
            /** Format: uuid */
            simulationId?: string;
            episodeConfig?: components["schemas"]["EpisodeConfig"];
            /**
             * @description Current step number in episode
             * @example 42
             */
            currentStep?: number;
            /**
             * @description Cumulative reward so far
             * @example 12.45
             */
            totalReward?: number;
            /**
             * @description Whether episode is still running
             * @example true
             */
            isActive?: boolean;
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            updatedAt?: string;
            /**
             * @description Webhook delivery status (for episode completion)
             * @example delivered
             * @enum {string}
             */
            webhookDeliveryStatus?: "pending" | "delivered" | "failed";
            /**
             * @description Number of webhook delivery attempts made
             * @example 1
             */
            webhookDeliveryAttempts?: number;
            /** @description Error message if webhook delivery failed */
            webhookDeliveryError?: string;
            /**
             * Format: date-time
             * @description Timestamp when webhook was successfully delivered
             */
            webhookDeliveredAt?: string;
        };
        Action: {
            /**
             * @description Type of action to execute
             * @enum {string}
             */
            type: "adjust_threshold" | "scale_out" | "scale_in" | "add_resource" | "remove_resource";
            parameters: components["schemas"]["AdjustThresholdParams"] | components["schemas"]["ScaleParams"] | components["schemas"]["ResourceParams"];
        };
        /** @description Parameters for adjust_threshold action */
        AdjustThresholdParams: {
            /**
             * @description CPU utilization threshold for scaling (%)
             * @example 70
             */
            cpuThreshold?: number;
            /**
             * @description Throughput utilization threshold (%)
             * @example 75
             */
            throughputThreshold?: number;
            /**
             * @description Latency threshold for scaling (ms)
             * @example 180
             */
            latencyThreshold?: number;
        };
        ScaleParams: {
            /**
             * @description Number of instances to add or remove
             * @example 2
             */
            instanceCount: number;
        };
        ResourceParams: {
            resource: components["schemas"]["Resource"];
            /** @description For remove_resource action, ID of resource to remove */
            resourceId?: string;
        };
        Observation: {
            /** @description Current system metrics */
            metrics: {
                /**
                 * @description Average CPU utilization (%)
                 * @example 65.3
                 */
                cpuUsage?: number;
                /**
                 * @description P50 latency (ms)
                 * @example 45
                 */
                latencyP50?: number;
                /**
                 * @description P95 latency (ms)
                 * @example 91
                 */
                latencyP95?: number;
                /**
                 * @description Error rate (%)
                 * @example 0.5
                 */
                errorRate?: number;
                /**
                 * @description Current throughput (requests/sec)
                 * @example 4500
                 */
                throughput?: number;
                /**
                 * @description Current hourly cost (USD)
                 * @example 0.31
                 */
                costPerHour?: number;
            };
            /** @description Current resources in simulation */
            resources: components["schemas"]["Resource"][];
            /**
             * @description Current traffic load
             * @example 5000
             */
            traffic: number;
            /**
             * @description Current simulation time step
             * @example 42
             */
            currentTime: number;
            /** @description Current autoscaling configuration */
            autoscalingConfig?: {
                scaleOutCpuThreshold?: number;
                scaleInCpuThreshold?: number;
                maxInstances?: number;
                minInstances?: number;
            };
            /** @description Recent scaling actions */
            scalingHistory?: {
                timestamp?: number;
                action?: string;
                reason?: string;
            }[];
            /** @description Recent system events */
            recentEvents?: Record<string, never>[];
        };
        Reward: {
            /**
             * @description Total reward for this step (weighted sum of components)
             * @example 0.312
             */
            total: number;
            /** @description Individual reward components before weighting */
            components: {
                /**
                 * @description Performance score (0-1, based on latency and errors)
                 * @example 0.578
                 */
                performance?: number;
                /**
                 * @description Cost efficiency score (0-1, based on budget)
                 * @example 1
                 */
                cost?: number;
                /**
                 * @description Stability score (-1 to 1, penalizes excessive changes)
                 * @example -0.2
                 */
                stability?: number;
                /**
                 * @description SLA compliance score (-1 to 0, penalizes violations)
                 * @example -0.5
                 */
                sla?: number;
            };
            /** @description Raw metrics used for reward calculation */
            metrics?: {
                avgLatency?: number;
                errorRate?: number;
                costPerHour?: number;
                slaViolations?: number;
            };
        };
        AutoscalingConfig: {
            scaleOutCpuThreshold?: number;
            scaleInCpuThreshold?: number;
            scaleOutThroughputThreshold?: number;
            scaleInThroughputThreshold?: number;
            scaleOutLatencyThreshold?: number;
            cooldownSeconds?: number;
            minInstances?: number;
            maxInstances?: number;
        };
        OptimizationGoals: {
            /**
             * @description Primary optimization objective
             * @example minimize_cost
             * @enum {string}
             */
            primary: "minimize_cost" | "maximize_performance" | "balance";
            constraints?: {
                /**
                 * @description Maximum acceptable cost per hour (USD)
                 * @example 10
                 */
                max_cost_per_hour?: number;
                /**
                 * @description Minimum required throughput (requests/second)
                 * @example 5000
                 */
                min_throughput?: number;
                /**
                 * @description Maximum acceptable P95 latency (milliseconds)
                 * @example 200
                 */
                max_latency_p95?: number;
            };
            /** @description Custom weights for multi-objective optimization */
            weights?: {
                /** @example 0.4 */
                cost?: number;
                /** @example 0.4 */
                performance?: number;
                /** @example 0.2 */
                stability?: number;
            };
        };
        OptimizationRecommendation: {
            /**
             * @description Recommendation ranking (1 is best)
             * @example 1
             */
            rank?: number;
            /**
             * @description Descriptive name
             * @example Cost-Optimized Configuration
             */
            name?: string;
            /** @example Reduces costs by 38% while maintaining performance */
            description?: string;
            /** @description Modified simulation configuration */
            simulationSnapshot?: {
                resources?: components["schemas"]["Resource"][];
                connections?: components["schemas"]["Connection"][];
                autoscalingConfig?: components["schemas"]["AutoscalingConfig"];
            };
            metrics?: {
                cost_per_hour?: number;
                latency_p95?: number;
                throughput?: number;
                error_rate?: number;
            };
            /**
             * @example [
             *       "Reduced cost by 38%",
             *       "Resolved CPU saturation"
             *     ]
             */
            improvements?: string[];
            /**
             * @example [
             *       "Changed web-server-1 from m5.large to t3.medium"
             *     ]
             */
            changes?: string[];
            /**
             * @description Overall score based on goals
             * @example 87.5
             */
            score?: number;
            /**
             * @description Cost savings vs baseline
             * @example 38
             */
            costSavingsPercent?: number;
        };
        OptimizationJob: {
            /** Format: uuid */
            id?: string;
            /**
             * @example completed
             * @enum {string}
             */
            status?: "pending" | "running" | "completed" | "failed";
            /** @example 57 */
            variantsGenerated?: number;
            /** @example 57 */
            variantsCompleted?: number;
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            completedAt?: string;
            /** @description Error message if failed */
            error?: string;
            /**
             * @description Webhook delivery status
             * @example delivered
             * @enum {string}
             */
            webhookDeliveryStatus?: "pending" | "delivered" | "failed";
            /**
             * @description Number of webhook delivery attempts made
             * @example 1
             */
            webhookDeliveryAttempts?: number;
            /** @description Error message if webhook delivery failed */
            webhookDeliveryError?: string;
            /**
             * Format: date-time
             * @description Timestamp when webhook was successfully delivered
             */
            webhookDeliveredAt?: string;
        };
        TrafficForecastPoint: {
            /**
             * @description Time offset in simulation steps
             * @example 30
             */
            timestamp: number;
            /**
             * @description Requests per second at this timestamp
             * @example 12000
             */
            rps: number;
            /**
             * @description Optional label for this data point
             * @example Peak - Noon
             */
            label?: string;
        };
        TrafficForecast: {
            /**
             * @description Name of the traffic forecast
             * @example Black Friday 2025
             */
            name: string;
            /**
             * @description Optional description
             * @example Predicted traffic spike for sale event
             */
            description?: string;
            /** @description Traffic data points over time */
            dataPoints: components["schemas"]["TrafficForecastPoint"][];
            /**
             * @description Peak requests per second (calculated)
             * @example 12000
             */
            peakRPS?: number;
            /**
             * @description Average requests per second (calculated)
             * @example 5200
             */
            avgRPS?: number;
        };
        ValidationResult: {
            /**
             * @description Whether infrastructure can handle the forecast
             * @example false
             */
            passed?: boolean;
            /**
             * @description Summary of validation results
             * @example Infrastructure will fail under peak load due to CPU saturation
             */
            summary?: string;
            /** @description Metrics at peak traffic */
            peakMetrics?: {
                timestamp?: number;
                traffic?: number;
                cpuUsage?: number;
                latencyP95?: number;
                errorRate?: number;
                costPerHour?: number;
            };
            /**
             * @description List of bottlenecks found
             * @example [
             *       "CPU saturation at 98%",
             *       "Error rate exceeds 5%"
             *     ]
             */
            bottlenecksDetected?: string[];
            /** @description Time points where infrastructure fails */
            failurePoints?: {
                timestamp?: number;
                traffic?: number;
                reason?: string;
            }[];
            /**
             * @description Recommended fixes
             * @example [
             *       "Scale out to 5 instances before peak",
             *       "Increase CPU threshold to 75%"
             *     ]
             */
            recommendations?: string[];
        };
        ThresholdTestResult: {
            /**
             * @description CPU threshold for scaling out
             * @example 70
             */
            scaleOutCpuThreshold?: number;
            /**
             * @description CPU threshold for scaling in
             * @example 30
             */
            scaleInCpuThreshold?: number;
            /** @example 80 */
            scaleOutThroughputThreshold?: number;
            /** @example 40 */
            scaleInThroughputThreshold?: number;
            /** @description Performance metrics for this configuration */
            metrics?: {
                /** @example 4.5 */
                cost_per_hour?: number;
                /** @example 142 */
                latency_p95?: number;
                /** @example 0.8 */
                error_rate?: number;
                /** @example 11500 */
                throughput?: number;
                /** @example 12 */
                scaling_events?: number;
            };
            /**
             * @example [
             *       "CPU spike during rapid scale-out"
             *     ]
             */
            bottlenecks?: string[];
            /**
             * @description Overall score (0-100)
             * @example 87.5
             */
            score?: number;
            /**
             * @description Whether this configuration meets requirements
             * @example true
             */
            passed?: boolean;
        };
        PredictionRecommendation: {
            /**
             * @description Recommendation ranking (1 is best)
             * @example 1
             */
            rank?: number;
            /**
             * @description Short title for recommendation
             * @example Proactive scaling before peak
             */
            title?: string;
            /** @example Scale out 2 hours before predicted peak to avoid saturation */
            description?: string;
            /**
             * @example critical
             * @enum {string}
             */
            priority?: "critical" | "high" | "medium" | "low";
            /**
             * @description Specific action to take
             * @example Set CPU threshold to 65% and enable predictive scaling
             */
            action?: string;
            /** @example Prevents 98% CPU saturation, reduces error rate to <1% */
            expectedImpact?: string;
            autoscalingConfig?: components["schemas"]["AutoscalingConfig"];
            /** @description Specific resource modifications */
            resourceChanges?: {
                resourceId?: string;
                change?: string;
                reason?: string;
            }[];
        };
        PredictionJob: {
            /** Format: uuid */
            id?: string;
            /**
             * @description Type of prediction job
             * @example validation
             * @enum {string}
             */
            type?: "validation" | "threshold_optimization";
            /**
             * @example completed
             * @enum {string}
             */
            status?: "pending" | "running" | "completed" | "failed";
            /** @description ID of simulation being tested */
            baseSimulationId?: string;
            trafficForecast?: components["schemas"]["TrafficForecast"];
            validationResult?: components["schemas"]["ValidationResult"];
            /** @description Results from testing different thresholds */
            thresholdTests?: components["schemas"]["ThresholdTestResult"][];
            bestThresholds?: components["schemas"]["AutoscalingConfig"];
            recommendations?: components["schemas"]["PredictionRecommendation"][];
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            completedAt?: string;
            /** @description Error message if failed */
            error?: string;
            /**
             * @description Webhook delivery status
             * @example delivered
             * @enum {string}
             */
            webhookDeliveryStatus?: "pending" | "delivered" | "failed";
            /**
             * @description Number of webhook delivery attempts made
             * @example 1
             */
            webhookDeliveryAttempts?: number;
            /** @description Error message if webhook delivery failed */
            webhookDeliveryError?: string;
            /**
             * Format: date-time
             * @description Timestamp when webhook was successfully delivered
             */
            webhookDeliveredAt?: string;
        };
        ChaosInjectionConfig: {
            /**
             * @description Type of failure to inject
             * @example kill_instance
             * @enum {string}
             */
            type: "kill_instance" | "network_delay" | "database_slowdown" | "cpu_spike" | "memory_pressure" | "kill_zone";
            /**
             * @description ID of the resource to target (or zone ID for kill_zone)
             * @example web-1
             */
            targetId: string;
            /**
             * @description Simulation step when failure should be injected
             * @example 50
             */
            injectionTime: number;
            /**
             * @description How long the failure lasts (in steps, optional)
             * @example 20
             */
            duration?: number;
            /**
             * @description Severity multiplier (0.0-1.0, optional)
             * @example 0.8
             */
            severity?: number;
        };
        ResilienceScore: {
            /**
             * @description Overall resilience score (0-100)
             * @example 72.5
             */
            overall?: number;
            /**
             * @description Letter grade for resilience
             * @example C
             * @enum {string}
             */
            grade?: "A" | "B" | "C" | "D" | "F";
            metrics?: components["schemas"]["ResilienceMetrics"];
        };
        ResilienceMetrics: {
            /**
             * @description Time to recover from failures (in simulation seconds)
             * @example 45.2
             */
            recoveryTimeSeconds?: number;
            /**
             * @description Percentage of time system was available
             * @example 94.3
             */
            availabilityPercent?: number;
            /**
             * @description Average time to detect failures (seconds)
             * @example 3.5
             */
            meanTimeToDetect?: number;
            /**
             * @description Average time to recover from failures (seconds)
             * @example 12.8
             */
            meanTimeToRecover?: number;
            /**
             * @description Error rate percentage during failures
             * @example 15.7
             */
            errorRateDuringFailure?: number;
        };
        Vulnerability: {
            /**
             * @description Unique vulnerability identifier
             * @example zone_dependency
             */
            id?: string;
            /**
             * @description Severity level
             * @example high
             * @enum {string}
             */
            severity?: "critical" | "high" | "medium" | "low";
            /**
             * @description Short vulnerability title
             * @example Single Availability Zone Dependency
             */
            title?: string;
            /**
             * @description Detailed description of the vulnerability
             * @example All web servers are in the same availability zone. A zone failure causes complete service outage.
             */
            description?: string;
            /**
             * @description Impact on the system
             * @example 100% service downtime if us-east-1a fails
             */
            impact?: string;
            /**
             * @description How to fix the vulnerability
             * @example Distribute web servers across at least 2 availability zones
             */
            recommendation?: string;
            /**
             * @description Simulation step when vulnerability was detected
             * @example 52
             */
            detectedAt?: number;
            /**
             * @description Resources affected by this vulnerability
             * @example [
             *       "web-1",
             *       "web-2",
             *       "web-3"
             *     ]
             */
            affectedResources?: string[];
        };
        ChaosScenario: {
            /**
             * @description Unique scenario identifier
             * @example zone_failure
             */
            id?: string;
            /**
             * @description Human-readable scenario name
             * @example Availability Zone Failure
             */
            name?: string;
            /**
             * @description What this scenario tests
             * @example Tests resilience to complete availability zone failure
             */
            description?: string;
            /** @description Failure injections in this scenario */
            injections?: components["schemas"]["ChaosInjectionConfig"][];
            /**
             * @description Vulnerabilities this scenario typically detects
             * @example [
             *       "zone_dependency",
             *       "insufficient_capacity"
             *     ]
             */
            expectedVulnerabilities?: string[];
        };
        ChaosJob: {
            /**
             * Format: uuid
             * @description Unique job identifier
             */
            id?: string;
            /**
             * @description Job type
             * @enum {string}
             */
            type?: "chaos_test";
            /**
             * @description Current job status
             * @enum {string}
             */
            status?: "pending" | "running" | "completed" | "failed" | "cancelled" | "partial_failed";
            /**
             * Format: uuid
             * @description Base simulation being tested
             */
            simulationId?: string;
            /** @description Scenario used (if applicable) */
            scenarioId?: string;
            /** @description Custom injections (if applicable) */
            customInjections?: components["schemas"]["ChaosInjectionConfig"][];
            /** @description Test duration in steps */
            duration?: number;
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            completedAt?: string;
            /**
             * @description Webhook delivery status
             * @example delivered
             * @enum {string}
             */
            webhookDeliveryStatus?: "pending" | "delivered" | "failed";
            /**
             * @description Number of webhook delivery attempts made
             * @example 1
             */
            webhookDeliveryAttempts?: number;
            /** @description Error message if webhook delivery failed */
            webhookDeliveryError?: string;
            /**
             * Format: date-time
             * @description Timestamp when webhook was successfully delivered
             */
            webhookDeliveredAt?: string;
            /** @description Error message if failed */
            error?: string;
        };
        BatchChaosRequest: {
            /**
             * Format: uuid
             * @description ID of the base simulation to test
             * @example sim_abc123
             */
            simulationId: string;
            /** @description Array of chaos test scenarios to execute in parallel */
            scenarios: {
                /**
                 * @description Pre-built scenario ID (optional, mutually exclusive with customInjections)
                 * @example zone_failure
                 * @enum {string}
                 */
                scenarioId?: "zone_failure" | "database_crash" | "network_partition" | "cascading_failure" | "random_instance_failure" | "database_slowdown";
                /** @description Custom failure injections (optional, mutually exclusive with scenarioId) */
                customInjections?: components["schemas"]["ChaosInjectionConfig"][];
                /**
                 * @description Test duration in simulation steps
                 * @default 300
                 * @example 120
                 */
                duration: number;
            }[];
            /**
             * Format: uri
             * @description Optional HTTPS URL to receive webhook notification when batch completes
             * @example https://example.com/webhook
             */
            webhookUrl?: string;
            /**
             * @description Optional secret for HMAC-SHA256 webhook signature verification
             * @example secret123
             */
            webhookSecret?: string;
        };
        BatchChaosJob: {
            /**
             * Format: uuid
             * @description Unique batch job identifier
             * @example batch_xyz789
             */
            id?: string;
            /**
             * @description Current batch status. 'partial_failed' indicates some child jobs failed but others succeeded.
             * @example completed
             * @enum {string}
             */
            status?: "pending" | "running" | "completed" | "failed" | "cancelled" | "partial_failed";
            /**
             * @description IDs of all child chaos jobs in this batch
             * @example [
             *       "job_1",
             *       "job_2",
             *       "job_3"
             *     ]
             */
            childJobIds?: string[];
            /**
             * @description Total number of child jobs in this batch
             * @example 3
             */
            totalJobs?: number;
            /**
             * @description Number of child jobs that completed successfully
             * @example 2
             */
            completedJobs?: number;
            /**
             * @description Number of child jobs that failed
             * @example 1
             */
            failedJobs?: number;
            /**
             * @description Number of child jobs that were cancelled
             * @example 0
             */
            cancelledJobs?: number;
            /** @description Aggregated resilience score across all completed child jobs */
            aggregatedResilienceScore?: components["schemas"]["ResilienceScore"];
            /** @description Aggregated vulnerabilities from all child jobs (deduplicated with occurrence counts) */
            aggregatedVulnerabilities?: {
                /**
                 * @description Vulnerability identifier
                 * @example zone_dependency
                 */
                id?: string;
                /**
                 * @description Severity level
                 * @example high
                 * @enum {string}
                 */
                severity?: "critical" | "high" | "medium" | "low";
                /**
                 * @description Vulnerability title
                 * @example Single Availability Zone Dependency
                 */
                title?: string;
                /**
                 * @description Detailed description
                 * @example Resources are not distributed across availability zones
                 */
                description?: string;
                /**
                 * @description Number of child jobs where this vulnerability was detected
                 * @example 2
                 */
                occurrences?: number;
            }[];
            /**
             * @description Aggregated recommendations from all child jobs (deduplicated)
             * @example [
             *       "Distribute resources across multiple availability zones",
             *       "Implement database connection pooling",
             *       "Add circuit breakers for external dependencies"
             *     ]
             */
            aggregatedRecommendations?: string[];
            /** @description Summary results for each child job (lightweight version for status endpoint) */
            childJobResults?: {
                /**
                 * Format: uuid
                 * @description Child job ID
                 * @example job_1
                 */
                jobId?: string;
                /**
                 * @description Child job status
                 * @example completed
                 * @enum {string}
                 */
                status?: "pending" | "running" | "completed" | "failed" | "cancelled";
                /** @description Resilience score (only present if completed) */
                resilienceScore?: components["schemas"]["ResilienceScore"];
                /**
                 * @description Vulnerabilities detected (only present if completed)
                 * @example [
                 *       "zone_dependency",
                 *       "insufficient_capacity"
                 *     ]
                 */
                vulnerabilities?: string[];
                /**
                 * @description Error message if failed
                 * @example Simulation failed to initialize
                 */
                error?: string;
            }[];
            /**
             * Format: uri
             * @description Webhook URL for batch completion notification
             */
            webhookUrl?: string;
            /**
             * @description Webhook delivery status
             * @example delivered
             * @enum {string}
             */
            webhookDeliveryStatus?: "pending" | "delivered" | "failed";
            /**
             * @description Number of webhook delivery attempts made
             * @example 1
             */
            webhookDeliveryAttempts?: number;
            /** @description Error message if webhook delivery failed */
            webhookDeliveryError?: string;
            /**
             * Format: date-time
             * @description Timestamp when webhook was successfully delivered
             */
            webhookDeliveredAt?: string;
            /**
             * Format: date-time
             * @description When the batch was created
             * @example 2025-11-23T10:00:00Z
             */
            createdAt?: string;
            /**
             * Format: date-time
             * @description When the batch was last updated
             * @example 2025-11-23T10:15:00Z
             */
            updatedAt?: string;
            /**
             * Format: date-time
             * @description When the batch completed (or failed)
             * @example 2025-11-23T10:15:00Z
             */
            completedAt?: string;
            /**
             * Format: date-time
             * @description When the batch was cancelled
             */
            cancelledAt?: string;
            /** @description Error message if batch failed */
            error?: string;
        };
        WorkloadProfile: {
            /**
             * @description Number of compute instances required
             * @example 10
             */
            computeInstances: number;
            /**
             * @description Number of database instances required
             * @example 2
             */
            databaseInstances: number;
            /**
             * @description Storage capacity in gigabytes
             * @example 500
             */
            storageGB: number;
            /**
             * @description Expected traffic in requests per second
             * @example 5000
             */
            trafficRPS: number;
            /**
             * @description Maximum acceptable latency in milliseconds
             * @example 100
             */
            latencyRequirementMs: number;
            /**
             * @description Primary deployment region
             * @example us-east-1
             */
            primaryRegion: string;
            /**
             * @description Optional secondary regions for multi-region deployment
             * @example [
             *       "eu-west-1",
             *       "ap-southeast-1"
             *     ]
             */
            secondaryRegions?: string[];
            /**
             * @description Whether multi-region deployment is required
             * @default false
             */
            requiresMultiRegion: boolean;
            /**
             * @description Data residency constraints (e.g., GDPR regions)
             * @example [
             *       "eu",
             *       "us"
             *     ]
             */
            dataResidencyRequirements?: string[];
        };
        ProviderAllocation: {
            /**
             * @description Cloud provider name
             * @example aws
             * @enum {string}
             */
            provider?: "aws" | "gcp" | "azure" | "oci" | "digitalocean";
            /**
             * @description Number of compute instances on this provider
             * @example 6
             */
            computeInstances?: number;
            /**
             * @description Number of database instances on this provider
             * @example 1
             */
            databaseInstances?: number;
            /**
             * @description Storage allocated to this provider (GB)
             * @example 300
             */
            storageGB?: number;
            /**
             * @description Percentage of traffic routed to this provider
             * @example 60
             */
            trafficPercentage?: number;
            /**
             * @description Regions used on this provider
             * @example [
             *       "us-east-1",
             *       "us-west-2"
             *     ]
             */
            regions?: string[];
        };
        StrategyMetrics: {
            /**
             * @description Total hourly cost across all providers
             * @example 12.5
             */
            totalCostPerHour?: number;
            /**
             * @description Average latency in milliseconds
             * @example 45.2
             */
            avgLatencyMs?: number;
            /**
             * @description Vendor lock-in score (0-100, higher = more lock-in)
             * @example 35
             */
            vendorLockInScore?: number;
            /**
             * @description Data portability score (0-100, higher = more portable)
             * @example 75
             */
            dataPortabilityScore?: number;
            /**
             * @description Geographic coverage score (0-100)
             * @example 85
             */
            geographicCoverage?: number;
            /**
             * @description Overall weighted composite score (0-10)
             * @example 8.5
             */
            compositeScore?: number;
        };
        Strategy: {
            /**
             * @description Unique strategy identifier
             * @example strategy-1
             */
            id?: string;
            /**
             * @description Strategy name
             * @example AWS-Primary Multi-Region
             */
            name?: string;
            /**
             * @description Strategy description
             * @example AWS-heavy deployment with GCP for data redundancy and reduced vendor lock-in
             */
            description?: string;
            /** @description Provider allocations in this strategy */
            allocations?: components["schemas"]["ProviderAllocation"][];
            metrics?: components["schemas"]["StrategyMetrics"];
            /**
             * @description Key tradeoffs of this strategy
             * @example [
             *       "Higher cost for improved redundancy",
             *       "Lower vendor lock-in at expense of complexity"
             *     ]
             */
            tradeoffs?: string[];
            /**
             * @description Recommendations for this strategy
             * @example [
             *       "Best for workloads requiring high availability",
             *       "Consider multi-region replication for databases"
             *     ]
             */
            recommendations?: string[];
        };
        MultiCloudJob: {
            /**
             * Format: uuid
             * @description Unique job identifier
             * @example job-abc123
             */
            id?: string;
            workloadProfile?: components["schemas"]["WorkloadProfile"];
            /** @description Optimization weights used */
            optimizationWeights?: {
                /** @example 0.4 */
                cost?: number;
                /** @example 0.4 */
                latency?: number;
                /** @example 0.2 */
                vendorLockIn?: number;
            };
            /**
             * @description Current job status
             * @example completed
             * @enum {string}
             */
            status?: "pending" | "running" | "completed" | "failed";
            /**
             * @description Progress percentage (0-100)
             * @example 100
             */
            progress?: number;
            /**
             * @description Number of strategies generated
             * @example 15
             */
            strategiesGenerated?: number;
            /** @description Top-ranked strategies (available when completed) */
            topStrategies?: components["schemas"]["Strategy"][];
            /**
             * @description Detailed comparison report (available when completed)
             * @example Multi-Cloud Strategy Analysis Report...
             */
            comparisonReport?: string;
            /** Format: date-time */
            createdAt?: string;
            /** Format: date-time */
            updatedAt?: string;
            /** Format: date-time */
            completedAt?: string;
            /** @description Error message if failed */
            error?: string;
            /**
             * @description Webhook delivery status
             * @example delivered
             * @enum {string}
             */
            webhookDeliveryStatus?: "pending" | "delivered" | "failed";
            /**
             * @description Number of webhook delivery attempts made
             * @example 1
             */
            webhookDeliveryAttempts?: number;
            /** @description Error message if webhook delivery failed */
            webhookDeliveryError?: string;
            /**
             * Format: date-time
             * @description Timestamp when webhook was successfully delivered
             */
            webhookDeliveredAt?: string;
        };
        /** @description Webhook payload sent when an optimization job completes */
        OptimizationWebhookPayload: {
            /**
             * @description Event type
             * @example optimization.completed
             * @enum {string}
             */
            event?: "optimization.completed" | "optimization.failed";
            /**
             * Format: uuid
             * @description Job identifier
             * @example abc-123-def
             */
            jobId?: string;
            /**
             * @description Final job status
             * @example completed
             * @enum {string}
             */
            status?: "completed" | "failed";
            /**
             * Format: date-time
             * @description When the webhook was sent
             * @example 2025-11-23T10:30:00Z
             */
            timestamp?: string;
            /** @description Optimization job results */
            data?: {
                /** @example 57 */
                variantsGenerated?: number;
                recommendations?: components["schemas"]["OptimizationRecommendation"][];
                /** @description Error message if status is failed */
                error?: string;
            };
        };
        /** @description Webhook payload sent when a chaos engineering test completes */
        ChaosWebhookPayload: {
            /**
             * @description Event type
             * @example chaos.completed
             * @enum {string}
             */
            event?: "chaos.completed" | "chaos.failed";
            /**
             * Format: uuid
             * @description Job identifier
             */
            jobId?: string;
            /**
             * @description Final job status
             * @example completed
             * @enum {string}
             */
            status?: "completed" | "failed";
            /**
             * Format: date-time
             * @description When the webhook was sent
             */
            timestamp?: string;
            /** @description Chaos test results */
            data?: {
                resilienceScore?: components["schemas"]["ResilienceScore"];
                vulnerabilities?: components["schemas"]["Vulnerability"][];
                /** @description Error message if status is failed */
                error?: string;
            };
        };
        /** @description Webhook payload sent when a prediction job (validation or threshold optimization) completes. When `status` is `"failed"`, inspect `data.error` to determine the recovery action. See the **Handling Failures** section in the API description for a full classification of retryable vs non-retryable error conditions and per-error recovery steps. */
        PredictionWebhookPayload: {
            /**
             * @description Event type
             * @example prediction.validation.completed
             * @enum {string}
             */
            event?: "prediction.validation.completed" | "prediction.validation.failed" | "prediction.threshold_optimization.completed" | "prediction.threshold_optimization.failed";
            /**
             * Format: uuid
             * @description Job identifier
             */
            jobId?: string;
            /**
             * @description Final job status
             * @example completed
             * @enum {string}
             */
            status?: "completed" | "failed";
            /**
             * Format: date-time
             * @description When the webhook was sent
             */
            timestamp?: string;
            /** @description Prediction job results */
            data?: {
                /**
                 * @description Type of prediction job
                 * @enum {string}
                 */
                type?: "validation" | "threshold_optimization";
                validationResult?: components["schemas"]["ValidationResult"];
                bestThresholds?: components["schemas"]["AutoscalingConfig"];
                recommendations?: components["schemas"]["PredictionRecommendation"][];
                /** @description Error message if status is failed */
                error?: string;
            };
        };
        /** @description Webhook payload sent when a multi-cloud exploration job completes */
        MultiCloudWebhookPayload: {
            /**
             * @description Event type
             * @example multicloud.completed
             * @enum {string}
             */
            event?: "multicloud.completed" | "multicloud.failed";
            /**
             * Format: uuid
             * @description Job identifier
             */
            jobId?: string;
            /**
             * @description Final job status
             * @example completed
             * @enum {string}
             */
            status?: "completed" | "failed";
            /**
             * Format: date-time
             * @description When the webhook was sent
             */
            timestamp?: string;
            /** @description Multi-cloud exploration results */
            data?: {
                /** @example 15 */
                strategiesGenerated?: number;
                topStrategies?: components["schemas"]["Strategy"][];
                /** @example Multi-Cloud Strategy Analysis Report... */
                comparisonReport?: string;
                /** @description Error message if status is failed */
                error?: string;
            };
        };
        /** @description Webhook payload sent when an RL training episode completes */
        RLEpisodeWebhookPayload: {
            /**
             * @description Event type
             * @example rl_episode.completed
             * @enum {string}
             */
            event?: "rl_episode.completed";
            /**
             * Format: uuid
             * @description RL environment identifier
             */
            environmentId?: string;
            /**
             * Format: uuid
             * @description Simulation identifier
             */
            simulationId?: string;
            /**
             * Format: date-time
             * @description When the webhook was sent
             */
            timestamp?: string;
            /** @description Episode completion data */
            data?: {
                /**
                 * @description Total steps in the episode
                 * @example 300
                 */
                totalSteps?: number;
                /**
                 * @description Cumulative reward achieved
                 * @example 145.67
                 */
                totalReward?: number;
                episodeConfig?: components["schemas"]["EpisodeConfig"];
                /** @description Final system metrics */
                finalMetrics?: {
                    avgCost?: number;
                    avgLatency?: number;
                    avgErrorRate?: number;
                };
            };
        };
        Error: {
            /**
             * @description Error message
             * @example Simulation not found
             */
            error: string;
            /** @description Detailed validation errors (for 400 responses) */
            details?: Record<string, never>[];
        };
    };
    responses: {
        /** @description Invalid request data */
        BadRequest: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Authentication required or invalid API key */
        Unauthorized: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Resource not found */
        NotFound: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Internal server error */
        InternalError: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
        /** @description Rate limit exceeded — slow down requests or upgrade your API key's rate limit */
        TooManyRequests: {
            headers: {
                [name: string]: unknown;
            };
            content: {
                "application/json": components["schemas"]["Error"];
            };
        };
    };
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
};
export type $defs = Record<string, never>;
export interface operations {
    registerApiKey: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "token": "cwm_reg_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
                 *       "name": "canvas-cloud-ai-prod"
                 *     }
                 */
                "application/json": {
                    /**
                     * @description The registration token received from the platform admin (starts with `cwm_reg_`)
                     * @example cwm_reg_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2
                     */
                    token: string;
                    /**
                     * @description A descriptive name for the API key that will be created
                     * @example canvas-cloud-ai-prod
                     */
                    name: string;
                };
            };
        };
        responses: {
            /** @description API key created successfully. Store the `key` field immediately — it will not be shown again. */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "3f9a1b2c-4d5e-6f7a-8b9c-0d1e2f3a4b5c",
                     *       "key": "cwm_live_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
                     *       "keyPrefix": "cwm_live_a1b2c3d4e5f6a1b2...",
                     *       "name": "canvas-cloud-ai-prod",
                     *       "scopes": [
                     *         "read",
                     *         "write"
                     *       ],
                     *       "rateLimit": 1000,
                     *       "createdAt": "2026-05-10T17:00:00.000Z",
                     *       "message": "Store this API key securely. You won't be able to see it again."
                     *     }
                     */
                    "application/json": components["schemas"]["ApiKeyCreatedResponse"];
                };
            };
            /** @description Invalid request body or token format */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Registration token not found or HMAC mismatch */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Registration token is expired, revoked, or already used */
            410: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    listRegistrationTokens: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of all registration tokens */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RegistrationTokenSummary"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Insufficient scope — admin required */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    createRegistrationToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                /**
                 * @example {
                 *       "name": "canvas-cloud-ai",
                 *       "scopes": [
                 *         "read",
                 *         "write"
                 *       ],
                 *       "rateLimit": 1000,
                 *       "expiresAt": "2026-06-01T00:00:00Z"
                 *     }
                 */
                "application/json": {
                    /**
                     * @description Human-readable label identifying the intended token recipient
                     * @example canvas-cloud-ai
                     */
                    name: string;
                    /**
                     * @description Scopes that the resulting API key will have
                     * @default [
                     *       "read",
                     *       "write"
                     *     ]
                     */
                    scopes?: ("read" | "write" | "admin")[];
                    /**
                     * @description Requests-per-hour limit on the resulting API key
                     * @default 1000
                     */
                    rateLimit?: number;
                    /**
                     * Format: date-time
                     * @description Optional ISO 8601 expiry for the registration token. If omitted, the token never expires.
                     * @example 2026-06-01T00:00:00Z
                     */
                    expiresAt?: string;
                };
            };
        };
        responses: {
            /** @description Registration token created. The `token` field is shown once — share it with the recipient now. */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "id": "7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d",
                     *       "token": "cwm_reg_a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2c3d4e5f6a1b2",
                     *       "tokenPrefix": "cwm_reg_a1b2c3d4e5f6a1b2...",
                     *       "name": "canvas-cloud-ai",
                     *       "scopes": [
                     *         "read",
                     *         "write"
                     *       ],
                     *       "rateLimit": 1000,
                     *       "expiresAt": "2026-06-01T00:00:00Z",
                     *       "createdAt": "2026-05-10T17:00:00.000Z",
                     *       "message": "Share this token with the client. It can only be used once and will not be shown again."
                     *     }
                     */
                    "application/json": components["schemas"]["RegistrationTokenCreatedResponse"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            /** @description Insufficient scope — admin required */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    revokeRegistrationToken: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description The registration token ID returned when the token was created
                 * @example 7a8b9c0d-1e2f-3a4b-5c6d-7e8f9a0b1c2d
                 */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Token revoked successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example Registration token revoked successfully */
                        message?: string;
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Insufficient scope — admin required */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            /** @description Token has already been used and cannot be revoked */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "Cannot revoke a token that has already been used"
                     *     }
                     */
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    getDescription: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Simulator description document */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example Cloud World Model Simulator */
                        name?: string;
                        /** @example 1.0.0 */
                        version?: string;
                        /** @description High-level description of what the simulator does */
                        purpose?: string;
                        /** @description Key/value map of domain term definitions */
                        core_concepts?: {
                            [key: string]: string;
                        };
                        /** @description Ordered list of steps describing the typical usage flow */
                        workflow?: string[];
                        /** @description Feature areas exposed by the simulator */
                        capabilities?: {
                            /** @example simulations */
                            id?: string;
                            /** @example Simulations */
                            name?: string;
                            description?: string;
                        }[];
                        /** @description Step-by-step quick-start call sequence */
                        quick_start?: {
                            /** @example 1 */
                            step?: number;
                            /** @example Create a simulation */
                            label?: string;
                            /** @example POST */
                            method?: string;
                            /** @example /api/simulations */
                            path?: string;
                            description?: string;
                        }[];
                        authentication?: {
                            /** @example Bearer token (API key) */
                            type?: string;
                            required_for?: string[];
                            notes?: string;
                        };
                        /** @description Named map of core interaction entry points */
                        entry_points?: {
                            [key: string]: {
                                /** @example POST */
                                method?: string;
                                /** @example /api/simulations */
                                path?: string;
                            };
                        };
                        intended_use_cases?: string[];
                        /** @example /api-docs */
                        openapi_spec_url?: string;
                    };
                };
            };
        };
    };
    listSimulations: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of simulations */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Simulation"][];
                };
            };
            401: components["responses"]["Unauthorized"];
            500: components["responses"]["InternalError"];
        };
    };
    createSimulation: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * @description Human-readable name for the simulation
                     * @example Production Web App Autoscaling
                     */
                    name: string;
                    /**
                     * @description Optional description of the simulation
                     * @example Multi-tier web application with load balancer and database
                     */
                    description?: string;
                    /** @description Cloud resources in the simulation */
                    resources: components["schemas"]["Resource"][];
                    /**
                     * @description Network connections between resources
                     * @default []
                     */
                    connections?: components["schemas"]["Connection"][];
                    /**
                     * @description Initial traffic load (requests per second)
                     * @default 1000
                     * @example 5000
                     */
                    traffic?: number;
                };
            };
        };
        responses: {
            /** @description Simulation created successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Simulation"];
                };
            };
            400: components["responses"]["BadRequest"];
            500: components["responses"]["InternalError"];
        };
    };
    getSimulation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Simulation UUID
                 * @example 550e8400-e29b-41d4-a716-446655440000
                 */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Simulation state */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Simulation"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied — caller does not own this simulation */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    deleteSimulation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Simulation UUID
                 * @example 550e8400-e29b-41d4-a716-446655440000
                 */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Simulation deleted successfully */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    updateSimulation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Simulation UUID
                 * @example 550e8400-e29b-41d4-a716-446655440000
                 */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @example Updated Simulation Name */
                    name?: string;
                    description?: string;
                    /**
                     * @description Current traffic load (RPS)
                     * @example 8000
                     */
                    traffic?: number;
                    resources?: components["schemas"]["Resource"][];
                };
            };
        };
        responses: {
            /** @description Updated simulation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Simulation"];
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    stepSimulation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Step result */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        simulation?: components["schemas"]["Simulation"];
                        /** @description Metrics snapshot for this step */
                        metrics?: {
                            simulationId?: string;
                            /**
                             * @description CPU utilization (%)
                             * @example 72.4
                             */
                            cpuUsage?: number;
                            /**
                             * @description Median latency (ms)
                             * @example 45
                             */
                            latencyP50?: number;
                            /**
                             * @description P95 latency (ms)
                             * @example 120
                             */
                            latencyP95?: number;
                            /**
                             * @description Error rate (%)
                             * @example 0.3
                             */
                            errorRate?: number;
                            /**
                             * @description Effective throughput (RPS)
                             * @example 4850
                             */
                            throughput?: number;
                            /**
                             * @description Estimated infrastructure cost per hour (USD)
                             * @example 2.4
                             */
                            costPerHour?: number;
                        };
                        /** @description Events generated during this step */
                        events?: {
                            id?: string;
                            simulationId?: string;
                            /** Format: date-time */
                            timestamp?: string;
                            /** @enum {string} */
                            severity?: "info" | "warning" | "error" | "success";
                            message?: string;
                        }[];
                    };
                };
            };
            /** @description Access denied or demo step limit reached */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            /** @description Demo step limit reached (20 steps for unauthenticated simulations) */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example Demo step limit reached */
                        error?: string;
                        message?: string;
                        /** @example 20 */
                        limit?: number;
                    };
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    stepSimulationHybrid: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    /** @description Optional hybrid engine configuration overrides */
                    config?: {
                        /**
                         * @description Weight given to ML prediction vs rule-based (0 = pure rules, 1 = pure ML)
                         * @example 0.6
                         */
                        mlWeight?: number;
                        /**
                         * @description Minimum ML confidence to apply blending; below this threshold pure rules are used
                         * @example 0.5
                         */
                        confidenceThreshold?: number;
                    };
                };
            };
        };
        responses: {
            /** @description Hybrid step result */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        simulation?: components["schemas"]["Simulation"];
                        /** @description Metrics snapshot for this step */
                        metrics?: Record<string, never>;
                        events?: Record<string, never>[];
                        /** @description Hybrid decision metadata for this step */
                        hybridDecision?: {
                            blendingApplied?: boolean;
                            fallbackUsed?: boolean;
                            mlPrediction?: {
                                /** @example 0.78 */
                                overallConfidence?: number;
                                bottlenecks?: string[];
                                eventLikelihoods?: Record<string, never>[];
                            };
                        };
                        /** @description Cumulative hybrid result history */
                        hybridResult?: Record<string, never>;
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    getHybridResult: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Hybrid result history */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "simulationId": "sim-abc123",
                     *       "config": {
                     *         "mlWeight": 0.6,
                     *         "confidenceThreshold": 0.5
                     *       },
                     *       "decisions": [
                     *         {
                     *           "step": 1,
                     *           "blendingApplied": true,
                     *           "fallbackUsed": false,
                     *           "mlConfidence": 0.82,
                     *           "bottlenecks": [],
                     *           "eventLikelihoods": []
                     *         },
                     *         {
                     *           "step": 2,
                     *           "blendingApplied": false,
                     *           "fallbackUsed": true,
                     *           "mlConfidence": 0.41,
                     *           "bottlenecks": [
                     *             "cpu_saturation"
                     *           ],
                     *           "eventLikelihoods": [
                     *             {
                     *               "event": "autoscale_triggered",
                     *               "probability": 0.78
                     *             }
                     *           ]
                     *         }
                     *       ],
                     *       "summary": {
                     *         "totalSteps": 2,
                     *         "mlConfidenceAvg": 0.615,
                     *         "blendedSteps": 1,
                     *         "fallbackSteps": 1,
                     *         "bottlenecksDetected": 1,
                     *         "eventsDetected": 1
                     *       }
                     *     }
                     */
                    "application/json": {
                        simulationId?: string;
                        /** @description Hybrid engine configuration used */
                        config?: Record<string, never>;
                        /** @description Per-step hybrid decisions */
                        decisions?: Record<string, never>[];
                        /** @description Aggregate statistics across all steps */
                        summary?: {
                            /** @example 50 */
                            totalSteps?: number;
                            /** @example 0.74 */
                            mlConfidenceAvg?: number;
                            /** @example 38 */
                            blendedSteps?: number;
                            /** @example 12 */
                            fallbackSteps?: number;
                            /** @example 5 */
                            bottlenecksDetected?: number;
                            /** @example 3 */
                            eventsDetected?: number;
                        };
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description No hybrid result found for this simulation (no hybrid steps run yet) */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    injectTraffic: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Traffic spike applied */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        simulation?: components["schemas"]["Simulation"];
                        /** @description Event recording the traffic spike */
                        event?: {
                            id?: string;
                            simulationId?: string;
                            /** @example warning */
                            severity?: string;
                            /** @example Traffic spike injected: 1000 → 4200 RPS */
                            message?: string;
                        };
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    injectFailure: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Node failure injected */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        simulation?: components["schemas"]["Simulation"];
                        /** @description Event recording the node failure */
                        event?: Record<string, never>;
                    };
                };
            };
            /** @description No healthy nodes available to fail */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    listTrafficPatterns: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of traffic patterns */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: string;
                        simulationId?: string;
                        /**
                         * @description Pattern shape
                         * @enum {string}
                         */
                        type?: "constant" | "ramp" | "sine" | "step" | "spike" | "custom";
                        /** @description Traffic multiplier amplitude */
                        amplitude?: number;
                        /** @description Pattern period in simulation steps */
                        period?: number;
                        isActive?: boolean;
                    }[];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    createTrafficPattern: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * @description Pattern shape
                     * @example sine
                     * @enum {string}
                     */
                    type: "constant" | "ramp" | "sine" | "step" | "spike" | "custom";
                    /**
                     * @description Traffic multiplier amplitude (e.g. 0.5 = ±50% variation)
                     * @example 0.3
                     */
                    amplitude?: number;
                    /**
                     * @description Pattern period in simulation steps
                     * @example 20
                     */
                    period?: number;
                    /** @default true */
                    isActive?: boolean;
                };
            };
        };
        responses: {
            /** @description Traffic pattern created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: string;
                        simulationId?: string;
                        type?: string;
                        amplitude?: number;
                        period?: number;
                        isActive?: boolean;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    deleteTrafficPattern: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Traffic pattern UUID */
                patternId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Pattern deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    updateTrafficPattern: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Traffic pattern UUID */
                patternId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @enum {string} */
                    type?: "constant" | "ramp" | "sine" | "step" | "spike" | "custom";
                    amplitude?: number;
                    period?: number;
                    isActive?: boolean;
                };
            };
        };
        responses: {
            /** @description Updated traffic pattern */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: string;
                        simulationId?: string;
                        type?: string;
                        amplitude?: number;
                        period?: number;
                        isActive?: boolean;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    listFailureInjections: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of failure injections */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: string;
                        simulationId?: string;
                        /** @example AZ Outage - us-east-1a */
                        name?: string;
                        /** @enum {string} */
                        type?: "instance_kill" | "az_outage" | "database_overload" | "network_latency";
                        isActive?: boolean;
                        /** @description Simulation time step at which the failure begins */
                        startTime?: number;
                        /** @description Simulation time step at which the failure ends (null = permanent until removed) */
                        endTime?: number | null;
                        targetResourceId?: string | null;
                        targetZone?: string | null;
                    }[];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    createFailureInjection: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * @description Human-readable label for this failure
                     * @example Simulate AZ outage
                     */
                    name: string;
                    /**
                     * @description Type of failure to inject
                     * @example az_outage
                     * @enum {string}
                     */
                    type: "instance_kill" | "az_outage" | "database_overload" | "network_latency";
                    /**
                     * @description Simulation time step at which to begin the failure
                     * @example 10
                     */
                    startTime: number;
                    /**
                     * @description Simulation time step at which the failure resolves (null = permanent)
                     * @example 30
                     */
                    endTime?: number | null;
                    /** @description ID of the specific resource to target (optional) */
                    targetResourceId?: string | null;
                    /**
                     * @description Availability zone to target for az_outage (optional)
                     * @example us-east-1a
                     */
                    targetZone?: string | null;
                    /** @default true */
                    isActive?: boolean;
                };
            };
        };
        responses: {
            /** @description Failure injection created */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: string;
                        simulationId?: string;
                        name?: string;
                        type?: string;
                        isActive?: boolean;
                        startTime?: number;
                        endTime?: number | null;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    deleteFailureInjection: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Failure injection UUID */
                failureId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Failure injection deleted */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    updateFailureInjection: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Failure injection UUID */
                failureId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    name?: string;
                    /** @description Set to false to deactivate the failure early */
                    isActive?: boolean;
                    endTime?: number | null;
                };
            };
        };
        responses: {
            /** @description Updated failure injection */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: string;
                        simulationId?: string;
                        name?: string;
                        isActive?: boolean;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    getSimulationMetrics: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of metrics snapshots ordered by time step */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example [
                     *       {
                     *         "simulationId": "sim-abc123",
                     *         "cpuUsage": 62.3,
                     *         "latencyP50": 38,
                     *         "latencyP95": 112,
                     *         "latencyP99": 198,
                     *         "errorRate": 0.4,
                     *         "throughput": 4820,
                     *         "costPerHour": 2.38,
                     *         "timestamp": "2024-01-15T10:00:00Z"
                     *       },
                     *       {
                     *         "simulationId": "sim-abc123",
                     *         "cpuUsage": 78.9,
                     *         "latencyP50": 55,
                     *         "latencyP95": 145,
                     *         "latencyP99": 260,
                     *         "errorRate": 1.2,
                     *         "throughput": 5100,
                     *         "costPerHour": 2.38,
                     *         "timestamp": "2024-01-15T10:01:00Z"
                     *       },
                     *       {
                     *         "simulationId": "sim-abc123",
                     *         "cpuUsage": 45.1,
                     *         "latencyP50": 29,
                     *         "latencyP95": 88,
                     *         "latencyP99": 142,
                     *         "errorRate": 0.1,
                     *         "throughput": 4950,
                     *         "costPerHour": 2.85,
                     *         "timestamp": "2024-01-15T10:02:00Z"
                     *       }
                     *     ]
                     */
                    "application/json": {
                        simulationId?: string;
                        /** @description CPU utilization (%) */
                        cpuUsage?: number;
                        /** @description Median latency (ms) */
                        latencyP50?: number;
                        /** @description P95 latency (ms) */
                        latencyP95?: number;
                        /** @description P99 latency (ms) */
                        latencyP99?: number;
                        /** @description Error rate (%) */
                        errorRate?: number;
                        /** @description Effective throughput (RPS) */
                        throughput?: number;
                        /** @description Estimated cost per hour (USD) */
                        costPerHour?: number;
                        /** Format: date-time */
                        timestamp?: string;
                    }[];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    getSimulationEvents: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of simulation events */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example [
                     *       {
                     *         "id": "evt-001",
                     *         "simulationId": "sim-abc123",
                     *         "timestamp": "2024-01-15T10:01:15Z",
                     *         "severity": "warning",
                     *         "message": "CPU utilization crossed 75% threshold — autoscaler cooldown started",
                     *         "resource": "App Server"
                     *       },
                     *       {
                     *         "id": "evt-002",
                     *         "simulationId": "sim-abc123",
                     *         "timestamp": "2024-01-15T10:02:00Z",
                     *         "severity": "success",
                     *         "message": "Autoscaler scaled out: 3 → 4 instances",
                     *         "resource": "App Server"
                     *       },
                     *       {
                     *         "id": "evt-003",
                     *         "simulationId": "sim-abc123",
                     *         "timestamp": "2024-01-15T10:02:45Z",
                     *         "severity": "info",
                     *         "message": "Canary deployment v2.3.1 started",
                     *         "resource": null
                     *       }
                     *     ]
                     */
                    "application/json": {
                        id?: string;
                        simulationId?: string;
                        /** Format: date-time */
                        timestamp?: string;
                        /** @enum {string} */
                        severity?: "info" | "warning" | "error" | "success";
                        message?: string;
                        /** @description Name of the affected resource (if applicable) */
                        resource?: string | null;
                    }[];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    createSimulationEvent: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * @description Human-readable event description
                     * @example Canary deployment v2.3.1 started
                     */
                    message: string;
                    /**
                     * @default info
                     * @example info
                     * @enum {string}
                     */
                    severity: "info" | "warning" | "error" | "success";
                    /** @description Name of the resource this event is associated with */
                    resource?: string | null;
                    /**
                     * Format: date-time
                     * @description Event timestamp (defaults to current time if omitted)
                     */
                    timestamp?: string;
                };
            };
        };
        responses: {
            /** @description Event added */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: string;
                        simulationId?: string;
                        /** Format: date-time */
                        timestamp?: string;
                        severity?: string;
                        message?: string;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    clearSimulationEvents: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Events cleared */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    explainSimulation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    /**
                     * @description Return a simplified, jargon-free explanation
                     * @default false
                     * @example false
                     */
                    beginnerMode?: boolean;
                };
            };
        };
        responses: {
            /** @description AI explanation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /**
                         * @description Natural-language explanation of simulation behaviour
                         * @example Your simulation is experiencing high CPU utilization (82%) because the traffic load of 8 000 RPS exceeds the capacity of the current 3-node cluster. The autoscaler has not yet triggered because CPU has not been above the 75% threshold for the required 2-step cooldown window.
                         */
                        explanation?: string;
                    };
                };
            };
            404: components["responses"]["NotFound"];
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    optimizeSimulation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    /**
                     * @description Return simplified suggestions
                     * @default false
                     */
                    beginnerMode?: boolean;
                };
            };
        };
        responses: {
            /** @description AI optimisation suggestions */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Prioritised optimisation recommendations */
                        suggestions?: string;
                    };
                };
            };
            404: components["responses"]["NotFound"];
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    troubleshootSimulation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * @description Plain-text description of the problem to investigate
                     * @example Latency spikes every 30 seconds and error rate climbs to 5% during spikes
                     */
                    issue: string;
                };
            };
        };
        responses: {
            /** @description Troubleshooting guidance */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Step-by-step troubleshooting guidance */
                        guidance?: string;
                    };
                };
            };
            /** @description Missing issue description */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    bulkResizeSimulation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * @description DigitalOcean Droplet size slug to apply to all compute resources
                     * @example s-4vcpu-8gb
                     */
                    dropletSize: string;
                };
            };
        };
        responses: {
            /** @description All compute resources resized */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        simulation?: components["schemas"]["Simulation"];
                        /**
                         * @description Number of compute resources that were resized
                         * @example 3
                         */
                        resizedCount?: number;
                    };
                };
            };
            /** @description Unknown Droplet size slug */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    analyzeBottlenecks: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    /**
                     * @description Return simplified analysis
                     * @default false
                     */
                    beginnerMode?: boolean;
                };
            };
        };
        responses: {
            /** @description Bottleneck analysis */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Detailed bottleneck analysis */
                        analysis?: string;
                        /** @description DigitalOcean-specific migration recommendation (if applicable) */
                        doRecommendation?: string | null;
                    };
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    explainAutoscaling: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: {
            content: {
                "application/json": {
                    /**
                     * @description Return simplified explanation
                     * @default false
                     */
                    beginnerMode?: boolean;
                };
            };
        };
        responses: {
            /** @description Autoscaling explanation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Natural-language explanation of autoscaling decisions */
                        explanation?: string;
                    };
                };
            };
            404: components["responses"]["NotFound"];
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    getRightSizingHint: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Right-sizing hints (or empty result if no hints) */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example false */
                        hasHint?: boolean;
                    } | {
                        /** @example true */
                        hasHint?: boolean;
                        hints?: {
                            /** @enum {string} */
                            resourceType?: "compute" | "database" | "network";
                            /** @enum {string} */
                            reason?: "low_cpu" | "scale_in" | "both" | "low_connection_util" | "low_throughput";
                            affectedResourceId?: string | null;
                            affectedResourceName?: string | null;
                            /**
                             * @description Recommended smaller size slug
                             * @example s-2vcpu-4gb
                             */
                            recommendedSlug?: string;
                            /**
                             * @description Estimated hourly cost of the recommended size (USD)
                             * @example 0.036
                             */
                            hourlyRate?: number;
                            /**
                             * @description Estimated percentage cost saving
                             * @example 35
                             */
                            estimatedSavingsPct?: number;
                            /** @description Operational trade-off to consider before resizing */
                            tradeOffNote?: string;
                            /** @description Current utilization percentage driving the recommendation */
                            currentUtilization?: number | null;
                        }[];
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    validateCostAccuracy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Cost accuracy validation result */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /**
                         * @description Whether simulated cost is within tolerance
                         * @example true
                         */
                        valid?: boolean;
                        /**
                         * @description Simulated cost per hour (USD)
                         * @example 2.38
                         */
                        simulatedCostPerHour?: number;
                        /**
                         * @description Expected cost per hour from provider benchmark (USD)
                         * @example 2.4
                         */
                        benchmarkCostPerHour?: number;
                        /**
                         * @description Percentage deviation from benchmark
                         * @example 0.83
                         */
                        deviationPct?: number;
                        /**
                         * @description Acceptable tolerance threshold
                         * @example ±10%
                         */
                        tolerance?: string;
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    validatePerformanceAccuracy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Performance accuracy validation result */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /**
                         * @description Whether simulated performance is within tolerance
                         * @example true
                         */
                        valid?: boolean;
                        /** @description Simulated throughput (RPS) */
                        simulatedThroughput?: number;
                        /** @description Expected throughput from provider benchmark (RPS) */
                        benchmarkThroughput?: number;
                        /** @description Percentage deviation from benchmark */
                        deviationPct?: number;
                        /** @example ±15% */
                        tolerance?: string;
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    validateAccuracy: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Simulation UUID */
                simulationId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Combined accuracy validation result */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description Cost accuracy validation result */
                        cost?: {
                            valid?: boolean;
                            deviationPct?: number;
                        };
                        /** @description Performance accuracy validation result */
                        performance?: {
                            valid?: boolean;
                            deviationPct?: number;
                        };
                        /**
                         * @description True only when both cost and performance validations pass
                         * @example true
                         */
                        overallValid?: boolean;
                        thresholds?: {
                            /** @example ±10% */
                            cost?: string;
                            /** @example ±15% */
                            performance?: string;
                        };
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            /** @description Access denied */
            403: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    listScenarios: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Array of scenario templates */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /**
                         * @description Unique scenario identifier
                         * @example aws-web-app
                         */
                        id?: string;
                        /** @example AWS Multi-Tier Web Application */
                        name?: string;
                        description?: string;
                        /**
                         * @description Scenario category (e.g. web, data, ml)
                         * @example web
                         */
                        category?: string;
                        /**
                         * @example aws
                         * @enum {string}
                         */
                        provider?: "aws" | "gcp" | "azure" | "oci" | "digitalocean" | "multi";
                        resources?: components["schemas"]["Resource"][];
                    }[];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    getScenario: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Scenario identifier
                 * @example aws-web-app
                 */
                scenarioId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Scenario template */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: string;
                        name?: string;
                        description?: string;
                        category?: string;
                        provider?: string;
                        resources?: components["schemas"]["Resource"][];
                        connections?: components["schemas"]["Connection"][];
                    };
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    getPricingHistory: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Pricing history document */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @description List of available pricing snapshots */
                        snapshots?: {
                            /**
                             * Format: date
                             * @description Snapshot date
                             * @example 2026-01-01
                             */
                            date?: string;
                            /**
                             * @description Human-readable snapshot label
                             * @example Jan 2026
                             */
                            label?: string;
                            /**
                             * @description Number of price entries in this snapshot
                             * @example 42
                             */
                            entryCount?: number;
                        }[];
                        /** @description Most recent price changes */
                        changes?: {
                            /** @example aws-ec2-m5xlarge */
                            resourceId?: string;
                            /** @example aws */
                            provider?: string;
                            /** @example 0.192 */
                            previousPrice?: number;
                            /** @example 0.19 */
                            currentPrice?: number;
                            /** @example -1.04 */
                            changePct?: number;
                            /** Format: date */
                            date?: string;
                        }[];
                        /**
                         * @description Per-provider price trend direction
                         * @example {
                         *       "aws": "stable",
                         *       "gcp": "down",
                         *       "azure": "stable",
                         *       "oci": "down",
                         *       "digitalocean": "stable"
                         *     }
                         */
                        providerTrends?: {
                            [key: string]: "up" | "down" | "stable";
                        };
                        /**
                         * @description All trackable resource identifiers
                         * @example [
                         *       "aws-ec2-m5xlarge",
                         *       "gcp-n2-standard-4",
                         *       "azure-d4s-v3"
                         *     ]
                         */
                        resourceIds?: string[];
                    };
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    getPricingTrend: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /**
                 * @description Resource identifier (from the resourceIds list in GET /pricing-history)
                 * @example aws-ec2-m5xlarge
                 */
                resourceId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Price trend for the requested resource */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example aws-ec2-m5xlarge */
                        resourceId?: string;
                        /** @description Ordered list of price data points */
                        trend?: {
                            /**
                             * Format: date
                             * @example 2026-01-01
                             */
                            date?: string;
                            /** @example Jan 2026 */
                            label?: string;
                            /**
                             * @description Hourly rate (USD) at this snapshot date
                             * @example 0.192
                             */
                            price?: number;
                        }[];
                    };
                };
            };
            /** @description Resource ID not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    listApiKeys: {
        parameters: {
            query?: {
                /** @description Optional filter by user ID */
                userId?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of API keys */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** Format: uuid */
                        id?: string;
                        /** @example cwm_live_a1b2c3d4... */
                        keyPrefix?: string;
                        name?: string;
                        scopes?: string[];
                        rateLimit?: number;
                        isActive?: boolean;
                        /** Format: date-time */
                        createdAt?: string;
                        /** Format: date-time */
                        lastUsedAt?: string;
                        /** Format: date-time */
                        expiresAt?: string;
                    }[];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    createApiKey: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * @description Human-readable name for the API key
                     * @example Production Agent Key
                     */
                    name: string;
                    /**
                     * @description Permission scopes for the key
                     * @default [
                     *       "read",
                     *       "write"
                     *     ]
                     */
                    scopes?: ("read" | "write" | "admin")[];
                    /**
                     * @description Requests per hour limit
                     * @default 1000
                     * @example 1000
                     */
                    rateLimit?: number;
                    /**
                     * Format: date-time
                     * @description Optional expiration date
                     * @example 2025-12-31T23:59:59Z
                     */
                    expiresAt?: string;
                    /** @description Optional user ID to associate with the key */
                    userId?: string;
                };
            };
        };
        responses: {
            /** @description API key created successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** Format: uuid */
                        id?: string;
                        /**
                         * @description The full API key (shown only once)
                         * @example cwm_live_a1b2c3d4e5f6g7h8i9j0k1l2m3n4o5p6
                         */
                        key?: string;
                        /**
                         * @description Key prefix for identification
                         * @example cwm_live_a1b2c3d4...
                         */
                        keyPrefix?: string;
                        name?: string;
                        scopes?: string[];
                        rateLimit?: number;
                        /** Format: date-time */
                        createdAt?: string;
                        /** Format: date-time */
                        expiresAt?: string;
                        /** @example Store this API key securely. You won't be able to see it again. */
                        message?: string;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            500: components["responses"]["InternalError"];
        };
    };
    revokeApiKey: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                keyId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description API key revoked successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** @example API key revoked successfully */
                        message?: string;
                    };
                };
            };
            404: components["responses"]["NotFound"];
            500: components["responses"]["InternalError"];
        };
    };
    createRLEnvironment: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * Format: uuid
                     * @description ID of the simulation to train on
                     * @example a638caad-7423-40a3-bb09-f91235d9392d
                     */
                    simulationId: string;
                    episodeConfig: components["schemas"]["EpisodeConfig"];
                    /**
                     * Format: uri
                     * @description Optional HTTPS URL to receive webhook notification when episode completes
                     * @example https://your-app.com/webhooks/rl-episode
                     */
                    webhookUrl?: string;
                    /**
                     * @description Optional secret for HMAC-SHA256 webhook signature verification
                     * @example your-secret-key-here
                     */
                    webhookSecret?: string;
                };
            };
        };
        responses: {
            /** @description RL environment created successfully */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        environment?: components["schemas"]["RLEnvironment"];
                        observation?: components["schemas"]["Observation"];
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            /** @description Simulation not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    resetRLEnvironment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the RL environment to reset */
                environmentId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Environment reset successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        environment?: components["schemas"]["RLEnvironment"];
                        observation?: components["schemas"]["Observation"];
                    };
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    stepRLEnvironment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the RL environment */
                environmentId: string;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    action: components["schemas"]["Action"];
                };
            };
        };
        responses: {
            /** @description Step executed successfully */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        observation: components["schemas"]["Observation"];
                        reward: components["schemas"]["Reward"];
                        /**
                         * @description Whether the episode is complete
                         * @example false
                         */
                        done: boolean;
                        /** @description Additional diagnostic information */
                        info: {
                            /** @description Raw metrics from this step */
                            stepMetrics?: Record<string, never>;
                            /** @description Number of events generated this step */
                            eventsGenerated?: number;
                            /** @description Current cost per hour */
                            currentCost?: number;
                        };
                    };
                };
            };
            /** @description Invalid action or episode already complete */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    getRLObservation: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the RL environment */
                environmentId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Current observation */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Observation"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    getRLEnvironment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                environmentId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Environment details */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["RLEnvironment"];
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    cancelRLEnvironment: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                environmentId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /**
             * @description Episode cancelled successfully or was already cancelled.
             *     Returns the same response whether cancelling for the first time or if already cancelled
             *     (idempotent operation).
             */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** Format: uuid */
                        id?: string;
                        /** @enum {boolean} */
                        isActive?: false;
                        /** Format: date-time */
                        cancelledAt?: string;
                        /** @description Message indicating if episode was just cancelled or already cancelled */
                        message?: string;
                    };
                };
            };
            404: components["responses"]["NotFound"];
        };
    };
    submitOptimization: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /** @description ID of simulation to optimize */
                    simulationId: string;
                    goals: components["schemas"]["OptimizationGoals"];
                    testScenario?: {
                        traffic_pattern?: string;
                        /** @default 100 */
                        duration_steps?: number;
                        include_failures?: boolean;
                    };
                    /**
                     * Format: uri
                     * @description Optional HTTPS URL to receive webhook notification when job completes
                     * @example https://your-app.com/webhooks/optimization
                     */
                    webhookUrl?: string;
                    /**
                     * @description Optional secret for HMAC-SHA256 webhook signature verification
                     * @example your-secret-key-here
                     */
                    webhookSecret?: string;
                };
            };
        };
        responses: {
            /** @description Optimization job accepted */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        job?: {
                            id?: string;
                            status?: string;
                            createdAt?: string;
                        };
                        message?: string;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    getOptimizationJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Job status */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["OptimizationJob"];
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    cancelOptimizationJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Job ID */
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /**
             * @description Job cancelled successfully or was already cancelled.
             *     Returns the same response whether cancelling for the first time or if already cancelled
             *     (idempotent operation).
             */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: string;
                        /** @enum {string} */
                        status?: "cancelled";
                        /** Format: date-time */
                        cancelledAt?: string;
                        /** @description Message indicating if job was just cancelled or already cancelled */
                        message?: string;
                    };
                };
            };
            /** @description Job not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Cannot cancel job that is already completed or failed */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "Cannot cancel job that is already completed or failed",
                     *       "status": "completed"
                     *     }
                     */
                    "application/json": {
                        error?: string;
                        status?: string;
                    };
                };
            };
            /** @description Failed to cancel job */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getRecommendations: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Ranked recommendations */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        recommendations?: components["schemas"]["OptimizationRecommendation"][];
                        totalVariants?: number;
                        goals?: components["schemas"]["OptimizationGoals"];
                    };
                };
            };
            /** @description Job not completed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    validateTrafficForecast: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * @description ID of simulation to test
                     * @example sim-abc123
                     */
                    simulationId: string;
                    trafficForecast: components["schemas"]["TrafficForecast"];
                    /**
                     * @description Number of simulation steps to run
                     * @default 100
                     * @example 100
                     */
                    testSteps?: number;
                    /**
                     * Format: uri
                     * @description Optional HTTPS URL to receive webhook notification when job completes
                     * @example https://your-app.com/webhooks/validation
                     */
                    webhookUrl?: string;
                    /**
                     * @description Optional secret for HMAC-SHA256 webhook signature verification
                     * @example your-secret-key-here
                     */
                    webhookSecret?: string;
                };
            };
        };
        responses: {
            /** @description Validation job accepted */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        job?: {
                            /** Format: uuid */
                            id?: string;
                            /** @enum {string} */
                            status?: "pending" | "running";
                            /** @example validation */
                            type?: string;
                            /** Format: date-time */
                            createdAt?: string;
                        };
                        /** @example Validation job started. Poll /predictions/jobs/{id} for status. */
                        message?: string;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    optimizeThresholds: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * @description ID of simulation to optimize
                     * @example sim-abc123
                     */
                    simulationId: string;
                    trafficForecast: components["schemas"]["TrafficForecast"];
                    /**
                     * @description Number of simulation steps to run per test
                     * @default 100
                     * @example 100
                     */
                    testSteps?: number;
                    /**
                     * Format: uri
                     * @description Optional HTTPS URL to receive webhook notification when job completes
                     * @example https://your-app.com/webhooks/threshold-optimization
                     */
                    webhookUrl?: string;
                    /**
                     * @description Optional secret for HMAC-SHA256 webhook signature verification
                     * @example your-secret-key-here
                     */
                    webhookSecret?: string;
                };
            };
        };
        responses: {
            /** @description Optimization job accepted */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        job?: {
                            /** Format: uuid */
                            id?: string;
                            /** @enum {string} */
                            status?: "pending" | "running";
                            /** @example threshold_optimization */
                            type?: string;
                            /** Format: date-time */
                            createdAt?: string;
                        };
                        /** @example Threshold optimization job started. Poll /predictions/jobs/{id} for status. */
                        message?: string;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    getPredictionJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the prediction job */
                jobId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Job status */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** Format: uuid */
                        id?: string;
                        /** @enum {string} */
                        type?: "validation" | "threshold_optimization";
                        /** @enum {string} */
                        status?: "pending" | "running" | "completed" | "failed" | "cancelled";
                        /** Format: date-time */
                        createdAt?: string;
                        /** Format: date-time */
                        completedAt?: string;
                        error?: string;
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    cancelPredictionJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Job ID */
                jobId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /**
             * @description Job cancelled successfully or was already cancelled.
             *     Returns the same response whether cancelling for the first time or if already cancelled
             *     (idempotent operation).
             */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: string;
                        /** @enum {string} */
                        status?: "cancelled";
                        /** Format: date-time */
                        cancelledAt?: string;
                        /** @description Message indicating if job was just cancelled or already cancelled */
                        message?: string;
                    };
                };
            };
            /** @description Job not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Cannot cancel job that is already completed or failed */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "Cannot cancel job that is already completed or failed",
                     *       "status": "completed"
                     *     }
                     */
                    "application/json": {
                        error?: string;
                        status?: string;
                    };
                };
            };
            /** @description Failed to cancel job */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getPredictionResults: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the prediction job */
                jobId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Job results */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        validationResult?: components["schemas"]["ValidationResult"];
                        thresholdTests?: components["schemas"]["ThresholdTestResult"][];
                        bestThresholds?: components["schemas"]["AutoscalingConfig"];
                        recommendations?: components["schemas"]["PredictionRecommendation"][];
                        trafficForecast?: components["schemas"]["TrafficForecast"];
                        /**
                         * @description Present only when the job status is 'failed'. Describes why threshold optimization could not complete (e.g. simulation not found, traffic forecast too short, no valid threshold combination found).
                         * @example No valid threshold combination found — all candidate configurations exceeded the SLA error-rate limit.
                         */
                        error?: string;
                        /**
                         * @description Present only when the job status is 'failed'. Short, actionable steps the caller can take to resolve the failure and resubmit the optimization job.
                         * @example [
                         *       "Increase maxInstances in the simulation's autoscaling config to give the optimizer more headroom",
                         *       "Upgrade to a larger instance size so individual instances handle more load before triggering scale-out"
                         *     ]
                         */
                        suggestions?: string[];
                    };
                };
            };
            /** @description Job not completed yet */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    streamPredictionJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Prediction job ID */
                jobId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description SSE stream of prediction job progress */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/event-stream": string;
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    listChaosScenarios: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description List of chaos scenarios */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ChaosScenario"][];
                };
            };
            500: components["responses"]["InternalError"];
        };
    };
    runChaosTest: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    /**
                     * Format: uuid
                     * @description ID of the base simulation to test
                     * @example a638caad-7423-40a3-bb09-f91235d9392d
                     */
                    simulationId: string;
                    /**
                     * @description Pre-built scenario ID (optional)
                     * @example zone_failure
                     * @enum {string}
                     */
                    scenarioId?: "zone_failure" | "database_crash" | "network_partition" | "cascading_failure" | "random_instance_failure" | "database_slowdown";
                    /** @description Custom failure injections (optional) */
                    customInjections?: components["schemas"]["ChaosInjectionConfig"][];
                    /**
                     * @description Test duration in simulation steps
                     * @default 300
                     * @example 300
                     */
                    duration: number;
                    /**
                     * Format: uri
                     * @description Optional HTTPS URL to receive webhook notification when job completes
                     * @example https://your-app.com/webhooks/chaos
                     */
                    webhookUrl?: string;
                    /**
                     * @description Optional secret for HMAC-SHA256 webhook signature verification
                     * @example your-secret-key-here
                     */
                    webhookSecret?: string;
                };
            };
        };
        responses: {
            /** @description Chaos test job accepted and started */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        job?: {
                            /**
                             * Format: uuid
                             * @example job-abc123
                             */
                            id?: string;
                            /**
                             * @example chaos_test
                             * @enum {string}
                             */
                            type?: "chaos_test";
                            /**
                             * @example running
                             * @enum {string}
                             */
                            status?: "pending" | "running";
                            /** Format: uuid */
                            simulationId?: string;
                            /** Format: date-time */
                            createdAt?: string;
                        };
                        /** @example Chaos test job started. Use GET /chaos/jobs/{id} to check status. */
                        message?: string;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            /** @description Simulation not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getChaosJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the chaos job */
                jobId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Chaos job status */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** Format: uuid */
                        id?: string;
                        /** @enum {string} */
                        type?: "chaos_test";
                        /** @enum {string} */
                        status?: "pending" | "running" | "completed" | "failed";
                        /** Format: uuid */
                        simulationId?: string;
                        scenarioId?: string;
                        /** Format: date-time */
                        createdAt?: string;
                        /** Format: date-time */
                        completedAt?: string | null;
                        error?: string | null;
                        /** @description Resilience score for the job (null while still running) */
                        resilienceScore?: components["schemas"]["ResilienceScore"];
                        /** @description Vulnerabilities detected so far (may be partial while running) */
                        vulnerabilities?: components["schemas"]["Vulnerability"][] | null;
                        /** @description Remediation recommendations (null while still running) */
                        recommendations?: string[] | null;
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    cancelChaosJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Job ID */
                jobId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /**
             * @description Job cancelled successfully or was already cancelled.
             *     Returns the same response whether cancelling for the first time or if already cancelled
             *     (idempotent operation).
             */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: string;
                        /** @enum {string} */
                        status?: "cancelled";
                        /** Format: date-time */
                        cancelledAt?: string;
                        /** @description Message indicating if job was just cancelled or already cancelled */
                        message?: string;
                    };
                };
            };
            /** @description Job not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Cannot cancel job that is already completed or failed */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "Cannot cancel job that is already completed or failed",
                     *       "status": "completed"
                     *     }
                     */
                    "application/json": {
                        error?: string;
                        status?: string;
                    };
                };
            };
            /** @description Failed to cancel job */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getChaosResults: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the chaos job */
                jobId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Chaos test results */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        resilienceScore?: components["schemas"]["ResilienceScore"];
                        vulnerabilities?: components["schemas"]["Vulnerability"][];
                        /** @description Chronological events during the test */
                        timeline?: {
                            /** @description Simulation step when event occurred */
                            time?: number;
                            /** @description Event description */
                            event?: string;
                            /** @enum {string} */
                            severity?: "info" | "warning" | "critical";
                        }[];
                        /** @description Recommendations for improving resilience */
                        recommendations?: string[];
                        scenario?: components["schemas"]["ChaosScenario"];
                        /** @description Failures that were injected */
                        injections?: components["schemas"]["ChaosInjectionConfig"][];
                    };
                };
            };
            /** @description Job not completed yet */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    streamChaosJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Chaos job ID */
                jobId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description SSE stream of chaos job progress */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/event-stream": string;
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    createBatchChaosTest: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["BatchChaosRequest"];
            };
        };
        responses: {
            /** @description Batch chaos test job accepted and started */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        job?: {
                            /**
                             * Format: uuid
                             * @example batch_xyz789
                             */
                            id?: string;
                            /**
                             * @example batch_chaos_test
                             * @enum {string}
                             */
                            type?: "batch_chaos_test";
                            /**
                             * @example running
                             * @enum {string}
                             */
                            status?: "pending" | "running";
                            /**
                             * @description Number of child chaos tests in this batch
                             * @example 3
                             */
                            totalJobs?: number;
                            /** Format: date-time */
                            createdAt?: string;
                        };
                        /** @example Batch chaos test started. Use GET /chaos/batch/{id} to check status. */
                        message?: string;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
            /** @description Simulation not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            429: components["responses"]["TooManyRequests"];
        };
    };
    getBatchChaosJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the batch chaos job */
                batchId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Batch chaos job status and aggregated results */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["BatchChaosJob"];
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    cancelBatchChaosJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the batch chaos job */
                batchId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /**
             * @description Batch cancelled successfully or was already cancelled.
             *     Returns the same response whether cancelling for the first time or if already cancelled.
             */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** Format: uuid */
                        id?: string;
                        /** @enum {string} */
                        status?: "cancelled";
                        /** Format: date-time */
                        cancelledAt?: string;
                        message?: string;
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
            /** @description Cannot cancel batch that is already completed or failed */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "Cannot cancel batch that is already completed or failed",
                     *       "status": "completed"
                     *     }
                     */
                    "application/json": {
                        error?: string;
                        status?: string;
                    };
                };
            };
            429: components["responses"]["TooManyRequests"];
        };
    };
    getBatchChaosResults: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the batch chaos job */
                batchId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Detailed batch chaos test results with full child job data */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** Format: uuid */
                        batchId?: string;
                        /** @enum {string} */
                        status?: "pending" | "running" | "completed" | "failed" | "cancelled" | "partial_failed";
                        totalJobs?: number;
                        completedJobs?: number;
                        failedJobs?: number;
                        aggregatedResilienceScore?: components["schemas"]["ResilienceScore"];
                        aggregatedVulnerabilities?: {
                            id?: string;
                            severity?: string;
                            title?: string;
                            occurrences?: number;
                        }[];
                        aggregatedRecommendations?: string[];
                        /** @description Full details for each child chaos job */
                        childJobs?: {
                            /** Format: uuid */
                            id?: string;
                            /** @enum {string} */
                            status?: "pending" | "running" | "completed" | "failed" | "cancelled";
                            scenarioId?: string;
                            duration?: number;
                            resilienceScore?: components["schemas"]["ResilienceScore"];
                            vulnerabilities?: components["schemas"]["Vulnerability"][];
                            recommendations?: string[];
                            timeline?: {
                                time?: number;
                                event?: string;
                                severity?: string;
                            }[];
                            error?: string;
                        }[];
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    exploreMultiCloudStrategies: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": {
                    workloadProfile: components["schemas"]["WorkloadProfile"];
                    /** @description Weights for optimization objectives (must sum to 1.0) */
                    optimizationWeights?: {
                        /**
                         * @description Weight for cost optimization
                         * @default 0.4
                         * @example 0.4
                         */
                        cost?: number;
                        /**
                         * @description Weight for latency optimization
                         * @default 0.4
                         * @example 0.4
                         */
                        latency?: number;
                        /**
                         * @description Weight for minimizing vendor lock-in
                         * @default 0.2
                         * @example 0.2
                         */
                        vendorLockIn?: number;
                    };
                    /**
                     * Format: uri
                     * @description Optional HTTPS URL to receive webhook notification when job completes
                     * @example https://your-app.com/webhooks/multicloud
                     */
                    webhookUrl?: string;
                    /**
                     * @description Optional secret for HMAC-SHA256 webhook signature verification
                     * @example your-secret-key-here
                     */
                    webhookSecret?: string;
                };
            };
        };
        responses: {
            /** @description Multi-cloud exploration job started */
            202: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        job?: {
                            /**
                             * Format: uuid
                             * @example job-abc123
                             */
                            id?: string;
                            /**
                             * @example multicloud_exploration
                             * @enum {string}
                             */
                            type?: "multicloud_exploration";
                            /**
                             * @example running
                             * @enum {string}
                             */
                            status?: "pending" | "running";
                            /** Format: date-time */
                            createdAt?: string;
                        };
                        /** @example Multi-cloud exploration started. Use GET /multi-cloud/jobs/{id} to check status. */
                        message?: string;
                    };
                };
            };
            400: components["responses"]["BadRequest"];
            401: components["responses"]["Unauthorized"];
        };
    };
    getMultiCloudJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the multi-cloud job */
                jobId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Multi-cloud job status */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        /** Format: uuid */
                        id?: string;
                        /** @enum {string} */
                        status?: "pending" | "running" | "completed" | "failed";
                        /**
                         * @description Completion progress (0-100)
                         * @example 75
                         */
                        progress?: number;
                        /**
                         * @description Number of strategies generated so far
                         * @example 12
                         */
                        strategiesGenerated?: number;
                        workloadProfile?: components["schemas"]["WorkloadProfile"];
                        optimizationWeights?: {
                            cost?: number;
                            latency?: number;
                            vendorLockIn?: number;
                        };
                        /** Format: date-time */
                        createdAt?: string;
                        /** Format: date-time */
                        updatedAt?: string;
                        /** Format: date-time */
                        completedAt?: string;
                        error?: string;
                    };
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    cancelMultiCloudJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Job ID */
                jobId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /**
             * @description Job cancelled successfully or was already cancelled.
             *     Returns the same response whether cancelling for the first time or if already cancelled
             *     (idempotent operation).
             */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        id?: string;
                        /** @enum {string} */
                        status?: "cancelled";
                        /** Format: date-time */
                        cancelledAt?: string;
                        /** @description Message indicating if job was just cancelled or already cancelled */
                        message?: string;
                    };
                };
            };
            /** @description Job not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Cannot cancel job that is already completed or failed */
            409: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    /**
                     * @example {
                     *       "error": "Cannot cancel job that is already completed or failed",
                     *       "status": "completed"
                     *     }
                     */
                    "application/json": {
                        error?: string;
                        status?: string;
                    };
                };
            };
            /** @description Failed to cancel job */
            500: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
    getMultiCloudResults: {
        parameters: {
            query?: {
                /**
                 * @description Comma-separated list of cloud provider names to filter results by preferred primary provider.
                 *     A strategy is included if any of the specified providers holds ≥ 50 % of the traffic allocation.
                 *     Supported values: `aws`, `gcp`, `azure`, `digitalocean`, `oci`.
                 *     If omitted, all strategies are returned.
                 */
                providers?: string;
            };
            header?: never;
            path: {
                /** @description ID of the multi-cloud job */
                jobId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Job results (partial or complete based on job status) */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": {
                        jobId?: string;
                        /** @enum {string} */
                        status?: "pending" | "running" | "completed" | "failed" | "cancelled";
                        /** @description Job progress percentage (0-100) */
                        progress?: number;
                        /** @description True if job is finished, false if still running or pending */
                        isComplete?: boolean;
                        /** @description Number of strategies generated so far */
                        strategiesGenerated?: number;
                        /** @description All raw strategies generated so far (available during and after generation) */
                        allStrategies?: components["schemas"]["Strategy"][];
                        /** @description Top 10 optimized strategies (only available when status is completed) */
                        topStrategies?: components["schemas"]["Strategy"][];
                        /** @description Markdown comparison report (only available when complete) */
                        comparisonReport?: string;
                        /** Format: date-time */
                        completedAt?: string;
                    };
                };
            };
            /** @description Job not completed yet */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            401: components["responses"]["Unauthorized"];
            404: components["responses"]["NotFound"];
        };
    };
    streamMultiCloudJob: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description Multi-cloud job ID */
                jobId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description SSE stream of job updates */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "text/event-stream": string;
                };
            };
            /** @description Unauthorized - invalid or missing API key */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Job not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
            /** @description Rate limit exceeded */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["Error"];
                };
            };
        };
    };
}
//# sourceMappingURL=openapi-types.d.ts.map