import type { Simulation, CreateSimulationInput, Metrics, RlEpisodeConfig, CreateRlEnvironmentResult, RlObservation, RlAction, RlStepResult, ChaosInjectionConfig, ChaosJob, MultiCloudJob, WorkloadProfile, OptimizationWeights, ApiKey, CreateApiKeyResult, AsyncJobRef } from "./types.js";
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
    exploreMulticloud(workload: WorkloadProfile, options?: {
        optimizationWeights?: OptimizationWeights;
        webhookUrl?: string;
    }): Promise<AsyncJobRef>;
    getMulticloudJob(jobId: string): Promise<MultiCloudJob>;
    getMulticloudResults(jobId: string): Promise<MultiCloudJob>;
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