export class CwmError extends Error {
    constructor(statusCode, serverMessage) {
        super(`HTTP ${statusCode}: ${serverMessage}`);
        this.statusCode = statusCode;
        this.serverMessage = serverMessage;
        this.name = "CwmError";
    }
}
export class CwmClient {
    constructor({ baseUrl, apiKey = "" }) {
        this.baseUrl = baseUrl.replace(/\/$/, "");
        this.apiKey = apiKey;
    }
    async request(method, path, body) {
        const url = `${this.baseUrl}${path}`;
        const headers = {
            "Content-Type": "application/json",
            Accept: "application/json",
        };
        if (this.apiKey) {
            headers["Authorization"] = `Bearer ${this.apiKey}`;
        }
        const init = { method, headers };
        if (body !== undefined) {
            init.body = JSON.stringify(body);
        }
        const res = await fetch(url, init);
        let payload;
        const text = await res.text();
        try {
            payload = text ? JSON.parse(text) : undefined;
        }
        catch {
            payload = { error: text };
        }
        if (!res.ok) {
            const msg = payload?.error ??
                payload?.message ??
                res.statusText;
            throw new CwmError(res.status, msg);
        }
        return payload;
    }
    // ------------------------------------------------------------------ //
    // Simulations                                                          //
    // ------------------------------------------------------------------ //
    async createSimulation(spec) {
        return this.request("POST", "/api/simulations", spec);
    }
    async getSimulation(simulationId) {
        return this.request("GET", `/api/simulations/${simulationId}`);
    }
    async listSimulations() {
        return this.request("GET", "/api/simulations");
    }
    async simulateStep(simulationId, options = {}) {
        return this.request("POST", `/api/simulations/${simulationId}/step`, {
            traffic: options.traffic,
            beginnerMode: options.beginnerMode ?? false,
        });
    }
    // ------------------------------------------------------------------ //
    // RL Environments                                                       //
    // ------------------------------------------------------------------ //
    async createRlEnvironment(simulationId, options = {}) {
        return this.request("POST", "/api/rl/environments", {
            simulationId,
            episodeConfig: options.episodeConfig ?? { maxSteps: 300 },
        });
    }
    async rlStep(envId, action) {
        return this.request("POST", `/api/rl/environments/${envId}/step`, { action });
    }
    async rlReset(envId) {
        return this.request("POST", `/api/rl/environments/${envId}/reset`);
    }
    async getRlObservation(envId) {
        return this.request("GET", `/api/rl/environments/${envId}/observation`);
    }
    // ------------------------------------------------------------------ //
    // Chaos Engineering                                                    //
    // ------------------------------------------------------------------ //
    async listChaosScenarios() {
        return this.request("GET", "/api/chaos/scenarios");
    }
    async runChaos(simulationId, options = {}) {
        const resp = await this.request("POST", "/api/chaos/run", {
            simulationId,
            scenarioId: options.scenarioId,
            customInjections: options.customInjections,
            duration: options.duration ?? 300,
            webhookUrl: options.webhookUrl,
        });
        return { jobId: resp.job.id };
    }
    async getChaosJob(jobId) {
        return this.request("GET", `/api/chaos/jobs/${jobId}`);
    }
    async getChaosResults(jobId) {
        return this.request("GET", `/api/chaos/jobs/${jobId}/results`);
    }
    // ------------------------------------------------------------------ //
    // Multi-Cloud Strategy                                                 //
    // ------------------------------------------------------------------ //
    async exploreMulticloud(workload, options = {}) {
        const resp = await this.request("POST", "/api/multi-cloud/explore", {
            workloadProfile: workload,
            optimizationWeights: options.optimizationWeights,
            webhookUrl: options.webhookUrl,
        });
        return { jobId: resp.job.id };
    }
    async getMulticloudJob(jobId) {
        return this.request("GET", `/api/multi-cloud/jobs/${jobId}`);
    }
    async getMulticloudResults(jobId) {
        return this.request("GET", `/api/multi-cloud/jobs/${jobId}/results`);
    }
    // ------------------------------------------------------------------ //
    // API Key Management                                                   //
    // ------------------------------------------------------------------ //
    async createApiKey(name, options = {}) {
        return this.request("POST", "/api/keys", {
            name,
            scopes: options.scopes ?? ["read", "write"],
            expiresAt: options.expiresAt,
            rateLimit: options.rateLimit,
        });
    }
    async listApiKeys() {
        return this.request("GET", "/api/keys");
    }
    async revokeApiKey(keyId) {
        return this.request("DELETE", `/api/keys/${keyId}`);
    }
}
//# sourceMappingURL=client.js.map