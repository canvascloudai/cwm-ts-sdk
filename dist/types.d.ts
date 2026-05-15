export type ResourceType = "compute" | "database" | "storage" | "network" | "cache" | "queue" | "kubernetes";
export type ResourceStatus = "healthy" | "warning" | "critical";
export type CloudProvider = "aws" | "gcp" | "azure" | "oci" | "digitalocean";
export type EventSeverity = "info" | "success" | "warning" | "error";
export type JobStatus = "pending" | "running" | "completed" | "failed" | "cancelled";
export type RlActionType = "adjust_threshold" | "scale_out" | "scale_in" | "add_resource" | "remove_resource";
export interface Resource {
    id: string;
    type: ResourceType;
    name: string;
    provider: CloudProvider;
    x?: number;
    y?: number;
    status?: ResourceStatus;
    cpuUsage?: number;
    characteristics?: Record<string, unknown>;
    location?: {
        regionKey: string;
        zoneKey: string;
        localityType: string;
        providerLabel: string;
        faultDomainKey?: string;
    };
    metadata?: Record<string, unknown>;
}
export interface Connection {
    id?: string;
    sourceId: string;
    targetId: string;
    label?: string;
}
export interface AutoscalingConfig {
    scaleOutCpuThreshold: number;
    scaleInCpuThreshold: number;
    scaleOutThroughputThreshold: number;
    scaleInThroughputThreshold: number;
    scaleOutLatencyThreshold: number;
    cooldownSeconds: number;
    minInstances: number;
    maxInstances: number;
}
export interface Simulation {
    id: string;
    name: string;
    description?: string;
    resources: Resource[];
    connections: Connection[];
    currentTime: number;
    traffic: number;
    isRunning: boolean;
    playbackSpeed: number;
    lastCostPerHour: number;
    autoscalingConfig?: AutoscalingConfig;
    apiKeyId?: string;
    createdAt: string;
    updatedAt: string;
}
export interface CreateSimulationInput {
    name: string;
    description?: string;
    resources: Resource[];
    connections?: Connection[];
    traffic?: number;
    autoscalingConfig?: AutoscalingConfig;
}
export interface Metrics {
    simulationId: string;
    timestamp: number;
    latencyP50: number;
    latencyP95: number;
    latencyP99: number;
    cpuUsage: number;
    memoryUsage: number;
    throughput: number;
    errorRate: number;
    costPerHour: number;
    cacheHitRate?: number;
    queueDepth?: number;
    k8sNodeUtilization?: number;
}
export interface RlEpisodeConfig {
    maxSteps?: number;
    targetTrafficPattern?: "ramp" | "burst" | "step" | "wave" | "custom";
    initialTraffic?: number;
    targetSLA?: {
        maxLatencyP95: number;
        maxErrorRate: number;
    };
    costBudgetPerHour?: number;
    enableFailures?: boolean;
    scenarioId?: string;
}
export interface RlEnvironmentRecord {
    id: string;
    simulationId: string;
    episodeConfig: RlEpisodeConfig;
    currentStep: number;
    totalReward: number;
    isActive: boolean;
    apiKeyId?: string;
    createdAt: string;
    updatedAt: string;
}
export interface RlObservation {
    metrics: Metrics;
    resources: Resource[];
    traffic: number;
    currentTime: number;
    scalingHistory: unknown[];
    recentEvents: unknown[];
    autoscalingConfig?: AutoscalingConfig;
}
export interface CreateRlEnvironmentResult {
    environment: RlEnvironmentRecord;
    observation: RlObservation;
}
export interface RlAction {
    type: RlActionType;
    parameters?: {
        cpuThreshold?: number;
        throughputThreshold?: number;
        latencyThreshold?: number;
        instanceCount?: number;
        resourceType?: "compute" | "database" | "storage" | "network";
        provider?: CloudProvider;
        resourceId?: string;
    };
}
export interface RlReward {
    total: number;
    components: {
        performance: number;
        cost: number;
        stability: number;
        sla: number;
    };
    metrics: {
        avgLatency: number;
        errorRate: number;
        costPerHour: number;
        slaViolations: number;
    };
}
export interface RlStepResult {
    observation: RlObservation;
    reward: RlReward;
    done: boolean;
    info: Record<string, unknown>;
}
export interface ChaosInjectionConfig {
    failureType: "database_crash" | "database_slowdown" | "zone_outage" | "instance_failure" | "network_latency" | "network_partition" | "cascading_failure" | "cpu_stress";
    targetResourceId?: string;
    targetZone?: string;
    targetProvider?: CloudProvider;
    duration?: number;
    intensity?: number;
    startTime?: number;
    affectedResources?: string[];
}
export interface ResilienceScore {
    overall: number;
    breakdown: {
        recovery: number;
        availability: number;
        dataIntegrity: number;
        gracefulDegradation: number;
    };
    metrics: {
        recoveryTimeSeconds: number;
        availabilityPercent: number;
        dataLossIncidents: number;
        gracefulDegradationScore: number;
        meanTimeToRecovery: number;
        errorRateDuringChaos: number;
    };
    grade: "A" | "B" | "C" | "D" | "F";
}
export interface ChaosJob {
    id: string;
    status: JobStatus;
    baseSimulationId: string;
    scenarioId?: string;
    resilienceScore?: ResilienceScore;
    vulnerabilities: unknown[];
    recommendations: string[];
    timeline: unknown[];
    createdAt: string;
    completedAt?: string;
    error?: string;
}
export interface MultiCloudJob {
    id: string;
    status: JobStatus;
    workloadProfile: Record<string, unknown>;
    topStrategies?: unknown[];
    allStrategies?: unknown[];
    comparisonReport?: string;
    progress?: number;
    createdAt: string;
    updatedAt?: string;
    completedAt?: string;
    error?: string;
}
export interface WorkloadProfile {
    computeInstances: number;
    databaseInstances: number;
    storageGB: number;
    trafficRPS: number;
    latencyRequirementMs: number;
    primaryRegion: string;
    secondaryRegions?: string[];
    requiresMultiRegion?: boolean;
    dataResidencyRequirements?: string[];
}
export interface OptimizationWeights {
    cost?: number;
    latency?: number;
    vendorLockIn?: number;
}
export interface ApiKey {
    id: string;
    name: string;
    keyPrefix: string;
    scopes: string[];
    rateLimit: number;
    isActive: boolean;
    createdAt: string;
    expiresAt?: string;
    lastUsedAt?: string;
    userId?: string;
}
export interface CreateApiKeyResult extends ApiKey {
    key: string;
    message?: string;
}
export interface AsyncJobRef {
    jobId: string;
}
//# sourceMappingURL=types.d.ts.map