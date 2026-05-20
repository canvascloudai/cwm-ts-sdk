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
    async waitForChaosJob(jobId, options = {}) {
        const pollIntervalMs = options.pollIntervalMs ?? 2000;
        const timeoutMs = options.timeoutMs ?? 300000;
        if (!(Number.isFinite(pollIntervalMs) && pollIntervalMs > 0)) {
            throw new Error(`pollIntervalMs must be a finite positive number, got ${pollIntervalMs}`);
        }
        if (!(Number.isFinite(timeoutMs) && timeoutMs > 0)) {
            throw new Error(`timeoutMs must be a finite positive number, got ${timeoutMs}`);
        }
        const deadline = Date.now() + timeoutMs;
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        while (true) {
            const job = await this.getChaosJob(jobId);
            if (job.status === "completed") {
                return this.getChaosResults(jobId);
            }
            if (job.status === "failed" || job.status === "cancelled") {
                throw new CwmError(0, `Chaos job ${jobId} ended with status '${job.status}': ${job.error ?? "no details"}`);
            }
            if (Date.now() >= deadline) {
                throw new Error(`Chaos job ${jobId} did not complete within ${timeoutMs}ms (last status: "${job.status}")`);
            }
            await delay(pollIntervalMs);
        }
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
    async waitForMulticloudJob(jobId, options = {}) {
        const pollIntervalMs = options.pollIntervalMs ?? 2000;
        const timeoutMs = options.timeoutMs ?? 300000;
        if (!(Number.isFinite(pollIntervalMs) && pollIntervalMs > 0)) {
            throw new Error(`pollIntervalMs must be a finite positive number, got ${pollIntervalMs}`);
        }
        if (!(Number.isFinite(timeoutMs) && timeoutMs > 0)) {
            throw new Error(`timeoutMs must be a finite positive number, got ${timeoutMs}`);
        }
        const deadline = Date.now() + timeoutMs;
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        while (true) {
            const job = await this.getMulticloudJob(jobId);
            if (job.status === "completed") {
                return this.getMulticloudResults(jobId);
            }
            if (job.status === "failed" || job.status === "cancelled") {
                throw new CwmError(0, `Multi-cloud job ${jobId} ended with status '${job.status}': ${job.error ?? "no details"}`);
            }
            if (Date.now() >= deadline) {
                throw new Error(`Multi-cloud job ${jobId} did not complete within ${timeoutMs}ms (last status: "${job.status}")`);
            }
            await delay(pollIntervalMs);
        }
    }
    // ------------------------------------------------------------------ //
    // Predictive Scaling                                                   //
    // ------------------------------------------------------------------ //
    async validatePrediction(simulationId, trafficForecast, options = {}) {
        const resp = await this.request("POST", "/api/predictions/validate", {
            simulationId,
            trafficForecast,
            testSteps: options.testSteps ?? 100,
            webhookUrl: options.webhookUrl,
        });
        return { jobId: resp.job.id };
    }
    async optimizePredictionThresholds(simulationId, trafficForecast, options = {}) {
        const resp = await this.request("POST", "/api/predictions/optimize-thresholds", {
            simulationId,
            trafficForecast,
            testSteps: options.testSteps ?? 100,
            webhookUrl: options.webhookUrl,
        });
        return { jobId: resp.job.id };
    }
    async getPredictionJob(jobId) {
        return this.request("GET", `/api/predictions/jobs/${jobId}`);
    }
    async getPredictionResults(jobId) {
        return this.request("GET", `/api/predictions/jobs/${jobId}/results`);
    }
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
    async waitForPredictionJob(jobId, options = {}) {
        const pollIntervalMs = options.pollIntervalMs ?? 2000;
        const timeoutMs = options.timeoutMs ?? 300000;
        if (!(Number.isFinite(pollIntervalMs) && pollIntervalMs > 0)) {
            throw new Error(`pollIntervalMs must be a finite positive number, got ${pollIntervalMs}`);
        }
        if (!(Number.isFinite(timeoutMs) && timeoutMs > 0)) {
            throw new Error(`timeoutMs must be a finite positive number, got ${timeoutMs}`);
        }
        const deadline = Date.now() + timeoutMs;
        const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
        while (true) {
            const job = await this.getPredictionJob(jobId);
            if (job.status === "completed") {
                return this.getPredictionResults(jobId);
            }
            if (job.status === "failed" || job.status === "cancelled") {
                throw new CwmError(0, `Prediction job ${jobId} ended with status '${job.status}': ${job.error ?? "no details"}`);
            }
            if (Date.now() >= deadline) {
                throw new Error(`Prediction job ${jobId} did not complete within ${timeoutMs}ms (last status: "${job.status}")`);
            }
            await delay(pollIntervalMs);
        }
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