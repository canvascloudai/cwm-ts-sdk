# Cloud World Model — TypeScript SDK

A fully-typed TypeScript/JavaScript SDK for the [Cloud World Model](https://cloudworldmodel.ai) API.
Covers all 75 public operations across simulations, RL training, chaos engineering, multi-cloud
exploration, predictive scaling, and API key management.

Install from GitHub:

```bash
npm install "github:canvascloudai/cwm-ts-sdk"
```

## End-to-End Quick Start

A complete runnable example that chains the most common operations together:
create a simulation, run a step, get an AI explanation, inject chaos, and optimize.

```typescript
import { CwmClient } from "@cwm/sdk";

const client = new CwmClient({
  baseUrl: "http://localhost:5000",
  apiKey: "cwm_your_key",
});

// 1. Create a simulation with two AWS resources
const sim = await client.createSimulation({
  name: "Production Cluster",
  resources: [
    { id: "web-1", type: "compute", name: "Web Server", provider: "aws" },
    { id: "db-1",  type: "database", name: "Primary DB", provider: "aws" },
  ],
  connections: [{ from: "web-1", to: "db-1" }],
});
console.log("Created simulation:", sim.id);

// 2. Advance the simulation by one step
const step = await client.simulateStep(sim.id);
console.log("CPU after step:", step.metrics?.cpuUsage);

// 3. Get an AI explanation of what just happened
const { explanation } = await client.explainSimulation(sim.id, { beginnerMode: true });
console.log("AI says:", explanation);

// 4. Run a chaos experiment and wait for results
const chaosResp = await client.runChaosTest({
  simulationId: sim.id,
  scenarioId: "zone_failure",
  duration: 120,
});
const chaosResults = await client.waitForChaosJob(chaosResp.job?.id ?? "");
console.log("Resilience score:", chaosResults.resilienceScore?.overall);

// 5. Submit an optimization job and fetch recommendations
const optResp = await client.submitOptimization({ simulationId: sim.id });
const jobId = optResp.job?.id ?? "";
// Poll until done
let optJob = await client.getOptimizationJob(jobId);
while (optJob.status === "pending" || optJob.status === "running") {
  await new Promise((r) => setTimeout(r, 2_000));
  optJob = await client.getOptimizationJob(jobId);
}
const recs = await client.getRecommendations(jobId);
console.log("Top recommendation:", recs.recommendations?.[0]?.title);
```

## Generated Client

A fully generated, type-safe client can be produced from `openapi.yaml` using
[`openapi-typescript`](https://openapi-ts.dev/) + [`openapi-fetch`](https://openapi-ts.dev/openapi-fetch/).
It covers **every public operation** — no hand-written boilerplate required.

> **Before using this client, run the generator from the repo root:**
> ```bash
> npm run generate-sdk
> ```

```typescript
import { createGeneratedClient } from "@cwm/sdk/generated-client";

const api = createGeneratedClient({
  baseUrl: "http://localhost:5000",
  apiKey: "cwm_your_key",
});

// GET /simulations/{simulationId} — path params, query params, and response are all typed
const { data: sim, error } = await api.GET("/simulations/{simulationId}", {
  params: { path: { simulationId: "abc123" } },
});

// POST /chaos/run — request body is fully typed from the spec
const { data: chaosJob } = await api.POST("/chaos/run", {
  body: { simulationId: sim!.id, scenarioId: "zone_failure", duration: 300 },
});

// POST /rl/environments/{environmentId}/step
const { data: step } = await api.POST("/rl/environments/{environmentId}/step", {
  params: { path: { environmentId: "env_xyz" } },
  body: { action: { type: "scale_out", parameters: {} } },
});

// POST /multi-cloud/explore
const { data: mcJob } = await api.POST("/multi-cloud/explore", {
  body: {
    workloadProfile: { computeInstances: 10, databaseInstances: 2, storageGB: 500,
                       trafficRPS: 1000, latencyRequirementMs: 200, primaryRegion: "us-east-1" },
  },
});

// DELETE /chaos/jobs/{jobId} — cancel a running job
await api.DELETE("/chaos/jobs/{jobId}", {
  params: { path: { jobId: chaosJob!.job?.id ?? "" } },
});
```

TypeScript catches mismatched paths, wrong parameter names, and incorrect response shapes at
**compile time** — if the spec changes and you regenerate, type errors surface immediately.

## Ergonomic Wrapper Client

For common workflows, the `CwmClient` provides convenient methods with polling helpers.
Every method is typed directly from the OpenAPI spec — request bodies and response shapes
are derived from generated indexed-access types, so they can never drift from the spec.

```typescript
import { CwmClient } from "@cwm/sdk";

const client = new CwmClient({
  baseUrl: "http://localhost:5000",
  apiKey: "cwm_your_key",
});

// Create a simulation (original core types are preserved for back-compat)
const sim = await client.createSimulation({
  name: "My Cluster",
  resources: [{ id: "web", type: "compute", name: "Web Server", provider: "aws" }],
  connections: [],
});

// Step the simulation — typed from the OpenAPI spec
const step = await client.simulateStep(sim.id);

// RL training loop — ergonomic args: simulationId + optional episode config
const envResp = await client.createRlEnvironment(sim.id);
for (let i = 0; i < 100; i++) {
  // body typed from StepRLEnvironmentRequest
  const result = await client.rlStep(envResp.environment?.id ?? "", {
    action: { type: "scale_out", parameters: {} },
  });
  if (result.done) await client.rlReset(envResp.environment?.id ?? "");
}

// Chaos experiment — body typed from RunChaosTestRequest
const chaosResp = await client.runChaosTest({
  simulationId: sim.id,
  scenarioId: "zone_failure",
});
// Built-in polling helper waits until completed
const results = await client.waitForChaosJob(chaosResp.job?.id ?? "");
console.log(`Resilience score: ${results.resilienceScore?.overall}`);

// Traffic patterns — pattern typed from CreateTrafficPatternRequest
// body: { type, amplitude, period, isActive? } — no `name` field
const pattern = await client.createTrafficPattern(sim.id, {
  type: "sine", amplitude: 0.5, period: 24, isActive: true,
});
await client.updateTrafficPattern(pattern.id ?? "", { isActive: false });

// AI analysis — body typed from ExplainSimulationRequest / AnalyzeBottlenecksRequest
const { explanation } = await client.explainSimulation(sim.id, { beginnerMode: true });
const { analysis } = await client.analyzeBottlenecks(sim.id);

// Batch chaos — body typed from CreateBatchChaosTestRequest
const batchResp = await client.createBatchChaosTest({
  simulationId: sim.id,
  scenarios: [
    { scenarioId: "zone_failure", duration: 120 },
    { scenarioId: "database_crash", duration: 90 },
  ],
});
const batchResults = await client.getBatchChaosResults(batchResp.job?.id ?? "");

// Multi-cloud exploration — body typed from ExploreMultiCloudStrategiesRequest
const mcResp = await client.exploreMultiCloudStrategies({
  workloadProfile: {
    computeInstances: 10, databaseInstances: 2, storageGB: 500,
    trafficRPS: 1000, latencyRequirementMs: 200, primaryRegion: "us-east-1",
  },
  optimizationWeights: { cost: 0.4, latency: 0.4, vendorLockIn: 0.2 },
});
const mcResults = await client.waitForMulticloudJob(mcResp.job?.id ?? "");
```

## Which Client Should I Use?

| Use case | Client |
|---|---|
| Access all 75 public operations with full type safety | `createGeneratedClient` (requires `npm run generate-sdk`) |
| Common workflows with ergonomic method names | `CwmClient` |
| Strongly-typed low-level control over every parameter | `createGeneratedClient` (requires `npm run generate-sdk`) |
| Built-in polling helpers (`waitForChaosJob`, etc.) | `CwmClient` |

## CwmClient API Reference

All request-body parameters and return types for the new methods are derived directly from
`api-types.ts` via indexed-access types on the generated `operations` map.  Import the named
types from `@cwm/sdk` for full IntelliSense — e.g. `import type { RunChaosTestRequest } from "@cwm/sdk"`.

> **Setup assumed by every snippet below:**
> ```typescript
> import { CwmClient } from "@cwm/sdk";
> const client = new CwmClient({ baseUrl: "http://localhost:5000", apiKey: "cwm_your_key" });
>
> // Many examples also reference `sim` — create it once and reuse:
> const sim = await client.createSimulation({
>   name: "My Cluster",
>   resources: [{ id: "web-1", type: "compute", name: "Web Server", provider: "aws" }],
>   connections: [],
> });
> ```
> See the [End-to-End Quick Start](#end-to-end-quick-start) above for a fully self-contained runnable example.
>
> **Note:** snippets use top-level `await`, which requires TypeScript with `"module": "ESNext"` (or
> `"module": "NodeNext"`) and `"target": "ES2022"` or later. If you are using CommonJS, wrap the
> calls in an `async function main() { ... } main();` block.
>
> **Note on `?? ""` patterns:** several snippets use `resp.job?.id ?? ""` as a concise fallback.
> In production code, replace this with an explicit guard before calling downstream methods:
> ```typescript
> const jobId = resp.job?.id;
> if (!jobId) throw new Error("API did not return a job ID");
> ```

### Description

| Method | operationId | Description |
|---|---|---|
| `getDescription()` | `getDescription` | Get a human-readable description of the simulator API |

```typescript
const desc = await client.getDescription();
console.log(desc.description);
```

### Simulations

| Method | operationId | Description |
|---|---|---|
| `createSimulation(spec)` | `createSimulation` | Create a virtual cloud environment |
| `listSimulations()` | `listSimulations` | List all simulations for the authenticated key |
| `getSimulation(id)` | `getSimulation` | Fetch simulation state |
| `updateSimulation(id, body)` | `updateSimulation` | Update a simulation's configuration; body: `UpdateSimulationRequest` |
| `deleteSimulation(id)` | `deleteSimulation` | Delete a simulation |
| `simulateStep(id)` | `stepSimulation` | Advance one tick; returns `StepSimulationResponse` |
| `stepSimulationHybrid(id, body?)` | `stepSimulationHybrid` | Advance using hybrid rule+ML logic; body: `StepSimulationHybridRequest` |
| `getHybridResult(id)` | `getHybridResult` | Get the cumulative hybrid decision history |
| `injectTraffic(id)` | `injectTraffic` | Inject a random traffic spike |
| `injectFailure(id)` | `injectFailure` | Inject a random node failure |
| `getSimulationMetrics(id, options?)` | `getSimulationMetrics` | Get metrics history (array); optional `{ limit }` |
| `getSimulationEvents(id, options?)` | `getSimulationEvents` | Get event log (array); optional `{ limit }` |
| `createSimulationEvent(id, body)` | `createSimulationEvent` | Manually add an event; body: `CreateSimulationEventRequest` |
| `clearSimulationEvents(id)` | `clearSimulationEvents` | Clear all events |

```typescript
// Create, step, inspect, then clean up
const sim = await client.createSimulation({
  name: "Load Test Env",
  resources: [{ id: "api", type: "compute", name: "API Server", provider: "gcp" }],
  connections: [],
});

// Advance two steps — the second uses hybrid ML+rules logic
await client.simulateStep(sim.id);
// stepSimulationHybrid body: { config?: { mlWeight?, confidenceThreshold? } }
const hybridStep = await client.stepSimulationHybrid(sim.id, {
  config: { mlWeight: 0.6, confidenceThreshold: 0.5 },
});
console.log("Hybrid decision:", hybridStep.hybridResult?.decision);

// Inject chaos on the live simulation
await client.injectTraffic(sim.id);
await client.injectFailure(sim.id);

// getSimulationMetrics / getSimulationEvents return arrays directly
const metrics = await client.getSimulationMetrics(sim.id, { limit: 10 });
const events  = await client.getSimulationEvents(sim.id, { limit: 10 });
console.log("Latest CPU:", metrics[metrics.length - 1]?.cpuUsage);
console.log("Last event:", events[events.length - 1]?.message);

// Manually log a custom event, then clear all events
await client.createSimulationEvent(sim.id, {
  type: "info",
  message: "Manual deployment triggered",
});
await client.clearSimulationEvents(sim.id);

// Rename the simulation, then delete it when done
await client.updateSimulation(sim.id, { name: "Load Test Env v2" });
await client.deleteSimulation(sim.id);
```

### Traffic Patterns

| Method | operationId | Description |
|---|---|---|
| `listTrafficPatterns(simId)` | `listTrafficPatterns` | List traffic patterns for a simulation (returns array) |
| `createTrafficPattern(simId, body)` | `createTrafficPattern` | Create a traffic pattern; body: `CreateTrafficPatternRequest` |
| `updateTrafficPattern(patternId, body)` | `updateTrafficPattern` | Update a traffic pattern; body: `UpdateTrafficPatternRequest` |
| `deleteTrafficPattern(patternId)` | `deleteTrafficPattern` | Delete a traffic pattern |

```typescript
// Add a sine-wave pattern that peaks at 1 000 RPS over a 24-hour period
// createTrafficPattern body: { type, amplitude, period, isActive? } — no `name` field
const pattern = await client.createTrafficPattern(sim.id, {
  type: "sine",
  amplitude: 0.5,   // 50% amplitude multiplier
  period: 24,       // 24 simulation steps per cycle
  isActive: true,
});
console.log("Pattern ID:", pattern.id);

// listTrafficPatterns returns an array directly
const patterns = await client.listTrafficPatterns(sim.id);
console.log("Active patterns:", patterns.length);

// Temporarily disable the pattern
await client.updateTrafficPattern(pattern.id ?? "", { isActive: false });

// Remove it entirely when done
await client.deleteTrafficPattern(pattern.id ?? "");
```

### Failure Injections

| Method | operationId | Description |
|---|---|---|
| `listFailureInjections(simId)` | `listFailureInjections` | List scheduled failure injections (returns array) |
| `createFailureInjection(simId, body)` | `createFailureInjection` | Schedule a failure injection; body: `CreateFailureInjectionRequest` |
| `updateFailureInjection(failureId, body)` | `updateFailureInjection` | Update a failure injection; body: `UpdateFailureInjectionRequest` |
| `deleteFailureInjection(failureId)` | `deleteFailureInjection` | Delete a failure injection |

```typescript
// Schedule an AZ outage that fires from step 5 through step 25
// createFailureInjection body: { name (required), type, startTime, endTime?, targetZone?, isActive? }
const injection = await client.createFailureInjection(sim.id, {
  name: "AZ Outage — us-east-1a",
  type: "az_outage",
  startTime: 5,
  endTime: 25,
  targetZone: "us-east-1a",
  isActive: true,
});
console.log("Injection ID:", injection.id);

// listFailureInjections returns an array directly
const failures = await client.listFailureInjections(sim.id);
console.log("Pending injections:", failures.length);

// Push the window back by 10 steps
await client.updateFailureInjection(injection.id ?? "", { startTime: 15, endTime: 35 });

// Cancel the injection before it fires
await client.deleteFailureInjection(injection.id ?? "");
```

### AI Analysis

| Method | operationId | Description |
|---|---|---|
| `explainSimulation(id, body?)` | `explainSimulation` | AI explanation of simulation behaviour; body: `ExplainSimulationRequest` |
| `optimizeSimulation(id, body?)` | `optimizeSimulation` | AI optimisation suggestions; body: `OptimizeSimulationRequest` |
| `troubleshootSimulation(id, body)` | `troubleshootSimulation` | AI troubleshooting; body: `TroubleshootSimulationRequest` |
| `bulkResizeSimulation(id, body)` | `bulkResizeSimulation` | Resize all compute resources; body: `BulkResizeSimulationRequest` |
| `analyzeBottlenecks(id, body?)` | `analyzeBottlenecks` | AI bottleneck analysis; body: `AnalyzeBottlenecksRequest` |
| `explainAutoscaling(id, body?)` | `explainAutoscaling` | AI explanation of autoscaling decisions; body: `ExplainAutoscalingRequest` |
| `getRightSizingHint(id)` | `getRightSizingHint` | Get right-sizing recommendations |
| `validateCostAccuracy(id)` | `validateCostAccuracy` | Validate cost accuracy vs provider benchmarks |
| `validatePerformanceAccuracy(id)` | `validatePerformanceAccuracy` | Validate performance accuracy vs provider benchmarks |
| `validateAccuracy(id)` | `validateAccuracy` | Validate both cost and performance accuracy |

```typescript
// Plain-English explanation — great for beginners
const { explanation } = await client.explainSimulation(sim.id, { beginnerMode: true });
console.log("Explanation:", explanation);

// Targeted AI optimisation suggestions
// optimizeSimulation body: { beginnerMode? } — use beginnerMode: true for plain-English output
const { suggestions } = await client.optimizeSimulation(sim.id, { beginnerMode: false });
console.log("Suggestions:", suggestions);

// Ask the AI to troubleshoot a specific observed symptom
const { analysis: trouble } = await client.troubleshootSimulation(sim.id, {
  issue: "High p99 latency after traffic spike",
});
console.log("Root cause:", trouble);

// Resize every compute resource to a specific DigitalOcean Droplet size
await client.bulkResizeSimulation(sim.id, { targetSize: "s-4vcpu-8gb" });

// Identify bottlenecks and get autoscaling insight
const { analysis: bottlenecks } = await client.analyzeBottlenecks(sim.id);
const { explanation: asExplanation } = await client.explainAutoscaling(sim.id);

// Right-sizing and accuracy validation
const hint = await client.getRightSizingHint(sim.id);
console.log("Recommended size:", hint.recommendation);

const costReport = await client.validateCostAccuracy(sim.id);
const perfReport = await client.validatePerformanceAccuracy(sim.id);
const fullReport = await client.validateAccuracy(sim.id);
console.log("Cost within tolerance?", costReport.withinTolerance);
console.log("Perf within tolerance?", perfReport.withinTolerance);
```

### Scenarios

| Method | operationId | Description |
|---|---|---|
| `listScenarios()` | `listScenarios` | List all simulation scenario templates (returns array) |
| `listChaosScenarios()` | `listChaosScenarios` | List built-in chaos failure scenarios (returns array) |
| `getScenario(scenarioId)` | `getScenario` | Get a scenario template by ID |

```typescript
// listScenarios and listChaosScenarios return arrays directly
const scenarios = await client.listScenarios();
console.log("Available scenarios:", scenarios.map((s) => s.id));

const chaosScenarios = await client.listChaosScenarios();
console.log("Chaos scenarios:", chaosScenarios.map((s) => s.id));

// Fetch a specific scenario template to inspect its default config
const scenario = await client.getScenario("high_traffic");
console.log("Scenario description:", scenario.scenario?.description);
```

### Pricing History

| Method | operationId | Description |
|---|---|---|
| `getPricingHistory()` | `getPricingHistory` | Get cloud provider pricing history |
| `getPricingTrend(resourceId)` | `getPricingTrend` | Get price trend for a specific resource |

```typescript
// getPricingHistory returns { snapshots, changes, providerTrends }
const history = await client.getPricingHistory();
console.log("Snapshots available:", history.snapshots?.length);
console.log("Recent price changes:", history.changes?.length);
console.log("AWS trend:", history.providerTrends?.aws);

// getPricingTrend returns { resourceId, trend } where trend is an array of { date, label, price }
const trendResp = await client.getPricingTrend("aws-ec2-m5xlarge");
const latest = trendResp.trend?.[trendResp.trend.length - 1];
console.log("Latest price for", trendResp.resourceId, ":", latest?.price, "$/hr", "(", latest?.label, ")");
```

### RL Environments

| Method | operationId | Description |
|---|---|---|
| `createRlEnvironment(body)` | `createRLEnvironment` | Create Gym-compatible RL env; body: `CreateRLEnvironmentRequest` |
| `getRlEnvironment(envId)` | `getRLEnvironment` | Get RL environment details |
| `rlReset(envId)` | `resetRLEnvironment` | Start a new episode |
| `rlStep(envId, body)` | `stepRLEnvironment` | Execute an action; body: `StepRLEnvironmentRequest`; returns `StepRLEnvironmentResponse` |
| `getRlObservation(envId)` | `getRLObservation` | Get current observation without stepping |
| `cancelRlEnvironment(envId)` | `cancelRLEnvironment` | Cancel an RL training episode |

```typescript
// Create an RL environment backed by an existing simulation
const envResp = await client.createRlEnvironment(sim.id, {
  episodeConfig: { maxSteps: 200 },
});
const envId = envResp.environment?.id ?? "";

// Inspect the initial observation before taking any action
const initialObs = await client.getRlObservation(envId);
console.log("Initial CPU:", initialObs.observation?.cpuUsage);

// Run one training episode — scale out when CPU is high.
// Refresh the observation after each step to inform the next action.
let currentObs = initialObs;
for (let i = 0; i < 200; i++) {
  const action = (currentObs.observation?.cpuUsage ?? 0) > 80 ? "scale_out" : "no_op";
  const result = await client.rlStep(envId, { action: { type: action } });
  console.log(`Step ${i}: reward=${result.reward}, done=${result.done}`);
  if (result.done) {
    await client.rlReset(envId);  // start a fresh episode
    break;
  }
  // Fetch a fresh observation for the next action decision
  currentObs = await client.getRlObservation(envId);
}

// Get environment metadata
const envDetails = await client.getRlEnvironment(envId);
console.log("Total steps taken:", envDetails.environment?.totalSteps);

// Cancel the environment when training is complete
await client.cancelRlEnvironment(envId);
```

### Infrastructure Optimisation

| Method | operationId | Description |
|---|---|---|
| `submitOptimization(body)` | `submitOptimization` | Submit an optimization job; body: `SubmitOptimizationRequest`; use `resp.job?.id` to poll |
| `getOptimizationJob(id)` | `getOptimizationJob` | Poll optimization job status |
| `cancelOptimizationJob(id)` | `cancelOptimizationJob` | Cancel an optimization job |
| `getRecommendations(id)` | `getRecommendations` | Fetch optimization recommendations; returns `{ recommendations, totalVariants }` |

```typescript
// Submit a cost-focused optimization analysis
const optResp = await client.submitOptimization({
  simulationId: sim.id,
  optimizationGoal: "cost",
});
const jobId = optResp.job?.id ?? "";

// Poll until the job finishes
let job = await client.getOptimizationJob(jobId);
while (job.status === "pending" || job.status === "running") {
  await new Promise((r) => setTimeout(r, 2_000));
  job = await client.getOptimizationJob(jobId);
}

if (job.status === "completed") {
  // getRecommendations returns { recommendations, totalVariants }
  const recs = await client.getRecommendations(jobId);
  for (const rec of recs.recommendations ?? []) {
    console.log(`${rec.title} — saves $${rec.estimatedSavings}/mo`);
  }
} else {
  // Cancel a still-running job if you no longer need it
  await client.cancelOptimizationJob(jobId);
}
```

### Predictive Scaling

| Method | operationId | Description |
|---|---|---|
| `validateTrafficForecast(body)` | `validateTrafficForecast` | Validate infrastructure against a traffic forecast; body: `ValidateTrafficForecastRequest`; use `resp.job?.id` to poll |
| `optimizeThresholds(body)` | `optimizeThresholds` | Find optimal autoscaling thresholds; body: `OptimizeThresholdsRequest`; use `resp.job?.id` to poll |
| `getPredictionJob(jobId)` | `getPredictionJob` | Poll prediction job status |
| `getPredictionResults(jobId)` | `getPredictionResults` | Fetch prediction results |
| `cancelPredictionJob(jobId)` | `cancelPredictionJob` | Cancel a prediction job |
| `waitForPredictionJob(jobId, options?)` | — | Poll until complete; returns `GetPredictionResultsResponse` |
| `streamPredictionJob(jobId)` | `streamPredictionJob` | Returns SSE stream URL for real-time progress |

```typescript
// Validate that the current infrastructure can handle a forecasted traffic spike
const forecastResp = await client.validateTrafficForecast({
  simulationId: sim.id,
  forecastedRPS: 5_000,
  durationSeconds: 3_600,
});
// Built-in polling helper — waits up to 5 minutes by default
const forecastResults = await client.waitForPredictionJob(forecastResp.job?.id ?? "");
console.log("SLA violations:", forecastResults.results?.slaViolations);

// Find optimal scale-out/in thresholds for a given traffic pattern
const thresholdResp = await client.optimizeThresholds({
  simulationId: sim.id,
  targetP99LatencyMs: 200,
});
const thresholdResults = await client.waitForPredictionJob(thresholdResp.job?.id ?? "");
console.log("Recommended scale-out threshold:", thresholdResults.results?.scaleOutThreshold);

// Stream real-time progress instead of polling
import EventSource from "eventsource"; // npm install eventsource
const streamUrl = client.streamPredictionJob(forecastResp.job?.id ?? "");
const es = new EventSource(streamUrl, { headers: { Authorization: `Bearer cwm_your_key` } });
es.onmessage = (e) => console.log("progress:", JSON.parse(e.data));
es.onerror   = () => es.close();
```

### Chaos Engineering

| Method | operationId | Description |
|---|---|---|
| `listChaosScenarios()` | `listChaosScenarios` | List built-in chaos failure scenarios (returns array) |
| `runChaosTest(body)` | `runChaosTest` | Start async chaos experiment; body: `RunChaosTestRequest`; use `resp.job?.id` to poll |
| `getChaosJob(jobId)` | `getChaosJob` | Poll chaos job status |
| `getChaosResults(jobId)` | `getChaosResults` | Fetch resilience score + vulnerabilities |
| `cancelChaosJob(jobId)` | `cancelChaosJob` | Cancel a running chaos job |
| `createBatchChaosTest(body)` | `createBatchChaosTest` | Run multiple chaos scenarios in parallel; body: `CreateBatchChaosTestRequest`; use `resp.job?.id` to poll |
| `getBatchChaosJob(batchId)` | `getBatchChaosJob` | Poll batch chaos job status |
| `getBatchChaosResults(batchId)` | `getBatchChaosResults` | Fetch batch chaos results; returns `{ status, completedJobs, totalJobs, aggregatedResilienceScore, childJobs }` |
| `cancelBatchChaosJob(batchId)` | `cancelBatchChaosJob` | Cancel a running batch chaos job |
| `waitForChaosJob(jobId, options?)` | — | Poll until complete; returns `GetChaosResultsResponse` |
| `streamChaosJob(jobId)` | `streamChaosJob` | Returns SSE stream URL for real-time progress |

```typescript
// Run a single chaos scenario and wait for the resilience report
const chaosResp = await client.runChaosTest({
  simulationId: sim.id,
  scenarioId: "zone_failure",
  duration: 180,
});
const chaosResults = await client.waitForChaosJob(chaosResp.job?.id ?? "");
console.log("Overall resilience:", chaosResults.resilienceScore?.overall);
for (const v of chaosResults.vulnerabilities ?? []) {
  console.log(`Vulnerability [${v.severity}]: ${v.description}`);
}

// Run multiple scenarios in parallel with a single batch call
const batchResp = await client.createBatchChaosTest({
  simulationId: sim.id,
  scenarios: [
    { scenarioId: "zone_failure",     duration: 120 },
    { scenarioId: "database_crash",   duration: 90  },
    { scenarioId: "network_partition", duration: 60 },
  ],
});
const batchId = batchResp.job?.id ?? "";

// Poll the batch job status manually
let batchJob = await client.getBatchChaosJob(batchId);
while (batchJob.status === "pending" || batchJob.status === "running") {
  await new Promise((r) => setTimeout(r, 2_000));
  batchJob = await client.getBatchChaosJob(batchId);
}
// getBatchChaosResults returns { status, completedJobs, totalJobs, aggregatedResilienceScore, childJobs }
const batchResults = await client.getBatchChaosResults(batchId);
console.log(`Completed ${batchResults.completedJobs}/${batchResults.totalJobs} scenarios`);
console.log("Aggregated resilience:", batchResults.aggregatedResilienceScore?.overall);

// To cancel a job that's still running, check status first
const anotherResp = await client.runChaosTest({
  simulationId: sim.id,
  scenarioId: "database_crash",
  duration: 300,
});
const runningJobId = anotherResp.job?.id ?? "";
const runningJob = await client.getChaosJob(runningJobId);
if (runningJob.status === "pending" || runningJob.status === "running") {
  await client.cancelChaosJob(runningJobId);
  console.log("Job cancelled");
}
```

### Multi-Cloud Strategy

| Method | operationId | Description |
|---|---|---|
| `exploreMultiCloudStrategies(body)` | `exploreMultiCloudStrategies` | Start multi-cloud strategy exploration; body: `ExploreMultiCloudStrategiesRequest`; use `resp.job?.id` to poll |
| `getMulticloudJob(jobId)` | `getMultiCloudJob` | Poll exploration job status |
| `getMulticloudResults(jobId, options?)` | `getMultiCloudResults` | Fetch ranked strategies; returns `{ status, isComplete, strategiesGenerated, topStrategies }`; optional `{ providers }` filter |
| `cancelMultiCloudJob(jobId)` | `cancelMultiCloudJob` | Cancel a running multi-cloud job |
| `waitForMulticloudJob(jobId, options?)` | — | Poll until complete; returns `GetMultiCloudResultsResponse` |
| `streamMultiCloudJob(jobId)` | `streamMultiCloudJob` | Returns SSE stream URL for real-time progress |

```typescript
// Explore multi-cloud strategies weighted toward cost savings
const mcResp = await client.exploreMultiCloudStrategies({
  workloadProfile: {
    computeInstances: 20,
    databaseInstances: 3,
    storageGB: 2_000,
    trafficRPS: 5_000,
    latencyRequirementMs: 150,
    primaryRegion: "us-east-1",
  },
  optimizationWeights: { cost: 0.6, latency: 0.3, vendorLockIn: 0.1 },
});

// Wait for the analysis to complete; results include topStrategies[]
const mcResults = await client.waitForMulticloudJob(mcResp.job?.id ?? "");
const top = mcResults.topStrategies?.[0];
console.log("Best strategy:", top?.name);
console.log("Monthly cost:  $", top?.metrics?.monthlyCost);
console.log("Avg latency:  ", top?.metrics?.avgLatencyMs, "ms");

// Filter results to only AWS + GCP combinations
const filtered = await client.getMulticloudResults(mcResp.job?.id ?? "", {
  providers: "aws,gcp",
});
console.log("AWS/GCP strategies:", filtered.topStrategies?.length);
```

### API Key Management

| Method | operationId | Description |
|---|---|---|
| `registerApiKey(token, options?)` | `registerApiKey` | Exchange a registration token for a permanent API key; returns `{ id, key, keyPrefix, name, scopes, ... }` |
| `createApiKey(name, options?)` | `createApiKey` | Create an API key; options: `{ scopes?, expiresAt?, rateLimit? }`; returns `{ id, key, keyPrefix, name, ... }` |
| `listApiKeys()` | `listApiKeys` | List all keys (returns array) |
| `revokeApiKey(keyId)` | `revokeApiKey` | Revoke an API key |

```typescript
// Exchange a one-time registration token for a permanent key
// The response contains { id, key, keyPrefix, name, scopes, rateLimit, createdAt, message }
// IMPORTANT: `key` is shown only once — store it in a secrets manager, not in logs or source code.
const registered = await client.registerApiKey("cwm_reg_abc123", {
  name: "My Agent Key",
});
console.log("New permanent key:", registered.key);  // copy immediately — will not be shown again

// Or create a key directly (requires an existing privileged key)
const newKey = await client.createApiKey("CI Pipeline Key", {
  scopes: ["read", "write"],
  expiresAt: "2027-01-01T00:00:00Z",
  rateLimit: 120,
});
console.log("Created key prefix:", newKey.keyPrefix);

// listApiKeys returns an array directly
const keys = await client.listApiKeys();
console.log("Active keys:", keys.map((k) => k.name));

// Revoke a key by its ID
await client.revokeApiKey(newKey.id ?? "");
```

### Registration Tokens (admin)

| Method | operationId | Description |
|---|---|---|
| `createRegistrationToken(body?)` | `createRegistrationToken` | Mint a new registration token; body: `CreateRegistrationTokenRequest`; returns `{ id, token, tokenPrefix, name, ... }` |
| `listRegistrationTokens()` | `listRegistrationTokens` | List all registration tokens (returns array) |
| `revokeRegistrationToken(id)` | `revokeRegistrationToken` | Revoke an unused registration token |

```typescript
// Mint a token that a new agent can exchange for a permanent key.
// The `name` field is required and identifies the intended recipient.
// The `token` in the response is shown only once — share it immediately.
const tokenResp = await client.createRegistrationToken({
  name: "Onboarding: customer-xyz agent",
  expiresAt: "2027-12-31T23:59:59Z",
});
console.log("Share this token:", tokenResp.token);  // shown only once

// listRegistrationTokens returns an array directly
const tokens = await client.listRegistrationTokens();
console.log("Outstanding tokens:", tokens.length);

// Revoke a token before it has been used
await client.revokeRegistrationToken(tokenResp.id ?? "");
```

> **Back-compat aliases (deprecated):**
> `runChaos` → `runChaosTest`, `exploreMulticloud` → `exploreMultiCloudStrategies`,
> `validatePrediction` → `validateTrafficForecast`, `optimizePredictionThresholds` → `optimizeThresholds`,
> `getChaosJobStreamUrl` → `streamChaosJob`, `getMulticloudJobStreamUrl` → `streamMultiCloudJob`,
> `getPredictionJobStreamUrl` → `streamPredictionJob`.

## Generated Types

All request/response types for new methods are exported from `@cwm/sdk` and derived from
the OpenAPI spec via indexed-access types — they can never drift from the source of truth.

```typescript
import type {
  RunChaosTestRequest,
  GetChaosResultsResponse,
  ExploreMultiCloudStrategiesRequest,
  GetMultiCloudResultsResponse,
  ValidateTrafficForecastRequest,
  CreateRLEnvironmentRequest,
  StepRLEnvironmentRequest,
  StepRLEnvironmentResponse,
} from "@cwm/sdk";
```

For low-level access to the raw OpenAPI types:

```typescript
import type { components, operations } from "@cwm/sdk";

// Access any schema type
type ChaosScenario = components["schemas"]["ChaosScenario"];

// Access operation types directly
type ListSimsResp = operations["listSimulations"]["responses"][200]["content"]["application/json"];
```

## SSE Streaming

Three async jobs support Server-Sent Events for real-time progress: chaos jobs, multi-cloud jobs,
and prediction jobs. The ergonomic client exposes URL helpers matching the operationId names:

```typescript
import EventSource from "eventsource"; // npm install eventsource

// streamChaosJob / streamMultiCloudJob / streamPredictionJob
const url = client.streamChaosJob(jobId);
const es = new EventSource(url, { headers: { Authorization: `Bearer ${apiKey}` } });
es.onmessage = (e) => console.log("progress:", JSON.parse(e.data));
es.onerror = () => es.close();
```

## Error Handling

```typescript
import { CwmError } from "@cwm/sdk";
import type { StepRLEnvironmentRequest } from "@cwm/sdk";

// CwmClient throws CwmError on non-2xx responses
try {
  const body: StepRLEnvironmentRequest = { action: { type: "scale_out" } };
  await client.rlStep("bad-id", body);
} catch (e) {
  if (e instanceof CwmError) {
    console.error(e.statusCode, e.serverMessage);
  }
}

// Generated client returns { error } instead of throwing
const { data, error } = await api.GET("/simulations/{simulationId}", {
  params: { path: { simulationId: "bad-id" } },
});
if (error) {
  console.error("API error:", error);
}
```

## Type Safety Guarantee

Every method added in the full-coverage expansion uses indexed-access types derived from
`openapi-types.ts` (auto-generated by `openapi-typescript` from `openapi.yaml`).  This means:

- TypeScript will surface a compile error if the spec changes and you regenerate
- No hand-authored request or response shapes exist for new methods — only `never`-safe
  indexed access like `operations["runChaosTest"]["requestBody"]["content"]["application/json"]`
- The `api-types.ts` file is the single source of named type aliases; it is re-exported from
  `index.ts` so all generated types are available via `@cwm/sdk`
