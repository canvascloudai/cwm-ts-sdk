import type { Simulation, CreateSimulationInput, Metrics, RlEpisodeConfig, CreateRlEnvironmentResult, RlObservation, RlAction, RlStepResult, ChaosInjectionConfig, ChaosJob, MultiCloudJob, PredictionJob, WorkloadProfile, OptimizationWeights, ApiKey, CreateApiKeyResult, AsyncJobRef } from "./types.js";
export declare class CwmError extends Error {
    readonly statusCode: number;
    readonly serverMessage: string;
    constructor(statusCode: number, serverMessage: string);
}
export interface CwmClientOptions {
    baseUrl: string;
    apiKey?: string;
}
export declare class CwmClient {
    private readonly baseUrl;
    private readonly apiKey;
    constructor({ baseUrl, apiKey }: CwmClientOptions);
    private request;
    createSimulation(spec: CreateSimulationInput): Promise<Simulation>;
    getSimulation(simulationId: string): Promise<Simulation>;
    listSimulations(): Promise<Simulation[]>;
    simulateStep(simulationId: string, options?: {
        traffic?: number;
        beginnerMode?: boolean;
    }): Promise<{
        metrics: Metrics;
        simulation: Simulation;
        events: unknown[];
    }>;
    createRlEnvironment(simulationId: string, options?: {
        episodeConfig?: RlEpisodeConfig;
    }): Promise<CreateRlEnvironmentResult>;
    rlStep(envId: string, action: RlAction): Promise<RlStepResult>;
    rlReset(envId: string): Promise<{
        observation: RlObservation;
    }>;
    getRlObservation(envId: string): Promise<{
        observation: RlObservation;
    }>;
    listChaosScenarios(): Promise<unknown[]>;
    runChaos(simulationId: string, options?: {
        scenarioId?: string;
        customInjections?: ChaosInjectionConfig[];
        duration?: number;
        webhookUrl?: string;
    }): Promise<AsyncJobRef>;
    getChaosJob(jobId: string): Promise<ChaosJob>;
    getChaosResults(jobId: string): Promise<ChaosJob>;
    /**
     * Wait for a chaos job to reach a terminal state and return its full results.
     *
     * Polls {@link getChaosJob} every `pollIntervalMs` milliseconds until
     * `status` is `"completed"` or `"failed"`.  The returned Promise resolves
     * with the complete {@link ChaosJob} (including results) on success, and
     * rejects with a {@link CwmError} on failure or a plain `Error` on timeout.
     *
     * @param jobId - The chaos job ID returned by {@link runChaos}.
     * @param options.pollIntervalMs - Milliseconds between status checks (default 2000).
     * @param options.timeoutMs - Maximum milliseconds to wait before rejecting (default 300 000).
     */
    waitForChaosJob(jobId: string, options?: {
        pollIntervalMs?: number;
        timeoutMs?: number;
    }): Promise<ChaosJob>;
    exploreMulticloud(workload: WorkloadProfile, options?: {
        optimizationWeights?: OptimizationWeights;
        webhookUrl?: string;
    }): Promise<AsyncJobRef>;
    getMulticloudJob(jobId: string): Promise<MultiCloudJob>;
    getMulticloudResults(jobId: string): Promise<MultiCloudJob>;
    /**
     * Wait for a multi-cloud exploration job to reach a terminal state and return its full results.
     *
     * Polls {@link getMulticloudJob} every `pollIntervalMs` milliseconds until
     * `status` is `"completed"` or `"failed"`.  The returned Promise resolves
     * with the complete {@link MultiCloudJob} (including ranked strategies) on
     * success, and rejects with a {@link CwmError} on failure or a plain `Error`
     * on timeout.
     *
     * @param jobId - The multi-cloud job ID returned by {@link exploreMulticloud}.
     * @param options.pollIntervalMs - Milliseconds between status checks (default 2000).
     * @param options.timeoutMs - Maximum milliseconds to wait before rejecting (default 300 000).
     */
    waitForMulticloudJob(jobId: string, options?: {
        pollIntervalMs?: number;
        timeoutMs?: number;
    }): Promise<MultiCloudJob>;
    validatePrediction(simulationId: string, trafficForecast: unknown, options?: {
        testSteps?: number;
        webhookUrl?: string;
    }): Promise<AsyncJobRef>;
    optimizePredictionThresholds(simulationId: string, trafficForecast: unknown, options?: {
        testSteps?: number;
        webhookUrl?: string;
    }): Promise<AsyncJobRef>;
    getPredictionJob(jobId: string): Promise<PredictionJob>;
    getPredictionResults(jobId: string): Promise<PredictionJob>;
    /**
     * Wait for a prediction job to reach a terminal state and return its full results.
     *
     * Polls {@link getPredictionJob} every `pollIntervalMs` milliseconds until
     * `status` is `"completed"` or `"failed"`.  The returned Promise resolves
     * with the complete {@link PredictionJob} (including results) on success, and
     * rejects with a {@link CwmError} on failure or a plain `Error` on timeout.
     *
     * @param jobId - The prediction job ID returned by {@link validatePrediction} or {@link optimizePredictionThresholds}.
     * @param options.pollIntervalMs - Milliseconds between status checks (default 2000).
     * @param options.timeoutMs - Maximum milliseconds to wait before rejecting (default 300 000).
     */
    waitForPredictionJob(jobId: string, options?: {
        pollIntervalMs?: number;
        timeoutMs?: number;
    }): Promise<PredictionJob>;
    createApiKey(name: string, options?: {
        scopes?: string[];
        expiresAt?: string;
        rateLimit?: number;
    }): Promise<CreateApiKeyResult>;
    listApiKeys(): Promise<ApiKey[]>;
    revokeApiKey(keyId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=client.d.ts.map