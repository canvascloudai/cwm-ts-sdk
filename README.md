# Cloud World Model — TypeScript SDK

Install locally:

```bash
npm install ./sdk/typescript
```

## Quickstart

```typescript
import { CwmClient, type RlAction } from "@cwm/sdk";

const client = new CwmClient({
  baseUrl: "http://localhost:5000",
  apiKey: "cwm_your_key",
});

// Create a simulation
const sim = await client.createSimulation({
  name: "My Cluster",
  resources: [{ id: "web", type: "compute", name: "Web Server", provider: "aws" }],
  connections: [],
});

// Step the simulation
const step = await client.simulateStep(sim.id, { traffic: 500 });
console.log(`CPU: ${step.metrics.cpuUsage}%  Latency P95: ${step.metrics.latencyP95}ms`);

// RL training loop — createRlEnvironment returns { environment, observation }
const { environment } = await client.createRlEnvironment(sim.id);
for (let i = 0; i < 100; i++) {
  const action: RlAction = { type: "scale_out", parameters: {} };
  const result = await client.rlStep(environment.id, action);
  if (result.done) await client.rlReset(environment.id);
}

// Chaos experiment
const { jobId } = await client.runChaos(sim.id, { scenarioId: "zone_failure" });
const results = await client.getChaosResults(jobId);
console.log(`Resilience score: ${results.resilienceScore?.overall}`);
```

## API Reference

| Method | Description |
|---|---|
| `createSimulation(spec)` | Create a virtual cloud environment |
| `getSimulation(id)` | Fetch simulation state |
| `listSimulations()` | List all simulations |
| `simulateStep(id, options)` | Advance one tick; returns `{metrics, simulation, events}` |
| `createRlEnvironment(simId, options)` | Create Gym-compatible RL env; returns `{environment, observation}` |
| `rlStep(envId, action)` | `action` is `RlAction` with `type` + `parameters`; returns `{observation, reward, done, info}` |
| `rlReset(envId)` | Start a new episode |
| `listChaosScenarios()` | Browse built-in failure scenarios |
| `runChaos(simId, options)` | Start async chaos experiment; returns `{jobId}` |
| `getChaosJob(jobId)` | Poll chaos job status |
| `getChaosResults(jobId)` | Fetch resilience score + vulnerabilities |
| `exploreMulticloud(workload, options)` | Start multi-cloud strategy exploration; returns `{jobId}` |
| `getMulticloudJob(jobId)` | Poll exploration job status |
| `getMulticloudResults(jobId)` | Fetch ranked strategies |
| `createApiKey(name, options)` | Create an API key (admin scope required) |
| `listApiKeys()` | List all keys |
| `revokeApiKey(keyId)` | Revoke an API key |

## RL Action Types

Valid `type` values: `"adjust_threshold"` | `"scale_out"` | `"scale_in"` | `"add_resource"` | `"remove_resource"`

## Error Handling

```typescript
import { CwmError, type RlAction } from "@cwm/sdk";

try {
  const action: RlAction = { type: "scale_out", parameters: {} };
  await client.rlStep("bad-id", action);
} catch (e) {
  if (e instanceof CwmError) {
    console.error(e.statusCode, e.serverMessage);
  }
}
```
