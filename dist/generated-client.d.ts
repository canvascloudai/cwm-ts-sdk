/**
 * AUTO-GENERATED FILE — DO NOT EDIT BY HAND.
 *
 * Source: openapi.yaml
 * Generator: scripts/generate-sdk.ts  (openapi-typescript v7 + openapi-fetch v0.17)
 *
 * Re-generate with:
 *   npm run generate-sdk
 *
 * This module exports a fully type-safe fetch client that covers every public
 * operation in the Cloud World Model API. Every request/response shape is
 * derived directly from openapi.yaml — no hand-written boilerplate required.
 *
 * @example
 * ```ts
 * import { createGeneratedClient } from "@cwm/sdk/generated-client";
 *
 * const api = createGeneratedClient({ baseUrl: "http://localhost:5000", apiKey: "cwm_..." });
 *
 * // GET /simulations/{simulationId}  — fully typed, no boilerplate
 * const { data, error } = await api.GET("/simulations/{simulationId}", {
 *   params: { path: { simulationId: "abc" } },
 * });
 *
 * // POST /chaos/run
 * const { data: job } = await api.POST("/chaos/run", {
 *   body: { simulationId: "abc", scenarioId: "zone_failure", duration: 300 },
 * });
 *
 * // POST /rl/environments/{environmentId}/step
 * const { data: step } = await api.POST("/rl/environments/{environmentId}/step", {
 *   params: { path: { environmentId: env.id } },
 *   body: { action: { type: "scale_out", parameters: {} } },
 * });
 * ```
 */
import { type Client } from "openapi-fetch";
import type { paths } from "./openapi-types.js";
export type { paths, components, operations } from "./openapi-types.js";
export interface GeneratedClientOptions {
    baseUrl: string;
    apiKey?: string;
}
/**
 * Create a fully type-safe API client that covers every public Cloud World Model
 * operations, generated directly from openapi.yaml.
 *
 * The returned client exposes .GET(), .POST(), .PUT(), .PATCH(), and
 * .DELETE() methods. Every path, parameter name, and body/response shape is
 * inferred from the OpenAPI spec via openapi-typescript — TypeScript will
 * catch mismatched paths, wrong parameter names, and response misuse at
 * compile time.
 */
export declare function createGeneratedClient(options: GeneratedClientOptions): Client<paths>;
//# sourceMappingURL=generated-client.d.ts.map